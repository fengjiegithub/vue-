<template>
  <div class="loadingAm">
    <div class="spinner">
      <div class="spinner-container container1">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
      </div>
      <div class="spinner-container container2">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
      </div>
      <div class="spinner-container container3">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
      </div>
    </div>
  </div>
</template>
<script>

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  .loadingAm {
    display: block;
    position: fixed;
    left: 45%;
    top: 40%;
    padding:5px;
    background: rgba(128,128,128,.38);
    border-radius: 10%;
    z-index: 10000;
  .spinner {
    width: 30px;
    height: 30px;
    position: relative;
  }
  .spinner-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .container2 {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .container3 {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  .container1>div, .container2>div, .container3>div {
    width: 6px;
    height: 6px;
    background-color: #fff;
    border-radius: 100%;
    position: absolute;
    -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
    animation: bouncedelay 1.2s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  .container1 .circle2 {
    -webkit-animation-delay: -.9s;
    animation-delay: -.9s;
  }
  .container1 .circle3 {
    -webkit-animation-delay: -.6s;
    animation-delay: -.6s;
  }
  .container1 .circle4 {
    -webkit-animation-delay: -.3s;
    animation-delay: -.3s;
  }
  .container2 .circle1 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  .container2 .circle2 {
    -webkit-animation-delay: -.8s;
    animation-delay: -.8s;
  }
  .container2 .circle3 {
    -webkit-animation-delay: -.5s;
    animation-delay: -.5s;
  }
  .container2 .circle4 {
    -webkit-animation-delay: -.2s;
    animation-delay: -.2s;
  }
  .container3 .circle1 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
  .container3 .circle2 {
    -webkit-animation-delay: -.7s;
    animation-delay: -.7s;
  }
  .container3 .circle3 {
    -webkit-animation-delay: -.4s;
    animation-delay: -.4s;
  }
  .container3 .circle4 {
    -webkit-animation-delay: -.1s;
    animation-delay: -.1s;
  }
  .circle1 {
    top: 0;
    left: 0;
  }
  .circle2 {
    top: 0;
    right: 0;
  }
  .circle3 {
    right: 0;
    bottom: 0;
  }
  .circle4 {
    left: 0;
    bottom: 0;
  }
  @-webkit-keyframes bouncedelay{
    0%,80%,to{-webkit-transform:scale(0);transform:scale(0)}
    40%{-webkit-transform:scale(1);transform:scale(1)}
  }
  @keyframes bouncedelay{
    0%,80%,to{-webkit-transform:scale(0);transform:scale(0)}
    40%{-webkit-transform:scale(1);transform:scale(1)}
  }
  }
</style>
