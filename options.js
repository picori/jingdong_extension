// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

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
      var timeline_wrapper_div = $(`<div id="collapse${key}" class="collapse" aria-labelledby="heading${key}" data-parent="#accordion">`);
      var card_body = $(`<div class="card-body d-flex align-content-start bd-highlight flex-wrap"></div>`);
      operation_wrapper_div.append(coupon_a).append(delete_coupon).append(datetimepicker).append(add_schedule).appendTo(wrapper_div);
      timeline_wrapper_div.append(card_body).appendTo(wrapper_div);
      wrapper_div.appendTo("#accordion");
      coupon_a.click(function(){
        $("#coupon_key").val(coupon.key);
        $("#role_id").val(coupon.roleid);
        $("#to").val(coupon.to);
        $("#name").val(coupon.name);
        $("#ajax").val(JSON.stringify(coupon.ajax));
        $("#coupon_url").val(coupon.coupon_url);
        $("#click").val(coupon.click);
        refresh_schedule();
      });
      function refresh_schedule(){
        chrome.storage.sync.get(null,function(results){
          card_body.empty();
          Object.keys(results).filter(function(key){return /^schedule/.test(key)}).forEach(function(schedule_key){                
            if(results[schedule_key][key]){
              console.warn(schedule_key,results[schedule_key],results[schedule_key][key]);
              card_body.append(`<div class="p-2 bg-primary bd-highlight text-white">${dateformat(new Date(schedule_key.substring(8)*1))}</div>`);
            }                
          });
        });
      }
      add_schedule.click(function(){
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


$(function(){
  var background_page = chrome.extension.getBackgroundPage();
  refresh_conpon_list();
  $("#add_coupon").click(function(){
    var key = $("#coupon_key").val().trim(),
      roleid = $("#role_id").val().trim(),
      to = $("#to").val().trim(),
      name = $("#name").val().trim(),
      ajax = eval("("+$("#ajax").val().trim()+")"),
      coupon_url = $("#coupon_url").val().trim(),
      click = $("#click").val(),
      coupon = {name,key,roleid,ajax,coupon_url,click};
      ajax.url && ( ajax.url = ajax.url.replace(/\[TIMESTAMP\]/g,new Date().getTime())
        .replace(/\[KEY\]/g,key)
        .replace(/\[ROLEID\]/g,roleid)
        .replace(/\[TO\]/g,encodeURIComponent(to)) );
      chrome.storage.sync.set({["coupon"+key] : coupon},function(){
        refresh_conpon_list();
      });
  });
})
