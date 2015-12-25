
/* JavaScript content from js/core/dynamicLoadJsFileManager.js in folder common */
/**
 * dynamicLoadJsFileManager : DLJFM ( 動態載入JS File管理物件 )
 * 說明 : 為提升APP啟動速度,除主要相關的Javascript以直接載入的方式外,其他的Javascript改採用動態載入方式進行
 */
DLJFM = {    
	JsFileTable : {
		/* 這裡請配置需要動態載入的MAPP物件 */
		MAPP001070 : {
			id : "MAPP001070",
    		path : "apps/MAPP001070/js/MAPP001070.js"
    	},
    	MAPP001001 : {
			id : "MAPP001001",
    		path : "apps/MAPP001001/js/MAPP001001.js"
    	},
    	MAPP001002 : {
    		id : "MAPP001002",
    		path : "apps/MAPP001002/js/MAPP001002.js"
    	},
    	MAPP001002_1 : {
    		id : "MAPP001002_1",
    		path : "apps/MAPP001002/js/MAPP001002_1.js"
    	}
    	/* 以下為多重載入的範例 - 以jqplot為例 */
    	/*JQPLOT : {
    		id : "JQPLOT",
            obj : "$.jqplot", // 物件存取地方
    		path : 
    		[
				"js/jqplot/jquery.jqplot.min.js",
				"js/jqplot/jqplot.cursor.min.js",
				"js/jqplot/jqplot.barRenderer.min.js",
				"js/jqplot/jqplot.canvasAxisTickRenderer.min.js",
				"js/jqplot/jqplot.canvasTextRenderer.min.js",
				"js/jqplot/jqplot.canvasOverlay.min.js",
				"js/jqplot/jqplot.categoryAxisRenderer.min.js",
				"js/jqplot/jqplot.highlighter.min.js",
				"js/jqplot/jqplot.enhancedLegendRenderer.min.js",
				"js/jqplot/jqplot.dateAxisRenderer.min.js",
				"js/jqplot/jqplot.ohlcRenderer.min.js"
    		]
    	}*/
    },
    
    /**
     * @param id
     * @param callback
     */
    callObjMethodAndDynamicLoadJsFile : function(jsFileObj, callback){
    	if(jsFileObj.path instanceof Array){
    		if(eval(jsFileObj.obj) === undefined){
    			this.multiLoading(jsFileObj.path, callback);
    		}
    		else{
    			if(callback)
    				callback();
    		}
    	}
    	else{
    		if(window[jsFileObj.id] === undefined || window[jsFileObj.id].length !== undefined || window[jsFileObj.id] instanceof HTMLElement){
        		var options = $.extend(options || {}, { 
        			dataType: "script",
        			async : false,
        			url: $.MPF.host + jsFileObj.path, 
        			cache:true //加上緩存
        		}); 
        			
        		$.ajax(options).done($.proxy(function() {
        			if(callback)
        				callback(window[jsFileObj.id]);
    		    }, this)).fail(function(){
    		    	MPF_UI.alert(jsFileObj.id + " js file load fail");
    		    });
        	}else{
        		if(callback)
        			callback(window[jsFileObj.id]);
        	}
    	}
    },
    
    /**
     * 下載dataTransfer JS File 用
     * @param id
     * @returns {Boolean}
     */
    justLoadJsfile : function(id){
    	var rs = true;
    	var options = $.extend(options || {}, { 
			dataType: "script",
			async : false,
			url: $.ML.host + this.JsFileTable[id].path, 
			cache:true //加上緩存
		}); 
			
		$.ajax(options).fail(function(){
			rs = false;
	    	ML_UI.alert(id + " js file load fail");
	    });
		
		return rs;
    },
    
    multiLoading : function(urls, callback){
    	if(urls.length > 0){    		
    		var options = $.extend(options || {}, { 
    			dataType : "script",
    			async : false,
    			url : $.ML.host + urls[0],
    			cache : true //加上緩存
    		}); 
    		
    		urls.shift(); 			
    		$.ajax(options).done($.proxy(function() {
    			if(urls.length === 0){
    				callback();
    			}
    	    }, this)).fail(function(){
    	    	MPF_UI.alert("multiLoading js file load fail");
    	    });
    		
    		return this.multiLoading(urls, callback);
    	}
    }
};