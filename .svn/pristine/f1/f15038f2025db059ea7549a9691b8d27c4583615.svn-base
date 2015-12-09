/*Production Mode*/
var LOGIN = {
	// 套件的版本編號
	version : "0.0.1",
	// 對應SVN的revision編號
	revision : "2015/11/30",
	// 版本說明
	msg : "Login JS",
	// 最後修改者
	author : 'Danny',
	// Login程式專用的旗標值, 用以判斷APP是否要關閉．
	close : false,
	currentId : 'LoginPage',
	rememberType : {
		ALL : 'ALL',
		IDONLY : 'IDONLY',
		NONE : 'NONE'
	},
	remeber : undefined
};

(function(_L) {
	/***************************************************************************
	 * 開啟MobilePortal登入畫面
	 **************************************************************************/
	_L.goIndex = function(options) {
		$.MPF.currentId = _L.currentId;
		CORE.clearCacheUserInfo();
		MPF_EVENT.onLogout();

		if (options && options.close === true) {
			_L.close = options.close;
			if ($.mobile.activePage.attr("id") == _L.currentId) {
				WL.App.close();
			}
		}
		CORE.goPage("js/core/login/Login.html", {});
	};

	// Call transferdata.AUTH for 驗證
	_L.login = function(_uid, _pass, _remember, _seccess, _fail) {
		_seccess();
	};


	_L.screenAdjustEvent = function(){
		$("#usernameInputField, #passwordInputField").on('focus blur', function(event) {
	         if( event.type === 'focus' ){
	        	 //$("html, body").animate({ scrollTop: '+=70px' }, 300);
	        	 $("#LoginPage .footer").hide();
	         }
	         else if( event.type === 'blur'){
	             setTimeout(function(){ 
	            	 if ( !$("#usernameInputField, #passwordInputField").is(":focus") ){
	            	    //$("html, body").animate({ scrollTop: 0 }, 300);
	   	        	    $("#LoginPage .footer").show();
	            	 }
	             }, 100);
	         }
		});
	};

	_L.clearHeadMsg = function() {
		$("#ErrorMsg").text("");
	};

	_L.bindEvent = function() {
		// 處理登入的事件．
		$("#loginButton").on('click', function() {
			var uid = $("#usernameInputField").val().toUpperCase();
			var pass = $("#passwordInputField").val();
			LOGIN.remeber = $("#rememberPass").val();

			if (!MPF_UTIL.isEmpty(uid) && !MPF_UTIL.isEmpty(pass)) {
				LOGIN.login(uid, pass, LOGIN.remeber, function(obj) {
					CORE.setCoreData(uid, pass, "127.0.0.1", "testBody");
	                // MPF_NOTIFICATION.Register.doRegister();
					MOBILE_PORTAL.loadDeafultPage();
				}, function(obj) {
					MPF_LOG.trace(JSON.stringify(obj));
					$("#ErrorMsg").text("網路連線失敗!");
				});
			} else {
				$("#ErrorMsg").text("請輸入帳號/密碼!");
			}
		});

		// 處理記憶密碼 .
		$("#rememberPass").on('change', function() {
			if ($("#rememberPass").val() == "unchecked")
				$("#rememberPass").attr("value", "checked");
			else {
				$("#rememberPass").attr("value", "unchecked");
			}
		});
	}

	_L.init = function() {
		_L.bindEvent();
	};

})(LOGIN);

/*
 * 顯示登入畫面前的處理工作
 */
$(document).on('pagebeforeshow','#' + LOGIN.currentId, function(event) {
	// 所有頁面切換回首頁都必須處理interval電文的reqObj,主要牽涉到session timeout
	appNodeFlow.resetNodes(true);
});

$(document).on('pageshow', '#' + LOGIN.currentId, function(event) {
	LOGIN.init();
	LOGIN.screenAdjustEvent();
});

$(document).on('pageremove', '#' + LOGIN.currendId, function(event) {
	// 登入頁面不顯示策略訊息,只記錄起來,所以當要離開登入頁面的時候要去檢查一下是否有訊息
	// 等待顯示,以便在進入首頁的時候開啓
	MPF_Dialog.startNextMsg();
});