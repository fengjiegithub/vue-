<template>
  <div class="mycon" v-wechat-title="$route.meta.title">
    <div class="coupons-list">
      <ul class="con-use display-flex">
        <li v-for="(demo,index) in label" :class="{active:index == tabType}" :key="index">
          <span @click="changeTab(index,demo.tabtype)">{{demo.text}}</span>
        </li>
      </ul>
      </div>
      <div class="conlist">
        <mescroll-vue
          ref="mescroll0"
          v-show="tabType==0"
          :down="getMescrollDown(0)"
          :up="mescrollUp(0)"
          @init="mescrollInit0"
        >
          <ul class="dotUse" id="dataList0">
            <li class="display-flex" v-for="(item,index) in tab0.list" :key="index++">
                <div class="conleft">
                <p class="conmon">￥{{item.bonus_money}}</p>
                <p class>满￥{{item.min_goods_amount}}使用</p>
              </div>
              <div class="conright">
                <p class="fullred">{{item.type_name}}</p>
                <p class="contim">{{item.use_end_date}}至{{item.use_start_date}}</p>
              </div>
            </li>
          </ul>
        </mescroll-vue>
        
         <mescroll-vue
          ref="mescroll1"
          v-show="tabType==1"
          :down="getMescrollDown(1)"
          :up="mescrollUp(1)"
          @init="mescrollInit1"
        >
          <ul class="dotUse" id="dataList1">
            <li class="display-flex" v-for="(item,index) in tab1.list" :key="index">
              <div class="conleft">
                <p class="conmon">￥{{item.bonus_money}}</p>
                <p class>满￥{{item.min_goods_amount}}使用</p>
              </div>
              <div class="conright">
                <p class="fullred">{{item.type_name}}</p>
                <p class="contim">{{item.use_end_date}}至{{item.use_start_date}}</p>
              </div>
            </li>
          </ul>
        </mescroll-vue>

        <mescroll-vue
          ref="mescroll2"
          v-show="tabType==2"
          :down="getMescrollDown(2)"
          :up="mescrollUp(2)"
          @init="mescrollInit2"
        >
          <ul class="dotUse" id="dataList2">
            <li class="display-flex" v-for="(item,index) in tab2.list" :key="index">
              <div class="conleft">
                <p class="conmon">￥{{item.bonus_money}}</p>
                <p class>满￥{{item.min_goods_amount}}使用</p>
              </div>
              <div class="conright">
                <p class="fullred">{{item.type_name}}</p>
                <p class="contim">{{item.use_end_date}}至{{item.use_start_date}}</p>
              </div>
            </li>
          </ul>
        </mescroll-vue>
        <div class="exchangeInput display-flex">
          <input name="sword" type="number" class="search" placeholder="请输入兑换码" v-model="connum">
          <button class="al-btn exBtn" @click="exchange">兑换</button>
        </div>
      </div>
    <!-- <div class="shop-list">
      <div class="title">为您推荐</div>
      <ul class="list">
        <li v-for="item in dataList" :key="item.goods_id">
          <router-link :to="{path:'/details',query:{id:item.goods_id}}">
            <div class="imgwrap">
              <div class="img-ratio-wrap">
                <img :src="item.goods_thumb" alt>
              </div>
            </div>
            <div class="imgname line-clamp line-clamp2">{{item.goods_name}}</div>
            <div class="price-buy display-flex">
              <div class="price">￥{{item.shop_price}}</div>
              <div class="buy"></div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>-->
    <pop-Up v-if="isShow" @closeTip="isShow = false" :tiptitle="tiptitle"></pop-Up>
  </div>
