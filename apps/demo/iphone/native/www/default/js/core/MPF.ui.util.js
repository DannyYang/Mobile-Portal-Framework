
/* JavaScript content from js/core/MPF.ui.util.js in folder common */
MPF_UI = {
	alertType : {
		warning : "w",
		error : "e",
		notice : "n"
	}
};

(function(MPF_ui_) {
	//回傳值
	var returnValue = '';
	//回傳陣列 [0]值,[1]css樣式
	var valueCss = undefined;

	MPF_ui_.dialog = function(myText){
		
		WL.SimpleDialog.show( 
			"訊息", 
			myText, 
			[{text: "確定", handler: function() {
				WL.Logger.debug("First button pressed"); 
			}}]
		);
		
	};

	MPF_ui_.alert = function(msg, type, closeCallBack) {
		alertify.set({
			labels : {
				ok : "關閉"
			}
		});

		var title = "Alert";

		switch (type) {
		case MPF_ui_.alertType.warning:
			title = "警告";
			break;
		case MPF_ui_.alertType.notice:
			title = "通知";
			break;
		case MPF_ui_.alertType.error:
			title = "錯誤";
			break;
		default:
			break;
		}
		;

		alertify.alert(title, msg, closeCallBack);

		var alertTop = "" + window.innerHeight / 2 - $('#alertify').height()
				/ 2 + "px";

		$('#alertify').attr('style', '');
		$('#alertify').css('top', alertTop);
	};

	MPF_ui_.scrollTop = 0;

	MPF_ui_.notify = function(msg, isSuccess, duration) {
		//如果沒有給參數當作success
		var alertifyFun = isSuccess ? alertify.success : alertify.error;

		duration = duration ? duration : 2000;
		alertifyFun(msg, duration);
	};

	MPF_ui_.confirm = function(isText, msg, confirmCallback) {
		alertify.set({
			labels : {
				ok : "確定",
				cancel : "取消"
			}
		});

		alertify.confirm(isText ? msg : "", function(e) {
			if (e) {
				confirmCallback();
			} else {
				// user clicked "cancel"
			}
		});

		if (isText === false) {
			$('.ML-msg-zone').append(msg);
		}

		var alertTop = "" + window.innerHeight / 2 - $('#alertify').height()
				/ 2 + "px";

		$('#alertify').attr('style', '');
		$('#alertify').css('top', alertTop);
	};

	/**
	 * 判斷字串是否為undefined, null, or empty
	 */
	MPF_ui_.isEmptyString = function(target, str) {
		if (target === undefined || target === null || target == "") {
			if (str === undefined || str === null)
				return "";
			return str;
		}
		return target;
	};

	/**
	 * parse server回傳的error msg
	 */
	MPF_ui_.parseResponseErrorMsg = function(serviceResponse) {
		var msg = serviceResponse.msg;
		msg += MPF_UTIL.isEmpty(serviceResponse.ext) ? "" : serviceResponse.ext;
		return msg;
	};

	/**
	 * 設定App Icon的Badge Number
	 * @note Android部分廠商可能不會有效果
	 * @param number 顯示數字(Android上限99，超過將會顯示99;iOS則沒有此限制)
	 */
	MPF_ui_.setBadge = function(number) {
		try {
			if (WL.Client.getEnvironment() == WL.Environment.ANDROID) {
				cordova.exec(function() {
					MPF_LOG.trace("設置Android Badge成功");
				}, function(error) {
					MPF_LOG.error("設置Android Badge失敗，原因:" + error);
				}, "AndroidBadgePlugin", "SET_BADGE", [ number ]);
			} else if (WL.Client.getEnvironment() == WL.Environment.IPHONE) {
				WL.Badge.setNumber(parseInt(number,10));
			}
		} catch (e) {
			MPF_LOG.error("MPF_UI setBadge Error : " + e);
		}
	};

	MPF_ui_.getTimeInfo = function() {
		var nowTime = new Date();
		var hr = nowTime.getHours();
		var min = nowTime.getMinutes();
		var sec = nowTime.getSeconds();
		var millisec = nowTime.getMilliseconds();

		return MPF_ui_.padStrLeft('00', hr.toString())
				+ MPF_ui_.padStrLeft('00', min.toString())
				+ MPF_ui_.padStrLeft('00', sec.toString())
				+ MPF_ui_.padStrLeft('000', millisec.toString());
	};

	MPF_ui_.padStrLeft = function(padStr, str) {
		return padStr.substring(0, padStr.length - str.length) + str;
	};

	MPF_ui_.blockWithOpacity = function(target, opacityVal) {
		target.block({
			message : null,
			overlayCSS : {
				opacity : opacityVal
			}
		});
	};

	// 針對JQM groupcontrol的元件進行攔截事件,讓click的時候UI效果與Navbar相同
	MPF_ui_.overrideJQMCtrlGroupEvent = function(id) {
		var elementTarget = "#" + id + " a";

		$(elementTarget).off('mouseover').on('mouseover', function() {
			return false;
		});

		$(elementTarget).off('tap').on('tap', function(e) {
			$(elementTarget).each(function() {
				$(this).removeClass('ui-btn-active');
			});

			var node = e.target;

			while (true) {
				if (node.nodeName !== "A")
					node = node.parentElement;
				else
					break;
			}

			$(node).addClass('ui-btn-active');
		});
	};

	// 圖片轉黑白
	MPF_ui_.grayscaleImage = function(id, imgObj, callback) {
		var canvas = document.createElement('canvas');
		var canvasContext = canvas.getContext('2d');

		// Make in memory copy of image to avoid css issues
		$("<img/>")
				.attr("src", imgObj.src)
				.load(
						function() {
							var imgW = this.width;
							var imgH = this.width;
							canvas.width = imgW;
							canvas.height = imgH;

							canvasContext.drawImage(imgObj, 0, 0);
							var imgPixels = canvasContext.getImageData(0, 0,
									imgW, imgH);

							for (var y = 0; y < imgPixels.height; y++) {
								for (var x = 0; x < imgPixels.width; x++) {
									var i = (y * 4) * imgPixels.width + x * 4;
									//彩色變灰階（ RGB 相加除以三）
									var avg = (imgPixels.data[i]
											+ imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
									imgPixels.data[i] = avg;
									imgPixels.data[i + 1] = avg;
									imgPixels.data[i + 2] = avg;

									// http://users7.jabry.com/overlord/mug.html
									//	                    var newColor = MPF_UI.hexToRGB('#006060');
									//	                    imgPixels.data[i] = imgPixels.data[i] / 255 * newColor.R;
									//	                    imgPixels.data[i + 1] = imgPixels.data[i + 1] / 255 * newColor.G;
									//	                    imgPixels.data[i + 2] = imgPixels.data[i + 2] / 255 * newColor.B;
								}
							}

							canvasContext.putImageData(imgPixels, 0, 0, 0, 0,
									imgPixels.width, imgPixels.height);

							callback({
								id : id,
								originalImg : imgObj.src,
								desaturateImg : canvas.toDataURL(),
								msg : ""
							});
						});
	};
})(MPF_UI);
