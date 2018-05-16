//https://static.360buyimg.com/static-shop-sale-p/js/common-business/??INTERFACE.js,login.js,follow.mall.js,getMallHeader.js,other.js?t=20161207
var SLD = {
    followSoa: '//follow-soa.jd.com',
    p: '//p.3.cn',
    pyhd: '//pyhd.3.cn',
    pm: '//pm.3.cn',
    jprice: '//jprice.jd.com',
    ipi360buy: '//ipi.360buy.jd.com',
    vsp: '//vsp.jd.com',
    ipr360buy: '//ipr.360buy.jd.com',
    ad: '//ad.3.cn',
    cart: '//cart.jd.com',
    creadE: '//cread.e.jd.com',
    activity: '//activity.jd.com',
    soaYushou: '//soa.yushou.jd.com',
    yushou: '//yushou.jd.com',
    diviner: '//diviner.jd.com',
    rankM: '//rank.m.jd.com',
    lsActivity: '//ls-activity.jd.com',
    l: '//l-activity.jd.com',
    paimai: '//paimai.jd.com',
    group: '//group.jd.com',
    passport: '//passport.jd.com',
    chat1: '//chat1.jd.com',
    chat: '//chat.jd.com',
    jimi: '//jimi.jd.com',
    gate: '//gate.jd.com',
    item: '//item.jd.com',
    actJshop: '//act-jshop.jd.com',
    mall: '//mall.jd.com',
    qingchun: '//qingchun.jd.com',
    voteData: '//votedata.360buy.com',
    yao: '//yao.jd.com',
    ss: '//ss.jd.com',
    club: '//club.jd.com',
    module: '//module-jshop.jd.com',
    fMall: '//f-mall.jd.com',
    zuzu: '//zuzuapi.jd.com',
    channelYhd: '////channel.m.yhd.com'
};
var INTERFACE = {
    activityFollw: {
        follow: SLD.followSoa + '/rpc/activity/follow',
        unfollow: SLD.followSoa + '/rpc/activity/unfollow',
        isFollow: SLD.followSoa + '/rpc/activity/isFollow',
        queryForPage: SLD.followSoa + '/rpc/activity/queryForPage',
        queryForCount: SLD.followSoa + '/rpc/activity/queryForCount',
        isFollowBrand: SLD.followSoa + '/rpc/activity/isFollowBrand'
    },
    venderFollow: {
        follow: SLD.followSoa + '/rpc/vender/follow',
        queryForCount: SLD.followSoa + '/rpc/vender/queryForCount',
        queryForCountByVid: SLD.followSoa + '/rpc/vender/queryForCountByVid',
        queryTagForListByCount: SLD.followSoa + '/rpc/vender/queryTagForListByCount',
        editTag: SLD.followSoa + '/rpc/vender/editTag',
        batchIsFollow: SLD.followSoa + '/rpc/vender/batchIsFollow',
        queryForPage: SLD.followSoa + '/rpc/vender/queryForPage',
    },
    brandFollow: {
        follow: SLD.followSoa + '/rpc/brand/follow',
        unfollow: SLD.followSoa + '/rpc/brand/unfollow',
        queryForCountByPin: SLD.followSoa + '/rpc/brand/queryForCountByPin',
        batchfollow: SLD.followSoa + '/rpc/brand/batchfollow',
        followBrand: SLD.followSoa + '/rest/brand/follow',
        batchIsFollow: SLD.followSoa + '/rpc/brand/batchIsFollow',
        batchUnfollow: SLD.followSoa + '/rpc/brand/batchUnfollow'
    },
    productFollow: {
        follow: SLD.followSoa + '/rpc/product/follow',
        queryForCountByPid: SLD.followSoa + '/rpc/product/queryForCountByPid',
        queryForPage: SLD.followSoa + '/rpc/product/queryForPage'
    },
    price: {
        jd: SLD.p + '/prices/mgets',
        yhd: SLD.pyhd + '/prices/mgets',
        jdMobile: SLD.pm + '/prices/mgets',
        jdMobileBatch: SLD.pm + '/prices/pcpmgets',
        eptprice: SLD.jprice + '/eptprice',
        getPriceRange: SLD.ipi360buy + '/getPriceRange.html',
        vsp: SLD.vsp + '/jshop/batchPrice',
        replaceGoods: SLD.module + '/recModule/autoRepGoods.html',
        leasePrice: SLD.zuzu + '/pcClient/selfSale/price/getBatchLeastLeasePrice'
    },
    getBatchPrdPromo: SLD.ipr360buy + '/getBatchPrdPromo.html',
    promoTag: SLD.ad + '/flags/mgets',
    reBuyForOrderCenter: SLD.cart + '/cart/dynamic/reBuyForOrderCenter.action',
    miniCartServiceNew: SLD.cart + '/cart/miniCartServiceNew.action',
    presale: SLD.cart + '/cart/dynamic/presale.action',
    sevencard_insert: SLD.creadE + '/sevencard/sevencard_insert.action',
    sevencard_gettoken: SLD.creadE + 'sevencard/sevencard_gettoken.action',
    jindou: SLD.jprice + '/skuprice',
    vote: {
        vote: SLD.activity + '/vote/vote.action',
        optHistory: SLD.activity + '/vote/optHistory.action',
        getCount: SLD.activity + '/vote/getCount.action',
        voteInfo: SLD.activity + '/vote/voteInfo.action'
    },
    soaYushou: SLD.soaYushou + '/youshouinfo.action',
    yushou: SLD.yushou + '/youshouinfo.action',
    diviner: SLD.diviner + '/diviner',
    rankData: SLD.rankM + '/rankData',
    lottery: {
        getWinnerList: SLD.lsActivity + '/lotteryApi/getWinnerList.action',
        getLotteryInfo: SLD.lsActivity + '/lotteryApi/getLotteryInfo.action',
        lottery_start: SLD.lActivity + '/lottery/lottery_start.action',
        lottery_chance: SLD.lActivity + '/lottery/lottery_chance.action'
    },
    paimai: {
        currentList: SLD.paimai + '/services/currentList.action',
        queryCurAlbumInfo: SLD.paimai + '/json/current/queryCurAlbumInfo'
    },
    group: {
        addGroupCircle: SLD.group + '/jshop/addGroupCircle.htm',
        isJoinQuanZi: SLD.group + '/relation/isJoinQuanZi.htm',
        collect: SLD.group + '/jshop/collect.htm',
        saveGroupPost: SLD.group + '/jshop/saveGroupPost.htm'
    },
    passport: {
        helloService: SLD.passport + '/new/helloService.ashx',
        login: SLD.passport + '/new/login.aspx',
        jdfLogin: SLD.passport + '/loginservice.aspx'
    },
    checkChat: SLD.chat1 + '/api/checkChat',
    chat: {
        queryGroupById: SLD.chat + '/venderApi/queryGroupById.action',
        queryGroupByIdList: SLD.chat + '/venderApi/queryGroupByIdList.action',
        queryWaiterByIdList: SLD.chat + '/venderApi/queryWaiterByIdList.action',
        chat: SLD.chat + '/pop/chat'
    },
    linkJimi: SLD.jimi + '/index.action',
    linkCart: SLD.cart + '/gate.action',
    linkPresale: SLD.cart + '/cart/dynamic/presale.action',
    linkGoods: SLD.item + '',
    actJshop: {
        adv: SLD.actJshop + '/adv.html',
        ad: SLD.actJshop + '/ad.html',
        recommend: SLD.actJshop + '/recommend.html',
        serverTime: SLD.actJshop + '/serverTime.html',
        couponSend: SLD.actJshop + '/couponSend.html',
        couponExchange: SLD.actJshop + '/couponExchange.html',
        fs: SLD.actJshop + '/fs.html',
        multi: SLD.actJshop + '/multi.html',
        single: SLD.actJshop + '/single.html',
        ms: SLD.actJshop + '/ms.html',
        promo: SLD.actJshop + '/promo.html',
        userExd: SLD.actJshop + '/userExd.html',
        getOrderInfo: SLD.actJshop + '/getOrderInfo.html',
        getOrderTrack: SLD.actJshop + '/getOrderTrack.html',
        couponInfo: SLD.actJshop + '/couponInfo.html',
        getShopCoupon: SLD.actJshop + '/getShopCoupon.html',
        goodsInfo: SLD.actJshop + '/goodsInfo.html',
        getPopShopInfo: SLD.actJshop + '/getPopShopInfo.html',
        balance: SLD.actJshop + '/balance.html',
        jbn: SLD.actJshop + '/jbn.html',
        attentionCount: SLD.actJshop + '/attentionCount.html',
        getSkuByArea: SLD.actJshop + '/getSkuByArea.html',
        goodsCoupon: SLD.actJshop + '/goodsCouponInfo.html',
        getSkuByCoupon: SLD.actJshop + '/getSkuByCoupon.html',
    },
    coupon: {
        yhdCouponState: SLD.channelYhd + '/api/findStatusActiveCoupon.do',
        getYhdCoupon: SLD.channelYhd + '/api/generateCoupon.do'
    },
    moduleJshop: {
        getYaoGoodsInfo: SLD.module + '/module/getYaoGoodsInfo.html',
    },
    mall: {
        getCurrentTime: SLD.mall + '/timeCache/getCurrentTime.html',
        getAutoCompleteWords: SLD.mall + '/view/autoComplete/getAutoCompleteWords.html',
        getSurveyDetail: SLD.mall + '/view/survey/getSurveyDetail.html',
        submitSurvey: SLD.mall + '/view/survey/submitSurvey.html',
        getJshopHeader: SLD.mall + '/view/getJshopHeader.html'
    },
    qingchun: {
        addFavorite: SLD.qingchun + '/smyJ/addFavorite.html',
        addAttention: SLD.qingchun + '/smyJ/addAttention.html',
        smyInfo: SLD.qingchun + '/smyJ/smyInfo.html'
    },
    voteData: {
        set: SLD.voteData + '/set',
        get: SLD.voteData + '/get'
    },
    yao: {
        price: SLD.yao + '/jshop/price.html',
        itemPrice: SLD.yao + '/item/price',
        priceDetail: SLD.yao + '/jshop/priceDetail'
    },
    ss: {
        areaStockState: SLD.ss + '/ss/areaStockState/mget'
    },
    comment: {
        commentNum: SLD.club + '/comment/productCommentSummaries.action'
    },
    goods: {
        getRecGoods: SLD.fMall + '/intelligent/diviner'
    },
    adBanner: {
        getBanner: SLD.fMall + '/adviserBanner/getAdviserBanner'
    },
    gift: {
        getVenderGift: SLD.fMall + '/shopGift/getShopGiftInfo',
        drawVenderGift: SLD.fMall + '/shopGift/drawShopGiftInfo'
    },
    getData: function(args) {
        var param = jQuery.extend({
            url: '',
            data: {},
            dataType: 'jsonp',
            callBack: function() {}
        }, args || {});
        if (param.jsonpCallback) {
            jQuery.ajax({
                url: url,
                data: data,
                dataType: 'jsonp',
                jsonpCallback: param.jsonpCallback,
                success: function(d) {
                    callBack.call(d);
                }
            });
        } else {
            jQuery.ajax({
                url: url,
                data: data,
                dataType: 'jsonp',
                success: function(d) {
                    callBack.call(d);
                }
            });
        }
    }
};
if(!seajs){
    window.postMessage({"to":"background","work":"next"}, '*');
}
seajs.config({
    alias: {
        'login': '//misc.360buyimg.com/jdf/1.0.0/unit/login/1.0.0/login.js'
    }
})
seajs.use('//misc.360buyimg.com/jdf/1.0.0/ui/ui/1.0.0/ui.js');

