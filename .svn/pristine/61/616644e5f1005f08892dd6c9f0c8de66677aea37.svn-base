
/* JavaScript content from js/core/NodeFlowControl.js in folder common */
/***********************************************
 * singleton appNodeFlow,負責控制管理頁面切換流程
 ***********************************************/

appNodeFlow = {
    nodeLst : [],
    nodeCallback : [],
    
    //重新導向新的起始頁,obj為要重新導向的起始頁面值,option為要重導的參數
    resetToStartNode : function(obj, option){
    	if(obj && typeof(obj) != 'object'){
			MPF_LOG.debug("appNodeFlow Err... : 參數非MAPP物件,無法建立節點");
		}
		else{
	    	MPF_LOG.debug("resetToStartNode");
	    	MPF_LOG.debug("option: " + JSON.stringify(option));
	    	this.resetNodes(false);
	    	
	    	if(option === undefined || option === null)
	    		obj.goIndex();
	    	else
	    		obj.goIndex(option);
		}
    }, 
    
    isFirstNode: function() {
    	return this.nodeLst.length == 0 ? true : false;
    },
    
    // 調整使用Framework7 Page基本調整
    migrateF7Page: function(mapp){
    	console.log("migrateF7Page");
    	console.log(mapp.currentId);
    	var headerHeight = 41;
    	$("#"+mapp.currentId).height($(document).height() - headerHeight);
    	console.log("height : " + $("#"+mapp.currentId).height());
    },
    
    //在Flow中新增一個節點記錄
	appendNode : function(obj, callback) {
		MPF_LOG.debug("appendNode : start");

		
		if(obj && typeof(obj) != 'object'){
			MPF_LOG.debug("appNodeFlow Err... : 參數非MAPP物件,無法建立節點");
		}
		else{						
			var headerElement = $.mobile.activePage.find("#headerFlow");
			
			this.migrateF7Page(obj);
			
			if(this.nodeLst.length == 0){
				// headerElement.attr('.ui-btn-text').text("首頁");
				// headerElement.attr('src', $.MPF.host + "images/Header_icon_home.png");
			}
			else{
				// headerElement.find('.ui-btn-text').text("離開");
				// headerElement.attr('src', $.MPF.host + "images/Header_icon_undo.png");
			}
			
			MPF_LOG.debug("the callback is :" + callback);
			this.nodeLst.push(obj);
			this.nodeCallback.push((callback != undefined && callback != null) ? callback : null);
			
			//jQuery.proxy(function,context)
			headerElement.add("#headerFlow").on('click', $.proxy(function() {
				MPF_LOG.debug("appendNode : click");				

//				if("首頁" == headerElement.text()){
				if(headerElement.attr('src') === $.MPF.host + "images/Header_icon_home.png"){
					this.toMenuPage();
				}
				else{
					MPF_LOG.debug(this.nodeLst.toString());
					//離開當前這一頁的節點狀況判斷
					var node = this.nodeCallback[this.nodeLst.length - 1];
					
					if("function" == typeof(node)){
						//如果要離開當前頁面狀況是一個call back,則依照call back處理
						MPF_LOG.debug("node is callback function");
						node();
					}
					else{
						//如果只是MAPP物件,則要處理的機制就是再往前取得要回去的MAPP頁面物件
						MPF_LOG.debug("node is not a callback function");
						this.nodeLst.pop();
						this.nodeCallback.pop();
						this.nodeCallback.pop();
						
						var backNodeObj = this.nodeLst.pop();
						backNodeObj.goIndex();
					}
				}
				
			}, this));
		}
	},
	
	//清掉所有的節點記錄
	//isMenuNode : 是否要連首頁的Node都清掉
	resetNodes : function(isMenuNode){
		MPF_LOG.debug("clear flow nodes");		
		// MPF_LOG.debug( "before clear.......HistotyCount = )" + $.mobile.urlHistory.stack.length);
		
		// if($.mobile.urlHistory !== null && $.mobile.urlHistory !== 'undefined'){			
		// 	while($.mobile.urlHistory.stack.length - 1 > 0){
		// 		$.mobile.urlHistory.stack.pop();
		// 		$.mobile.urlHistory.activeIndex--;
				
		// 		if($.mobile.urlHistory.stack[$.mobile.urlHistory.stack.length - 1].url.indexOf("/default/core/main/IndexApps.html") > 0){
		// 			if(isMenuNode){
		// 				$.mobile.urlHistory.stack.pop();
		// 				$.mobile.urlHistory.activeIndex--;
		// 			}
					
		// 			break;
		// 		}
		// 	}
		// }
		
		// MPF_LOG.debug( "after clear.......HistotyCount = )" + $.mobile.urlHistory.stack.length);
		this.nodeLst = [];
		this.nodeCallback = [];
	},
	
	//強制退回到第一個節點記錄,如果已經是第一個節點則不做任何事情
	backToFirstNode : function(){
		var headerElement = $.mobile.activePage.find("#headerFlow");
		
//		if("首頁" !== headerElement.text()){
		if(headerElement.attr('src') !== $.MPF.host + "images/Header_icon_home.png"){
			MPF_LOG.debug(this.nodeLst.toString());
			//取得第一個節點
			this.resetToStartNode(this.nodeLst[0]);
		}
	},
	
	//強制退回到上一個節點記錄的頁面,不理會這次頁面是否有用到callback的機制
	toPrevNode : function(option){
		MPF_LOG.debug("...... appNodeFlow ) toPrevNode");
		var headerElement = $.mobile.activePage.find("#headerFlow");
		
//		if("首頁" == headerElement.text()){
		if(headerElement.attr('src') === $.MPF.host + "images/Header_icon_home.png"){
			this.toMenuPage();
		}
		else{
			MPF_LOG.debug(this.nodeLst.toString());
			this.nodeLst.pop();
			this.nodeCallback.pop();
			this.nodeCallback.pop();
			var backNode = this.nodeLst.pop();
			
			if(option === undefined || option === null)
				backNode.goIndex();
	    	else
	    		backNode.goIndex(option);
		}
	},
	
	//頁面跳轉但是維持在目前的歷史節點
	replaceCurrentNode : function(obj, option){
		MPF_LOG.debug("...... appNodeFlow ) replaceCurrentNode");
		
		if(obj && typeof(obj) != 'object'){
			MPF_LOG.debug("appNodeFlow Err... : 參數非MAPP物件,無法建立節點");
		}
		else{			
			MPF_LOG.debug(this.nodeLst.toString());
			this.nodeLst.pop();
			this.nodeCallback.pop();
			
			if(option === undefined || option === null)
				obj.goIndex();
	    	else
	    		obj.goIndex(option);
		}
	},

	//回到首頁
	toMenuPage : function(){
		this.resetNodes(true);		
		INDEX.goIndex();
	},
	
	getPrevNode: function() {
		if(this.nodeLst !== undefined && this.nodeLst.length >= 2)
			return this.nodeLst[this.nodeLst.length - 2];
		else
			return INDEX;
	}
};



