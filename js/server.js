var test_FontsShow = function () {
  return '<div class="voice-recorder font-size-18">\
  <p class="font-horizon clickable">Im pinas</p>\
  <p class="font-horizon_lines">Im pinas</p>\
  <p class="font-horizon_linestwo">Im pinas</p>\
  <p class="font-horizon_outline">Im pinas</p>\
  <p class="font-horizon_outlinetwo">Im pinas</p>\
  <p class="font-enzyme font-weight-900 clickable">Im pinas</p>\
  <p class="font-axon">Im pinas</p>\
  <p class="font-axon_light">Im pinas</p>\
  <p class="font-axon_bold">Im pinas</p>\
  <p class="font-axon_ultralight">Im pinas</p>\
  <p class="font-corbel" onclick="test_thisElementByOnClick(this)">Im pinas</p>\
</div>';
}

var t_console_style = {
  font: "12pt/21pt \"corbel\", Arial, sans-serif",
  position: "absolute",
  top: "120px",
  left: "430px",
  width: "600px",
  height: "240px",
  background: "white",
  border: "black 1",
  borderRadius: "5px",
  className: "draggable",

  parent: "body",
  visible: "true"
}

var t_console_textarea_style = {
  textAlign: "inherit",
  resize: "none",
  width: "99%",
  height: "90%",
  borderStyle: "none",
  borderRadius: "5px",
  color: "black",
  className: "font-corbel focus"
};

var t_console_button_style = {
  width: "100%",
  height: "10%",
  borderStyle: "none",
  borderRadius: "5px",
  color: "black",
  text: "ssend",
  className: ""
};



var t_comand_funcList = {
  test_FontsShow: test_FontsShow
};

var t_command_struct = {
  action: "",
  firstParam: "",
  secondParam: "",
  thirdParam: "",
  fourthParam: "",
  fithParam: "",
  sixthParam: "",
  parrent: "",
  text: "",
};

var t_command_struct_add = {
  action: "add",
  tag: "",
  style: "",
  parrent: "",
  event: "",
  text: ""
};
var t_command_struct_del = {};
var t_command_struct_change = {};
var t_command_struct_new = {};
var t_command_struct_func = {};


/**
 * Allows to move objects with a possibility of enclosure.
 * It is applicable for objects from the class "dragabble".
 */
class t_dragManager {

  constructor() {
    this.dragObject = {};
    this.self = this;

    document.onmousemove = (e) => this.onMouseMove(e);
    document.onmouseup = (e) => this.onMouseUp(e);
    document.onmousedown = (e) => this.onMouseDown(e);

    this.onDragEnd = function (dragObject, dropElem) {};
    this.onDragCancel = function (dragObject) {};
  }


  onMouseDown(e) {

    if (e.which != 1) return;

    var elem = e.target.closest('.draggable');
    if (!elem) return;

    this.dragObject.elem = elem;
    this.dragObject.lastFocus = this.findFocus(this.dragObject.elem);

    this.dragObject.downX = e.pageX;
    this.dragObject.downY = e.pageY;

    return false;
  }

  onMouseMove(e) {
    if (!this.dragObject.elem) return;

    if (!this.dragObject.avatar) {
      var moveX = e.pageX - this.dragObject.downX;
      var moveY = e.pageY - this.dragObject.downY;


      if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
        return;
      }

      this.dragObject.avatar = this.createAvatar(e);
      if (!this.dragObject.avatar) {
        this.dragObject = {};
        return;
      }

      var coords = getCoords(this.dragObject.avatar);
      this.dragObject.shiftX = this.dragObject.downX - coords.left;
      this.dragObject.shiftY = this.dragObject.downY - coords.top;

      this.startDrag(e);
    }

    this.dragObject.avatar.style.left = e.pageX - this.dragObject.shiftX + 'px';
    this.dragObject.avatar.style.top = e.pageY - this.dragObject.shiftY + 'px';

