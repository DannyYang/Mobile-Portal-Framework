var MAPP001005 = {
	version : "0.0.1", /*套件的版本編號*/
	revision : "2015/12/25", /*最後更新日期*/
	msg : "購屋車", /*頁面說明*/
	author : "Danny", /*最後修改者*/
	currentId : "MAPP001005", /*頁面識別代碼*/
	data : {
	},
	pointObj : { /*相關指標物件*/
	},
	initPointObj : function() { /*建立指標關聯*/
		this.pointObj.phoneCallNumInput = $("#phoneCallNumInput");
		this.pointObj.makePhoneCall = $("#makePhoneCall");
		this.pointObj.emailInput = $("#emailInput");
		this.pointObj.sendMail = $("#sendMail");
		this.pointObj.smsInput = $("#smsInput");
		this.pointObj.sendSMS = $("#sendSMS");
	}
};

(function(m) {
	m.goIndex = function(opt_) {
		$.MPF.currentId = m.currentId;
		CORE.goPage("apps/MAPP001005/MAPP001005.html");
	};

	m.bindEvent = function() {
		m.pointObj.phoneCallNumInput.off().on("change", function() {
			m.pointObj.makePhoneCall.attr("href","tel:"+$(this).val());
		});
		
		m.pointObj.emailInput.off().on("change", function() {
			m.pointObj.sendMail.attr("href","mailto:"+$(this).val());
		});
		
		m.pointObj.smsInput.off().on("change", function() {
			m.pointObj.sendSMS.attr("href","sms:"+$(this).val());
		});
	};

	m.updateView = function() {
	};

	m.init = function() {
		m.initPointObj();
		m.bindEvent();
		m.updateView();
	};
})(MAPP001005);

$(document).on("pagebeforeshow", "#MAPP001005", function() {
	CORE.closeLoading();
});

$(document).on("pageshow", "#MAPP001005", function() {
	appNodeFlow.nodeInit(MAPP001005);
	MAPP001005.init();
});

$(document).on('pageremove', '#MAPP001005', function(event, data) {
});