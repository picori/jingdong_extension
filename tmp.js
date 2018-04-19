// (function getCoupon(url){
// 	getCoupon.end = new Date().getTime();
// 	if(!getCoupon.start){
// 		getCoupon.start = getCoupon.end;
// 	}else if(getCoupon.end - getCoupon.start >= 5 * 1000){
// 		return;
// 	}
// 	$.ajax(url+"&r"+Math.random()).done(function(response){
// 		console.warn(response);
// 		if(response.value == "999"){
// 			return;
// 		}else{
// 			setTimeout(function(){getCoupon(url);},1000);			
// 		}
// 	});
// })("http://a.jd.com/ajax/freeGetCoupon.html?key=ff6cca53f278603b09864ce8859dabd9724710bf2342b7544235544ae6d651dd681ce896dffc54d79852e4f8f1351795");


(function getCoupon(){
	//chrome.storage.asyn.get({"coupons"},function(results){
		results = [{key:"ff6cca53f278603b09864ce8859dabd9724710bf2342b7544235544ae6d651dd681ce896dffc54d79852e4f8f1351795",start:Date.parse("2018-4-18 13:37:30")},
							{key:"054f918d03047a4b0a27294d0dfb18dccf11b5b0fb242e7d3357d5dbd3d2898abd0e972a51221ba0b9875bc3eba0def0",start:Date.parse("2018-4-18 13:37:35")}];
		results.forEach(function(item){
      var now = new Date().getTime();
      setTimeout(function(){
        var func = "jQuery"+Math.floor(Math.random()*1000000);
        window[func] = function(){
          var func = "jQuery"+Math.floor(Math.random()*1000000);
          window[func] = function(response){
            console.warn(response);
          };
          $.ajax({url:"https://a.jd.com/ajax/freeGetCoupon.html?key="+item.key+"&r"+Math.random(),crossDomain:true,dataType: 'jsonp',jsonpCallback:func}).done();
        };
        $.ajax({url:"https://passport.jd.com/loginservice.aspx?method=Login&_="+now,crossDomain:true,dataType: 'jsonp',jsonpCallback:func}).done();        
      },item.start - now);			
		});
	//});
})();