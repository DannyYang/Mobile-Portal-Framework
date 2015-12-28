
/* JavaScript content from js/core/dialog/js/MPF_Dialog.js in folder common */
var MPF_Dialog={
		// 套件的版本編號
		version : "0.0.1",
		// 對應SVN的revision編號
		revision : "2015/03/24",
		// 版本說明
		msg : "提供動態對話視窗",
		// 最後修改者
		author : 'Danny',
		currentId:'MPF_Dialog',
		//客制化SimpleDialog的Msg Queue
		dialogMsgQueue : {},
		dialogMsgBtnQueue : {},
		isShowDialog : false,
		openDialogType : undefined,
		callbackFun : undefined,
		isChangePage : false,
		certMsg : undefined,
		isAcceptMsg : true,
		msgImgData : [],
}; 

(function(_M){
	_M.showDialog = function(title, text){
		var msgObj = {
			title : title,
			text : text
		};		
		_M.openDialogType = undefined;
		_M.createDialog(msgObj);
	};
	
	_M.createDialog = function(msgObj){
		var id = "#MPF_Dialog";
		
		if(msgObj){
			$.ajax({
				"url" : $.MPF.host + "js/core/dialog/MPF_Dialog.html",
				"async" : false,
				"dataType" : "html",
				"success" : function (ohtml) {							
					if ($.mobile.popup.active) {
		                var popupDiv = $.mobile.popup.active.element;
		                popupDiv.each(function () { 
		                    if ($(this).parent().hasClass('ui-popup-active')) {				                    	
		                    		$(this).popup('close');
		                    }            
		                });
		            }

					$.mobile.activePage.append(ohtml);
					$.mobile.activePage.unbind("popupafterclose");
					$.mobile.activePage.bind("popupafterclose", ".ui-popup", function() {
						$(id).remove();
						if("function" == typeof(callbackFun)){
							callbackFun();
						}
					});
										
					$.mobile.activePage.off("popupafteropen").on("popupafteropen", id, function(event, ui) {
						$('#MPF_dialog_close').click(function(){
							$(id).popup('close');
						});
						
						$('#MPF_Dialog #msgTitle').text(msgObj.title);
						
						
						$('#MPF_Dialog #msgContent').html(msgObj.text);
				        
				        _M.orientation();
				    });
					
					$(id).popup();
					$(id).popup('open');
				}
			});
		}
	};
	
	_M.orientation = function(){
		$("#MPF_Dialog").popup("reposition", {positionTo: 'window'});
	};
	
})(MPF_Dialog);