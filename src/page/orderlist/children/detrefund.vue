<template>
  <div class="detref" v-wechat-title="$route.meta.title">
    <div class="detail-container">
      <div class="back-process" v-if="refList.refund_status=='待审核'">
        <p class="back-status">退款中</p>
        <p class="back-price">退款金额：￥{{refList.refund_amount}}</p>
      </div>
       <div class="back-process" v-else>
        <p class="back-status">退款完成</p>
        <p class="back-price">退款金额：￥{{refList.refund_amount}}</p>
      </div>
      <div class="back-content">
        <p class="item-title">商品参数</p>
        <ul class>
          <li>
            <label for>商品名称：</label>
            <p v-for="(item,index) in refList.goods" :key="index">{{item.goods_name}}</p>
          </li>
          <li>
            <label for>退款类型：</label>
            <p>仅退款（退货退款）</p>
          </li>
          <li>
            <label for>退款金额：</label>
            <p>￥{{refList.refund_amount}}</p>
          </li>
          <li>
            <label for>退款原因：</label>
            <p>{{refList.refundReason}}</p>
          </li>
          <li>
            <label for>退款说明：</label>
            <p>{{refList.refundBody}}</p>
          </li>
          <li>
            <label for>退款编号：</label>
            <p>{{refList.refund_sn}}</p>
          </li>
          <li>
            <label for>申请时间：</label>
            <p>{{refList.add_time}}</p>
          </li>
        </ul>
      </div>
      <a href="tel:057186626369" class="ask-serve">
        <span>如有疑问，请咨询客服：</span>
      </a>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            ref_id:null,    //退款id
            refList:{}      //页面数据
        }
    },
    created:function(){
      this.ref_id=this.$route.query.ref_id;
      this.intData();
    },
    mounted:function(){

    },
    methods:{
      intData(){
        var data={
          refund_sn:this.ref_id
        }
        this.$api.appdata.detref(data).then(res => {
          this.refList=res.data.data;
        })
      }
    }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.detref {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  z-index: 204;
  overflow-y: auto;
}
.detail-container {
  box-sizing: border-box;
  width: 100%;
  padding: 0.2rem;
  background: #efefef;
  .back-process {
    padding: 0.5rem 0 0.3rem 0;
    margin-bottom: 7px;
    background: #fff;
    border-radius: 5px;
    text-align: center;
    .back-status {
      margin-bottom: 0.4rem;
      font-size: 26px;
      color: #e50011;
    }
    .back-price {
      font-size: 15px;
      margin-bottom: 0.3rem;
    }
  }
  .back-content {
    padding-bottom: 10px;
    margin-bottom: 7px;
    background: #fff;
    border-radius: 5px;
    .item-title {
      width: 80px;
      height: 36px;
      line-height: 36px;
      border-bottom: 1px solid #8c8c8c;
      text-align: center;
      font-size: 14px;
    }
    ul {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 15px;
      font-size: 13px;
      color: #525252;
      li {
        margin-bottom: 8px;
        overflow: hidden;
      }
      label {
        float: left;
        width: 70px;
        color: #8c8c8c;
      }
      p {
        margin-left: 70px;
        font-size: 14px;
      }
    }
  }
  .ask-serve {
    display: block;
    width: 100%;
    height: 60px;
    background: #fff;
    border-radius: 5px;
    line-height: 60px;
    font-size: 14px;
    span{
        display: inline-block;
    padding-left: 15px;
    padding-right: 40px;
    background: url(../../../../static/images/serve.png) no-repeat center right;
    background-size: auto 30px;
    }
}
}
</style>


