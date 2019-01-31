command("new style \
  #sp-wave-main {\
  min-height: 100vh;\
  display: flex;\
  align-items: center;\
  justify-content: center;\
  background-color: #f0f0f0;\
}");
command("new style \
  #sp-wave-main__container {\
  width: 480px;\
  height: 280px;\
  display: flex;\
  align-items: center;\
  justify-content: center;\
  flex-direction: column;\
  color: #000;\
  background-image: radial-gradient(to bottom, #0f0f0f 0%, #0a0a0a 100%); \
  background: #fff;\
  opacity: 0.8;\
  border-radius: 8px;\
  box-shadow: 0 16px 24px -8px rgba(0, 0, 0, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.5);\
}");
command("new style \
  #sp-wave-main__container h1{ font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,\
  Helvetica Neue, sans-serif;\
  font-size: 24px;\
  letter-spacing: 1px;\
  margin-bottom: 10px;\
  font-weight: 200;\
  -webkit-user-select: none;\
  -moz-user-select: none;\
  -ms-user-select: none;\
  user-select: none;}");
command("new style #sp-wave-main__container canvas {\
  width: 100%;\
}");



command("add div{id: sp-wave-main} parent{byTag:body[0]}");
command("add div{id: sp-wave-main__container} parent{byId:sp-wave-main}");
command("add h1{id: sp-wave-main-h1} parent{byId:sp-wave-main__container} text{How can I help you?}");
command("add canvas{id: waves} parent{byId:sp-wave-main__container}");
command("add in{byId:sp-wave-main-h1} event{click: h1HelpClick(e)}");


const WAVE_WIDTH = 480;
const WAVE_HIEGHT = 130;



var waveWidthWindow = function () {
  return WAVE_WIDTH;
}

var waveHeightWindow = function () {
  return WAVE_HIEGHT;
}


var waves = new SineWaves({
  el: document.getElementById("waves"),

  speed: 5,

  ease: "SineInOut",

  wavesWidth: "75%",

  width: function () {
    return waveWidthWindow();
  },

  height: function () {
    return waveHeightWindow();
  },

  waves: [{
      timeModifier: 4,
      lineWidth: 1,
      amplitude: 0,
      wavelength: 25,
      type: "Fibonacci"
    },
    {
      timeModifier: 2,
      lineWidth: 1,
      amplitude: 0,
      wavelength: 30,
      type: "Fibonacci"
    },
    {
      timeModifier: 1,
      lineWidth: 1,
      amplitude: 0,
      wavelength: 30,
      type: "Fibonacci"
    },
    {
      timeModifier: 3,
      lineWidth: 1,
      amplitude: 0,
      wavelength: 40,
      type: "Fibonacci"
    },
    {
      timeModifier: 0.5,
      lineWidth: 1,
      amplitude: 0,
      wavelength: 60,
      type: "Fibonacci"
    },
    {
      timeModifier: 1.3,
      lineWidth: 1,
      amplitude: 0,
      wavelength: 40,
      type: "Fibonacci"
    }
  ],

  // Called on window resize
  resizeEvent: function () {
    var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
    gradient.addColorStop(0, "rgba(25, 255, 255, 0)");
    gradient.addColorStop(0.5, "rgba(255, 25, 255, 0.75)");
    gradient.addColorStop(1, "rgba(255, 255, 25, 0");

    var index = -1;
    var length = this.waves.length;
    while (++index < length) {
      this.waves[index].strokeStyle = gradient;
    }

    // Clean Up
    index = void 0;
    length = void 0;
    gradient = void 0;
  }
});


//TODO здеся сделано анимация дял волн сделать беольше чем анимация


function h1HelpClick(e) {
  var waveTimerAnimation = 0;

  let f = (func) => {
    let ownTimer = 0;
    let timer = setInterval(() => {
      if (ownTimer > 60) {
        clearInterval(timer);
        return;
      }
      func();
      ownTimer++;
    }, 800 / 200 /* 1sec/50fps */ );
  }

  if (recorder !== null) {
    waveTimerAnimation = 0;
    recorder = null;
    f(() => {
      waves.waves[0].amplitude -= ((waveTimerAnimation * 25) % 3 == 0) ? 1 : 0;
      waves.waves[1].amplitude -= ((waveTimerAnimation * 12) % 6 == 0) ? 1 : 0;
      waves.waves[2].amplitude -= ((waveTimerAnimation * 17) % 2 == 0) ? 1 : 0;
      waves.waves[3].amplitude += ((waveTimerAnimation * 17) % 4 == 0) ? 1 : 0;
      waves.waves[4].amplitude -= ((waveTimerAnimation * 35) % 5 == 0) ? 1 : 0;
      waves.waves[5].amplitude -= ((waveTimerAnimation * 43) % 2 == 0) ? 1 : 0;
      waveTimerAnimation++;
    });

  } else {
    recorder = 1;
    f(() => {
      waves.waves[0].amplitude += ((waveTimerAnimation * 25) % 3 == 0) ? 1 : 0;
      waves.waves[1].amplitude += ((waveTimerAnimation * 12) % 6 == 0) ? 1 : 0;
      waves.waves[2].amplitude += ((waveTimerAnimation * 17) % 2 == 0) ? 1 : 0;
      waves.waves[3].amplitude -= ((waveTimerAnimation * 17) % 4 == 0) ? 1 : 0;
      waves.waves[4].amplitude += ((waveTimerAnimation * 35) % 5 == 0) ? 1 : 0;
      waves.waves[5].amplitude += ((waveTimerAnimation * 43) % 2 == 0) ? 1 : 0;
      waveTimerAnimation--;
    });
    waveTimerAnimation = 0;
  }
  
}