<template>
  <div id="wrapper">
    <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import './style/common';
#wrapper {
    // overflow-y: auto;
    // overflow-x: hidden;
    height: 100%;
    position: relative;
}
body{
  max-width: 16.95rem;
  margin:auto;
}
</style>
