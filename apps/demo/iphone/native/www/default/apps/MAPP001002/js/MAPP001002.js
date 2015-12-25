
/* JavaScript content from apps/MAPP001002/js/MAPP001002.js in folder common */
var MAPP001002 = {
	version : "0.0.1", /*套件的版本編號*/
	revision : "2015/12/24", /*最後更新日期*/
	msg : "Demo Page", /*頁面說明*/
	author : "Danny", /*最後修改者*/
	currentId : "MAPP001002", /*頁面識別代碼*/
	data : {
	},
	pointObj : { /*相關指標物件*/
	},
	initPointObj : function() { /*建立指標關聯*/
		this.pointObj.showQrCodeBtn = $("#showQrCodeBtn");
	}
};

(function(m) {
	m.goIndex = function(opt_) {
		$.MPF.currentId = m.currentId;
		CORE.goPage("apps/MAPP001002/MAPP001002.html");
	};

	m.bindEvent = function() {
		this.pointObj.showQrCodeBtn.off().on("click",function(e){
			console.log("click!!");
			DLJFM.callObjMethodAndDynamicLoadJsFile(DLJFM.JsFileTable["MAPP001002_1"], function(obj){
				appNodeFlow.appendNode(obj);
			});
		});
	};

	m.updateView = function() {
	};

	m.init = function() {
		m.initPointObj();
		m.bindEvent();
	};
})(MAPP001002);

$(document).on("pagebeforeshow", "#MAPP001002", function() {
	CORE.closeLoading();
});

$(document).on("pageshow", "#MAPP001002", function() {
	appNodeFlow.nodeInit(MAPP001002);
	MAPP001002.init();
});

$(document).on('pageremove', '#MAPP001002', function(event, data) {
});