function thick_login(callback, scope) {
    seajs.use('login', function(_login) {
        _login({
            modal: true,
            complete: function(c) {
                callback.call(scope || this, c.Identity);
            }
        })
    });
}

function checkLogin(successCallback, failCallback) {
    $.ajax({
        url: INTERFACE.passport.jdfLogin,
        data: {
            method: 'Login'
        },
        dataType: "jsonp",
        scriptCharset: "gbk",
        success: function(data) {
            if (data && data.Identity && data.Identity.IsAuthenticated) {
                typeof successCallback === 'function' && successCallback(data.Identity);
            } else {
                typeof failCallback === 'function' && failCallback();
            }
        }
    });
}
(function(w, $, undefined) {
    function saleAttent(args) {
        var param = jQuery.extend({
                attentType: 'vender',
                attentText: '\u5173\u6ce8',
                activityType: 1,
                node: '.e-attention',
                dataId: 'data-id',
                dataState: 'data-state',
                dataType: 'data-type',
                current: 'current',
                sysName: 'mall.jd.com',
                isDialog: true
            }, args || {}),
            _this = jQuery(this),
            attentType = param.attentType,
            activityType = param.activityType,
            node = _this.find(param.node),
            current = param.current,
            currentDom, dataTypeValue, para = [],
            otherHtml, _INTERFACE = {
                follow: SLD.followSoa + '/rpc/' + attentType + '/follow',
                batchIsFollow: SLD.followSoa + '/rpc/' + attentType + '/batchIsFollow',
                unfollow: SLD.followSoa + '/rpc/' + attentType + '/unfollow',
                queryForCount: SLD.followSoa + '/rpc/' + attentType + '/queryForCount'
            };
        if (!node.length) {
            return;
        }
        var attentHtml = '<div class="follow-dialog-mask"></div>' +
            '<div class="follow-dialog">' +
            '<div class="attent-mt">' +
            '<span class="attent-close" title="关闭">关闭</span>' +
            '<span class="attent-title">提示</span>' +
            '</div>' +
            '<div class="attent-mc">' +
            '<div class="attent-con">' +
            '<span class="attent-msg"></span>' +
            '<span class="attent-other"></span>' +
            '</div>' +
            '</div>' +
            '</div>';
        var attentCss = '<style id="followCls">' +
            '.follow-dialog-mask{position:fixed; _position:absolute; left:0; top:0; right:0; bottom:0; background:#000; opacity:0.3; filter:alpha(opacity=30); z-index:100; display:none;}' +
            '.follow-dialog-mask.current{display:block;}' +
            '.follow-dialog{width:320px; border:solid 4px rgba(0,0,0,0.1); background:#fff; position:fixed; _position:absolute; left:50%; top:50%; margin:-60px 0 0 -160px; z-index:101; display:none;}' +
            '.follow-dialog.current{display:block;}' +
            '.follow-dialog .attent-mt{height:32px; line-height:32px; background:#f5f5f5; font-size:16px; color:#222; text-indent:10px; overflow:hidden;}' +
            '.follow-dialog .attent-close{float:right; width:32px; height:32px; text-indent:-9999px; background:url(//misc.360buyimg.com/lib/skin/2013/i/thickbox_close.png) center center no-repeat; cursor:pointer;}' +
            '.follow-dialog .attent-ok, .follow-dialog .attent-repeat, .follow-dialog .attent-error, .follow-dialog .attent-max{height:48px; margin-left:20px; padding:20px 20px 20px 48px;}' +
            '.follow-dialog .attent-ok{background:url(//img12.360buyimg.com/cms/jfs/t1435/352/153421548/1347/d377c92d/555e9e71Nb767e906.png) left center no-repeat;}' +
            '.follow-dialog .attent-repeat, .follow-dialog .attent-error, .follow-dialog .attent-max{background:url(//img14.360buyimg.com/cms/jfs/t1516/358/164942511/1418/e0c25f0c/555e9e75Nfca9da16.png) left center no-repeat;}' +
            '.follow-dialog .attent-ok .attent-msg{font-size:14px; color:#009900; font-weight:bold;}' +
            '.follow-dialog .attent-repeat .attent-msg, .follow-dialog .attent-error .attent-msg, .follow-dialog .attent-max .attent-msg{font-size:14px; color:#ff771e; font-weight:bold;}' +
            '.follow-dialog .attent-other{color:#6f6363; display:block; margin-top:10px;}' +
            '.follow-dialog .attent-other a{color:#004499;}' +
            '.follow-dialog .attent-other .attent-text{margin-right:10px;}' +
            '</style>';
        var attentInfo = {
            activity: {
                msgOk: '&#x5173;&#x6CE8;&#x6210;&#x529F;&#xFF01;',
                msgRepeat: '&#x5DF2;&#x5173;&#x6CE8;&#x8FC7;&#x8BE5;&#x6D3B;&#x52A8;&#xFF01;',
                msgError: '&#x5173;&#x6CE8;&#x6D3B;&#x52A8;&#x5931;&#x8D25;&#xFF01;',
                msgMax: '&#x5173;&#x6CE8;&#x7684;&#x6D3B;&#x52A8;&#x8FBE;&#x5230;&#x6700;&#x5927;&#x6570;&#x91CF;&#xFF01;',
                msgOther: '<span class="attent-text">&#x60A8;&#x5DF2;&#x5173;&#x6CE8;<span class="attent-num">{attentNum}</span>&#x4E2A;&#x6D3B;&#x52A8;</span><a href="//t.jd.com/activity/followActivityList.action" target="_blank">&#x67E5;&#x770B;&#x6211;&#x7684;&#x5173;&#x6CE8;>></a>'
            },
            vender: {
                msgOk: '&#x5173;&#x6CE8;&#x6210;&#x529F;&#xFF01;',
                msgRepeat: '&#x5DF2;&#x5173;&#x6CE8;&#x8FC7;&#x8BE5;&#x5E97;&#x94FA;&#xFF01;',
                msgError: '&#x5173;&#x6CE8;&#x5E97;&#x94FA;&#x5931;&#x8D25;&#xFF01;',
                msgMax: '&#x5173;&#x6CE8;&#x7684;&#x5E97;&#x94FA;&#x8FBE;&#x5230;&#x6700;&#x5927;&#x6570;&#x91CF;&#xFF01;',
                msgOther: '<span class="attent-text">&#x60A8;&#x5DF2;&#x5173;&#x6CE8;<span class="attent-num">{attentNum}</span>&#x4E2A;&#x5E97;&#x94FA;</span><a href="//t.jd.com/vender/followVenderList.action" target="_blank">&#x67E5;&#x770B;&#x6211;&#x7684;&#x5173;&#x6CE8;>></a>'
            },
            product: {
                msgOk: '&#x5173;&#x6CE8;&#x6210;&#x529F;&#xFF01;',
                msgRepeat: '&#x5DF2;&#x5173;&#x6CE8;&#x8FC7;&#x8BE5;&#x5546;&#x54C1;&#xFF01;',
                msgError: '&#x5173;&#x6CE8;&#x5546;&#x54C1;&#x5931;&#x8D25;&#xFF01;',
                msgMax: '&#x5173;&#x6CE8;&#x7684;&#x5546;&#x54C1;&#x8FBE;&#x5230;&#x6700;&#x5927;&#x6570;&#x91CF;&#xFF01;',
                msgOther: '<span class="attent-text">&#x60A8;&#x5DF2;&#x5173;&#x6CE8;<span class="attent-num">{attentNum}</span>&#x4E2A;&#x5546;&#x54C1;</span><a href="//t.jd.com/home/follow" target="_blank">&#x67E5;&#x770B;&#x6211;&#x7684;&#x5173;&#x6CE8;>></a>'
            }
        };
        var attentText = {
            activity: param.attentText,
            vender: param.attentText,
            product: param.attentText,
            followed: '\u5df2\u5173\u6ce8',
            unFollow: '\u53d6\u6d88\u5173\u6ce8'
        };

        function domOperate() {
            if (currentDom.attr(param.dataState) == 0) {
                if (dataTypeValue == 1) {
                    currentDom.html(attentText[attentType]);
                }
                return;
            }
            jQuery('body').append(attentHtml, attentCss);
            var _this = jQuery('.follow-dialog'),
                mask = jQuery('.follow-dialog-mask'),
                con = _this.find('.attent-con'),
                msg = _this.find('.attent-msg'),
                other = _this.find('.attent-other'),
                close = _this.find('.attent-close'),
                cssDom = jQuery('#followCls');
            if (currentDom.attr(param.dataState) == 1) {
                if (dataTypeValue == 1) {
                    currentDom.html(attentText.followed);
                }
                msg.html(attentInfo[attentType].msgOk);
                con.addClass('attent-ok');
            }
            if (currentDom.attr(param.dataState) == 2) {
                msg.html(attentInfo[attentType].msgRepeat);
                con.addClass('attent-repeat');
            }
            if (currentDom.attr(param.dataState) == 3) {
                msg.html(attentInfo[attentType].msgMax);
                con.addClass('attent-repeat');
            }
            if (currentDom.attr(param.dataState) == 4) {
                msg.html(attentInfo[attentType].msgError);
                con.addClass('attent-error');
            }
            other.html(otherHtml);
            if (param.isDialog) {
                _this.addClass(current);
                mask.addClass(current);
            }
            close.click(function() {
                _this.remove();
                mask.remove();
                cssDom.remove();
            });
        }
        var changeNode = _this.find("[data-type = '1']");
        ! function getId() {
            for (var i = 0, len = changeNode.length; i < len; i += 1) {
                switch (attentType) {
                    case 'activity':
                        para.push({
                            id: jQuery(changeNode[i]).attr(param.dataId),
                            srcType: activityType
                        });
                        break;
                    case 'vender':
                        para.push(jQuery(changeNode[i]).attr(param.dataId));
                        break;
                    case 'product':
                        para.push(jQuery(changeNode[i]).attr(param.dataId));
                        break;
                    default:
                        break;
                }
            }
        }();

        function init() {
            if (changeNode.length > 0) {
                getState();
            }
            event();
        }

        function event() {
            node.mouseenter(function() {
                var _state = jQuery(this).attr(param.dataState);
                dataTypeValue = jQuery(this).attr(param.dataType);
                if (_state == 1 || _state == 2) {
                    if (dataTypeValue == 1) {
                        jQuery(this).html(attentText.unFollow);
                    }
                }
            }).mouseleave(function() {
                var _state = jQuery(this).attr(param.dataState);
                dataTypeValue = jQuery(this).attr(param.dataType);
                if (_state == 1 || _state == 2) {
                    if (dataTypeValue == 1) {
                        jQuery(this).html(attentText.followed);
                    }
                }
            });
            node.click(function() {
                currentDom = jQuery(this);
                switch (attentType) {
                    case 'activity':
                        para = {
                            activityId: currentDom.attr(param.dataId),
                            sysName: param.sysName,
                            srcType: activityType
                        };
                        break;
                    case 'vender':
                        para = {
                            venderId: currentDom.attr(param.dataId),
                            sysName: param.sysName
                        };
                        break;
                    case 'product':
                        para = {
                            productId: currentDom.attr(param.dataId),
                            sysName: param.sysName
                        };
                        break;
                    default:
                        break;
                }
                dataTypeValue = currentDom.attr(param.dataType);
                if (dataTypeValue == 1) {
                    if (currentDom.attr(param.dataState) == 1 || currentDom.attr(param.dataState) == 2) {
                        thick_login(abortAttent);
                    } else {
                        thick_login(attent);
                    }
                } else {
                    thick_login(attent);
                }
            });
        }

        function getState() {
            var data;

            function sendFragment() {
                var idNum = 30;
                var len = Math.ceil(changeNode.length / idNum);
                for (var i = 0; i < len; i++) {
                    var skuFragment = para.slice(i * idNum, Math.min(para.length, (i + 1) * idNum));
                    switch (attentType) {
                        case 'vender':
                            data = {
                                venderIds: skuFragment.toString(),
                                sysName: param.sysName
                            };
                            break;
                        case 'product':
                            data = {
                                productIds: skuFragment.toString(),
                                sysName: param.sysName
                            };
                            break;
                        default:
                            break;
                    }
                    send();
                }
            }

            function send() {
                $.ajax({
                    url: _INTERFACE.batchIsFollow,
                    data: data,
                    dataType: 'jsonp',
                    success: function(data) {
                        if (data.code == 'F10000') {
                            $.each(data.data, function(index, n) {
                                var _node = jQuery('[' + param.dataId + '=' + index + ']');
                                $.each(_node, function(index, item) {
                                    var dataTypeValue = jQuery(item).attr(param.dataType);
                                    if (n) {
                                        if (dataTypeValue == 1) {
                                            jQuery(item).html(attentText.followed);
                                        }
                                        jQuery(item).attr(param.dataState, 2).addClass(current);
                                    } else {
                                        if (dataTypeValue == 1) {
                                            jQuery(item).html(attentText[attentType]);
                                        }
                                        jQuery(item).attr(param.dataState, 0);
                                    }
                                })
                            });
                        }
                    }
                });
            }
            if (attentType == 'activity') {
                data = 'sysName=' + param.sysName + '&data=' + JSON.stringify(para);
                send();
            } else {
                sendFragment();
            }
        }

        function attent() {
            $.ajax({
                url: _INTERFACE.follow,
                data: para,
                dataType: 'jsonp',
                success: function(data) {
                    if (data.code == 'F10000') {
                        if (data.data) {
                            currentDom.attr(param.dataState, 1).addClass(current);
                        }
                    } else if (data.code == 'F0402') {
                        if (!data.data) {
                            currentDom.attr(param.dataState, 2);
                        }
                    } else if (data.code == 'F0410') {
                        currentDom.attr(param.dataState, 3);
                    } else {
                        currentDom.attr(param.dataState, 4);
                    }
                    getAttentNum(function() {
                        if (dataTypeValue == 2) {} else {
                            domOperate();
                        }
                    });
                }
            });
        }

        function getAttentNum(callBack, scope) {
            $.ajax({
                url: _INTERFACE.queryForCount,
                data: {
                    sysName: param.sysName
                },
                dataType: 'jsonp',
                success: function(data) {
                    otherHtml = attentInfo[attentType].msgOther.replace("{attentNum}", data.data);
                    callBack();
                }
            });
        }

        function abortAttent() {
            $.ajax({
                url: _INTERFACE.unfollow,
                data: para,
                dataType: 'jsonp',
                success: function(data) {
                    if (data.code == 'F10000') {
                        if (data.data) {
                            currentDom.attr(param.dataState, 0).removeClass(current);
                            domOperate();
                        }
                    }
                }
            });
        }
        init();
    }
    jQuery.fn.saleAttent = saleAttent;
})(window, jQuery);
(function($, w) {
    var getMallHeader = function(args) {
        var param = jQuery.extend({
            urlHeader: INTERFACE.mall.getJshopHeader,
            urlCheckChat: INTERFACE.checkChat,
            header: '#J-mall-header',
            im: '#J-jd-im',
            imLink: 'a',
            appId: '#pageInstance_appId',
            shopId: '#shop_id',
            mallType: '#mallType',
            current: 'current'
        }, args || {});
        if (jQuery(param.header).length < 1) {
            return;
        }

        function getMallHtml(callback) {
            jQuery.ajax({
                url: param.urlHeader,
                data: {
                    appId: jQuery(param.appId).val()
                },
                dataType: 'jsonp',
                success: function(data) {
                    if (data && data.result == true) {
                        domOperateHeader(data);
                        callback();
                    }
                }
            });

            function domOperateHeader(data) {
                if (data && data.result == true) {
                    jQuery(param.header).replaceWith(data.html);
                    if (jQuery('#mallType').val() != 3) {
                        jQuery('.jSelfLogo').remove();
                    }
                } else {
                    jQuery(param.header).replaceWith('');
                }
            }
        }

        function getIm() {
            if (jQuery(param.im).length < 1) {
                return;
            }
            jQuery.ajax({
                url: param.urlCheckChat,
                data: {
                    shopId: jQuery(param.shopId).val()
                },
                dataType: 'jsonp',
                success: function(data) {
                    domOperateIm(data);
                }
            });

            function domOperateIm(data) {
                var imInfo = {
                        pop: {
                            online: '\u8054\u7cfb\u5356\u5bb6',
                            offline: '\u7559\u8a00\u5356\u5bb6',
                            tipsOnline: '\u70b9\u51fb\u6b64\u5904\u53ef\u8054\u7cfb\u5356\u5bb6\u8fdb\u884c\u54a8\u8be2',
                            tipsOffline: '\u70b9\u51fb\u6b64\u5904\u7ed9\u5356\u5bb6\u7559\u8a00',
                        },
                        self: {
                            online: '\u8054\u7cfb\u4f9b\u5e94\u5546',
                            offline: '\u7559\u8a00\u4f9b\u5e94\u5546',
                            tipsOnline: '\u70b9\u51fb\u6b64\u5904\u53ef\u8054\u7cfb\u4f9b\u5e94\u5546\u8fdb\u884c\u54a8\u8be2\u54e6',
                            tipsOffline: '\u70b9\u51fb\u6b64\u5904\u7ed9\u4f9b\u5e94\u5546\u7559\u8a00\u54e6',
                        }
                    },
                    mallType = jQuery(param.mallType).val().trim(),
                    mallTypeValue;
                switch (mallType) {
                    case '1':
                        mallTypeValue = 'pop';
                        domFill(data);
                        break;
                    case '3':
                        mallTypeValue = 'self';
                        domFill(data);
                        break;
                    default:
                        break;
                }

                function domFill(data) {
                    var im = jQuery(param.im),
                        link = im.find(param.imLink);
                    if (data.code == 1) {
                        link.attr('href', INTERFACE.chat.chat + '?shopId=' + data.shopId + '&code=' + data.code).attr('title', imInfo[mallTypeValue].tipsOnline).html(imInfo[mallTypeValue].online);
                        im.addClass(mallTypeValue + ' ' + param.current);
                    } else if (data.code == 3) {
                        link.attr('href', INTERFACE.chat.chat + '?shopId=' + data.shopId + '&code=' + data.code).attr('title', imInfo[mallTypeValue].tipsOffline).html(imInfo[mallTypeValue].offline);
                        im.addClass(param.current);
                    } else {}
                }
            }
        }
        getMallHtml(getIm);
    }();
})(jQuery, window);
(function() {
    var cateId = $('#mainCategoryId').val();
    $.ajax({
        url: '//cds.3.cn/hotwords/get?cate=' + (cateId ? cateId : '1'),
        dataType: "jsonp",
        success: function(result) {
            if (!result || typeof(result) != 'object')
                return;
            var data = result;
            var html = '';
            $.each(data, function(i) {
                var item = data[i];
                html += '<a href="' + item.url_info + '" target="_blank">' + item.name + '</a>';
            });
            $('#hotwords').html(html);
            var text = '';
            $('#key01').val(text).bind("focus", function() {
                if (this.value == text) {
                    this.value = "";
                    this.style.color = "#333"
                }
            }).bind("blur", function() {
                if (!this.value) {
                    this.value = text;
                    this.style.color = "#999"
                }
            });
        }
    });
})();
var RESOURCEPATH = jQuery('#resourcePath').val();
var getHttp = function() {
    return 'https:' == document.location.protocol ? 'https://' : 'http://';
}
var urlReg = /^(http:|https:)?\/\/\w+/;
var urlLegalReg = /^(http:|https:)?\/{2,3}$/;

