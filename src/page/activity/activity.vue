<template>
  <div ref="mescroll" class="mescroll" v-wechat-title="$route.meta.title">
    <ul class="list">
      <li v-for="item in dataList" :key="item.goods_id">
        <router-link :to="{path:'/details',query:{id:item.goods_id}}">
          <div class="imgwrap">
            <div class="img-ratio-wrap">
              <img :src="item.goods_thumb" alt>
              <div class="proicon"></div>
            </div>
          </div>
          <div class="imgname line-clamp line-clamp2">{{item.goods_name}}</div>
          <div class="price-buy display-flex">
            <div class="price">￥{{item.promote_price}}</div>
            <div class="oldprice">￥{{item.shop_price}}</div>
            <div class="buy"></div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import MeScroll from "mescroll.js";
import "mescroll.js/mescroll.min.css";
export default {
  data() {
    return {
      mescroll: null, //mescroll实例对象
      dataList: [] //数据
    };
  },
  created() {
    // this.intData();
  },
  mounted: function() {
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
  },
  methods: {
    upCallback(page) {
      var data = {
        filter: { intro: "promotion" },
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.mescroll {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  z-index: 204;
  overflow-y: auto;
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
      .proicon {
        background: url(../../../static/images/proicon.png) center 0 no-repeat;
        width: 1.3rem;
        height: 1.3rem;
        background-size: 1.3rem;
        position: absolute;
        right: 0;
        top: 0;
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
    .price-buy .oldprice {
      font-size: 0.54rem;
      color: #666;
      text-align: left;
      line-height: 1rem;
      text-decoration: line-through;
      margin-left: 0.2rem;
    }
    .price-buy .buy {
      // background: url(../../../static/images/cartpayred.png) center 0 no-repeat;
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




