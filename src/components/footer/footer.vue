<template>
    <nav class="display-flex">
        <router-link :to='{name:"index"}' class="home">首页</router-link>
        <router-link :to='{name:"cartpay"}' class="cart">购物车</router-link>
        <router-link :to='{name:"my"}' class="user">我的</router-link>
    </nav>
</template>
<style lang="scss">
@import '../../style/mixin';
footer .display-flex a{
    flex: 1;
    text-align: center;
}
.footer a{
    font-size: 0.56rem;
    padding: 0.9rem 0 0.1rem 0;
    margin-top: 0.2rem;
}
.footer a.home{
    background: url(../../../static/images/home.png) center 0 no-repeat;
    background-size: 0.9rem;
}
.footer a.home.router-link-exact-active{
    background: url(../../../static/images/homered.png) center 0 no-repeat;
    background-size: 0.9rem;
}
.footer a.cart{
    background: url(../../../static/images/cartpay.png) center 0 no-repeat;
    background-size: 0.9rem;
}
.footer a.router-link-exact-active{
    background: url(../../../static/images/cartpayred.png) center 0 no-repeat;
    background-size: 0.9rem;
}
.footer a.user{
    background: url(../../../static/images/user.png) center 0 no-repeat;
    background-size: 0.9rem;
}
.footer a.user.router-link-exact-active{
    background: url(../../../static/images/userred.png) center 0 no-repeat;
    background-size: 0.9rem;
}
.router-link-exact-active{
    color: red;
}

</style>