// /*******************************************************************************
//  * singleton appNodeFlow,負責控制管理頁面切換流程
//  ******************************************************************************/
// appNodeFlow = {
// 	nodeLst : [],
// 	nodeCallback : [],

// 	// 重新導向新的起始頁,obj為要重新導向的起始頁面值,option為要重導的參數
// 	resetToStartNode : function(obj, option) {
// 		if (typeof (obj) != 'object') {
// 			MPF_LOG.debug("appNodeFlow Err... : 參數非MAPP物件,無法建立節點");
// 		} else {
// 			MPF_LOG.debug("resetToStartNode");
// 			MPF_LOG.debug("option: " + JSON.stringify(option));
// 			this.resetNodes(false);

// 			if (option === undefined || option === null)
// 				obj.goIndex();
// 			else
// 				obj.goIndex(option);
// 		}
// 	},
	
// 	toEventStartPage : function(obj, option) {
// 		if (typeof (obj) != 'object') {
// 			MPF_LOG.debug("appNodeFlow Err... : 參數非MAPP物件,無法建立節點");
// 		} else {
// 			this.nodeLst = [];
// 			this.nodeCallback = [];
			
// 			appNodeFlow.nodeInit(SYSTEM);
// 			appNodeFlow.nodeInit(MAPP000001);
			
