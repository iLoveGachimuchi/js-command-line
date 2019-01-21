/**
 * Function removes variable type in console.
 * @param  {any} value - Variable of semi-couples any types of data.
 */
function varDump(value) {
  if (Array.isArray(value)) {
    console.log(value);
    for (var val in value) {
      varDump(value[val]);
    }
    return;
  }
  if (value === null) {
    console.log("Type :", typeof (value), ", Value :", value);
    return;
  }
  if (typeof (value) === 'object') {
    console.log(value);
    for (var val in value) {
      varDump(value[val]);
    }
    return;
  }
  console.log("Type :", typeof (value), ", Value :", value);
  return;
}


Object.prototype.isEmpty = function () {
  for (var key in this) {
    if (this.hasOwnProperty(key))
      return false;
  }
  return true;
}

Object.size = function (obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};


///////////////////////////////////////////////////////////
//IS verification's
function isEmptyObject(obj) {
  if (isNull(obj))
    return true;

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      return false;
    }
  }
  return true;
}

function isNull(obj) {
  return obj === null ? true : false;
}

function spliceArrays(Ob1, Ob2) {
  var buf_result = [];

  for (var i = 0; i <= Ob1.length; i++) {
    if (i != Ob1.length) {
      Array.isArray(Ob1[i]) ? buf_result = spliceArrays(buf_result, Ob1[i]) : buf_result.push(Ob1[i]);
    }
  }
  for (var i = 0; i <= Ob2.length; i++) {
    if (i != Ob2.length) {
      Array.isArray(Ob2[i]) ? buf_result = spliceArrays(buf_result, Ob2[i]) : buf_result.push(Ob2[i]);
    }
  }
  return buf_result;
}


function toOneDimensionalArray(Ob) {
  var buf_Ob = [];
  for (var j = 0; j <= Ob.length - 1; j++) {
    Array.isArray(Ob[j]) ? buf_Ob = spliceArrays(buf_Ob, Ob[j]) : buf_Ob.push(Ob[j]);
  }
  return buf_Ob;
}


function isArrayEqual(Ob1, Ob2) {
  if (!Array.isArray(Ob1) || !Array.isArray(Ob2) || Ob1.length != Ob2.length) {
    return false;
  }
  Ob1 = toOneDimensionalArray(Ob1);
  Ob2 = toOneDimensionalArray(Ob2);
  for (var i = 0; i < Ob1.length; i++) {
    if ((Ob1[i] !== Ob2[i]) && (!isNaN(Ob1[i]) && !isNaN(Ob2[i]))) {
      return false;
    }
  }
  return true;
}


///////////////////////////////////////////////////////////
//GETTERs
function getElementOnClick() {
  let element = this;
  //console.log(varDump(element.className));
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

function getPosAndSize(elem) {;
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    right: box.right + pageXOffset,
    bottom: box.bottom + pageYOffset
  };

}

function getPosition(e) {
  var posx = 0;
  var posy = 0;

  if (!e) var e = window.event;

  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft +
      document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop +
      document.documentElement.scrollTop;
  }
  return {
    x: posx,
    y: posy
  }
}


///////////////////////////////////////////////////////////
//SETTERs
function setOnClickFunction(fn, forClass) {
  var elements = document.getElementsByTagName("*");
  if (isEmptyObject(elements)) {
    console.log("it is not possible to register the onClick function for a class " + forClass);
    return;
  }
  for (i = 0; i < elements.length; i++) {
    if (classNameFinder(elements[i], forClass))
      elements[i].onclick = fn;
  }
}




///////////////////////////////////////////////////////////
//MAIN
function classNameFinder(object, name) {
  var tempName;
  var objClassName = object.className + " ";
  for (var i = 0; i < objClassName.length; i++) {
    if (objClassName[i] === " ") {
      if (tempName === name)
        return true;
      else
        tempName = "";
    } else {
      tempName += objClassName[i];
    }
  }
  return false;
}


function test_thisElementByOnClick(element) {
  console.log(element);
  element.innerHTML = "Dont't touch me";
}

window.onload = function () {
  setOnClickFunction(getElementOnClick, "clickable");
}