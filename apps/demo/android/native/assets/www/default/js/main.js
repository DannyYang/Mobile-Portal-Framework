
/* JavaScript content from js/main.js in folder common */
var MOBILE_PORTAL={
		// 套件的版本編號
		version : "0.0.1",
		// 對應SVN的revision編號
		revision : "2",
		// 版本說明
		msg : "mainJS",
		// 最後修改者
		author : 'Danny'
}; 

(function(_MPF){
	
	/*******************************************************************************
	 * 系統判斷要導入的畫面.
	 ******************************************************************************/
	_MPF.loadDeafultPage=function(){
		var userProfile = MPF_CACHE.userProfile.getUserProfile();
		if(userProfile != undefined){		
			if (userProfile.index != undefined) {
				try{
					_MPF.goUserIndex();
				}catch(err){
					INDEX.goIndex(true);
				}
			} else {
				INDEX.goIndex(true);
			}
		}else{
			LOGIN.goIndex();
		}
	};
	
	/*******************************************************************************
	 * 開啟使用者設定的預設首頁
	 ******************************************************************************/
	_MPF.goUserIndex=function(){
		CORE.goIndex($.MPF.userProfile.index);
	};
	
	/*******************************************************************************
	 * 開啟MPortal首頁
	 ******************************************************************************/
	_MPF.goIndex=function(){
		CORE.goPage("index.html");
	};
	/**
	 *  override jquery mobile loading method with jquery block ui plugin.
	 */ 
	_MPF.overrideJQMLoading=function(){
		// TODO 目前無法直接使用
	    var originalLoadingMethod = $.mobile.loading;

	    try{
		    $.mobile.loading = function () {
		    	console.log("call!!");
		    	if(arguments[0] && arguments[0].toLowerCase() == 'show') {
		    		$("body").block
		    		(
			    		{ 
			    			message : arguments[1] && arguments[1].text,
			    			overlayCSS : 
			    			{ 
				    	        height : (document.body.scrollHeight - 41).toString(),
				    	        top : '41px',
				    	        position : 'fixed'
				    	    },
			    		}
		    		);

		    		$(".blockMsg").css("width", "70%").css("left","15%").css('font-size', '17px').css('padding-top', '8px')
		    		.css('padding-bottom', '8px').css('top', "40%").css("border-radius","13px").css("height","90px")
		    		.css('position', 'fixed').css("border","0").css("font-family", "-apple-system, SF UI Text, Helvetica Neue, Helvetica, Arial, sans-serif");
		    		$('.blockMsg').attr("id","blockMsgDIV");

		    		var opts = {
						  lines: 15 // The number of lines to draw
						, length: 28 // The length of each line
						, width: 9 // The line thickness
						, radius: 43 // The radius of the inner circle
						, scale: 0.25 // Scales overall size of the spinner
						, corners: 1 // Corner roundness (0..1)
						, color: '#000' // #rgb or #rrggbb or array of colors
						, opacity: 0.25 // Opacity of the lines
						, rotate: 0 // The rotation offset
						, direction: 1 // 1: clockwise, -1: counterclockwise
						, speed: 0.7 // Rounds per second
						, trail: 38 // Afterglow percentage
						, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
						, zIndex: 2e9 // The z-index (defaults to 2000000000)
						, className: 'spinner' // The CSS class to assign to the spinner
						, shadow: false // Whether to render a shadow
						, hwaccel: false // Whether to use hardware acceleration
						, position: 'absolute' // Element positioning
						}
					var target = document.getElementById('blockMsgDIV')
					var spinner = new Spinner(opts).spin(target);

		    		MPF_LOG.info('show block');
		    	} else {
		    		$("body").unblock();
		    		MPF_LOG.info('hide block');
		    	}
		    };
		}
		catch(e) {
			console.log(e);
		}
	};
	
})(MOBILE_PORTAL);

function wlCommonInit(){
	
	CORE.loadCacheUserInfo();
	
	CORE.loadApps();
	
	CORE.loadEnv();
			
	WL.App.overrideBackButton(CORE.exit);
	
	MOBILE_PORTAL.loadDeafultPage();
	
	MPF_Template.init();
	
	FastClick.attach(document.body);
	
	$.mobile.hashListeningEnabled=false;
	
}
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}