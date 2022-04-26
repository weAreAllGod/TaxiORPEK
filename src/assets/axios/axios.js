import axios from 'axios'
// 封装axios方法
export default function ajax(thisUrl, thisType, thisData) {

  return axios({
    headers: {
      token: window.sessionStorage.getItem("token"),
      "Content-type": "x-www-form-urlencoded;charset=UTF-8",
      "Content-type": "application/json"
    },
    url: thisUrl,
    method: thisType,
    data: thisData
  })
}
