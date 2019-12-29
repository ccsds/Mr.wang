// ==UserScript==
// @name        日期选择至演唱会选座
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://gpoticket.globalinterpark.com/Global/Play/Book/BookMain.asp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 待办项：  重写alert方法
    // Your code here...
    var f=2;//楼层 演唱会此项无效
    var sp='ABDE';//同上

    //上面的选项 演唱会可以忽略
    var lv='Standing'; // 座位等级
    var tda='11'; //开演唱会的日子
    var ttime="7:00" //开演唱会的时间
    var side="";//房间号 默认是按照房间号从小号向大号检索
    //用户信息
    var MemberName="asdr";
    var birthday="19900325";
    var PhoneNo="15504311821";
    var Card ="Visa";
    var cardnumber	="1234568559584525";
    var ExpirationDate	="2005"; //20年 5月

    window.onload=function(){

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
                            setTimeout(function (){xuanzuo(true);},2000)

                        }
                    }if(x){
                        document.getElementById("LargeNextBtnLink").click();
                        setTimeout(function (){xuanzuo(true);},2000)
                    }


                },200)


            }

        }


    }
    var many=0;//用于切换座位区域
    //选座
    function xuanzuo(first){


        var ifrmSeat=document.getElementById("ifrmSeat").contentWindow;
        var ifrmSeatDetail=ifrmSeat.document.getElementById("ifrmSeatDetail").contentWindow;
        var seats=ifrmSeatDetail.document.getElementsByClassName("stySeat");//所有座位信息
        var ticket=true;//当前是否有满足条件的票，没有满足条件的票，则刷新页面
     
  console.log(ifrmSeat.document.getElementsByClassName("select")[0])

        if(ifrmSeat.document.getElementsByClassName("select").length>1){//这个长度如果为0的话，我猜他就是演唱会
            console.log("第一种情况");

            var select= ifrmSeat.document.getElementsByClassName("select")

            for(var q=1;q<select.length;q++){
                console.log(select[q].getElementsByTagName("strong")[0].innerHTML);
                var selectLv=select[q].getElementsByTagName("strong")[0].innerHTML.split( " ");
                for(var w=0;w<selectLv.length;w++){
                    if(selectLv[w]==lv || select[q].getElementsByTagName("strong")[0].innerHTML==lv){//等级以匹配

                        if(select[q].innerHTML.split("</strong>")[1].split(" ")[1]>0){//拆出来还剩多少张票
                            console.log("还剩："+select[q].innerHTML.split("</strong>")[1].split(" ")[1]+"张票");
                            select[q].click();
                            setTimeout(function(){
                                var boxli= ifrmSeat.document.getElementsByClassName("box")[0].getElementsByTagName("li");
                                var boxa=ifrmSeat.document.getElementsByClassName("box")[0].getElementsByTagName("a");
                                for(var e=0;e<boxli.length;e++){
                                    if(side!=""){//房间号已设置，进去抢票
                                        console.log("房间号已设置，进去抢票");
                                        if(boxli[e].innerHTML.match(/\d+/)[0]*1==side){//房间号已匹配
                                            if(boxli[e].innerHTML.split("</a>")[1].match(/\d+/)[0]*1>0){//还有票
                                                boxa[e].click();
                                                ticket=false;
                                                setTimeout(function(){seatMap();},500)

                                                break;
                                                //房间抢票占位
                                            }else{//当前设定的房间票数为0 刷新页面
                                                location.reload();

                                            }
                                        }

                                    }else if(boxa[e].innerHTML.match(/\d+/)[0]*1>0){//没自定义房间号
                                        if(boxli[e].innerHTML.split("</a>")[1].match(/\d+/)[0]*1>0){//还有票
                                            boxa[e].click();
                                            setTimeout(function(){seatMap();},500)

                                            break;
                                            //房间抢票占位

                                        }
                                    }

                                }},200);


                        }else{//总的票数为0 刷新页面
                            location.reload();

                        }

                    }
                }

            }//selec循环结束


        }else{//不是演唱会1111111
               if(many==0){
           lv=lvTonumber(lv);
        }

            console.log("第二种情况");
            console.log("座位等级为"+lv);
            var seat;//单个座位信息
            var seatList;
            var subscript=8989;
            var row=9999;
            var seatno=999;
            var seatsLength=seats.length;
            console.log("现在有："+seatsLength+"个坐");
            many++;
            for(var i=0;i<seatsLength;i++){
                //  console.log(i);

                seat=toInnerHTML(seats[i]);
                //  console.log(i+"   "+seat);
                seat=seat.replace(/\'/g,"").replace(/\ /g,"");
                seatList=seat.split(",");

              //  console.log(lv==seatList[1] && seatList[2].indexOf(f)!= -1);

                if(lv==seatList[1] && seatList[2].indexOf(f)!= -1){//等级 楼层匹配
                   // console.log("等级楼层已匹配");
                    if(sp!="" && seatList[3].match(/\w/)!=null){//当输入ABCD区域时
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
                                        many=0;
                                        console.log("178行。。找到了座位");
                                    }

                                }else{//参数中不包含多少排
                                   //    console.log("seatno="+seatno+" seatList[4]" +seatList[4]);
                                    if(seatno*1>seatList[4]*1){
                                        subscript=i;
                                        seatno=seatList[4];
                                        console.log("186行。。找到了座位");
                                        many=0;

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
                            many=0;
                            console.log("201行。。找到了座位");



                        }
                    }
                }
                // console.log("一层循环结束");
            }//遍历seats的for循环，出来的时候应该就晒出来了最前排的座位了
            if(subscript!=8989){//默认8989如果修改过就证明选到座位了
                seats[subscript].click();
                ifrmSeat.document.getElementsByClassName("btnWrap")[0].getElementsByTagName("a")[0].click()
            }else if(many>=1){
                console.log("切换楼层区域");
                var area=ifrmSeat.document.getElementById("ifrmSeatView").contentWindow.document.getElementsByTagName("area");
                console.log(area);
               
                        area[many-1].click();
                 
                setTimeout(function (){xuanzuo(false);},500)
            }
        }


    }


    //选中下拉框函数
    function chackSelect(optio,chac){
        for(var p=0;p<optio.length;p++){
            if(optio[p].innerHTML==chac){
                optio[p].selected=true;
            }
        }
    }
    //将dom对象转为字符串
    function toInnerHTML(duixiang){
        const div = document.createElement("div")
        div.appendChild(duixiang.cloneNode(true));
        var a=div.innerHTML;

        return a;
    }
    //将R VIP S 转为 12345  此方法比较适用于音乐剧场，演唱会不适用
    function lvTonumber(lv){
        var ifrmSeat=document.getElementById("ifrmSeat").contentWindow;
        var GradeDetail= ifrmSeat.document.getElementsByName("GradeDetail");
        for(var m=0;m<GradeDetail.length;m++){
            if(GradeDetail[m].getElementsByTagName("strong")[0].innerHTML.split("<span>")[0]==lv){
                return m+1;
            }
        }

    }
    var slow=false;
    function seatMap(){
        console.log("咋不选座位呢");
        var SeatN= document.getElementById("ifrmSeat").contentWindow.document.getElementById("ifrmSeatDetail").contentWindow.document.getElementsByClassName("SeatN");
        console.log(SeatN);
        SeatN[0].click();
        if(slow){
            seatMap();
        }setTimeout(function(){
            document.getElementById("ifrmSeat").contentWindow.document.getElementsByClassName("btnWrap")[0].getElementsByTagName("a")[0].click()
        },20)

    }
    //重写JS原生alert函数
    //window.alert=function(e){
  //      console.log("慢了");
  //      slow=true;
  //  }
    var div = document.createElement("div");
    div.style="width:100;height:100;background-color:red;position:absolute;top:50px;left:100px;width: 100px; padding: 20px;"

    div.onclick=function(){
        cas();
    }
    div.innerHTML="开始填写信息了";
    document.body.append(div);
    /*  var st= setInterval(function (){

        if(document.getElementById("divBookMain").style.display==""){
            clearInterval(st);
            cas();
        }
        console.log("执行中我草。。。"+document.getElementById("divBookMain").style.display);

    },2000);*/
    function cas(){

        cas1();

        setTimeout(function(){
            cas2();

            setTimeout(function(){
                cas3();
                setTimeout(function(){
                    cas4();
               //     setTimeout(function(){cas5();},300);

                },300);
            },300);

        },300);

    }
    function cas1(){//第一步

        var ifrmBookStep= document.getElementById("ifrmBookStep").contentWindow;

        ifrmBookStep.document.getElementsByName("SeatCount")[0].options[1].selected=true;//下拉菜单1
        document.getElementById("SmallNextBtnLink").click();//下一项
    }
    function cas2(){//第二步
        try{
            var ifrmBookStep= document.getElementById("ifrmBookStep").contentWindow;
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
        }catch(err){
            ifrmBookStep= document.getElementById("ifrmBookStep").contentWindow;
            ifrmBookStep.document.getElementById("MemberName").value=MemberName;//名字
            BirYear= ifrmBookStep.document.getElementById("BirYear").options;
            chackSelect(BirYear,birthday.slice(0,4));//年
            BirMonth= ifrmBookStep.document.getElementById("BirMonth").options;
            chackSelect(BirMonth, birthday.slice(4,6));//月

            BirDay= ifrmBookStep.document.getElementById("BirDay").options;
            chackSelect(BirDay, birthday.slice(6))
            ifrmBookStep.document.getElementById("PhoneNo").value=PhoneNo;
            ifrmBookStep.document.getElementById("HpNo").value=PhoneNo;
            document.getElementById("SmallNextBtnLink").click();//下一项
        }

    }
    function cas3(){//第三步
        try{ var ifrmBookStep= document.getElementById("ifrmBookStep").contentWindow;
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
           }catch(err){
               ifrmBookStep= document.getElementById("ifrmBookStep").contentWindow;
               document.getElementById("ifrmBookStep").contentWindow.document.getElementsByName("PaymentSelect")[1].click();
               cardSelect= ifrmBookStep.document.getElementsByTagName("select")[1].options;

               chackSelect(cardSelect,Card);
               ifrmBookStep. document.getElementsByTagName("select")[1].onchange();
               ifrmBookStep.document.getElementById("CardNo1").value=cardnumber.slice(0,4);
               ifrmBookStep.document.getElementById("CardNo2").value=cardnumber.slice(4,8);
               ifrmBookStep.document.getElementById("CardNo3").value=cardnumber.slice(8,12);
               ifrmBookStep.document.getElementById("CardNo4").value=cardnumber.slice(12,16);

               ValidMonth=ifrmBookStep.document.getElementById("ValidMonth").options;
               ValidYear=ifrmBookStep.document.getElementById("ValidYear").options;
               chackSelect(ValidMonth,ExpirationDate.slice(2,4));
               chackSelect(ValidYear,ExpirationDate.slice(0,2));
               document.getElementById("SmallNextBtnLink").click();//下一项
           }

    }
    function cas4(){//第四步
        try{var ifrmBookStep= document.getElementById("ifrmBookStep").contentWindow;
            ifrmBookStep.document.getElementById("CancelAgree").click();
            ifrmBookStep.document.getElementById("CancelAgree2").click();

            document.getElementById("LargeNextBtnLink").click();//下一项
           }catch(err){
               ifrmBookStep= document.getElementById("ifrmBookStep").contentWindow;
               ifrmBookStep.document.getElementById("CancelAgree").click();
               ifrmBookStep.document.getElementById("CancelAgree2").click();
               alert("阻塞");

           }

    }
    function cas5(){
        try{
            document.getElementById("LargeNextBtnLink").click();//下一项

           }catch(err){
               document.getElementById("LargeNextBtnLink").click();//下一项

           }
    }

})();
