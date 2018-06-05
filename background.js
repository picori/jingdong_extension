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

// chrome.webRequest.onBeforeSendHeaders.addListener(
//   function (details){
//     return {cancel:true};
//   }, {urls:["*://uranus.jd.com/*"]},
//   ["blocking","requestHeaders"]);

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details){
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {
        details.requestHeaders[i].value = "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60/application=JDJR-App&deviceId=249205E2-74D3-4D3B-A3B3-B6F7F0EFC5CE&clientType=ios&iosType=iphone&clientVersion=4.9.2&HiClVersion=4.9.2&isUpdate=0&osVersion=10.3.3&osName=iOS&platform=iPhone 6 (A1549/A1586)&screen=667*375&src=App Store&ip=192.168.100.55&mac=02:00:00:00:00:00&netWork=1&sPoint=MTUwMDMjI3Nob3V5ZTUwMDE%3D&jdPay=(*#@jdPaySDK*#@jdPayChannel=jdfinance&jdPayChannelVersion=4.9.2&jdPaySdkVersion=2.18.0.0&jdPayClientName=iOS*#@jdPaySDK*#@)"
        return {requestHeaders:details.requestHeaders}
      }
    }
  }, {urls:["*://m.jr.jd.com/*"]},
  ["blocking","requestHeaders"]);

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return {cancel: true};
  },
  {urls: ["https://static.360buyimg.com/static-mall/shop/dest/js/common-business/??INTERFACE.min.js,login.min.js,follow.mall.min.js,getMallHeader.min.js,other.min.js?t=20161207",
  "https://static.360buyimg.com/static-shop-sale-p/js/common-business/??INTERFACE.js,login.js,follow.mall.js,getMallHeader.js,other.js?t=20161207",
  "*://payrisk.jd.com/js/m.js"]},
  ["blocking"]
);

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
    var match;
    current_url = (list||[]).shift();
    console.warn(current_url);
    if(!current_url){
      notify({title:"All shops are followed!",items:[{title:"last_operaton",message:last_operaton},{title:"counter",message:counter},{title:"beans",message: beans}]});
      reset_summary();      
      return callback && callback();
    }
    chrome.tabs.update(current_tab.id, {url:current_url},callback);
    return;
    function getIndexPage(url,cb){
      return $.ajax({url,dataType:"html"}).then(function(page){
        cb(page);
      },function(reject){
        //console.warn(reject);
        follow(cb);
      });
    }
    function getShopGiftInfo(page){
      var vender_id,shop_id;
      if(page.match(/<input type="hidden" id="vender_id" value="(\d+)" \/>/)){
        vender_id = RegExp.$1;
      }
      if(page.match(/<input type="hidden" id="shop_id" value="(\d+)" \/>/)){
        shop_id = RegExp.$1;
      }
      if(!vender_id || !shop_id){
        return next();
      }
      //chrome.storage.local.set({[last_operaton + shop_id]:{"venderId":vender_id,"shopId":shop_id,"beans":0}},function(results){});
      $.ajax({url:`https://f-mall.jd.com/shopGift/getShopGiftInfo?venderId=${vender_id}`,cache:false,dataType:"json"}).then(function(data){

        if(data.result){
          if(data.giftList && data.giftList.find(function(item,index,list){return item.prizeType == 4})){
            chrome.storage.local.set({[last_operaton + shop_id]:{"venderId":vender_id,"shopId":shop_id,"beans":2}},function(results){});
            $.ajax({
              url:"https://f-mall.jd.com/shopGift/drawShopGiftInfo",
              data: {
                  vId: vender_id,
                  jshop_token: data.jshop_token,
                  aId: data.giftList[0] ? data.giftList[0].activityId : 0
              },
              dataType: 'html'
            }).then(function(response){
              try{
                response = JSON.parse(response);
              }catch(e){
                console.warn(e);
              }
              if(response.result){
                let {discount=0} = data.giftList.find(function(item,index,list){return item.prizeType == 4});
                beans += discount;
                notify({title:`${last_operaton} a shop with beans!`,items:[{title:"Order",message:counter},{title:"Beans",message: discount},{title:"Current Total Beans",message:beans}]});
              }              
              return next();
            },next);
          }else{
            chrome.storage.local.set({[last_operaton + shop_id]:{"venderId":vender_id,"shopId":shop_id,"beans":1}},function(results){});
            return next();
          }          
        }else{    
          console.warn(data);      
          if(data.message.match(/获取店铺礼包信息失败/)){
            chrome.storage.local.set({[last_operaton + shop_id]:{"venderId":vender_id,"shopId":shop_id,"beans":1}},function(results){});
          }else if(data.message.match(/店铺未开通礼包活动/)){
            chrome.storage.local.set({[last_operaton + shop_id]:{"venderId":vender_id,"shopId":shop_id,"beans":0}},function(results){});
          }else if(data.message.match(/获取礼包信息失败，传递参数有误！/)){
            return;
          }          
          return next();
        }
      },next);
    }
    getIndexPage(current_url,getShopGiftInfo);
    // if(match = current_url.match(/https?:\/\/mall\.jd\.com\/index\-(\d+)\.html/)){         
    //   getIndexPage(current_url,getShopGiftInfo);
    // }else{

    // }
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
      reset_summary();     
      return callback && callback();
    }
    let {url} = current;
    current_url = url;
    chrome.tabs.update(current_tab.id, {url},callback);
  } 
  function draw(callback){
    var match,
    current_url = (list||[]).shift();
    console.warn(current_url);
    if(!current_url){
      notify({title:"All shops are drawed!",items:[{title:"last_operaton",message:last_operaton}]});
      reset_summary();      
      return callback && callback();
    }
    chrome.tabs.update(current_tab.id, {url:current_url},callback);
    return;
    function drawLottery(lottery_code,cb){
      return $.ajax({url:`https://l-activity.jd.com/lottery/lottery_start.action?&lotteryCode=${lottery_code}`,cache:false,dataType:"jsonp"}).then(function(result){
        console.warn(result);
        try{
          result = eval(result.replace(/^jQuery4904083/,""));
        }catch(e){
          result = {"data":{"chances":0,"downgradeCanNotWin":false,"pass":true,"promptMsg":"错误！","userPin":"picori","winner":false}};
        }
        if(result["data"]["winner"]){
          notify({title:"You are lucky!",items:[{title:"last_operaton",message:last_operaton},{title:"counter",message:counter},{title:"current_code",message: JSON.stringify(result["data"])}]});
        }
        if(result["data"]["chances"]){
          drawLottery(current_code,cb);
        }else{
          cb();
        }
      },function(reject){
        //console.warn(reject);
        draw(cb);
      });
    }
    drawLottery(current_code,draw);
  }
  function fetchSignList(sign_list,callback){
    list = sign_list;
    callback && callback();
  }
  function fetchDrawList(draw_list,callback){
    list = draw_list;
    callback && callback();
  }
  function next(reject){
    reject && console.warn(reject);
    counter++;
    if(last_operaton == "follow"){
      follow();
    }else if(last_operaton == "sign"){
      sign();
    }else if(last_operaton == "draw"){
      draw();
    }
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
        result["beans"] = 1;
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
    }else if(request["work"] == "start_draw"){
      //return console.warn(request["list"]);
      last_operaton = "draw";
      fetchDrawList(request["list"],function(){
        fetchTab(function(){
          draw(function(result){            
            //console.warn(result);
          });
        });
      });
    }else if(request["work"] == "draw"){
      fetchTab(function(){
        draw(function(result){
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
    }else if(request["work"] == "notify"){
      notify({title:"Lottery draw result!",items:[{title:"msg",message:JSON.stringify(request["info"])}]});
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
          },60 * 1000 - 2000);
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
    //console.warn(now,coupon,result);
    try{
      result = eval(result);
    }catch(e){
      if(coupon.is_jinrong){
        result = result.match(/<p class="J_prizeIntro">([^<]+)<\/p>/m);
        result = result && result[1];
      }else{
        result = result.match(/<h1 class="ctxt02"><s class="icon-redbag"><\/s>([^<]+)<\/h1>/m);
        result = result && result[1];
      }      
    }    
    //console.warn(now,coupon,result);
    if( next_minute && (now - next_minute <= 1000) && (result.ret != 999) ){
      setTimeout(function(){ajax(coupon,next_minute)},coupon.interval || (Math.random() * 100 + 150) );
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
  console.warn(option);
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