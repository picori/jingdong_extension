// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// http://coupon.m.jd.com/coupons/show.action?key=1007aa0ba6f54a0da06d58dd94fb743d&roleId=12358353
// http://coupon.jd.com/ilink/couponSendFront/send_index.action?key=e2c098dc77d94f8d97a9568aba5f2087&roleId=12336645&to=jd.com&cu=true

// 
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

function fetchTab(type,callback,index=0){
  // if(fetchTab[type]){
  //   chrome.tabs.query({id:fetchTab[type]}, function (tabs){
  //     if(tabs[0].active){
  //       callback(current_tab[type]=tabs[0]);
  //     }else{
  //       chrome.tabs.create({index:index},function(tab){
  //         console.warn("New tab is created");
  //         callback(tab);
  //       });
  //     }
  //   })
  // }
  chrome.tabs.query({index:0}, function (tabs){
    if(!current_tab[type] || (current_tab[type].id != tabs[0].id)){
      current_tab[type] = tabs[0];     
      addBlocker(current_tab[type]);
    }
    callback(current_tab[type]);    
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

var list = {follow:[],sign:[],draw:[]};
var current_tab = {follow:undefined,sign:undefined,draw:undefined};
var current_url = {follow:undefined,sign:undefined,draw:undefined};
var running = false;
var counter = {follow:0,sign:0,draw:0};
var beans = {follow:0,sign:0,draw:0};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  function reset_summary(type){
    var types = type ? [type] : ["follow","sign","draw"];
    types.forEach(function(type){
      list[type] = [];
      current_url[type] = undefined;
      beans[type] = 0;
      counter[type] = 0;
      running = false;
      current_tab[type] = false;
    });
  }
  function follow(callback){
    var match;
    if( running && !current_url["follow"] ){
      return;
    }
    running = "follow";
    current_url["follow"] = (list["follow"]||[]).shift();
    console.warn(current_url["follow"]);
    if(!current_url["follow"]){
      notify({title:"All shops are followed!",items:[{title:"Operaton",message:"Follow"},{title:"counter",message:counter["follow"]},{title:"beans",message: beans["follow"]}]});
      reset_summary("follow");      
      return callback && callback();
    }
    chrome.tabs.update(current_tab["follow"].id, {url:current_url["follow"]},callback);
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
      //chrome.storage.local.set({[running + shop_id]:{"venderId":vender_id,"shopId":shop_id,"beans":0}},function(results){});
      $.ajax({url:`https://f-mall.jd.com/shopGift/getShopGiftInfo?venderId=${vender_id}`,cache:false,dataType:"json"}).then(function(data){
        if(data.result){
          if(data.giftList && data.giftList.find(function(item,index,list){return item.prizeType == 4})){
            chrome.storage.local.set({[running + shop_id]:{"venderId":vender_id,"shopId":shop_id,"beans":2}},function(results){});
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
                beans["follow"] += discount;
                notify({title:`${running} a shop with beans!`,items:[{title:"Order",message:counter["follow"]},{title:"Beans",message: discount},{title:"Current Total Beans",message:beans["follow"]}]});
              }              
              return next();
            },next);
          }else{
            chrome.storage.local.set({[running + shop_id]:{"venderId":vender_id,"shopId":shop_id,"beans":1}},function(results){});
            return next();
          }          
        }else{    
          console.warn(data);      
          if(data.message.match(/获取店铺礼包信息失败/)){
            chrome.storage.local.set({[running + shop_id]:{"venderId":vender_id,"shopId":shop_id,"beans":1}},function(results){});
          }else if(data.message.match(/店铺未开通礼包活动/)){
            chrome.storage.local.set({[running + shop_id]:{"venderId":vender_id,"shopId":shop_id,"beans":0}},function(results){});
          }else if(data.message.match(/获取礼包信息失败，传递参数有误！/)){
            return;
          }          
          return next();
        }
      },next);
    }
    getIndexPage(current_url["follow"],getShopGiftInfo);
    // if(match = current_url.match(/https?:\/\/mall\.jd\.com\/index\-(\d+)\.html/)){         
    //   getIndexPage(current_url,getShopGiftInfo);
    // }else{

    // }
  }
  
  function sign(callback){
    current_url["sign"] = (list["sign"]||[]).shift();
    running = "sign";
    if(!current_url["sign"]){
      console.warn(current_url["sign"]);
      notify({title:"All shops are signed!",items:[{title:"Operation",message:"Sign"},{title:"counter",message:counter["sign"]},{title:"beans",message: beans["sign"]}]});
      reset_summary("sign");     
      return callback && callback();
    }
    chrome.tabs.update(current_tab["sign"].id, {url:current_url["sign"]},callback);
  } 
  function draw(callback){
    var match,
    current_url = (list["draw"]||[]).shift();
    console.warn(current_url);
    running = "draw";
    if(!current_url){
      notify({title:"All shops are drawed!",items:[{title:"Operaton",message:"Draw"}]});
      reset_summary();      
      return callback && callback();
    }
    chrome.tabs.update(current_tab["draw"].id, {url:current_url},callback);
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
          notify({title:"You are lucky!",items:[{title:"last_operaton",message:running},{title:"counter",message:counter},{title:"current_code",message: JSON.stringify(result["data"])}]});
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
  function fetchFollowList(url_list,callback){
    if(url_list.length){
      list["follow"] = url_list;
      callback();
    }else{
      chrome.storage.local.get(null,function(results){
        list["follow"] = Object.keys(results);//Object.values(results);
        callback();
      });
    }
  }
  function fetchSignList(sign_list,callback){
    list["sign"] = sign_list;
    callback && callback();
  }
  function fetchDrawList(draw_list,callback){
    list["draw"] = draw_list;
    callback && callback();
  }
  async function search(index){
    function getPage(cb){
      var url = "https://mall.jd.com/index-" + index + ".html";
      console.warn(url);
      return $.ajax({url,dataType:"html"}).then(function(page){
        var vender_id,shop_id;
        //console.warn(page);
        if(page.match(/<input type="hidden" id="vender_id" value="(\d+)" \/>/)){
          vender_id = RegExp.$1;
        }
        if(page.match(/<input type="hidden" id="shop_id" value="(\d+)" \/>/)){
          shop_id = RegExp.$1;
        }
        if(vender_id && shop_id){
          chrome.storage.local.set({["shop|"+shop_id] : {shop_id,vender_id}},function(){});
          console.warn(`${vender_id}\t${shop_id}`);
        }else{
          return search(++index);
        }
        cb(page);
      },function(reject){
        //console.warn(reject);
        search(++index);
      });
    }
    function analysisPage(page,cb){
      var act_urls = page.match(/\/\/sale\.jd\.com\/act\/(\w+)\.html/g)||[];
      function analysisActPage(){
        var act_url = act_urls.pop(),act_key;
        if(!act_url){
          return search(++index);
        }
        act_key = (act_url.match(/\/\/sale\.jd\.com\/act\/(\w+)\.html/)||[])[1];
        if(!act_key){
          return search(++index);
        }        
        chrome.storage.local.get("act|" + act_key,function(result){
          var act_url = `https://sale.jd.com/act/${act_key}.html`;
          if(!result["act|" + act_key]){
            $.ajax({url:act_url,dataType:"html"}).then(function(page){
              var match;
              //console.warn(page);
              if(match = page.match(/\{lotterycode:'([^']+)'\}/m)){
                chrome.storage.local.get("lottery|" + match[1],function(lottery){
                  var lottery_code = match[1];
                  if(!lottery["lottery|" + lottery_code]){
                    chrome.storage.local.set({["lottery|" + lottery_code]:{code:lottery_code,act_key}},function(){
                      notify({'title':'Find a new lottery!',items:[{'title':'Code','message':lottery_code}]});
                      analysisActPage();
                    });
                  }else{
                    console.warn(`Lottery ${lottery_code} is already exist!`);
                    analysisActPage();
                  }
                });
              }else{
                console.warn(`act ${act_key} has no lottery`);
                analysisActPage();
              }
              //analysisActPage();
            },function(reject){
              analysisActPage();
            });            
          }
        });
      }
      analysisActPage();
    }
    if(index){
      chrome.storage.local.set({["current_search"] : index},function(){
        getPage(analysisPage);
      });      
    }else{
      chrome.storage.local.get("current_search",function(result){
        search(result["current_search"]||1);
      });
    }
  }

  function next(){
    counter[running]++;
    if(running == "follow"){
      follow();
    }else if(running == "sign"){
      sign();
    }else if(running == "draw"){
      draw();
    }
  }
  if(request["to"] == "background"){
    if(request["work"].indexOf("error")>-1){
      request["work"] = running;
    }
    if(request["work"] == "start_follow"){
      fetchFollowList(request["list"],function(){
        fetchTab("follow",function(){
          follow(function(result){            
            //console.warn(result);
          });
        })
      });
    }else if(request["work"] == "follow"){
      let result = request["result"]||{"venderId":0,"shopId":0,"beans":0};
      counter["follow"]++;
      beans["follow"] += result["beans"];
      if(result.shopId){
        if(result["beans"]){
          notify({title:`Followed a shop with beans!`,items:[{title:"Order",message:counter["follow"]},{title:"Beans",message: result["beans"]},{title:"Current Total Beans",message:beans["follow"]}]});
        }
        result["beans"] = 1;
        chrome.storage.local.set({["follow" + result.shopId]:result},function(results){});
      }
      fetchTab("follow",function(tab){
        follow(function(result){            
          //console.warn(result);
        });
      });
    }else if(request["work"] == "start_sign"){
      fetchSignList(request["list"],function(){
        fetchTab("sign",function(){
          sign(function(result){            
            //console.warn(result);
          });
        });
      });
    }else if(request["work"] == "sign"){
      let result = request["result"]||{"venderId":0,"shopId":0,"beans":0};
      counter["sign"]++;
      beans["sign"] += result["beans"];
      if(result.shopId){
        if(result["beans"]){
          notify({title:`Followed a shop with beans!`,items:[{title:"Order",message:counter["sign"]},{title:"Beans",message: result["beans"]},{title:"Current Total Beans",message:beans["sign"]}]});
        }
        result["beans"] = 1;
        chrome.storage.local.set({["sign" + result.shopId]:result},function(results){});
      }
      fetchTab("sign",function(){
        sign(function(result){
          //console.warn(result);
        });
      });
    }else if(request["work"] == "start_draw"){
      fetchDrawList(request["list"],function(){
        fetchTab("draw",function(){
          draw(function(result){            
            //console.warn(result);
          });
        });
      });
    }else if(request["work"] == "draw"){
      fetchTab("draw",function(){
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
    }else if(request["work"] = "start_search"){
      console.warn("popup start_search");
      search();
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
          },60 * 1000 - 1500);
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
    console.warn(now,coupon,result);
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
  option["message"] = option["message"] || "Work finished!";
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