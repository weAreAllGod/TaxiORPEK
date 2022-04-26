// 计算当前时间
const getNowtime = function () {
    // 计算当前日期，并转化为2020/3/4的形式
    let time = new Date();
    let year = time.getFullYear();
    let mouth = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
    let day = time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate();
    let hour = time.getHours() < 10 ? '0' + (time.getHours()) : time.getHours();
    let min = time.getMinutes() < 10 ? '0' + (time.getMinutes()) : time.getMinutes();
    let sec = time.getSeconds() < 10 ? '0' + (time.getSeconds()) : time.getSeconds();
    let date = `${year}-${mouth}-${day} ${hour}:${min}:${sec}`;
    return date;
  }
  
  export default getNowtime