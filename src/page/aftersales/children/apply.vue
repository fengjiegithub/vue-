<template>
  <div class="apply" v-wechat-title="$route.meta.title">
    <!-- <div class="out-appli">
        <div class="process">
          <div class="pro-padding refund">
            <div class="steps complete">
              <p class="radius"></p>
              <p class="step-border"></p>
              <p class="step-title">填写申请</p>
            </div>
            <div class="steps is">
              <p class="radius"></p>
              <p class="step-border"></p>
              <p class="step-title">审核订单</p>
            </div>
            <div class="steps">
              <p class="radius"></p>
              <p class="step-title">完成退款</p>
            </div>
          </div>
          <p class="out-instructions">(按要求填写售后申请,可以快速通过审核哦!)</p>
        </div>
    </div>-->
    <div class="out-cent">
      <ul class="cart-pros">
        <li class="display-flex" v-for="(item,index) in ordList.goods" :key="index">
          <div class="pro-img-wrap">
            <img :src="item.goods_thumb" alt>
          </div>
          <div class="display-flex top-flex pro-details">
            <div class="line-clamp2 name line-clamp">{{item.goods_name}}</div>
            <div class="cart-tax">
              <span>￥{{item.goods_price}}</span>
              <span>×{{item.goods_number}}</span>
            </div>
            <!-- <div class="cart-price">
                <span class="price">实付金额:44.00</span>
            </div>-->
          </div>
        </li>
      </ul>
    </div>
    <!-- 申请售后 -->
    <div class="why">
      <div class="padding">
        <h6>
          <span class="border-left"></span>申请售后原因
        </h6>(必填)
        <select name id @change="refund($event)" v-model="refundval">
          <option
            :value="item.reason_name"
            v-for="(item,index) in why"
            :key="index"
          >{{item.reason_name}}</option>
        </select>
      </div>
    </div>
    <!--退款金额-->
    <div class="amount">
      <div class="padding">
        <h6>
          <span class="border-left"></span>退款金额
        </h6>(默认)
        <input :placeholder="'最大'+ordList.amount" v-model="from.refamount">
        <p class="note">注：如需修改退款金额请先与客服人员协商,以免影响退款进度</p>
      </div>
    </div>
    <!--问题描述-->
    <div class="describe">
      <div class="padding">
        <h6>
          <span class="border-left"></span>问题描述
        </h6>(必填)
        <textarea
          cols="5"
          style="resize: none"
          name="TextArea"
          id="TextArea"
          class="box2"
          maxlength="200"
          placeholder="请您描述售后的详细问题,以便更快的通过审核"
          v-model="from.describe"
        ></textarea>
        <p class="font-title">
          <span class="remaining">200</span>/200
        </p>
      </div>
    </div>
    <footer class="out-sub">
      <a class="submit" @click="submit()">提交申请</a>
    </footer>
     <pop-Up v-if="isShow" @closeTip="isShow = false" :tiptitle="tiptitle"></pop-Up>
  </div>
