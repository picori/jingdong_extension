// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

window.addEventListener("message", function(e){
  //console.log(e.data);
  var message = e.data;
  if(message.to == "inject"){
    if(message.work == "collect_coupon"){
      collect_m_coupon();
    }else if(message.work == "get_all_coupons"){
      get_all_coupons();
    }
  }
}, false);

function collect_m_coupon(){
  var data = {
    sid: $("#sid").val(),
    codeKey: $("#codeKey").val().trim(),
    validateCode: "",
    roleId: $("#roleId").val().trim(),
    key: $("#key").val().trim(),
    couponKey: $("#couponKey").val().trim(),
    activeId: $("#activeId").val().trim(),
    couponType: $("#couponType").val().trim(),
    to: $("#to").val().trim(),
    refer: $("#refer").val()
  };
  var ajax = {
    //headers: {"Referer":window.location.href},
    data: data,
    url:  "https://coupon.m.jd.com/coupons/submit.json",
    type: "post",
  };
  window.postMessage({"to":"background","work":"collect_coupon",ajax}, '*');
}

function get_coupon_list(catalogId,page=1,callback){
  var callback_name = "jQuery" + Math.floor(Math.random()*1000000);
  window[callback_name] = callback;
  $.ajax({
    url:`https://a.jd.com/indexAjax/getCouponListByCatalogId.html`,
    dataType: 'jsonp',
    crossDomain:true,
    jsonpCallback:callback_name,
    data:{
      catalogId : catalogId,
      page : page,
      pageSize : 30,//30 is the max value
      //callback : callback,
    }
  })
}

function get_all_coupons(){
  var catalogs = [81];
  var page_index = 1;
  var catalog_index = 0;
  var callback = function(result){
    var couponList = result["couponList"];
    console.warn(couponList);
    if(couponList && couponList.length){
      window.postMessage({"to":"background","work":"collect_coupon",couponList}, '*');
      page_index++;      
    }else{
      page_index = 0;
      catalog_index++; 
    }    
    if(catalogs[catalog_index]){
      get_coupon_list(catalogs[catalog_index],page_index,callback);  
    }      
  };
  get_coupon_list(catalogs[catalog_index],page_index,callback);
}


if(window.location.href.match(/https?:\/\/mall\.jd\.(com|hk)\/shopSign-\d+\.html/)){
  console.warn("ShopSigned!");
  window.postMessage({"to":"background","work":"next","result":{"venderId": document.getElementById("vender_id").value,"beans":0,"shopId":document.getElementById("shop_id").value}}, '*');
}else if(!window.location.href.match(/https?:\/\/mall\.jd\.com/)){
  $(function(){
    window.setTimeout(function(){
      console.warn("Time out next!");
      window.postMessage({"to":"background","work":"next"}, '*');
    },5000)
  });
}else{
  let i = 0,key;
  while(key = window.localStorage.key(i++)){
    if(key.match(/^gift/)){      
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