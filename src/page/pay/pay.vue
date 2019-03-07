<template>
<div class="mescroll" v-if="paydata.amount!=null" v-wechat-title="$route.meta.title">
    <div class="title">恭喜您,订单已经生成</div>
    <div class="payinfo">
        <div class="display-flex paytit">
            <span>订单金额:</span>
            <span>￥{{paydata.amount}}</span>
        </div>
        <div class="display-flex paytit">
            <span>支付方式:</span>
            <span>￥{{paydata.pay_name}}</span>
        </div>
    </div>
    <div v-html="payint" class="button" @click="gopay">
        
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            paydata:{},
            payint:null
        }
    },
    created () {
        this.paydata=this.$route.query.paydata;
    },
    mounted: function() {
        this.intData();
    },
    methods: {
        intData(){
            var data={
                order_id:this.paydata.order_id
            }
            this.$api.appdata.pay(data).then(res => { 
                this.payint=res.data.data;
            })
        },
        gopay(){
            this.$router.replace({ path: "/cartpay"});
        }
    },
    

}
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.mescroll {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: auto;
    overflow-x: hidden;
    background: #f2f2f2;
}
.title{
    text-align: center;
    font-size: 0.54rem;
    padding: 1.2rem 0;
}
.payinfo{
    font-size: 0.54rem;
    margin: 0 0.2rem;
    border-radius: 0.4rem;
    background: #fff;
    .paytit{
        padding: 0.4rem 0.2rem;
    }
    .paytit:first-child{
        border-bottom: 1px solid #f2f2f2;
    }
    :first-child{
        flex: 1;
    }
}
.button{
    text-align: center;
    overflow: hidden;
    margin: 0 0.2rem;
    padding: 0.2rem 0;
}

</style>
<style>
.button input{
    width: 8rem;
    height: 1.2rem;
    text-align: center;
    margin: 0 auto;
    padding: 0 0.5rem;
    color: #fff;
    background: #2db544;
}
</style>


