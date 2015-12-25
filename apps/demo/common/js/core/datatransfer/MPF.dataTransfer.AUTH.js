(function($) {
	
	var defaultOpt={
		action : undefined,
		data : undefined,
		isAsync:undefined,
		success : function(obj) {
			MPF_LOG.info("Default dataTransfer success handler! ",JSON.stringify(obj));
		},
		fail : function(obj){ 
			MPF_LOG.error("Default dataTransfer fail handler! ",JSON.stringify(obj));
		}	
	}; 
	
	MPF_DATA.set({
		// 套件的版本編號
		version : "0.0.1",
		// 對應SVN的revision編號
		revision : "1",
		// 版本說明
		msg : "帳/密驗證的PLUGIN",
		name : MPF_CHANNEL.auth.name,
		// 最後修改者
		author : 'Danny',
		call : function(options) {
			var _options = $.extend({}, defaultOpt, options);
			if(_options.action && funcList[_options.action]){
				funcList[_options.action](_options);
			}else{
				_options.fail(new ERROR("查無action : "+_options.action,"查無action : "+_options.action));
			}
		}
	});
	
	var callNet=function(url,params, options){
		MPF_LOG.debug("call url: ", url);
		MPF_LOG.debug("input param: ",JSON.stringify( params));
		var netOption = {
			'url' : url,
			'params' : params,
			'success' : function(obj){
				MPF_LOG.trace(JSON.stringify(obj));
				options.success(obj);
			},
			'fail' : function(obj){
				MPF_LOG.trace(JSON.stringify(obj));
				options.fail(obj);
			}
		};
		MPF_LOG.debug("send param: ", JSON.stringify(netOption));
		// 暫時不呼叫ajax，直接呼叫登入成功的function
		options.success({});
		// 發送ajax請直接用此
		// MPF_IO.get(MPF_IO.ajax).send(netOption);
	};
	
	/**
	 * 功能列表
	 * login: 進行帳號密碼的驗證.
	 * logout: 登出系統.
	 */
	var funcList = {
		//進行帳號密碼的驗證
		login : function(options) {
			console.log("[AUTH Login] uid="+options.data.uid+",pass="+options.data.pass);
			var p = MPF_UTIL.pushArgs2Array($.MPF.serverUrl,'CORE000', "CFUN000000.json").join("/");
			var _device_uuid='WebEnv', previewCode = new Date(), _env;
			if($.MPF.env == 'iphone' || $.MPF.env == 'ipad'){
				_env='ios';
			}
			if(window.device){
				_device_uuid=(_env== WL.Environment.PREVIEW ? previewCode.getTime(): device.uuid );
			}
			var params = MPF_UTIL.toParams({
				uid:options.data.uid,
				pass:options.data.pass,
				device_uuid:_device_uuid,
				device_os:$.MPF.env,
				push_token:$.MPF.push_token
			});
			console.log(JSON.stringify(params));
			callNet(p,params,options);	
		},
				
		//登出系統.
		logout : function(options) {
			options.fail(new ERROR("NOT implement!","NOT implement!"));
		}
	};

})(jQuery);