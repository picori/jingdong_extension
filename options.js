// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var background_page = chrome.extension.getBackgroundPage();

function refresh_conpon_list(){
  $("#accordion").empty();
  chrome.storage.sync.get(null,function(results){
    Object.keys(results).filter(function(key){return /^coupon/.test(key)}).forEach(function(key){
      var coupon = results[key];
      var wrapper_div = $(`<div class="card"></div>`);
      wrapper_div.data("coupon",coupon);
      var operation_wrapper_div = $(`<div class="input-group card-header" id="heading${key}"></div>`);
      var coupon_a = $(`<div class="input-group-prepend"><a title="${key}" href="#" data-toggle="collapse" data-target="#collapse${key}" aria-expanded="true" aria-controls="collapse${key}" class="list-group-item list-group-item-action input-group-text">${coupon.name}</a></div>`);
      var datetimepicker = $(`<input type="text" class="form-control datetimepicker" />`).datetimepicker();
      var add_schedule = $(`<button type="button" class="btn btn-primary" id="add_schedule">添加时间</button>`);
      var delete_coupon = $(`<button type="button" class="btn btn-primary" id="delete_coupon">删除优惠券</button>`);
      var test_coupon = $(`<button type="button" class="btn btn-primary" id="test_coupon">测试优惠券</button>`);
      var timeline_wrapper_div = $(`<div id="collapse${key}" class="collapse" aria-labelledby="heading${key}" data-parent="#accordion">`);
      var card_body = $(`<div class="card-body d-flex align-content-start bd-highlight flex-wrap"></div>`);
      var close_button = $(`<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>`);
      operation_wrapper_div.append(close_button).append(coupon_a).append(test_coupon).append(datetimepicker).append(add_schedule).appendTo(wrapper_div);
      timeline_wrapper_div.append(card_body).appendTo(wrapper_div);
      wrapper_div.appendTo("#accordion");
      test_coupon.click(function(){
        background_page.ajax_coupon(coupon);
      });
      close_button.click(function(){
        chrome.storage.sync.remove(key,function(){
          refresh_conpon_list();
        });
      });
      coupon_a.click(function(){
        $("#coupon_key").val(coupon.key);
        $("#role_id").val(coupon.roleid);
        $("#to").val(coupon.to);
        $("#name").val(coupon.name);
        $("#ajax").val(JSON.stringify(coupon.ajax));
        $("#coupon_url").val(coupon.coupon_url);
        $("#click").val(coupon.click);
        $("#start_date").val(coupon.start_date);
        $("#end_date").val(coupon.end_date);
        $("#memo").val(coupon.memo);
        refresh_schedule();
      });
      function refresh_schedule(){
        chrome.storage.sync.get(null,function(results){
          card_body.empty();
          Object.keys(results).filter(function(key){return /^schedule/.test(key)}).sort().forEach(function(schedule_key){                
            if(results[schedule_key][key]){
              let close_button = $(`<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>`),
                time_point = $(`<div class="p-2 bg-primary bd-highlight text-white">${dateformat(new Date(schedule_key.substring(8)*1))}</div>`);
              time_point.append(close_button);
              close_button.click(function(){
                chrome.storage.sync.get(schedule_key,function(result){
                  delete result[schedule_key][key];
                  chrome.storage.sync.set(result,function(){
                    refresh_schedule();
                  });
                });
              });
              console.warn(schedule_key,results[schedule_key],results[schedule_key][key]);
              card_body.append(time_point);
            }                
          });
        });
      }
      add_schedule.click(function(){ 
        operation_wrapper_div.click();       
        var time = Date.parse($(this).siblings(".datetimepicker").val());
        if(!time){
          return;
        }
        chrome.storage.sync.get("schedule"+time,function(schedule){
          schedule = schedule["schedule"+time] || {};
          schedule[key] = results[key];
          chrome.storage.sync.set({["schedule"+time] : schedule},function(){
            //timeline
            console.warn(schedule[key]);
            refresh_schedule();
          });
        });
      });      
    });
  });
}

