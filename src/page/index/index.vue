<template>
  <div v-wechat-title="$route.meta.title">
    <div ref="mescroll" class="mescroll">
      <div class="searh-wrap">
        <div class="input-wrap disolay-flex">
          <div class="searp-searchicon"></div>
          <input
            type="search"
            name="search"
            id
            placeholder="搜索你想要的"
            v-model="sreach"
            @keyup.13="search()"
          >
          <div class="search" @click="search()">搜索</div>
        </div>
      </div>
      <div class="banner">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide food_types_container"
              v-for="itemBanner in indexList.player"
              :key="itemBanner.sort"
            >
              <img :src="itemBanner.src" alt>
            </div>
          </div>
        </div>
      </div>
      <div class="indextype display-flex">
        <div v-for="itemList in indexList.taxonomy" :key="itemList.sort">
          <router-link :to="{path:'/list',query:{id:itemList.sort}}">
            <img :src="itemList.src" alt>
            <p>{{itemList.text}}</p>
          </router-link>
        </div>
      </div>
      <div class="indextype1" v-if="showTime">
        <h2 class="title display-flex">
          <span class="imicon"></span>
          <span class="imtitle">促销商品</span>
          <router-link :to="{path:'/activity'}" class="more">更多</router-link>
        </h2>
        <ul class="seckill-act-prolist">
          <li v-for="(item,index) in prolist" :key="index">
            <router-link :to="{path:'/details',query:{id:item.goods_id}}">
              <div class="prologo-wrap">
                <img :src="item.goods_img" alt class="lazy-img-fadein">
                <span class="sale-badge">倒计时:
                  <span class="daoday">{{time.day}}</span>天:
                  <span class="daotime">{{time.hr}}</span>:
                  <span class="daotime">{{time.min}}</span>:
                  <span class="daotime">{{time.sec}}</span>
                </span>
                <div class="proicon"></div>
              </div>
              <div class="selectName line-clamp3">{{item.goods_name}}</div>
              <div class="imprice">
                <div class="swiper-title">￥{{item.promote_price}}</div>
                <div class="proprice">￥{{item.shop_price}}</div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="indextype2">
        <div class="cateData" v-for="itemSwiper in indexList.cate_list" :key="itemSwiper.cat_id">
          <router-link :to="{path:'/list',query:{id:itemSwiper.cat_id}}" class="swiperImg">
            <img :src="itemSwiper.p2" alt>
          </router-link>
          <div class="item-swiper">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="itemSwiperList in itemSwiper.goods"
                  :key="itemSwiperList.goods_id"
                >
                  <router-link :to="{path:'/details',query:{id:itemSwiperList.goods_id}}">
                    <img v-lazy="itemSwiperList.goods_thumb" alt class="lazy-img-fadein">
                    <!-- <span class="small-gray" v-if="itemSwiperList.goods_number==0">售罄</span> -->
                    <div class="swiper-title">{{itemSwiperList.shop_price}}</div>
                    <div class="selectName line-clamp line-clamp2">{{itemSwiperList.goods_name}}</div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="indextype3">
        <ul class="list">
          <li v-for="item in dataList" :key="item.goods_id">
            <router-link :to="{path:'/details',query:{id:item.goods_id}}">
              <div class="imgwrap">
                <div class="img-ratio-wrap">
                  <img v-lazy="item.img.small" alt class="lazy-img-fadein">
                  <div class="proicon" v-if="item.end_time!=undefined"></div>
                </div>
              </div>
              <div class="imgname line-clamp line-clamp2">{{item.goods_name}}</div>
              <!-- <div class="description">
                <p>促销</p>
                <p>优惠券</p>
              </div>-->
              <div class="price-buy display-flex">
                <div class="price" v-if="item.end_time!=undefined">￥{{item.promote_price}}</div>
                <div class="price" v-else>￥{{item.shop_price}}</div>
                <div class="buy"></div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <footer class="footer">
      <foot-nav></foot-nav>
    </footer>
  </div>
