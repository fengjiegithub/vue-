# project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 项目布局
<pre>
|──build                        //webpack 配置文件
|——config                       //项目配置文件
|——dist                         //项目上线文件
|——src                          //源码目录
|   |——api                      //接口文件
|   |   |——appdata.js           //定义api接口
|   |   |——base.js              //接口域名管理
|   |   └──index.js             //api接口出口
|   |——assets                   //暂定
|   |——components               //公共组件
|   |     |——footer 
|   |     |  └── footer.vue     //底部公共组件 
|   |     |—— header
|   |     |    └── header.vue  //头部公共组件   
|   |     └──common             
|   |     |    └──popup.vue     //弹出提醒    
|   |——config                   //基本配置
|   |    |——mUtils.js           // 存储获取localstorage
|   |    |——rem.js              //px转换rem
|   |——page                     //项目页面
|   |    |──address             //地址页
|   |    |    |——children
|   |    |    |      └──addAddress.vue   //添加地址页
|   |    |    └──address-list.vue   //地址列表页
|   |    |——cartpay             
|   |    |    └──cartpay.vue    //购物车页
|   |    |——details             
|   |    |    └──details.vue    //商品详情页
|   |    |——index               
|   |    |    └──index.vue      //首页
|   |    |——list                
|   |    |    └──list.vue       //二级分类，搜索页
|   |    |——login               
|   |    |    └──login.vue      //登录页
|   |    |——my 
|   |    |  |—— children
|   |    |  |      └──collection.vue   //收藏
|   |    |  └──my.vue          //个人中心页
|   |    |      
|   |    |   
|   |    |——order               
|   |    |    └──order.vue      //订单结算页
|   |    |——orderlist           //订单列表页
|   |    |      |——children  
|   |    |      |     └──detail.vue   //订单详情页
|   |    |      └──orderlist.vue 
|   |    |——pay                 
|   |    |   └──pay.vue         //订单支付页
|   |——plugins                  //项目js插件
|   |    └──swiper.min.js        //轮播插件
|   |——router                   //路由
|   |    └──index.js            
|   |——stroe                    //vuex状态管理
|   |    |——action.js          //配置action
|   |    |——getters.js         //配置getters.vue
|   |    |——index.js            //引用vuex，创建store
|   |    |——mutation-types.js    // 定义常量muations名
|   |    └──mutations.js         //配置mutations
|   |——style                    
|   |    |——common.scss          //公共样式
|   |    |——mixin.scss           // 样式配置文件
|   |    └──swiper.min.css      //swiper插件样式
|   |——utils                    //封装axios
|   |    └──http.js              
|   |——App.vue                  //页面入口文件
|   |——main.js                  //程序入口文件，加载各种公共组件
</pre>
在vue 使用过程中所遇到的问题及一些解决方法
vue post 请求变成option
当不在同一个域名下时，访问接口需要跨域，然而在跨域时，浏览器会默认动帮你发一个OPTIONS请求，到服务器端请求服务器确认该请求的合法性，在这一过程中，可能发送的参数后端接收不到，这时需要使用引入qs将参数url进行转换
instance.interceptors.request.use(
  config=>{
    if(config.method  === 'post'){
      config.data = qs.stringify(config.data);
    }
    const token=store.state.token;
    token &&(config.headers.Authorization = token);
    return config;
  },
  error => Promise.error(error)
)

vue axios 请求接口 session 每次都变化解决办法
实现跨域请求时，每次axios请求都是新的session，导致无法获取登录信息，所有的请求都被判定为未登陆。
解决
在php中加入
header("Access-Control-Allow-Origin：http://服务器ip");  //需要将*改为具体的地址
axios
axios.defaults.withCredentials=true;

循环 vuele 放值
:value

vue地址选择器还得用插件，靠后台返回省市区信息非常缓慢

关于二级路由跳回一级路由，需要获取新数据的问题
可以设置给二级路由设置一个name，通过watch监听是否来自于二级路由，然后重新调用获取数据

vue 地址三级联动 在不用插件的情况下，根据返回来的数据输出地址，关于没有默认值得情况，可以
<option value="请选择省份">请选择省份</option>
<option v-for="item in province" :value="item.region_id" :key="item.region_id">{{item.region_name}}</option>

vue 关于父路由进入子路由 操作完成跳转到父路由，父路由又返回子路由的解决方案
$router.push 替换成 $router.replacelai 来进行跳转 然后this.$router.go(-1) 再返回一次
this.$router.replace({ path: "/addressList" });
this.$router.go(-1)

关于传多参的问题
传多参时，只会传获取的最后一个，这时候需要将参数push到一个新数组，把新数组传过去
vue $set 的使用
this.$set(this.student,"age", 24)

关于如何将v-for循环的数据在别处使用
可以使用v-ref 设置
<input type="hidden" ref="input2" :value="orderdist.shipping_id"/>

vue如何回车自动提交数据，跳转
@keyup.13="search() 

vue中关于还没获取到数据，页面加载数据报错的解决
当页面中有不需要循环的数据时，这时加载的页面会读取不到数据，报undefined错误 
可以在data先进行数据的定义aa:{}, 当从后台获取到数据时再赋值给aa

vue中各个页面设置title
下载
npm install vue-wechat-title --save

main.js中引入
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

在router的index.js的路由中加上参数
{
     path: '/login',
     component: Login,
     meta: {
        title: '登录'
     }
 }

如果是公共组件，在跳转时根据条件来动态设置title，可以在最外层的div上设置v-wechat-title="$route.meta.title"再动态去改变title即可
<template>
    <div class="hours-con container" v-wechat-title="$route.meta.title">
          .....
    </div>
</template>

//js动态设置,即可在跳转页面时根据条件改变title了
if(zong){
    this.$route.meta.title = '标题'
}
vuex刷新保存数据
引入 vuex-persistedstate
npm install vuex-persistedstate  --save
在store下的index.js中
import createPersistedState from "vuex-persistedstate"

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [createPersistedState()]   //默认全保存
})

vue 使用async
引入插件babel-plugin-transform-runtime
在.babelrc文件中
"plugins": ["transform-runtime","transform-es2015-modules-commonjs"],
"modules": false, 改成true 或者删除

await写在async函数里，还是报错
报错原因是接口已经是一个函数了
 this.$api.appdata.cart(data).then(async res => {})
 将async写在点击函数开头 其实不在一个函数里，所以会报错

select  option默认选中
select  v-model 设置默认 
this.refundval=res.data.data[0].reason_name;   将第一个赋值给v-model




