// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

//'use strict';

$(function(){
  var background_page = chrome.extension.getBackgroundPage();
  $('#datetimepicker').datetimepicker();
  $("nav a").click(function(){
    $(".panel").removeClass("focus").eq($(this).addClass("focus").siblings().removeClass("focus").end().index()).addClass("focus");
  });

  $("#process_sign").click(function(){
    var list = $("#sign_list").val().match(/https?:\/\/mall\.jd\.com\/shopSign-\d+\.html/g)||[];
    $("#sign_list").val(list.join("\n"));        
    chrome.runtime.sendMessage({"to":"background","from":"popup","work":"start_sign","list":list}, function(response) {
      //console.log('收到来自后台的回复：' + response);
    });
  });

  $("#process_sign_storage").click(function(){
    chrome.storage.local.get(null,function(results){
      list = Object.keys(results).filter(function(key){return /sign\d+/.test(key)}).map(function(key){return {url:"https://mall.jd.com/shopSign-" + results[key]["shopId"] + ".html"}});//Object.values(results);
      chrome.runtime.sendMessage({"to":"background","from":"popup","work":"start_sign","list":list}, function(response) {
        //console.log('收到来自后台的回复：' + response);
      });
    });
  });

  $("#download_sign_storage").click(function(){
    chrome.storage.local.get(null,function(results){
      list = Object.keys(results).filter(function(key){return /sign\d+/.test(key)}).map(function(key){return {venderId:results[key]["venderId"],shopId:results[key]["shopId"],beans:results[key]["beans"],url:"https://mall.jd.com/shopSign-" + results[key]["shopId"] + ".html"}});//Object.values(results);
      var csv = CSV.encode(list, { header: true });
      var file = new File([csv], "sign_from_storage.csv", {type: "text/csv;charset=utf-8"});
      saveAs(file);
    });
  });

  $("#clear_sign").click(function(){                
    $("#sign_list").val("");  
  });

  $("#clear_follow").click(function(){
    $("#url_list").val("");
  })

  $("#save_follow").click(function(){
    var list = $("#url_list").val().match(/https?:\/\/mall\.jd\.com\/index-\d+\.html/g);
    $("#url_list").val(list.join("\n"));
    function* saveToStorage(){
      var line;
      while((line = list.shift()) !== undefined){
        yield new Promise(function(resolve,reject){
          var match = line.match(/(https?:\/\/mall\.jd\.com\/index-(\d+)\.html)/);
          function new_resolve(result){
            resolve(result);
          }
          if(match){
            let item = {};//{venderid:match[2] % 1000000000,url:match[1],beans:0,status:0};
            chrome.storage.local.set({[match[2]]: item}, function() {
              if( chrome.runtime.lastError ){
                console.warn(chrome.runtime.lastError);
                reject(chrome.runtime.lastError);
              }else{
                new_resolve(match);
              }                        
            });
          }else{
            new_resolve(match);
          }
        });
      }
    }
    var generator = saveToStorage();
    while(!generator.next().done){

    }    
    console.warn("all url saved!");
    $(this).removeAttr("disabled");
  });

  $("#download_follow_storage").click(function(){
    chrome.storage.local.get(null,function(results){
      console.warn(results);
      list = Object.keys(results).filter(function(key){return /follow\d+/.test(key)}).map(function(key){return {venderId:results[key]["venderId"],shopId:results[key]["shopId"],beans:results[key]["beans"],url:"https://mall.jd.com/index-" + results[key]["shopId"] + ".html"}});//Object.values(results);
      var csv = CSV.encode(list, { header: true });
      var file = new File([csv], "follow_from_storage.csv", {type: "text/csv;charset=utf-8"});
      saveAs(file);
    });
  })

  $("#process_follow").click(function(){
    var list = ($("#url_list").val().match(/(https?:\/\/mall\.jd\.(com|hk)\/index-\d+\.html)/g)||[])
    .filter(function(url){return !url.match(/^https?:\/\/mall\.jd\.(com|hk)\/?$/)});
    $("#url_list").val(list.join("\n"));
    list.sort(function(a,b){return 0.5 - Math.random()});
    //$(this).attr("disabled","disabled");
    chrome.runtime.sendMessage({"to":"background","from":"popup","work":"start_follow","list":list}, function(response) {
      console.log('收到来自后台的回复：' + response);
    });
  });

  $("#process_follow_storage").click(function(){
    //$(this).attr("disabled","disabled");
    chrome.storage.local.get(null,function(results){
      //console.warn(results);
      list = Object.keys(results).filter(function(key){return /follow\d+/.test(key)}).map(function(key){return "https://mall.jd.com/index-" + results[key]["shopId"] + ".html"});//Object.values(results);
      chrome.runtime.sendMessage({"to":"background","from":"popup","work":"start_follow","list":list}, function(response) {
        console.log('收到来自后台的回复：' + response);
      });
    });
  });
  $("#clear_follow_storage").click(function(){     
    chrome.storage.local.get(null,function(results){
      console.warn("all datas are cleared");
      results.foreach(function(item){
        chrome.storage.local.remove(item);
      });
    });
  });

  $("#clear_localstorage").click(function(){
    chrome.runtime.sendMessage({"to":"content","from":"popup","work":"clear_localstorage"}, function(response) {
      console.log('收到来自后台的回复：' + response);
    });
  });

  $("#add_coupon").click(function(){
    var value = {
        start_time : Date.parse([[$("#coupon_year").val(),$("#coupon_month").val(),$("#coupon_day").val()].join("-") 
        ,[$("#coupon_hour").val(),$("#coupon_minute").val(),$("#coupon_second").val()].join(":")].join(' ')),
        script : $("#coupon_script").val(),
        expired: 0,
    };
    console.warn(value);
    chrome.storage.sync.set({["coupon_" + $("#coupon_key").val()] : 
        value
    },function(results){
        //console.warn(results);
    });
  });

  $("#collect_coupon").click(function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
  });
  $("#collect_coupon_list").click(function(){
    chrome.tabs.query({index:0}, function(tabs)
    {
        console.warn(tabs);
        chrome.tabs.sendMessage(tabs[0].id, {"to":"inject","from":"popup","work":"get_all_coupons"}, function(response)
        {
            //if(callback) callback(response);
        });
    });
  });
  $("#show_coupon_collection").click(function(){
    chrome.storage.local.get(null,function(results){
      var list = Object.keys(results).filter(function(key){return /^coupon\w+/.test(key) && results[key]["coupon"]})
      .map(function(key){
        return results[key]["coupon"];
      }).filter(function(coupon){
        return Date.parse(coupon["endTime"]) - Date.parse(coupon["startTime"]) <= 10 * 60 * 1000;
      });
      console.warn(list);
    });
  });
  $("#clear_useless_coupon").click(function(){
    chrome.tabs.query({index:0}, function(tabs){
      console.warn(tabs);
      chrome.tabs.sendMessage(tabs[0].id, {"to":"inject","from":"popup","work":"clear_useless_coupon"}, function(response){
          //if(callback) callback(response);
      });
    });    
  });
  $("#draw_lottery").click(async function(){
    var list = ($("#lottery_list").val().match(/(https?:\/\/sale\.jd\.com\/act\/\w+\.html)/g)||[]);
    list.sort(function(a,b){return 0.5 - Math.random()});
    $("#lottery_list").val(list.join("\n"));   
    chrome.runtime.sendMessage({"to":"background","from":"popup","work":"start_draw","list":list}, function(response) {
      console.log('收到来自后台的回复：' + response);
    });    
  });
  $("#search_lottery").click(async function(){
    var list = ($("#lottery_list").val().match(/(https?:\/\/[^.]+\.jd\.com\/[^.]+\.html)/g)||[]);
    //list.sort(function(a,b){return 0.5 - Math.random()});
    $("#lottery_list").val(list.join("\n"));   
    console.warn("popup start_search");
    chrome.runtime.sendMessage({"to":"background","from":"popup","work":"start_search","list":list}, function(response) {
      console.log('收到来自后台的回复：' + response);
    });    
  });
  $("#search_lottery_from_local_shops").click(async function(){
    var list = ($("#lottery_list").val().match(/(https?:\/\/mall\.jd\.(com|hk)\/index-\d+\.html)/g)||[]);
    $("#lottery_list").val(list.join("\n"));
    if(list.length){
      console.warn("popup search_lottery_from_local_shops from textarea");
      chrome.runtime.sendMessage({"to":"background","from":"popup","work":"search_lottery_from_local_shops","list":list}, function(response) {
        console.log('收到来自后台的回复：' + response);
      });
    }else{
      chrome.storage.local.get(null,function(results){
        list = Object.keys(results).filter(function(key){return /shop\|/.test(key)}).map(function(key){return "https://mall.jd.com/index-" + results[key]["shop_id"] + ".html"});
        console.warn("popup search_lottery_from_local_shops from storage");
        chrome.runtime.sendMessage({"to":"background","from":"popup","work":"search_lottery_from_local_shops","list":list}, function(response) {
          console.log('收到来自后台的回复：' + response);
        });    
      });
    }    
  });
  $("#download_lottery_storage").click(async function(){
    chrome.storage.local.get(null,function(results){
      console.warn(results);
      list = Object.keys(results).filter(function(key){return /lottery\|/.test(key)}).map(function(key){return {code:results[key]["code"],act_url:"https://sale.jd.com/act/" + results[key]["act_key"] + ".html"}});//Object.values(results);
      var csv = CSV.encode(list, { header: true });
      var file = new File([csv], "lottery_from_storage.csv", {type: "text/csv;charset=utf-8"});
      saveAs(file);
    });
  });
  $("#download_raw_lottery_storage").click(async function(){
    chrome.storage.local.get(null,function(results){
      console.warn(results);
      list = Object.keys(results).filter(function(key){return /lottery\|/.test(key)}).map(function(key){return results[key]});//Object.values(results);
      //var csv = CSV.encode(list, { header: true });
      var file = new File([JSON.stringify(list)], "raw_lottery_storage.txt", {type: "text/csv;charset=utf-8"});
      saveAs(file);
    });
  });
  $("#download_shop_storage").click(async function(){
    chrome.storage.local.get(null,function(results){
      console.warn(results);
      list = Object.keys(results).filter(function(key){return /shop\|/.test(key)}).map(function(key){return {shop_id:results[key]["shop_id"],vender_id:results[key]["vender_id"],shop_url:"https://mall.jd.com/index-" + results[key]["shop_id"] + ".html"}});//Object.values(results);
      var csv = CSV.encode(list, { header: true });
      var file = new File([csv], "shop_from_storage.csv", {type: "text/csv;charset=utf-8"});
      saveAs(file);
    });
  });
  //background_page.refresh_conpon_list();
});
