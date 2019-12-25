// ==UserScript==
// @name        日期选择
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://gpoticket.globalinterpark.com/Global/Play/Book/BookMain.asp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.onload=function(){
        var tda='28';
        var ttime="2:00"
        var ifrmBookStep= document.getElementById("ifrmBookStep").contentWindow;
        var tdata=ifrmBookStep.document.getElementsByTagName("td");


        for(var i=0;i<tdata.length;i++){

            if(tdata[i].innerText==tda){
                var a=tdata[i].getElementsByTagName('a')[0];
                a.click();
                setTimeout(function(){
                    var x=true;
                    var tli=ifrmBookStep.document.getElementsByClassName("watch_time")[0].getElementsByTagName('a');
                    for(var o=0;o<tli.length;o++){
                        if( tli[o].innerText.split(ttime).length>1){
                            x=false;
                            tli[o].click();
                            document.getElementById("LargeNextBtnLink").click();
                            setTimeout(function (){xuanzuo(true);},1000)

                        }
                    }if(x){
                        document.getElementById("LargeNextBtnLink").click();
                        setTimeout(function (){xuanzuo(true);},1000)
                    }


                },200)


            }

        }


    }
    //选座
    function xuanzuo(first){
        var f=2;//楼层
        var sp='ABD';
        var lv='VIP';
        lv=lvTonumber(lv);
        console.log("座位等级为"+lv);
        var ifrmSeat=document.getElementById("ifrmSeat").contentWindow;
        var ifrmSeatDetail=ifrmSeat.document.getElementById("ifrmSeatDetail").contentWindow;
        var seats=ifrmSeatDetail.document.getElementsByClassName("stySeat");//所有座位信息
        var seat;//单个座位信息
        var seatList;
        var subscript=8989;
        var row=9999;
        var seatno=999;
        var seatsLength=seats.length;
        console.log("现在有："+seatsLength+"个坐");
        for(var i=0;i<seatsLength;i++){
          //  console.log(i);

            seat=toInnerHTML(seats[i]);
                      //  console.log(i+"   "+seat);

            seat=seat.replace(/\'/g,"").replace(/\ /g,"");
            seatList=seat.split(",");


            if(lv==seatList[1] && seatList[2].indexOf(f)!= -1){//等级 楼层匹配
               // console.log("等级楼层已匹配");
                if(sp!="" && seatList[3].match(/\w/)==null){//当输入ABCD区域时
                   // console.log("已设定区域");
                    var spList=sp.split("");

                    for(var c=0;c<spList.length;c++){//多个区域选择

                        if(seatList[3].match(/\w/)[0]==spList[c]){//匹配ABCD区域
                            //console.log(seats[i]);
                          //  console.log("以匹配abck区域");


                            if(/\d+/.test(seatList[3])){//如果参数中还有第几排信息
                                if(seatList[3].match(/\d+/)[0]*1<row*1){
                                  //  console.log("这排在前面哈");
                                subscript=i;
                                row=seatList[3].match(/\d+/)[0];
                                   }

                            }else{//参数中不包含多少排
                            ///   console.log("也没写多少排");
                                if(seatno>seatList[4]){
                                    subscript=i;
                                    seatno=seatList[4];
                                }
                            }
                        }
                    }
                }else{//没有设定ABCD..区域那就肯定写了多少排
                    console.log("没有设定ABCD"+seats[i]);
              //      console.log(/\d+/.test(seatList[3])&&seatList[3].match(/\d+/)[0]*1<row*1);

                    if(/\d+/.test(seatList[3])&&seatList[3].match(/\d+/)[0]*1<row*1){
                        subscript=i;
                        row=seatList[3].match(/\d+/)[0];
                    }
                }
            }
            console.log("一层循环结束");
        }//遍历seats的for循环，出来的时候应该就晒出来了最前排的座位了
        if(subscript!=8989){//默认8989如果修改过就证明选到座位了
            seats[subscript].click();
            ifrmSeat.document.getElementsByClassName("btnWrap")[0].getElementsByTagName("a")[0].click()
        }else if(first){
            var area=ifrmSeat.document.getElementById("ifrmSeatView").contentWindow.document.getElementsByTagName("area");
            for(var b=0;b<area.length;b++){
                if(area[b].shape=="rect"){//点击区域是方形
                    area[b].click();
                }
            }
                        setTimeout(function (){xuanzuo(false);},1000)
        }

    }//将dom对象转为字符串
    function toInnerHTML(duixiang){
        const div = document.createElement("div")
        div.appendChild(duixiang.cloneNode(true));
        var a=div.innerHTML;

        return a;
    }
    //将R VIP S 转为 12345
    function lvTonumber(lv){
        var ifrmSeat=document.getElementById("ifrmSeat").contentWindow;
        var GradeDetail= ifrmSeat.document.getElementsByName("GradeDetail");
        for(var m=0;m<GradeDetail.length;m++){
                 //   console.log(GradeDetail);

            if(GradeDetail[m].getElementsByTagName("strong")[0].innerHTML.split("<span>")[0]==lv){
                return m+1;
            }
        }

    }

})();
