// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// 'use strict';

function injectCustomJs(jsPath)
{
  jsPath = jsPath || 'js/inject.js';
  var temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');
  // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = function()
  {
    // 放在页面不好看，执行完后移除掉
    this.parentNode.removeChild(this);
    console.warn("inject complete");
  };
  document.head.appendChild(temp);
}

injectCustomJs('js/inject.js');
injectCustomJs('js/follow.js');

// window.addEventListener("message", function(e)
// {
//   console.log(e.data);
// }, false);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  //console.log('收到来自content-script的消息：');
  //console.log(request, sender, sendResponse);
  //sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
  console.warn(request);
  if(request.to == "inject"){
      //console.warn(request.work);
      window.postMessage(request, '*');
  }else if(request.to == "content"){
    console.warn(request);
    if(request.work == "clear_localstorage"){
      let i = 0,key;
      while(key = window.localStorage.key(i++)){
        console.warn(key);
        key.match("/^giftpicori(\d+)/") && window.localStorage.removeItem(key);
      }
    }else if(request.work == "get_coupon_list"){
      get_coupon_list();
    }
  }
});

function get_coupon_list(){
  var callback = "jQuery" + Math.floor(Math.random()*1000000);
  window[callback] = function(result){
    console.warn(result);
  };
  console.warn("get_coupon_list");
  $.ajax({
    url:`https://a.jd.com/indexAjax/getCouponListByCatalogId.html`,
    dataType: 'jsonp',
    data:{
      catalogId : 81,
      page : 1,
      pageSize : 9,
      _ : new Date().getTime()
    },
    success : function(result){
      console.warn(result);
    }
  })
}

window.addEventListener("message", function(e){
  let data = e.data;
  if(data.to == "background"){
    chrome.runtime.sendMessage( data , function(response) {
        //console.log('收到来自后台的回复：' + response);
    });
  }
});
