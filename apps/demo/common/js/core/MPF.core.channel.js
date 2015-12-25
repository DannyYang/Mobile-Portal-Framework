(function($) {
	MPF_CHANNEL = $.MPF.channel = {
		//系統登入的資料交換介面(DEMO)
		auth : {
			name : "auth",
			action : {
				/**
				 * action功能列表
				 * login: 進行帳號密碼的驗證.
				 * logout: 登出系統.
				 * validate: 驗證USER是否有執行APP的權限.
				 */
				login : "login",
				logout : "logout"
			}
		}
	};
})(jQuery);