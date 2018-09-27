'use strict';

var component = require('./component.js');
import css from "./styles/main.css";
import less from "./styles/main.less";
import sass from "./styles/main.scss";
var json =require('../config.json');

document.getElementById("json").innerHTML= json.name;
document.body.appendChild(component());
$(document).ready(function(){
    console.log($("#a").html());
});