    return false;
  }

  onMouseUp(e) {
    if (this.dragObject.avatar) {
      this.finishDrag(e);
    }

    this.backFocus(this.dragObject.lastFocus);
    this.dragObject = {};
  }

  finishDrag(e) {
    var dropElem = this.findDroppable(e);

    if (!dropElem) {
      this.self.onDragCancel(this.dragObject);
      this.encloseElement(this.dragObject.elem, e);
    } else {
      this.self.onDragEnd(this.dragObject, dropElem);
    }
  }

  createAvatar(e) {

    var avatar = this.dragObject.elem;
    var old = {
      parent: avatar.parentNode,
      nextSibling: avatar.nextSibling,
      position: avatar.position || '',
      left: avatar.left || '',
      top: avatar.top || '',
      zIndex: avatar.zIndex || ''
    };

    avatar.rollback = function () {
      old.parent.insertBefore(avatar, old.nextSibling);
      avatar.style.position = old.position;
      avatar.style.left = old.left;
      avatar.style.top = old.top;
      avatar.style.zIndex = old.zIndex
    };

    return avatar;
  }

  startDrag(e) {
    var avatar = this.dragObject.avatar;

    document.body.appendChild(avatar);
    avatar.style.zIndex = 9999;
    avatar.style.position = 'absolute';
  }

  findDroppable(event) {
    this.dragObject.avatar.hidden = true;

    var elem = document.elementFromPoint(event.clientX, event.clientY);

    this.dragObject.avatar.hidden = false;

    if (elem == null) {
      return null;
    }

    return elem.closest('.droppable');
  }

  findFocus(elem) {
    return elem.getElementsByClassName("focus")[0];
  }

  backFocus(elem) {
    if (typeof elem === "undefined") return;
    elem.focus();
  }

  encloseElement(elem, e) {
    var mousePos = getPosition(e)
    var elemParrent = null;
    var arrayTotal = document.getElementsByTagName("*");
    var parent = document.getElementsByTagName("body");
    parent = parent[0];

    for (i = 0; i < arrayTotal.length; i++) {
      if (arrayTotal[i].tagName === "DIV" && arrayTotal[i] !== elem) {

        elemParrent = getPosAndSize(arrayTotal[i]);
        if ((mousePos.x > elemParrent.top && mousePos.y < elemParrent.bottom) &&
          (mousePos.x > elemParrent.left && mousePos.y < elemParrent.right)) {
          parent = arrayTotal[i];

        }
      }

    }

    if (parent !== null) {
      try {
        parent.appendChild(elem);
      } catch (err) {
        parent = document.getElementsByTagName("body");
        parent = parent[0];
        parent.appendChild(elem);
        console.log(err);
      }
    }
  }
};


/**
 * Iintercepts pressing of keys on the page and appoints functions
 * It is not carried out in a case when focus is on input "text" and teaxtarea
 */
class t_keyHook {

  constructor() {
    this.hookActive = true;
    this.keyHooks = [];
  }

  registryKeyHook(func) {
    var codes = [].slice.call(arguments, 1);

    this.tryRegistry(func, codes);

    if (!this.hookActive) return;

    var pressed = {};
    var makeFunc = true;

    document.onkeydown = (e) => {
      if (document.activeElement.tagName === "TEXTAREA" ||
        (document.activeElement.tagName === "INPUT" && document.activeElement.type === "text")) {
        return;
      }

      e = e || window.event;

      pressed[e.keyCode] = true;

      for (var i = 0; i < this.keyHooks.length; i++) {
        for (var j = 0; j < this.keyHooks[i].c.length; j++) {
          if (!pressed[this.keyHooks[i].c[j]]) {
            makeFunc = false;
          }
        }
        if (makeFunc === true) {
          pressed = {};
          this.keyHooks[i].f();
        } else {
          makeFunc = true;
        }
      }
    };

    document.onkeyup = (e) => {
      e = e || window.event;
      delete pressed[e.keyCode];
    };
  }

  unRegistryKeyHook(codes) {
    for (let i; i < this.keyHooks.length; i++) {
      if (isArrayEqual(this.keyHooks[i].c, codes)) {
        this.keyHooks.slice(i, 1);
        makeRegisrty = false;
      }
    }
  }

  tryRegistry(func, codes) {
    var makeRegisrty = true;

    for (let i; i < this.keyHooks.length; i++) {
      if (isArrayEqual(this.keyHooks[i].c, codes)) {
        this.keyHooks[i] = ({
          c: codes,
          f: func
        });
        makeRegisrty = false;
      }
    }

    makeRegisrty ?
      this.keyHooks.push({
        c: codes,
        f: func
      }) : false;
  }

};


/**
 * The console for communication with the server
 */
