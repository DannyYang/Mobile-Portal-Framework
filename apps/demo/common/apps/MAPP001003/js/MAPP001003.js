var MAPP001003 = {
	version : "0.0.1", /*套件的版本編號*/
	revision : "2015/02/04", /*最後更新日期*/
	msg : "", /*頁面說明*/
	author : "Danny", /*最後修改者*/
	currentId : "MAPP001003", /*頁面識別代碼*/
	data : {
	},
	pointObj : { /*相關指標物件*/
	},
	initPointObj : function() { /*建立指標關聯*/
		this.pointObj.openQrCodeBtn = $("#openQrCodeBtn");
		this.pointObj.scanResult = $("#scanResult");
	}
};

(function(m) {
	m.goIndex = function(opt_) {
		$.MPF.currentId = m.currentId;
		CORE.goPage("apps/MAPP001003/MAPP001003.html");
	};

	m.bindEvent = function() {
		m.pointObj.openQrCodeBtn.off().on("click", function(target) {
			barcodeScanner.scan(
				function(result){
					console.log("success");
					m.pointObj.scanResult.html(result.text);
				},
				function(fail){
					console.log("fail");
				}
			);
		});
	};
	
	m.toGeneratorQRCode = function() {
		DLJFM.callObjMethodAndDynamicLoadJsFile(DLJFM.JsFileTable["MAPP001003_1"], function(obj){
			appNodeFlow.replaceCurrentNode(obj);
		});
	};

	m.updateView = function() {
	};

	m.init = function() {
		m.initPointObj();
		m.bindEvent();
		m.updateView();
	};
})(MAPP001003);

$(document).on("pagebeforeshow", "#MAPP001003", function() {
	CORE.closeLoading();
});

$(document).on("pageshow", "#MAPP001003", function() {
	appNodeFlow.nodeInit(MAPP001003);
	MAPP001003.init();
});

$(document).on('pageremove', '#MAPP001003', function(event, data) {
});