export default {
	PLUTO_API: {
		API_POST_SITE_LIST: { // 站点查询
			url: "site/getList",
			method: "post",
			requestType: 'json' // 0.form 1.json
		},
		API_POST_SITE_ADD: {  // 添加站点
			url: "site/add",
			method: "post",
			requestType: 'json'
		},
		API_POST_SITE_UPDATE: { // 修改站点
			url: "site/update",
			method: "post",
			requestType: 'json'
		},
		API_POST_SITE_STATUS: {  // 删除站点
			url: "site/changeStatus",
			method: "post",
			requestType: 'json'
		},
		API_POST_USER_REGISTER: { // 会员列表
			url: "user/register",
			method: "post",
			requestType: 'json'
		},
		API_POST_USER_MODIFY: {   // 修改会员资料
			url: "user/modify",
			method: "post",
			requestType: 'json'
		}
	}
}
