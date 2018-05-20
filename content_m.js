// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// 'use strict';






var actualCode =  '(' + function() {
    'use strict';
    var navigator = window.navigator;
    var modifiedNavigator;
    if ('userAgent' in Navigator.prototype) {
        // Chrome 43+ moved all properties from navigator to the prototype,
        // so we have to modify the prototype instead of navigator.
        modifiedNavigator = Navigator.prototype;

    } else {
        // Chrome 42- defined the property on navigator.
        modifiedNavigator = Object.create(navigator);
        Object.defineProperty(window, 'navigator', {
            value: modifiedNavigator,
            configurable: false,
            enumerable: false,
            writable: false
        });
    }
    // Pretend to be IOS
    Object.defineProperties(modifiedNavigator, {
        userAgent: {
            value: navigator.userAgent.replace(/\([^)]+\)/, 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60/application=JDJR-App&deviceId=249205E2-74D3-4D3B-A3B3-B6F7F0EFC5CE&clientType=ios&iosType=iphone&clientVersion=4.9.2&HiClVersion=4.9.2&isUpdate=0&osVersion=10.3.3&osName=iOS&platform=iPhone 6 (A1549/A1586)&screen=667*375&src=App Store&ip=192.168.100.55&mac=02:00:00:00:00:00&netWork=1&sPoint=MTUwMDMjI3Nob3V5ZTUwMDE%3D&jdPay=(*#@jdPaySDK*#@jdPayChannel=jdfinance&jdPayChannelVersion=4.9.2&jdPaySdkVersion=2.18.0.0&jdPayClientName=iOS*#@jdPaySDK*#@)'),
            configurable: false,
            enumerable: true,
            writable: false
        },
        appVersion: {
            value: navigator.appVersion.replace(/\([^)]+\)/, 'iPhone 6'),
            configurable: false,
            enumerable: true,
            writable: false
        },
        platform: {
            value: 'iPhone',
            configurable: false,
            enumerable: true,
            writable: false
        },
    });
} + ')();';


if( window.location.href.match(/^https:\/\/m.jr.jd.com/)){
  var s = document.createElement('script');
  s.textContent = actualCode;
  document.documentElement.appendChild(s);
  s.remove();
}

