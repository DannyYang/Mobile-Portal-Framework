
/* JavaScript content from js/core/MPF.core.cache.js in folder common */
/**
 * 暫存使用者資訊
 */

(function($) {
	MPF_CACHE = $.MPF.cache = {
		/*取得使用者的帳號相關資訊*/
		userProfile : {
			userProfileKey : "MPF_USERPROFILE",
			saveUserProfile : function(dataObj) {
				localStorage[MPF_CACHE.userProfile.userProfileKey] = JSON.stringify(dataObj);
			},
			deleteUserProfile : function() {
				delete localStorage[MPF_CACHE.userProfile.userProfileKey];
			},
			getUserProfile : function() {
				var userProifleStr = localStorage[MPF_CACHE.userProfile.userProfileKey];
				if(userProifleStr == undefined){
					return undefined;
				}
				return JSON.parse(userProifleStr);
			}
		}
	};
})(jQuery);