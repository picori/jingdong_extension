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
    }else if(message.work === "clear_useless_coupon"){
      clear_useless_coupon();
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
  var info = {
    rule: $(".rule").html().trim(),
    use_rule : $(".use-rule").text().trim().replace(/[\n\r\s]/g,""),
    money : $(".money strong").html().trim(),
  };
  window.postMessage({"to":"background","work":"collect_coupon",coupon:{ajax,info}}, '*');
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
  var catalogs = [0,81,19,16,15,14,11,10,12,13,87,17,88,20,82,84,18,95,77,105,80,2];
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
    if(catalogs[catalog_index] !== undefined){
      get_coupon_list(catalogs[catalog_index],page_index,callback);  
    }      
  };
  get_coupon_list(catalogs[catalog_index],page_index,callback);
}

function get_my_coupon_list(callback){
  $.ajax({url:"https://wq.jd.com/activeapi/queryjdcouponlistwithfinance?state=3&wxadd=1&sceneval=2&sceneval=2&g_tk=1912965506&g_ty=ls",dataType: 'jsonp'})
  .then(callback);
}

function clear_useless_coupon(){
  get_my_coupon_list(function(result){
    var {coupon:{useable,used}} = result;
    var deleted = 0;
    function delete_coupon(result){
      var coupon;
      if(result){
        if(result.ret == 0){
          deleted++;
        }
        console.warn(result);
      }
      if(coupon = useable.shift()){
        var filters = [/全品类\(特例商品除外\)/,/话费充值/,/AppStore/];
        if(coupon.shopName || !filters.find(function(filter){return filter.test(coupon.limitStr)}) || ( coupon.discount / coupon.quota ) <= 0.2 ) {
          $.ajax({url:"https:////wq.jd.com/activeapi/deletejdcoupon?",dataType: 'jsonp',data:{
            couponid: coupon.couponid || "",
            batchid: coupon.batchid || "",
            passkey: coupon.passKey || "",
            sceneval: 2 ,
          }}).then(delete_coupon,delete_coupon);
        }else{
          console.warn("pass",coupon);
          delete_coupon();
        }
      }
      //window.postMessage({"to":"background","work":"delete_coupon_complete","result":{deleted}}, '*');
    }
    console.warn(useable);    
    delete_coupon();        
  });
}

(function (){
  if(window.location.href.match(/https?:\/\/mall\.jd\.(com|hk)\/shopSign-\d+\.html/)){
    console.warn("ShopSigned!");
    window.postMessage({"to":"background","work":"next","result":{"venderId": document.getElementById("vender_id").value,"beans":((document.querySelector(".jingdou .c-yellow")||{}).innerHTML * 1) || 0,"shopId":document.getElementById("shop_id").value}}, '*');
  }else if(window.location.href.match(/https?:\/\/www\.jd\.com\/error\.aspx/)){
    window.postMessage({"to":"background","work":"error"}, '*');
  }else if(!window.location.href.match(/https?:\/\/mall\.jd\.com/)){
    $(function(){
      window.setTimeout(function(){
        console.warn("Time out next!");
        window.postMessage({"to":"background","work":"error"}, '*');
      },5000)
    });
  }else{
    if($("div.error h2:contains('抱歉，您请求的地址已下线或者过期')").is(":visible")){
      return window.postMessage({"to":"background","work":"error"}, '*');
    }
    let i = 0,key;
    while(key = window.localStorage.key(i++)){
      if(key.match(/^gift/)){      
        window.localStorage.removeItem(key);
        i--;
      } 
    }
  }
})();


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