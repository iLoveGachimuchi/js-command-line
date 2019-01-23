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


