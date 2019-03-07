<template>
  <div class="mescroll">
    <div class="addr-logistics">
      <div class="addr">
        <div class="display-flex">
          <div class="name">{{ordList.consignee}}</div>
          <div class="cellphone">{{ordList.tel}}</div>
        </div>
        <div
          class="address-detail line-clamp2"
        >{{ordList.province}} {{ordList.city}} {{ordList.district}} {{ordList.address}}</div>
      </div>
      <div class="logistics">
        <div class="distribution">配送方式:{{ordList.shipping_name}}</div>
        <div class="distime">支付方式:{{ordList.pay_name}}</div>
      </div>
    </div>
    <div class="child-order">
      <div class="pros">
        <div class="attribute" v-for="(item,index) in ordList.goods" :key="index">
          <router-link :to="{path:'/details',query:{id:item.goods_id}}" class="display-flex">
            <div class="pro-img">
              <img :src="item.goods_thumb" alt>
            </div>
            <div class="title">
              <p class="line-clamp2 line-clamp">{{item.goods_name}}</p>
              <div class="display-flex">
                <div class="pro-price">￥{{item.goods_price}}</div>
                <div class="price-num">X{{item.goods_number}}</div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="display-flex left-flex">
          <span>商品总价：</span>
          <span>￥{{ordList.goods_amount}}</span>
        </div>
        <div class="display-flex left-flex">
          <span>运费：</span>
          <span>￥{{ordList.shipping_fee}}</span>
        </div>
        <div class="display-flex left-flex">
          <span>税费：</span>
          <span>￥{{ordList.tax}}</span>
        </div>
        <div class="display-flex left-flex">
          <span>优惠：</span>
          <span>￥{{ordList.bonus}}</span>
        </div>
        <div class="display-flex left-flex">
          <span>实付金额：</span>
          <span>￥{{ordList.amount}}</span>
        </div>
        <div
          class="display-flex left-flex gopay"
          v-if="ordList.order_status=='未确认'&&ordList.pay_status=='未付款'&&ordList.shipping_status=='未发货'"
        >
          <span class="al-btn al-btn-primary-hollow cancel">取消订单</span>
          <span class="al-btn al-btn-primary-hollow al-btn-border-radius" @click=paymon>立即付款</span>
        </div>
        <div
          class="display-flex left-flex gopay"
          v-if="ordList.order_status=='已确认'&&ordList.pay_status=='未付款'&&ordList.shipping_status=='未发货'"
        >
          <span class="al-btn al-btn-primary-hollow cancel">取消订单</span>
          <span class="al-btn al-btn-primary-hollow al-btn-border-radius">立即付款</span>
        </div>
         <div
          class="display-flex left-flex gopay"
          v-if="ordList.order_status=='已确认'&&ordList.pay_status=='已付款'&&ordList.shipping_status=='未发货'"
        >
          <span class="al-btn al-btn-primary-hollow cancel">申请退款</span>
        </div>
        <div
          class="display-flex left-flex gopay"
          v-if="ordList.order_status=='已确认'&&ordList.pay_status=='已付款'&&ordList.shipping_status=='已发货'"
        >
          <span class="al-btn al-btn-primary-hollow cancel">申请退款</span>
          <span class="al-btn al-btn-primary-hollow cancel">查看物流</span>
          <span class="al-btn al-btn-primary-hollow cancel">确认收货</span>
        </div>
         <div
          class="display-flex left-flex gopay"
          v-if="ordList.order_status=='退货中'&&ordList.pay_status=='已付款'&&ordList.shipping_status=='未发货'"
        >
          <span class="al-btn al-btn-primary-hollow cancel">退款进度</span>
          <span class="al-btn al-btn-primary-hollow cancel">退款详情</span>
        </div>
        <div
          class="display-flex left-flex gopay"
          v-if="ordList.order_status=='已确认'&&ordList.pay_status=='已付款'&&ordList.shipping_status=='配货中'"
        >
          <span class="al-btn al-btn-primary-hollow cancel">申请退款</span>
        </div>
        <div
          class="display-flex left-flex gopay"
          v-if="ordList.order_status=='已取消'&&ordList.pay_status=='未付款'&&ordList.shipping_status=='未发货'"
        >
          <!-- <span class="al-btn al-btn-primary-hollow cancel">删除订单</span> -->
        </div>
      </div>
    </div>
    <div class="info">
      <div class="order-time">订单编号：{{ordList.order_sn}}</div>
      <div class="order-time">下单时间：{{ordList.add_time}}</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      ordId: null, //订单id
      ordList: {}   //订单数据
    };
  },
  created: function() {
    this.ordId = this.$route.query.id;
    this.intData();
  },
  mounted: function() {},
  methods: {
    intData() {
      var data = {
        order_id: this.ordId
      };
      this.$api.appdata.orderdet(data).then(res => {
        this.ordList = res.data.data;
      });
    },
    paymon(){
      this.pay={
        amount:this.ordList.amount,
        pay_name:this.ordList.pay_name,
        order_id:this.ordId
      }
      this.$router.replace({ path: "/pay", query: { paydata: this.pay } });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.mescroll {
  position: fixed;
  top: 0;
  bottom: 0rem;
  height: auto;
  overflow-x: hidden;
  background: #f2f2f2;
  padding-top: 0;
}
.child-order {
  background: #fff;
  margin-bottom: 0.4rem;
  .pros {
    padding: 0.2rem 0.6rem;
    overflow: hidden;
  }
}
.addr-logistics {
  padding: 0.533333rem 0.6rem 0.133333rem 0.6rem;
  line-height: 0.533333rem;
  background: #fff;
  margin-bottom: 0.4rem;
  .name {
    font-size: 0.54rem;
    color: #666;
    margin-right: 0.4rem;
  }
  .cellphone {
    font-size: 0.54rem;
    color: #666;
  }
  .address-detail {
    font-size: 0.58rem;
    color: #333;
    line-height: 1.6rem;
    margin: 0.4rem 0 0;
  }
  .addr {
    border-bottom: 1px solid #f4f4f4;
  }
  .logistics {
    font-size: 0.56rem;
    padding: 0.3rem 0 0 0;
    > div {
      line-height: 1rem;
      margin-bottom: 0.4rem;
    }
  }
}
.child-order {
  .attribute {
    padding: 0.3rem 0;
  }
  .pro-img img {
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 0.4rem;
    border: 1px solid #f7f6f6;
  }
  .title {
    padding: 0.4rem;
    flex: 1;
    position: relative;
    font-size: 0.54rem;
    .price-num {
      flex: 1;
      text-align: right;
    }
    .line-clamp {
      margin-bottom: 0.4rem;
    }
    .pro-price {
      color: #e72714;
    }
  }
  .left-flex {
    margin-bottom: 0.3rem;
    font-size: 0.54rem;
    > :first-child {
      flex: 1;
      color: #666;
    }
    > :last-child {
      color: #666;
      font-size: 0.5rem;
    }
  }
  .gopay {
    float: right;
    border-radius: 0.026667rem;
    // border: 1px solid #d2c6c6;
    font-size: 0.5rem;
    span {
      border: 1px solid #d2c6c6;
      margin-left: 0.4rem;
      padding: 0 0.4rem;
      height: 0.9rem;
      line-height: 0.773333rem;
    }
  }
}
.info {
  padding: 0.4rem 0.6rem 0 0.6rem;
  color: #333;
  font-size: 0.51rem;
  background-color: #fff;
  .order-time {
    padding-bottom: 0.6rem;
  }
}
</style>


