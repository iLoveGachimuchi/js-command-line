const ts = new t_server;

const cmd = new t_command(ts);
const tc = new t_console(cmd);

const tk = new t_keyHook;
const dm = new t_dragManager;





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
  setOnClickFunction(getElementOnClick, "clickable");
}

cmd.c("add div style {color:white;  width:  100px;   height: 20px;class:font-horizon  clickable font-size-69; background: white} parrent{byTag:body 0}");
cmd.c("add div style {color:white;  width:  120px;   height: 20px;class:font-horizon  clickable font-size-69; background: white} parrent{byTag:body 0}");
cmd.c("add div style {color:white;  width:  130px;   height: 20px;class:font-horizon  clickable; background: white} parrent{byTag:body 0}");
cmd.c("add div style {color:white;  width:  140px;   height: 20px;class:font-horizon  clickable; background: white} parrent{byTag:body 0}");
/*
setInterval(function () {
  //console.log("Script Reloaded");
  reloadJS("funcs.js","funcs.js");
  reloadJS("server.js","server.js");
}, 5000);*/