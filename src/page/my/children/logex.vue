<template>
    <div class="logexPage">
        <div class="about display-flex">
            <span>关于我们</span>
            <span></span>
        </div>
        <div class="lg-btn-wrap">
            <a class="logout j-act-logout" @click="logout">退出登录</a>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
    data(){
        return{

        }
    },
    mounted:function(){

    },
    methods:{
         ...mapMutations([
                'OUT_LOGIN',
            ]),
            logout(){
                this.$api.appdata.signout().then(res=>{
                    if(res.data.status.succeed==1){
                        this.OUT_LOGIN();
                        this.$router.go(-1);
                    }
                })
            }
    },
}
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.logexPage {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  z-index: 204;
  overflow-y: auto;
  .lg-btn-wrap{
      padding: 10px 0;
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
  .about{
      font-size: 0.65rem;
      padding: 0.4rem 0.8rem;
      background: #fff;
      span:first-child{
          flex: 1;
      }
      span:last-child {
        background: url(../../../../static/images/right.png) center 0 no-repeat;
        background-size: 0.5rem;
        display: block;
        width: 0.5rem;
        height: 0.5rem;
      }
  }
}
</style>


