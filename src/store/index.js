import Vue from 'vue'
import Vuex from 'vuex'
import browserDetect from "browser-detect";
const isMobile = browserDetect().mobile;

Vue.use(Vuex)

let appId;
const url = window.location.href;
if (url.indexOf('localhost') > -1) {
	// 本機端專用
	appId = 802512919957868;
} else if (url.indexOf('eray') > -1) {
	// eray測試專用
	appId = 1037536119760883;
} else {
	// 正式
	appId = 502632516860590;
}
export default new Vuex.Store({
	state: {
		
		fb: {
			appId,
			accessToken: '',
			userID: ''
		},
		ui: {
			isMobile,
			page: 'homepage',
			nav: false,
			isShare: false,
			success_modal: {
				open: false,
				isMobile: true
			},
			rule_modal: false,
			loading_modal: false,
			ticketModal: false
		},
		song_num: Math.floor(Math.random() * 10),
		token: '',
		prize: {
			num: 0,
			code: '',
			err_code: '',
			msg: ''
		},
		ice: {
			phone: '',
			code: '',
			result: false,
			err_code: '',
			msg: ''
		}
	},
	mutations: {
		setPage(state, page) {
			state.ui.page = page;
			window.trackPage(page);
		},
		setFB(state, data) {
			state.fb = data;
		},
		setNav(state, value) {
			state.ui.nav = value;
		},
		setTick(state, value) {
			state.ui.ticketModal = value;
		},
		setShare(state, value) {
			state.ui.isShare = value;
		},
		setSong(state, num) {
			state.song_num = num;
		},
		setIce(state, data) {
			state.ice = data;
		},
		clearIce(state) {
			state.ice = {
				phone: '',
				code: '',
				result: false,
				err_code: '',
				msg: ''
			};
		},
		addToken(state, token) {
			state.token = token;
		},
		setPrize(state, data) {
			state.prize = data;
		},
		setSuccessModal(state, data) {
			state.ui.success_modal = data;
		},
		setRuleModal(state, value) {
			state.ui.rule_modal = value;
		},
		setLoading(state, value) {
			state.ui.loading_modal = value;
		}
	}
})