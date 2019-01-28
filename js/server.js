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

function test_SayHello() {
  alert("its a test, hi");
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


var t_command_com = ["add", "del", "change", "server", "func", "load"];
var t_command_events = ["click", "mouseDown", "blur", "focus", "change", "dblclick", "keydown", "keypress", "keyup", "load"];
var t_command_tags = ["p", "body", "div", "span", "main", "button", "br", "input", "form", "img", "li", "ul", "table", "section", "td", "th", "title", "a", "header", "footer"];
var t_command_param = ["type", "src", "image", "name", "id", "text", "value"];
var t_command_params = ["style", "parrent", "text", "in"];


var t_command_funcs = {
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
  tag: "",
  style: "",
  parrent: "",
  event: "",
  param: "",
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

    var elem = e.target.closest(".draggable");
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

    this.dragObject.avatar.style.left = e.pageX - this.dragObject.shiftX + "px";
    this.dragObject.avatar.style.top = e.pageY - this.dragObject.shiftY + "px";

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
      position: avatar.position || "",
      left: avatar.left || "",
      top: avatar.top || "",
      zIndex: avatar.zIndex || ""
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
    avatar.style.position = "absolute";
  }

  findDroppable(event) {
    this.dragObject.avatar.hidden = true;

    var elem = document.elementFromPoint(event.clientX, event.clientY);

    this.dragObject.avatar.hidden = false;

    if (elem == null) {
      return null;
    }

    return elem.closest(".droppable");
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

  constructor(cmd) {
    this.cmd = cmd;

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
    this.cmd.c(this.textarea.value)
    this.textarea.value = "";
  }

  hideConsole() {
    this.div.style.display = this.div.style.display === "none" ? "" : "none";
  }
};



class t_console_log {

  constructor() {
    this.story = [];
    this.err = [];
    this.tp = [];
    this.s = false;
    this.t = false;
  }

  print(line) {
    console.log(line);
  }

  printf(line) {
    this.story.push(line);
    if (this.s) console.log(line);
  }

  throw (line) {
    this.err.push(line);
    if (this.t) console.log(line);
  }

  type(line) {
    this.tp.push(line);
    if (this.s) varDump(line);
  }

  log() {
    console.log("==================\nErrors\n==================");
    for (let i = 0; i < this.err.length; i++) console.log(err[i]);

    console.log("==================\nStories\n=================");
    for (let i = 0; i < this.err.length; i++) console.log(story[i]);

    console.log("==================\nTypes\n===================");
    for (let i = 0; i < this.err.length; i++) varDump(story[i]);
  }
};


//TODO: добавить метод set style
/**
 * 
 * add
 * tag /input{type:text, src:src/2}
 * style{param1: "", param2: "", ClassName: ""/class: ""}
 * parrent
 * "event":""
 * text
 * 
 * del
 * ""
 */
class t_command {

  constructor(server) {
    this.server = server;
    this.answer = "";
    this.story = [];
    this.eventListenerOnce = [];

    this.log = new t_console_log;
    this.log.s = false;
    this.log.t = true;

    this.uniqueId = 0;
  }

  c(line) {
    this.log.printf(line);

    var r = true;
    var line = removeSpace(line);

    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === "{" || line[i] === "}")
        a++;
      if (line[i] === "\"")
        b++;
      if (line[i] === "'")
        c++;
      if (line[i] === "(" || line[i] === ")")
        d++;
    }

    if (a % 2 !== 0) {
      this.log.throw("Is not enough closing \"}\" in " + line);
      return false;
    }
    if (b % 2 !== 0) {
      this.log.throw("Is not enough closing \" in " + line);
      return false;
    }
    if (c % 2 !== 0) {
      this.log.throw("Is not enough closing ' in " + line);
      return false;
    }
    if (d % 2 !== 0) {
      this.log.throw("Is not enough closing \")\" in " + line);
      return false;
    }

    var arr = line.split(/\s* \s*/);

    switch (arr[0].toLowerCase()) {
      case "add":
        r = this.add(line);
        break;
      case "del":
        r = this.del(line);
        break;
      case "change":
        break;
      case "load":
        break;
      case "func":
        break;
      case "server":
        break;
      case "c":
        break;
      default:
        this.log.throw("Unknown command in " + arr[0]);
        return false;
    }

    return true;
  }

  //add p style{color:white;  width:  10px;  class:font-horizon  clickable}
  //add p style{color:white;  width:  10px;  class:font-horizon  clickable}parrent{last}
  //add div{id:123, name : 333} style {color:white;  width:  10px;   height: 20px;class:font-horizon  clickable; background: white} parrent{byTag:body 0}
  //add div{id:123, name : 333} style {color:white;  width:  10px;   height: 20px;class:font-horizon  clickable; background: white} parrent{byTag:body} event {click:{alert("hi")}} text{hello my pinas}
  //add div{id:123, name : 333} style {color:white;  width:  10px;  height: 20px; class:font-horizon  clickable; background: white} parrent{byTag:body} event {click:{alert("hi")}; dblclick:{alert("mark")}} text{hello my pinas}
  //add div{id:123, name : 333} style {color:white;  width:  10px;  height: 20px; class:font-horizon  clickable; background: white} parrent{byTag:body} event {click:{alert("hi");alert("heu");if(1>0){alert("hi")}}; dblclick:test_SayHello()} text{hello my pinas}
  //add input{type:text} style {color:white;  width:  10px;   height: 20px;class:font-horizon  clickable} parrent{byTag:body}
  c_add(tag, style, parrent, event, text) {
    var param = "";

    //Get tag and his param
    tag = this.splitCommandParams(tag);
    param = tag[1];

    var newTag = document.createElement(tag[0]);

    if (param !== "") {
      param = this.splitParams(param, ",");

      let isId = false;

      for (let i = 0; i < param.length; i++) {
        newTag.setAttribute(param[i][0], param[i][1]);
        if (param[i][0] === "id") isId = true;
      }

      if (!isId) {
        newTag.setAttribute("id", "generated-id-" + this.uniqueId);
        this.uniqueId++;
      }
    } else {
      newTag.setAttribute("id", "generated-id-" + this.uniqueId);
      this.uniqueId++;
    }
    param = "";

    //Get parrent
    var oldParrent = {};
    parrent = this.splitCommandParams(parrent);
    if (parrent[1].toLowerCase().trim() !== "last") {
      oldParrent = this.getElement(parrent[1]);


      if (Array.isArray(oldParrent)) oldParrent = oldParrent[0];
      if (isNull(oldParrent)) return false;

    } else {
      if (this.story.length > 0)
        oldParrent = document.getElementById(this.story[this.story.length - 1]);
      else {
        this.log.throw("There is no possibility of search, \"body\" will be by default used");
        oldParrent = document.getElementsByTagName("body")[0];
      }
    }

    //Get style
    newTag = this.setStyle(newTag, style);
    newTag = this.setEvent(newTag, event);
    if (text.length > 0)
      newTag.innerHTML += this.splitCommandParams(text)[1];

    oldParrent.appendChild(newTag);
    this.story.push(newTag.id);
    this.log.printf(newTag);
  }

  //add in{byid:generated-id-0} event {dblclick:{alert("not mark")}} text{hello my pinas} {color:white;  width:  10px; height: 100px;  background: black}
  //add in{byClass:clickable} style {color:white;  width:  10px; height: 12%;  background: black}
  //add in{byTag:223} style {color:white;  width:  10px; height: 100px;  background: black}
  //add in{byClass:clickable *} style {color:white;  width:  10px; height: 12%;  background: black}
  //add in{byid:123} style {color:white;  width:  10px;  height: 100px; background: black}
  c_add_style(findBy, style) {

    findBy = this.splitCommandParams(findBy);
    findBy = this.getElement(findBy[1]);

    if (isNull(findBy)) {
      this.log.throw("There is no possibility of search, \"body\" will be by default used");
      findBy = document.getElementsByTagName("body")[0];
    }

    if (Array.isArray(findBy)) {
      for (let i = 0; i < findBy.length; i++)
        findBy[i] = this.setStyle(findBy[i], style);
    } else {
      findBy = this.setStyle(findBy, style);
    }
    this.log.printf(findBy);
  }

  //add in{byClass:clickable} event {dblclick:{alert("mark")}} text{hello my pinas}
  //add in{byClass:clickable *} event {dblclick:{alert("mark")}} text{hello my pinas}
  //add in{byid:123} event {dblclick:{alert("mark")}} text{hello my pinas}
  c_add_event(findBy, event) {

    findBy = this.splitCommandParams(findBy);
    findBy = this.getElement(findBy[1]);

    if (isNull(findBy)) {
      this.log.throw("There is no possibility of search, \"body\" will be by default used");
      findBy = document.getElementsByTagName("body")[0];
    }

    if (Array.isArray(findBy)) {
      for (let i = 0; i < findBy.length; i++)
        findBy[i] = this.setEvent(findBy[i], event);
    } else {
      findBy = this.setEvent(findBy, event);
    }
    this.log.printf(findBy);
  }

  //add in{byid:generated-id-0} event {dblclick:{alert("not mark")}} text{hello my pinas} style{color:white;  width:  10px; height: 100px;  background: black}
  c_add_text(findBy, text) {

    text = this.splitCommandParams(text)[1];
    findBy = this.splitCommandParams(findBy);
    findBy = this.getElement(findBy[1]);

    if (isNull(findBy)) {
      this.log.throw("There is no possibility of search, \"body\" will be by default used");
      findBy = document.getElementsByTagName("body")[0];
    }

    if (Array.isArray(findBy)) {
      for (let i = 0; i < findBy.length; i++)
        findBy[i].innerHTML += text;
    } else {
      findBy.innerHTML += text;
    }
    this.log.printf(findBy);
  }



  //del in {byTag:div *}
  c_del(findBy) {

    findBy = this.splitCommandParams(findBy);
    findBy = this.getElement(findBy[1]);

    if (isNull(findBy)) {
      this.log.throw("There is no possibility of search, \"body\" will be by default used");
      findBy = document.getElementsByTagName("body")[0];
    }

    if (Array.isArray(findBy)) {
      for (let i = 0; i < findBy.length; i++)
        findBy[i].remove();
    } else {
      findBy.remove();
    }

  }

  //del in {byTag:div *} style event{dblclick; click} text
  //del in{byTag:div *} style{className: clickable}
  //del in{byTag:div *} style{background: white; className: clickable}
  c_del_style(findBy, style) {

    findBy = this.splitCommandParams(findBy);
    findBy = this.getElement(findBy[1]);

    if (isNull(findBy)) {
      this.log.throw("There is no possibility of search, \"body\" will be by default used");
      findBy = document.getElementsByTagName("body")[0];
    }

    //console.log(findBy);
    if (Array.isArray(findBy)) {
      for (let i = 0; i < findBy.length; i++)
        findBy[i] = this.unSetStyle(findBy[i], style);
    } else {
      findBy = this.unSetStyle(findBy, style);
    }
    //console.log(findBy);
  }

  //TODO сделать удалить event
  //del in{byTag:div 1} event{click}
  //del in{byTag:div 1} event{click, dblclick}
  //del in{byTag:div 1} style{background; className: clickable font-horizon} event{click, dblclick}
  c_del_event(findBy, event) {
    //removeEventListener
    //elem.removeEventListener(param[i][0], f, false);
  }

  c_del_text(findBy, text) {

  }



  c_change_style(findBy, style) {

  }

  c_change_event(findBy, event) {

  }

  c_change_text(findBy, text) {

  }


  c_load_func(func) {

  }

  c_new_func(func) {
    //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/eval
    // var obj = {
    //   hello: "World",
    //   sayHello: (function () {
    //     console.log("I say Hello!");
    //   }).toString()
    // };
    // var myobj = JSON.parse(JSON.stringify(obj));
    // myobj.sayHello = new Function("return (" + myobj.sayHello + ")")();
    // myobj.sayHello();

  }



  unSetStyle(elem, style) {

    if (style === "style") {
      elem.style.cssText = "";
      return elem;
    }

    if (style.length > 0) {
      let oldStyles = this.splitCommandParams("style{" + elem.style.cssText + "}");
      style = this.splitCommandParams(style);
     
      let styleClassName = this.getClassName(style[1]);
 
      oldStyles = this.splitParamsDetail(oldStyles[1], ";");
      style = this.splitParamsDetail(style[1], ";");

      //deletes sublines {string} v  from line {string} l
      var f1 = function (v, l) {
        if (typeof l === "undefined") return v;

        let c = "";
        if (v.indexOf(l) > -1) {
          c = v.replace(l, "");      
          return c.trim();
        } 

        if (v.indexOf(" ") > -1) {
         
          let buf1 = v.split(" ");
          let buf2 = l.split(" ");

          for (let i = 0; i < buf1.length; i++) {
            for (let j = 0; j < buf2.length; j++) {
              if (buf1[i] === buf2[j]) {
                buf1.splice(i, 1);
                i--;
              }
            }
          }

          c = buf1.join(" ");
        } else return v;
        
        return c;
      };

      var f2 = function (arr, l) {

        let c = "";
        for (let i = 0; i < arr.length; i++) {
          if (Array.isArray(arr[i])) {
            c += f2(arr[i], ":") + l;
          } else {
            c += arr[i];
            if (i < arr.length - 1) c += l; 
          }
        }
      
        return c;
      };

      for(let i = oldStyles.length - 1; i > -1; i--) {
        for(let j = style.length - 1; j > -1; j--) {
          if (oldStyles[i][0] === style[j][0]) {
            if (typeof style[j][1] === "undefined" || style[j][1] === "" ) {
              oldStyles.splice(i, 1);
            } else {
              oldStyles[i][1] = f1(oldStyles[i][1], style[j][1]);
            }
          }
        }
      }

      this.log.printf(elem.style.cssText);
      elem.style.cssText = f2(oldStyles, ";");
      this.log.printf(elem.style.cssText);
      
      this.log.printf(elem.className);
      this.log.printf(styleClassName);
      elem.className = f1(elem.className.trim(), styleClassName)
      this.log.printf(elem.className);
    }

    return elem;
  }

  

  setStyle(elem, style) {

    var buf = "";
    var param = "";

    if (style.length > 0) {
      style = this.splitCommandParams(style);
      buf = style[0];
      param = style[1];

      elem.className += " " + this.getClassName(param);
      elem.style.cssText = param;
    }

    this.log.printf(buf + "\t " + param);
    return elem;
  }

  setEvent(elem, event) {
    if (event.length < 1) return elem;

    var pastElem = [];
    for (let i = 0; i < this.eventListenerOnce.length; i++) {
      if (elem.id === this.eventListenerOnce[i].e) {
        pastElem.push(this.eventListenerOnce[i]);
      }
    }

    var param = this.splitFuncs(event.trim());

    for (let i = 0; i < param.length; i++) {
      function f(e) {
        eval(param[i][1]);
      };

      if (pastElem.length > 0) {
        let once = true;
        for (let j = 0; j < pastElem.length; j++) {
          if (pastElem[j].s === param[i][0] && pastElem[j].f === param[i][1]) {
            once = false;
            break;
          }
        }
        if (once)
          elem.addEventListener(param[i][0], f, false);

      } else {
        this.eventListenerOnce.push({
          e: elem.id,
          s: param[i][0],
          f: param[i][1]
        });
        elem.addEventListener(param[i][0], f, false);
      }
    }

    this.log.printf(param);
    return elem;
  }



  //findBy
  getElement(findBy) {

    var by = "";
    var elem = "";
    var index = "";

    for (let i = 0; i < findBy.length; i++) {
      if (findBy[i] !== ":") by += findBy[i];
      else {
        elem = findBy.substr(i + 1, findBy.length - i);
        break;
      }
    }

    by = by.trim();
    elem = elem.trim();

    for (let i = 0; i < elem.length; i++) {
      if (elem[i] === " ") {
        index = elem.substr(i + 1, elem.length - i).trim();
        elem = elem.substr(0, i).trim();
        break;
      }
    }
    if (index !== "*") {
      index = parseInt(index);
      if (isNaN(index))
        index = 0;
    }

    switch (by.toLowerCase()) {
      case "bytag":
        findBy = index === "*" ? document.getElementsByTagName(elem) : document.getElementsByTagName(elem)[index];
        break;
      case "byclass":
        findBy = index === "*" ? document.getElementsByClassName(elem) : document.getElementsByClassName(elem)[index];
        break;
      case "byid":
        findBy = document.getElementById(elem);
        break;
      case "byname":
        findBy = index === "*" ? document.getElementsByClassName(elem) : document.getElementsByName(elem)[index];
        break;
      default:
        this.log.throw("There is no possibility of search on " + by);
        return null;
    }

    if (typeof findBy === "undefined") {
      this.log.throw("There is no possibility of search, \"body\" will be by default used");
      findBy = document.getElementsByTagName("body")[0];
    }

    this.log.printf(elem);
    this.log.printf(by);
    this.log.printf(index);

    if (HTMLCollection.prototype.isPrototypeOf(findBy)) {
      findBy = toArray(findBy);
    }

    return findBy;
  }

  getClassName(value) {
    var clas = "";

    let className = value.indexOf("class");
    if (className > -1 && (value[className + 5] === " " || value[className + 5] === ":")) {
      if (value[className + 5] === " ") className++;
      className += 6;
      let i = className;

      for (i; i < value.length; i++) {
        if (value[i] === ";") break;
      }

      className = value.substr(className, i - className);
      clas += className.trim();
    } else {
      
        className = value.indexOf("className");
        if (className > -1 && (value[className + 95] === " " || value[className + 9] === ":")) {
          if (value[className + 9] === " ") className++;
          className += 10;
          let i = className;
    
          for (i; i < value.length; i++) {
            if (value[i] === ";") break;
          }
    
          className = value.substr(className, i - className);
          clas += className.trim();
      }
    }
    this.log.printf("class: " + className);

    return clas;
  }



  splitParams(value, on) {
  
    var buf = "";
    var arr = [];

    for (let i = 0; i < value.length; i++) {
      let ar = [];
      if (value[i] === ":") {
        ar.push(buf);
        buf = "";
        for (i++; i < value.length; i++) {
          if (value[i] !== on) {
            buf += value[i];
          } else break;
        }
        ar.push(buf);
        arr.push(ar);
        buf = "";
      } else buf += value[i];
    }
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === "" || arr[i][j] === " ") {
          arr[i].slice(i, 1);
        } else {
          arr[i][j] = arr[i][j].replace(/\s+/g, "");
        }
      }
    }

    return arr;
  }

  splitLineParams(line) {
    var len = line.length;
    var arr = [];
    var buf = "";
    var i = 0;

    var f1 = () => {
      for (i; i < len; i++) {
        if (line[i] !== "}")
          buf += line[i];
        else break;
      }
    }

    //for "event"
    var f2 = () => {
      var a = 1;
      buf += "{";
      for (i++; a > 0; i++) {
        if (line[i] === "{") a++;
        if (line[i] === "}") a--;
        if (typeof line[i] !== "undefined")
          buf += line[i];
        if (i >= len) break;
      }
    }

    for (i = 0; i < len; i++) {
      if (this.isParams(buf)) {
        if (line[i] === " ") {
          if (line[i + 1] === "{") {
            i++;
            f1();
            arr.push(buf + "}");
          }
          buf = "";
        } else {
          if (line[i] === "{") {
            f1();
            arr.push(buf + "}");
            buf = "";
          } else
            buf += line[i];
        }
      } else {
        if (line[i] === " ") {
          if (line[i + 1] === "{") {
            i++;
            f2();
            arr.push(buf);
          }
          buf = "";
        } else {
          if (line[i] === "{") {
            f2();
            arr.push(buf);
            buf = "";
          } else
            buf += line[i];
        }
      }
    }

    return arr;
  }

  splitCommand(line) {
    var arr = [];
    var buf = ""

    line += " ";

    var f = () => {
      for (i; i < line.length; i++) {
        if (line[i] === "}") {
          break;
        }
      }
    }

    for (i = 0; i < line.length; i++) {

      if (line[i] === " " || line[i] === "{") {

        if (this.isParams(buf) || buf === "event") {
          if (line[i] === " ") {
            if (line[i + 1] === "{") f();
          } else {
            if (line[i] === "{") f();
          }
          arr.push(buf.trim());
        }
        buf = "";

      } else {
        buf += line[i];
      }
    }

    this.log.printf(line);
    this.log.printf(arr);
    return arr;
  }

  splitCommandParams(value) {
    var buf = "";
    var param = "";
    var arr = [];

    for (let i = 0; i < value.length; i++) {
      if (value[i] === " " || value[i] === "{") {
        if (value[i] === " ") i++;
        if (typeof value[i] === "undefined") break;
        for (i; i < value.length; i++) {
          if (value[i] !== "{" && value[i] !== "}")
            param += value[i];
        }
        break;

      } else {
        buf += value[i];
      }
    }

    arr.push(buf);
    arr.push(param);
    return arr;
  }

  splitFuncs(value) {
    var arr = [];
    var buf = "";
    var param = "";


    param = value.substr(value.indexOf("{") + 1, value.length - value.indexOf("{") - 2).trim();

    for (let i = 0; i < param.length; i++) {
      if (param[i] === ":") {
        i++;
        let a = 0;
        let ar = [];

        buf = buf.substr(0, i).trim();
        ar.push(buf);

        buf = "";

        if (param[i] === "{") {
          i += 1;
          a++;
        } else if (param[i + 1] === "{") {
          i += 2;
          a++;
        }


        if (a > 0) {
          for (i; a > 0; i++) {
            if (i >= param.length) break;
            if (param[i] === "{") a++;
            if (param[i] === "}") a--;
            if (a === 0) break;
            buf += param[i];
          }
        } else {
          for (i; i < param.length; i++) {
            if (param[i] !== ";") buf += param[i];
            else break;
          }
        }

        if (param[i + 1] === ";") i += 2;
        else if (param[i + 2] === ";") i += 3;


        buf = buf.trim();
        ar.push(buf);
        arr.push(ar);

        buf = "";
      } else buf += param[i];
    }

    this.log.printf(arr);
    this.log.printf(param);

    return arr;
  }

  splitParamsDetail(value, on) {
    
    var buf = "";
    var arr = [];

    for (let i = 0; i < value.length; i++) {
      let ar = [];
      if (value[i] === ":") {
        ar.push(buf);
        buf = "";
        for (i++; i < value.length; i++) {
          if (value[i] !== on) {
            buf += value[i];
          } else break;
        }
        ar.push(buf);
        arr.push(ar);
        buf = "";
      } else {
        if (value[i] === on) {
          ar.push(buf);
          arr.push(ar);
          buf = "";
        } else buf += value[i];
      }
    }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === "" || arr[i][j] === " ") {
          arr[i].slice(i, 1);
        } else {
          arr[i][j] = arr[i][j].replace(/\s+/g, " ").trim();
        }
      }
    }

    return arr;
  }


  //add new style-name{}
  //add p style{color:white;  width:  10px;  class:font-horizon  clickable}
  //add input{type:text}  style {color:white;  width:  10px;  class:font-horizon  clickable} parrent{byTag:body} 
  //add input{type:text}  style {color:white;  width:  10px;  class:font-horizon  clickable} parrent{byTag:body!} 
  //add input{type:text}  style {color:white;  width:  10px;  class:font-horizon  clickable} parrent{byTag:body} event {click:test_SayHello()} text{hello my pinas}
  //add input{type:text}  style {color:white;  width:  10px;  class:font-horizon  clickable} parrent{byTag:body} event {click:{alert("hi")}} text{hello my pinas}
  //add div{id:123, name : 333} style {color:white;  width:  10px;  class:font-horizon  clickable; background: white} parrent{byTag:body} event {click:{alert("hi")}; dblclick:test_SayHello()} text{hello my pinas}
  //add in{byTag:body} style {color:white;  width:  10px;  class:font-horizon  clickable}
  //add in{byTag:body} style {color:white;  width:  10px;  class:font-horizon  clickable} event {click:{alert("hi")}} text{hello my pinas}
  add(line) {
    var bufLine = "";
    var bufStr = "";
    var params = [];
    var tag = "";
    var findBy = "";
    var style = "";
    var parrent = "";
    var event = "";
    var text = "";

    for (let i = 0; i < line.length; i++) {
      if (line[i] === " ") {
        for (i++; i < line.length; i++) {
          bufLine += line[i];
        }
      }
    }

    if (bufLine === "") {
      this.log.throw("There are no parameters in " + line);
      return false;
    }

    params = this.splitLineParams(bufLine);
    for (let i = 0; i < params.length; i++) {

      for (let j = 0; j < params[i].length; j++) {

        if (this.isTag(bufStr)) {
          if (params[i][j] === " " || params[i][j] === "{") {
            tag = params[i];
            bufStr = "";
            break;
          }
        }
        if (bufStr === "style") {
          style = params[i];
          bufStr = "";
          break;
        }
        if (bufStr === "parrent") {
          parrent = params[i];
          bufStr = "";
          break;
        }
        if (bufStr === "event") {
          event = params[i];
          bufStr = "";
          break;
        }
        if (bufStr === "text") {
          text = params[i];
          bufStr = "";
          break;
        }
        if (bufStr === "in") {
          if (params[i][j] === " " || params[i][j] === "{") {
            findBy = params[i];
            bufStr = "";
            break;
          }
        }
        bufStr += params[i][j];

      }

    }
    bufStr = "";

    if (tag === "" && findBy === "") {
      for (let i = 0; i < bufLine.length; i++) {
        if (bufLine[i] !== " " || bufLine[i] !== "{") {
          bufStr += bufLine[i];
        }
        if (this.isTag(bufStr)) {
          tag = bufStr;
        }
      }
      bufStr = bufLine = "";
    }


    this.log.printf(params);
    this.log.printf("findBy: " + findBy);
    this.log.printf("tag: " + tag);
    this.log.printf("style: " + style);
    this.log.printf("parrent: " + parrent);
    this.log.printf("event: " + event);
    this.log.printf("text: " + text);


    if (tag.length === 0) {
      if (findBy.length === 0) {
        this.log.throw("It is not possible to find an element. \"body\" will be by default established");
        findBy = "in{byTag:body}";
      }
      if (parrent.length !== 0) {
        this.log.throw("\"" + parrent + "\" will be ignored");
        parrent = "";
      }
      if (style.length !== 0) this.c_add_style(findBy, style);
      if (event.length !== 0) this.c_add_event(findBy, event);
      if (text.length !== 0) this.c_add_text(findBy, text);

      return true;

    } else {
      if (findBy.length !== 0) {
        this.log.throw("\"" + findBy + "\" will be ignored");
        findBy = "";
      }
      if (parrent.length === 0) {
        this.log.throw("There is no parent. \"body\" will be by default established");
        parrent = "parrent{byTag: body}";
      }
      this.c_add(tag, style, parrent, event, text);

      return true;
    }
  }

  //del in{byTag:div 1}
  //del in{byTag:div *}
  //del in{byTag:div *} style{className: clickable}
  //del in{byTag:div *} style
  //del in{byTag:div *} event{dblclick; click}
  //del in{byTag:div *} event
  //del in{byTag:div *} text
  //del in{byTag:div *} style{className: clickable} event{dblclick; click} text
  //del in {byTag:div *} style event{dblclick; click} text
  del(line) {
    var bufLine = "";
    var params = [];

    var findBy = "";
    var style = "";
    var event = "";
    var text = "";

    var f2 = function (val, eq) {
      if (val.length === 0) {
        if (commands.indexOf(eq) !== -1) {
          val = eq;
        }
      }
      return val;
    }

    for (let i = 0; i < line.length; i++)
      if (line[i] === " ")
        for (i++; i < line.length; i++)
          bufLine += line[i];


    var commands = this.splitCommand(bufLine);

    if (bufLine === "") {
      this.log.throw("There are no parameters in " + line);
      return false;
    }

    params = this.splitLineParams(bufLine);
    for (let i = 0; i < params.length; i++) {

      var bufStr = "";
      for (let j = 0; j < params[i].length; j++) {

        if (bufStr === "style") {
          commands.splice(commands.indexOf(bufStr), 1);
          style = params[i];
          bufStr = "";
          break;
        }
        if (bufStr === "event") {
          commands.splice(commands.indexOf(bufStr), 1);
          event = params[i];
          bufStr = "";
          break;
        }
        if (bufStr === "text") {
          commands.splice(commands.indexOf(bufStr), 1);
          text = params[i];
          bufStr = "";
          break;
        }
        if (bufStr === "in") {
          if (params[i][j] === " " || params[i][j] === "{") {
            commands.splice(commands.indexOf(bufStr), 1);
            findBy = params[i];
            bufStr = "";
            break;
          }
        }
        bufStr += params[i][j];
      }

    }


    style = f2(style, "style");
    event = f2(event, "event");
    text = f2(text, "text");

    this.log.printf("findBy: " + findBy);
    this.log.printf("style: " + style);
    this.log.printf("event: " + event);
    this.log.printf("text: " + text);

    if (findBy.length !== 0) {

      let inc = 0;

      if (style.length !== 0) {
        this.c_del_style(findBy, style);
        inc++;
      }
      if (event.length !== 0) {
        this.c_del_event(findBy, event);
        inc++;
      }
      if (text.length !== 0) {
        this.c_del_text(findBy, text);
        inc++;
      }

      if (inc === 0) {
        this.c_del(findBy);
      }
      return true;

    } else {

      this.log.throw("There is no possibility of removal");
      return false;
    }
  }


  isEvent(value) {
    for (let i = 0; i < t_command_events.length; i++) {
      if (t_command_events[i] === value) return true;
    }
    return false;
  }

  isTag(value) {
    for (let i = 0; i < t_command_tags.length; i++) {
      if (t_command_tags[i] === value) return true;
    }
    return false;
  }

  isParam(value) {
    for (let i = 0; i < t_command_param.length; i++) {
      if (t_command_param[i] === value) return true;
    }
    return false;
  }

  isParams(value) {
    for (let i = 0; i < t_command_params.length; i++) {
      if (t_command_params[i] === value) return true;
    }
    return false;
  }
};


class t_server {

  constructor() {}
  _get(command) {}
};