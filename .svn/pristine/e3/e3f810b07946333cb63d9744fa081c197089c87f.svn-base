
/* JavaScript content from js/core/MPF.core.js in folder common */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};

String.prototype.isEmpty = function() {
	return this.trim().length == 0;
};

var ERROR = function(status, error) {
	this.status = status;
	this.error = error;
};

var MPF_IO, MPF_DATA, MPF_UTIL, MPF_LOG, MPF_CHANNEL, MPF_EVENT, MPF_UI, MPF_NOTIFICATION,MPF_UUID,MPF_STORE;
(function($) {
	// make sure undefined is undefined
	var undefined;
	var ioCount = 0, plugCount = 0, eventCount = 0;
	var ioplug = {}, dtplug = {}, eventplug = {};


	// for IE8 cross domain 問題
	$.support.cors = true;
	/**
	 * MPF Core套件的主目錄，主要負責定義整個到件預設的說明（版本編號，修改者，說明等等），設定資訊及參數
	 */
	$.MPF = {
		// 套件的版本編號
		version : "1 beta",
		// 對應SVN的revision編號
		revision : "2",
		// 版本說明
		msg : "第一版測試的MPF Plugin-Core",
		// 最後修改者
		author : 'Danny',
		// 設定套件是否為開發模式
		debugMode : true,
		// 設定log的層級, 0:顯示所有的log, 1:顯示debug的log, 2:顯示info的log, 3:顯示warn的log,
		// 4:顯示error的log.
		logLevel : 3,
		// 系統其他共用參數
		serverUrl : undefined,
		// worklight server source type, 由UI的JS負責傳入到Core來.
		source : undefined,
		// 存入登入者帳號, undefined代表未登入
		uid : undefined,
		// 存入登入者密碼(未加密), undefined代表未登入
		pass : undefined,
		// 存入登入者密碼(MD5加密過後的), undefined代表未登入
		md5Pass : undefined,
		// 存入登入後token, undefined代表未登入
		token : undefined,
		// Cordova推播Plugin
		pushNotification : undefined,
		// 存入手機裝置的Token
		push_token : undefined,
		MPF_device_uuid : undefined,
		// 檔案路徑
		host : undefined,
		// 目前ip
		ip : undefined,
		// 當前畫面的ID, 目前是給MPF_Event用的．
		currentId : undefined,
		channelId : undefined,
		userType : undefined,
		logintTime : undefined,
		expireDate : undefined,
		expireTime : undefined,
		// 檔案伺服器位址
		servicePath : undefined
	};
	
	MPF_UUID = {
		setUUID : function () {
			// for iOS device uuid device token
			if($.MPF.env == WL.Environment.IPHONE ) {
				cordova.exec(
					function(result) {
						console.log("get ios device uuid success , uuid :" + result);
						$.MPF.MPF_device_uuid = result;
					},
					function(error) { 
						console.log("get ios device uuid fail : " + error);
					}, "SKHDeviceUUIDPlugin","getDeviceUUID", []);
			} else {
				$.MPF.MPF_device_uuid = device.uuid;
			}
		},
		uuid : function() {
			return $.MPF.MPF_device_uuid;
		}
	};

	/**
	 * SKH event套件，提供event的plugin機制
	 */
	MPF_EVENT = $.MPF.event = {
		// 取得註冊在ＰＬＵＧＩＮ內的ENV處理程式
		env : {
			name : 'env',
			type : {
				// 當系統進入背景時執行相關CALL-BACK
				PAUSE : 'PAUSE',
				// 當系統進入前景時執行相關CALL-BACK
				RESUME : 'RESUME',
				// 當系統要關閉時執行相關CALL-BACK
				STOP : 'STOP',
				// 當系統網路連線時執行相關CALL-BACK
				ONLINE : 'ONLINE',
				// 當系統網路斷線時執行相關CALL-BACK
				OFFLINE : 'OFFLINE',
				// 當收到MQTT系統網路連線狀態訊息時執行相關CALL-BACK
				MQTT_CONNECT_STATUS : 'MQTT_CONNECT_STATUS',
				// 當手機旋轉切換時執行相關CALL-BACK
				ORIENTATION : 'ORIENTATION',
				// 當視窗大小改變時執行相關CALL-BACK
				RESIZE : 'RESIZE',
				// USER登入系統後(帳號/密碼驗證完成)才執行的CALL-BACK
				LOGIN : 'LOGIN',
				// USER登出系統後才執行的CALL-BACK
				LOGOUT : 'LOGOUT',
			}
		},
		set : function(options) {
			var _options;
			var defaultSettings = {
				// 套件的版本編號
				version : "0.0.X",
				// 對應SVN的revision編號
				revision : "201X/XX/XX",
				// 版本說明
				msg : "EVENT Plugin未提供說明",
				// 最後修改者
				author : 'XXX',
				// 設定plugin的名稱，提供UI的元件透過name取的plugin的機制．
				name : undefined,
				register : function(options) {
					throw "EVENT plugin NOT IMPLEMENT! " + this.name;
				}
			};
			_options = $.extend({}, defaultSettings, options);
			if (_options.name === undefined) {
				throw "NO name found for EVENT Plugin : "
						+ JSON.stringify(options);
			}
			eventCount++;
			var oName = _options.name;
			eventplug[oName] = _options;
			MPF_LOG.trace("===EVENT Plugin Added!===");
			MPF_LOG.trace("Name :" + (eventplug[oName].name));
			MPF_LOG.trace("version :" + (eventplug[oName].version));
			MPF_LOG.trace("revision :" + (eventplug[oName].revision));
			MPF_LOG.trace("msg :" + (eventplug[oName].msg));
			MPF_LOG.trace("author :" + (eventplug[oName].author));
			MPF_LOG.trace("===END of IO EVENT ===");
		},
		get : function(_type) {
			if (_type && _type.name) {
				if (eventplug[_type.name]) {
					return eventplug[_type.name];
				}
				throw "NO EVENT plugin found for type.name: " + _type.name;
			} else {
				if (eventplug[0]) {
					return eventplug[0];
				}
				throw "NO default EVENT plugin found.";
			}
		}

	};

	/**
	 * SKH io套件，提供IO的plugin機制
	 */
	MPF_IO = $.MPF.io = {
		// 取得註冊在ＰＬＵＧＩＮ內的ＡＪＡＸ處理程式
		ajax : {
			name : 'ajax',
			type : {
				// 執行ＰＯＳＴ的ＡＪＡＸ
				POST : 'POST',
				// 執行ＧＥＴ的ＡＪＡＸ
				GET : 'GET'
			}
		},
		// 取得註冊在ＰＬＵＧＩＮ內的ＡＪＡＸ ＬＯＮＧ ＰＯＬＬＩＮＧ處理程式
		comet : {
			name : 'comet',
			type : {
				// 註冊同時啓動一個LONG POLLING的連線
				REGISTER : 'REGISTER',
				// 關閉同時移除LONG POLLING的連線
				UNREGISTER : 'UNREGISTER'
			}
		},
		// 取得註冊在ＰＬＵＧＩＮ內的MQTT QUOTE ＬＯＮＧ ＰＯＬＬＩＮＧ處理程式
		quote : {
			name : 'quote',
			type : {
				// 透過MQTT註冊
				REGISTER : 'REGISTER',
				// 透過MQTT反註冊
				UNREGISTER : 'UNREGISTER'
			}
		},
		// 取得註冊在ＰＬＵＧＩＮ內的MQTT PRODINFO SEARCH處理程式
		prodinfo : {
			name : 'prodinfo',
			type : {
				// 透過MQTT進行商品資訊查詢
				SEARCH : 'SEARCH',
			},
			searchType : {
				fullMatch : "DP01",// 商品完全比對的查詢
				warrantDist : "DP02",// 權證發行券商
				optionMARGIN : "DP04",// 選擇權保證金計算
			},
		},
		// 取得註冊在ＰＬＵＧＩＮ內的ＦＩＬＥ處理程式
		file : {
			name : 'file',
			type : {
				LOCALSTORAGE : 'LOCALSTORAGE'
			},
			action : {
				// 執行讀擋的動作
				READ : 'READ',
				// 執行寫擋的動作
				WRITE : 'WRITE',
				// 清除資料
				REMOVE : 'REMOVE',
				// 執行清擋的動作
				RESET : 'RESET'
			}
		},
		set : function(options) {
			var _options;
			var defaultSettings = {
				// 套件的版本編號
				version : "0.0.X",
				// 對應SVN的revision編號
				revision : "2015/01/27",
				// 版本說明
				msg : "NET Plugin未提供說明",
				// 最後修改者
				author : 'XXX',
				// 設定plugin的名稱，提供UI的元件透過name取的plugin的機制．
				name : undefined,
				send : function(options) {
					throw "IO plugin NOT IMPLEMENT! " + this.name;
				}
			};
			_options = $.extend({}, defaultSettings, options);
			if (_options.name === undefined) {
				throw "NO name found for IO Plugin : "
						+ JSON.stringify(options);
			}
			ioCount++;
			var oName = _options.name;
			ioplug[oName] = _options;
			MPF_LOG.trace("===IO Plugin Added!===");
			MPF_LOG.trace("Name :" + (ioplug[oName].name));
			MPF_LOG.trace("version :" + (ioplug[oName].version));
			MPF_LOG.trace("revision :" + (ioplug[oName].revision));
			MPF_LOG.trace("msg :" + (ioplug[oName].msg));
			MPF_LOG.trace("author :" + (ioplug[oName].author));
			MPF_LOG.trace("===END of IO Plugin ===");
		},
		get : function(_type) {
			if (_type && _type.name) {
				if (ioplug[_type.name]) {
					return ioplug[_type.name];
				}
				throw "NO IO plugin found for type.name: " + _type.name;
			} else {
				throw "TYPE ERROR! TYPE is not in MPF_IO.ajax or MPF_IO.comet or MPF_IO.file";
			}
		}

	};

	/**
	 * ML dataTransfer套件
	 */
	MPF_DATA = $.MPF.dataTransfer = {
		set : function(options) {
			var _options;
			var defaultSettings = {
				// 套件的版本編號
				version : "0.0.X",
				// 對應SVN的revision編號
				revision : "X",
				// 版本說明
				msg : "Data Transfer Plugin未提供說明",
				// 最後修改者
				author : 'XXX',
				// 設定plugin的名稱，提供UI的元件透過name取的plugin的機制．
				name : undefined,
			};
			// 將來要改成每次$.MPF.dataTransfer.set([JSON])被呼叫時APPEND到plugin裡，目前會互蓋．
			_options = $.extend({}, defaultSettings, options);
			if (_options.name === undefined) {
				throw "NO name found for dataTransfer Plugin : "
						+ JSON.stringify(options);
			}
			plugCount++;
			var oName = _options.name;
			dtplug[oName] = _options;
			MPF_LOG.trace("===Data transfer Plugin Added!===");
			MPF_LOG.trace("Name :" + dtplug[oName].name);
			MPF_LOG.trace("version :" + dtplug[oName].version);
			MPF_LOG.trace("revision :" + dtplug[oName].revision);
			MPF_LOG.trace("msg :" + dtplug[oName].msg);
			MPF_LOG.trace("author :" + dtplug[oName].author);
			MPF_LOG.trace("===END of Data transfer Plugin ===");
		},
		get : function(_type) {
			if (_type && _type.name) {
				if (dtplug[_type.name]) {
					return dtplug[_type.name];
				}
				throw "NO DataTransfer plugin found for type.name: "
						+ _type.name;
			} else {
				throw "TYPE ERROR! TYPE is not in MPF_CHANNEL";
			}
		}
	};

	/**
	 * ML Log套件,依據設定log的層級來顯示記錄流程,開發用,啓動條件依據 $.MPF.debugMode 來決定是否執行 0:trace log
	 * 1:debug log 2:info log 3:warn log 4:error log
	 */
	MPF_LOG = $.MPF.log = {
		trace : function() {
			if ($.MPF.debugMode && $.MPF.logLevel == 0) {
				if (console && console.log)
					console.log(logIntegration('[TRACE]', arguments));
				else
					MPF_UI.alert(logIntegration('[TRACE]:', arguments));
			}
		},

		debug : function() {
			if ($.MPF.debugMode && $.MPF.logLevel <= 1) {
				if (console && console.log)
					console.log(logIntegration('[DEBUG]:', arguments));
				else
					MPF_UI.alert(logIntegration('[DEBUG]:', arguments));
			}
		},

		info : function() {
			if ($.MPF.debugMode && $.MPF.logLevel <= 2) {
				if (console && console.log)
					console.log(logIntegration('[INFO]:', arguments));
				else
					MPF_UI.alert(logIntegration('[INFO]:', arguments));
			}
		},

		warn : function() {
			if ($.MPF.debugMode && $.MPF.logLevel <= 3) {
				if (console && console.log)
					console.log(logIntegration('[WARN]:', arguments));
				else
					MPF_UI.alert(logIntegration('[WARN]:', arguments));
			}
		},

		error : function() {
			if ($.MPF.debugMode && $.MPF.logLevel <= 4) {
				if (console && console.log)
					console.log(logIntegration('[ERROR]:', arguments));
				else
					MPF_UI.alert(logIntegration('[ERROR]:', arguments));
			}
		}
	};

	MPF_NOTIFICATION = $.MPF.notification = {
		GCM : {
			ecbHandler : function(info) {
				switch (info.event) {
				case "registered":
					if (info.regid.length > 0) {
						MPF_NOTIFICATION.GCM.onTokenReceive(info.regid);
					}
					break;
				case "message":
					MPF_NOTIFICATION.GCM.onNotification(info);
					break;
				case "error":
					alert("error:" + info.msg);
					break;
				default:
					alert(" Unknown, an event was received and we do not know what it is");
					break;
				}
			},
			onTokenReceive : function(token) {
				console.log("token = " + token);
				$.MPF.deviceToken = token;
			},
			onNotification : function(info) {
				console.log("[receive notification]");
				console.log(JSON.stringify(info));
				try {
					// 判斷是來自於前景或者背景的推播
					if(info.foreground == true || info.foreground == 1){
						// 如果目前APP已經是前景，則不需做任何處理
					} else {
						// 目前是來自背景動作，需要額外導頁處理
						// 取的對象eventID
						var eventID = info.payload.eid;
						console.log("[Target EventID]:" + eventID);
						
						// 驗證eventID有效性
						if(eventID && eventID.length == 12) {
							
						    var notificationCallBack = function(eventID){

								if ($.MPF.uid == undefined) {
									CORE.goPage("js/core/login/Login.html");
								} else {
									 if ($.MPF.currentId == "IndexAppsPage") {
									 	INDEX.loadData();
									 } else {
										appNodeFlow.resetNodes(true);
										var categoryIdVal = eventID.substring(0,3);
										var categoryNameVal = MPF_UI.eventTitleMap[categoryIdVal];
										
										var paramObj = {
											"categoryId" : categoryIdVal,
											"categoryName" : categoryNameVal,
											"navigationMode" : true,
											"targetEventID" : eventID
										};
										MAPP000001_2.goIndex(paramObj,{});
									 }
								}
						    };
						    
						    MOBILE_PORTAL.loadDeafultPage( notificationCallBack, info.payload.eid );

						} else {
							console.log("eventID 格式有誤")
						}
					}
				} catch(e) {
					console.log("onNotification error : " + e);
				}
			},
			callSuccessHandler : function(info) {
				console.log("result : " + info);
			},
			errorHandler : function(info) {
				alert("Error , result : " + info);
			}
		},
		APNS : {
			ecbHandler : function(info) {
				console.log("[receive notification]");
				console.log(JSON.stringify(info));
				
				try {
					// 判斷是來自於前景或者背景的推播
					if(info.foreground == true || info.foreground == 1){
						// 如果目前APP已經是前景，則不需做任何處理
					} else {
						// 目前是來自背景動作，需要額外導頁處理
						// 取的對象eventID
						var eventID = info.eid;
						console.log("[Target EventID]:" + eventID);
						// 驗證eventID有效性
						if(eventID && eventID.length == 12) {
							if ($.MPF.uid == undefined) {
								CORE.goPage("js/core/login/Login.html");
							} else {
								 if ($.MPF.currentId == "IndexAppsPage") {
								 	INDEX.loadData();
								 } else {
									appNodeFlow.resetNodes(true);
									appNodeFlow.nodeInit(SYSTEM);
									appNodeFlow.nodeInit(MAPP000001);
									var categoryIdVal = eventID.substring(0,3);
									var categoryNameVal = MPF_UI.eventTitleMap[categoryIdVal];
									
									var paramObj = {
										"categoryId" : categoryIdVal,
										"categoryName" : categoryNameVal,
										"navigationMode" : true,
										"targetEventID" : eventID
									};
									MAPP000001_2.goIndex(paramObj,{});
								 }
							}
						} else {
							console.log("eventID 格式有誤")
						}
					}
				} catch(e) {
					console.log("onNotification error : " + e);
				}
			},
			onTokenReceive : function(token) {
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET",'http://140.124.183.151:8080/PushServer/Service/Tokens/Store/'+ token + '/IOS', false);
                xmlHttp.send( null );
                console.log("token = " + token);
                $.MPF.deviceToken = token;
			},
			errorHandler : function(info) {
				alert("Error , result : " + info);
			}
		}
	};

	/**
	 * 以下提供util工具
	 */
	MPF_UTIL = $.MPF.util = {

		// 置換所有相符的字串
		replaceAll : function(strOrg, strFind, strReplace) {
			return strOrg.replace(new RegExp(strFind, "g"), strReplace);
		},

		isEmpty : function(obj) {
			if (obj) {
				if (typeof (obj) === "string") {
					return obj.isEmpty();
				} else if (obj.val && obj.val()) {
					if (obj.val().trim().length == 0)
						return true;
					else
						return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
		},

		isJSON : function(str) {
			try {
				JSON.parse(str);
			} catch (e) {
				return false;
			}
			return true;
		},

		isEmptyNumerical : function(n) {
			if (n !== undefined) {
				if (typeof (n) === "number")
					return false;
				else
					return true;
			} else {
				return true;
			}
		},

		isLargeThanZero : function(n) {
			if (n !== undefined) {
				if (n > 0)
					return true;
				else
					return false;
			} else {
				return false;
			}
		},

		/**
		 * StringBuilder的字串工具
		 */
		StringBuilder : function() {
			this.buffer = [];
			this.append = function(val) {
				this.buffer.push(val);
				return this;
			};
			this.appendWhiteSpace = function() {
				this.buffer.push(" ");
				return this;
			};
			this.appendAttr = function(key, val) {
				this.buffer.push(key);
				this.buffer.push("='");
				this.buffer.push(val);
				this.buffer.push("'");
				return this;
			};
			this.toString = function() {
				return this.buffer.join('');
			};
			this.release = function() {
				while (this.buffer.length > 0) {
					this.buffer.pop();
				}
			};
		},

		/**
		 * 可傳入多個參數，function會把傳入的參數結合成一個 Array 回傳
		 * 
		 * @returns {Array}
		 */
		pushArgs2Array : function() {
			var argsLengthFlag = arguments.length - 1;
			var rsAry = new Array(arguments.length);
			while (argsLengthFlag >= 0) {
				rsAry[argsLengthFlag] = arguments[argsLengthFlag];
				argsLengthFlag--;
			}
			return rsAry;
		},

		/**
		 * 傳入一個json格式的input，function會以each的方式組合成 ajax data所需的格式 ex: inputs ->
		 * {"data1": "a", "data2": "b"} toParam(inputs) -> data1=a&data2=b
		 * 
		 * @param inputs
		 * @returns
		 */
		toParams : function(inputs) {
			var sb = new this.StringBuilder();
			sb.append("token=");
			sb.append($.MPF.token);
			sb.append("&source=");
			sb.append($.MPF.source);
			if (inputs) {
				$.each(inputs, function(k, v) {
					sb.append("&");
					sb.append(k);
					sb.append("=");
					sb.append(v);
				});
			}
			return sb.toString();
		},

		toPath : function(controlPath, funcPath) {
			var pathes = MPF_UTIL.pushArgs2Array(controlPath, funcPath);
			p = pathes.join("/");
			return p;
		},

		MPF_ForceLogout : function(msg) {
			MPF_UTIL.MPF_Logout(msg);
		},

		MPF_Logout : function(msg) {
			msg = msg !== undefined && msg !== null ? msg : "已達每日最大登入時間,請重新登入";

			MPF_UI.alert(msg, MPF_UI.alertType.warning, function() {
				// buffer全清
				MPF_Dialog.isAcceptMsg = false;
				MPF_Dialog.dialogMsgQueue['high'] = [];
				MPF_Dialog.dialogMsgBtnQueue['high'] = [];
				MPF_Dialog.dialogMsgQueue['low'] = [];
				MPF_Dialog.dialogMsgBtnQueue['low'] = [];
				$("#MPF_Dialog").popup('close');

				setTimeout(function() {
					LOGIN.goIndex();
					MPF_Dialog.isAcceptMsg = true;
				}, 100);
			});
		}
	}
	/**
	 * 統一組合log的內容
	 */
	var logIntegration = function(logLevel, args) {
		var msgArg = new $.MPF.util.StringBuilder();

		msgArg.append(logLevel);

		for (var idx = 0; idx < args.length; idx++) {
			if (args[idx] !== null && args[idx] !== undefined)
				msgArg.append(args[idx].toString());
		}

		// 利用Error特性取得程式log的呼叫點,不過需看瀏覽器支援程度
		var err = new Error();

		if (err.stack) {
			var frames = err.stack.split('\n').slice(1);

			msgArg.appendWhiteSpace().append("\n<stack>");
			msgArg.appendWhiteSpace().append(frames[2].replace(/^\s+/, ""));
		}

		return msgArg.toString();
	};
})(jQuery);