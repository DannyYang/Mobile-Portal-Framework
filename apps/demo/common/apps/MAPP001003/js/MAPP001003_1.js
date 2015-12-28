var MAPP001003_1 = {
	version : "0.0.1", /*套件的版本編號*/
	revision : "2015/12/27", /*最後更新日期*/
	msg : "", /*頁面說明*/
	author : "Danny", /*最後修改者*/
	currentId : "MAPP001003_1", /*頁面識別代碼*/
	data : {
	},
	controllers : {
		QRCode : undefined
	},
	pointObj : { /*相關指標物件*/
	},
	initPointObj : function() { /*建立指標關聯*/
		this.pointObj.qrcodeContentInput = $("#qrcodeContentInput");
		this.pointObj.generatorQrCodeBtn = $("#generatorQrCodeBtn");
		this.pointObj.qrCodeResult = $("#qrCodeResult");
	}
};

(function(m) {
	m.goIndex = function(opt_) {
		$.MPF.currentId = m.currentId;
		CORE.goPage("apps/MAPP001003/MAPP001003_1.html");
	};

	m.bindEvent = function() {
		m.pointObj.generatorQrCodeBtn.off().on("click", function(target) {
			m.controllers.QRCode.makeCode(m.pointObj.qrcodeContentInput.val());
		});
	};
	
	m.toScanQRCode = function() {
		DLJFM.callObjMethodAndDynamicLoadJsFile(DLJFM.JsFileTable["MAPP001003"], function(obj){
			appNodeFlow.replaceCurrentNode(obj);
		});
	};
	
	m.init = function() {
		m.initPointObj();
		m.bindEvent();
		m.controllers.QRCode = new QRCode(m.pointObj.qrCodeResult.get(0), {
		    text: "http://jindo.dev.naver.com/collie",
		    width: 150,
		    height: 150,
		    colorDark : "#000000",
		    colorLight : "#ffffff",
		    correctLevel : QRCode.CorrectLevel.H
		})
	};
})(MAPP001003_1);

$(document).on("pagebeforeshow", "#MAPP001003_1", function() {
	CORE.closeLoading();
});

$(document).on("pageshow", "#MAPP001003_1", function() {
	appNodeFlow.nodeInit(MAPP001003_1);
	MAPP001003_1.init();
});

$(document).on('pageremove', '#MAPP001003_1', function(event, data) {
});