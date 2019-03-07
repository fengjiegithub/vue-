<template>
<div v-wechat-title="$route.meta.title">
    <div class="mescroll">
        <!-- 头部 -->
        <div class="header">
            <div class="info-wrap display-flex">
                <div class="img-wrap">
                    <img class="userhead" :src="userimg" alt="">
                </div>
                <div class="display-flex">
                    <div class="name" @click="login()">{{username}}</div>
                </div>
            </div>
        </div>
        <!-- 订单信息 -->
        <div class="my-order">
            <router-link :to="{path:'/orderlist',query:{id:0}}" class="display-flex">
            <div class="text">我的订单</div>
            <div class="textright"></div>
            </router-link>
        </div>
        <div class="order">
            <ul class="display-flex">
                <li class="icon-new">
                    <router-link :to="{path:'/orderlist',query:{id:1}}">
                        <div class="icon-wrap payment"></div>
                        <div class="text">待付款</div>
                    </router-link>
                </li>
                  <li class="icon-new">
                       <router-link :to="{path:'/orderlist',query:{id:2}}">
                    <div class="icon-wrap delivery"></div>
                    <div class="text">待发货</div>
                     </router-link>
                </li>
                  <li class="icon-new">
                    <router-link :to="{path:'/orderlist',query:{id:3}}">
                    <div class="icon-wrap goods"></div>
                    <div class="text">待收货</div>
                    </router-link>
                </li>
                  <li class="icon-new">
                      <router-link :to="{path:'/orderlist',query:{id:4}}">
                    <div class="icon-wrap returngoods"></div>
                    <div class="text">待退款</div>
                     </router-link>
                </li>
            </ul>
        </div>
        <ul class="menu">
            <!-- <div class="left-flex gear">
                <router-link :to="{path:'/my/logex'}" class="display-flex">
                    <span></span>
                    <span>设置管理</span>
                    <span></span>
                </router-link>
            </div> -->
            <li class="left-flex collection">
                <router-link :to="{path:'/my/collection'}" class="display-flex">
                    <span></span>
                    <span>我的收藏</span>
                    <span></span>
                </router-link>
            </li>
             <!-- <li class="display-flex left-flex integral">
                <span></span>
                <span>我的积分</span>
                <span></span>
            </li> -->
             <li class="coupons">
                 <router-link :to="{path:'/my/coupons'}" class="display-flex left-flex">
                <span></span>
                <span>我的优惠券</span>
                <span></span>
                </router-link>
            </li>
            <li class="address">
                <router-link :to="{path:'/addressList'}" class="display-flex left-flex">
                <span></span>
                <span>我的地址</span>
                <span></span>
                </router-link>
            </li>
             <li class="real-name">
                <router-link :to="{path:'/realname'}" class="display-flex left-flex">
                <span></span>
                <span>实名认证</span>
                <span></span>
                </router-link>
            </li>
        </ul>
         <div class="lg-btn-wrap" v-if="isShow">
            <a class="logout j-act-logout" @click="logout">退出登录</a>
        </div>
    </div>
    <footer class="footer">
        <foot-nav></foot-nav>
    </footer>
     <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import footNav from '../../components/footer/footer';
