<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
/* 解决页面边框留白 */
* {
  padding: 0;
  margin: 0;
}
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}
</style>
