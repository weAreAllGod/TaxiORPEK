<template>
  <div id="vehicle-monitor">
    <!-- 侧边栏导航 -->
    <div id="side-bar">
      <div class="title">车辆监控</div>
      <div class="sidebar-nav">
        <side-bar></side-bar>
      </div>
    </div>
    <!-- 右侧内容页，可伸缩 -->
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import SideBar from './SideBar.vue'
import bus from '../../assets/js/bus'
export default {
  data () {
    return {
      tagsList: [],
      collapse: false
    }
  },
  components: {
    SideBar
  },
  created () {
    bus.$on('collapse-content', (msg) => {
      this.collapse = msg
    })

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', (msg) => {
      let arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })
  },
  watch: {
    $route (to, from) {
      // 监听路由变化-变化了给父组件传值
      bus.$emit('isVehicleMonitorActive', true)
    }
  }

}
</script>

<style lang="scss" scoped>
#vehicle-monitor{
  display: flex;
  justify-content: left;
  position: absolute;
  #side-bar {
    position: relative;
    height: 85vh;
    width: 13.021vw;
    margin: 2.315vh 0 0 1.5625vw;
    background: url("../../../static/img/icon32-1.png") no-repeat;
    background-position: center;
    background-size: 13.021vw 85vh;
    .title {
      height: 4.259vh;
      width: 12.917vw;
      margin: 0.0926vh auto;
      background: url("../../../static/img/icon22.png") no-repeat;
      background-position: center;
      background-size: 12.865vw 4.259vh;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-size: 1.574vh;
      font-weight: bold;
    }
    .side-nav {
      height: 80.648vh;
      width: 12.917vw;
      // background-color: #fff;
    }
  }
  #content {
    position: relative;
    height: 85vh;
    width: 82.76vw;
    margin: 2.315vh 0 0 1vw;
  }
}
</style>
