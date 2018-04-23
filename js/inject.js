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
      // let old_func = window[func];
      // let picori_jd_func = function(data){
      //   if(data.giftList && data.giftList.find(function(item,index,list){return item.prizeType == 4})){
      //     console.warn(e.data,"There are beans!");
      //     //window.postMessage({"to":"background","work":"log_catch_beans"}, '*');
      //     old_func(data);
      //   }else{
      //     console.warn(e.data,"There are no beans!");
      //     window.postMessage({"to":"background","work":"next"}, '*');
      //   }
      // };
      // if(func){
      //   window[func] = picori_jd_func;
      // }
    }else if(e.data.work == "drawShopGiftInfo"){
      // let old_func = window[func];
      // let picori_jd_func = function(data){
      //   console.warn(e.data,data);
      //   old_func(data);
      //   //window.postMessage({"to":"background","work":"next"}, '*');
      // };
      // if(func){
      //   window[func] = picori_jd_func;
      // }
    }else if(e.data.work == "redirect"){
      window.location.href = e.data.url;
    }else{
      console.warn("Why am I here?");
    }
  }
}, false);

// $(function(){
//   window.setTimeout(function(){
//     console.warn("Time out next!");
//     window.postMessage({"to":"background","work":"timeout"}, '*');
//   },5000)
// });

if(window.location.href.match(/https?:\/\/mall\.jd\.(com|hk)\/shopSign-\d+\.html/){}
  console.warn("ShopSigned!");
  window.postMessage({"to":"background","work":"next"}, '*');
}else if(window.location.href.match(/https?:\/\/www\.jd\.com/)){
  console.warn("Wrong URL!");
  window.postMessage({"to":"background","work":"next"}, '*');
}else{
  let i = 0,key;
  while(key = window.localStorage.key(i++)){
    if(key.match(/^giftpicori(\d+)/)){      
      window.localStorage.removeItem(key);
      i--;
    } 
  }
}

// var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
// var target = document.querySelector('body');

// var observer = new MutationObserver(function(mutations) {
//   if($('.J_drawGift') && $('.J_drawGift').is(":visible")){
//     //observer.disconnect();
//     var bean_gifts = $('.J_giftModal .J_prizeList div:contains(京豆)');
//     if(bean_gifts.size()){
//       console.warn("has beans:\t",bean_gifts.find("p.d-num").html());
//       $('.J_drawGift').click();  
//     }else{
//       console.warn("no beans",bean_gifts);
//       window.postMessage({"to":"background","work":"next"}, '*');
//     }      
//   }else if($(".J_giftclose").is(":visible")){
//     window.postMessage({"to":"background","work":"next"}, '*');
//   }         
// });

// // 配置观察选项:
// var config = { attributes: false, childList: true, characterData: true };

// // 传入目标节点和观察选项
// observer.observe(target, config);