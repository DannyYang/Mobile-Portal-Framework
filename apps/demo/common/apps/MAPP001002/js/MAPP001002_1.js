var MAPP001002_1 = {
	version : "0.0.1", /*套件的版本編號*/
	revision : "2015/12/24", /*最後更新日期*/
	msg : "Demo Page", /*頁面說明*/
	author : "Danny", /*最後修改者*/
	currentId : "MAPP001002_1", /*頁面識別代碼*/
	data : {
	},
	pointObj : { /*相關指標物件*/
	},
	initPointObj : function() { /*建立指標關聯*/
	}
};

(function(m) {
	m.goIndex = function(opt_) {
		$.MPF.currentId = m.currentId;
		CORE.goPage("apps/MAPP001002/MAPP001002_1.html");
	};

	m.bindEvent = function() {
	};

	m.updateView = function() {
	};

	m.init = function() {
	};
})(MAPP001002_1);

$(document).on("pagebeforeshow", "#MAPP001002_1", function() {
	CORE.closeLoading();
});

$(document).on("pageshow", "#MAPP001002_1", function() {
	appNodeFlow.nodeInit(MAPP001002_1);
	MAPP001002_1.init();
});

$(document).on('pageremove', '#MAPP001002_1', function(event, data) {
});