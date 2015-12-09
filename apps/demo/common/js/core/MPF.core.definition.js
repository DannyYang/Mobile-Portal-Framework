(function($) {
	ML_CHANNEL = $.ML.channel = {
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
				trailLogin : "trailLogin",
				trailApply : "trailApply",
				logout : "logout",
				validate:"validate",
				updateIndex: "updateIndex",
				updateFavorite: "updateFavorite",
				updateMain: "updateMain",
				resetAll: "resetAll"
			}
		},
		//證劵交易的資料交換介面
		mapp1000 : {
			name : "MAPP001000",
			action : {
				//證劵當日委託回報查詢(全)
				responseBack : "FUN0001",
				//證劵成交明細查詢
				dealResponseBack : "FUN0002",
				//當日預約單查詢
				qryReserveOrder: "FUN0003"
			}
		},
		//歷史資料
		history: {
			name: "HISTORY_IO",
			action: {
				getHistory : "HIS_READ",
				setHistory : "HIS_WRITE",
				delHistory : "HIS_DELETE"
			}
		},
	};

})(jQuery);