import Vue from 'vue'
import Router from 'vue-router'
const index = r => require.ensure([], () => r(require('@/page/index/index')), 'index')
const cartpay = r => require.ensure([], () => r(require('@/page/cartpay/cartpay')), 'cartpay')
const my = r => require.ensure([], () => r(require('@/page/my/my')), 'my')
const list = r => require.ensure([], () => r(require('@/page/list/list')), 'list')
const order = r => require.ensure([], () => r(require('@/page/order/order')), 'order')
const addressList = r => require.ensure([], () => r(require('@/page/address/address-list')), 'addressList')
const addAddress = r => require.ensure([], () => r(require('@/page/address/children/addAddress')), 'addAddress')
const login = r => require.ensure([], () => r(require('@/page/login/login')), 'login')
const details = r => require.ensure([], () => r(require('@/page/details/details')), 'details')
const orderlist = r => require.ensure([], () => r(require('@/page/orderlist/orderlist')), 'orderlist')
const detail = r => require.ensure([], () => r(require('@/page/orderlist/children/detail')), 'detail')
const pay = r => require.ensure([], () => r(require('@/page/pay/pay')), 'detail')
const collection = r => require.ensure([],() => r(require('@/page/my/children/collection')),'collection')
const aftersales = r => require.ensure([],() => r(require('@/page/aftersales/aftersales')),'aftersales')
const apply = r => require.ensure([],() => r(require('@/page/aftersales/children/apply')),'apply')
const detref = r => require.ensure([],()=> r(require('@/page/orderlist/children/detrefund')),'detref')
const activity = r => require.ensure([],() => r(require('@/page/activity/activity')),'activity')
const coupons = r =>require.ensure([],()=> r(require('@/page/my/children/coupons')),'coupons')
const realname = r =>require.ensure([],()=>r(require('@/page/realname/realname')),'realname')
const addcard = r =>require.ensure([],()=>r(require('@/page/realname/children/addcard')),'addcard')
const logex = r => require.ensure([], () => r(require('@/page/my/children/logex')), 'logex')  //退出登录页，无用

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        keepAlive: true, // 需要被缓存
        title:'酩创商城'
      }
    },
    // 列表页
    {
      path:'/list',
      component:list
    },
    // 购物车
    {
      path:'/cartpay',
      name:'cartpay',
      component:cartpay,
        meta:{
        // 添加该字段，表示进入这个路由是需要登录的
        title: '购物车'
      }
    },
    // 个人中心页
    {
      path:'/my',
      name:'my',
      component:my,
      meta:{
        title: '个人中心'
      },
      children:[{
        path:'collection',
        component:collection,
        meta:{
          requireAuth:true,
          title:'我的收藏'
        }
      },{
        path:'coupons',
        component:coupons,
        meta:{
          requireAuth:true,
          title:'我的优惠券'
        }
      }]
      // children:[{
      //   path:'logex',
      //   component:logex,
      //   meta:{
      //     // 添加该字段，表示进入这个路由是需要登录的
      //     requireAuth: true, 
      //   } 
      // }]
    },
    // 商品详情
    { 
      path:'/details',
      component:details
    },
    // 确认订单
    {
      path:'/order',
      component:order,
        meta:{
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,  
        title:'确认订单'
      }
    },
    // 订单列表
    {
      path:'/orderlist',
      component:orderlist,
      meta:{
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true, 
        title:'我的订单'
      } ,
      children:[{
        path:'detail',
        component:detail,
        meta:{
          title:'订单详情'
        }
      },{
        path:'detref',
        component:detref,
        meta:{
          title:'退款详情'
        }
      }]
    },
    {
      path:'/pay',
      component:pay,
      meta:{
        title:'确认支付'
      }
    },
    // 地址列表
    {
      path:'/addressList',
      component:addressList,
      meta:{
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true, 
        title:'我的地址'
      },
      children: [{
        path:'addAddress',
        component:addAddress,
        meta:{
          title:'地址编辑'
        }
      },]
    },
    // 登录
    {
      path:'/login',
      component:login,
      meta:{
        title:'登录'
      }
    },
    // 售后
    {
      path:'/aftersales',
      component:aftersales,
      meta:{
        title:'售后申请'
      },
      children:[{
        path:'apply',
        component:apply,
        meta:{
          title:'填写申请'
        }
      },{
        path:'detref',
        component:detref,
        meta:{
          title:'退款详情'
        }
      }]
    },
    // 活动促销
    {
      path:'/activity',
      component:activity,
      meta:{
        title:'活动促销'
      }
    },
    // 实名认证页
    {
      path:'/realname',
      component:realname,
      meta:{
        title:'实名认证'
      },
      children:[{
        path:'addcard',
        component:addcard,
        meta:{
          title:'身份信息'
        }
      }]
    }
  ]
})
