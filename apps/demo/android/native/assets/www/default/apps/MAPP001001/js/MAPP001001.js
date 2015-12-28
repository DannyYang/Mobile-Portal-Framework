
/* JavaScript content from apps/MAPP001001/js/MAPP001001.js in folder common */
var MAPP001001 = {
	version : "0.0.1", /*套件的版本編號*/
	revision : "2015/12/25", /*最後更新日期*/
	msg : "GPS 應用 Demo", /*頁面說明*/
	author : "Danny", /*最後修改者*/
	currentId : "MAPP001001", /*頁面識別代碼*/
	data : {
		lat : undefined,
		lng : undefined
	},
	pointObj : { /*相關指標物件*/
	},
	initPointObj : function() { /*建立指標關聯*/
		this.pointObj.findMyLocationBtn = $("#findMyLocationBtn");
		this.pointObj.locationDetailContent = $("#locationDetailContent");
		this.pointObj.showGoogleMapBtn = $("#showGoogleMapBtn");
	}
};

(function(m) {
	m.goIndex = function(opt_) {
		$.MPF.currentId = m.currentId;
		CORE.goPage("apps/MAPP001001/MAPP001001.html");
	};

	m.bindEvent = function() {
		m.pointObj.findMyLocationBtn.off().on("click", function(target) {
			CORE.showLoading("正在搜尋您的位置..");
			navigator.geolocation.getCurrentPosition(function(locationObj) {
				console.log(locationObj);
				m.updateLocationView(locationObj);
			}, function(fail) {
				MPF_LOG.error("取得GPS資訊失敗:"+fail);
				m.pointObj.locationDetailContent.html("取得地理位置失敗");
				CORE.closeLoading();
			},{
	            enableHighAccuracy: false,
	            timeout: 15000,
	            maximumAge: 0
	        });
		});
		
		m.pointObj.showGoogleMapBtn.off().on("click", function(target) {
			if(m.data.lng && m.data.lat) {
				DLJFM.callObjMethodAndDynamicLoadJsFile(DLJFM.JsFileTable["MAPP001001_1"], function(obj){
					appNodeFlow.appendNode(obj);
				});
			} else {
				MPF_UI.alert("請先進行定位");
			}
		});
	};

	m.updateLocationView = function(locationObj) {
		var locationInfo = locationObj.coords;
		var infoStr = "";
		if(locationInfo) {
			for(var infoKey in locationInfo) {
				infoStr += infoKey + " : " + locationInfo[infoKey] + "<br>";
			}
			m.pointObj.locationDetailContent.html(infoStr);
			
			DLJFM.callObjMethodAndDynamicLoadJsFile(DLJFM.JsFileTable["MAPP001001_1"], function(obj){
				obj.data.lat = m.data.lat = locationInfo["latitude"];
				obj.data.lng = m.data.lng = locationInfo["longitude"];
			});
		}
		CORE.closeLoading();
	};

	m.init = function() {
		m.initPointObj();
		m.bindEvent();
	};
})(MAPP001001);

$(document).on("pagebeforeshow", "#MAPP001001", function() {
	CORE.closeLoading();
});

$(document).on("pageshow", "#MAPP001001", function() {
	appNodeFlow.nodeInit(MAPP001001);
	MAPP001001.init();
});

$(document).on('pageremove', '#MAPP001001', function(event, data) {
});