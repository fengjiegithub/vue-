import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)
const state = {
  userInfo: null, //用户信息
  login: false,//是否登录,
  addressid:null, //地址id
  addindex:null, // 选择地址索引值
  cartlist:{}, 
  orderindex:null,  //订单索引
};
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [createPersistedState()] 
})
 