var INDEX = {
	// 套件的版本編號
	version : "0.0.1",
	// 對應SVN的revision編號
	revision : "2015/12/01",
	// 版本說明
	msg : "IndexdApps的JS擋",
	// 最後修改者
	author : 'Danny',
	renew : false,
	// 定義頁面的id
	currentId : 'IndexAppsPage'
};

(function(_I) {
	_I.goIndex = function(options) {
		$.MPF.currentId = _I.currentId;
		CORE.goPage("js/core/main/IndexApps.html");
	};

	_I.toApp = function(appId) {
		var app = CORE.apps.get(appId);
		CORE.showLoading(app.name + "啓動中...");
		CORE.goIndex(appId);
	};

	_I.taphold = function(_appId) {
		console.log("目前無實作");
	};

	_I.init = function() {
		if (CORE.apps.map) {
			var appList = CORE.apps.map;
			MPF_LOG.trace("appList: ", JSON.stringify(appList));
			var str = new MPF_UTIL.StringBuilder();

			// clean all rendered APPs
			$('#indexApps').html("");

			for ( var appId in appList) {
				var appName = CORE.apps.getName(appId);
				var appImgUri = CORE.apps.getImgUri(appId);
				if (appName != undefined && appImgUri != undefined) {
					str.append("<li mappid=\"").append(appId).append("\">");
					str.append("<span></span>");
					str.append("<img src=\"");
					str.append($.MPF.host).append(appImgUri)
							.append("\"><br />");
					str.append(appName).append("</li>");
				} else {
					MPF_LOG.error('apps.xml設定檔有問題, MAPPID:' + this);
				}
			}

			MPF_LOG.trace("index app string: " + str.toString());
			$('#indexApps').append(str.toString()).trigger('create');

			// delegate Index Apps events
			$('#indexApps').off().on('click', 'li', function() {
				CORE.toApp(DLJFM.JsFileTable[$(this).attr('mappid')]);
			}).on('taphold', 'li', function() {
				INDEX.taphold($(this).attr('id'));
			});
		}
	};
})(INDEX);

/*
 * 顯示登入畫面前的處理工作
 */
$(document).on('pagebeforecreate', '#' + INDEX.currentId, function(event) {
});

/*
 * 顯示登入畫面前的處理工作
 */
$(document).on('pagebeforeshow','#' + INDEX.currentId, function(event) {
	appNodeFlow.appendNode(INDEX);
});

$(document).on('pageshow', '#' + INDEX.currentId, function(event) {
	INDEX.init();
});