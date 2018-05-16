// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// 
var list;
var current_tab;
var current_url;
var sign_list;
var last_operaton = "";
var counter = 0;
var beans = 0;
var db = new Dexie("MyDatabase");
db.version(1).stores({
    coupon: "&key,startTime,endTime,&id,priority",
    coupon_collection: "&key,startTime,endTime,&id,priority"
});

// class Coupon {
//     // Prototype method
//     save() {
//         return db.coupon.put(this); // Will only save own props.
//     }

//     // Prototype property
//     get age() {
//         return moment(Date.now()).diff (this.birthDate, 'years');
//     }
// }

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

//fake to be from same origin
chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details){
    console.warn(details.requestHeaders);
    details.requestHeaders.forEach(function(header){
      if(header.name == "Referer"){
        header.value = "http://a.jd.com";
      }
    }) //push({name:"Access-Control-Allow-Origin",value:"*"});
    return {requestHeaders:details.requestHeaders}
  }, {urls:["*://a.jd.com/*"]},
  ["blocking","requestHeaders"]);

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details){
    return {cancel:true};
  }, {urls:["*://uranus.jd.com/*"]},
  ["blocking","requestHeaders"]);

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
      addBlocker(current_tab);
    }
    callback(current_tab);    
  });
}

function addBlocker(tab){
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      return {cancel: true};
    },
    {urls: ["https://static.360buyimg.com/static-mall/shop/dest/js/common-business/??INTERFACE.min.js,login.min.js,follow.mall.min.js,getMallHeader.min.js,other.min.js?t=20161207"],tabId:tab.id},
    ["blocking"]
  );
  // chrome.webRequest.onBeforeSendHeaders.addListener(
  //   function(details) {
  //     //console.warn(details.requestHeaders);
  //     for (var i = 0; i < details.requestHeaders.length; ++i) {
  //       if (details.requestHeaders[i].name === 'Referer' && details.requestHeaders[i].value.match(/https?:\/\/mall\.jd\.(com|hk)\/shopSign-\d+\.html/)) {
  //         return {cancel: true};
  //       }
  //     }
  //     return {cancel: false};
  //   },
  //   {urls: ["<all_urls>"],types:["stylesheet", "script", "image"]},
  //   ["blocking","requestHeaders"]
  // );  
  // chrome.webRequest.onBeforeRequest.addListener(
  //   function(details) {
  //     return {cancel: true};
  //   },
  //   {urls: ["<all_urls>"],types:["image"]},
  //   ["blocking"]
  // );
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
      current_url = (list||[]).shift();
      if(!current_url){        
        notify({title:"All shops are followed!",items:[{title:"last_operaton",message:last_operaton},{title:"counter",message:counter},{title:"beans",message: beans}]});
        // console.warn(`last_operaton: ${last_operaton}\tcounter: ${counter}\tbeans: ${beans}\t`);
        // console.warn("All venders are followed!");  
        reset_summary();      
        return callback && callback();
      }
      chrome.tabs.update(current_tab.id, {url:current_url},callback);
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
      notify({title:"All shops are signed!",items:[{title:"last_operaton",message:last_operaton},{title:"counter",message:counter},{title:"beans",message: beans}]});
      // console.warn(`last_operaton: ${last_operaton}\tcounter: ${counter}\tbeans: ${beans}\t`);
      // console.warn("All venders are signed!"); 
      reset_summary();     
      return callback && callback();
    }
    let {url} = current;
    current_url = url;
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
          notify({title:`${last_operaton} a shop with beans!`,items:[{title:"Order",message:counter},{title:"Beans",message: result["beans"]},{title:"Current Total Beans",message:beans}]});
          //console.warn(`last_operaton: ${last_operaton}\tcounter: ${counter}\tbeans: ${beans}\t`);
        }
        chrome.storage.local.set({[last_operaton + result.shopId]:result},function(results){
          
        });
      }      
    }else if(request["work"] == "error"){
      if(!current_url){
        return;
      }
      var match = current_url.match(/\-(\d+).html/);
      counter++;
      if(match){
        chrome.storage.local.remove(last_operaton + match[1],function(results){
          console.warn(last_operaton + match[1]);
        });
      }      
      request["work"] = last_operaton;
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
      if(request["coupon"]){
        let {ajax,info} = request["coupon"];
        console.warn(ajax);
        chrome.storage.sync.set({["coupon"+ajax["data"]["key"]]:{ajax,info}},function(results){
          console.warn(results);
        });
      }else if(request["couponList"]){
        request["couponList"].forEach(function(coupon){
          if(coupon.quota - coupon.denomination == 1){
            coupon.priority = 1;
          }else if(coupon.denomination / coupon.quota >= 0.9){
            coupon.priority = 10;
          }else if(coupon.remindPeople){
            coupon.priority = 20;
          }else if(coupon.shopId){
            coupon.priority = 100;
          }else{
            coupon.priority = 50;
          }
          if(!coupon.key){
            console.warn(coupon);
            return;
          }          
          //db.coupon_collection.put(coupon).then(function(){},function(result){console.warn(coupon)});
          db.coupon.put(coupon).then(function(){},function(result){console.warn(coupon)});
          // chrome.storage.local.set({["coupon" + coupon["key"]]:{coupon}},function(results){
          //   console.warn(results);
          // });
        });
      }else{

      }
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
  function process_coupon(){
    chrome.storage.sync.get(null,function(items){
      var now = new Date().getTime();
      var next_minute = now - now % (60 * 1000) + 60 * 1000;
      var schedules = Object.keys(items).filter(function(key){return key.match(/^schedule(\d+)/) && RegExp.$1 < next_minute; }).forEach(function(key){
        console.warn(key + " is removed!",schedules);
        chrome.storage.sync.remove(key);
      });
      var schedules =  Object.keys(items).filter(function(key){return new RegExp("^schedule"+next_minute).test(key);});
      schedules.length && console.warn("schedule"+next_minute,schedules);
      schedules.forEach(function(key){
        var coupons = Object.values(items[key]);
        var offset; 
        coupons.forEach(function(coupon){
          setTimeout(function(){
            if(coupon["script"]){
              eval(coupon["script"]);
            }else if(coupon["ajax"]){
              ajax(coupon,next_minute);
            } 
          },60 * 1000 - 1000);
        });
      });
    });
  }
  chrome.alarms.onAlarm.addListener(function(alarm){
    //console.warn(new Date().getTime(),"onAlarm:\t" + alarm.name);
    process_coupon();
  });
  chrome.alarms.create("schedule", {
    when : 60 * 1000 - (now = new Date().getTime()) % 60000 + now ,
    periodInMinutes : 1
  })
})()

