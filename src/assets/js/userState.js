export default {
  idKey: 'ID',
  userNameKey: 'USER_NAME', // 名称
  userPwKey: 'USER_PW', // 密码
  userIdKey: 'USER_ID', // 账号名称
  // userTimeKey: 'USER_LOGIN_TIME',
  userRememberKey: 'USER_REMEMBER',
  userStorage: 'USER_STORAGE',
  getInfo: function () {
    let userName = localStorage.getItem(this.userNameKey)
    let userPw = localStorage.getItem(this.userPwKey)
    let userRemember = localStorage.getItem(this.userRememberKey)
    let userStorage = JSON.parse(localStorage.getItem(this.userStorage))
    let id = localStorage.getItem(this.idKey)

    let userId = ''
    if (userRemember === '1') {
      // 判断是否要记住密码
      userId = localStorage.getItem(this.userIdKey)
    } else {
      userId = sessionStorage.getItem(this.userIdKey)
    }
    // let userLoginTime = localStorage.getItem(this.userTimeKey)

    return {
      name: userName,  // 角色
      id: userId, // 登录账号tyj
      key: id, // UUID
      password: userPw, // 密码
      userStorage: userStorage // 权限数组
    }
  },
  hasPermission: function (btnStr) {
    let userStorage = JSON.parse(localStorage.getItem(this.userStorage))
    if (userStorage !== null) {
      let result = userStorage.filter(o => o.source === btnStr)
      if (result !== null && result.length > 0) {
        return true
      }
    }
    return false
  },
  isValidLogin: function () {
    let userInfo = this.getInfo()
    if (userInfo.id) return true
  },
  redirect: function () {
    window.location.reload()
  },
  validLogin: function () {
    if (this.isValidLogin()) {

    } else {
      this.redirect()
    }
  },
  exitLogin: function () {
    localStorage.removeItem(this.userStorage)
    localStorage.removeItem(this.userNameKey)
    this.redirect()
  }
}
