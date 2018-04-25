// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

//'use strict';

$(function(){
  $("nav a").click(function(){
    $(".panel").removeClass("focus").eq($(this).addClass("focus").siblings().removeClass("focus").end().index()).addClass("focus");
  });

  $("#process_sign").click(function(){
    var list = $("#sign_list").val().match(/https?:\/\/mall\.jd\.com\/shopSign-\d+\.html/g)||[];
    $("#sign_list").val(list.join("\n"));        
    chrome.runtime.sendMessage({"to":"background","from":"popup","work":"start_sign","list":list.map(function(url){return {url};})}, function(response) {
      //console.log('收到来自后台的回复：' + response);
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
      list = Object.keys(results).filter(function(key){return /follow\d+/.test(key)}).map(function(key){return {venderId:results[key]["venderId"],shopId:results[key]["shopId"],url:"https://mall.jd.com/index-" + results[key]["shopId"] + ".html"}});//Object.values(results);
      var csv = CSV.encode(list, { header: true });
      var file = new File([csv], "follow_from_storage.csv", {type: "text/csv;charset=utf-8"});
      saveAs(file);
    });
  })

  $("#process_follow").click(function(){
    var list = ($("#url_list").val().match(/(https?:\/\/mall\.jd\.(com|hk)\/index-\d+\.html)|(https?:\/\/([^\.])+\.jd.(com|hk))/g)||[])
    .filter(function(url){return !url.match(/^https?:\/\/mall\.jd\.(com|hk)\/?$/)});
    $("#url_list").val(list.join("\n"));
    //$(this).attr("disabled","disabled");
    chrome.runtime.sendMessage({"to":"background","from":"popup","work":"start_follow","list":list}, function(response) {
      console.log('收到来自后台的回复：' + response);
    });
  });

  $("#process_follow_storage").click(function(){
    //$(this).attr("disabled","disabled");
    chrome.runtime.sendMessage({"to":"background","from":"popup","work":"start_follow"}, function(response) {
      console.log('收到来自后台的回复：' + response);
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
    };
    console.warn(value);
    chrome.storage.sync.set({["coupon_" + $("#coupon_key").val()] : 
        value
    },function(results){
        //console.warn(results);
    });
  });
});
