<template>
  <div v-wechat-title="$route.meta.title" v-if="isOrder">
    <div class="mescroll">
      <div class="addr">
        <router-link :to="{path:'/addressList'}" class="display-flex">
          <div class="adder-icon"></div>
          <!-- <div class="adder-to" @click="address()">请先添加收货地址</div> -->
          <div class="adder-default">
            <div class="display-flex">
              <div class="addname">{{address.consignee}}</div>
              <div class="addphone">{{address.tel}}</div>
            </div>
            <div
              class="address-detail"
            >{{address.province_name}} {{address.city_name}} {{address.district_name}} {{address.address}}</div>
          </div>
          <div class="adder-go"></div>
        </router-link>
      </div>
      <div class="adderlist" v-for="ordshop in orderList.goods_list" :key="ordshop.goods_id">
        <!-- {{ordshop}} -->
        <div class="list-shop display-flex">
          <div class="list-img">
            <img :src="ordshop.goods_thumb" alt>
          </div>
          <div class="list-title">
            <div class="line-clamp2 name">{{ordshop.goods_name}}</div>
            <div class="display-flex price-num">
              <div class="prcie">￥{{ordshop.goods_price}}</div>
              <div class="num">X {{ordshop.goods_number}}</div>
            </div>
          </div>
        </div>
        <!-- <div class="list-num">共计2件商品 <span>合计:</span><span>￥208.00</span></div> -->
      </div>
      <div class="dist display-flex" @click="dist">
        <div class="dist-left">配送方式</div>
        <div class="dist-right" v-for="(orderdist,inde) in orderList.shipping_list" :key="inde">
          <div v-show="orderdist.checked==1">
            <input type="hidden" ref="input2" :value="orderdist.shipping_id">
            {{orderdist.shipping_name}}
          </div>
        </div>
        <div class="right-arrow"></div>
      </div>
      <div class="pay display-flex" @click="payment()">
        <div class="pay-left">支付方式</div>
        <div class="pay-right" v-for="(pay,ind) in orderList.payment_list" :key="ind">
          <input type="hidden" ref="input1" :value="pay.pay_id">
          {{pay.pay_name}}
        </div>
        <div class="right-arrow"></div>
      </div>
      <div class="coupons display-flex" @click="coupon()">
        <div class="dist-left">优惠券</div>
        <div class="dist-right" v-if="total.bonus_type_name==null">请选择</div>
        <div class="dist-right" v-else>{{total.bonus_type_name}}</div>
        <div class="right-arrow"></div>
      </div>
      <div class="fee">
        <div class="display-flex left-flex">
          <span>商品金额:</span>
          <span>￥{{total.goods_amount}}</span>
        </div>
        <!-- <div class="display-flex left-flex">
                <span>优惠抵扣:</span>
                <span>-￥0</span>
        </div>-->
        <div class="display-flex left-flex">
          <span>商品税费:</span>
          <span>￥{{total.goods_tax}}</span>
        </div>
        <div class="display-flex left-flex">
          <span>商品优惠:</span>
          <span>￥{{total.discount}}</span>
        </div>
        <div class="display-flex left-flex">
          <span>运费:</span>
          {{total.age}}
          <span>￥{{total.shipping_fee}}</span>
        </div>
      </div>
    </div>
    <footer class="footer display-flex left-flex">
      <div class="al-price">实付款: ￥{{total.amount}}</div>
      <div class="al-btn">
        <button class="al-btn-fill pay-btn" @click="subord()">提交订单</button>
      </div>
    </footer>
    <!-- <mt-popup class="popup"
        v-model="popupVisible"
        position="bottom">
        支付宝
        微信
    </mt-popup>-->
    <mt-popup class="popup" v-model="popupVisiblet" position="bottom">
      <div
        v-for="(orderdist,index) in checkshipp"
        class="check"
        @click="check(orderdist.shipping_id)"
        :key="index"
      >
        <input type="hidden" v-model="orderdist.checked" v-if="orderdist.checked==1"> 
        {{orderdist.shipping_name}}
      </div>
    </mt-popup>
    <mt-popup class="coupon" v-model="popupVisiblecou" position="bottom">
      <div class="contitle display-flex">
        <div class="consel">
          <p @click="conyes" :class="{active:isConY}">可用优惠券({{conNum}})</p>
          <p @click="conno" :class="{active:isConN}">不可用优惠券(0)</p>
        </div>
        <!-- <div class=""></div> -->
      </div>
      <div class="conempty" v-if="isConN">
        <ul>
          <li class="display-flex">
            <div class="conempleft">
              <p>￥200</p>
              <p>满￥1000使用</p>
            </div>
            <div class="conempright">
              <p>满1000减200</p>
              <p>2019.01.31至2019.02.10</p>
            </div>
          </li>
        </ul>
        <ul>
          <li class="display-flex">无可用优惠券</li>
        </ul>
      </div>
      <div class="conempty cony" v-if="isConY">
        <ul class="conlen1" v-if="conLi">
          <li class="display-flex" v-for="(item,index) in conponlist" :key="index" @click="Presel(index)">
            <div class="conempleft">
              <p>￥{{item.bonus_money}}</p>
              <p>满￥{{item.min_goods_amount}}使用</p>
            </div>
            <div class="conempright">
              <p>{{item.type_name}}</p>
              <p>{{item.use_start_date}}至{{item.use_end_date}}</p>
            </div>
          </li>
        </ul>
        <div class="conlen0" v-if="conEx">
          <div class="display">暂无可用优惠券
            <span class="exchange" @click="conlen0cl()">兑换</span>
          </div>
        </div>
        <div class="cliconlen" v-if="conLen">
          <div class="cpninput">
            <input type="text" placeholder="兑换码" v-model="exchtit">
            <span class="inputcon" @click="inpclick(exchtit)">兑换</span>
          </div>
        </div>
      </div>
      <div class="conbutton" @click="conyes">确认</div>
    </mt-popup>
     <!-- 弹出 -->
    <pop-Up v-if="isShow" @closeTip="isShow = false" :tiptitle="tiptitle"></pop-Up>
    <!-- 海关弹出 -->
    <div class="customspop" v-if="custPop">
      <div class="popup">
        <p class="potitle">因海关需要,请填写您的身份信息</p>
        <input type="text" placeholder="您的真实姓名" v-model="name">
        <input type="text" placeholder="您的身份证号（将加密处理）" v-model="cardId">
       <div class="button">
        <button class="al-btn al-btn-block" @click="save">确定</button>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Popup } from "mint-ui";
