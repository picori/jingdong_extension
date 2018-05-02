// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function refresh_conpon_list(){
  chrome.storage.sync.get(null,function(results){
    Object.keys(results).filter(function(key){return /^coupon/.test(key)}).forEach(function(key){
      var coupon = results[key];
      var wrapper_div = $(`<div class="card"></div>`);
      var operation_wrapper_div = $(`<div class="input-group card-header" id="heading${key}"></div>`);
      var coupon_a = $(`<div class="input-group-prepend"><a title="${key}" href="#" data-toggle="collapse" data-target="#collapse${key}" aria-expanded="true" aria-controls="collapse${key}" class="list-group-item list-group-item-action input-group-text">${coupon.info.use_rule+"("+coupon.info.rule+"减"+coupon.info.money+")"}</a></div>`);
      var datetimepicker = $(`<input type="text" class="form-control datetimepicker" />`).datetimepicker();
      var add_schedule = $(`<button type="button" class="btn btn-primary" id="add_schedule">添加时间</button>`);
      var delete_coupon = $(`<button type="button" class="btn btn-primary" id="delete_coupon">删除优惠券</button>`);
      var timeline_wrapper_div = $(`<div id="collapse${key}" class="collapse" aria-labelledby="heading${key}" data-parent="#accordion">`);
      var card_body = $(`<div class="card-body"></div>`);
      add_schedule.click(function(){
        var time = Date.parse($(this).siblings(".datetimepicker").val());
        chrome.storage.sync.get("schedule"+time,function(schedule){
          schedule = schedule["schedule"+time] || {};
          schedule[key] = results[key];
          chrome.storage.sync.set({["schedule"+time] : schedule},function(){
            //timeline
            console.warn(schedule[key]);
            chrome.storage.sync.get(null,function(results){
              card_body.empty();
              Object.keys(results).filter(function(key){return /^schedule/.test(key)}).forEach(function(schedule_key){                
                if(results[schedule_key][key]){
                  console.warn(schedule_key,results[schedule_key],results[schedule_key][key]);
                  card_body.append(`<div class="d-inline p-2 bg-primary text-white">${schedule_key.substring(8)}</div>`);
                }                
              });
            });
          });
        });
      });
      operation_wrapper_div.append(coupon_a).append(delete_coupon).append(datetimepicker).append(add_schedule).appendTo(wrapper_div);
      timeline_wrapper_div.append(card_body).appendTo(wrapper_div);
      wrapper_div.appendTo("#accordion");
      // $(`<div class="input-group"></div>`).append(`<div class="input-group-prepend">
      //     <a href="#" class="list-group-item list-group-item-action input-group-text">${key}</a>
      //   </div>`).append().append($(`<div class="input-group-append">
      //     <button type="button" class="btn btn-primary" id="add_coupon">添加时间</button>
      //   </div>`).click(function(){
      //     var time = Date.parse($(this).siblings(".datetimepicker").val());
      //     chrome.storage.sync.get("schedule"+time,function(schedule){
      //       schedule = schedule["schedule"+time] || {};
      //       schedule[key] = results[key];
      //       chrome.storage.sync.set({["schedule"+time] : schedule},function(){
      //         //timeline
      //         console.warn(schedule[key]);
      //       });
      //     });
      //   })).append(`<table class="table collapse"></table>`)
      //   .appendTo("#coupon_list");
    });
  });
}

$(function(){
  var background_page = chrome.extension.getBackgroundPage();
  refresh_conpon_list();
})
