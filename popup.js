// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

//'use strict';

$(function(){
    $("nav a").click(function(){
        $(".panel").removeClass("focus").eq($(this).addClass("focus").siblings().removeClass("focus").end().index()).addClass("focus");
    });

    $("#submit_sign").click(function(){
        var list = $("#url_list").val().match(/https?:\/\/mall\.jd\.com\/index-\d+\.html/g);
    });

	$("#submit_follow").click(function(){
	  	var list = $("#url_list").val().match(/https?:\/\/mall\.jd\.com\/index-\d+\.html/g);
		function* saveToStorage(){
            var line;
            while((line = list.shift()) !== undefined){
    			yield new Promise(function(resolve,reject){
    		        var match = line.match(/(https?:\/\/mall\.jd\.com\/index-(\d+)\.html)/);
                    function new_resolve(result){
                        $("#url_list").val(list.join("\n"));
                        resolve(result);
                    }
                    if(match){
                        let item = {venderid:match[2] % 1000000000,url:match[1],beans:0,status:0};
                        chrome.storage.local.set({[item.venderid]: item}, function() {
                            if( chrome.runtime.lastError ){
                                console.warn(chrome.runtime.lastError);
                                reject(chrome.runtime.lastError);
                            }else{
                                console.log(item);
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
        $(this).removeAttr("disabled");
	});
    

    $("#process_follow").click(function(){
        $(this).attr("disabled","disabled");
        chrome.runtime.sendMessage({"to":"background","from":"popup","work":"catch_all_beans"}, function(response) {
            console.log('收到来自后台的回复：' + response);
        });
    });
    $("#clear_follow").click(function(){                
        chrome.storage.local.clear(function(){
            console.warn("all datas are cleared");
            $(this).removeAttr("disabled");
        });
    });
});
