import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import './config/rem'    //引入rem
import api from './api';        //导入api接口
import VDistpicker from 'v-distpicker'   //引入城市选择组件
import VueLazyLoad from 'vue-lazyload';   //vue图片懒加载
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
// mint-ui
Vue.use(Mint);
Vue.component('v-distpicker', VDistpicker) 
// api挂载  
Vue.config.productionTip = false
Vue.prototype.$api = api;        //挂载到原型上
//设置title
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
/* eslint-disable no-new */
// 对路由判断
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (store.state.login==true) {  // 通过vuex state获取当前的token是否存在
          next();
      }
      else {
          next({
              path: '/login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
});
Vue.use(VueLazyLoad,{
    attempt:10,
    loading:"data:image/png;base64,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",
    adapter:{},
  })
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
