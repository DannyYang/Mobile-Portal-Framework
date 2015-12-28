
/* JavaScript content from apps/MAPP001004/js/MAPP001004.js in folder common */
var MAPP001004 = {
	version : "0.0.1", /*套件的版本編號*/
	revision : "2015/12/25", /*最後更新日期*/
	msg : "", /*頁面說明*/
	author : "Danny", /*最後修改者*/
	currentId : "MAPP001004", /*頁面識別代碼*/
	data : {
	},
	pointObj : { /*相關指標物件*/
	},
	initPointObj : function() { /*建立指標關聯*/
		this.pointObj.verifyFingerprintBtn = $("#verifyFingerprintBtn");
	}
};

(function(m) {
	m.goIndex = function(opt_) {
		$.MPF.currentId = m.currentId;
		CORE.goPage("apps/MAPP001004/MAPP001004.html");
	};

	m.bindEvent = function() {
		m.pointObj.verifyFingerprintBtn.off().on("click", function(){
			window.plugins.touchid.isAvailable(m.verifyFingerprintSuccess, m.verifyFingerprintFail);
		});
	};
	
	m.verifyFingerprintSuccess = function() {
		window.plugins.touchid.verifyFingerprint(
				'請掃描你的TouchID', 
				function(msg) {
					MPF_UI.alert("驗證成功!");
				},
				function(msg) {
					MPF_UI.alert("驗證失敗!");
				} 
		);
	};
	
	m.verifyFingerprintFail = function() {
		MPF_UI.alert("掃描TouchID時，發生錯誤");
	};

	m.init = function() {
		m.initPointObj();
		m.bindEvent();
	};
})(MAPP001004);

$(document).on("pagebeforeshow", "#MAPP001004", function() {
	CORE.closeLoading();
});

$(document).on("pageshow", "#MAPP001004", function() {
	appNodeFlow.nodeInit(MAPP001004);
	MAPP001004.init();
});

$(document).on('pageremove', '#MAPP001004', function(event, data) {
});