function refresh_lottery_list(){
  var show_ignored = $("#lottery_show_ignored").is(":checked"),
    show_expired = $("#lottery_show_expired").is(":checked");
  $("#lottery_accordion").empty();
  chrome.storage.local.get(null,function(results){
    var counter = 0;
    Object.keys(results).filter(function(key){return /^lottery\|/.test(key) && ( !!show_ignored == !!results[key]["ignore"] ) && ( !!show_expired != new Date(results[key]["endTime"]) >= new Date() ) }).forEach(function(key){
      //console.warn(key);
      var lottery = results[key];
      var wrapper_div = $(`<div class="card"></div>`);
      wrapper_div.data("lottery",lottery);
      var operation_wrapper_div = $(`<div class="input-group card-header" id="heading_${key.replace(/\W/g,"")}"></div>`);
      var lottery_a = $(`<div class="input-group-prepend"><a title="${key.replace(/\W/g,"")}" href="#" data-toggle="collapse" data-target="#collapse_${key.replace(/\W/g,"")}" aria-expanded="true" aria-controls="collapse_${key.replace(/\W/g,"")}" class="list-group-item list-group-item-action input-group-text">${"["+ ++counter + "]" + lottery.code}</a></div>`);
      var datetimepicker = $(`<input type="text" class="form-control datetimepicker" />`).datetimepicker({datepicker : false,format:'H:i'});
      var add_schedule = $(`<button type="button" class="btn btn-primary" id="add_schedule">添加时间</button>`);
      var delete_lottery = $(`<button type="button" class="btn btn-primary" id="delete_lottery">删除抽奖</button>`);
      var test_lottery = $(`<button type="button" class="btn btn-primary" id="test_lottery">测试抽奖</button>`);
      var timeline_wrapper_div = $(`<div id="collapse_${key.replace(/\W/g,"")}" class="collapse" aria-labelledby="heading_${key.replace(/\W/g,"")}" data-parent="#lottery_accordion">`);
      var card_body = $(`<div class="card-body d-flex align-content-start bd-highlight flex-wrap"></div>`);
      var close_button = $(`<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>`);
      operation_wrapper_div.append(close_button).append(lottery_a).append(test_lottery).append(datetimepicker).append(add_schedule).appendTo(wrapper_div);
      timeline_wrapper_div.append(card_body).appendTo(wrapper_div);
      wrapper_div.appendTo("#lottery_accordion");
      test_lottery.click(function(){
        background_page.draw_lottery(lottery);
      });
      close_button.click(function(){
        chrome.storage.local.remove(key,function(){
          refresh_lottery_list();
        });
      });
      lottery_a.click(function(){
        $("#lottery_code").val(lottery["code"]);
        $("#lottery_act_key").val(lottery["act_key"]||lottery["act_url"].match(/\/\/sale\.jd\.com\/act\/(\w+)\.html/)[1]);
        $("#lottery_start_time").html(lottery["beginTime"]);
        $("#lottery_end_time").html(lottery["endTime"]);
        $("#lottery_time_range").val(lottery["time_range"]||0);
        $("#lottery_memo").val(lottery["memo"]||"");
        $("#lottery_ignore").prop("checked",lottery["ignore"] ? "checked" : false);
        $("#lottery_prize").data("prize_list",lottery["lotteryPrize"]||[]);
        $("#lottery_prize_list").empty();
        (lottery["lotteryPrize"]||[]).forEach(function(prize){
          $("#lottery_prize_list").append(`<div class="p-2 bg-primary bd-highlight text-white">${prize.prizeName}</div>`);
        });
        $("#lottery_winner_list").empty();
        (lottery["winner_list"]||[]).forEach(function(winner){
          $("#lottery_winner_list").append(`<div class="d-flex align-content-start bd-highlight flex-wrap"><div class="p-2 bg-primary bd-highlight text-white">${winner["winDate"]}</div><div class="p-2 bg-primary bd-highlight text-white">${winner["prizeName"]}</div><div class="p-2 bg-primary bd-highlight text-white">${winner["userPin"]}</div></div>`);
        });
        refresh_schedule();
      });
      function refresh_schedule(){
        chrome.storage.sync.get(null,function(results){
          card_body.empty();
          Object.keys(results).filter(function(key){return /^schedule\|lottery/.test(key)}).sort().forEach(function(schedule_key){                
            if(results[schedule_key][key]){
              let close_button = $(`<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>`),
                time_point = $(`<div class="p-2 bg-primary bd-highlight text-white">${schedule_key.match(/schedule\|lottery\|(\d{2})(\d{2})(\d{2})/).slice(1,4).join(':')}</div>`);
              time_point.append(close_button);
              close_button.click(function(){
                chrome.storage.sync.get(schedule_key,function(result){
                  delete result[schedule_key][key];
                  chrome.storage.sync.set(result,function(){
                    refresh_schedule();
                  });
                });
              });
              console.warn(schedule_key,results[schedule_key],results[schedule_key][key]);
              card_body.append(time_point);
            }                
          });
        });
      }
      add_schedule.click(function(){ 
        operation_wrapper_div.click();       
        var time = $(this).siblings(".datetimepicker").val();
        if(!time){
          return;
        }
        time = time.replace(/:/g,"").concat("00");
        chrome.storage.sync.get("schedule|lottery|"+time,function(schedule){
          schedule = schedule["schedule|lottery|"+time] || {};
          schedule[key] = key;
          console.warn("schedule|lottery|"+time);
          chrome.storage.sync.set({["schedule|lottery|"+time] : schedule},function(){
            //timeline
            console.warn(schedule[key]);
            refresh_schedule();
          });
        });
      });      
    });
  });
}


