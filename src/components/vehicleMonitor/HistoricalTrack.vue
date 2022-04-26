<template>
  <div id="historicalTrack">
    <!-- 百度地图 -->
    <div id="map"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <baidu-map class="bm-view" :scroll-wheel-zoom="true" :zoom="zoom" @ready="map_handler" :center="center">
        <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-map-type>
        <bm-scale anchor="BMAP_ANCHOR_TOP_LEFT"></bm-scale>
        <bm-city-list anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-city-list>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
        <!-- 地图轨迹折线 -->
        <bm-polyline :path="polylinePath" stroke-color="red" :stroke-opacity="0.8" :stroke-weight="5" :editing="false"></bm-polyline>
        <!-- 车辆 -->
        <bm-marker :position="markerPoint" :rotation="rotation" :title="showingCar" :dragging="false" :icon="{url: '../../../static/img/bus_purple_s.png', size: {width: 43, height: 20}, anchor:{width: 21.5, height: 10} }"></bm-marker>
      </baidu-map>
      <div id="toggleA" @click="toggleA"></div>
      <div id="toggleB" @click="toggleB"></div>
      <!-- 详细数据表格 -->
      <div id="historyTable">
        <el-table :data="trail" height="250" border style="width: 100%" highlight-current-row @current-change="handleCurrentChange" ref="canvasTable">
          <el-table-column type="index" align="center">
          </el-table-column>
          <el-table-column prop="terminalId" label="轨迹编号" align="center">
          </el-table-column>
          <el-table-column prop="carno" label="车牌号" align="center">
          </el-table-column>
          <el-table-column prop="speed" label="速度" align="center">
          </el-table-column>
          <el-table-column prop="lon" label="经度" align="center">
          </el-table-column>
          <el-table-column prop="lat" label="纬度" align="center">
          </el-table-column>
          <el-table-column prop="uptime" label="采集时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.uptime | dateFormat }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 右侧控制栏 -->
    <div id="controlBar">
      <p>历史轨迹</p>
      <div id="selectTime">
        <div class="subTitle"><i class="el-icon-caret-right" style="color: white"></i> 时间选择</div>
        <el-date-picker v-model="startDate" type="datetime" default-value="" placeholder="选择开始时间" size="small">
        </el-date-picker>
        <el-date-picker v-model="endDate" type="datetime" placeholder="选择结束时间" size="small">
        </el-date-picker>
      </div>
      <div id="selectCompany">
        <div class="subTitle"><i class="el-icon-caret-right" style="color: white"></i> 公司选择</div>
        <el-select v-model="selectedCompany" @change="changeCompany" placeholder="请选择公司" filterable size="small">
          <el-option v-for="item in companies" :key="item.id" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div id="selectCar">
        <div class="subTitle"><i class="el-icon-caret-right" style="color: white"></i> 车辆选择</div>
        <el-select v-model="selectedCar" placeholder="请选择车辆" filterable size="small">
          <el-option v-for="item in cars" :key="item.id" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
        <el-button id="hitoricalButton" type="primary" size="small" @click="historialButoon" round>查询历史轨迹</el-button>
      </div>
      <div id="selectSpeed">
        <div class="subTitle"><i class="el-icon-caret-right" style="color: white"></i> 播放速度</div>
        <el-radio-group v-model="playbackRate" @change="changeSpeed">
          <el-radio :label="1">1x</el-radio>
          <el-radio :label="2">2x</el-radio>
          <el-radio :label="3">3x</el-radio>
          <el-radio :label="4">4x</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import {
  selectAllCompanyData,
  selectCarNoByCompany,
  // eslint-disable-next-line no-unused-vars
  // selectHTData,
  selectHTDataNew,
  selectHTData2
} from '../../assets/axios/index'
export default {
  data () {
    return {
      // 百度地图实例
      BMap: null,
      map: null,
      // 控制横向和竖向按钮展开状态的值
      toA: true,
      toB: true,
      // 日期选择框绑定数据
      startDate: new Date('2019-12-09 00:00:00'),
      endDate: new Date('2019-12-09 03:50:00'),
      // 车辆公司数据
      companies: [],
      // 被选择的公司
      selectedCompany: '',
      // 车辆数据
      cars: [],
      // 被选择的车辆
      selectedCar: '',
      // 播放速度
      playbackRate: 0,
      // 地图控件属性
      zoom: 14,
      center: { lng: 116.600513, lat: 35.407469 },
      currentRow: null,
      // 轨迹数据
      trail: [],
      // 轨迹折线数据
      polylinePath: [],
      // 车辆的位置
      showingCar: '',
      markerPoint: {},
      rotation: 0,
      index: 0,
      timer: null,
      // Loading 遮罩层
      loading: false,

      companiesAndCars:[]
    }
  },
  created () {
    // 请求车辆公司数据
    selectAllCompanyData(false).then((res) => {
      let rawData = JSON.parse(JSON.stringify(res.data.respBody))
      for (let i = 0; i < rawData.length; ++i) {
        if(rawData[i].carCompanyName){
          let { carCompanyID: id, carCompanyName: name } = rawData[i]
          // this.companies.push({ id: id, name: name })

          selectCarNoByCompany(name, false).then((res2) => {
            let rawData2 = JSON.parse(JSON.stringify(res2.data.respBody))
            if(rawData2.length){
            let rawData2tmp=[],carnumbers=[]
            for(let i=0;i<rawData2.length;i++){
              if(!carnumbers.includes(rawData2[i].carNo)){  
                carnumbers.push(rawData2[i].carNo)
                rawData2tmp.push(rawData2[i]);
              }
            }
            rawData2=JSON.parse(JSON.stringify(rawData2tmp))
            this.companies.push({ id: id, name: name })
            this.companiesAndCars.push({ companyId: id, companyName: name, cars: rawData2 })
            }
          })
        }
        
      }
    })
    var myDate = new Date();
    var year=myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var month=myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
    var date=myDate.getDate();
    var hour=myDate.getHours(); //获取当前小时数(0-23)
    var min=myDate.getMinutes(); //获取当前分钟数(0-59)
    var sec=myDate.getSeconds();
    var res=year+'-'+month.toString().padStart(2,'0')+'-'+date.toString().padStart(2,'0')+' '+'00'+':'+'00'+':'+'00'
    var res2=year+'-'+month.toString().padStart(2,'0')+'-'+date.toString().padStart(2,'0')+' '+hour.toString().padStart(2,'0')+':'+min.toString().padStart(2,'0')+':'+sec.toString().padStart(2,'0')
    this.startDate=new Date(res)
    this.endDate=new Date(res2)
    // console.log('kkkkk',year+' '+ month.toString().padStart(2,'0') +' :'+date+' '+hour+' '+min+' '+sec)
    // console.log('kkkkk', this.startDate)
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.timer)
    next()
  },
  watch: {
  },
  methods: {
    // 选择表格栏实现当前数据高亮操作
    setCurrent (row) {
      this.$refs.canvasTable.setCurrentRow(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    // 百度地图准备后返回BMap，map类
    map_handler (BMap, map) {
      this.BMap = BMap
      this.map = map
    },
    // 横向按钮展开折叠
    toggleA () {
      let domTemp1 = document.getElementById('map')
      let domTemp2 = document.getElementById('controlBar')
      let domTemp3 = document.getElementById('toggleA')
      if (this.toA) {
        domTemp3.style.backgroundImage = 'url("../../../static/img/侧栏1.png")'
        domTemp2.style.width = 'ovw'
        domTemp1.style.width = '82.76vw'
        this.toA = false
      } else {
        domTemp3.style.backgroundImage = 'url("../../../static/img/侧栏2.png")'
        domTemp2.style.width = '15vw'
        domTemp1.style.width = '66.021vw'
        this.toA = true
      }
    },
    // 竖向按钮展开折叠按钮
    toggleB () {
      let domTemp1 = document.getElementById('toggleB')
      let domTemp2 = document.getElementById('historyTable')
      if (this.toB) {
        domTemp1.style.backgroundImage = 'url("../../../static/img/侧栏3.png")'
        domTemp1.style.bottom = '30%'
        domTemp2.style.bottom = '0%'
        this.toB = false
      } else {
        domTemp1.style.backgroundImage = 'url("../../../static/img/侧栏4.png")'
        domTemp1.style.bottom = '0%'
        domTemp2.style.bottom = '-30%'
        this.toB = true
      }
    },
    // 选择的公司发生改变回调函数
    changeCompany (value) {
      if (value !== '') {
        this.selectedCar = ''
        this.cars = []
        
        // selectCarNoByCompany(value, false).then((res) => {
        //   let rawData = JSON.parse(JSON.stringify(res.data.respBody))
        //   for (let i = 0; i < rawData.length; ++i) {
        //     let { carId: id, carNo: name } = rawData[i]
        //     this.cars.push({ id: id, name: name })
        //   }
        // })
        for(let i = 0; i < this.companiesAndCars.length; ++i){
          if(this.companiesAndCars[i].companyName==value){
            let item=this.companiesAndCars[i].cars
            for (let i = 0; i < item.length; ++i) {
              let { carId: id, carNo: name } = item[i]
              this.cars.push({ id: id, name: name })
            }
          }

        }
      }
    },
    // 播放速度发生改变的回调函数
    changeSpeed (value) {
      window.clearInterval(this.timer)
      this.run(value)
    },
    // 点击查询历史数据按钮绑定函数
    historialButoon () {
      // let day=this.endDate.getDate()-this.startDate.getDate()
      let timesDiff = Math.abs(this.endDate.getTime() - this.startDate.getTime());
      let diffDays = Math.ceil(timesDiff / (1000 * 60 * 60 * 24));//向上取整

      if(diffDays>7){
        alert('请选择7天以内的时间段！')

      }else{
      // console.log('kkkkk',())
      this.loading=true
      // 判断是否值已就位
      if (!this.selectedCar || !this.startDate || !this.endDate) {
        alert('请完善查询信息！')
        return
      }
      // console.log('teminalid',this.selectedCar)
      
      // 清除当前的轨迹渲染定时器和数据等
      this.resetAll()
      // 请求数据 -> 坐标转换 -> 渲染轨迹
      let startDate = this.$moment(this.startDate).format('YYYY-MM-DD HH:mm:ss')
      let endDate = this.$moment(this.endDate).format('YYYY-MM-DD HH:mm:ss')
      // selectHTDataNew(this.selectedCar, false, startDate, endDate).then((res) => {
        selectHTData2(this.selectedCar, false, startDate, endDate).then((res) => {
        this.showingCar = this.selectedCar
        let rawData = JSON.parse(JSON.stringify(res.data.respBody))
        if(!rawData[0]){
          alert('该时段无数据！')
          this.loading=false
        }else{

        
        this.trail = rawData
        for(let i=0;i<this.trail.length;i++){
          this.trail[i].carno=this.selectedCar
        }
        // 轨迹折线
        let sumLng = 0
        let sumLat = 0
       
        for (let i = 0; i < rawData.length; ++i) {
          // 坐标转换
          let { lon: rawLng, lat: rawLat } = rawData[i]
          let { lat, lng } = this.wgs2bd(rawLat, rawLng)
          sumLng += lng
          sumLat += lat
          this.polylinePath.push({ lng: lng, lat: lat })
        }
        sumLng /= rawData.length
        sumLat /= rawData.length
        this.center = { lng: sumLng, lat: sumLat }
        this.zoom = 12

        // 根据轨迹数据 渲染车辆移动
        // this.run(this.playbackRate)
        this.loading=false
        }
      })
      }
      this.playbackRate=0
    },
    // 清空轨迹和车辆渲染数据
    resetAll: function () {
      window.clearInterval(this.timer)
      this.showingCar = ''
      this.markerPoint = {}
      this.polylinePath = []
      this.index = 0
    },
    // 计算车头旋转角度
    getRotation: function (positionA, positionB) {
      var y = positionB.lng - positionA.lng
      var x = positionB.lat - positionA.lat
      var tanV = y / x
      var angle = Math.atan(tanV)
      angle = (angle / Math.PI * 180)
      if (x >= 0) {
        angle = angle - 90
      } else {
        angle = angle - 270
      }
      return angle
    },
    // 循环定时器-车辆
    run (speed) {
      var _this = this
      let bodyWrapper = _this.$refs.canvasTable.bodyWrapper
      this.timer = setInterval(function () {
        try {
          // console.log(_this.index)
          _this.$refs.canvasTable.setCurrentRow(_this.trail[_this.index])
          let e = _this.index - 1
          if (bodyWrapper.children[0].rows[e]) {
            bodyWrapper.scrollTop = bodyWrapper.children[0].rows[e].offsetTop
          }
          _this.markerPoint = _this.polylinePath[_this.index]
          if (_this.index === 0) {
            _this.rotation = 0
          } else {
            _this.rotation = _this.getRotation(_this.polylinePath[_this.index - 1], _this.polylinePath[_this.index])
          }
          if (_this.index === _this.polylinePath.length - 1) {
            window.clearInterval(_this.timer)
          }
          _this.index++
        } catch (e) {
          // console.log(e.message)
          _this.resetAll()
          // alert('该时段无数据！')
        }
      }, 1000 / speed)
    },
    // ***************  坐标转换的系列函数(wsg -> gcj -> bd)  ******************
    transformLat: function (x, y) {
      const PI = 3.14159265358979324
      var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
      ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0
      ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0
      ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0
      return ret
    },
    transformLon: function (x, y) {
      const PI = 3.14159265358979324
      var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
      ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0
      ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0
      ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0
      return ret
    },
    delta: function (lat, lon) {
      // Krasovsky 1940
      //
      // a = 6378245.0, 1/f = 298.3
      // b = a * (1 - f)
      // ee = (a^2 - b^2) / a^2;
      const PI = 3.14159265358979324
      var a = 6378245.0 //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
      var ee = 0.00669342162296594323 //  ee: 椭球的偏心率。
      var dLat = this.transformLat(lon - 105.0, lat - 35.0)
      var dLon = this.transformLon(lon - 105.0, lat - 35.0)
      var radLat = lat / 180.0 * PI
      var magic = Math.sin(radLat)
      magic = 1 - ee * magic * magic
      var sqrtMagic = Math.sqrt(magic)
      dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI)
      dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI)
      return { lat: dLat, lng: dLon }
    },
    // WGS-84 to GCJ-02
    wgs2gcj: function (wgsLat, wgsLon) {
      var d = this.delta(wgsLat, wgsLon)
      return { lat: wgsLat + d.lat, lng: wgsLon + d.lng }
    },
    // GCJ-02 to BD-09
    gcj2bd: function (gcjLat, gcjLon) {
      const xPI = 3.14159265358979324 * 3000.0 / 180.0
      var x = gcjLon
      var y = gcjLat
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * xPI)
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * xPI)
      var bdLon = z * Math.cos(theta) + 0.0065
      var bdLat = z * Math.sin(theta) + 0.006
      return { lat: bdLat, lng: bdLon }
    },
    wgs2bd: function (wgsLat, wgsLng) {
      let result = this.gcj2bd(wgsLat, wgsLng)
      let { lat, lng } = this.wgs2gcj(result.lat, result.lng)
      return { lat: lat, lng: lng }
    }
    // *************** END  坐标转换的系列函数(wsg -> gcj -> bd) END ******************
  }
}
</script>

