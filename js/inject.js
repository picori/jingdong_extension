// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

window.addEventListener("message", function(e)
{
  //console.log(e.data);
  let func = e.data.function;
  if(e.data.to == "inject"){
    if(e.data.work == "getShopGiftInfo"){
      let old_func = window[func];
      let picori_jd_func = function(data){
        if(data.giftList && data.giftList.find(function(item,index,list){return item.prizeType == 4})){
          console.warn(e.data,"There are beans!");
          old_func(data);
        }else{
          console.warn(e.data,"There are no beans!");
          window.postMessage({"to":"background","work":"catch_beans"}, '*');
        }
      };
      if(func){
        window[func] = picori_jd_func;
      }
    }else if(e.data.work == "drawShopGiftInfo"){
      let old_func = window[func];
      let picori_jd_func = function(data){
        console.warn(e.data,data);
        old_func(data);
        window.postMessage({"to":"background","work":"catch_beans"}, '*');
      };
      if(func){
        window[func] = picori_jd_func;
      }
    }else if(e.data.work == "redirect"){
      window.location.href = e.data.url;
    }else{
      console.warn("hsfhashfhashfsa");
    }
  }
}, false);

window.setTimeout(function(){
  window.postMessage({"to":"background","work":"catch_beans"}, '*');
},5000)

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var target = document.querySelector('body');

var observer = new MutationObserver(function(mutations) {
  if($('.J_drawGift') && $('.J_drawGift').is(":visible")){
    observer.disconnect();
    $('.J_drawGift').click();    
    //window.postMessage({"to":"background","work":"catch_beans"}, '*');
  }         
});

// 配置观察选项:
var config = { attributes: false, childList: true, characterData: true };

// 传入目标节点和观察选项
observer.observe(target, config);