// 			if (option === undefined || option === null)
// 				obj.goIndex();
// 			else
// 				obj.goIndex(option);
// 		}
// 	},

// 	isFirstNode : function() {
// 		return this.nodeLst.length == 0 ? true : false;
// 	},
	
// 	// 在Flow中新增一個節點記錄
// 	nodeInit : function(obj, callback) {
// 		// 所有頁面切換都必須受到NodeFlowControl的控制,所以這邊可以處理interval電文的reqObj
// 		MPF_LOG.debug("appendNode : start");
// 		MPF_LOG.debug(".......HistotyCount  )"
// 				+ $.mobile.urlHistory.stack.length);

// 		if (typeof (obj) != 'object') {
// 			MPF_LOG.debug("appNodeFlow Err... : 參數非MAPP物件,無法建立節點");
// 		} else {
// 			var headerElement = $.mobile.activePage.find("#headerFlow");

// 			if (this.nodeLst.length == 0) {
// 				headerElement.find('.ui-btn-text').text("回首頁");
// 				// headerElement.find('.ui-btn-text').html(
// 				// 		'<img class="headerBtnImg" src="../../images/event/back.png">');
// 			} else {
// 				headerElement.find('.ui-btn-text').text("上一頁");
// 				// headerElement.find('.ui-btn-text').html(
// 				// 		'<img class="headerBtnImg" src="../../images/event/back.png">');
// 			}

// 			MPF_LOG.debug("the callback is :" + callback);
// 			this.nodeLst.push(obj);
// 			this.nodeCallback
// 					.push((callback != undefined && callback != null) ? callback
// 							: null);

// 			// jQuery.proxy(function,context)
// 			headerElement.off().on('click', $.proxy(function() {

// 				// 若有"回首頁"的需求，必須實作
// 				// if("回首頁" == headerElement.text().trim()){
// 				// this.toMenuPage();
// 				// }
// 				if (this.nodeLst.length == 1) {
// 					this.toMenuPage();
// 				} else {
// 					MPF_LOG.debug(this.nodeLst.toString());
// 					// 上一頁當前這一頁的節點狀況判斷
// 					var node = this.nodeCallback[this.nodeLst.length - 1];

// 					if ("function" == typeof (node)) {
// 						// 如果要上一頁當前頁面狀況是一個call back,則依照call back處理
// 						MPF_LOG.debug("node is callback function");
// 						node();
// 					} else {
// 						// 如果只是MAPP物件,則要處理的機制就是再往前取得要回去的MAPP頁面物件
// 						MPF_LOG.debug("node is not a callback function");
// 						this.nodeLst.pop();
// 						this.nodeCallback.pop();
// 						this.nodeCallback.pop();
// 						var backNodeObj = this.nodeLst.pop();

// 						if (backNodeObj != undefined) {
// 							backNodeObj.goIndex(backNodeObj.session, {
// 								transition : "none",
// 								reverse : true
// 							});	
// 						}
// 					}
// 				}

// 			}, this));
// 		}
// 	},

// 	// 清掉所有的節點記錄
// 	// isMenuNode : 是否要連回首頁的Node都清掉
// 	resetNodes : function(isMenuNode) {
// 		MPF_LOG.debug("clear flow nodes");
// 		MPF_LOG.debug("before clear.......HistotyCount = )"
// 				+ $.mobile.urlHistory.stack.length);

// 		if ($.mobile.urlHistory !== null && $.mobile.urlHistory !== 'undefined') {
// 			while ($.mobile.urlHistory.stack.length - 1 > 0) {
// 				$.mobile.urlHistory.stack.pop();
// 				$.mobile.urlHistory.activeIndex--;

// 				if ($.mobile.urlHistory.stack[$.mobile.urlHistory.stack.length - 1].url
// 						.indexOf("/default/core/main/IndexApps.html") > 0) {
// 					if (isMenuNode) {
// 						$.mobile.urlHistory.stack.pop();
// 						$.mobile.urlHistory.activeIndex--;
// 					}

