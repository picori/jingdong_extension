// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

window.addEventListener("message", function(e){
  //console.log(e.data);
  var message = e.data;
  if(message.to == "lottery"){
    if(message.work == "draw_lottery"){
      draw_lottery();
    }
  }
}, false);

function get_lottery_code(){
  var lottery_code;
  try{
    lottery_code = eval($(".j-module.roulette-container").attr("module-param"));
  }catch(e){}
  return lottery_code;
}

function draw_lottery(){
  var lottery_code = get_lottery_code();
  if(lottery_code){
    draw(lottery_code);
  }else{
    window.postMessage({"to":"background","work":"draw"}, '*');
  }  
}

function draw(lottery_code){
  setTimeout(function(){
    $.ajax({url:`https://l-activity.jd.com/lottery/lottery_start.action?lotteryCode=${lottery_code}`,cache:false,dataType:"jsonp"}).then(function(result){
      console.warn(result);
      if(result){
        if(result["data"]["winner"]){
          window.postMessage({"to":"background","work":"notify","info":result}, '*');
        }
        if(result["data"]["chances"]>0){
          draw(lottery_code);
        }else{
          window.postMessage({"to":"background","work":"draw",result}, '*');
        }
      }else{
        window.postMessage({"to":"background","work":"draw",result}, '*');
      }
      //result = {"data":{"chances":0,"downgradeCanNotWin":false,"pass":true,"promptMsg":"错误！","userPin":"picori","winner":false}};
    })
  },3 * 60 * 1000 * Math.random());  
}

draw_lottery();