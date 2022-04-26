import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const originalPush = Router.prototype.push;

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

var router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },

    // {
    //   path: "/home",
    //   redirect: "/content",
    //   component: () => import("../components/home/Home.vue"),
    //   meta: {
    //     title: "首页"
    //   },
    //   children: [
    //     {
    //       path: "/content",
    //       component: () => import("../components/home/Content.vue"),
    //       meta: {
    //         title: "首页"
    //         // requiresAuth: true
    //       }
    //     },
    //     {
    //       path: "/vehicleMonitor",
    //       redirect: "/monitorVehicle",
    //       component: () => import("../components/vehicleMonitor/Home.vue"),
    //       meta: {
    //         title: "车辆监控",
    //         requiresAuth: true
    //       },
    //       children: [
    //         {
    //           path: "/monitorVehicle",
    //           component: () =>
    //             import("../components/vehicleMonitor/MonitorVehicle.vue"),
    //           meta: {
    //             title: "车辆监控"
    //           }
    //         },
    //         {
    //           path: "/historicalTrack",
    //           component: () =>
    //             import("../components/vehicleMonitor/HistoricalTrack.vue"),
    //           meta: {
    //             title: "历史轨迹"
    //           }
    //         },
    //         {
    //           path: "/efSelect",
    //           component: () => import("../components/vehicleMonitor/ef.vue"),
    //           meta: {
    //             title: "电子围栏"
    //           }
    //         },
    //         {
    //           path: "/carAlarm",
    //           component: () =>
    //             import("../components/vehicleMonitor/CarAlarm.vue"),
    //           meta: {
    //             title: "未处理"
    //           }
    //         },
    //         {
    //           path: "/handledCarAlarm",
    //           component: () =>
    //             import("../components/vehicleMonitor/HandledCarAlarm.vue"),
    //           meta: {
    //             title: "已处理"
    //           }
    //         }
    //       ]
    //     },


    //   ]
    // },
    {
      path: "/login",
      // component: () => import("../components/home/Login.vue"),
      // component: () => import("../components/home/Content.vue"),
      // E:\Projects\waste4_myown\waste\src\components
      component: () => import("../components/vehicleMonitor/MonitorVehicle.vue"),
      meta: {
        title: "登录"
      }
    }
  ]
});

// //挂载路由导航守卫-只能从登录界面进入系统
// router.beforeEach((to, from, next) => {
//   //to 将要访问的路径
//   // from 代表从哪个路径跳转而来
//   // next 是个函数 表示放行 next()--放行 next('/login)--强制跳转
//   if (to.path === "/login") return next();
//   //获取token
//   const tokenStr = window.sessionStorage.getItem("token");
//   if (!tokenStr) return next("/login");
//   next();
// });
// 把路由对象暴露出去
router.beforeEach((to, from, next) => {
  // next()
  if (to.path.startsWith("/Login")) {
    window.localStorage.removeItem("USER_STORAGE");
    next();
  } else {
    let user = window.localStorage.getItem("USER_STORAGE");
    if (!user) {
      next({ path: "/Login" });
    } else {
      next();
    }
  }
});
export default router;
