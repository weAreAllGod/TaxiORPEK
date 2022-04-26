// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import ElementUI from "element-ui";
//引入element-ui样式
import "element-ui/lib/theme-chalk/index.css";

//导入清除默认样式
import "./assets/css/resrt.css";
import App from "./App";
import router from "./router";

// 导入vuex
import store from "./store";
//导入发送请求axios
import axios from "axios";
Vue.prototype.$axios = axios;
// axios.defaults.baseURL = '/api'

import {VueJsonp} from "vue-jsonp"
Vue.use(VueJsonp)
// 解决跨域问题
axios.defaults.withCredentials = true
// 导入echart的插件
import echarts from "echarts";
Vue.prototype.$echarts = echarts;
// 轨迹地图引入
import "echarts/extension/bmap/bmap";

// import three.js
import * as Three from 'three'

// 导入vue-baidu-map组件
import BaiduMap from "vue-baidu-map";
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: "vaSzDbfQy8In5XIFb13axYzn9t25z8FZ"
});
// 导入格式化时间的插件
import moment from "moment";
Vue.prototype.$moment = moment;
// 定义全局时间过滤器
Vue.filter("dateFormat", function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
});
Vue.filter("atimeFormat", function(dataStr, pattern = "HHmm(DD)") {
  return moment(dataStr).format(pattern);
});
Vue.filter("data_DateFormat", function(dataStr, pattern = "YYYY/MM/DD") {
  return moment(dataStr).format(pattern);
});
Vue.filter("OnlyDateFormat", function(dataStr, pattern = "YYYY-MM-DD") {
  return moment(dataStr).format(pattern);
});
Vue.filter("dateFormat1", function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
});

Vue.filter("dateFormatS", function(dataStr, pattern = "YYYY-MM-DD") {
  let res = moment(dataStr).format(pattern);
  if (res == "Invalid date") {
    return "S 2021.9.1"
  }
  return res;
});

Vue.filter("dateFormatE", function(dataStr, pattern = "YYYY-MM-DD") {
  let res = moment(dataStr).format(pattern);
  if (res == "Invalid date") {
    return "2022.3.1 E"
  }
  return res;
});


Vue.filter("deleteNumber", function(str) {
  if(str == null || undefined) return '';
  return str.replace(/[0-9]+/g,"")
});

Vue.filter("sourceCompositionFilter", function(dataStr) {
  if(dataStr == null || undefined) return '';
  if (dataStr.length > 10) {
    return dataStr.slice(0, 10) + "...";
  } else {
    return dataStr;
  }
});


Vue.config.productionTip = process.env.NODE_ENV === 'production'

// 权限控制
import user from './assets/js/userState.js';
Vue.prototype.$user = user;

Vue.use(ElementUI, {
  size: "small"
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  moment,
  store,
  components: { App },
  template: "<App/>"
});
