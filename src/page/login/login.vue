<template>
<div class="loginContainer" v-wechat-title="$route.meta.title">
    <!-- 登录注册选择页面 -->
    <!-- <div class="loginIndex">
        <div class="loginimages">
           <div class="loginimg">logo</div>
        </div>
        <div class="loginclick">
            <div class="thelogin">登录</div>
            <div class="register">注册</div>
        </div>
    </div> -->
    <!-- 登录 -->
    <div class="loginview" v-if="log">
        <div class="loginimages">
           <div class="loginimg"></div>
        </div>
        <!-- 手机登录 -->
        <!-- <div class="display-flex user-wrap">
            <input type="number" placeholder="请输入手机号" v-model="phoneNumber">
        </div>
        <div class="display-flex pass-wrap">
            <input type="number" placeholder="请输入验证码" v-model="verification">
            <div v-show="countdown" class="validation" @click="logcode()">获取验证码</div>
            <div v-show="!countdown" class="count">{{count}}秒后重新获取</div>
        </div> -->
        <!-- 用户名登录 -->
        <div class="display-flex user-wrap">
            <input type="number" placeholder="请输入用户名" v-model="username">
        </div>
        <div class="display-flex pass-wrap">
            <input type="password" placeholder="请输入密码" v-model="upassword">
        </div>
        <div class="loginbtn" @click="userlogin">登录</div>
        <div class="display-flex other-opreation">
            <div class="registered" @click="regis()">免费注册</div>
            <div class="forget-pass">忘记密码</div>
        </div>
    </div>
    <!-- 注册 -->
    <div class="registerview" v-else>
        <div class="welcome">
            <div class="weltitle">欢迎注册商城</div>
        </div>
         <div class="display-flex user-wrap">
            <input type="number" placeholder="请输入手机号" v-model="rephoneNumber">
        </div>
          <div class="display-flex user-wrap">
            <input type="password" placeholder="请输入密码" v-model="repassword">
        </div>
         <div class="display-flex pass-wrap">
            <input type="text" placeholder="请输入验证码" v-model="reverification">
            <div v-show="countdown" class="validation" @click="code()">获取验证码</div>
            <div v-show="!countdown" class="count">{{count}}秒后重新获取</div>
        </div>
         <div class="loginbtn" @click="step()">确定</div>
    </div>

    <!-- 弹出 -->
     <pop-Up v-if="isShow" @closeTip="isShow = false" :tiptitle="tiptitle"></pop-Up>
</div>
</template>
<script>
 import {mapState, mapMutations} from 'vuex'
 import popUp from "../../components/common/popup";
