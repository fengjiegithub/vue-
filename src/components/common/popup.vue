<template>
      <div class="al-tips">
      <div class="bounceInDown">
        <span>{{tiptitle}}</span>
      </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    props: ['tiptitle'],
    mounted(){
      var that=this;
      setTimeout(function(){
          that.$emit('closeTip')
      },2000)
    },
    methods:{
        
    }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
// 弹出样式
.al-tips {
  position: absolute;
  z-index: 3000;
  width: 100%;
  top: 40%;
  text-align: center;
  pointer-events: none;
  .bounceInDown {
    display: block;
    margin-bottom: 0.06667rem;
    animation-duration: 0.5s;
  }
  span {
    display: inline-block;
    background: #000;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 0.2rem 0.4rem;
    border-radius: 0.13333rem;
    min-width: 2.66667rem;
    max-width: 8rem;
    font-size: 0.54rem;
  }
}
@keyframes bounceInDown {
  0%,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }

  75% {
    transform: translate3d(0, -10px, 0);
  }

  90% {
    transform: translate3d(0, 5px, 0);
  }

  to {
    transform: none;
  }
}
.bounceInDown {
  animation-name: bounceInDown;
}
</style>


