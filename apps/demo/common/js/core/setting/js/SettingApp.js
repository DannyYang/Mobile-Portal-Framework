var SettingAppPage = {
	version : "0.0.1", /*套件的版本編號*/
	revision : "2015/12/25", /*最後更新日期*/
	author : "Danny", /*最後修改者*/
	currentId : "SettingAppPage", /*頁面識別代碼*/
	data : {
	},
	pointObj : { /*相關指標物件*/
	},
	initPointObj : function() { /*建立指標關聯*/
		this.pointObj.logoutBtn = $("#logoutBtn");
	}
};

(function(m) {
	m.goIndex = function(opt_) {
		$.MPF.currentId = m.currentId;
		CORE.goPage("js/core/setting/SettingApp.html");
	};

	m.bindEvent = function() {
		this.pointObj.logoutBtn.off().on("click", function(target){
			MPF_CACHE.userProfile.deleteUserProfile();
			LOGIN.goIndex();
		});
	};

	m.updateView = function() {
	};

	m.init = function() {
		m.initPointObj();
		m.bindEvent();
		m.updateView();
	};
})(SettingAppPage);

$(document).on("pagebeforeshow", "#SettingAppPage", function() {
	CORE.closeLoading();
});

$(document).on("pageshow", "#SettingAppPage", function() {
	appNodeFlow.nodeInit(SettingAppPage);
	SettingAppPage.init();
});

$(document).on('pageremove', '#SettingAppPage', function(event, data) {
});