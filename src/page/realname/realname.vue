<template v-wechat-title="$route.meta.title">
  <div class="real-name">
    <!-- 有实名信息 -->
    <div class="Yreal" v-if="isList">
      <ul>
        <li v-for="(item,index) in cardList" :key="index">
          <div class="attribute">
            <p class="name">{{item.name}}</p>
            <p class="card">身份证 {{item.card}}</p>
            <p class="separated"></p>
          </div>
          <div class="operation display-flex">
            <span @click="defaultCard(item.id,item.is_default)">
              <i :class="{active:item.is_default==1}"></i>账户默认实名人
            </span>
            <span @click="deleteCard(item)">删除</span>
          </div>
        </li>
      </ul>
      <div class="addcard" v-if="addBut">
        <a @click="addinfo">添加实名信息</a>
      </div>
    </div>
    <!-- 没有实名信息 -->
    <div class="Nreal" v-else>
        <div class="img"></div>
      <p>您还没有实名认证信息哦~</p>
      <p>为了能顺利下单,请添加一个吧!</p>
      <a class="add" @click="addinfo">添加实名信息</a>
      <p class="realpop" @click="popup">
        <i class="understand"></i>了解实名认证
      </p>
      <div class="instructions-pop" v-show="isTitle">
        <div class="content">
          <header>为什么需要实名认证?</header>
          <div
            class="title"
          >.根据海关规定，购买跨境商品需要办理清关手续，请您配合进行实名认证，以确保您购买的商品顺利通过海关检查。（铭创承诺所传身份证明只用于办理跨境商品的清关手续，不做他途使用,其他任何人均无法查看）</div>
          <div
            class="title"
          >.实名认证规则：购买跨境商品需要填写购买人的真实姓名及身份证号，部分商品提供购买人的实名信息（含身份证照片）可加快清关，具体请以下单时的提示为准。</div>
          <a class="do" @click="dodown">我知道了</a>
        </div>
      </div>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
    <!-- 弹出 -->
    <pop-Up v-if="isShow" @closeTip="isShow = false" :tiptitle="tiptitle"></pop-Up>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import { mapState, mapMutations } from "vuex";
