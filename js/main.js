var GREAT_TEST = true;

const ts = new t_server;

const cmd = new t_command(ts);
const tc = new t_console(cmd);

const tk = new t_keyHook;
const dm = new t_dragManager;



tc.hidden = false;

tc.draw("body");
//tc.hideConsole();

tk.registryKeyHook(
  function () {
    tc.hideConsole();
  },
  "K".charCodeAt(0)
);

tk.registryKeyHook(
  function () {
    alert("gg");
  },
  "Q".charCodeAt(0),
  "W".charCodeAt(0)
);


dm.onDragCancel = function (dragObject) {};
dm.onDragEnd = function (dragObject, dropElem) {};



function test_thisElementByOnClick(element) {
  console.log(element);
  element.innerHTML = "Dont't touch me";
}

window.onload = function () {

}



cmd.c("add style{background: #4930d8}");
cmd.c("add div style {color:white;  width:  100px;   height: 20px;class:font-horizon  clickable font-size-69; background: black} parrent{byTag:body 0}");
cmd.c("add div style {color:white;  width:  120px;   height: 20px;class:font-horizon  clickable font-size-69; background: black} parrent{byTag:body 0} event {click:test_SayHello()}");
cmd.c("add div style {color:white;  width:  130px;   height: 20px;class:font-horizon  clickable; background: black} parrent{byTag:body 0}");
cmd.c("add div style {color:white;  width:  140px;   height: 20px;class:font-horizon  clickable; background: black} parrent{byTag:body 0}");




if (!GREAT_TEST) {
  cmd.c("add div{id: sp-wave-main} parrent{byTag:body}");
  cmd.c("add div{id: sp-wave-main__container} parrent{byId:sp-wave-main}");
  cmd.c("add canvas{id: waves} parrent{byId:sp-wave-main__container}");
  cmd.c("add h1 style{font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,\
    Helvetica Neue, sans-serif;\
  font-size: 24px;\
  letter-spacing: 1px;\
  font-weight: 200;\
  -webkit-user-select: none;\
  -moz-user-select: none;\
  -ms-user-select: none;\
  user-select: none;}parrent{byId:sp-wave-main__container} text{How can I help you?}");


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
}