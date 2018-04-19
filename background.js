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

chrome.webRequest.onBeforeRequest.addListener(
  function (e){
    console.warn(e);
    chrome.tabs.sendMessage(e.tabId, {"to":"inject","work":"getShopGiftInfo","venderId":e.url.match(/v(?:ender)?Id=(\d+)&/)[1] % 1000000000,"function":e.url.match(/callback=(jQuery\d+)&/)[1]}, function(response)
    {
      //console.warn(response);
    });
  }, {urls:["*://f-mall.jd.com/shopGift/getShopGiftInfo*"]});

chrome.webRequest.onBeforeRequest.addListener(
  function (e){
    console.warn(e);
    chrome.tabs.sendMessage(e.tabId, {"to":"inject","work":"drawShopGiftInfo","venderId":e.url.match(/v(?:ender)?Id=(\d+)&/)[1] % 1000000000,"function":e.url.match(/callback=(jQuery\d+)&/)[1]}, function(response)
    {
      //console.warn(response);
    });
  }, {urls:["*://f-mall.jd.com/shopGift/drawShopGiftInfo*"]});

chrome.webRequest.onComplete.addListener(
  function (e){
    console.warn(e);
    chrome.runtime.sendMessage(e.tabId, {"to":"background","work":"sign"}, function(response)
    {
      //console.warn(response);
    });
  }, {urls:["*://mall.jd.com/view/getShopSignStatus.html*"]});

// 
var list;
var current_tab;
var sign_list;
var last_operaton = "";
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  function redirect(tabid,callback){
      let current = (list||[]).shift();
      if(!current){
        list = undefined;
        console.warn("All beans are caught!");
        return callback && callback();
      }
      let {url} = current;
      chrome.tabs.update(current_tab.id, {url},callback);
  }
  function createTab(callback){
    if(current_tab === undefined){ 
      console.warn("current_tab is undefined");     
      chrome.tabs.create({index:0},function(tab){
        current_tab = tab;
        callback();
      });
    }else{
      console.warn("current_tab is not undefined");
      callback();
    }    
  }
  function fetchDatas(callback){
    if(list === undefined){
      console.warn("list is undefined");
      chrome.storage.local.get(null,function(results){
        list = Object.values(results);
        console.warn(typeof results);
        console.warn(results);
        callback();
      });
    }else{
      console.warn("list is not undefined");
      callback();
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
      request["work"] = last_operaton;
    }
    if(request["work"] == "catch_all_beans"){      
      createTab(function(){
        fetchDatas(function(){
          redirect(function(result){
            last_operaton = "catch_beans";
            console.warn(result);
          });
        });
      });
    }else if(request["work"] == "catch_beans"){
      redirect(function(result){
        console.warn(result);
      });
    }else if(request["work"] == "sign_all"){
      fetchSignList(request["params"],function(){
        createTab(function(){
          sign(function(result){
            last_operaton = "sign";
            console.warn(result);
          });
        });
      });
    }else if(request["work"] == "sign"){
      sign(function(result){
        console.warn(result);
      });
    }
  }
});  