<style lang="scss" scoped>
#historicalTrack {
  height: 85vh;
  width: 82.76vw;
  overflow: hidden;
  #map {
    position: relative;
    height: 85vh;
    width: 66.021vw;
    float: left;
    border: 0.1vh solid #3dcaf5;
    transition: 0.5s;
    .bm-view {
      height: 100%;
      width: 100%;
    }
    #toggleA {
      position: absolute;
      top: 40%;
      right: 0px;
      height: 13.889vh;
      width: 1.302vw;
      background: url("../../../static/img/侧栏2.png");
      background-position: center;
      background-size: 1.302vw 13.889vh;
      z-index: 3;
      cursor: pointer;
    }
    #toggleB {
      position: absolute;
      bottom: 2px;
      right: 50%;
      width: 7.8125vw;
      height: 2.315vh;
      background: url("../../../static/img/侧栏3.png");
      background-position: center;
      background-size: 7.8125vw 2.315vh;
      z-index: 3;
      cursor: pointer;
      transition: 0.5s;
    }
    #historyTable {
      position: absolute;
      bottom: -30%;
      height: 30%;
      width: 100%;
      z-index: 2;
      transition: 0.5s;
      border: 0.1vh solid #3dcaf5;
    }
  }
  #controlBar {
    position: relative;
    height: 85vh;
    width: 15vw;
    float: right;
    background-image: url("../../../static/img/icon32-1.png");
    background-position: center;
    background-size: 15vw 85vh;
    transition: 0.5s;
    p {
      height: 4.5vh;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      margin: 4vh 0vw 0vh 0vw;
    }
    .subTitle {
      color: white;
      margin: 4vh 0vw 1vh 0vw;
      position: relative;
      left: -3vw;
    }
    [id^="select"] {
      text-align: center;
    }
  }
}
</style>

<style>
.el-date-editor.el-input,
.el-date-editor.el-input__inner,
.el-select {
  width: 12vw;
}
#hitoricalButton.el-button {
  margin: 2vh 0vw 0vh 0vw;
  width: 12vw;
  font-size: 2vh;
}
#selectSpeed  .el-radio {
  margin: 2vh 0.5vw 0vh 0vw;
  color: white;
}
.el-table__body tr.current-row > td {
  background-color: #144fad !important;
  color: #fff;
}
#historyTable.el-table__body-wrapper {
  height: 18.8vh !important;
}
#historyTable > div > div.el-table__body-wrapper.is-scrolling-none {
  height: 18.8vh !important;
}
</style>
