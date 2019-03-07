<template>
  <div v-wechat-title="$route.meta.title">
    <!-- <ul class="nav display-flex">
            <li v-for="(demo,index) in label"  :class="{active:index == tabType}" :key="index">
                <span @click="changeTab(index,demo.tabtype)">{{demo.text}}</span>
            </li>
    </ul>-->
    <div class="mescroll">
      <div class="detail-warp">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide food_types_container">
              <img :src="detailList.goods_thumb" alt>
              <div class="proicon" v-if="showTime"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="good-wrap">
        <div class="name">{{detailList.goods_name}}</div>
        <div class="display-flex">
          <div class="display-flex" v-if="detailList.end_time==undefined" style="width:100%">
             <div class="price" style="flex:1">￥{{detailList.shop_price}}</div>
              <div class="sales">库存数量:{{detailList.goods_number}}件</div>
          </div>
          <div class="display-flex" v-else>
             <div class="price">￥{{detailList.promote_price}}</div>
             <div class="proprice">￥{{detailList.shop_price}}</div>
          </div>
         
          <div class="act-wrap display-flex" v-if="showTime">
          <div class="time-wrap display-flex">
            <div class="content">
              <span class="daotitle">倒计时:
                <span class="daotitle"><span class="daoday">{{time.day}}</span>天:<span class="daotime">{{time.hr}}</span>:<span class="daotime">{{time.min}}</span>:<span class="daotime">{{time.sec}}</span></span>
              </span>
            </div>
          </div>
        </div>
        </div>
        <!-- <div class="tax" >[包税]商品售价已包含税费，无需另付税费</div>
        <div class="tax" ></div> -->
      </div>

      <div class="nobonded display-flex">
        <div class="package" v-if="detailList.goods_tax==0">[包税]商品售价已包含税费,无需另付税费</div>
        <div class="bonded" v-else>税费：￥{{detailList.goods_tax}} 实际税费请以提交订单时为准</div>
      </div>
      <div class="description" v-html="descimg.data"></div>
    </div>
    <!-- 脚部 -->
    <footer class="footer display-flex" v-if="mask">
      <div class="my icon">
        <router-link :to="{path:'/my'}">我的</router-link>
      </div>
      <div class="collection icon" @click="collection" v-if="detailList.collected=='0'">收藏</div>
      <div class="collection icon red" @click="detcon(detailList.collected)" v-else>收藏</div>
      <div class="cart icon" @click="cartpay">
        购物车
        <i class="cartnum">{{cartnum}}</i>
      </div>
      <!-- <div v-show="showTime==false" class="operation display-flex"> -->
      <div class="operation display-flex" v-if="detailList.goods_number!=0">
        <button class="al-btn addCart" @click="addcart()">加入购物车</button>
        <button class="al-btn buy" @click="buycar()">立即购买</button>
      </div>
      <div class="operation display-flex" v-else>
        <button class="al-btn noInventory">宝贝筹备中.....</button>
      </div>
      <!-- </div> -->
      <!-- <div class="operation display-flex" v-show="showTime!=false">
         <button class="al-btn imme" @click="buycar()">立即购买</button>
      </div> -->
    </footer>
    <!-- 弹出 -->
    <footer class="layer" v-else>
      <div class="content">
        <div class="display-flex pro-info">
          <div>
            <img :src="detailList.goods_thumb">
          </div>
          <div class="right">
            <p class="line-clamp1" v-if="detailList.end_time==undefined">￥{{detailList.shop_price}}</p>
            <p class="line-clamp1" v-else>￥{{detailList.promote_price}}</p>
            <!-- <p class="inventory">库存充足</p> -->
          </div>
          <i class="iconfork" @click="isshow"></i>
        </div>
        <div class="attr-choose">
          <div class="num display-flex">
            <div class="text">购买数量</div>
            <div class="btn-group">
              <span @click="reduce()">-</span>
              <span>{{message}}</span>
              <span @click="add()">+</span>
            </div>
          </div>
        </div>
        <button class="al-btn al-btn-big" @click="buybtn()">确定</button>
      </div>
    </footer>
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
      mask: true, //脚部栏
      isShow: false, //遮罩显示，隐藏
      tiptitle: null, //提示信息
      detid: null, //商品id
      detailList: {}, //商品数据
      descimg: {},
      message: 1, //购买商品数量
      addcat: false, //加入or立即
      cartlist: {}, //加入购物车后返回信息
      conShow: true,
      cartnum: null, //数量
      label: [
        { text: "推荐", tabtype: "synthesise" },
        { text: "活动", tabtype: "is_hot" },
        { text: "详情", tabtype: "is_new" }
      ],
      endtime: 0,
      time: {
        day:"00",
        hr: "00",
        min: "00",
        sec: "00"
      },
      showTime:false    //是否显示时间
    };
  },
  computed: {
    ...mapState(["userInfo","addressid"])
  },
  created() {
    this.detid = this.$route.query.id;
    this.intData();
    this.getnum();
  },
  mounted: function() {},
  methods: {
    // 倒计时
    countdown: function(timestamp) {
      var that = this;
      var timer=setInterval(function() {
        timestamp--;
        if(timestamp==0){
          clearInterval(timer);
          that.intData();
        }else{
        let day=Math.floor(timestamp /  86400 );
        let hr = Math.floor((timestamp / 3600)%24);
        let min = Math.floor((timestamp /60)%60);
        let sec = Math.floor(timestamp % 60);
        that.time.day = day > 9 ? day : "0" + day;
        that.time.hr = hr > 9 ? hr : "0" + hr;
        that.time.min = min > 9 ? min : "0" + min;
        that.time.sec = sec > 9 ? sec : "0" + sec;
        that.showTime=true;
        }
      }, 1000);
      
    },
    ...mapMutations(["OUT_LOGIN"]),
    // 获取初始数据
    intData() {
      var data = { goods_id: this.detid };
      this.$api.appdata
        .detail(data)
        .then(res => {
          this.detailList = res.data.data;
          this.$route.meta.title = this.detailList.goods_name; //设置标题
          this.endtime = this.detailList.end_time;
          if (this.endtime == undefined) {
          } else {
            this.countdown(this.endtime);
          }
        })
        .then(
          this.$api.appdata.desc(data).then(res => {
            this.descimg = res.data;
          })
        );
    },
    // 获取购物车数量
    getnum: function() {
      this.$api.appdata.cartPay().then(res => {
        this.cartList = res.data.data.cart_list;
        //  console.log(this.cartList)
        var cartnum = 0;
        for (let i in this.cartList) {
          cartnum += this.cartList[i].number;
        }
        this.cartnum = cartnum;
      });
    },
    // 加入购物车
    addcart: function() {
      this.addcat = false;
      this.mask = false;
    },
    // 立即购买
    buycar: function() {
      this.addcat = true;
      this.mask = false;
    },
    // 加入购物车
    buybtn: function() {
      var that = this;
      if (this.userInfo && this.userInfo.id) {
        var data = { goods_id: this.detid, number: this.message };
        this.$api.appdata.cart(data).then(async res => {
          if (res.data.status.error_code == 100) {
            this.mask = true;
            this.$api.appdata.signout().then(res => {
              if (res.data.status.succeed == 1) {
                this.OUT_LOGIN();
                this.$router.push({ path: "/login" });
              }
            });
          } else {
            this.cartlist = res.data.data;
            this.getnum();
            this.mask = true;
            if (this.addcat == true) {
              var rec_id = [];
              rec_id.push(this.cartlist.rec_id.toString());
              let res = await ordData(rec_id);
              function ordData(rec_id) {
                if (typeof rec_id == "object") {
                  rec_id = rec_id.join(",");
                } else {
                  rec_id = rec_id;
                }
                var data = {
                  rec_id: rec_id,
                  address_id: "",
                  type: "mc"
                };
                that.$api.appdata.orderList(data).then(res => {
                  if (res.data.status.error_code == 10004) {
                    that.isShow = true;
                    that.tiptitle = "操作失败，平台未开启对应的物流！";
                  } else {
                    that.$router.push({
                      path: "/order",
                      query: { rec_id: rec_id }
                    });
                  }
                });
              }
              // this.$router.push({ path: "/order", query: { rec_id: rec_id } });
            }
          }
        });
      } else {
        MessageBox.confirm("", {
          message: "您还未登录，是否登录？",
          title: "操作确认",
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(action => {
            if (action == "confirm") {
              //确认的回调
              this.$router.push({ path: "/login" });
            }
          })
          .catch(err => {
            if (err == "cancel") {
              //取消的回调
            }
          });
      }
    },
    isshow: function() {
      this.mask = true;
    },
    // 减少数量
    reduce: function() {
      this.message--;
      if (this.message <= 1) {
        this.message = 1;
      }
    },
    // 增加
    add: function() {
      this.message++;
    },
    // 加入购物车
    cartpay: function() {
      this.$router.push({ path: "/cartpay" });
    },
    //收藏
    collection: function() {
      var data = {
        goods_id: this.detid
      };
      this.$api.appdata.collection(data).then(res => {
        if (res.data.status.succeed == 1) {
          this.intData();
          this.isShow = true;
          this.tiptitle = "已收藏";
        }
      });
    },
    // 取消收藏
    detcon: function(colid) {
      var data = {
        collection_id: colid
      };
      this.$api.appdata.detcoll(data).then(res => {
        if (res.data.status.succeed == 1) {
          this.intData();
          this.isShow = true;
          this.tiptitle = "已取消收藏";
        }
      });
    }
  },
  // 监听地址栏改变
  watch: {
    $route(to, from) {
      this.detid = to.query.id;
      this.intData();
    }
  }
};
</script>
<style lang="scss">
@import "src/style/mixin";
.mescroll {
  position: fixed;
  top: 0;
  bottom: 2rem;
  width: 100%;
  height: auto;
  overflow-x: hidden;
  background: #f2f2f2;
}
.detail-warp {
  position: relative;
}
.swiper-container .swiper-slide img {
  width: 100%;
  display: block;
}
.swiper-container .swiper-slide .proicon{
  background: url(../../../static/images/proicon.png) center 0 no-repeat;
      width: 2rem;
      height: 2rem;
      background-size: 2rem;
      position: absolute;
      right:0.6rem ;
      top: 0.6rem;
}
.good-wrap {
  padding: 0.6rem;
  background-color: #fff;
  margin-top: 0.3rem;
  .name {
    overflow: hidden;
    font-size: 0.65rem;
    color: #333;
    font-weight: 700;
    flex: 1;
    padding-right: 0.4rem;
    padding-bottom: 0.4rem;
  }
  .price {
    // flex: 1;
    font-size: 0.69rem;
    color: #d81e06;
  }
  .proprice {
    flex: 1;
    font-size: 0.54rem;
    color: #666;
    text-decoration: line-through;
  }
  .sales {
    color: #666;
    font-size: 0.54rem;
    line-height: 0.9rem;
  }
  .tax {
    font-size: 0.54rem;
    margin-top: 0.2rem;
  }
  .act-wrap {
    position: relative;
    // margin-top: 0.2rem;
    .time-wrap {
      font-size: 0.7rem;
      color: #333;
    }
    .proicon{
      background: url(../../../static/images/proicon.png) center 0 no-repeat;
      width: 1.1rem;
      height: 1.1rem;
      background-size: 1.1rem;
      position: absolute;
      left:0;
      top:0;
    }
    .content {
      height: 1rem;
      line-height: 1rem;
      // padding: 0 0.266667rem;
      // border: 1px solid #333;
      margin-left: 1.1rem;
      font-size: 0.6rem;
    }
    .content .daotitle{
      color: #d81e07;
    }
    .content .daoday{
      color: #d81e07;
      margin: 0 0.02rem;
    }
    .daotime{
      width: 0.8rem;
      height: 0.8rem;
      background-color: #d81e07;
      color: #ffffff;
      border-radius: 50%;
      padding: 0.1rem 0.14rem;
      margin: 0 0.1rem;
    }
  }
}
.nobonded {
  margin: 0.266667rem 0;
  padding: 0.4rem 0.266667rem;
  background-color: #fff;
  font-size: 0.56rem;
  .bonded {
    color: #5d5858;
  }
  .package {
    color: #5d5858;
    // margin-left: 0.6rem;
  }
}
.description {
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}

footer {
  position: fixed;
  width: 100%;
  height: 2rem;
  bottom: 0;
  z-index: 200;
  .icon {
    font-size: 0.56rem;
    padding: 0.9rem 0.2rem 0.1rem 0.2rem;
    margin-top: 0.2rem;
  }
  .my {
    background: url(../../../static/images/user.png) center 0 no-repeat;
    background-size: 0.9rem;
  }
  .collection {
    background: url(../../../static/images/collection.png) center 0 no-repeat;
    background-size: 0.9rem;
  }
  .collection.red {
    background: url(../../../static/images/collectionred.png) center 0 no-repeat;
    background-size: 0.9rem;
    color: #d81f06;
  }
  .cart {
    background: url(../../../static/images/cartpay.png) center 0 no-repeat;
    background-size: 0.9rem;
    position: relative;
    .cartnum {
      position: absolute;
      top: 0;
      right: 2px;
      color: #fff;
      background-color: #e72714;
      padding: 0 0.106667rem;
      font-size: 0.26667rem;
      font-style: normal;
      border-radius: 50%;
    }
  }

  .operation {
    flex: 1;
    height: 100%;
    button {
      width: 50%;
      display: block;
      color: #fff;
      font-size: 0.61rem;
    }
    .addCart {
      height: 100%;
      background: #ff911d;
    }
    .buy {
      height: 100%;
      background: #d81f06;
    }
    .noInventory {
      width: 100%;
      height: 100%;
      color: #525252;
      background-color: #e8e8e8;
    }
    .imme{
      width: 100%;
      height: 100%;
      color: #fff;
      background: #F42D2D;
    }
  }
}
// 遮罩
.layer {
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 4;
  position: fixed;
  width: 100%;
  bottom: 0;
  .content {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #fff;
    .pro-info {
      padding: 0 0.4rem;
      border-bottom: 1px solid #e5e5e5;
      align-items: center;
      img {
        width: 3rem;
        height: 3rem;
        position: relative;
        top: -0.666667rem;
        border: 1px solid #e5e5e5;
      }
      .right {
        margin: 0 0.4rem;
        flex: 1;
        .line-clamp1 {
          color: #d81f06;
          font-size: 0.69rem;
        }
        .inventory {
          font-size: 0.61rem;
          color: #777777;
        }
      }
      .iconfork {
        background: url(../../../static/images/fork.png) center 0 no-repeat;
        background-size: 0.5rem;
        width: 0.8rem;
        height: 3rem;
        background-position: 0.1rem 0.1rem;
      }
    }
    .attr-choose {
      padding: 0 0.4rem;
      .num {
        margin-top: 0.8rem;
        padding-bottom: 1rem;
      }
      .text {
        flex: 1;
        font-size: 0.45rem;
        line-height: 1.5rem;
      }
      .btn-group {
        font-size: 0;
        display: inline-block;
        border: 1px solid #e5e5e5;
        span {
          font-size: 0.54rem;
          display: inline-block;
          height: 1.5rem;
          line-height: 1.5rem;
          width: 1.5rem;
          text-align: center;
        }
        span:nth-child(2) {
          color: #e72714;
          border-left: 0.01333rem solid #e5e5e5;
          border-right: 0.01333rem solid #e5e5e5;
        }
      }
    }
    // >div{
    //     height: 2rem;
    // }
    .al-btn-big {
      display: block;
      width: 100%;
      padding: 0.5rem 0;
      font-size: 0.64em;
      color: #fff;
      background: #d81f06;
    }
  }
}
// 切换标签
.nav {
  box-sizing: border-box;
  padding: 0 0.2rem;
}
.nav li {
  flex: 1;
  font-size: 0.52rem;
  color: #777777;
  line-height: 0.59rem;
  box-sizing: border-box;
  text-align: center;
}
.nav span {
  display: inline-block;
  padding: 0.52rem 0;
}
.nav .active span {
  color: #d81e06;
}
.nav li.active {
  border-bottom: 1px solid #d81e06;
}
// .nav li:last-child span:first-child {
//   background: url(../../../static/images/noup.png) center 0 no-repeat;
//   display: inline-block;
//   padding: 0.52rem 1.5rem 0.47rem 0;
//   margin-left: 1rem;
//   background-size: 0.4rem;
//   background-position: 1.3rem 0.55rem;

// }
// .nav li:last-child.active span:first-child {
//   background: url(../../../static/images/redup.png) center 0 no-repeat;
//   padding: 0.52rem 1.5rem 0.47rem 0;
//   margin-left: 1rem;
//   background-size: 0.4rem;
//   background-position: 1.3rem 0.55rem;
//   display: inline-block;
// }
// .nav li:last-child.active span:first-child.down{
//   background: url(../../../static/images/reddown.png) center 0 no-repeat;
// }
</style>


