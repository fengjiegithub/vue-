<template>
  <div v-wechat-title="$route.meta.title">
    <div class="mescroll">
      <!-- 购物车商品列表 -->
      <div class="content" v-if="isPage">
        <ul class="have-yes" v-for="(itemlist,index) in cartList" :key="index">
          <!-- {{index}} -->
          <li class="conent">
            <div class="content-header">
              <div class="icon" @click="shop_all_check(index)">
                <input type="hidden" class="btnicon" v-model="itemlist.all_checked">
                <div class="btnicon active" :class="{active:itemlist.checked===true}"></div>
              </div>
              {{itemlist.seller_note}}
            </div>
            <ul class="cart-pros" >
              <li class="display-flex" v-for="(item,item_index) in itemlist.goods_list" :key="item.cid" >
                <input type="hidden" v-model="item.rec_id" >
                <div class="icon" @click="item_checked_click(index,item_index)">
                  <input type="hidden" v-model="item.item_checked">
                  <div class="btnicon active" :class="{active:item.check===true}"></div>
                </div>
                <div class="pro-img-wrap">
                  <router-link :to="{path:'/details',query:{id:item.goods_id}}">
                  <img :src="item.goods_thumb" alt>
                  </router-link>
                </div>
                <div class="display-flex top-flex pro-details">
                  <div class="line-clamp2 name">{{item.goods_name}}</div>
                  <div class="cart-tax">
                    <span>税费预计:{{item.taxation}}</span>
                  </div>
                  <div class="cart-price">
                    <span class="price">{{item.goods_price}}</span>
                  </div>
                  <div class="btn-group display-flex">
                    <div class="reduce btn" @click="reduce(item.rec_id,item.goods_number,item_index)">-</div>
                     <input type="text" name="num" id placeholder="" v-model="item.goods_number" class="num">
                    <div class="btnadd btn" @click="bindPlus(item.rec_id,item.goods_number,item_index)">+</div>
                  </div>
                </div>
              </li>
               <!-- 这部分测试 -->
            <div class="display-flex total-price">
            <div class="display-flex left-price">
              <div class="carticon" @click="all_products_checked">
                <input type="hidden" v-model="checked_all">
                <div class="btnicon" :class="{active:checked_all===true}"></div>
              </div>
              <div class="select-all">全选</div>
              <div class="all-price">
                <p class="price-top">
                  总计(不含税):
                  <i class="redprice">{{itemlist.subtotal_format}}</i>
                </p>
                <p class="prcie-bottom">(不含运费)税费:{{itemlist.taxation_format}}</p>
              </div>
            </div>
            <div class="checkout">
              <button class="al-btn al-btn-fill" @click="shop_settle(index,itemlist.subtotal)">去结算</button>
            </div>
          </div>
          <!-- 这部分测试 -->
            </ul>
        </li>
        </ul>  
      </div>
      <div class="have-not" v-else>
        <div class="tips">
          <img src="../../../static/images/shopbar.png" alt>
          <p>您的购物车空空如也...</p>
          <router-link :to="{path:'/'}" class="btn-look">去逛逛</router-link>
        </div>
        <!-- 推荐商品 -->
        <div class="item_list">
          <div class="title">
            <span>为您推荐</span>
          </div>
          <div class="indextype10">
            <ul class="list">
              <li v-for="data in meslist" :key="data.goods_id">
                <router-link :to="{path:'/details',query:{id:data.goods_id}}">
                  <div class="imgwrap">
                    <div class="img-ratio-wrap">
                      <img
                        :src="data.goods_img"
                        alt
                      >
                    </div>
                  </div>
                  <div class="imgname line-clamp line-clamp2">{{data.goods_name}}</div>
                  <!-- <div class="description">
                    <p>促销</p>
                    <p>优惠券</p>
                  </div> -->
                  <div class="price-buy display-flex">
                    <div class="price">￥{{data.promote_price}}</div>
                    <div class="buy"></div>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <pop-Up v-if="isShow" @closeTip="isShow = false" :tiptitle="tiptitle"></pop-Up>
    </div>
    <!-- 脚部footer -->
    <!-- <footer class="footer">
      <div class="display-flex total-price" v-if="isPage">
        <div class="display-flex left-price">
          <div class="carticon" @click="all_products_checked">
            <input type="hidden" v-model="checked_all">
            <div class="btnicon" :class="{active:checked_all===true}"></div>
          </div>
          <div class="select-all">全选</div>
          <div class="all-price">
            <p class="price-top">
              总计(不含税):￥
              <i class="redprice">208.00</i>
            </p>
            <p class="prcie-bottom">(不含运费)税费:￥23.00</p>
          </div>
        </div>
        <div class="checkout">
          <button class="al-btn al-btn-fill" @click="shop_settle">去结算</button>
        </div>
      </div>
      <foot-nav v-else></foot-nav> -->
    <!-- </footer> -->
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import {mapState, mapMutations} from 'vuex'
import footNav from "../../components/footer/footer";
import popUp from "../../components/common/popup";
export default {
  components: {
    footNav,
    popUp
  },
  data() {
    return {
      cartList: [],  //购物车商品
      meslist:[],   //购物车无商品
      isPage: true,        //有无商品页面显示
      checked_all: true,   //全选
      active: false,        //点击样式
      money: 0,             //默认金额
      num: 0,               //默认数量
      isShow:false,       //弹出界面
      tiptitle:null,       //弹出提示信息
    };
  },
  computed:{
     ...mapState([
            'userInfo',
        ]),
  },
  created: function() {
  },
  mounted: function() {
    this.intData();
  },
  methods: {
    // 
    intData: function() {
       if (this.userInfo && this.userInfo.id) {
          this.isPage = true;
          this.$api.appdata.cartPay().then(res=>{
            if(res.data.data.cart_list==null){
              this.isPage = false;
              this.meclist();
            }else{
                if (res.data.status.error_code == 100) {
                this.$api.appdata.signout().then(res => {
                  if (res.data.status.succeed == 1) {
                    this.OUT_LOGIN();
                    this.$router.push({ path: "/login" });
                  }
                });
               }else{
                 this.cartList=res.data.data.cart_list;
              for (let i in this.cartList) {
              this.$set(this.cartList[i],'checked',true)
              }
               }
            }
         })
       }else{
         this.meclist();
         this.isPage = false;
       }
    },
    // 底部为您推荐
    meclist:function(){
       var data={
         filter:{intro:'best'},
           pagination:{count:6,page:1}
        }
        this.$api.appdata.homeList(data).then(res => { 
          this.meslist=res.data.data;
      })
    },
    // 减少数量
     reduce:function(rec_id,num,index){
       this.index=--num;
       if(this.index==0){
         MessageBox.confirm('', { 
         message: '删除该商品吗', 
         title: '操作确认', 
         confirmButtonText: '确定', 
         cancelButtonText: '取消' 
         }).then(action => { 
         if (action == 'confirm') {     //确认的回调
            var data={
            rec_id:rec_id,
            number:this.index,
            }
            this.$api.appdata.update(data).then(res=>{
            this.intData();
            })
         }
         }).catch(err => { 
         if (err == 'cancel') {     //取消的回调

         } 
         });
       }else{
          var data={
          rec_id:rec_id,
          number:this.index,
        }
         this.$api.appdata.update(data).then(res=>{
          this.intData();
        })
       }
      
    },
    //增加数量
    bindPlus: function(rec_id,num,index) {
      this.index=++num;
       var data={
          rec_id:rec_id,
          number:this.index,
        }
        this.$api.appdata.update(data).then(res=>{
          this.intData();
        })
       
    },
    // 仓下属商品选择 全选
    shop_all_check(index) {
      var shop = this.cartlist.list[index];
      shop.all_checked = !shop.all_checked;
      shop.checked = !shop.checked;
      for (var i = 0; i < shop.list.length; i++) {
        shop.list[i].check = shop.checked;
      }
      for (var i = 0; i < this.cartlist.list.length; i++) {
        if (!this.cartlist.list[i].checked) {
          this.checked_all = false;
          return;
        }
      }
      this.checked_all = true;
    },
    //商品选择
    item_checked_click(index, item_index) {
      var item = this.cartlist.list[index].list[item_index];
      item.item_checked = !item.item_checked;
      item.check = !item.check;
      //检测商铺商品全选
      for (var i = 0; i < this.cartlist.list[index].list.length; i++) {
        if (!this.cartlist.list[index].list[i].check) {
          this.cartlist.list[index].checked = false;
          this.checked_all = false;
          return;
        }
      }
      this.cartlist.list[index].checked = true;
      //检测购物车内的商品是否全部选中
      for (var i = 0; i < this.cartlist.list.length; i++) {
        if (!this.cartlist.list[i].checked) {
          this.checked_all = false;
          return;
        }
      }
      this.checked_all = true;
    },
    // 检测全部选中
    all_products_checked() {
      this.checked_all = !this.checked_all;
      for (var i = 0; i < this.cartlist.list.length; i++) {
        this.cartlist.list[i].checked = this.checked_all;
        for (var j = 0; j < this.cartlist.list[i].list.length; j++) {
          this.cartlist.list[i].list[j].check = this.checked_all;
        }
      }
    },
    // 结算
    async shop_settle(index,subtotal) {
      var that=this;
      if(subtotal>5000){
        that.isShow=true;
        that.tiptitle = '已超出最大限额';
      }else{
         var arrdata=[]
        for (let i in this.cartList) {
          if(index==i){
            for(let arr in this.cartList[i].goods_list){
              let rec_id=this.cartList[i].goods_list[arr].rec_id;
              arrdata.push(rec_id)
              let res=await ordData(rec_id);
                function ordData(rec_id) {
                  if(typeof(rec_id)=="object"){
                      rec_id=rec_id.join(",");
                  }else{
                     rec_id=rec_id;
                  }
                  var data={
                    rec_id:rec_id,
                    address_id:"",
                    type:"mc",
                  }
                  that.$api.appdata.orderList(data).then(res => {
                    if(res.data.status.error_code==10004){
                      that.isShow=true;
                      that.tiptitle = '操作失败，平台未开启对应的物流！';
                    }else{
                     that.$router.push({ path: "/order",query:{rec_id: arrdata}});
                    }
                  })
              }
            }
          }
        }
      }
    },
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.mescroll {
  position: fixed;
  top: 0;
  bottom: 0rem;
  width: 100%;
  height: auto;
  overflow-x: hidden;
  background: #f8f8f8;
}
.have-not .tips {
  background-color: #fff;
  text-align: center;
  padding: 1.68rem 0 2.08rem;
  margin-bottom: 0.266667rem;
}
.have-not .tips img {
  width: 3rem;
  height: 3rem;
}
.have-not .tips p {
  color: #999;
  font-size: 0.6rem;
  padding: 0.5rem 0;
}
.have-not .tips .btn-look {
  height: 1.5rem;
  line-height: 1.5rem;
  padding: 0 0.8rem;
  font-size: 0.62rem;
  color: #fff;
  border-color: #333;
  border-radius: 0.026667rem;
  display: inline-block;
  text-align: center;
  background-color: #d81e06;
  border-radius: 0.2rem;
}
.title {
  text-align: center;
  overflow: hidden;
  padding: 0.2rem 0 0 0;
}
.title span {
  position: relative;
  font-size: 0.68rem;
  color: #818181;
  margin: 0 auto;
}
.title span:after {
  position: absolute;
  width: 5rem;
  height: 0.04rem;
  background-color: #dddddd;
  content: "";
  top: 0.4rem;
}
.title span:before {
  position: absolute;
  width: 5rem;
  height: 0.04rem;
  background-color: #dddddd;
  content: "";
  top: 0.4rem;
}
.title span:after {
  margin-left: 0.4rem;
}
.title span::before {
  left: -5.25rem;
}

.item_list {
  background: #f8f8f8;
}
// 上拉加载数据
.indextype10 {
  background: #f8f8f8;
  overflow: hidden;
  padding-top: 0.4rem;
  .list {
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid #f4f4f4;
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
  background: url(../../../static/images/buyred.png) center 0 no-repeat;
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

//有商品时样式
.have-yes {
  background: #fff;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
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
        color: #7c7c7c;
      }
    }
    .cart-price {
      text-align: left;
      width: 100%;
      padding: 0.1rem 0;
      span {
        color: #e72714;
        font-size: 0.64rem;
      }
    }
    .btn-group {
      width: 3.0rem;
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
  width: 1.0rem;
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

// 测试
.content{
  background: #fff;
}
 .checkout {
    width: 4.8rem;
    text-align: right;
  }
  .left-price {
    flex: 1;
    padding-left: 0.4rem;
    align-items: center;
  }
</style>


