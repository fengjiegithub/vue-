<template>
  <div v-wechat-title="$route.meta.title">
    <div class="mescroll">
      <div class="conent">
        <div class="content-header">
          <div class="icon">
            <div class="nobtnicon"></div>
          </div>{{ordList.seller_note}}
        </div>
        <ul class="cart-pros">
          <li class="display-flex" v-for="(item,index) in ordList.goods" :key="index">
            <input type="hidden">
            <div class="icon" @click="item_click(index)">
              <input type="hidden">
              <div class="btnicon" :class="{active:item.check===true}"></div>
            </div>
            <div class="pro-img-wrap">
              <!-- <router-link :to="{path:'/details',query:{id:item.goods_id}}"> -->
              <img
                :src="item.goods_thumb"
                alt
              >
              <!-- </router-link> -->
            </div>
            <div class="display-flex top-flex pro-details">
              <div class="line-clamp2 name">{{item.goods_name}}</div>
              <div class="cart-tax">
                <span>￥{{item.goods_price}}</span>
              </div>
              <!-- <div class="cart-price">
                <span class="price">实付金额:44.00</span>
              </div> -->
              <!-- <div class="btn-group display-flex">
                <div class="reduce btn">-</div>
                <input
                      type="text"
                      name="num"
                      id
                      placeholder
                      class="num"
                      v-model="item.goods_number"
                >
                <div class="btnadd btn">+</div>
              </div> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 脚部footer -->
    <footer class="footer">
      <div class="display-flex total-price">
        <div class="display-flex left-price">
          <!-- <div class="carticon">
            <input type="hidden">
            <div class="btnicon"></div>
          </div>
          <div class="select-all">全选</div> -->
          <!-- <div class="all-price">
            <p class="price-top">
              已选退款金额:￥
              <i class="redprice">{{ordList.amount}}</i>
            </p>
            <p class="prcie-bottom">(不包含税费)</p>
          </div> -->
        </div>
        <div class="checkout">
          <!-- <router-link :to="{path:'/aftersales/apply',query:{orderid:dataid}}"> -->
            <button class="al-btn al-btn-fill" @click="conapp">确认申请</button>
          <!-- </router-link> -->
        </div>
      </div>
    </footer>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderid: null,
      ordList:{},
      goodid:null,
      dataid:[],
    };
  },
  created() {
    this.orderid = this.$route.query.order_id;
    this.intData();
  },
  mounted() {
      
  },
  methods: {
      intData() {
      var data = {
        order_id: this.orderid
      };
      this.$api.appdata.orderdet(data).then(res => {
        this.ordList = res.data.data;
        for(let arr in this.ordList.goods){
          this.$set(this.ordList.goods[arr],"check", false)
        }
      });
    },
    item_click(index){
      var item=this.ordList.goods[index];
      item.check = !item.check;
      let goodid=this.ordList.goods[index].goods_id;
      this.dataid.push(goodid)
    },
    conapp(){
      for(let arr in this.ordList.goods){
        if(this.ordList.goods[arr].check==true){
          this.$router.push({ path: "/aftersales/apply",query:{rec_id: this.orderid,goodid:this.dataid}});
        }
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
// 列表样式
.conent {
  background: #fff;
  .content-header {
    font-size: 0.54rem;
    padding: 0.3rem 0.1rem;
    border-bottom: 1px solid #f8f8f8;
    border-top: 1px solid #f8f8f8;
    align-items: center;
    line-height: 22px;
    .icon {
      display: inline-block;
      position: relative;
    }
    .btnicon {
      margin-right: 0.47rem;
      margin-left: 0.27rem;
      margin-bottom: -3px;
    }
  }
  .cart-pros {
    box-sizing: border-box;
  }
  .btnicon {
    width: 0.8rem;
    height: 0.8rem;
    display: inline-block;
    background: url(../../../static/images/circle.png) center 0 no-repeat;
    background-size: 0.8rem;
    background-position: 0;
  }
  .nobtnicon {
    width: 0.8rem;
    height: 0.8rem;
    display: inline-block;
  }
  .icon .active {
    background: url(../../../static/images/redcircle.png) center 0 no-repeat;
    width: 0.8rem;
    height: 0.8rem;
    display: inline-block;
    background-size: 0.8rem;
    background-position: 0;
  }
}
.cart-pros > li {
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
.btn-group .btn {
  width: 1rem;
  height: 1.1rem;
  text-align: center;
  line-height: 1.1rem;
}
.btn-group .num {
  flex: 1;
  border-left: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
  text-align: center;
  width: 10px;
  height: 100%;
}
// footer

.footer {
  position: fixed;
  bottom: 0;
  z-index: 100;
  width: 100%;
  border-top: 1px solid #f3f3f3;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #fff;
  .checkout {
    width: 4.8rem;
    text-align: right;
  }
  .left-price {
    flex: 1;
    padding-left: 0.4rem;
    align-items: center;
  }
}
.left-price .select-all {
  margin: 0 0.46rem;
  font-size: 0.54rem;
  text-align: center;
  line-height: 2rem;
}
.left-price .btnicon {
  width: 0.8rem;
  height: 0.8rem;
  display: inline-block;
  background: url(../../../static/images/circle.png) center 0 no-repeat;
  background-size: 0.8rem;
  background-position: 0;
}
.left-price .btnicon.active {
  width: 0.8rem;
  height: 0.8rem;
  display: inline-block;
  background: url(../../../static/images/redcircle.png) center 0 no-repeat;
  background-size: 0.8rem;
  background-position: 0;
}
.left-price .all-price {
  font-size: 0.52rem;
  padding: 0.2rem 0;
  .price-top {
    padding-bottom: 0.1rem;
    color: #5d5b5b;
  }
  .prcie-bottom {
    color: #908e8e;
  }
}
.redprice {
  color: #d9190c;
}
.al-btn {
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 0;
  cursor: pointer;
  outline: 0;
  margin-bottom: 0;
  padding: 0.48rem 0.26667rem;
  line-height: inherit;
  text-decoration: none;
}
.al-btn-fill {
  width: 100%;
  font-size: 0.69rem;
  color: #fff;
  background: #e72714;
}
// 脚部样式

.router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.4s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>