class t_console {

  constructor(server) {
    this.server = server;

    this.console_style = t_console_style;

    this.textarea_styles = t_console_textarea_style;
    this.button_styles = t_console_button_style;

    this.div = null;
    this.textarea = null;
    this.button = null;
  }

  draw(parent) {
    var obj_parent = document.getElementById(parent);
    if (isEmptyObject(obj_parent)) {
      obj_parent = document.getElementsByClassName(parent);
      if (isEmptyObject(obj_parent)) {
        obj_parent = document.getElementsByTagName(parent);
        if (isEmptyObject(obj_parent)) {
          console.log("It did not manage to find the parent, the standard parent \"body\" will be used");
          obj_parent = document.getElementsByTagName(this.parent);
        } else {
          this.parent = parent;
        }
      } else {
        this.parent = parent;
      }
    } else {
      this.parent = parent;
    }

    this.feelStyles();
    this.feelEvents();

    obj_parent = obj_parent[0];

    this.div.appendChild(this.textarea);
    this.div.appendChild(this.button);
    obj_parent.appendChild(this.div);
  }

  feelStyles() {
    this.div = document.createElement("div");
    this.textarea = document.createElement("textarea");
    this.button = document.createElement("button");

    this.div.style.font = this.console_style.font;
    this.div.style.width = this.console_style.width;
    this.div.style.height = this.console_style.height;
    this.div.style.background = this.console_style.background;
    this.div.style.border = this.console_style.border;
    this.div.style.borderRadius = this.console_style.borderRadius;
    this.div.style.position = this.console_style.position;
    this.div.style.top = this.console_style.top;
    this.div.style.left = this.console_style.left;
    this.div.className = this.console_style.className;

    this.textarea.className = this.textarea_styles.className;
    this.textarea.style.textAlign = this.textarea_styles.textAlign;
    this.textarea.style.resize = this.textarea_styles.resize;
    this.textarea.style.width = this.textarea_styles.width;
    this.textarea.style.height = this.textarea_styles.height;
    this.textarea.style.borderStyle = this.textarea_styles.borderStyle;
    this.textarea.style.borderRadius = this.textarea_styles.borderRadius;
    this.textarea.autofocus = true;

    this.button.style.className = this.textarea_styles.className;
    this.button.style.width = this.button_styles.width;
    this.button.style.height = this.button_styles.height;
    this.button.style.borderStyle = this.button_styles.borderStyle;
    this.button.style.borderRadius = this.button_styles.borderRadius;
    this.button.style.color = this.button_styles.color;
    this.button.innerHTML = this.button_styles.text;
  }

  feelEvents() {
    this.button.addEventListener("click", (e) => this.onSend());
  }

  onSend() {
    this.server._get(this.textarea.value);
    this.textarea.value = "";
  }

  hideConsole() {
    this.div.style.display = this.div.style.display === "none" ? "" : "none";
  }
};



class t_server_log {

  constructor() {
    this.erLog = [];
  }

  printStatus() {
    console.log("==================\nserver active\n==================");
  }
};


/**
 * 
 * add
 * ""
 * style{param1: "", param2: "", ClassName: ""}
 * "event":""
 * 
 * del
 * ""
 */
class t_command {

  constructor(server) {
    this.server = server;
    this.answer = "";
  }

  c(line) {

  }

  c_add(tag, style, parrent, event) {

  }

  c_add_style(findBy, style) {

  }

  c_add_event(findBy, event) {

  }


  c_del(findBy) {

  }

  c_del_style(findBy, style) {

  }

  c_del_event(findBy, event) {

  }


  c_change_style(findBy, style) {

  }

  c_change_event(findBy, event) {

  }


  c_load_func(func) {

  }

  c_new_func(func) {

  }



  findElem(findBy) {

  }

  /**
   * Checks a line for existence of structure. If there is no relevant structure stops work
   * @param {string} line 
   * @return {object} type of structure
   */
  isComand(line) {
//TODO: попытаться регистрировать структуру "t_command_struct_add" и выполнить функцию "test_FontsShow"
  }

  findStruct(line) {

  }
};


class t_server {

  constructor(log) {
    this.cmd = new t_command;

    this.log = log;
    this.log.printStatus();
  }

  _get(command) {
    this.cmd.c(command);
    return this.cmd.answer;
  }


};