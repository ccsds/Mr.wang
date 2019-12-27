// ==UserScript==
// @name         填写用户信息
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://gpoticket.globalinterpark.com/Global/Play/Book/BookMain.asp

// @grant        none
// ==/UserScript==

(function() {
    'use strict';
        var MemberName="asdr";
        var birthday="19900325";
        var PhoneNo="15504311821";
        var Card ="Visa";
        var cardnumber	="1234568559584525";
        var ExpirationDate	="2005"; //20年 5月
    var div = document.createElement("div");
    div.style="width:100;height:100;background-color:red;position:absolute;top:50px;left:100px;width: 100px; padding: 20px;"

    div.onclick=function(){
        cas();
    }
    div.innerHTML="开始填写信息了";
    document.body.append(div);
    function cas(){


        var ifrmBookStep= document.getElementById("ifrmBookStep").contentWindow;

        ifrmBookStep.document.getElementsByName("SeatCount")[0].options[1].selected=true;//下拉菜单1
        document.getElementById("SmallNextBtnLink").click();//下一项

        setTimeout(function(){
            ifrmBookStep= document.getElementById("ifrmBookStep").contentWindow;
            ifrmBookStep.document.getElementById("MemberName").value=MemberName;//名字
            var BirYear= ifrmBookStep.document.getElementById("BirYear").options;
            chackSelect(BirYear,birthday.slice(0,4));//年
            var BirMonth= ifrmBookStep.document.getElementById("BirMonth").options;
            chackSelect(BirMonth, birthday.slice(4,6));//月

            var BirDay= ifrmBookStep.document.getElementById("BirDay").options;
            chackSelect(BirDay, birthday.slice(6))
            ifrmBookStep.document.getElementById("PhoneNo").value=PhoneNo;
            ifrmBookStep.document.getElementById("HpNo").value=PhoneNo;
            document.getElementById("SmallNextBtnLink").click();//下一项
            setTimeout(function(){
                ifrmBookStep= document.getElementById("ifrmBookStep").contentWindow;
           document.getElementById("ifrmBookStep").contentWindow.document.getElementsByName("PaymentSelect")[1].click();
                var cardSelect= ifrmBookStep.document.getElementsByTagName("select")[1].options;

                chackSelect(cardSelect,Card);
               ifrmBookStep. document.getElementsByTagName("select")[1].onchange();
                ifrmBookStep.document.getElementById("CardNo1").value=cardnumber.slice(0,4);
                ifrmBookStep.document.getElementById("CardNo2").value=cardnumber.slice(4,8);
                ifrmBookStep.document.getElementById("CardNo3").value=cardnumber.slice(8,12);
                ifrmBookStep.document.getElementById("CardNo4").value=cardnumber.slice(12,16);

                var ValidMonth=ifrmBookStep.document.getElementById("ValidMonth").options;
                var ValidYear=ifrmBookStep.document.getElementById("ValidYear").options;
                chackSelect(ValidMonth,ExpirationDate.slice(2,4));
                chackSelect(ValidYear,ExpirationDate.slice(0,2));
                document.getElementById("SmallNextBtnLink").click();//下一项
                setTimeout(function(){
                    ifrmBookStep= document.getElementById("ifrmBookStep").contentWindow;
                    ifrmBookStep.document.getElementById("CancelAgree").click();
                    ifrmBookStep.document.getElementById("CancelAgree2").click();
                    document.getElementById("LargeNextBtnLink").click();//下一项
                },300);

            },300);

        },250);


    }
    function chackSelect(optio,chac){//选中下拉框函数
        for(var p=0;p<optio.length;p++){
            if(optio[p].innerHTML==chac){
                optio[p].selected=true;
            }
        }
    }

})();
