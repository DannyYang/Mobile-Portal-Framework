var MAPP001071 = {
	version : "0.0.1",          /*套件的版本編號*/
	revision : "2015/02/09",    /*最後更新日期*/
	msg : "",                   /*頁面說明*/
	author : "",                /*最後修改者*/
	currentId : "MAPP001071",   /*頁面識別代碼*/
	session : {
	},
	pointObj : {                /*相關指標物件*/
	},
	initPointObj : function() { /*建立指標關聯*/
	}
};

(function(m) {	
	m.goIndex = function(opt_) {
		$.MPF.currentId = m.currentId;
		CORE.goPage("apps/MAPP001070/MAPP001071.html");
	};

	m.init = function() {
		m.initPointObj();
	};
})(MAPP001071);

$(document).on("pagebeforeshow", "#MAPP001071", function() {
	appNodeFlow.nodeInit(MAPP001071);
	CORE.closeLoading();
});

$(document).on("pageshow", "#MAPP001071", function() {
	MAPP001071.init();
});

$(document).on('pageremove', '#MAPP001071', function(event, data) {
});