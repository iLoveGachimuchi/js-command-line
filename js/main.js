const ts = new t_server;

const cmd = new t_command(ts);
const tc = new t_console(cmd);

const tk = new t_keyHook;
const dm = new t_dragManager;


cmd.sessionSave = false;
tc.hidden = true;
var command = (c) => {
  cmd.c(c);
}

tc.draw("body");

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



var recorder;

function startrecord() {
  startUserMedia();
}

function startUserMedia() {
  recorder = new Recorder(microfonesource);
  recorder && recorder.record();
}

function stoprecord() {
  recorder && recorder.stop();
  alert("Stopped recording.");
  recorder && recorder.exportWAV(function (blob) {
    var url = URL.createObjectURL(blob);
    var li = document.createElement("li");
    var au = document.createElement("audio");
    var hf = document.createElement("a");
    au.controls = true;
    au.src = url;
    hf.href = url;
    hf.download = new Date().toISOString() + ".wav";
    hf.innerHTML = hf.download;
    li.appendChild(au);
    li.appendChild(hf);
    recordingslist.appendChild(li);
  });
}


window.onload = function () {

}