<template>
  <div class="sidebar">
    <!-- 管理员 -->
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      text-color="#ffffff"
      active-text-color="#3DCAF5"
      unique-opened
      router
    >
     <!-- <template v-for="item in items">


        <template>
          <el-menu-item :index="item.index" :key="item.index">
            <img class="icon-img" :src="item.icon" alt="图标" />
            <span slot="title">{{ item.title }}33</span>
          </el-menu-item>
        </template>
      </template> -->
      <template v-for="item in originItems">
        <template v-if="item.subs">
          <el-menu-item :index="item.index" :key="item.index">
            <template slot="title">
              <!-- <i :class="item.icon">style="font-size:12px;margin-left:0vw"</i>style="margin-left:1.7vw"-->
              <img
                class="icon-img"
                :src="item.icon"

                alt="图标"
              />
              <!-- 报警车辆 -->
              <span slot="title" >{{
                item.title
              }}</span>
            </template>

          </el-menu-item>
            <template v-for="two in item.subs">
              <!-- <el-submenu v-if="two.subs" :index="two.index" :key="two.index">
                <template slot="title">{{ two.title }}</template>
                 </el-submenu> -->
                <!-- <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item
                > -->


                        <!-- 处理 -->
              <el-menu-item :index="two.index" :key="two.index">{{
                two.title
              }}</el-menu-item>
            </template>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <img class="icon-img" :src="item.icon" alt="图标" />
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>

      </template>

    </el-menu>

     <!-- <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      text-color="#ffffff"
      active-text-color="#3DCAF5"
      unique-opened
      router
    >
    <template v-for="item in items">


        <template>
          <el-menu-item :index="item.index" :key="item.index">
            <img class="icon-img" :src="item.icon" alt="图标" />
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>

      </el-menu> -->
  </div>
</template>

<script>
import bus from "../../assets/js/bus";
export default {
  data() {
    return {
      rolen: window.sessionStorage.usern,
      collapse: false,
      // 管理员
      originItems: [
 {
          icon: "../../../static/img/车辆监控.png",
          index: "monitorVehicle",
          title: "车辆监控"
        },
        {
          icon: "../../../static/img/历史轨迹.png",
          index: "historicalTrack",
          title: "历史轨迹"
        },
        {
          icon: "../../../static/img/电子围栏.png",
          index: "efSelect",
          title: "电子围栏"
        },

        {
          icon: "../../../static/img/alarm .png",
          index: "carAlarm",
          title: "报警车辆",
          subs: [
            {
              index: "carAlarm",
              title: "未处理"
            },
            {
              index: "handledCarAlarm",
              title: "已处理"
            }
          ]
        }
      ],

      items: [

        //
      ],
    };
  },
  mounted: function() {
    for (let i = 0; i < this.originItems.length; i++) {
      if (this.$user.hasPermission(this.originItems[i].index)) {
        this.items.push(this.originItems[i]);
      }
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
      bus.$emit("collapse-content", msg);
    });
  }
};
</script>

<style scoped>
.icon-img {
  width: 2vh;
  height: 2vh;
  margin-right: 0.5vw;
}
.el-menu {
  /* 去除背景颜色 */
  background-color: transparent !important;
  border: none;
}
/* 去除ul背景颜色 */
ul :hover {
  background: transparent !important;
}
ul :active {
  background: transparent !important;
}
/* 设置鼠标悬停时的字体颜色 */
li :hover {
  color: #3dcaf5 !important;
}
li :active {
  background-color: transparent !important;
  /* color: #3DCAF5 !important; */
}
.el-menu-item {
  font-size: 1.667vh;
  text-align: center;
}
.el-menu-item is-active {
  background-color: transparent !important;
}

.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 7.5vh;
  bottom: 0;
  overflow-y: scroll;
  color: #ffffff !important;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
/* 宽度 */
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 12vw;
}
.sidebar > ul {
  color: #ffffff;
  height: 100%;
}
</style>

<style>
.el-menu {
  /* 去除背景颜色 */
  background-color: transparent !important;
  border: none;
}
.el-menu-item.is-active {
  /* 去除点击后的高亮颜色 */
  background-color: transparent !important;
}
</style>
