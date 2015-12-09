var MAPP001070 = {
	version : "0.0.1", /*套件的版本編號*/
	revision : "2015/02/04", /*最後更新日期*/
	msg : "Demo Page", /*頁面說明*/
	author : "Danny", /*最後修改者*/
	currentId : "MAPP001070", /*頁面識別代碼*/
	session : {
		clickTimes : 0
	},
	pointObj : { /*相關指標物件*/
	},
	initPointObj : function() { /*建立指標關聯*/
		this.pointObj.clickTimesLabel = $("#clickTimesLabel");
		this.pointObj.clickMeBtn = $("#clickMeBtn");
		this.pointObj.goNextBtn = $("#goNextBtn");
		this.pointObj.typeArea = $("#typeArea");
	}
};

(function(m) {
	m.goIndex = function(opt_) {
		$.MPF.currentId = m.currentId;
		CORE.goPage("apps/MAPP001070/MAPP001070.html");
	};

	m.bindEvent = function() {

		m.pointObj.clickMeBtn.on("click", function() {
			m.session.clickTimes++;
			m.updateView();
		});
		
		m.pointObj.goNextBtn.on("click",function(){
			appNodeFlow.appendNode(MAPP001071);
		});
	};

	m.updateView = function() {
		m.pointObj.clickTimesLabel.text(m.session.clickTimes);
	};

	m.init = function() {
		m.initPointObj();
		m.bindEvent();
		m.updateView();
	};
})(MAPP001070);

$(document).on("pagebeforeshow", "#MAPP001070", function() {
	CORE.closeLoading();
});

$(document).on("pageshow", "#MAPP001070", function() {
	appNodeFlow.appendNode(MAPP001070);
	MAPP001070.init();
});

$(document).on('pageremove', '#MAPP001070', function(event, data) {
});