</template>
<script>
import popUp from "../../../components/common/popup";
export default {
  components: {
    popUp
  },
  data() {
    return {
      isShow: false, //遮罩显示，隐藏
      why: [],        //售后原因
      ordList: {},    //数据
      orderid: null,
      from: {
        refund: null, //售后原因
        refamount: null, //金额
        describe: null // 描述
      },
      order_sn: null, //订单编号
      goods_id: null, //商品id
      refundval: "" //默认
    };
  },
  created: function() {
    this.orderid = this.$route.query.rec_id;
    var goodid=this.$route.query.goodid;
     if(typeof(goodid)=="object"){
           this.goods_id=goodid.join(",");
       }else{
           this.goods_id=goodid;
       }
    this.intData();
  },
  mounted: function() {},
  methods: {
    intData() {
      var data = {
        order_id: this.orderid,
        goods_id:this.goods_id
      };
      this.$api.appdata
        .orderdet(data)
        .then(res => {
          this.ordList = res.data.data;
          this.order_sn = res.data.data.order_sn;
          var arrdata = [];
          for (let arr in this.ordList.goods) {
            let rec_id = this.ordList.goods[arr].goods_id;
            arrdata.push(rec_id);
            if (typeof arrdata == "object") {
              this.goods_id = arrdata.join(",");
            } else {
              this.goods_id = arrdata;
            }
          }
        })
        .then(
          this.$api.appdata.refund().then(res => {
            this.why = res.data.data;
            this.refundval = res.data.data[0].reason_name;
          })
        );
    },
    refund(event) {
      this.from.refund = event.target.value;
    },
    submit() {
      if (this.from.describe == null) {
          this.isShow=true;
          this.tiptitle = '请填写售后问题';
          return false;
      }else if(this.from.refamount>this.ordList.amount){
          this.isShow=true;
          this.tiptitle = '不能超出最大金额';
          return false;
      }else {
        var data = {
          order_sn: this.order_sn,
          refundType: "refund",
          refundReason: this.refundval || this.from.refund,
          refundBody: this.from.describe,
          amount: this.from.refamount||this.ordList.amount,
          goods: { goods_id: this.goods_id }
        };
        this.$api.appdata.apply(data).then(res => {
          if (res.data.status.succeed == 1) {
            this.$router.go(-2);
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.apply {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  z-index: 204;
  overflow-y: auto;
}
.out-appli {
  background: #efefef;
  width: 100%;
  height: auto;
  overflow: hidden;
  .process {
    height: auto;
    margin: 5px;
    overflow: hidden;
    box-sizing: border-box;
    background: #ffffff;
    text-align: center;
  }
}
.refund .steps {
  width: 33.333%;
  display: block;
  float: left;
  position: relative;
  .radius {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #dedede;
    display: inline-block;
  }
}
.pro-padding {
  padding: 0.54rem 0.6rem;
  overflow: hidden;
}
.out-appli .complete .radius {
  background-color: #ffffff;
  border: 2px solid #f15656;
  box-sizing: border-box;
}
.out-appli .pro-padding .is .radius {
  background-color: #f15656;
  box-shadow: 0px 1px 6px 0px rgba(6, 0, 1, 0.4);
}
.complete .step-border {
  background-color: #f15656;
}
.complete .step-title {
  color: #000;
}
.step-border {
  width: 86%;
  height: 2px;
  background-color: #dedede;
  display: inline-block;
  position: absolute;
  top: 0.72rem;
}
.step-title {
  color: #c8c8c8;
  font-size: 0.54rem;
}
.out-instructions {
  margin-bottom: 9px;
  color: #f42d2d;
  font-size: 0.5rem;
}
// 列表样式
.out-cent {
  background: #fff;
}
.cart-pros {
  box-sizing: border-box;
  li {
    height: 4.8rem;
    border-bottom: 1px solid #f4f4f4;
    padding: 0.4rem 0.4rem;
    align-items: center;
    .pro-img-wrap {
      position: relative;
      width: 3.6rem;
      height: 3.6rem;
      margin: 0.4rem 0.4rem;
      display: inline-block;
      img {
        width: 3.6rem;
        height: 3.6rem;
        border: 1px solid #f4f4f4;
      }
    }
    .pro-details {
      padding-top: 0.2rem;
      flex: 1;
      font-size: 0.54rem;
      width: 100%;
      align-items: center;
      flex-direction: column;
      position: relative;
      .name {
        color: #333;
        text-align: left;
        padding: 0.1rem 0;
        width: 100%;
      }
      .cart-tax {
        text-align: left;
        width: 100%;
        padding: 0.1rem 0;
        span {
          color: #e72714;
        }
      }
      .cart-price {
        text-align: left;
        width: 100%;
        padding: 0.1rem 0;
        span {
          color: #7c7c7c;
          font-size: 0.54rem;
        }
      }
      .btn-group {
        width: 3rem;
        height: 1.1rem;
        border: 1px solid #cccccc;
        position: absolute;
        bottom: 0.38rem;
        right: 0.2rem;
        border-radius: 10px;
      }
    }
  }
}
.why {
  overflow: hidden;
  margin: 5px 0;
  background: #ffffff;
}
.amount {
  overflow: hidden;
  margin: 5px 0;
  background: #ffffff;
}
.describe {
  overflow: hidden;
  margin: 5px 0;
  background: #ffffff;
  .font-title {
    text-align: right;
  }
}
.padding {
  padding: 10px 9px;
  letter-spacing: 1px;
  color: #c8c8c8;
  font-size: 0.5rem;
  h6 {
    padding-left: 4px;
    padding-right: 4px;
    display: inline-block;
    color: #000000;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0px;
    .border-left {
      width: 5px;
      background: #f42d2d;
      height: 13px;
      display: inline-block;
      vertical-align: bottom;
      margin-bottom: 2px;
      margin-right: 4px;
    }
  }
  select {
    display: block;
    width: 100%;
    background: #efefef;
    padding: 5px 0;
    margin: 10px 0;
    -webkit-appearance: menulist-button;
    font-size: 12px;
    border: none;
    padding-left: 10px;
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
  }
  input {
    -webkit-appearance: none;
    outline: none;
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #efefef;
    border-radius: 5px;
    border: none;
    padding-left: 14px;
    margin: 10px 0;
  }
  textarea {
    border: none;
    background: #efefef;
    margin: 10px 0px;
    min-height: 100px;
    display: block;
    line-height: 20px;
    resize: none;
    padding: 10px 10px;
    width: 100%;
    outline: none;
    border-radius: 5px;
  }
}
.out-sub {
  overflow: hidden;
  margin: 13px 0 0;
  background: #ffffff;
  box-shadow: 0px -3px 15px 0px rgba(4, 0, 0, 0.2);
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  .submit {
    background-color: #f42d2d;
    border-radius: 5px;
    color: #ffffff;
    text-align: center;
    display: block;
    width: 150px;
    height: 35px;
    line-height: 35px;
    margin: 7px auto;
    font-size: 14px;
  }
}
</style>


