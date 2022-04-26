import axios1 from "axios";
// 封装axios方法
export default function ajax(thisUrl, thisType, thisData) {
  // 可以用这个测试请求地址对不对
  // console.log(thisUrl);

  return axios1({
    url: thisUrl,
    method: thisType,
    data: thisData,
    // 解决跨域问题
    xhrFields: {
      withCredentials: true
    },
    // 图片传输
    // responseType:'arraybuffer',
    crossDomain: true
  });
}