export default {
    components: {
        popUp
    },
    data(){
        return{
            log:true,    //判断显示登录注册
            username: "",     //用户名
            upassword:"",     //用户密码
            phoneNumber:null,   //手机号
            password:null,      //密码
            verification:null, //验证码
            isShow:false,       //弹出界面
            tiptitle:null,       //弹出提示信息
            countdown:true,    //倒计时
            count:'',          //倒计时秒
            timer: null,
            rephoneNumber:null,   //注册手机号
            repassword:null,      //注册密码
            reverification:null, //注册验证码
            userInfo:null,  //用户信息

        }
    },
    mounted: function() {
        
   },
    methods:{
         ...mapMutations([
                'RECORD_USERINFO',
            ]),
        // 倒计时
        getCode(){
            const TIME_COUNT = 60;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.countdown = false;
                this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
                } else {
                this.countdown = true;
                clearInterval(this.timer);
                this.timer = null;
                }
                }, 1000)
            }
        },
        // 手机号登录
        login:function(){
            var that=this;
            if(!this.verification){
                this.isShow=true;
                this.tiptitle="请输验证码";
                 setTimeout(function () {
                     that.isShow=false;
                }, 1500);
                return
            }else{
                this.$api.appdata.login(this.phoneNumber,this.password,this.reverification).then(res=>{
                    console.log(res);
                    this.userInfo=res.data;
                     if(!this.userInfo.user_id){
                     }else{
                         console.log(this.userInfo)
                          this.RECORD_USERINFO(this.userInfo);
                          this.$router.go(-1);
                     }
                })
            }
        },
        // 用户名登录
        userlogin:function(){
            if(!this.username){
                this.isShow=true;
                this.tiptitle = '请输入用户名';
            }else if(!this.upassword){
                this.isShow=true;
                this.tiptitle = '请输入密码';
            }else{
                var data={
                    username:this.username,
                    password:this.upassword
              }
               this.$api.appdata.login(data).then(res=>{
                   if(res.data.status.succeed==0){
                        this.isShow=true;
                        this.tiptitle = '您输入的账户信息不正确';
                   }else{
                        this.userInfo=res.data.data.user;
                        this.RECORD_USERINFO(this.userInfo);
                        this.$router.go(-1);
                   }
               })
            }
        },
        // 登录获取验证码
        logcode:function(){
            var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(12[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
             var that=this;
             if(!this.phoneNumber){
                this.isShow=true;
                this.tiptitle="请输入手机号";
                 setTimeout(function () {
                     that.isShow=false;
                }, 1500);
                return false;
            }else if(this.phoneNumber.length!=11){
                this.isShow=true;
                this.tiptitle="请输入正确的手机号";
                 setTimeout(function () {
                     that.isShow=false;
                }, 1500);
                return false;
            }else if(!myreg.test(this.phoneNumber)){
                this.isShow=true;
                this.tiptitle="请输入有效的手机号";
                 setTimeout(function () {
                     that.isShow=false;
                }, 1500);
                return false;
            }else{
                this.getCode();

            }
        },
        // 注册点击
        regis:function(){
            this.log=false
        },
        // 注册验证码
        code:function(){
            var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(12[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
             var that=this;
             if(!this.rephoneNumber){
                this.isShow=true;
                this.tiptitle="请输入手机号";
                 setTimeout(function () {
                     that.isShow=false;
                }, 1500);
                return false;
            }else if(this.rephoneNumber.length!=11){
                this.isShow=true;
                this.tiptitle="请输入正确的手机号";
                 setTimeout(function () {
                     that.isShow=false;
                }, 1500);
                return false;
            }else if(!myreg.test(this.rephoneNumber)){
                this.isShow=true;
                this.tiptitle="请输入有效的手机号";
                 setTimeout(function () {
                     that.isShow=false;
                }, 1500);
                return false;
            }else if(!this.repassword){
                this.isShow=true;
                this.tiptitle="请输入密码";
                 setTimeout(function () {
                     that.isShow=false;
                }, 1500);
                return false;
            }else{
                this.getCode();   
                // 获取验证码
               
            }
        },
        // 注册确定
        step:function(){
            var that=this;
            if(!this.verification){
                this.isShow=true;
                this.tiptitle="请输验证码";
                 setTimeout(function () {
                     that.isShow=false;
                }, 1500);
                return
            }else{
                // axios 提交注册信息
                this.$api.appdata.register(this.phoneNumber,this.password,this.verification).then(res=>{
                    console.log(res.data)
                })
            }
        },
        
    }
}
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.loginContainer{
    height: 100%;
    background: #f2f2f2;
}
.loginIndex{
    height: 100%;
    padding: 0 0.9rem;
    .loginimages{
        padding: 2rem 0 1.2rem 0;
        .loginimg{
            width: 2rem;
            height: 2rem;
            background: red;
            margin: 0 auto;
            text-align: center;
    }
    
}
.loginclick>div{
    font-size: 0.69rem;
    color: #fff;
    background: #d81f06;
    width: 7.18rem;
    height: 1.5rem;
    border-radius: 10px;
    text-align: center;
    line-height: 1.5rem;
    margin: 0.8rem auto;
}
}
// 登录页面
.loginview{
    height: 100%;
    padding: 0 0.9rem;
    .loginimages{
        padding: 2rem 0 1.2rem 0;
        .loginimg{
            width: 3rem;
            height: 3rem;
            background: url(../../../static/images/logo.png) center 0 no-repeat;
            background-size:2.9rem;
            margin: 0 auto;
            text-align: center;
        }
    }
    .user-wrap,.pass-wrap{
        padding-bottom: .213333rem;
        border-bottom: 1px solid #e5e5e5;
        margin-top: 0.2rem;
    }
    .user-wrap input,.pass-wrap input{
        flex: 1;
        height: 100%;
        border: 0;
        font-size: .59rem;
        color: #999;
        outline: none;
        background: transparent;
        padding: 0.3rem 0;
    }
    .pass-wrap .validation{
        font-size: .45rem;
        color: #d81f06;
        border: 1px solid #c8c8c8;
        padding: 0.3rem 0.2rem;
    }
    .loginbtn{
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        font-size: .59rem;
        background: #d81f06;
        color: #fff;
        border-radius: 15px;
        margin-top: 1.5rem;
    }
    .other-opreation{
        margin-top: 0.6rem;
        .registered{
            font-size: 0.54rem;
            color: #4a4a4a;
            flex:1;
            padding: 0.2rem 0;
        }
        .forget-pass{
            font-size: 0.54rem;
            color: #4a4a4a;
            padding: 0.2rem 0;
        }
    }
    .count{
        font-size: .45rem;
        color: #d81f06;
        border: 1px solid #c8c8c8;
        padding: 0.3rem 0.2rem;
    }
    
}
// 注册页面样式
.registerview{
    height: 100%;
    padding: 0 0.9rem;
    .welcome{
        padding: 2rem 0 1.2rem 0;
    }
    .user-wrap,.pass-wrap{
        padding-bottom: .213333rem;
        border-bottom: 1px solid #e5e5e5;
        margin-top: 0.2rem;
    }
    .user-wrap input,.pass-wrap input{
        flex: 1;
        height: 100%;
        border: 0;
        font-size: .59rem;
        color: #999;
        outline: none;
        background: transparent;
        padding: 0.3rem 0;
    }
    .validation{
        font-size: .45rem;
        color: #d81f06;
        border: 1px solid #c8c8c8;
        padding: 0.3rem 0.2rem;
    }
    .loginbtn{
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        font-size: .59rem;
        background: #d81f06;
        color: #fff;
        border-radius: 15px;
        margin-top: 1.5rem;
    }
    .count{
        font-size: .45rem;
        color: #d81f06;
        border: 1px solid #c8c8c8;
        padding: 0.3rem 0.2rem;
    }
}
</style>


