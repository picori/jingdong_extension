var start_time = (new Date).getTime(),
    _jdfp_canvas_md5 = "",
    _jdfp_webgl_md5 = "",
    _JdEid = "",
    _eidFlag = !1,
    risk_jd_local_fingerprint = "";
(function(m, h, r) {
    "undefined" !== typeof module && module.exports ? module.exports = r() : h[m] = r()
})("JdJrTdRiskFinger", this, function() {
    function m(a) {
        if (null == a || void 0 == a || "" == a) return "NA";
        var b;
        if (null == a || void 0 == a || "" == a) b = "";
        else {
            b = [];
            for (var c = 0; c < 8 * a.length; c += 8) b[c >> 5] |= (a.charCodeAt(c / 8) & 255) << c % 32
        }
        a = 8 * a.length;
        b[a >> 5] |= 128 << a % 32;
        b[(a + 64 >>> 9 << 4) + 14] = a;
        a = 1732584193;
        for (var c = -271733879, l = -1732584194, g = 271733878, e = 0; e < b.length; e += 16) {
            var f = a,
                k = c,
                n = l,
                t = g;
            a = r(a, c, l, g, b[e + 0], 7, -680876936);
            g = r(g, a, c, l, b[e + 1], 12, -389564586);
            l = r(l, g, a, c, b[e + 2], 17, 606105819);
            c = r(c, l, g, a, b[e + 3], 22, -1044525330);
            a = r(a, c, l, g, b[e + 4], 7, -176418897);
            g = r(g, a, c, l, b[e + 5], 12, 1200080426);
            l = r(l, g, a, c, b[e + 6], 17, -1473231341);
            c = r(c, l, g, a, b[e + 7], 22, -45705983);
            a = r(a, c, l, g, b[e + 8], 7, 1770035416);
            g = r(g, a, c, l, b[e + 9], 12, -1958414417);
            l = r(l, g, a, c, b[e + 10], 17, -42063);
            c = r(c, l, g, a, b[e + 11], 22, -1990404162);
            a = r(a, c, l, g, b[e + 12], 7, 1804603682);
            g = r(g, a, c, l, b[e + 13], 12, -40341101);
            l = r(l, g, a, c, b[e + 14], 17, -1502002290);
            c = r(c, l, g, a, b[e + 15], 22, 1236535329);
            a = u(a, c, l, g, b[e + 1], 5, -165796510);
            g = u(g, a, c, l, b[e + 6], 9, -1069501632);
            l = u(l, g, a, c, b[e + 11], 14, 643717713);
            c = u(c, l, g, a, b[e + 0], 20, -373897302);
            a = u(a, c, l, g, b[e + 5], 5, -701558691);
            g = u(g, a, c, l, b[e + 10], 9, 38016083);
            l = u(l, g, a, c, b[e + 15], 14, -660478335);
            c = u(c, l, g, a, b[e + 4], 20, -405537848);
            a = u(a, c, l, g, b[e + 9], 5, 568446438);
            g = u(g, a, c, l, b[e + 14], 9, -1019803690);
            l = u(l, g, a, c, b[e + 3], 14, -187363961);
            c = u(c, l, g, a, b[e + 8], 20, 1163531501);
            a = u(a, c, l, g, b[e + 13], 5, -1444681467);
            g = u(g, a, c, l, b[e + 2], 9, -51403784);
            l = u(l, g, a, c, b[e + 7], 14, 1735328473);
            c = u(c, l, g, a, b[e + 12], 20, -1926607734);
            a = h(c ^ l ^ g, a, c, b[e + 5], 4, -378558);
            g = h(a ^ c ^ l, g, a, b[e + 8], 11, -2022574463);
            l = h(g ^ a ^ c, l, g, b[e + 11], 16, 1839030562);
            c = h(l ^ g ^ a, c, l, b[e + 14], 23, -35309556);
            a = h(c ^ l ^ g, a, c, b[e + 1], 4, -1530992060);
            g = h(a ^ c ^ l, g, a, b[e + 4], 11, 1272893353);
            l = h(g ^ a ^ c, l, g, b[e + 7], 16, -155497632);
            c = h(l ^ g ^ a, c, l, b[e + 10], 23, -1094730640);
            a = h(c ^ l ^ g, a, c, b[e + 13], 4, 681279174);
            g = h(a ^ c ^ l, g, a, b[e + 0], 11, -358537222);
            l = h(g ^ a ^ c, l, g, b[e + 3], 16, -722521979);
            c = h(l ^ g ^ a, c, l, b[e + 6], 23, 76029189);
            a = h(c ^ l ^ g, a, c, b[e + 9], 4, -640364487);
            g = h(a ^ c ^ l, g, a, b[e + 12], 11, -421815835);
            l = h(g ^ a ^ c, l, g, b[e + 15], 16, 530742520);
            c = h(l ^ g ^ a, c, l, b[e + 2], 23, -995338651);
            a = q(a, c, l, g, b[e + 0], 6, -198630844);
            g = q(g, a, c, l, b[e + 7], 10, 1126891415);
            l = q(l, g, a, c, b[e + 14], 15, -1416354905);
            c = q(c, l, g, a, b[e + 5], 21, -57434055);
            a = q(a, c, l, g, b[e + 12], 6, 1700485571);
            g = q(g, a, c, l, b[e + 3], 10, -1894986606);
            l = q(l, g, a, c, b[e + 10], 15, -1051523);
            c = q(c, l, g, a, b[e + 1], 21, -2054922799);
            a = q(a, c, l, g, b[e + 8], 6, 1873313359);
            g = q(g, a, c, l, b[e + 15], 10, -30611744);
            l = q(l, g, a, c, b[e + 6], 15, -1560198380);
            c = q(c, l, g, a, b[e + 13], 21, 1309151649);
            a = q(a, c, l, g, b[e + 4], 6, -145523070);
            g = q(g, a, c, l, b[e + 11], 10, -1120210379);
            l = q(l, g, a, c, b[e + 2], 15, 718787259);
            c = q(c, l, g, a, b[e + 9], 21, -343485551);
            a = y(a, f);
            c = y(c, k);
            l = y(l, n);
            g = y(g, t)
        }
        b = [a, c, l, g];
        a = "";
        for (c = 0; c < 4 * b.length; c++) a += "0123456789abcdef".charAt(b[c >> 2] >> c % 4 * 8 + 4 & 15) + "0123456789abcdef".charAt(b[c >> 2] >> c % 4 * 8 & 15);
        return a
    }

    function h(a, b, c, e, g, f) {
        a = y(y(b, a), y(e, f));
        return y(a << g | a >>> 32 - g, c)
    }

    function r(a, b, c, e, g, f, k) {
        return h(b & c | ~b & e, a, b, g, f, k)
    }

    function u(a, b, c, e, g, f, k) {
        return h(b & e | c & ~e, a, b, g, f, k)
    }

    function q(a, b, c, e, g, f, k) {
        return h(c ^ (b | ~e), a, b, g, f, k)
    }

    function y(a, b) {
        var c = (a & 65535) + (b & 65535);
        return (a >> 16) + (b >> 16) + (c >> 16) << 16 | c & 65535
    }
    var k = "",
        n = navigator.userAgent.toLowerCase();
    n.indexOf("jdapp") && (n = n.substring(0, 90));
    var t = navigator.language,
        f = n; - 1 != f.indexOf("ipad") || -1 != f.indexOf("iphone os") || -1 != f.indexOf("midp") || -1 != f.indexOf("rv:1.2.3.4") || -1 != f.indexOf("ucweb") || -1 != f.indexOf("android") || -1 != f.indexOf("windows ce") || f.indexOf("windows mobile");
    var e = "NA",
        v = "NA";
    try {
        -1 != f.indexOf("win") && -1 != f.indexOf("95") && (e = "windows", v = "95"), -1 != f.indexOf("win") && -1 != f.indexOf("98") && (e = "windows", v = "98"), -1 != f.indexOf("win 9x") && -1 != f.indexOf("4.90") && (e = "windows", v = "me"), -1 != f.indexOf("win") && -1 != f.indexOf("nt 5.0") && (e = "windows", v = "2000"), -1 != f.indexOf("win") && -1 != f.indexOf("nt") && (e = "windows", v = "NT"), -1 != f.indexOf("win") && -1 != f.indexOf("nt 5.1") && (e = "windows", v = "xp"), -1 != f.indexOf("win") && -1 != f.indexOf("32") && (e = "windows", v = "32"), -1 != f.indexOf("win") && -1 != f.indexOf("nt 5.1") && (e = "windows", v = "7"), -1 != f.indexOf("win") && -1 != f.indexOf("6.0") && (e = "windows", v = "8"), -1 == f.indexOf("win") || -1 == f.indexOf("nt 6.0") && -1 == f.indexOf("nt 6.1") || (e = "windows", v = "9"), -1 != f.indexOf("win") && -1 != f.indexOf("nt 6.2") && (e = "windows", v = "10"), -1 != f.indexOf("linux") && (e = "linux"), -1 != f.indexOf("unix") && (e = "unix"), -1 != f.indexOf("sun") && -1 != f.indexOf("os") && (e = "sun os"), -1 != f.indexOf("ibm") && -1 != f.indexOf("os") && (e = "ibm os/2"), -1 != f.indexOf("mac") && -1 != f.indexOf("pc") && (e = "mac"), -1 != f.indexOf("aix") && (e = "aix"), -1 != f.indexOf("powerpc") && (e = "powerPC"), -1 != f.indexOf("hpux") && (e = "hpux"), -1 != f.indexOf("netbsd") && (e = "NetBSD"), -1 != f.indexOf("bsd") && (e = "BSD"), -1 != f.indexOf("osf1") && (e = "OSF1"), -1 != f.indexOf("irix") && (e = "IRIX", v = ""), -1 != f.indexOf("freebsd") && (e = "FreeBSD"), -1 != f.indexOf("symbianos") && (e = "SymbianOS", v = f.substring(f.indexOf("SymbianOS/") + 10, 3))
    } catch (a) {}
    var x = "NA",
        w = "NA";
    try {
        -1 != f.indexOf("msie") && (x = "ie", w = f.substring(f.indexOf("msie ") + 5), w.indexOf(";") && (w = w.substring(0, w.indexOf(";")))); - 1 != f.indexOf("firefox") && (x = "Firefox", w = f.substring(f.indexOf("firefox/") + 8)); - 1 != f.indexOf("opera") && (x = "Opera", w = f.substring(f.indexOf("opera/") + 6, 4)); - 1 != f.indexOf("safari") && (x = "safari", w = f.substring(f.indexOf("safari/") + 7)); - 1 != f.indexOf("chrome") && (x = "chrome", w = f.substring(f.indexOf("chrome/") + 7), w.indexOf(" ") && (w = w.substring(0, w.indexOf(" ")))); - 1 != f.indexOf("navigator") && (x = "navigator", w = f.substring(f.indexOf("navigator/") + 10)); - 1 != f.indexOf("applewebkit") && (x = "applewebkit_chrome", w = f.substring(f.indexOf("applewebkit/") + 12), w.indexOf(" ") && (w = w.substring(0, w.indexOf(" ")))); - 1 != f.indexOf("sogoumobilebrowser") && (x = "\u641c\u72d7\u624b\u673a\u6d4f\u89c8\u5668");
        if (-1 != f.indexOf("ucbrowser") || -1 != f.indexOf("ucweb")) x = "UC\u6d4f\u89c8\u5668";
        if (-1 != f.indexOf("qqbrowser") || -1 != f.indexOf("tencenttraveler")) x = "QQ\u6d4f\u89c8\u5668"; - 1 != f.indexOf("metasr") && (x = "\u641c\u72d7\u6d4f\u89c8\u5668"); - 1 != f.indexOf("360se") && (x = "360\u6d4f\u89c8\u5668"); - 1 != f.indexOf("the world") && (x = "\u4e16\u754c\u4e4b\u7a97\u6d4f\u89c8\u5668"); - 1 != f.indexOf("maxthon") && (x = "\u9068\u6e38\u6d4f\u89c8\u5668")
    } catch (a) {}
    f = function(a) {
        this.options = this.extend(a, {});
        this.nativeForEach = Array.prototype.forEach;
        this.nativeMap = Array.prototype.map
    };
    f.prototype = {
        extend: function(a, b) {
            if (null == a) return b;
            for (var c in a) null != a[c] && b[c] !== a[c] && (b[c] = a[c]);
            return b
        },
        getData: function() {
            return k
        },
        get: function(a) {
            var b = 1 * w,
                c = [];
            "ie" == x && 7 <= b ? (c.push(n), c.push(t), k = k + ",'userAgent':'" + m(n) + "','language':'" + t + "'", this.browserRedirect(n)) : (c = this.userAgentKey(c), c = this.languageKey(c));
            c.push(x);
            c.push(w);
            c.push(e);
            c.push(v);
            k = k + ",'os':'" + e + "','osVersion':'" + v + "','browser':'" + x + "','browserVersion':'" + w + "'";
            c = this.colorDepthKey(c);
            c = this.screenResolutionKey(c);
            c = this.timezoneOffsetKey(c);
            c = this.sessionStorageKey(c);
            c = this.localStorageKey(c);
            c = this.indexedDbKey(c);
            c = this.addBehaviorKey(c);
            c = this.openDatabaseKey(c);
            c = this.cpuClassKey(c);
            c = this.platformKey(c);
            c = this.hardwareConcurrencyKey(c);
            c = this.doNotTrackKey(c);
            c = this.pluginsKey(c);
            c = this.canvasKey(c);
            c = this.webglKey(c);
            b = this.x64hash128(c.join("~~~"), 31);
            return a(b)
        },
        userAgentKey: function(a) {
            this.options.excludeUserAgent || (a.push(navigator.userAgent), k = k + ",'userAgent':'" + m(navigator.userAgent) + "'", this.browserRedirect(navigator.userAgent));
            return a
        },
        replaceAll: function(a, b, c) {
            for (; 0 <= a.indexOf(b);) a = a.replace(b, c);
            return a
        },
        browserRedirect: function(a) {
            var b = a.toLowerCase();
            a = "ipad" == b.match(/ipad/i);
            var c = "iphone os" == b.match(/iphone os/i),
                e = "midp" == b.match(/midp/i),
                g = "rv:1.2.3.4" == b.match(/rv:1.2.3.4/i),
                f = "ucweb" == b.match(/ucweb/i),
                n = "android" == b.match(/android/i),
                t = "windows ce" == b.match(/windows ce/i),
                b = "windows mobile" == b.match(/windows mobile/i);
            k = a || c || e || g || f || n || t || b ? k + ",'origin':'mobile'" : k + ",'origin':'pc'"
        },
        languageKey: function(a) {
            this.options.excludeLanguage || (a.push(navigator.language), k = k + ",'language':'" + this.replaceAll(navigator.language, " ", "_") + "'");
            return a
        },
        colorDepthKey: function(a) {
            this.options.excludeColorDepth || (a.push(screen.colorDepth), k = k + ",'colorDepth':'" + screen.colorDepth + "'");
            return a
        },
        screenResolutionKey: function(a) {
            if (!this.options.excludeScreenResolution) {
                var b = this.getScreenResolution();
                "undefined" !== typeof b && (a.push(b.join("x")), k = k + ",'screenResolution':'" + b.join("x") + "'")
            }
            return a
        },
        getScreenResolution: function() {
            return this.options.detectScreenOrientation ? screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height] : [screen.height, screen.width]
        },
        timezoneOffsetKey: function(a) {
            this.options.excludeTimezoneOffset || (a.push((new Date).getTimezoneOffset()), k = k + ",'timezoneOffset':'" + (new Date).getTimezoneOffset() / 60 + "'");
            return a
        },
        sessionStorageKey: function(a) {
            !this.options.excludeSessionStorage && this.hasSessionStorage() && (a.push("sessionStorageKey"), k += ",'sessionStorage':true");
            return a
        },
        localStorageKey: function(a) {
            !this.options.excludeSessionStorage && this.hasLocalStorage() && (a.push("localStorageKey"), k += ",'localStorage':true");
            return a
        },
        indexedDbKey: function(a) {
            !this.options.excludeIndexedDB && this.hasIndexedDB() && (a.push("indexedDbKey"), k += ",'indexedDb':true");
            return a
        },
        addBehaviorKey: function(a) {
            document.body && !this.options.excludeAddBehavior && document.body.addBehavior ? (a.push("addBehaviorKey"), k += ",'addBehavior':true") : k += ",'addBehavior':false";
            return a
        },
        openDatabaseKey: function(a) {
            !this.options.excludeOpenDatabase && window.openDatabase ? (a.push("openDatabase"), k += ",'openDatabase':true") : k += ",'openDatabase':false";
            return a
        },
        cpuClassKey: function(a) {
            this.options.excludeCpuClass || (a.push(this.getNavigatorCpuClass()), k = k + ",'cpu':'" + this.getNavigatorCpuClass() + "'");
            return a
        },
        platformKey: function(a) {
            this.options.excludePlatform || (a.push(this.getNavigatorPlatform()), k = k + ",'platform':'" + this.getNavigatorPlatform() + "'");
            return a
        },
        hardwareConcurrencyKey: function(a) {
            var b = this.getHardwareConcurrency();
            a.push(b);
            k = k + ",'ccn':'" + b + "'";
            return a
        },
        doNotTrackKey: function(a) {
            this.options.excludeDoNotTrack || (a.push(this.getDoNotTrack()), k = k + ",'track':'" + this.getDoNotTrack() + "'");
            return a
        },
        canvasKey: function(a) {
            if (!this.options.excludeCanvas && this.isCanvasSupported()) {
                var b = this.getCanvasFp();
                a.push(b);
                _jdfp_canvas_md5 = m(b);
                k = k + ",'canvas':'" + _jdfp_canvas_md5 + "'"
            }
            return a
        },
        webglKey: function(a) {
            if (!this.options.excludeWebGL && this.isCanvasSupported()) {
                var b = this.getWebglFp();
                _jdfp_webgl_md5 = m(b);
                a.push(b);
                k = k + ",'webglFp':'" + _jdfp_webgl_md5 + "'"
            }
            return a
        },
        pluginsKey: function(a) {
            this.isIE() ? (a.push(this.getIEPluginsString()), k = k + ",'plugins':'" + m(this.getIEPluginsString()) + "'") : (a.push(this.getRegularPluginsString()), k = k + ",'plugins':'" + m(this.getRegularPluginsString()) + "'");
            return a
        },
        getRegularPluginsString: function() {
            return this.map(navigator.plugins, function(a) {
                var b = this.map(a, function(a) {
                    return [a.type, a.suffixes].join("~")
                }).join(",");
                return [a.name, a.description, b].join("::")
            }, this).join(";")
        },
        getIEPluginsString: function() {
            return window.ActiveXObject ? this.map("AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);Scripting.Dictionary;SWCtl.SWCtl;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;Skype.Detection;TDCCtl.TDCCtl;WMPlayer.OCX;rmocx.RealPlayer G2 Control;rmocx.RealPlayer G2 Control.1".split(";"), function(a) {
                try {
                    return new ActiveXObject(a), a
                } catch (b) {
                    return null
                }
            }).join(";") : ""
        },
        hasSessionStorage: function() {
            try {
                return !!window.sessionStorage
            } catch (a) {
                return !0
            }
        },
        hasLocalStorage: function() {
            try {
                return !!window.localStorage
            } catch (a) {
                return !0
            }
        },
        hasIndexedDB: function() {
            return !!window.indexedDB
        },
        getNavigatorCpuClass: function() {
            return navigator.cpuClass ? navigator.cpuClass : "NA"
        },
        getNavigatorPlatform: function() {
            return navigator.platform ? navigator.platform : "NA"
        },
        getHardwareConcurrency: function() {
            return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "NA"
        },
        getDoNotTrack: function() {
            return navigator.doNotTrack ? navigator.doNotTrack : "NA"
        },
        getCanvasFp: function() {
            var a = navigator.userAgent.toLowerCase();
            if ((0 < a.indexOf("jdjr-app") || 0 <= a.indexOf("jdapp")) && (0 < a.indexOf("iphone") || 0 < a.indexOf("ipad"))) return null;
            var a = document.createElement("canvas"),
                b = a.getContext("2d");
            b.fillStyle = "red";
            b.fillRect(30, 10, 200, 100);
            b.strokeStyle = "#1a3bc1";
            b.lineWidth = 6;
            b.lineCap = "round";
            b.arc(50, 50, 20, 0, Math.PI, !1);
            b.stroke();
            b.fillStyle = "#42e1a2";
            b.font = "15.4px 'Arial'";
            b.textBaseline = "alphabetic";
            b.fillText("PR flacks quiz gym: TV DJ box when? \u2620", 15, 60);
            b.shadowOffsetX = 1;
            b.shadowOffsetY = 2;
            b.shadowColor = "white";
            b.fillStyle = "rgba(0, 0, 200, 0.5)";
            b.font = "60px 'Not a real font'";
            b.fillText("No\u9a97", 40, 80);
            return a.toDataURL()
        },
        getWebglFp: function() {
            var a = navigator.userAgent,
                a = a.toLowerCase();
            if ((0 < a.indexOf("jdjr-app") || 0 <= a.indexOf("jdapp")) && (0 < a.indexOf("iphone") || 0 < a.indexOf("ipad"))) return null;
            var b, a = function(a) {
                b.clearColor(0, 0, 0, 1);
                b.enable(b.DEPTH_TEST);
                b.depthFunc(b.LEQUAL);
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                return "[" + a[0] + ", " + a[1] + "]"
            };
            b = this.getWebglCanvas();
            if (!b) return null;
            var c = [],
                e = b.createBuffer();
            b.bindBuffer(b.ARRAY_BUFFER, e);
            var g = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
            b.bufferData(b.ARRAY_BUFFER, g, b.STATIC_DRAW);
            e.itemSize = 3;
            e.numItems = 3;
            var g = b.createProgram(),
                f = b.createShader(b.VERTEX_SHADER);
            b.shaderSource(f, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}");
            b.compileShader(f);
            var k = b.createShader(b.FRAGMENT_SHADER);
            b.shaderSource(k, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}");
            b.compileShader(k);
            b.attachShader(g, f);
            b.attachShader(g, k);
            b.linkProgram(g);
            b.useProgram(g);
            g.vertexPosAttrib = b.getAttribLocation(g, "attrVertex");
            g.offsetUniform = b.getUniformLocation(g, "uniformOffset");
            b.enableVertexAttribArray(g.vertexPosArray);
            b.vertexAttribPointer(g.vertexPosAttrib, e.itemSize, b.FLOAT, !1, 0, 0);
            b.uniform2f(g.offsetUniform, 1, 1);
            b.drawArrays(b.TRIANGLE_STRIP, 0, e.numItems);
            null != b.canvas && c.push(b.canvas.toDataURL());
            c.push("extensions:" + b.getSupportedExtensions().join(";"));
            c.push("extensions:" + b.getSupportedExtensions().join(";"));
            c.push("w1" + a(b.getParameter(b.ALIASED_LINE_WIDTH_RANGE)));
            c.push("w2" + a(b.getParameter(b.ALIASED_POINT_SIZE_RANGE)));
            c.push("w3" + b.getParameter(b.ALPHA_BITS));
            c.push("w4" + (b.getContextAttributes().antialias ? "yes" : "no"));
            c.push("w5" + b.getParameter(b.BLUE_BITS));
            c.push("w6" + b.getParameter(b.DEPTH_BITS));
            c.push("w7" + b.getParameter(b.GREEN_BITS));
            c.push("w8" + function(a) {
                var b, c = a.getExtension("EXT_texture_filter_anisotropic") || a.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || a.getExtension("MOZ_EXT_texture_filter_anisotropic");
                return c ? (b = a.getParameter(c.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === b && (b = 2), b) : null
            }(b));
            c.push("w9" + b.getParameter(b.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
            c.push("w10" + b.getParameter(b.MAX_CUBE_MAP_TEXTURE_SIZE));
            c.push("w11" + b.getParameter(b.MAX_FRAGMENT_UNIFORM_VECTORS));
            c.push("w12" + b.getParameter(b.MAX_RENDERBUFFER_SIZE));
            c.push("w13" + b.getParameter(b.MAX_TEXTURE_IMAGE_UNITS));
            c.push("w14" + b.getParameter(b.MAX_TEXTURE_SIZE));
            c.push("w15" + b.getParameter(b.MAX_VARYING_VECTORS));
            c.push("w16" + b.getParameter(b.MAX_VERTEX_ATTRIBS));
            c.push("w17" + b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
            c.push("w18" + b.getParameter(b.MAX_VERTEX_UNIFORM_VECTORS));
            c.push("w19" + a(b.getParameter(b.MAX_VIEWPORT_DIMS)));
            c.push("w20" + b.getParameter(b.RED_BITS));
            c.push("w21" + b.getParameter(b.RENDERER));
            c.push("w22" + b.getParameter(b.SHADING_LANGUAGE_VERSION));
            c.push("w23" + b.getParameter(b.STENCIL_BITS));
            c.push("w24" + b.getParameter(b.VENDOR));
            c.push("w25" + b.getParameter(b.VERSION));
            try {
                var n = b.getExtension("WEBGL_debug_renderer_info");
                n && (c.push("wuv:" + b.getParameter(n.UNMASKED_VENDOR_WEBGL)), c.push("wur:" + b.getParameter(n.UNMASKED_RENDERER_WEBGL)))
            } catch (C) {}
            return c.join("\u00a7")
        },
        isCanvasSupported: function() {
            var a = document.createElement("canvas");
            return !(!a.getContext || !a.getContext("2d"))
        },
        isIE: function() {
            return "Microsoft Internet Explorer" === navigator.appName || "Netscape" === navigator.appName && /Trident/.test(navigator.userAgent) ? !0 : !1
        },
        getWebglCanvas: function() {
            var a = document.createElement("canvas"),
                b = null;
            try {
                var c = navigator.userAgent,
                    c = c.toLowerCase();
                (0 < c.indexOf("jdjr-app") || 0 <= c.indexOf("jdapp")) && (0 < c.indexOf("iphone") || 0 < c.indexOf("ipad")) || (b = a.getContext("webgl") || a.getContext("experimental-webgl"))
            } catch (l) {}
            b || (b = null);
            return b
        },
        each: function(a, b, c) {
            if (null !== a)
                if (this.nativeForEach && a.forEach === this.nativeForEach) a.forEach(b, c);
                else if (a.length === +a.length)
                for (var e = 0, g = a.length; e < g && b.call(c, a[e], e, a) !== {}; e++);
            else
                for (e in a)
                    if (a.hasOwnProperty(e) && b.call(c, a[e], e, a) === {}) break
        },
        map: function(a, b, c) {
            var e = [];
            if (null == a) return e;
            if (this.nativeMap && a.map === this.nativeMap) return a.map(b, c);
            this.each(a, function(a, f, l) {
                e[e.length] = b.call(c, a, f, l)
            });
            return e
        },
        x64Add: function(a, b) {
            a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
            b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
            var c = [0, 0, 0, 0];
            c[3] += a[3] + b[3];
            c[2] += c[3] >>> 16;
            c[3] &= 65535;
            c[2] += a[2] + b[2];
            c[1] += c[2] >>> 16;
            c[2] &= 65535;
            c[1] += a[1] + b[1];
            c[0] += c[1] >>> 16;
            c[1] &= 65535;
            c[0] += a[0] + b[0];
            c[0] &= 65535;
            return [c[0] << 16 | c[1], c[2] << 16 | c[3]]
        },
        x64Multiply: function(a, b) {
            a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
            b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
            var c = [0, 0, 0, 0];
            c[3] += a[3] * b[3];
            c[2] += c[3] >>> 16;
            c[3] &= 65535;
            c[2] += a[2] * b[3];
            c[1] += c[2] >>> 16;
            c[2] &= 65535;
            c[2] += a[3] * b[2];
            c[1] += c[2] >>> 16;
            c[2] &= 65535;
            c[1] += a[1] * b[3];
            c[0] += c[1] >>> 16;
            c[1] &= 65535;
            c[1] += a[2] * b[2];
            c[0] += c[1] >>> 16;
            c[1] &= 65535;
            c[1] += a[3] * b[1];
            c[0] += c[1] >>> 16;
            c[1] &= 65535;
            c[0] += a[0] * b[3] + a[1] * b[2] + a[2] * b[1] + a[3] * b[0];
            c[0] &= 65535;
            return [c[0] << 16 | c[1], c[2] << 16 | c[3]]
        },
        x64Rotl: function(a, b) {
            b %= 64;
            if (32 === b) return [a[1], a[0]];
            if (32 > b) return [a[0] << b | a[1] >>> 32 - b, a[1] << b | a[0] >>> 32 - b];
            b -= 32;
            return [a[1] << b | a[0] >>> 32 - b, a[0] << b | a[1] >>> 32 - b]
        },
        x64LeftShift: function(a, b) {
            b %= 64;
            return 0 === b ? a : 32 > b ? [a[0] << b | a[1] >>> 32 - b, a[1] << b] : [a[1] << b - 32, 0]
        },
        x64Xor: function(a, b) {
            return [a[0] ^ b[0], a[1] ^ b[1]]
        },
        x64Fmix: function(a) {
            a = this.x64Xor(a, [0, a[0] >>> 1]);
            a = this.x64Multiply(a, [4283543511, 3981806797]);
            a = this.x64Xor(a, [0, a[0] >>> 1]);
            a = this.x64Multiply(a, [3301882366, 444984403]);
            return a = this.x64Xor(a, [0, a[0] >>> 1])
        },
        x64hash128: function(a, b) {
            a = a || "";
            b = b || 0;
            var c = a.length % 16,
                e = a.length - c,
                g = [0, b];
            b = [0, b];
            for (var f, k, n = [2277735313, 289559509], t = [1291169091, 658871167], h = 0; h < e; h += 16) f = [a.charCodeAt(h + 4) & 255 | (a.charCodeAt(h + 5) & 255) << 8 | (a.charCodeAt(h + 6) & 255) << 16 | (a.charCodeAt(h + 7) & 255) << 24, a.charCodeAt(h) & 255 | (a.charCodeAt(h + 1) & 255) << 8 | (a.charCodeAt(h + 2) & 255) << 16 | (a.charCodeAt(h + 3) & 255) << 24], k = [a.charCodeAt(h + 12) & 255 | (a.charCodeAt(h + 13) & 255) << 8 | (a.charCodeAt(h + 14) & 255) << 16 | (a.charCodeAt(h + 15) & 255) << 24, a.charCodeAt(h + 8) & 255 | (a.charCodeAt(h + 9) & 255) << 8 | (a.charCodeAt(h + 10) & 255) << 16 | (a.charCodeAt(h + 11) & 255) << 24], f = this.x64Multiply(f, n), f = this.x64Rotl(f, 31), f = this.x64Multiply(f, t), g = this.x64Xor(g, f), g = this.x64Rotl(g, 27), g = this.x64Add(g, b), g = this.x64Add(this.x64Multiply(g, [0, 5]), [0, 1390208809]), k = this.x64Multiply(k, t), k = this.x64Rotl(k, 33), k = this.x64Multiply(k, n), b = this.x64Xor(b, k), b = this.x64Rotl(b, 31), b = this.x64Add(b, g), b = this.x64Add(this.x64Multiply(b, [0, 5]), [0, 944331445]);
            f = [0, 0];
            k = [0, 0];
            switch (c) {
                case 15:
                    k = this.x64Xor(k, this.x64LeftShift([0, a.charCodeAt(h + 14)], 48));
                case 14:
                    k = this.x64Xor(k, this.x64LeftShift([0, a.charCodeAt(h + 13)], 40));
                case 13:
                    k = this.x64Xor(k, this.x64LeftShift([0, a.charCodeAt(h + 12)], 32));
                case 12:
                    k = this.x64Xor(k, this.x64LeftShift([0, a.charCodeAt(h + 11)], 24));
                case 11:
                    k = this.x64Xor(k, this.x64LeftShift([0, a.charCodeAt(h + 10)], 16));
                case 10:
                    k = this.x64Xor(k, this.x64LeftShift([0, a.charCodeAt(h + 9)], 8));
                case 9:
                    k = this.x64Xor(k, [0, a.charCodeAt(h + 8)]), k = this.x64Multiply(k, t), k = this.x64Rotl(k, 33), k = this.x64Multiply(k, n), b = this.x64Xor(b, k);
                case 8:
                    f = this.x64Xor(f, this.x64LeftShift([0, a.charCodeAt(h + 7)], 56));
                case 7:
                    f = this.x64Xor(f, this.x64LeftShift([0, a.charCodeAt(h + 6)], 48));
                case 6:
                    f = this.x64Xor(f, this.x64LeftShift([0, a.charCodeAt(h + 5)], 40));
                case 5:
                    f = this.x64Xor(f, this.x64LeftShift([0, a.charCodeAt(h + 4)], 32));
                case 4:
                    f = this.x64Xor(f, this.x64LeftShift([0, a.charCodeAt(h + 3)], 24));
                case 3:
                    f = this.x64Xor(f, this.x64LeftShift([0, a.charCodeAt(h + 2)], 16));
                case 2:
                    f = this.x64Xor(f, this.x64LeftShift([0, a.charCodeAt(h + 1)], 8));
                case 1:
                    f = this.x64Xor(f, [0, a.charCodeAt(h)]), f = this.x64Multiply(f, n), f = this.x64Rotl(f, 31), f = this.x64Multiply(f, t), g = this.x64Xor(g, f)
            }
            g = this.x64Xor(g, [0, a.length]);
            b = this.x64Xor(b, [0, a.length]);
            g = this.x64Add(g, b);
            b = this.x64Add(b, g);
            g = this.x64Fmix(g);
            b = this.x64Fmix(b);
            g = this.x64Add(g, b);
            b = this.x64Add(b, g);
            return ("00000000" + (g[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (g[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (b[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (b[1] >>> 0).toString(16)).slice(-8)
        }
    };
    return f
});
var _CurrentPageProtocol = "https:" == document.location.protocol ? "https://" : "http://",
    _JdJrTdRiskDomainName = "gia.jd.com",
    _CurrentPageUrl = function() {
        var m = document.location.href.toString();
        0 < m.indexOf("?") && (m = m.substring(0, m.indexOf("?")));
        return m = m.substring(_CurrentPageProtocol.length)
    }(),
    td_collect = new function() {
        function m() {
            var k = window.webkitRTCPeerConnection || window.mozRTCPeerConnection || window.RTCPeerConnection;
            if (k) {
                var n = function(e) {
                        var k = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
                        try {
                            var h = k.exec(e)[1];
                            void 0 === f[h] && u.push(h);
                            f[h] = !0
                        } catch (w) {}
                    },
                    h, f = {};
                try {
                    h = new k({
                        iceServers: [{
                            url: "stun:stun.services.mozilla.com"
                        }]
                    })
                } catch (e) {}
                try {
                    void 0 === h && (h = new k({
                        iceServers: []
                    }))
                } catch (e) {}
                if (h || window.mozRTCPeerConnection) try {
                    h.createDataChannel("chat", {
                        reliable: !1
                    })
                } catch (e) {}
                h && (h.onicecandidate = function(e) {
                    e.candidate && n(e.candidate.candidate)
                }, h.createOffer(function(e) {
                    h.setLocalDescription(e, function() {}, function() {})
                }, function() {}), setTimeout(function() {
                    try {
                        h.localDescription.sdp.split("\n").forEach(function(e) {
                            0 === e.indexOf("a=candidate:") && n(e)
                        })
                    } catch (e) {}
                }, 800))
            }
        }

        function h() {
            function k(e) {
                var k = {};
                f.style.fontFamily = e;
                document.body.appendChild(f);
                k.height = f.offsetHeight;
                k.width = f.offsetWidth;
                document.body.removeChild(f);
                return k
            }
            var h = ["monospace", "sans-serif", "serif"],
                t = [],
                f = document.createElement("span");
            f.style.fontSize = "72px";
            f.style.visibility = "hidden";
            f.innerHTML = "mmmmmmmmmmlli";
            for (var e = 0; e < h.length; e++) t[e] = k(h[e]);
            this.checkSupportFont = function(e) {
                for (var f = 0; f < t.length; f++) {
                    var n = k(e + "," + h[f]),
                        a = t[f];
                    if (n.height !== a.height || n.width !== a.width) return !0
                }
                return !1
            }
        }

        function r(k) {
            var h = {};
            h.name = k.name;
            h.filename = k.filename.toLowerCase();
            h.description = k.description;
            void 0 !== k.version && (h.version = k.version);
            h.mimeTypes = [];
            for (var t = 0; t < k.length; t++) {
                var f = k[t],
                    e = {};
                e.description = f.description;
                e.suffixes = f.suffixes;
                e.type = f.type;
                h.mimeTypes.push(e)
            }
            return h
        }
        this.obtainLocal = function(k) {
            k = "undefined" !== typeof k && k ? !0 : !1;
            var h = {};
            try {
                var t = document.cookie.replace(/(?:(?:^|.*;\s*)3AB9D23F7A4B3C9B\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                0 !== t.length && (h.cookie = t)
            } catch (v) {}
            try {
                window.localStorage && null !== window.localStorage && 0 !== window.localStorage.length && (h.localStorage = window.localStorage.getItem("3AB9D23F7A4B3C9B"))
            } catch (v) {}
            try {
                window.sessionStorage && null !== window.sessionStorage && (h.sessionStorage = window.sessionStorage["3AB9D23F7A4B3C9B"])
            } catch (v) {}
            try {
                p.globalStorage && (h.globalStorage = window.globalStorage[".localdomain"]["3AB9D23F7A4B3C9B"])
            } catch (v) {}
            try {
                d && "function" == typeof d.load && "function" == typeof d.getAttribute && (d.load("jdgia_user_data"), h.userData = d.getAttribute("3AB9D23F7A4B3C9B"))
            } catch (v) {}
            try {
                E.indexedDbId && (h.indexedDb = E.indexedDbId)
            } catch (v) {}
            try {
                E.webDbId && (h.webDb = E.webDbId)
            } catch (v) {}
            try {
                for (var f in h)
                    if (32 < h[f].length) {
                        _JdEid = h[f];
                        k || (_eidFlag = !0);
                        break
                    }
            } catch (v) {}
            if ("undefined" === typeof _JdEid || 0 >= _JdEid.length) _JdEid = this.db("3AB9D23F7A4B3C9B");
            if ("undefined" === typeof _JdEid || 0 >= _JdEid.length) {
                var e;
                _JdEid = (e = document.cookie.match(/(^| )3AB9D23F7A4B3C9B=([^;]*)(;|$)/)) ? e[2] : ""
            }
            if ("undefined" === typeof _JdEid || 0 >= _JdEid.length) _eidFlag = !0;
            return _JdEid
        };
        var u = [],
            q = "Abadi MT Condensed Light;Adobe Fangsong Std;Adobe Hebrew;Adobe Ming Std;Agency FB;Arab;Arabic Typesetting;Arial Black;Batang;Bauhaus 93;Bell MT;Bitstream Vera Serif;Bodoni MT;Bookman Old Style;Braggadocio;Broadway;Calibri;Californian FB;Castellar;Casual;Centaur;Century Gothic;Chalkduster;Colonna MT;Copperplate Gothic Light;DejaVu LGC Sans Mono;Desdemona;DFKai-SB;Dotum;Engravers MT;Eras Bold ITC;Eurostile;FangSong;Forte;Franklin Gothic Heavy;French Script MT;Gabriola;Gigi;Gisha;Goudy Old Style;Gulim;GungSeo;Haettenschweiler;Harrington;Hiragino Sans GB;Impact;Informal Roman;KacstOne;Kino MT;Kozuka Gothic Pr6N;Lohit Gujarati;Loma;Lucida Bright;Lucida Fax;Magneto;Malgun Gothic;Matura MT Script Capitals;Menlo;MingLiU-ExtB;MoolBoran;MS PMincho;MS Reference Sans Serif;News Gothic MT;Niagara Solid;Nyala;Palace Script MT;Papyrus;Perpetua;Playbill;PMingLiU;Rachana;Rockwell;Sawasdee;Script MT Bold;Segoe Print;Showcard Gothic;SimHei;Snap ITC;TlwgMono;Tw Cen MT Condensed Extra Bold;Ubuntu;Umpush;Univers;Utopia;Vladimir Script;Wide Latin".split(";"),
            y = "4game;AdblockPlugin;AdobeExManCCDetect;AdobeExManDetect;Alawar NPAPI utils;Aliedit Plug-In;Alipay Security Control 3;AliSSOLogin plugin;AmazonMP3DownloaderPlugin;AOL Media Playback Plugin;AppUp;ArchiCAD;AVG SiteSafety plugin;Babylon ToolBar;Battlelog Game Launcher;BitCometAgent;Bitdefender QuickScan;BlueStacks Install Detector;CatalinaGroup Update;Citrix ICA Client;Citrix online plug-in;Citrix Receiver Plug-in;Coowon Update;DealPlyLive Update;Default Browser Helper;DivX Browser Plug-In;DivX Plus Web Player;DivX VOD Helper Plug-in;doubleTwist Web Plugin;Downloaders plugin;downloadUpdater;eMusicPlugin DLM6;ESN Launch Mozilla Plugin;ESN Sonar API;Exif Everywhere;Facebook Plugin;File Downloader Plug-in;FileLab plugin;FlyOrDie Games Plugin;Folx 3 Browser Plugin;FUZEShare;GDL Object Web Plug-in 16.00;GFACE Plugin;Ginger;Gnome Shell Integration;Google Earth Plugin;Google Earth Plug-in;Google Gears 0.5.33.0;Google Talk Effects Plugin;Google Update;Harmony Firefox Plugin;Harmony Plug-In;Heroes & Generals live;HPDetect;Html5 location provider;IE Tab plugin;iGetterScriptablePlugin;iMesh plugin;Kaspersky Password Manager;LastPass;LogMeIn Plugin 1.0.0.935;LogMeIn Plugin 1.0.0.961;Ma-Config.com plugin;Microsoft Office 2013;MinibarPlugin;Native Client;Nitro PDF Plug-In;Nokia Suite Enabler Plugin;Norton Identity Safe;npAPI Plugin;NPLastPass;NPPlayerShell;npTongbuAddin;NyxLauncher;Octoshape Streaming Services;Online Storage plug-in;Orbit Downloader;Pando Web Plugin;Parom.TV player plugin;PDF integrado do WebKit;PDF-XChange Viewer;PhotoCenterPlugin1.1.2.2;Picasa;PlayOn Plug-in;QQ2013 Firefox Plugin;QQDownload Plugin;QQMiniDL Plugin;QQMusic;RealDownloader Plugin;Roblox Launcher Plugin;RockMelt Update;Safer Update;SafeSearch;Scripting.Dictionary;SefClient Plugin;Shell.UIHelper;Silverlight Plug-In;Simple Pass;Skype Web Plugin;SumatraPDF Browser Plugin;Symantec PKI Client;Tencent FTN plug-in;Thunder DapCtrl NPAPI Plugin;TorchHelper;Unity Player;Uplay PC;VDownloader;Veetle TV Core;VLC Multimedia Plugin;Web Components;WebKit-integrierte PDF;WEBZEN Browser Extension;Wolfram Mathematica;WordCaptureX;WPI Detector 1.4;Yandex Media Plugin;Yandex PDF Viewer;YouTube Plug-in;zako".split(";");
        this.toJson = "object" === typeof JSON && JSON.stringify;
        this.init = function() {
            m();
            "function" !== typeof this.toJson && (this.toJson = function(k) {
                var h;
                h = typeof k;
                if ("undefined" === h || null === k) return "null";
                if ("number" === h || "boolean" === h) return k + "";
                if ("object" === h && k && k.constructor === Array) {
                    h = [];
                    for (var t = 0; k.length > t; t++) h.push(this.toJson(k[t]));
                    return "[" + (h + "") + "]"
                }
                if ("object" === h) {
                    h = [];
                    for (t in k) k.hasOwnProperty(t) && h.push('"' + t + '":' + this.toJson(k[t]));
                    return "{" + (h + "") + "}"
                }
            })
        };
        this.db = function(k, h) {
            try {
                if (window.openDatabase) {
                    var n = window.openDatabase("sqlite_jdtdstorage", "", "jdtdstorage", 1048576);
                    void 0 !== h ? n.transaction(function(f) {
                        f.executeSql("CREATE TABLE IF NOT EXISTS cache(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, value TEXT NOT NULL, UNIQUE (name))", [], function(e, f) {}, function(e, f) {});
                        f.executeSql("INSERT OR REPLACE INTO cache(name, value) VALUES(?, ?)", [k, h], function(e, f) {}, function(e, f) {})
                    }) : n.transaction(function(f) {
                        f.executeSql("SELECT value FROM cache WHERE name=?", [k], function(e, f) {
                            self._ec.dbData = 1 <= f.rows.length ? f.rows.item(0).value : ""
                        }, function(e, f) {})
                    })
                }
            } catch (f) {}
        };
        this.tdencrypt = function(k) {
            k = this.toJson(k);
            k = encodeURIComponent(k);
            var h = "",
                t, f, e, m, u, q, a = 0;
            do t = k.charCodeAt(a++), f = k.charCodeAt(a++), e = k.charCodeAt(a++), m = t >> 2, t = (t & 3) << 4 | f >> 4, u = (f & 15) << 2 | e >> 6, q = e & 63, isNaN(f) ? u = q = 64 : isNaN(e) && (q = 64), h = h + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(m) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(t) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(u) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(q); while (a < k.length);
            return h + "/"
        };
        this.collect = function() {
            var k = new Date;
            try {
                var n = document.createElement("div"),
                    m = {},
                    f = "ActiveBorder ActiveCaption AppWorkspace Background ButtonFace ButtonHighlight ButtonShadow ButtonText CaptionText GrayText Highlight HighlightText InactiveBorder InactiveCaption InactiveCaptionText InfoBackground InfoText Menu MenuText Scrollbar ThreeDDarkShadow ThreeDFace ThreeDHighlight ThreeDLightShadow ThreeDShadow Window WindowFrame WindowText".split(" ");
                if (window.getComputedStyle)
                    for (var e = 0; e < f.length; e++) document.body.appendChild(n), n.style.color = f[e], m[f[e]] = window.getComputedStyle(n).getPropertyValue("color"), document.body.removeChild(n)
            } catch (B) {}
            n = {
                ca: {},
                ts: {},
                m: {}
            };
            f = n.ca;
            f.tdHash = _jdfp_canvas_md5;
            var v = !1;
            if (e = window.WebGLRenderingContext) e = navigator.userAgent, e = e.toLowerCase(), e = (0 < e.indexOf("jdjr-app") || 0 <= e.indexOf("jdapp")) && (0 < e.indexOf("iphone") || 0 < e.indexOf("ipad")) ? !0 : !1, e = !e;
            if (e) {
                for (var x = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"], w = [], a, e = 0; e < x.length; e++) try {
                    var b = !1;
                    (b = document.createElement("canvas").getContext(x[e], {
                        stencil: !0
                    })) && b && (a = b, w.push(x[e]))
                } catch (B) {}
                w.length && (v = {
                    name: w,
                    gl: a
                })
            }
            if (v) {
                e = v.gl;
                f.contextName = v.name.join();
                f.webglversion = e.getParameter(e.VERSION);
                f.shadingLV = e.getParameter(e.SHADING_LANGUAGE_VERSION);
                f.vendor = e.getParameter(e.VENDOR);
                f.renderer = e.getParameter(e.RENDERER);
                a = [];
                try {
                    a = e.getSupportedExtensions(), f.extensions = a
                } catch (B) {}
                try {
                    var c = e.getExtension("WEBGL_debug_renderer_info");
                    c && (f.wuv = e.getParameter(c.UNMASKED_VENDOR_WEBGL), f.wur = e.getParameter(c.UNMASKED_RENDERER_WEBGL))
                } catch (B) {}
            }
            n.m.documentMode = document.documentMode;
            n.m.compatMode = document.compatMode;
            c = [];
            f = new h;
            for (e = 0; e < q.length; e++) a = q[e], f.checkSupportFont(a) && c.push(a);
            n.fo = c;
            var e = {},
                c = [],
                l;
            for (l in navigator) "object" != typeof navigator[l] && (e[l] = navigator[l]), c.push(l);
            e.enumerationOrder = c;
            e.javaEnabled = navigator.javaEnabled();
            try {
                e.taintEnabled = navigator.taintEnabled()
            } catch (B) {}
            n.n = e;
            var e = navigator.userAgent.toLowerCase(),
                g;
            if (l = e.match(/rv:([\d.]+)\) like gecko/)) g = l[1];
            if (l = e.match(/msie ([\d.]+)/)) g = l[1];
            l = [];
            if (g)
                for (g = "AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);rmocx.RealPlayer G2 Control;Scripting.Dictionary;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;SWCtl.SWCtl;TDCCtl.TDCCtl;WMPlayer.OCX".split(";"), e = 0; e < g.length; e++) {
                    var A = g[e];
                    try {
                        var z = new ActiveXObject(A),
                            c = {};
                        c.name = A;
                        try {
                            c.version = z.GetVariable("$version")
                        } catch (B) {}
                        try {
                            c.version = z.GetVersions()
                        } catch (B) {}
                        c.version && 0 < c.version.length || (c.version = "");
                        l.push(c)
                    } catch (B) {}
                } else {
                    g = navigator.plugins;
                    c = {};
                    for (e = 0; e < g.length; e++) A = g[e], c[A.name] = 1, l.push(r(A));
                    for (e = 0; e < y.length; e++) z = y[e], c[z] || (A = g[z], A && l.push(r(A)))
                }
            g = "availHeight availWidth colorDepth bufferDepth deviceXDPI deviceYDPI height width logicalXDPI logicalYDPI pixelDepth updateInterval".split(" ");
            A = {};
            for (e = 0; g.length > e; e++) z = g[e], void 0 !== screen[z] && (A[z] = screen[z]);
            g = ["devicePixelRatio", "screenTop", "screenLeft"];
            c = {};
            for (e = 0; g.length > e; e++) z = g[e], void 0 !== window[z] && (c[z] = window[z]);
            n.p = l;
            n.w = c;
            n.s = A;
            n.sc = m;
            n.tz = k.getTimezoneOffset();
            n.lil = u.sort().join("|");
            n.wil = "";
            m = {};
            try {
                m.cookie = navigator.cookieEnabled, m.localStorage = !!window.localStorage, m.sessionStorage = !!window.sessionStorage, m.globalStorage = !!window.globalStorage, m.indexedDB = !!window.indexedDB
            } catch (B) {}
            n.ss = m;
            n.ts.deviceTime = k.getTime();
            n.ts.deviceEndTime = (new Date).getTime();
            return this.tdencrypt(n)
        }
    };

function td_collect_exe() {
    var m = td_collect.collect(),
        h = "undefined" === typeof orderId ? "" : orderId,
        r = "undefined" !== typeof jdfp_pinenp_ext && jdfp_pinenp_ext ? 2 : 1,
        h = {
            pin: _jdJrTdCommonsObtainPin(r),
            oid: h,
            p: "https:" == document.location.protocol ? "s" : "h",
            fp: risk_jd_local_fingerprint,
            ctype: r,
            v: "2.4.1.3"
        };
    try {
        h.o = _CurrentPageUrl
    } catch (u) {}
    0 >= _JdEid.length && (_JdEid = td_collect.obtainLocal(), 0 < _JdEid.length && (_eidFlag = !0));
    h.fc = _JdEid;
    h = td_collect.tdencrypt(h);
    jdJrTdsendCorsRequest(_CurrentPageProtocol + _JdJrTdRiskDomainName + "/fcf.html?a=" + h, "d=" + m, function(h) {
        if (32 < h.length) {
            var m = 0 < h.indexOf("jd_risk_");
            m || (_JdEid = h);
            _eidFlag = !0;
            var r = new Date;
            r.setFullYear(r.getFullYear() + 1E3);
            try {
                _jdJrTdRelationEidPin(h), m || td_collect.setCookie("3AB9D23F7A4B3C9B", h)
            } catch (k) {}
            try {
                window.localStorage && window.localStorage.setItem("3AB9D23F7A4B3C9B", h)
            } catch (k) {}
            try {
                window.sessionStorage && window.sessionStorage.setItem("3AB9D23F7A4B3C9B", h)
            } catch (k) {}
            try {
                window.globalStorage && window.globalStorage[".localdomain"].setItem("3AB9D23F7A4B3C9B", h)
            } catch (k) {}
            try {
                td_collect.db("3AB9D23F7A4B3C9B", _JdEid)
            } catch (k) {}
        }
    }, !1)
}(function() {
    (new JdJrTdRiskFinger).get(function(m) {
        risk_jd_local_fingerprint = m;
        if (0 >= _JdEid.length || !_eidFlag) _JdEid = td_collect.obtainLocal(), 0 >= _JdEid.length && (_eidFlag = !0)
    });
    td_collect.init();
    try {
        td_collect_exe()
    } catch (m) {}
})();

function jdJrTdsendCorsRequest(m, h, r, u) {
    try {
        var q;
        try {
            q = new window.XMLHttpRequest
        } catch (y) {}
        if (!q) try {
            q = new window.ActiveXObject("Microsoft.XMLHTTP")
        } catch (y) {}
        if (!q) try {
            q = new window.ActiveXObject("Msxml2.XMLHTTP")
        } catch (y) {}
        if (!q) try {
            q = new window.ActiveXObject("Msxml3.XMLHTTP")
        } catch (y) {}
        q.open("POST", m, !1);
        q.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        q.onreadystatechange = function() {
            4 === q.readyState && 200 === q.status && r && r(q.responseText)
        };
        q.send(h)
    } catch (y) {}
}

function getJdEid() {
    var m = {
        eid: _JdEid,
        fp: risk_jd_local_fingerprint,
        token: ""
    };
    try {
        "" == _JdEid && (m.eid = td_collect.obtainLocal(!0)), m.token = jd_risk_token_id
    } catch (h) {}
    return m
}

function JdJrTdFingerDataStream(m, h, r) {
    if ("undefined" !== typeof m && 0 != m)
        if (void 0 === h && (h = 1), void 0 === r && (r = 15), 0 >= _JdEid.length && h < r) setTimeout(function() {
            JdJrTdFingerDataStream(m, h, r)
        }, 20 * h), h++;
        else {
            if ("undefined" !== typeof jd_risk_token_id && 0 < _JdEid.length && 0 < risk_jd_local_fingerprint.length) {
                var u = _jdJrTdCommonsObtainPin("undefined" !== typeof jdfp_pinenp_ext && jdfp_pinenp_ext ? 2 : 1);
                0 < u.length && (u = {
                    p: u,
                    fp: risk_jd_local_fingerprint,
                    e: _JdEid,
                    ct: (new Date).getTime(),
                    t: jd_risk_token_id,
                    opt: m
                }, jdJrTdsendCorsRequest(_CurrentPageProtocol + _JdJrTdRiskDomainName + "/stream.html", "c=" + td_collect.tdencrypt(u)))
            }
        }
    else throw Error("sourceCode can not be null.");
}

function _jdJrTdRelationEidPin(m) {
    try {
        if (32 <= m.length) {
            var h = _jdJrTdCommonsObtainPin("undefined" !== typeof jdfp_pinenp_ext && jdfp_pinenp_ext ? 2 : 1);
            if (0 < h.length) {
                m = {
                    o: _CurrentPageUrl,
                    p: h,
                    e: m,
                    f: risk_jd_local_fingerprint
                };
                try {
                    m.bizId = _jdtdparam.bizId, m.pvId = _jdtdparam.pvId, m.uvId = _jdtdparam.uvId
                } catch (u) {}
                var r = td_collect.tdencrypt(m);
                jdJrTdsendCorsRequest(_CurrentPageProtocol + _JdJrTdRiskDomainName + "/r.html?v=" + Math.random(), "&d=" + r)
            }
        }
    } catch (u) {}
}

function _jdJrTdCommonsObtainPin(m) {
    var h = "";
    "string" === typeof jd_jr_td_risk_pin && 1 == m ? h = jd_jr_td_risk_pin : "string" === typeof pin ? h = pin : "object" === typeof pin && "string" === typeof jd_jr_td_risk_pin && (h = jd_jr_td_risk_pin);
    return h
};