import popUp from "../../components/common/popup";
export default {
  components: {
    popUp
  },
  data() {
    return {
    //   real: "../../../../static/images/nreal-name.png", //图片地址
      isShow: false, //弹窗弹出
      cardList: [], //数据
      addBut: false, //按钮显现
      isTitle: false, // 说明弹出
      isList: true //延时
    };
  },
  computed: {

  },
  created() {
    this.intData();
  },
  mounted() {},
  methods: {
    ...mapMutations(["OUT_LOGIN"]),
    //   初始数据
    intData() {
      this.$api.appdata.card().then(res => {
        if (res.data.status.error_code == 100) {
          this.$api.appdata.signout().then(res => {
            if (res.data.status.succeed == 1) {
              this.OUT_LOGIN();
              this.$router.push({ path: "/login" });
            }
          });
        }else{
        this.cardList = res.data.data;
        if (this.cardList.length != 0) {
          this.addBut = true;
          this.isList = true;
        } else {
          this.isList = false;
        }
        }
      });
    },
    // 说明弹出
    popup() {
      this.isTitle = true;
    },
    // 说明关闭
    dodown() {
      this.isTitle = false;
    },
    // 添加实名信息
    addinfo() {
      if (this.cardList.length > 5) {
        this.isShow = true;
        this.tiptitle = "限定添加5个";
      } else {
        this.$router.push({ path: "/realname/addcard" });
      }
    },
    // 删除
    deleteCard(cid) {
      MessageBox.confirm("", {
        message:
          "海关要求购买跨境商品需提供订购人实名信息,若删除所有认证信息,下单时需重新认证,确定删除吗?",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(action => {
          if (action == "confirm") {
            //确认的回调
            var data = {
              id: cid
            };
            this.$api.appdata.detcard(data).then(res => {
              this.intData();
            });
          }
        })
        .catch(err => {
          if (err == "cancel") {
            //取消的回调
          }
        });
    },
    // 设置默认
    defaultCard(cid,cdefault) {
      if(cdefault==1){
        return false
      }
      var data = {
        id: cid
      };
      this.$api.appdata.defaultCard(data).then(res => {
        if (res.data.status.succeed == 1) {
          this.$nextTick(() => {
            this.intData();
          });
        }
      });
    }
  },
  //   监听地址栏改变
  watch: {
    $route(to, from) {
      if (from.path == "/realname/addcard") {
        this.intData();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.real-name {
  position: fixed;
  top: 0;
  bottom: 0rem;
  width: 100%;
  height: auto;
  overflow-x: hidden;
  background: #f2f2f2;
  .Nreal {
    height: 100%;
    text-align: center;
    padding-top: 5.98rem;
    font-size: 0.58rem;
    color: #333;
    .img{
      background: url(../../../static/images/nreal-name.png) center 0 no-repeat;
      background-size: 3.4rem;
      width: 3.4rem;
      height: 3.4rem;
      margin: 0 auto;
    }
    .add {
      font-size: 0.6rem;
      color: #d61f06;
      padding: 0.5rem 2.7rem;
      display: inline-block;
      border: 1px solid #d61f06;
      border-radius: 3rem;
      margin: 0.64rem 0;
    }
    .realpop {
      font-size: 0.5rem;
      line-height: 0.9rem;
      color: #a5a5a5;
    }
    .understand {
      background: url(../../../static/images/question.png) center 0 no-repeat;
      background-size: 0.7rem;
      width: 0.8rem;
      height: 0.8rem;
      display: inline-block;
      vertical-align: middle;
    }
    .instructions-pop {
      position: fixed;
      top: 0;
      bottom: 0rem;
      width: 100%;
      height: auto;
      overflow-x: hidden;
      background: #adadad;
      .content {
        position: absolute;
        left: 0;
        right: 0;
        top: -15%;
        bottom: 0;
        margin: auto;
        width: 12rem;
        height: 12rem;
        background: #ffffff;
        border-radius: 0.5rem;
      }
      header {
        height: 1.58rem;
        line-height: 1.58rem;
        margin: 0 0.4rem;
        border-bottom: 1px solid #eeeeee;
      }
      .title {
        font-size: 0.54rem;
        color: #a5a5a5;
        text-align: left;
        padding: 0.3rem 0.4rem 0 0.4rem;
      }
      .do {
        font-size: 0.6rem;
        color: #d61f06;
        padding: 0.5rem 3.8rem;
        display: inline-block;
        border: 1px solid #d61f06;
        border-radius: 0.5rem;
        margin-top: 0.64rem;
      }
    }
  }
  .Yreal {
    height: 100%;
    margin: 0 auto;
    ul {
      padding: 0.4rem;
      box-sizing: border-box;
      li {
        background: #ffffff;
        margin-bottom: 0.2rem;
      }
      .attribute {
        padding: 0 0.58rem;
        p:first-child {
          font-size: 0.6rem;
          padding: 0.38rem 0;
        }
        .card {
          font-size: 0.58rem;
          color: #666666;
        }
        .separated {
          height: 1px;
          background: #bfbfbf;
          margin: 0.44rem 0 0.22rem 0;
        }
      }
      .operation {
        padding: 0.2rem 0.58rem;
        font-size: 0.58rem;
        span:first-child {
          flex: 1;
          i {
            background: url(../../../static/images/emptyround.png) left 0
              no-repeat;
            background-size: 0.7rem;
            padding-left: 1rem;
            vertical-align: middle;
          }
          i.active {
            background: url(../../../static/images/ycircle.png) left 0 no-repeat;
            background-size: 0.7rem;
          }
        }
        span:last-child {
          background: url(../../../static/images/delete.png) center 0 no-repeat;
          background-size: 0.7rem;
          padding-left: 2rem;
        }
      }
    }
    .addcard {
      text-align: center;
      margin: 0 auto;
      a {
        background: #d81f06;
        color: #fff;
        font-size: 0.65rem;
        padding: 0.48rem 5.06rem;
        border-radius: 0.8rem;
      }
    }
  }
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


