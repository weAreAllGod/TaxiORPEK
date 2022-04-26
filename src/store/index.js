import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 存储token
    token: "",
    // 角色
    usern: "",
    // 用户名
    namen: "",

    // 存储产生源和消纳场的点击id
    efId: "",
    // 保存消纳场点击的id
    intakeId: 0,
    // 保存报警数量
    alarmNum: ""
  },
  mutations: {
    set_token(state, token) {
      state.token = token;
      sessionStorage.token = token;
    },
    del_token(state) {
      state.token = "";
      sessionStorage.removeItem("token");
    },
    set_user(state, usern) {
      state.usern = usern;
      sessionStorage.usern = usern;
    },
    set_name(state, namen) {
      state.namen = namen;
      sessionStorage.namen = namen;
    },
    //保存和删除电子围栏id
    set_efId(state, efId) {
      state.efId = efId;
      sessionStorage.efId = efId;
    },
    del_efId(state) {
      state.efId = "";
      sessionStorage.removeItem("efId");
    },
    //保存id
    set_intakeId(state, intakeId) {
      state.intakeId = intakeId;
      sessionStorage.intakeId = intakeId;
    }
  }
});