import { mapState, mapMutations } from "vuex";
import popUp from "../../components/common/popup";
export default {
  components: {
    popUp
  },
  data() {
    return {
      orderList: [], //order数据
      checkshipp:[], //物流
      address: {}, //地址
      total: {}, //价格
      popupVisible: false, //配送弹出
      popupVisiblet: false, //支付弹出
      popupVisiblecou: false, //优惠券弹出
      rec_id: null, //传过来的id
      types: null, //端类型
      // payid:null,       //支付id
      isOrder:false,
      isShow: false, //弹出提示
      isConN: false,
      isConY: true,
      conLi: false, //可用优惠券显示
      conLen: false,
      conEx: false,
      exchtit:null, //优惠券兑换码
      conNum:0,    //可用优惠券数量
      conponlist:[],
      bonus_id:null,
      name: null, //姓名
      cardId: null, //身份证
      custPop:false,   //海关弹出   
    };
  },
  computed: {
    ...mapState(["addressid"])
  },
  created() {
    var rec = this.$route.query.rec_id;
    if (typeof rec == "object") {
      this.rec_id = rec.join(",");
    } else {
      this.rec_id = rec;
    }
    this.initData();
  },
  mounted: function() {},
  methods: {
    initData() {
      if (
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        this.types = "mc";
      } else {
        this.types = "pc";
      }
      var data = {
        bonus_id:this.bonus_id,
        address_id: this.addressid,
        rec_id: this.rec_id,
        type: this.types,
      };
      this.$api.appdata.orderList(data).then(res => {
        if (res.data.status.succeed == 0) {
          if (res.data.status.error_code == 10009) {
            this.$router.push({ path: "/addressList/addAddress" });
          } else if (res.data.status.error_code == 10004) {
            // this.$router.go(-1)
          }
          // if(res.data.data=="收货信息为空"){
          // this.$router.push({path:"/addressList/addAddress"})
          // }else if(res.data.data=="购物车中还没有商品"){
          //     this.$router.go(-1)
          // }
          // this.$router.replace({ path: "/cartpay"}); 
        } else {
          this.isOrder = true;
          this.orderList = res.data.data;
          this.checkord=res.data.data
          this.checkshipp=res.data.data.shipping_list;
          this.address = res.data.data.consignee;
          this.total = res.data.data.total;
        }
        // this.payid=res.data.data.payment_list[0].pay_id;
      });
    },
    // 支付
    payment() {
      this.popupVisible = true;
    },
    // 配送
    dist() {
      this.popupVisiblet = true;
    },
    // 优惠券
    coupon() {
      this.popupVisiblecou = true;
      var data = {
        goods_amount: this.total.goods_amount,
        type: 1
      };
      this.$api.appdata.conpon(data).then(res => {
        this.conponlist = res.data.data;
        this.conNum=this.conponlist.length;
        if (this.conponlist.length == 0) {
          this.conLi = false;
          this.conEx = true;
        } else {
          this.conLi = true;
          this.conEx = false;
        }
      });
    },
    // 选择配送方式
    check(shipid) {
      var shipid = shipid;
      var amount = this.orderList.total.goods_amount;
      var goods_tax = this.orderList.total.goods_tax;
      var weight = this.orderList.total.weight;
      var province = this.orderList.consignee.province;
      var seller = this.orderList.goods_list[0].seller_note;
      //  this.$set(this.orderList.shipping_list[0],"checked",0)
      //  console.log(this.orderList.shipping_list)
      // this.$set(this.orderList.shipping_list[1],"checked",1)
      var data = {
        // shipping_id: shipid,
        // goods_amount: amount,
        // goods_tax: goods_tax,
        // weight: weight,
        // province: province,
        // seller_note: seller
         shipping_id: shipid,
         bonus_id:this.bonus_id,
        address_id: this.addressid,
        rec_id: this.rec_id,
        type: this.types,
      };
      this.$api.appdata.orderList(data).then(res => {
        this.isOrder = true;
        this.orderList = res.data.data;
        // this.address = res.data.data.consignee;
        this.total = res.data.data.total;
      });
      this.popupVisiblet = false;
    },
    // 提交订单
    subord() {
      var data = {
        bonus_id:this.bonus_id,
        rec_id: this.rec_id,
        pay_id: this.$refs.input1[0].value,
        shipping_id: this.$refs.input2[0].value,
        address_id: this.orderList.consignee.address_id
      };
      this.$api.appdata.done(data).then(res => {
        if(res.data.status.error_code==102){
          this.custPop=true;
          return false;
        }else{
        this.pay = res.data.data;
        this.$router.replace({ path: "/pay", query: { paydata: this.pay } });
        }
        
        
      });
    },
    // 可用
    conyes() {
      this.isConY = true;
      this.isConN = false;
    },
    // 不可用
    conno() {
        return false;
      this.isConY = false;
      this.isConN = true;
    },
    //兑换
    conlen0cl() {
      this.conLen = true;
      this.conEx = false;
    },
    inpclick(contit){
        var data={
            bonus_sn:contit
        }
         this.$api.appdata.exchange(data).then(res => {
             if(res.data.status.succeed==1){
                 this.coupon();
                 this.conLen = false;
                 this.isConY=true;
             }else{
                this.isShow = true;
                this.tiptitle = "信息有误";
             }
         })
    },
    conyes(){
        this.popupVisiblecou = false;
    },
    Presel(index){
        this.bonus_id=this.conponlist[index].bonus_id;
        this.initData();
        // this.popupVisiblecou = false;
    },
    save(){
      var idcard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      var that = this;
      if (this.name == null) {
        that.isShow = true;
        that.tiptitle = "请输入姓名";
      } else if (this.cardId == null) {
        that.isShow = true;
        that.tiptitle = "请输入身份证号码";
      } else if (!idcard.test(this.cardId)) {
        that.isShow = true;
        that.tiptitle = "请输入有效身份证号码";
      } else {
        var data = {
          name: this.name,
          card: this.cardId
        };
        this.$api.appdata.addreal(data).then(res => {
            if(res.data.status.succeed==0){
                if(res.data.status.error_code=='card_error'){
                    that.isShow = true;
                    that.tiptitle = "身份证格式不正确";
                }
            }else if(res.data.status.succeed==1){
              this.custPop=false;
            }
        })
      }
    }
  },
  watch: {
    $route(to, from) {
      if (from.query.rec_id.length != 1) {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
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
.addr {
  height: auto;
  padding: 0.4rem;
  line-height: 0.8rem;
  background: #fff;
  margin-bottom: 0.3rem;
  align-items: center;
  box-sizing: border-box;
  .adder-to {
    font-size: 0.8rem;
    color: #818181;
    flex: 1;
    padding: 0 0.4rem;
  }
  .adder-icon {
    width: 1rem;
    height: 1rem;
    background: url(../../../static/images/address.png) center 0 no-repeat;
    // background-position: 0.2rem 0.2rem;
    background-size: 1rem;
  }
  .adder-go {
    width: 1rem;
    height: 1rem;
    background: url(../../../static/images/address.png) center 0 no-repeat;
    // background-position: 0.2rem 0.2rem;
    background-size: 1rem;
  }
  .adder-default {
    flex: 1;
    color: #666;
    height: 100%;
    line-height: 100%;
  }
}
.adder-default {
  padding: 0 0.4rem;
  > div {
    margin-top: 0.2rem;
  }
  .addname {
    font-size: 0.58rem;
  }
  .addphone {
    font-size: 0.58rem;
    margin-left: 1rem;
  }
  .address-detail {
    font-size: 0.52rem;
    margin-top: 0.2rem;
  }
}
.adderlist {
  background: #fff;
  margin-bottom: 0.4rem;
  .list-num {
    height: 1.6rem;
    line-height: 1.6rem;
    font-size: 0.64rem;
    color: #515151;
    border-top: 0.1rem solid #e5e5e5;
    padding: 0 0.6rem;
    text-align: right;
    span:first-child {
      margin-left: 0.4rem;
    }
    span:last-child {
      color: #d81e06;
    }
  }
}
.list-shop {
  padding: 0.4rem 0.6rem;
  border-bottom: 1px solid #f4f4f4;
}
.list-img {
  border: 1px solid #f2f2f2;
  margin-right: 0.266667rem;
  position: relative;
  img {
    width: 3.1rem;
    height: 3.1rem;
    display: block;
  }
}
.list-title {
  padding: 0.2rem;
  flex: 1;
}
.name {
  font-size: 0.56rem;
  color: #515151;
  flex: 1;
  width: 100%;
  margin-bottom: 0.3rem;
}
.price-num {
  width: 100%;
  font-size: 0.6rem;
  .prcie {
    margin-right: 0.4rem;
    color: #e72714;
  }
  .num {
    color: #999;
  }
}
// 配送方式
.dist {
  background: #fff;
  height: 1.6rem;
  line-height: 1.6rem;
  font-size: 0.54rem;
  color: #515151;
  padding: 0 0.4rem;
  margin-bottom: 0.4rem;
  .dist-left {
    flex: 1;
  }
}
.coupons {
  background: #fff;
  height: 1.6rem;
  line-height: 1.6rem;
  font-size: 0.54rem;
  color: #515151;
  padding: 0 0.4rem;
  margin-bottom: 0.4rem;
  .dist-left {
    flex: 1;
  }
}
.mint-popup-bottom {
  width: 100%;
  .check {
    padding: 0.5rem 0.4rem;
    font-size: 0.6rem;
  }
}
.pay {
  background: #fff;
  height: 1.6rem;
  line-height: 1.6rem;
  font-size: 0.54rem;
  color: #515151;
  padding: 0 0.4rem;
  margin-bottom: 0.4rem;
  .pay-left {
    flex: 1;
  }
}
.right-arrow {
  background: url(../../../static/images/right.png) center 0 no-repeat;
  background-size: 0.5rem;
  display: block;
  width: 0.5rem;
  height: 0.5rem;
}
.fee {
  .left-flex {
    background: #fff;
    height: 1.6rem;
    line-height: 1.6rem;
    font-size: 0.54rem;
    color: #515151;
    padding: 0 0.4rem;
    border-bottom: 1px solid #f5f5f5;
    span:first-child {
      flex: 1;
    }
  }
}
// 优惠券弹出
.coupon {
  width: 100%;
  height: 16rem;
  background-color: #ffffff;
  .consel {
    height: 2rem;
    width: 100%;
    border-bottom: 0.04rem solid #dadada;
    p {
      width: 50%;
      float: left;
      font-size: 0.6rem;
      padding: 0.6rem 0;
      text-align: center;
      color: #b2b2b2;
    }
    .active {
      color: #000000;
    }
  }
  .conbutton {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2rem;
    background-color: #d81e06;
    font-size: 0.6rem;
    color: #ffffff;
    text-align: center;
    line-height: 2rem;
  }
  .conempty {
    height: 100%;
    li {
      width: 14.8rem;
      height: 2.8rem;
      background-color: #eeeeee;
      border-radius: 0.3rem;
      margin: 0.2rem auto;
      p {
        font-size: 0.5rem;
        text-align: center;
        letter-spacing: 0.02rem;
        margin-bottom: 0.2rem;
      }
      .conempleft p:first-child {
        margin-top: 0.4rem;
        font-size: 0.8rem;
      }
      .conempright p:first-child {
        margin-top: 0.6rem;
      }
    }
    .conempleft {
      width: 4rem;
      border-right: 1px solid #999;
      height: 100%;
    }
    .conempright {
      flex: 1;
      height: 100%;
    }
  }
  .cony {
    .conlen1 {
      height: 100%;
      li {
        border: 1px solid #fa9909;
        background: #ffe8dd;
        .exchange {
          color: #e72714;
          font-size: 0.5rem;
        }
      }
    }
    .conlen0 {
      height: 100%;
      font-size: 0.55rem;
      .display {
        width: 100%;
        height: 100%;
        text-align: center;
        padding: 30% 0;
      }
      .exchange {
        color: #e72714;
        padding: 0.2rem;
      }
    }
    .cliconlen {
      height: 100%;
      .cpninput {
        width: 100%;
        height: 100%;
        text-align: center;
        padding: 4rem 0;
      }
      input {
        width: 50%;
        border: 0;
        height: 1.2rem;
        text-align: center;
        color: #333;
        background-color: #f5f0f0;
        outline: none;
        border-radius: 0.38rem;
      }
    }
    .inputcon {
      color: #e72714;
      padding: 0.1rem;
      font-size: 0.54rem;
      border: 2px solid #e72714;
    }
  }
}
footer {
  position: fixed;
  bottom: 0;
  height: 2rem;
  width: 100%;
  background: #fff;
  .al-btn {
    width: 4.8rem;
    overflow: hidden;
    .pay-btn {
      background-color: #d81e06;
      color: #fff;
      font-size: 0.6rem;
      padding: 0.61rem 0;
      display: block;
      width: 100%;
    }
  }
  .al-price {
    flex: 1;
    line-height: 2rem;
    font-size: 0.6rem;
    color: #d81e06;
    padding: 0 0.6rem;
  }
}

// 海关弹出
.customspop{
  position: fixed;
  top: 0;
  bottom: 0rem;
  width: 100%;
  height: auto;
  overflow-x: hidden;
  background: rgba(0, 0, 0, 0.8);
  .popup{
    background: #fff;
    margin: 0 auto;
    padding: 0 0.3rem;
    width: 10rem;
    height: 6.5rem;
    border-radius: 0.3rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 30%;
    .potitle{
      font-size: 0.58rem;
      padding: 0.3rem 0;
    }
    input {
    width: 100%;
    border: 0;
    outline: none;
    display: block;
    padding: 0.2rem 0.32rem;
    background: #fff;
    font-size: 0.54rem;
    color: #999;
    border: 1px solid #e5e5e5;
    margin-bottom: 0.2rem;
  }
  .button{
        padding: 0.2rem 0.2rem;
    margin: 0 auto;
    text-align: center;
    button {
      background: #d81f06;
      color: #fff;
      font-size: 0.65rem;
      padding: 0.28rem 3.06rem;
      border-radius: 0.2rem;
    }
  }
  }
}
</style>