</template>
<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import { mapState, mapMutations } from "vuex";
import popUp from "../../../components/common/popup";
export default {
  components: {
    MescrollVue, // 注册mescroll组件
    popUp
  },
  data() {
    return {
      label: [
        { text: "未使用", tabtype: "未使用" },
        { text: "已使用", tabtype: "已使用" },
        { text: "已过期", tabtype: "已过期" }
      ],
      tabType: 0, // 菜单类型
      tab0: { mescroll: null, list: [], isListInit: false }, // 未使用
      tab1: { mescroll: null, list: [], isListInit: false }, // 已使用
      tab2: { mescroll: null, list: [], isListInit: false }, // 已过期
      mescroll: null,
      conpon: "../../../../static/images/conpon.png",
      dataList: [], //数据
      isShow: false, //遮罩显示，隐藏
      connum:null,   //兑换
    };
  },
  created() {},
  mounted: function() {
    // this.mescroll = new MeScroll(this.$refs.mescroll, {
    //   down: {
    //     use: false
    //   },
    //   up: {
    //     callback: this.upCallback,
    //     page: {
    //       num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
    //       size: 6 //每页数据条数,默认10
    //     },
    //     noMoreSize: 6,
    //     toTop: {
    //       // 配置回到顶部按钮
    //       src: "http://www.mescroll.com/img/mescroll-totop.png" // 图片路径,默认null (建议写成网络图,不必考虑相对路径)
    //     }
    //   }
    // });
  },
  methods: {
    ...mapMutations(["OUT_LOGIN"]),
    mescrollInit0(mescroll) {
      mescroll.tabType = 0; // 加入标记,便于在回调中取到对应的list
      this.tab0.mescroll = mescroll;
    },
    mescrollInit1(mescroll) {
      mescroll.tabType = 1;
      this.tab1.mescroll = mescroll;
    },
    mescrollInit2(mescroll) {
      mescroll.tabType = 2;
      this.tab2.mescroll = mescroll;
    },
    getMescrollDown(tabType) {
      // console.log(tabType);
      let isAuto = tabType == this.tabType; // 第一个mescroll传入true,列表自动加载,当进来不是第一页时设置获取传过来的参数
      return {
        auto: isAuto,
        callback: this.downCallback
      };
    },
    /* 下拉刷新的回调 */
    downCallback(mescroll) {
      // 这里加载你想下拉刷新的数据, 比如刷新tab1的轮播数据
      if (mescroll.tabType === 0) {
        // loadSwiper();
      } else if (mescroll.tabType === 1) {
        // ....
      } else if (mescroll.tabType === 2) {
        // ....
      } else if (mescroll.tabType === 3) {
        // ....
      } else if (mescroll.tabType === 4) {
      }
      mescroll.resetUpScroll(); // 触发下拉刷新的回调,加载第一页的数据
    },
    mescrollUp(tabType) {
      let emptyWarpId = "dataList" + tabType;
      return {
        auto: false,
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 //每页数据条数,默认10
        },
        noMoreSize: 6, // 如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          warpId: emptyWarpId, // 父布局的id;
          icon: "./static/images/mescroll-empty.png", // 图标,默认null
          tip: "还没有券哦~", // 提示
          btntext: "去逛逛", // 按钮,默认""
          btnClick: function() {
            // 点击按钮的回调,默认null
            window.history.go(-1);
          }
        },
        toTop: {
          // 配置回到顶部按钮
          src: "./static/images/mescroll-totop.png" // 图片路径,默认null (建议写成网络图,不必考虑相对路径)
        }
      };
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      if (mescroll.tabType === 0) {
        this.tab0.isListInit = true; // 标记列表已初始化,保证列表只初始化一次
        var data = {
          type: this.tabtype,
          pagination: { count: page.size, page: page.num }
        };
        this.$api.appdata
          .percon(data)
          .then(res => {
            if (res.data.status.error_code == 100) {
              this.$api.appdata.signout().then(res => {
                if (res.data.status.succeed == 1) {
                  this.OUT_LOGIN();
                  this.$router.push({ path: "/login" });
                }
              });
            } else {
              let arr = res.data.data.list;
              if (page.num === 1) this.tab0.list = []; // 如果是第一页需手动制空列表
              this.tab0.list = this.tab0.list.concat(arr); // 追加新数据
              this.$nextTick(() => {
                mescroll.endSuccess(arr.length);
              });
            }
          })
          .catch(e => {
            if (page.num === 1) this.tab0.isListInit = false;
            mescroll.endErr();
          });
      }else if (mescroll.tabType === 1) {
        this.tab1.isListInit = true; // 标记列表已初始化,保证列表只初始化一次
        var data = {
          type: this.tabtype,
          pagination: { count: page.size, page: page.num }
        };
        this.$api.appdata
          .percon(data)
          .then(res => {
            if (res.data.status.error_code == 100) {
              this.$api.appdata.signout().then(res => {
                if (res.data.status.succeed == 1) {
                  this.OUT_LOGIN();
                  this.$router.push({ path: "/login" });
                }
              });
            } else {
              let arr = res.data.data.list;
              if (page.num === 1) this.tab1.list = []; // 如果是第一页需手动制空列表
              this.tab1.list = this.tab1.list.concat(arr); // 追加新数据
              this.$nextTick(() => {
                mescroll.endSuccess(arr.length);
              });
            }
          })
          .catch(e => {
            if (page.num === 1) this.tab1.isListInit = false;
            mescroll.endErr();
          });
      }else if (mescroll.tabType === 2) {
        this.tab2.isListInit = true; // 标记列表已初始化,保证列表只初始化一次
        var data = {
          type: this.tabtype,
          pagination: { count: page.size, page: page.num }
        };
        this.$api.appdata
          .percon(data)
          .then(res => {
            if (res.data.status.error_code == 100) {
              this.$api.appdata.signout().then(res => {
                if (res.data.status.succeed == 1) {
                  this.OUT_LOGIN();
                  this.$router.push({ path: "/login" });
                }
              });
            } else {
              let arr = res.data.data.list;
              if (page.num === 1) this.tab2.list = []; // 如果是第一页需手动制空列表
              this.tab2.list = this.tab2.list.concat(arr); // 追加新数据
              this.$nextTick(() => {
                mescroll.endSuccess(arr.length);
              });
            }
          })
          .catch(e => {
            if (page.num === 1) this.tab2.isListInit = false;
            mescroll.endErr();
          });
      }
    },
    // 切换菜单
    changeTab(type, tabtype) {
      this.tabtype = tabtype;
      let curTab = this.getTabData(this.tabType); // 当前列表
      let newTab = this.getTabData(type); // 新转换的列表
      curTab.mescroll.hideTopBtn(); // 隐藏当前列表的回到顶部按钮
      this.tabType = type; // 切换菜单
      if (!newTab.isListInit) {
        newTab.mescroll.triggerDownScroll(); // 加载列表
      } else {
        setTimeout(() => {
          // 检查新转换的列表是否需要显示回到到顶按钮
          var curScrollTop = newTab.mescroll.getScrollTop();
          if (curScrollTop >= newTab.mescroll.optUp.toTop.offset) {
            newTab.mescroll.showTopBtn();
          } else {
            // newTab.mescroll.hideTopBtn();
          }
        }, 30);
      }
    },
    // 获取菜单对应的数据
    getTabData(tabType) {
      if (tabType == null) tabType = this.tabType;
      if (tabType === 0) {
        return this.tab0;
      } else if (tabType === 1) {
        return this.tab1;
      } else if (tabType === 2) {
        return this.tab2;
      } else if (tabType === 3) {
        return this.tab3;
      } else if (tabType === 4) {
        return this.tab4;
      }
    },
    exchange(){
      if(this.connum==null){
        this.isShow = true;
          this.tiptitle = "请输入兑换码";
      }else{
          var data={
            bonus_sn:this.connum
        }
         this.$api.appdata.exchange(data).then(res => {
             if(res.data.status.succeed==1){
               this.connum=null;
               this.tab0.isListInit = false;
               this.changeTab(0, this.tabtype);
             }else{
               this.isShow = true;
               this.tiptitle = "信息有误";
             }
         })
      }
    }
    // upCallback(page) {
    //   var data = {
    //     pagination: { count: page.size, page: page.num }
    //   };
    //   this.$api.appdata
    //     .collectList(data)
    //     .then(res => {
    //       if (res.data.status.error_code == 100) {
    //         this.$api.appdata.signout().then(res => {
    //           if (res.data.status.succeed == 1) {
    //             this.OUT_LOGIN();
    //             this.$router.push({ path: "/login" });
    //           }
    //         });
    //       } else {
    //         let arr = res.data.data.goods;
    //         if (page.num == 1) this.dataList = [];
    //         this.dataList = this.dataList.concat(arr);
    //         this.$nextTick(() => {
    //           this.mescroll.endSuccess(arr.length);
    //         });
    //       }
    //     })
    //     .catch(e => {
    //       mescroll.endErr();
    //     });
    // }
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.mycon {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  z-index: 204;
  overflow-y: auto;
}
.mescroll {
  position: fixed;
  top: 2.1rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  overflow-y: auto;
}
.coupons-list{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
  .con-use {
    background: #fff;
    border-bottom: 1px solid #f2f2f2;
    li {
      flex: 1;
      text-align: center;
      font-size: 0.6rem;
      color: #333333;
      height: 2rem;
      line-height: 2rem;
    }
  }
  .con-use .active span {
  color: #d81e06;
}
  .conlist {
    height: 100%;
    box-sizing: border-box;
      .empty-icon {
        padding: 3.5rem 0 0rem 0;
        width: 4rem;
        height: 4rem;
      }
      #dataList0{
        li{
          background: #ffe8dd;
           border: 1px solid #f09e72;
           .conleft {
              border-right: 1px dashed #f6af90;
           }
        }
      }
    .dotUse {
      padding: 0.2rem 0;
      background: #fff;
      height: auto;
      li {
        width: 13.76rem;
        height: 2.74rem;
        background: #eeeeee;
        margin: 0 auto;
        border: 1px solid #eeeeee;
        margin-top: 0.2rem;
        border-radius: 0.2rem;
        .conleft {
          width: 35%;
          text-align: center;
          font-size: 0.54rem;
          height: 100%;
          border-right: 1px dashed #ebebeb;
          p:first-child {
            margin-top: 0.34rem;
            padding: 0.2rem 0;
          }
        }
        .conright {
          width: 65%;
          height: 100%;
          font-size: 0.54rem;
          margin-left: 0.82rem;
          p:first-child {
            margin-top: 0.34rem;
            padding: 0.2rem 0;
          }
        }
      }
    }
    .exchangeInput{
      position: absolute;
      z-index: 2;
      background: #fff;
      width: 100%;
      bottom: 0;
      height: 2.0rem;
      .search{
        flex: 1;
        background: #f2f2f2;
    padding: .12rem .266667rem .12rem .426667rem;
    height: 2.0rem;
    border: none;
    border-radius: 0;
    font-size: .58rem;
    -webkit-appearance: none;
      }
      .exBtn{
        width: 2.933333rem;
    height: 2.0rem;
    background-color: #e72714;
    color: #fff;
    font-size: .58rem;
      }
    }
  }

  // 底下商品
