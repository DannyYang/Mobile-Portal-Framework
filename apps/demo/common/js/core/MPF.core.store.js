/**
 * 封裝MobileFirst JSON store API
 */

(function($) {
	MPF_STORE = $.MPF.store = {
		/*取得使用者的帳號密碼*/
		userProfile : {
			/*User Profile Schema*/
			collections :  {
				userProfile : {
					searchFields: {account: 'string', password: 'string'}
				}
			},
			checkData : function(dataObj) {
				if(dataObj.account !== undefined && dataObj.password !== undefined) {
					return true;
				}
				return false;
			},
			saveUserProfile : function(dataObj, success, fail) {
				var msg ={
						
				};
				if(MPF_STORE.userProfile.checkData(dataObj)) {


					WL.JSONStore.init(MPF_STORE.userProfile.collections).then(function (collections) {
						
					}).fail(function (error) {
						
					});
				} else {
					
				}
			},
			deleteUserProfile : function(account, success, fail) {
				WL.JSONStore.init(MPF_STORE.userProfile.collections).then(function (collections) {
					var query = { "account" : account};					 					 
					var options = {exact: true};
					 
					WL.JSONStore.get("userProfile").remove(query, options).then(function (numberOfDocsRemoved) {
						
					}).fail(function (error) {
						
					});
				}).fail(function (error) {
					
				});
			},
			getUserProfile : function(success, fail) {
				var collections = {
						userProfile : {
							searchFields: {account: 'string', password: 'string'}
						}
				};

				WL.JSONStore.init(collections).then(function (collections) {
					var query = {account: 'yoel'};
					 
					var collectionName = 'people';
					 
					var options = {
					  exact: true, //default
					  limit: 10 // returns a maximum of 10 documents, default: return every document
					 
					};
					 
					collections.find(query, options).then(function (results) {
						
					}).fail(function (error) {
						
					});
				}).fail(function (error) {
					
				});
			}
		}
	};
})(jQuery);