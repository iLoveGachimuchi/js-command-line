const tl = new t_server_log;
const ts = new t_server(tl);

const tk = new t_keyHook;
const tc = new t_console(ts);
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