.shop-list {
  .title {
    text-align: center;
    color: #000000;
    font-size: 0.8rem;
    padding: 0.6rem 0;
  }
  .list {
    position: relative;
    overflow: hidden;
    li {
      margin: 0;
      position: relative;
      background-color: #fff;
      width: 50%;
      box-sizing: border-box;
      float: left;
    }
    .imgwrap {
      width: 100%;
      padding: 0.8rem;
      box-sizing: border-box;
      .img-ratio-wrap {
        position: relative;
        height: 0;
        width: 100%;
        padding-bottom: 100%;
      }
    }
    .imgname {
      font-size: 0.54rem;
      color: #515151;
      margin: 0 0.6rem 0.4rem 0.6rem;
    }
    .price-buy {
      margin-left: 0.6rem;
      margin-bottom: 0.33rem;
    }
    .price-buy .price {
      font-size: 0.54rem;
      color: #e72714;
      text-align: left;
      line-height: 1rem;
    }
    .price-buy .buy {
      background: url(../../../../static/images/cartpayred.png) center 0
        no-repeat;
      background-size: 0.8rem;
      margin-left: 3.5rem;
      width: 1rem;
      height: 0.8rem;
      margin-top: 0.15rem;
    }
  }
  .img-ratio-wrap img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .list li:nth-child(2n) {
    border-top: 2px solid #f4f4f4;
    border-left: 1px solid #f4f4f4;
  }
  .list li:nth-child(2n-1) {
    border-right: 1px solid #f4f4f4;
    border-top: 2px solid #f4f4f4;
  }
}
</style>


