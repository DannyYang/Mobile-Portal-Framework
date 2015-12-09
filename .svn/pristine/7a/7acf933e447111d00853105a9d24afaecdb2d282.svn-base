var MAPP001001 = {
	version : "0.0.1", /*套件的版本編號*/
	revision : "2015/02/04", /*最後更新日期*/
	msg : "購屋車", /*頁面說明*/
	author : "Danny", /*最後修改者*/
	currentId : "MAPP001001", /*頁面識別代碼*/
	session : {
		clickTimes : 0
	},
	pointObj : { /*相關指標物件*/
	},
	initPointObj : function() { /*建立指標關聯*/
		
	}
};

(function(m) {
	m.goIndex = function(opt_) {
		$.MPF.currentId = m.currentId;
		CORE.goPage("apps/MAPP001001/MAPP001001.html");
	};

	m.bindEvent = function() {
	};

	m.updateView = function() {
	};

	m.init = function() {
		m.initPointObj();
		m.bindEvent();
		m.updateView();
	};
})(MAPP001001);

$(document).on("pagebeforeshow", "#MAPP001001", function() {
	
	CORE.closeLoading();
});

$(document).on("pageshow", "#MAPP001001", function() {
	appNodeFlow.appendNode(MAPP001001);
	MAPP001001.init();
});

$(document).on('pageremove', '#MAPP001001', function(event, data) {
});