$(function(){
  $("nav a").click(function(){
    $(".panel").removeClass("focus").eq($(this).addClass("focus").siblings().removeClass("focus").end().index()).addClass("focus");
  });
  $("#start_date").datetimepicker();
  $("#end_date").datetimepicker();
  refresh_conpon_list();
  refresh_lottery_list();
  $("#lottery_show_ignored").change(function(){
    refresh_lottery_list();
  });
  $("#lottery_show_expired").change(function(){
    refresh_lottery_list();
  });
  $("#add_coupon").click(function(){
    var key = $("#coupon_key").val().trim(),
      roleid = $("#role_id").val().trim(),
      to = "m.jd.com" || $("#to").val().trim(),
      name = $("#name").val().trim(),
      ajax = $("#ajax").val().trim() ? eval("("+$("#ajax").val().trim()+")") : {},
      //coupon_url = $("#coupon_url").val().trim(),
      interval = $("#interval").val() || 150,
      start_date = $("#start_date").val().trim(),
      end_date = $("#end_date").val().trim(),
      is_jinrong = $("#jinrong:checked").length,
      memo = $("#memo").val().trim(),
      coupon = {name,key,roleid,ajax,start_date,end_date,memo,is_jinrong,interval};
    if(is_jinrong){
      coupon.ajax = {url:"https://m.jdpay.com/marketing/jdm/takeprize/direct",type:"POST",data:{
        "entranceId": key,
        "eid": "35CHJUTPIDBS5YY6RZI7M6IIR7J7VDS7SJJ4QYAERSFFTT6ZRZQHBV4AVM3CZCDGHICNPMRUINGGMF37PJ2FD2SYAY",
        "token": "LNW6JHEJX5CQ75TAAF3P7F24HQSYSDWZK7B4CEAMFSW3TAWFT7VJZCRWKI3LMW42IXRQIDM6534TS",
        "source": "H5",
        "browser": window.navigator.userAgent,
      },dataType:"html"};
      chrome.storage.sync.set({["coupon"+key] : coupon},function(){
        refresh_conpon_list();
      });
    }else{
      ajax.url = ajax.url || "https://s.m.jd.com/activemcenter/mfreecoupon/getcoupon?key=[KEY]&roleId=[ROLEID]&to=[TO]&sceneval=2&callback=jsonpCBKA&g_ty=ls".replace(/\[TIMESTAMP\]/g,new Date().getTime())
        .replace(/\[KEY\]/g,key)
        .replace(/\[ROLEID\]/g,roleid)
        .replace(/\[TO\]/g,encodeURIComponent(""));
      coupon.coupon_url = coupon.coupon_url || "//coupon.m.jd.com/coupons/show.action?key=[KEY]&roleId=[ROLEID]&to=[TO]".replace(/\[TIMESTAMP\]/g,new Date().getTime())
        .replace(/\[KEY\]/g,key)
        .replace(/\[ROLEID\]/g,roleid)
        .replace(/\[TO\]/g,encodeURIComponent(""));
      chrome.storage.sync.set({["coupon"+key] : coupon},function(){
        refresh_conpon_list();
      });
    }    
  });
  $("#add_lottery").click(function(){
    var code = $("#lottery_code").val().trim(),
      act_key = $("#lottery_act_key").val().trim(),
      time_range = ($("#lottery_time_range").val().trim() || 0) * 1,
      ignore = $("#lottery_ignore:checked").length;
    console.warn({code,act_key,time_range,ignore});
    //return;
    chrome.storage.local.get("lottery|"+ code,function(lottery){
      lottery = lottery["lottery|"+ code];
      Object.assign(lottery,{code,act_key,time_range,ignore});
      chrome.storage.local.set({["lottery|"+ code] : lottery},function(){
        refresh_lottery_list();
      });
    });
  });
  $("#lottery_act_url_button").click(function(){
    window.open("https://sale.jd.com/act/" + $("#lottery_act_key").val().trim() + ".html");    
  });
  $("#download_lottery_storage").click(async function(){
    var show_ignored = $("#lottery_show_ignored").is(":checked"),
    show_expired = $("#lottery_show_expired").is(":checked");
    chrome.storage.local.get(null,function(results){      
      var list = Object.keys(results).filter(function(key){return /^lottery\|/.test(key) && ( !!show_ignored == !!results[key]["ignore"] ) && ( !!show_expired == new Date(results[key]["endTime"]) < new Date() )}).map(function(key){return {code:results[key]["code"],act_url:"https://sale.jd.com/act/" + results[key]["act_key"] + ".html"}});//Object.values(results);
      console.warn(list);
      var csv = CSV.encode(list, { header: true });
      var file = new File([csv], "lottery_from_storage.csv", {type: "text/csv;charset=utf-8"});
      saveAs(file);
    });
  });
  $("#download_raw_lottery_storage").click(async function(){
    var show_ignored = $("#lottery_show_ignored").is(":checked"),
    show_expired = $("#lottery_show_expired").is(":checked");
    chrome.storage.local.get(null,function(results){
      var list = Object.keys(results).filter(function(key){return /^lottery\|/.test(key) && ( !!show_ignored == !!results[key]["ignore"] ) && ( !!show_expired == new Date(results[key]["endTime"]) < new Date() )}).map(function(key){return results[key]});//Object.values(results);
      //var csv = CSV.encode(list, { header: true });
      var file = new File([JSON.stringify(list)], "raw_lottery_from_storage.txt", {type: "text/csv;charset=utf-8"});
      saveAs(file);
    });
  });
  $("#clear_useless_coupon").click(function(){
    chrome.tabs.query({index:0}, function(tabs){
      console.warn(tabs);
      chrome.tabs.sendMessage(tabs[0].id, {"to":"inject","from":"option","work":"clear_useless_coupon"}, function(response){
          //if(callback) callback(response);
      });
    });    
  });
  $("#test_lottery").click(function(){
  
  });
})