</template>
<script>
import "../../plugins/swiper.min.js";
import "../../style/swiper.min.css";
import MeScroll from "mescroll.js";
import "mescroll.js/mescroll.min.css";
import footNav from "../../components/footer/footer";
import { setTimeout } from "timers";
export default {
  components: {
    footNav
  },
  data() {
    return {
      indexList: [], //首页数据
      mescroll: null, //mescroll实例对象
      dataList: [], //列表数据
      sreach: null,
      prolist: [],
      time: {
        day: "00",
        hr: "00",
        min: "00",
        sec: "00"
      },
      showTime: false //是否显示时间
    };
  },
  mounted: function() {
    // this.getData();
    setTimeout(() => {
      this.mescroll = new MeScroll(this.$refs.mescroll, {
        down: {
          use: false
        },
        up: {
          callback: this.upCallback,
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 6 //每页数据条数,默认10
          },
          noMoreSize: 6,
          toTop: {
            // 配置回到顶部按钮
            src: "./static/images/mescroll-totop.png" // 图片路径,默认null (建议写成网络图,不必考虑相对路径)
          }
        }
      });
    }, 500);
  },
  methods: {
    // 倒计时
    countdown: function(timestamp) {
      var that = this;
      setInterval(function() {
        timestamp--;
        let day = Math.floor(timestamp / 86400);
        let hr = Math.floor((timestamp / 3600) % 24);
        let min = Math.floor((timestamp / 60) % 60);
        let sec = Math.floor(timestamp % 60);
        that.time.day = day > 9 ? day : "0" + day;
        that.time.hr = hr > 9 ? hr : "0" + hr;
        that.time.min = min > 9 ? min : "0" + min;
        that.time.sec = sec > 9 ? sec : "0" + sec;
        that.showTime = true;
      }, 1000);
    },
    getData: function() {
      this.$api.appdata
        .homePage()
        .then(res => {
          this.indexList = res.data.data;
        })
        .then(() => {
          new Swiper(".cateData .swiper-container", {
            speed: 600,
            slidesPerView: 3,
            paginationClickable: true,
            spaceBetween: 30,
            loop: false,
            autoplay: false,
            resistanceRatio: 0
          });
        });
    },
    proData() {
      var data = {
        filter: { intro: "promotion" },
        pagination: { count: 3, page: 1 }
      };
      this.$api.appdata.homeList(data).then(res => {
        this.prolist = res.data.data;
        this.countdown(this.prolist[0].end_time);
      });
    },
    upCallback(page) {
      var data = {
        filter: { intro: "hot" },
        pagination: { count: page.size, page: page.num }
      };
      this.$api.appdata
        .homeList(data)
        .then(res => {
          let arr = res.data.data;
          if (page.num == 1) this.dataList = [];
          this.dataList = this.dataList.concat(arr);
          this.$nextTick(() => {
            this.mescroll.endSuccess(arr.length);
          });
        })
        .catch(e => {
          mescroll.endErr();
        });
    },
    search: function() {
      this.$router.push({ path: "/list", query: { key: this.sreach } });
    }
  },
  activated() {
    this.getData();
    this.proData();
  },
  beforeRouteEnter(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      if (vm.mescroll) {
        // 恢复到之前设置的isBounce状态
        if (vm.mescroll.lastBounce != null)
          vm.mescroll.setBounce(vm.mescroll.lastBounce);
        // 滚动到之前列表的位置 (注意:路由使用keep-alive才生效)
        if (vm.mescroll.lastScrollTop) {
          vm.mescroll.setScrollTop(vm.mescroll.lastScrollTop);
          setTimeout(() => {
            // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
            vm.mescroll.setTopBtnFadeDuration(0); // 设置回到顶部按钮显示时无渐显动画
          }, 16);
        }
      }
    });
  },
  // 离开路由时,记录列表状态
  beforeRouteLeave(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    if (this.mescroll) {
      this.mescroll.lastBounce = this.mescroll.optUp.isBounce; // 记录当前是否禁止ios回弹
      this.mescroll.setBounce(true); // 允许bounce
      this.mescroll.lastScrollTop = this.mescroll.getScrollTop(); // 记录当前滚动条的位置
      this.mescroll.hideTopBtn(0); // 隐藏回到顶部按钮,无渐隐动画
    }
    next();
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
// *{
//   border:1px solid;
// }
.mescroll {
  position: fixed;
  top: 0;
  bottom: 2rem;
  width: 100%;
  height: auto;
  overflow-x: hidden;
  background: #f2f2f2;
}
.banner {
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.searh-wrap {
  box-sizing: border-box;
  .input-wrap {
    padding: 0.4rem 0.4rem;
    position: relative;
    background: #f2f2f2;
    .searp-searchicon {
      background: url(../../../static/images/searchicon.png) center 0 no-repeat;
      width: 0.8rem;
      height: 0.8rem;
      background-size: 0.7rem;
      position: absolute;
      left: 4rem;
      top: 0.9rem;
    }
    input {
      flex: 1;
      width: 85%;
      border: 0;
      height: 1.52rem;
      text-align: center;
      color: #333;
      background-color: #e5e5e5;
      outline: none;
      border-radius: 0.38rem;
    }
  }
  .search {
    width: 1.6rem;
    height: 1.2rem;
    text-align: center;
    font-size: 0.56rem;
    display: inline-block;
    padding: 0.2rem;
    box-sizing: border-box;
  }
}
.indextype {
  background: #f2f2f2;
  padding: 0.4rem;
  > div {
    // background: #fff;
    width: 1.9rem;
    height: 1.9rem;
    margin-right: 0.68rem;
    flex: 1;
    a {
      display: block;
      font-size: 0;
      img {
        width: 1.2rem;
        height: 1.2rem;
        display: block;
        margin: 0 auto;
      }
      p {
        font-size: 0.56rem;
        color: #515151;
        letter-spacing: -0.03rem;
        text-align: center;
      }
    }
  }
}
.indextype > div:last-child {
  margin-right: 0;
}
.indextype1 {
  background: #fff;
  h2 {
    width: 100%;
    padding: 0.2rem 0.6rem;
    overflow: hidden;
    .imicon {
      background: url(../../../static/images/activ.png) center 0 no-repeat;
      width: 0.9rem;
      height: 0.9rem;
      background-size: 0.9rem;
    }
    .imtitle {
      flex: 1;
      color: #333333;
      font-size: 0.6rem;
      font-weight: 700;
      margin-left: 0.2rem;
    }
    .more {
      color: #333333;
      font-size: 0.52rem;
      float: right;
      padding: 0.2rem;
    }
  }
  .seckill-act-prolist {
    overflow: auto;
    white-space: nowrap;
    margin: 0;
    background: #f2f2f2;
    overflow-x: hidden;
    padding: 0.2rem 0 0.2rem 0;
    li {
      display: inline-block;
      width: 33.33333%;
      height: auto;
      a {
        display: block;
      }
      .prologo-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        display: block;
        text-align: center;
        img {
          width: 5.2rem;
          height: 5.2rem;
          margin: auto;
        }
      }
    }
    .line-clamp3 {
      -webkit-line-clamp: 1;
      height: 1.52em;
      line-height: 0.82rem;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
    }
    .imprice {
      height: 0.82rem;
      overflow: hidden;
      line-height: 0.82rem;
    }
    .swiper-title {
      padding: 0.07rem 0;
      font-size: 0.55rem;
      color: #ff0000;
      display: inline-block;
    }
    .selectName {
      font-size: 0.52rem;
      color: #525252;
    }
    .proprice {
      color: #999;
      font-size: 0.5rem;
      display: inline-block;
      text-decoration: line-through;
      display: none;
    }
    .sale-badge {
      display: none;
      font-size: 0.48rem;
      color: #fff;
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      width: 100%;
      background-color: #eb8e83;
      height: 0.7rem;
    }
    .daotime {
      background: #fff;
      border-radius: 50%;
      color: #d81e07;
      padding: 0.05rem;
    }
    .proicon {
      background: url(../../../static/images/proicon.png) center 0 no-repeat;
      width: 1.2rem;
      height: 1.2rem;
      background-size: 1.1rem;
      position: absolute;
      right: 0.2rem;
      top: 0.2rem;
    }
    .daoday {
      color: #d81e07;
    }
  }
}
.indextype2 {
  width: 100%;
  height: auto;
  .cateData {
    width: 100%;
    .swiperImg {
      background: #ffffff;
      min-height: 150px;
      display: block;
      width: 100%;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .item-swiper {
      padding: 0.2rem;
      background: #fff;
    }
    .swiper-slide a {
      display: block;
      img {
        width: 4.4rem;
        height: 4.4rem;
        margin: auto;
      }
      .swiper-title {
        padding: 0.07rem 0;
        text-align: center;
        font-size: 0.52rem;
        color: #ff0000;
      }
      .selectName {
        font-size: 0.52rem;
        color: #525252;
      }
    }
  }
}
// 上拉加载数据
.indextype3 {
  background: #f2f2f2;
  overflow: hidden;
  padding-top: 0.4rem;
  .list {
    position: relative;
    overflow: hidden;
  }
}
.list li {
  margin: 0;
  position: relative;
  background-color: #fff;
  width: 50%;
  box-sizing: border-box;
  float: left;
}
.list li:nth-child(2n) {
  border-top: 2px solid #f4f4f4;
  border-left: 1px solid #f4f4f4;
}
.list li:nth-child(2n-1) {
  border-right: 1px solid #f4f4f4;
  border-top: 2px solid #f4f4f4;
}
.list li .imgwrap {
  width: 100%;
  padding: 0.8rem;
  box-sizing: border-box;
}
.img-ratio-wrap {
  position: relative;
  height: 0;
  width: 100%;
  padding-bottom: 100%;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .proicon {
    background: url(../../../static/images/proicon.png) center 0 no-repeat;
    width: 1.2rem;
    height: 1.2rem;
    background-size: 1.1rem;
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
  }
}
.list li .imgname {
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
  background: url(../../../static/images/cartpayred.png) center 0 no-repeat;
  background-size: 0.8rem;
  margin-left: 3.5rem;
  width: 1rem;
  height: 0.8rem;
  margin-top: 0.15rem;
}
.line-clamp {
  -webkit-line-clamp: 2;
  height: 2.92em;
  line-height: 0.82rem;
}
.list li .description {
  font-size: 0;
  margin: 0 0.6rem 0.2rem 0.6rem;
}
.description p {
  font-size: 0.54rem;
  line-height: 0.54rem;
  color: #d81e06;
  display: inline-block;
  padding: 0.15rem;
  border-radius: 0.28rem;
  border: solid 0.03rem #d81e06;
}
.description p:last-child {
  margin-left: 0.2rem;
}
.mescroll-totop {
  bottom: 80px;
}

// 底部
footer {
  position: fixed;
  bottom: 0;
  z-index: 100;
  width: 100%;
  border-top: 1px solid #f3f3f3;
  box-sizing: border-box;
  background: #fff;
}
</style>

