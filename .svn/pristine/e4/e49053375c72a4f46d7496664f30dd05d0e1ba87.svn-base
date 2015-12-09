
/* JavaScript content from js/core/io/MPF.ajax.mobile.js in folder common */
/*
 * 
 * 
 * */
(function($) {
	var netErrMsg = "網路連線異常,請檢查網路";
	var defaultOpt={
			url : undefined,
			type:MPF_IO.ajax.type.POST,
			params : undefined,
			isAsync:undefined,
			timeout : 60000,
			success : function(obj) {
				MPF_LOG.info("Default success handler! ",JSON.stringify(obj));
			},
			fail : function(obj){ 
				MPF_LOG.error("Default fail handler! ",JSON.stringify(obj));
			}	
		}; 
	//IE 6,7不支援Cross Domain AJAX．
	if($.browser.msie && parseFloat( $.browser.version) < 8.0){
		MPF_UI.alert("IE瀏覽器不支援IE8以下版本");
		return;
	}	
	
	MPF_IO.set({
		// 套件的版本編號
		version : "0.0.1",
		// 對應SVN的revision編號
		revision : "2015/01/28",
		// 版本說明
		msg : "AJAX Plugin",
		name : MPF_IO.ajax.name,
		// 最後修改者
		author : 'Danny',
		send : function(option) {
			sendRequest(option);
		}
	});
	
	var sendRequest = function(option) {
		var _options = $.extend({}, defaultOpt, option);
		MPF_LOG.trace("Sending ajax to url :",_options.url," with type : ",_options.type);
		if(_options.url && !_options.url.isEmpty()){
			if ($.browser.msie && 
				(parseFloat($.browser.version) >= 8.0 && parseFloat( $.browser.version) <= 9.0) &&
				window.XDomainRequest) {
			    // Use Microsoft XDR
				MPF_LOG.trace("IN IE : ",$.browser.version,"Sendig ajax with XDomainRequest.");
			    var xdr = new XDomainRequest();
			    xdr.open(_options.type, _options.url,true);
			    xdr.onerror = function(){
			    	CORE.closeLoading();
			    	_options.fail(new ERROR("網路問題",netErrMsg));
			    };
			    
			    xdr.onload = function () {
			    	CORE.closeLoading();
				    var JSON = $.parseJSON(xdr.responseText);
				    if (JSON == null || typeof (JSON) == 'undefined')
				    {
				        JSON = $.parseJSON(data.firstChild.textContent);
				    }
				    _options.success(JSON);
			    };
			    xdr.send(_options.params);
			}
			else{
				MPF_LOG.trace("NOT IE, Sendig ajax with $.ajax.");
				$.ajax({
					url : _options.url,
					type : _options.type,
					crossDomain: true,
					dataType : "json",			
					async : ((_options.isAsync === undefined) ? true : _options.isAsync),
					timeout : (_options.timeout===undefined ? 60000 : _options.timeout),
					data : _options.params,
					success : function(obj) {
						CORE.closeLoading();
						MPF_LOG.trace(JSON.stringify(obj));
						_options.success(obj);
					},
					error : function(request, status, error) {
						CORE.closeLoading();
						MPF_LOG.trace("status : ",status,", error : ",error);
						 _options.fail(new ERROR(status,netErrMsg));
					}
				});
			}
		}else{
			_options.fail(new ERROR('NO URL found!','NO URL found!'));
		}
	};

})(jQuery);