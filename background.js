// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// 
var list;
var current_tab;
var sign_list;
var last_operaton = "";
var counter = 0;
var beans = 0;

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

function fetchTab(callback){
  chrome.tabs.query({index:0}, function (tabs){
    if(!current_tab || (current_tab.id != tabs[0].id)){
      current_tab=tabs[0]; 
      console.warn(current_tab);    
      addBlocker(current_tab);
    }
    callback(current_tab);    
  });
}

function addBlocker(tab){
  console.warn("fsdfsdddddddddddddddddddddddddddd");
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      return {cancel: true};
    },
    {urls: ["https://static.360buyimg.com/static-mall/shop/dest/js/common-business/??INTERFACE.min.js,login.min.js,follow.mall.min.js,getMallHeader.min.js,other.min.js?t=20161207"],tabId:tab.id},
    ["blocking"]
  );
  chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
      //console.warn(details.requestHeaders);
      for (var i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === 'Referer' && details.requestHeaders[i].value.match(/https?:\/\/mall\.jd\.(com|hk)\/shopSign-\d+\.html/)) {
          return {cancel: true};
        }
      }
      return {cancel: false};
    },
    {urls: ["<all_urls>"],types:["stylesheet", "script", "image"],tabId:tab.id},
    ["blocking","requestHeaders"]
  );  
  console.warn(tab)
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      return {cancel: true};
    },
    {urls: ["<all_urls>"],types:["image"],tabId:tab.id},
    ["blocking"]
  );
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  function reset_summary(){
    beans = 0;
    counter = 0;
    last_operaton = "";
    sign_list = undefined;
    list = undefined;
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
      console.warn(`last_operaton: ${last_operaton}\tcounter: ${counter}\tbeans: ${beans}\t`);
      console.warn("All venders are signed!");
      reset_summary();
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
      request["work"] = last_operaton;
      beans += result["beans"];
      if(result.shopId){
        if(result["beans"]){
          console.warn(`last_operaton: ${last_operaton}\tcounter: ${counter}\tbeans: ${beans}\t`);
        }
        chrome.storage.local.set({[last_operaton + result.shopId]:result},function(results){
          
        });
      }      
    }
    if(request["work"] == "start_follow"){
      last_operaton = "follow";      
      fetchDatas(request["list"],function(){
        fetchTab(function(){
          follow(function(result){            
            //console.warn(result);
          });
        })
      });
    }else if(request["work"] == "follow"){
      fetchTab(function(tab){
        follow(function(result){            
          //console.warn(result);
        });
      });
    }else if(request["work"] == "start_sign"){
      last_operaton = "sign";
      fetchSignList(request["list"],function(){
        fetchTab(function(){
          sign(function(result){            
            //console.warn(result);
          });
        });
      });
    }else if(request["work"] == "sign"){
      fetchTab(function(){
        sign(function(result){
          //console.warn(result);
        });
      });
    }else if(request["work"] == "collect_coupon"){
      console.warn(request["params"]);
    }
  }
});  


// function schedule(){  
//   var timers = schedule.timers = schedule.timers || {};
//   console.warn(new Date().getTime(),"schedule");
//   setTimeout(schedule,60 * 1000 - new Date().getTime() % 60 * 1000);
//   chrome.storage.local.get(null,function(results){
//     Object.keys(results).filter(function(key){return /coupon_\d+/.test(key)}).forEach(function(key){
//       var offset; 
//       if((offset=results[key]["start_time"] - new Date().getTime()) <= 60){
//         console.warn(new Date(),key);
//         timers[key] = setTimeout(function(){
//           console.warn(new Date(),"eval " + key );
//           eval(results[key]["script"]);
//         },offset);
//       } 
//     });
//   }); 
// }

(function schedule(){
  var now;
  var timers = {};
  function fetchTab(callback){
    chrome.tabs.query({index:0}, function (tabs){
      if(tabs.length == 0){
        console.warn("Create new tab");
        chrome.tabs.create({index:0},function(tab){
          console.warn("New tab is created");
          callback(tab);
        });
      }else{
        //console.warn("Use tab index 0");
        callback(tabs[0]);
      }
    });
  }
  chrome.alarms.onAlarm.addListener(function(alarm){
    console.warn(new Date().getTime(),"onAlarm:\t" + alarm.name);
    chrome.storage.sync.get("coupons",function(item){
      (item["coupons"]||[]).filter(function(coupon){return coupon["expired"] >= new Date().getTime()}).forEach(function(key){
        var offset; 
        console.warn(results[key]["start_time"] - new Date().getTime())
        if((offset=results[key]["start_time"] - new Date().getTime()) <= 60 * 1000){
          console.warn(new Date().getTime(),key);
          timers[key] = setTimeout(function(){
            console.warn(new Date().getTime(),"eval " + key );
            if(results[key]["script"]){
              eval(results[key]["script"]);
            }else if(results[key]["url"]){
              $.ajax({},function(results){
                console.warn(results);
              });
            }            
            results[key]["expired"] = new Date().getTime();
            chrome.storage.sync.set({[key] : 
              results[key]
            },function(results){
              //console.warn(results);
            });
          },offset);
        } 
      });
    });
  });
  chrome.alarms.create("schedule", {
    when : 60 * 1000 - (now = new Date().getTime()) % 60000 + now ,
    periodInMinutes : 1
  })
})()

//右键菜单
chrome.contextMenus.create({
    title: '提取本页', // %s表示选中的文字
    contexts: ['all'], // 只有当选中文字时才会出现此右键菜单
    onclick: function(params,tab){
      chrome.tabs.sendMessage(tab, {"to":"inject","work":"collect_coupon"}, function(response){
      //console.warn(response);
      });
    }
});