// 					break;
// 				}
// 			}
// 		}

// 		MPF_LOG.debug("after clear.......HistotyCount = )"
// 				+ $.mobile.urlHistory.stack.length);
// 		this.nodeLst = [];
// 		this.nodeCallback = [];
// 	},

// 	// 強制退回到第一個節點記錄,如果已經是第一個節點則不做任何事情
// 	backToFirstNode : function() {
// 		var headerElement = $.mobile.activePage.find("#headerFlow");
// 		console.log("[backToFirstNode]");
// 		if ("回首頁" !== headerElement.text().trim()) {
// 			MPF_LOG.debug(this.nodeLst.toString());
// 			// 取得第一個節點
// 			this.resetToStartNode(this.nodeLst[0]);
// 		}
// 	},

// 	// 強制退回到上一個節點記錄的頁面,不理會這次頁面是否有用到callback的機制
// 	toPrevNode : function(option,reload) {
// 		console.log("to prevNode!");
// 		MPF_LOG.debug("...... appNodeFlow ) toPrevNode");
// 		var headerElement = $.mobile.activePage.find("#headerFlow");

// 		if ("回首頁" == headerElement.text().trim()) {
// 			this.toMenuPage();
// 		} else {
// 			MPF_LOG.debug(this.nodeLst.toString());
// 			this.nodeLst.pop();
// 			this.nodeCallback.pop();
// 			this.nodeCallback.pop();
// 			var backNode = this.nodeLst.pop();

// 			if (option === undefined || option === null){
// 				if( reload !== undefined && reload )
// 					backNode.goIndex(backNode.session);
// 				else {
// 					backNode.goIndex(backNode.session, {
// 						transition : "none",
// 						reverse : true
// 					});
// 				}
// 			}
// 			else
// 				backNode.goIndex(option, {
// 					transition : "none",
// 					reverse : true
// 				});
// 		}
// 	},
	
// 	// 指定到某頁面
// 	popToTargetNode : function(targetMappID,_opt) {
// 		var mapp;
// 		while(mapp = this.nodeLst.pop()) {
// 			this.nodeCallback.pop();
// 			if(mapp.currentId == targetMappID) {				
// 				if (_opt === undefined || _opt === null)
// 					mapp.goIndex();
// 				else
// 					mapp.goIndex(_opt);
// 				break;
// 			}
// 		}		
// 	},

// 	// 頁面跳轉但是維持在目前的歷史節點
// 	replaceCurrentNode : function(obj, option) {
// 		MPF_LOG.debug("...... appNodeFlow ) replaceCurrentNode");

// 		if (typeof (obj) != 'object') {
// 			MPF_LOG.debug("appNodeFlow Err... : 參數非MAPP物件,無法建立節點");
// 		} else {
// 			MPF_LOG.debug(this.nodeLst.toString());
// 			this.nodeLst.pop();
// 			this.nodeCallback.pop();

// 			if (option === undefined || option === null)
// 				obj.goIndex();
// 			else
// 				obj.goIndex(option);
// 		}
// 	},

// 	// 頁面跳轉但是維持在目前的歷史節點
// 	appendNode : function(obj, option) {
// 		MPF_LOG.debug("...... appNodeFlow ) replaceCurrentNode");

// 		if (typeof (obj) != 'object') {
// 			MPF_LOG.debug("appNodeFlow Err... : 參數非MAPP物件,無法建立節點");
// 		} else {
// 			MPF_LOG.debug(this.nodeLst.toString());
// 			if (option === undefined || option === null)
// 				obj.goIndex();
// 			else
// 				obj.goIndex(option);
// 		}
// 	},

// 	// 回到回首頁
// 	toMenuPage : function() {
// 		this.resetNodes(true);
// 		SYSTEM.goIndex();
// 	},

// 	getPrevNode : function() {
// 		if (this.nodeLst !== undefined && this.nodeLst.length >= 2)
// 			return this.nodeLst[this.nodeLst.length - 2];
// 		else
// 			return INDEX;
// 	}
// };