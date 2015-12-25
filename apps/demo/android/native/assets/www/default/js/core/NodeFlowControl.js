
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
    	var headerHeight = 41;
    	$("#"+mapp.currentId).height($(document).height() - headerHeight);
    },
    
    //在Flow中新增一個節點記錄
	nodeInit : function(obj, callback) {
		
		MPF_LOG.debug("appendNode : start");

		if(obj && typeof(obj) != 'object'){
			MPF_LOG.debug("appNodeFlow Err... : 參數非MAPP物件,無法建立節點");
		}
		else{						
			var headerElement = $.mobile.activePage.find("#headerFlow");
			
			this.migrateF7Page(obj);
			
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
						if(backNodeObj != undefined) {
							backNodeObj.goIndex();
						}
					}
				}
				
			}, this));
		}
	},
	
	//清掉所有的節點記錄
	//isMenuNode : 是否要連首頁的Node都清掉
	resetNodes : function(){
		MPF_LOG.debug("clear flow nodes");				
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
		MPF_LOG.debug("...... appNodeFlow > replaceCurrentNode");
		
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
	
	// 頁面跳轉並新增歷史節點
	appendNode : function(obj, option) {
		MPF_LOG.debug("MPF appNodeFlow > appendNode");
		if (typeof (obj) != 'object') {
			MPF_LOG.debug("appNodeFlow Err... : 參數非MAPP物件,無法建立節點");
		} else {
			MPF_LOG.debug(this.nodeLst.toString());
			if (option === undefined || option === null)
				obj.goIndex();
			else
				obj.goIndex(option);
		}
	},

	//回到首頁
	toMenuPage : function(){
		this.resetNodes();		
		INDEX.goIndex();
	},
	
	getPrevNode: function() {
		if(this.nodeLst !== undefined && this.nodeLst.length >= 2)
			return this.nodeLst[this.nodeLst.length - 2];
		else
			return INDEX;
	}
};