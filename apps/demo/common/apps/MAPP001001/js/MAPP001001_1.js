var MAPP001001_1 = {
	version : "0.0.1", /*套件的版本編號*/
	revision : "2015/12/28", /*最後更新日期*/
	msg : "GPS 應用 Demo", /*頁面說明*/
	author : "Danny", /*最後修改者*/
	currentId : "MAPP001001_1", /*頁面識別代碼*/
	data : {
		lat : undefined,
		lng : undefined
	},
	controllers : {
		map : undefined,
		marker : undefined
	},
	pointObj : { /*相關指標物件*/
	},
	initPointObj : function() { /*建立指標關聯*/
		this.pointObj.mapContent = $("#mapContent");
	}
};

(function(m) {
	m.goIndex = function(opt_) {
		$.MPF.currentId = m.currentId;
		CORE.goPage("apps/MAPP001001/MAPP001001_1.html");
	};
	
	m.initMap = function() {
		var myPosition = {
			lat : m.data.lat,
			lng : m.data.lng
		};
		
		m.controllers.map = new google.maps.Map( m.pointObj.mapContent.get(0), {
			center : myPosition,
			zoom : 15
		});
		
		m.controllers.marker = new google.maps.Marker({
			position : myPosition,
		});

		m.controllers.marker.setMap(m.controllers.map);
	};
	
	m.init = function() {
		m.initPointObj();
		m.initMap();
	};
})(MAPP001001_1);

$(document).on("pagebeforeshow", "#MAPP001001_1", function() {
	CORE.closeLoading();
});

$(document).on("pageshow", "#MAPP001001_1", function() {
	appNodeFlow.nodeInit(MAPP001001_1);
	MAPP001001_1.init();
});

$(document).on('pageremove', '#MAPP001001_1', function(event, data) {
});