import {
    RECORD_USERINFO,
	GET_USERINFO,
	CART_NUM,
	OUT_LOGIN,
	CHOOSE_ADDRESS,
	ORDER_INDEX,
} from './mutation-types.js'
import {setStore, getStore} from '../config/mUtils'
export default {
    // 记录用户信息
    [RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		// setStore('userInfo', info);
	},
	// 记录购物车数量
	[CART_NUM](state,info){
		state.cartlist=info;
		// setStore('cartlist', info);
	},
    // 获取用户信息存入vuex
    [GET_USERINFO](state, info) {
		if (state.userInfo && (state.userInfo.username !== info.username)) {
			return;
		};
		if (!state.login) {
			return
		}
		if (!info.message) {
			state.userInfo = {...info};
		} else {
			state.userInfo = null;
		}
	},
	// 退出登录
	[OUT_LOGIN](state){
		state.userInfo = {};
		state.login = false;
		state.addressid=null;
		state.addindex=null;
		state.cartlist={};
		state.orderindex=null;
	},
	// 选择地址
	[CHOOSE_ADDRESS](state,{address,index}){
		state.addressid=address
		state.addindex=index;
	},
	// 订单索引
	[ORDER_INDEX](state,index){
		state.orderindex=index
	}
}