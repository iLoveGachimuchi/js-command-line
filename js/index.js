command("\
  new style #sp-wave-main {\
  min-height: 100vh;\
  display: flex;\
  align-items: center;\
  justify-content: center;\
  background-color: #f0f0f0;\
}");
command("\
  new style #sp-wave-main__container {\
  width: 480px;\
  height: 240px;\
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
command("\
new style #sp-wave-main__container h1{ font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,\
  Helvetica Neue, sans-serif;\
  font-size: 24px;\
  letter-spacing: 1px;\
  font-weight: 200;\
  -webkit-user-select: none;\
  -moz-user-select: none;\
  -ms-user-select: none;\
  user-select: none;}");
command("new style #sp-wave-main__container canvas {\
  width: 100%;\
}");



command("add div{id: sp-wave-main} parrent{byTag:body[0]}");
command("add div{id: sp-wave-main__container} parent{byId:sp-wave-main}");
command("add canvas{id: waves} parent{byId:sp-wave-main__container}");
command("add h1 parent{byId:sp-wave-main__container} text{How can I help you?}");


var waves = new SineWaves({
  el: document.getElementById("waves"),

  speed: 5,

  ease: "SineInOut",

  wavesWidth: "75%",

  waves: [{
      timeModifier: 4,
      lineWidth: 1,
      amplitude: -25,
      wavelength: 25
    },
    {
      timeModifier: 2,
      lineWidth: 1,
      amplitude: -10,
      wavelength: 30
    },
    {
      timeModifier: 1,
      lineWidth: 1,
      amplitude: -30,
      wavelength: 30
    },
    {
      timeModifier: 3,
      lineWidth: 1,
      amplitude: 40,
      wavelength: 40
    },
    {
      timeModifier: 0.5,
      lineWidth: 1,
      amplitude: -60,
      wavelength: 60
    },
    {
      timeModifier: 1.3,
      lineWidth: 1,
      amplitude: -40,
      wavelength: 40
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