import userimg from '../../../static/images/userimg.png'
export default {
    components:{
        footNav,
    },
    data(){
        return{
            username:'登录/注册',
            userimg:userimg, // 用户头像
            isShow:false    
        }
    },
    computed:{
        ...mapState([
            'userInfo',
        ]),
    },
    created:function(){
    },
    mounted:function(){
        
        this.initData();
    },
    methods:{
        ...mapMutations([
                'OUT_LOGIN',
            ]),
        login:function(){
            if(this.userInfo && this.userInfo.id){   //判断登录还是未登录
                
            }else{
                this.$router.push({path:'/login'})
            }
            
        },
        initData(){
           if (this.userInfo && this.userInfo.id) {
               this.username = this.userInfo.name;
               this.userimg = this.userInfo.avatar_img
               this.isShow=true
           }else{
                this.username = '登录/注册';
                this.userimg = userimg;
                this.isShow=false
           }
        },
         logout(){
            this.$api.appdata.signout().then(res=>{
                if(res.data.status.succeed==1){
                    this.OUT_LOGIN();
                }
            })
         }
    },
     watch: {
        userInfo: function (value){
            this.initData()
        }
    }
}
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.mescroll{
    position: fixed;
    top: 0;
    bottom: 0rem;
    width:100%;
    height: auto;
    overflow-x: hidden;
    background: #f2f2f2;
    .header{
        width: 100%;
        height: 5.18rem;
        background: url(../../../static/images/bg_mine.png) center 0 no-repeat;
        .info-wrap{
            flex:1;
            padding: 0.8rem 0;
        }
        .info-wrap .display-flex{
            align-items: center;
        }
        .info-wrap .img-wrap{
            margin-left: .8rem;
            margin-right: .8rem;
            .userhead{
                width: 3.2rem;
                height: 3.2rem;
                border-radius: 50%;
                border: 1px solid #fff;
            }
        }
        .info-wrap .name{
            position: relative;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: .61rem;
            margin-right: .373333rem;
            color: #fff;
        }
    }
    .my-order{
        height: 1.8rem;
        line-height: 1.8rem;
        padding: 0 .8rem;
        background-color: #fff;
        border-bottom: 1px solid #e5e5e5;
        .text{
            flex: 1;
            font-size: .61rem;
            color: #333;
        }
        .textright{
             background: url(../../../static/images/right.png) center 0 no-repeat;
            background-size:0.5rem;
            display: block;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
            width: 0.5rem;
            height: 0.5rem;
        }
    }
    .order{
        height: 2.9rem;
        background: #fff;
        margin-bottom: .266667rem;
        ul{
            padding: .4rem 0;
            margin: 0;
        }
        .icon-new{
            position: relative;
            flex: 1;
            text-align: center;
        }
        .icon-wrap{
            display: block;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
            width: 1.1rem;
            height: 1.1rem;
            margin: 0 auto;
        }
        .payment{
             background: url(../../../static/images/payment.png) center 0 no-repeat;
             background-size:1.1rem;
        }
        .delivery{
            background: url(../../../static/images/delivery.png) center 0 no-repeat;
            background-size:1.1rem;
        }
        .goods{
            background: url(../../../static/images/goods.png) center 0 no-repeat;
            background-size:1.1rem;
        }
        .returngoods{
            background: url(../../../static/images/returngoods.png) center 0 no-repeat;
            background-size:1.1rem;
        }
        .text{
            margin-top: .266667rem;
            font-size: 0.56rem;
        }
    }
    .menu .left-flex{
        background: #fff;
        height: 1.6rem;
        line-height: 1.6rem;
        font-size: 0.54rem;
        color: #515151;
        padding: 0 0.8rem;
        border-bottom: 1px solid #f5f5f5;
        span:first-child{
            display: block;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
            width: 1.0rem;
            height: 1.0rem;
            margin-right: 0.3rem;
        }
    }
     .menu .gear span:first-child{
        background: url(../../../static/images/gear.png) center 0 no-repeat;
        background-size:1.0rem;
    }
    .menu .collection span:first-child{
        background: url(../../../static/images/collection.png) center 0 no-repeat;
        background-size:1.0rem;
    }
    .menu .integral span:first-child{
        background: url(../../../static/images/integral.png) center 0 no-repeat;
        background-size:1.0rem;
    }
    .menu .coupons span:first-child{
        background: url(../../../static/images/coupons.png) center 0 no-repeat;
        background-size:1.0rem;
    }
    .menu .address span:first-child{
        background: url(../../../static/images/myaddress.png) center 0 no-repeat;
        background-size:1.0rem;
    }
    .menu .real-name span:first-child{
        background: url(../../../static/images/real-name.png) center 0 no-repeat;
        background-size:1.0rem;
    }
    .menu .left-flex span:last-child{
        background: url(../../../static/images/right.png) center 0 no-repeat;
        background-size:0.5rem;
        display: block;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        width: 0.5rem;
        height: 0.5rem;
    }
    .menu .left-flex span:nth-child(2){
        flex: 1;
    }
    .lg-btn-wrap{
      padding: 15px 0;
      margin: 0 auto;
      text-align: center;
  }
  .lg-btn-wrap a{
    display: inline-block;
    width: 180px;
    height: 36px;
    color: #fff;
    line-height: 36px;
    background-color: #e72410;
    text-align: center;
    font-size: 0.60rem;
  }
}
footer{
    position: fixed;
    bottom: 0;
    z-index: 100;
    width: 100%;
    border-top: 1px solid #f3f3f3;
    box-sizing: border-box;
    background: #fff
}
.router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.3s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>


