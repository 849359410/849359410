import heads from "../mutationHead";

const state = {
	isLogin: false
};

const mutations = {
	[heads.IS_LOGIN](state, isLogin) {
		state.isLogin = isLogin;
	},
};

const getters = {
	letMoney: (state) => {
		console.log('IS_LOGIN', state.isLogin);
		// 假设我这里存了一个数组
		return [
			{
				name: 'heheh',
				list: [
					{ fc: 'ks' }
				]
			},
			{
				name: 'heheh',
				list: [
					{ fc: 'ks' }
				]
			}
		]
	}
};

export default {
	state,
	getters,
	mutations
}
