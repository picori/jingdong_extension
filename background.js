// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  // chrome.storage.sync.set({color: '#3aa757'}, function() {
  //   console.log('The color is green.');
  // });
  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   chrome.declarativeContent.onPageChanged.addRules([{
  //     conditions: [new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostEquals: 'developer.chrome.com'},
  //     })],
  //     actions: [new chrome.declarativeContent.ShowPageAction()]
  //   }]);
  // });
});

chrome.webNavigation.onBeforeNavigate.addListener(function (e){
  // console.warn("onCreatedNavigationTarget");
  // console.warn(e)
})

// chrome.webRequest.onBeforeRequest.addListener(
//   function (e){
//     console.warn(e);
//     chrome.tabs.sendMessage(e.tabId, {"to":"inject","work":"getShopGiftInfo","venderId":e.url.match(/v(?:ender)?Id=(\d+)&/)[1],"function":e.url.match(/callback=(jQuery\d+)&/)[1]}, function(response)
//     {
//       //console.warn(response);
//     });
//   }, {urls:["*://f-mall.jd.com/shopGift/getShopGiftInfo*"]});

// chrome.webRequest.onBeforeRequest.addListener(
//   function (e){
//     console.warn(e);
//     chrome.tabs.sendMessage(e.tabId, {"to":"inject","work":"drawShopGiftInfo","venderId":e.url.match(/v(?:ender)?Id=(\d+)&/)[1],"function":e.url.match(/callback=(jQuery\d+)&/)[1]}, function(response)
//     {
//       //console.warn(response);
//     });
//   }, {urls:["*://f-mall.jd.com/shopGift/drawShopGiftInfo*"]});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return {cancel: details.url.indexOf("https://static.360buyimg.com/static-mall/shop/dest/js/common-business/??INTERFACE.min.js,login.min.js,follow.mall.min.js,getMallHeader.min.js,other.min.js?t=20161207") != -1};
  },
  {urls: ["<all_urls>"]},
  ["blocking"]);

// 
var list;
var current_tab;
var sign_list;
var last_operaton = "";
var counter = 0;
var beans = 0;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  function reset_summary(){
    beans = 0;
    counter = 0;
    last_operaton = "";
  }
  function follow(callback){
      let url = (list||[]).shift();
      if(!url){
        list = undefined;
        console.warn(`last_operaton: ${last_operaton}\tcounter: ${counter}\tbeans: ${beans}\t`);
        console.warn("All beans are caught!");
        reset_summary();
        return callback && callback();
      }
      chrome.tabs.update(current_tab.id, {url},callback);
  }
  function fetchTab(callback){
    chrome.tabs.query({index:0}, function (tabs){
      if(tabs.length == 0){
        console.warn("Create new tab");
        chrome.tabs.create({index:0},function(tab){
          console.warn("New tab is created");
          callback(current_tab=tab);
        });
      }else{
        //console.warn("Use tab index 0");
        callback(current_tab=tabs[0]);
      }
    });
  }
  function fetchDatas(url_list,callback){
    if(url_list.length){
      list = url_list;
      callback();
    }else{
      chrome.storage.local.get(null,function(results){
        list = Object.keys(results);//Object.values(results);
        callback();
      });
    }
  }
  function sign(callback){
    let current = (list||[]).shift();
    if(!current){
      list = undefined;
      console.warn("All venders are signed!");
      return callback && callback();
    }
    let {url} = current;
    chrome.tabs.update(current_tab.id, {url},callback);
  } 
  function fetchSignList(sign_list,callback){
    list = sign_list;
    callback && callback();
  }
  if(request["to"] == "background"){
    if(request["work"] == "next"){
      let result = request["result"]||{"venderId":0,"shopId":0,"beans":0};
      counter++;
      //console.warn("counter:\t"+counter,result);
      request["work"] = last_operaton;
      beans += result["beans"];
      if(result.shopId){
        chrome.storage.local.set({[result.shopId]:result},function(results){
          
        });
      }      
    }
    if(request["work"] == "catch_all_beans"){
      last_operaton = "catch_beans";      
      fetchDatas(request["list"],function(){
        fetchTab(function(){
          follow(function(result){            
            //console.warn(result);
          });
        })
      });
    }else if(request["work"] == "catch_beans"){
      fetchTab(function(tab){
        follow(function(result){            
          //console.warn(result);
        });
      });
    }else if(request["work"] == "sign_all"){
      last_operaton = "sign";
      fetchSignList(request["params"],function(){
        createTab(function(){
          sign(function(result){            
            //console.warn(result);
          });
        });
      });
    }else if(request["work"] == "sign"){
      sign(function(result){
        //console.warn(result);
      });
    }
  }
});  