function ajax(coupon,next_minute){
  window["jsonpCBKA"] = window["jsonpCBKA"] || function (result){
    return result;
  }
  var now = new Date().getTime();
  coupon["ajax"]["cache"] = false;
  $.ajax(coupon["ajax"]).done(function(result){
    console.warn(now,coupon,result);
    try{
      result = eval(result);
    }catch(e){
      result = result.match(/<h1 class="ctxt02"><s class="icon-redbag"><\/s>([^<]+)<\/h1>/m);
      result = result && result[1];
    }    
    console.warn(now,coupon,result);
    if( next_minute && (now - next_minute <= 1000) && (result.ret != 999) ){
      setTimeout(function(){ajax(coupon,next_minute)},Math.random() * 100 + 150);
    }else{
      notify({title:"Coupon draw finished!",items:[{title:"msg",message:JSON.stringify(result)}]});
    }
  });
}

// //右键菜单
// chrome.contextMenus.create({
//     title: '提取本页', // %s表示选中的文字
//     contexts: ['all'], 
//     onclick: function(params,tab){
//       chrome.tabs.sendMessage(tab.id, {"to":"inject","work":"collect_coupon"}, function(response){
//       //console.warn(response);
//       });
//     }
// });

function notify(option,callback = function(){}){
  option["iconUrl"] = "images/get_started48.png";
  option["type"] = "list";
  option["message"] = "Work finished!";
  option["items"].forEach(function(item){
    item.message += "";
  });
  chrome.notifications.create(null,option,callback);
}

function refresh_conpon_list(){
  chrome.storage.sync.get(null,function(results){
    Object.keys(results).filter(function(key){return /^coupon/.test(key)}).forEach(function(key){
      $(`<div class="input-group"></div>`).append(`<div class="input-group-prepend">
          <a href="#" class="list-group-item list-group-item-action input-group-text">${key}</a>
        </div>`).append($(`<input type="text" class="form-control datetimepicker" />`).datetimepicker()).append($(`<div class="input-group-append">
          <button type="button" class="btn btn-primary" id="add_coupon">添加时间</button>
        </div>`).click(function(){
          var time = Date.parse($(this).siblings(".datetimepicker").val());
          chrome.storage.sync.get("schedule"+time,function(schedule){
            schedule = schedule["schedule"+time] || {};
            schedule[key] = results[key];
            chrome.storage.sync.set({["schedule"+time] : schedule},function(){
              //timeline
              console.warn(schedule[key]);
            });
          });
        })).append(`<table class="table collapse"></table>`)
        .appendTo("#coupon_list");
    });
  });
}

$(function(){
  $('#datetimepicker').datetimepicker();
  $("#save_to_db").click(function(){

  });
  $("#clear_useless_coupon").click(function(){
    chrome.tabs.query({index:0}, function(tabs){
      console.warn(tabs);
      chrome.tabs.sendMessage(tabs[0].id, {"to":"inject","from":"backgroud","work":"clear_useless_coupon"}, function(response){
          //if(callback) callback(response);
      });
    });    
  })
  refresh_conpon_list();
});