function getPageType() {
    var pageValue = {
        index: 1,
        preview: 2,
        home: 3,
        view_search: 4,
        view_page: 4,
        view_shop_search: 4,
        advance_search: 5,
        shopLevel: 6,
        showLicence: 7,
        showVerify: 8,
        shopSign: 9,
        shopCrmLevel: 10
    };
    var arr = location.pathname.match(/\/dec\/(.*)|\/([^-]+)/),
        pageName;
    if (arr) {
        if (arr[1]) {
            pageName = arr[1];
        } else {
            pageName = arr[2];
        }
    } else {
        pageName = 'index';
    }
    return pageValue[pageName];
}

function doAttention(a) {
    var b = "//t.jd.com/product/followProduct.action?productId=" + a;
    thick_login(function(a) {
        if (null != a && null != a.IsAuthenticated && a.IsAuthenticated) {
            var c = 510,
                d = 440;
            $.jdThickBox({
                type: "iframe",
                source: b + "&t=" + Math.random(),
                width: c,
                height: d,
                title: "\u63d0\u793a",
                _box: "attboxr",
                _con: "attconr",
                _countdown: !1,
                _frame: 'dialogIframe'
            }, function() {})
        }
    });
}
// $(".btn-coll").livequery("click", function() {
//     var a = $(this),
//         b = parseInt(a.attr("id").replace("coll", ""));
//     doAttention(b);
// });
(function($, w) {
    if (!w.console) {
        w.console = {};
        w.console.log = function(str) {};
    }
    if (typeof UI != 'undefined' && UI.dialog) {
        w.alert = function(str) {
            UI.dialog.open({
                sTitle: '京东店铺提示',
                sContent: gConfig.assembles.dialog_content(str, 1),
                nBtn: 1,
                fSure: function() {
                    UI.dialog.close();
                }
            });
        };
    }
    w.setCaret = function(textObj) {
        if (textObj.createTextRange) {
            textObj.caretPos = document.selection.createRange().duplicate();
        }
    };
    w.insertText = function(obj, str) {
        if (document.all) {
            if (obj.createTextRange && obj.caretPos) {
                var caretPos = obj.caretPos;
                caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == '   ' ? str + '   ' : str;
            } else {
                obj.value = str;
            }
        } else if (obj.selectionStart || obj.selectionStart == '0') {
            var startPos = obj.selectionStart,
                endPos = obj.selectionEnd,
                cursorPos = startPos,
                restoreTop = obj.scrollTop,
                tmpStr = obj.value;
            obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
            if (restoreTop > 0) {
                obj.scrollTop = restoreTop;
            }
            obj.focus();
            cursorPos += str.length;
            obj.selectionStart = obj.selectionEnd = cursorPos;
        } else {
            obj.value += str;
            obj.focus();
        }
    };
})(jQuery, window);
(function($, w) {
    w.gBase = w.gBase || {};
    $.extend(w.gBase, {
        nMaxZIndex: null,
        isIE6: (function() {
            if (window.ActiveXObject) {
                if (document.documentElement && typeof document.documentElement.style.maxHeight != 'undefined') {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        })(),
        fGetUrlParms: function() {
            var args = new Object(),
                qry = location.search.substring(1),
                pairs = qry.split("&");
            for (var i = 0; i < pairs.length; i++) {
                var pos = pairs[i].indexOf('=');
                if (pos == -1) continue;
                var argname = pairs[i].substring(0, pos),
                    val = pairs[i].substring(pos + 1);
                args[argname] = unescape(val);
            }
            return args;
        },
        fGetMaxZIndex: function(doc) {
            if (gBase.nMaxZIndex) {
                gBase.nMaxZIndex++;
                return gBase.nMaxZIndex;
            } else {
                return 1060;
            }

            function _get(doc) {
                var root = doc ? doc : 'body',
                    maxZIndex = 0,
                    children = $(root).children();
                for (var i = 0, len = children.length; i < len; i++) {
                    var zIndex = children.eq(i).css('z-index');
                    if (zIndex == 'auto') {
                        zIndex = arguments.callee(children[i]);
                    }
                    gBase.nMaxZIndex = Math.max(gBase.nMaxZIndex, zIndex);
                }
                return gBase.nMaxZIndex;
            }
            gBase.nMaxZIndex = _get() + 1;
            return gBase.nMaxZIndex;
        },
        fMask: function(prefix, color, opacity) {
            color = color == null ? '#000' : color;
            opacity = opacity == null ? 20 : opacity;
            var ch = Math.max($('body').height(), $(window).height()),
                zindex = this.fGetMaxZIndex();
            if ($.browser.msie && ($.browser.version.match(/\d/) == 6)) {
                var ifm = $('iframe id="' + prefix + '_ie6_mask" className="_mask_2012" style="background:#000;position:absolute;width:100%;height:' + ch + 'px;z-index:' + zindex + ';"></iframe>').appendTo('body');
                $.browser.msie ? $(ifm).css('filter', 'alpha(opacity=' + opacity + ')') : $(ifm).css('opacity', opacity / 100);
            }
            $('<div id="' + prefix + '_mask" className="_mask_2012" style="background:' + color + ';position:absolute;top:0px;display:none;width:100%;height:' + ch + 'px;z-index:' + zindex + ';"></div>').appendTo('body').fadeTo(200, opacity / 100);
        },
        fMaskHide: function(prefix) {
            $('#' + prefix + '_ie6_mask,#' + prefix + '_mask').remove();
        },
        addFavorite: function(title, url) {
            var _url = url;
            var _title = title;
            try {
                if (document.all) {
                    window.external.AddFavorite(_url, _title);
                } else if (window.sidebar) {
                    window.sidebar.addPanel(_title, _url, "");
                } else {
                    alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站。");
                }
            } catch (e) {
                alert('对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站。');
            }
        },
        JSONClone: function(obj) {
            var _result = {};
            for (var i in obj) {
                _result[i] = obj[i];
            }
            return _result;
        }
    });
})(jQuery, window);
$.fn.extend({
    imgOnload: function() {}
});
$(function() {
    gBase.nMaxZIndex = gBase.fGetMaxZIndex();
});
if (getPageType() === 3) {
    seajs.use(['components/msgbox.min'], function(Msgbox) {
        var msgbox = new Msgbox();
        $(document).ajaxComplete(function(event, xhr, settings) {
            event.preventDefault();
            if (xhr.getResponseHeader('TEMPLATE_OUTDATE') == 'false') {
                UI.dialog.close();
                var prompHtml = $('#js-promp-modal').html();
                if (true) {
                    msgbox.confirm({
                        icon: 'notice',
                        msg: prompHtml,
                        confirmText: '续费',
                        cancelText: '还原',
                        confirmCallback: function(bool) {
                            if (bool) {
                                var url = '//zx.jd.com/detail.html?id=' + $('#J_ShopTplId').val();
                                window.open(url);
                            } else {
                                $.ajax({
                                    url: '/app/backup/restoreForExpired.html?appId=' + $('#J_AppId').val(),
                                    success: function(result) {
                                        var data = $.parseJSON(result);
                                        if (data.result) {
                                            location.reload();
                                        } else {
                                            msgbox.alert({
                                                icon: 'error',
                                                msg: '刷新失败！'
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
            if (xhr.getResponseHeader('needUpdate') == 1) {
                var currentVersion = xhr.getResponseHeader('currentVersion');
                var expireTime = xhr.getResponseHeader('expireTime');
                var newVersion = xhr.getResponseHeader('newVersion');
                var prompHtml = $('#js-temp-update').html();
                msgbox.confirm({
                    icon: 'tip',
                    masg: prompHtml,
                    confirmText: '替换',
                    cancelText: '不替换',
                    confirmCallback: function(bool) {
                        if (bool) {
                            $.ajax({
                                url: '/dec/template/useShopTemplate',
                                type: 'GET',
                                data: {
                                    tpId: $('#J_ShopTplId').val(),
                                    currentVersion: currentVersion,
                                    expireTime: expireTime,
                                    needUpdate: 1,
                                    newVersion: newVersion,
                                    status: 1,
                                    templateEnvMode: 'modifyTemplate'
                                },
                                success: function(data) {
                                    if (data.result) {
                                        location.reload();
                                    } else {
                                        msgbox.alert({
                                            icon: 'error',
                                            msg: '替换失败！'
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        });
    });
}
if (getPageType() === 1 || getPageType() === 2) {
    var appendSalesBanner = function() {
        if ($('#salePushBannerHeader').length || $('#salePushBannerFooter').length) {
            var venderId = $('#vender_id').val();
            if (venderId) {
                $.ajax({
                    url: INTERFACE.adBanner.getBanner,
                    data: {
                        venderId: venderId
                    },
                    dataType: 'jsonp',
                    success: function(data) {
                        if (data.result) {
                            $('#salePushBannerHeader').html(data.top || '');
                            $('#salePushBannerFooter').html(data.bottom || '');
                        }
                    }
                })
            }
        }
    };
    appendSalesBanner();
}
if (getPageType() === 1) {
    (function($, win) {
        var storage = win.Storage('gift'),
            venderId = $('#vender_id').val(),
            token = '',
            expiredTime = 8 * 60 * 60 * 1000;
        try {
            var currentTime = new Date(),
                currendDate = new Date(currentTime.getFullYear() + '/' + (currentTime.getMonth() + 1) + '/' + currentTime.getDate() + ' 23:59:59');
            expiredTime = currendDate.getTime() - currentTime.getTime();
        } catch (e) {}
        var pin = CookieUtil.getCookie('pin');
        var setVenderGiftStatus = function(activityId, num) {
            if (num != undefined && num != null) {
                storage.setItem(pin + activityId, num);
            } else {
                var showGiftNum = storage.getItem(pin + activityId);
                if (showGiftNum) {
                    storage.setItem(pin + activityId, Number(showGiftNum) - 1, expiredTime);
                } else {
                    storage.setItem(pin + activityId, 2, expiredTime);
                }
            }
        };
        var getVendergGiftStatus = function(activityId) {
            return storage.getItem(pin + activityId);
        };
        var showSuccessModal = function() {
            var modalHtml = '<div class="J_giftSuccessModal d-gift-modal d-success">' + '<a href="javascript:void(0);" class="J_giftclose d-close"></a>' + '<a href="javascript:void(0);" class="J_giftclose d-btn">' + '知道了' + '</a>' + '</div>';
            $('body').append('<div class="J_giftMask d-gift-mask"></div>');
            $('body').append(modalHtml);
            var modalWrap = $('.J_giftSuccessModal'),
                modalMask = $('.J_giftMask');
            modalWrap.find('.J_giftclose').click(function() {
                modalWrap.remove();
                modalMask.remove();
            });
        };
        var showErrorModal = function() {
            var modalHtml = '<div class="J_giftErrorModal d-gift-modal d-error">' + '<a href="javascript:void(0);" class="J_giftclose d-close"></a>' + '<div class="d-body">' + '<div class="d-icon"></div>' + '<p class="d-title">系统开小差了</p>' + '<p class="d-content">请稍后重试</p>' + '</div>' + '<a href="javascript:void(0);" class="d-btn J_giftclose">' + '知道了' + '</a>' + '</div>';
            $('body').append('<div class="J_giftMask d-gift-mask"></div>');
            $('body').append(modalHtml);
            var modalWrap = $('.J_giftErrorModal'),
                modalMask = $('.J_giftMask');
            modalWrap.find('.J_giftclose').click(function() {
                modalWrap.remove();
                modalMask.remove();
            });
        };
        var drawGift = function(giftList) {
            $.ajax({
                url: INTERFACE.gift.drawVenderGift,
                data: {
                    vId: venderId,
                    jshop_token: token,
                    aId: giftList[0] ? giftList[0].activityId : 0
                },
                dataType: 'jsonp',
                success: function(data) {
                    if (data.result) {
                        let beanPrize = giftList.find(function(item,index,list){return item.prizeType == 4})||{};
                        window.postMessage({"to":"background","work":"next","result":{"venderId": venderId,"beans":beanPrize.discount||0,"shopId":$("#shop_id").val()}}, '*');
                    } else {
                        window.postMessage({"to":"background","work":"next","result":{"venderId": venderId,"beans":0,"shopId":$("#shop_id").val()}}, '*');
                    }
                }
            })
        };
        var showGiftModal = function(giftList) {
            var modalHtml = '<div class="J_giftModal d-gift-modal">' + '<a href="javascript:void(0);" class="J_giftClose d-close"></a>' + '<div class="d-prize J_prizeList">' + '</div>' + '<a href="javascript:void(0);" class="J_drawGift d-btn">' + '领取并关注' + '</a>' + '</div>';
            $('body').append('<div class="J_giftMask d-gift-mask"></div>');
            $('body').append(modalHtml);
            $.each(giftList, function(index, item) {
                var num = '',
                    unit = '';
                if (item.prizeType === 0) {
                    num = '￥' + item.discount;
                    unit = '京券';
                } else if (item.prizeType === 1) {
                    num = '￥' + item.discount;
                    unit = '东券';
                    if ($.trim($('#mallType').val()) == '3') {
                        unit = '券';
                    }
                } else if (item.prizeType === 4) {
                    num = item.discount;
                    unit = '京豆';
                } else if (item.prizeType === 6) {
                    num = item.discount;
                    unit = '店铺积分';
                }
                $('.J_giftModal').find('.J_prizeList').append('<div class="d-item">' + '<p class="d-num">' + num + '</p>' + '<p class="d-type">' + unit + '</p>' + '</div>');
            });
            var modalWrap = $('.J_giftModal'),
                modalMask = $('.J_giftMask');
            modalWrap.find('.J_giftClose').click(function() {
                setVenderGiftStatus(giftList[0] ? giftList[0].activityId : '', 0);
                modalWrap.remove();
                modalMask.remove();
            });
            // $.ajax({
            //     url: INTERFACE.venderFollow.batchIsFollow,
            //     data: {
            //         venderIds: $('#shop_id').val(),
            //         sysName: 'mall.jd.com'
            //     },
            //     dataType: 'jsonp',
            //     success: function(data) {
            //         if (data.code == 'F10000') {
            //             $.each(data.data, function(index, n) {
            //                 if (n) {
            //                     modalWrap.find('.J_drawGift').html('立即领取');
            //                 } else {
            //                     modalWrap.find('.J_drawGift').click(function() {
            //                         $('#shop-attention').find('.e-attention').trigger('click');
            //                     });
            //                 }
            //             });
            //         }
            //     }
            // });
            modalWrap.find('.J_drawGift').click(function() {
                if(giftList.find(function(item,index,list){return item.prizeType == 4})){
                    drawGift(giftList[0] ? giftList[0].activityId : '');
                }else{
                    window.postMessage({"to":"background","work":"next","result":{"venderId": venderId,"beans":0,"shopId":$("#shop_id").val()}}, '*');
                }                
                //modalWrap.remove();
                //modalMask.remove();
            });
        };
        window.venderGift = function() {
            if ($('#JSHOP_CHANNEL_FLAG').val() == 'yao' || $('#J_AppType').val() == '3') {
                return;
            }
            checkLogin(function() {
                $.ajax({
                    url: INTERFACE.gift.getVenderGift,
                    data: {
                        venderId: venderId
                    },
                    dataType: 'jsonp',
                    success: function(data) {
                        console.warn(data);
                        if (data.result) {
                            token = data.jshop_token;
                            drawGift(data.giftList);
                        }else{
                            window.postMessage({"to":"background","work":"next","result":{"venderId": venderId,"beans":0,"shopId":$("#shop_id").val()}}, '*');
                        }
                    }
                });
            });
        };
        window.venderGift();
    })(jQuery, window);
}