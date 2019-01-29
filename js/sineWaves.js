
/*!
 _______ _____ __   _ _______      _  _  _ _______ _    _ _______ _______
 |______   |   | \  | |______      |  |  | |_____|  \  /  |______ |______
 ______| __|__ |  \_| |______      |__|__| |     |   \/   |______ ______|

 sine-waves v0.3.0 <https://github.com/isuttell/sine-waves>
 Contributor(s): Isaac Suttell <isaac@isaacsuttell.com>
 Last Build: 2014-12-03
*/
! function (a, b) {
  "use strict";
  "function" == typeof define && "object" == typeof define.amd ? define([], function () {
    return b(a)
  }) : a.SineWaves = b(a)
}(this, function () {
  "use strict";

  function a(a) {
    if (this.options = i.defaults(this.options, a), this.el = this.options.el, delete this.options.el, !this.el)
      throw "No Canvas Selected";
    if (this.ctx = this.el.getContext("2d"), this.waves = this.options.waves, delete this.options.waves, !this.waves || !this.waves.length)
      throw "No waves specified";
    this.dpr = window.devicePixelRatio || 1,
      this.updateDimensions(),
      window.addEventListener("resize", this.updateDimensions.bind(this)),
      this.setupUserFunctions(), this.easeFn = i.getFn(n, this.options.ease, "linear"),
      this.rotation = i.degreesToRadians(this.options.rotate),
      i.isType(this.options.running, "boolean") &&
      (this.running = this.options.running),
      this.setupWaveFns(),
      this.loop()
  }

  function b(a, b) {
    return i.isType(a, "number") ? a :
      (a = a.toString(), a.indexOf("%") > -1 ?
        (a = parseFloat(a), a > 1 && (a /= 100), b * a) :
        a.indexOf("px") > -1 ?
        parseInt(a, 10) :
        void 0)
  }

  Function.prototype.bind || (Function.prototype.bind = function (a) {
    var b = Array.prototype.slice.call(arguments, 1),
      c = this,
      d = function () {},
      e = function () {
        return c.apply(this instanceof d && a ? this : a, b.concat(Array.prototype.slice.call(arguments)))
      };
    return d.prototype = this.prototype, e.prototype = new d, e
  });

  for (var c = ["ms", "moz", "webkit", "o"], d = 0; d < c.length && !window.requestAnimationFrame; ++d) window.requestAnimationFrame = window[c[d] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[c[d] + "CancelAnimationFrame"] || window[c[d] + "CancelRequestAnimationFrame"];
  if (!window.requestAnimationFrame) {
    var e = 0;
    window.requestAnimationFrame = function (a) {
      var b = (new Date).getTime(),
        c = Math.max(0, 16 - (b - e)),
        d = window.setTimeout(function () {
          a(b + c)
        }, c);
      return e = b + c, d
    }
  }

  window.cancelAnimationFrame || (window.cancelAnimationFrame = function (a) {
    clearTimeout(a)
  });
  
  var f = Math.PI / 180,
    g = 2 * Math.PI,
    h = Math.PI / 2,
    i = {},
    j = i.isType = function (a, b) {
      var c = {}.toString.call(a).toLowerCase();
      return c === "[object " + b.toLowerCase() + "]"
    },
    k = i.isFunction = function (a) {
      return j(a, "function")
    },
    l = i.isString = function (a) {
      return j(a, "string")
    },
    m = (i.isNumber = function (a) {
      return j(a, "number")
    }, i.shallowClone = function (a) {
      var b = {};
      for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
      return b
    }),
    n = (i.defaults = function (a, b) {
      j(b, "object") || (b = {});
      var c = m(a);
      for (var d in b) b.hasOwnProperty(d) && (c[d] = b[d]);
      return c
    }, i.degreesToRadians = function (a) {
      if (!j(a, "number")) throw new TypeError("Degrees is not a number");
      return a * f
    }, i.getFn = function (a, b, c) {
      return k(b) ? b : l(b) && k(a[b.toLowerCase()]) ? a[b.toLowerCase()] : a[c]
    }, {});
  n.linear = function (a, b) {
    return b
  }, n.sinein = function (a, b) {
    return b * (Math.sin(a * Math.PI - h) + 1) * .5
  }, n.sineout = function (a, b) {
    return b * (Math.sin(a * Math.PI + h) + 1) * .5
  }, n.sineinout = function (a, b) {
    return b * (Math.sin(a * g - h) + 1) * .5
  };
  var o = {};
  o.sine = function (a) {
    return Math.sin(a)
  }, o.sin = o.sine, o.sign = function (a) {
    return a = +a, 0 === a || isNaN(a) ? a : a > 0 ? 1 : -1
  }, o.square = function (a) {
    return o.sign(Math.sin(a * g))
  }, o.sawtooth = function (a) {
    return 2 * (a - Math.floor(a + .5))
  }, o.triangle = function (a) {
    return Math.abs(o.sawtooth(a))
  }, a.prototype.options = {
    speed: 10,
    rotate: 0,
    ease: "Linear",
    wavesWidth: "95%"
  }, a.prototype.setupWaveFns = function () {
    for (var a = -1, b = this.waves.length; ++a < b;) this.waves[a].waveFn = i.getFn(o, this.waves[a].type, "sine")
  }, a.prototype.setupUserFunctions = function () {
    i.isFunction(this.options.resizeEvent) && (this.options.resizeEvent.call(this), window.addEventListener("resize", this.options.resizeEvent.bind(this))), i.isFunction(this.options.initialize) && this.options.initialize.call(this)
  };
  var p = {
    timeModifier: 1,
    amplitude: 50,
    wavelength: 50,
    segmentLength: 10,
    lineWidth: 1,
    strokeStyle: "rgba(255, 255, 255, 0.2)",
    type: "Sine"
  };
  return a.prototype.getDimension = function (a) {
    return i.isNumber(this.options[a]) ? this.options[a] : i.isFunction(this.options[a]) ? this.options[a].call(this, this.el) : "width" === a ? this.el.clientWidth : "height" === a ? this.el.clientHeight : void 0
  }, a.prototype.updateDimensions = function () {
    var a = this.getDimension("width"),
      c = this.getDimension("height");
    this.width = this.el.width = a * this.dpr, this.height = this.el.height = c * this.dpr, this.el.style.width = a + "px", this.el.style.height = c + "px", this.waveWidth = b(this.options.wavesWidth, this.width), this.waveLeft = (this.width - this.waveWidth) / 2, this.yAxis = this.height / 2
  }, a.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }, a.prototype.time = 0, a.prototype.update = function (a) {
    this.time = this.time - .007, "undefined" == typeof a && (a = this.time);
    var b = -1,
      c = this.waves.length;
    for (this.clear(), this.ctx.save(), this.rotation > 0 && (this.ctx.translate(this.width / 2, this.height / 2), this.ctx.rotate(this.rotation), this.ctx.translate(-this.width / 2, -this.height / 2)); ++b < c;) {
      var d = this.waves[b].timeModifier || 1;
      this.drawWave(a * d, this.waves[b])
    }
    this.ctx.restore(), b = void 0, c = void 0
  }, a.prototype.getPoint = function (a, b, c) {
    var d = a * this.options.speed + (-this.yAxis + b) / c.wavelength,
      e = c.waveFn.call(this, d, o),
      f = this.easeFn.call(this, b / this.waveWidth, c.amplitude);
    return d = b + this.waveLeft, e = f * e + this.yAxis, {
      x: d,
      y: e
    }
  }, a.prototype.drawWave = function (a, b) {
    b = i.defaults(p, b), this.ctx.lineWidth = b.lineWidth * this.dpr, this.ctx.strokeStyle = b.strokeStyle, this.ctx.lineCap = "butt", this.ctx.lineJoin = "round", this.ctx.beginPath(), this.ctx.moveTo(0, this.yAxis), this.ctx.lineTo(this.waveLeft, this.yAxis);
    var c, d;
    for (c = 0; c < this.waveWidth; c += b.segmentLength) d = this.getPoint(a, c, b), this.ctx.lineTo(d.x, d.y), d = void 0;
    c = void 0, b = void 0, this.ctx.lineTo(this.width, this.yAxis), this.ctx.stroke()
  }, a.prototype.running = !0, a.prototype.loop = function () {
    this.running === !0 && this.update(), window.requestAnimationFrame(this.loop.bind(this))
  }, a.prototype.Waves = o, a.prototype.Ease = n, a
});
