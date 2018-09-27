'use strict';

module.exports = function(){
    var element = document.createElement('h1');
    let str = "Hello World"
    element.innerHTML = str;
    return element;
};

