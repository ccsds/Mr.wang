// ==UserScript==
// @name        musicIfo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://ticket.globalinterpark.com/Global/Play/CBT/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
//测试下跨域问题吧
    // Your code sd...VIP
    window.name="跨域测试";
//var clic=document.getElementsByClassName("btn_Booking")[0].getElementsByTagName("img")[0];
    // Your code here...
var body = document.getElementsByTagName("body");
	   var div = document.createElement("div");
		div.innerHTML = '    <iframe id="myIframe" style="width:50%;height:50%;"  src="https://gpoticket.globalinterpark.com/" onload="getData()" "></iframe>';
		document.body.appendChild(div);


        // 初始iframe加载后即执行
        function getData(){
		 var myIframe = document.getElementById('myIframe');
		  // alert('onload外边的加载'+myIframe.contentWindow);
		myIframe.src = '//ticket.globalinterpark.com/Global/Play/CBT/CBTGate.asp?type=G&g=19013796&lang=en';
		myIframe.onload = function(){
			   myIframe = document.getElementById('myIframe');
             alert('gpoticket获取的值'+myIframe.contentWindow.name);
             console.log(myIframe.contentWindow.name);
            };
		}

//end
})();
