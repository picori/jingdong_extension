// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

console.log("I'm in");

function watch_rakuten(){
  //return;
  $.ajax({url:"https://coupon.rakuten.co.jp/getCoupon?getkey=SlQwTi1IV0JGLUxJRkktSkNMVg--"}).then(function(html){
    if( !/先着利用上限枚数に達しました。/.test(html) ){
      window.postMessage({"to":"background","work":"notify",info: {message:"20000日元有货"} }, '*');
    }
  });
}

false && window.setInterval(watch_rakuten,30 * 1000);

window.addEventListener("message", function(e){
  let data = e.data;
  if(data.to == "background"){
    chrome.runtime.sendMessage( data , function(response) {
        //console.log('收到来自后台的回复：' + response);
    });
  }
});

