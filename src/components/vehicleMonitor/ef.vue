<template>
  <div id="ef">
    <div id="selectBar">
      <span>围栏类型：</span>
      <select v-model="selectedType" class="selectInput">
        <option :value="item" v-for="(item, index) in efTypes" :key="index">
          {{ item }}
        </option>
      </select>
      <span>围栏名称：</span>
      <select v-model="selectedName" id="fenceName" class="selectInput">
        <option :value="item.name" v-for="(item, index) in efNames" :key="index" :id="item.id">
          {{ item.name }}
        </option>
      </select>
      <span type="success" @click="isEnableEf">设置电子围栏</span>
      <img src="../../../static/img/icon26.png" alt="arrow" />
    </div>
    <div id="bmap">
      <baidu-map class="bm-view" :scroll-wheel-zoom="true" :zoom="zoom" :center="efCenter">
        <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-map-type>
        <bm-polygon :path="polygonPath" stroke-color="red" :stroke-opacity="1" :stroke-weight="2" fillColor="red" :fillOpacity="0.7" />
      </baidu-map>
    </div>
    
    <!-- 设置电子围栏-选择设置方法的对话框 -->
    <!-- <el-dialog title="请选择绘制电子围栏方法" :visible.sync="efDialog" width="60%"> -->
    <el-dialog title="请绘制电子围栏" :visible.sync="efDialog" width="60%">
      <div>
        <!-- <div class="way1">
          <span>方法一：输入电子围栏坐标</span>
          <el-input placeholder="请输入经纬度坐标" v-model="ef_way1" class="handle-input4 mr10"></el-input>
          <el-button type="primary" @click="saveWay1">确认</el-button>
          <p class="way1_p">
            注：请使用百度地图坐标，不同经纬度以英文逗号分隔：经度;纬度;经度;纬度
            <br />如116.564095;35.418083;116.58393;35.418201;116.580912;35.404551;(至少三个点)
          </p>
        </div> -->
        <div class="way2">
          <!-- 方法二：画图绘制电子围栏 -->
          <el-button class="way2_btn" type="primary" @click="showef = true">选择</el-button>
          <el-button class="way2_btn" type="primary" @click="saveWay2">确定</el-button>
        </div>
      </div>
      <div class="showef" v-if="!showef">
        <baidu-map
          class="bm-view2"
          @click="getClickInfo"
          :scroll-wheel-zoom="true"
          :zoom="15"
          :center="efCenter"
        >
          <bm-polygon
            :path="polygonPath"
            stroke-color="blue"
            :stroke-opacity="1"
            :stroke-weight="2"
            :editing="true"
            @lineupdate="updatePolygonPath"
          />
        </baidu-map>
      </div>
      <div class="showef">
        <baidu-map
          class="map"
          :center="{lng: 116.59241, lat: 35.415848}"
          :zoom="14"
          :scroll-wheel-zoom="true"
          @mousemove="syncPolyline"
          @click="paintPolyline"
          @rightclick="newPolyline"
          v-if="showef"
        >
          <bm-control>
            <el-button
              type="primary"
              @click="toggle('polyline')"
            >{{ polyline.editing ? '停止绘制' : '开始绘制' }}</el-button>
            <el-button type="primary" @click="del">重新绘制</el-button>
          </bm-control>
          <bm-polyline :path="path" v-for="path of polyline.paths" :key="path.toString()"></bm-polyline>
        </baidu-map>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入接口信息
import {
  selectAllSourceDataNew,
  selectAllIntakeDataNew,
  selectAllResourceDataNew,
  // eslint-disable-next-line no-unused-vars
  selectByIdAndSOrI,
  selectByIdAndSOrI2,
  insertEfData,
  updateEfData
} from '../../assets/axios/index'

// 导入js方法
// 求当前时间的方法
import getNowtime from "../../assets/js/index";
export default {
  data() {
    return {
      rawData: [],
      // 围栏类型
      selectedType: '',
      efTypes: ['消纳场', '产生源', '资源场'],
      SorI: 0,
      // 围栏名称
      selectedName: '',
      efNames: [],
      // 百度地图所需要的围栏属性
      // 中心点坐标
      efCenter: { lng: 116.600513, lat: 35.407469 },
      // 坐标集
      polygonPath: [],
      // 请求到的经纬度数据
      efData: [],
      constructionId: '',
      // 电子围栏
      // 电子围栏绘制方法对话框
      efDialog: false,
      // 方法一输入框绑定值
      ef_way1: "",
      // 绘制电子围栏的绑定数据
      polyline: {
        editing: false,
        paths: []
      },
      // 控制显示是绘制还是展现
      showef: false,
      efId:0,
      isInsert:0,
      zoom:14
      
    }
  },
  watch: {
    selectedType: function() {
      // 监测围栏类型变化，获取相应类型围栏数据
      if (this.selectedType === '产生源') {
        this.efNames = []
        selectAllSourceDataNew(false).then(res => {
          let rawData = JSON.parse(JSON.stringify(res.data.respBody))
          for (let i = 0; i < rawData.length; ++i) {
            let { sourceId: id, sourceName: name } = rawData[i]
            this.efNames.push({ id: id, name: name })
          }
        })
        this.SorI = 1
      } else if (this.selectedType === '消纳场') {
        this.efNames = []
        selectAllIntakeDataNew(false).then(res => {
          let rawData = JSON.parse(JSON.stringify(res.data.respBody))
          for (let i = 0; i < rawData.length; ++i) {
            let { intakePlantId: id, intakePlantName: name } = rawData[i]
            this.efNames.push({ id: id, name: name })
          }
        })
        this.SorI = 0
      } else if (this.selectedType === '资源场') {
        this.efNames = []
        selectAllResourceDataNew(false).then(res => {
          let rawData = JSON.parse(JSON.stringify(res.data.respBody))
          for (let i = 0; i < rawData.length; ++i) {
            let { resourcePlantId: id, resourcePlantName: name } = rawData[i]
            this.efNames.push({ id: id, name: name })
          }
        })
        this.SorI = 2
      }
    },
    selectedName: function() {
      // 监测围栏名字变化，渲染地图控件
      let tempDom = document.getElementById('fenceName')
      let index = tempDom.selectedIndex
      let tempId = tempDom.options[index].id
      this.constructionId=tempId
      selectByIdAndSOrI2(this.SorI, tempId).then(res => {
        // this.efData = JSON.parse(JSON.stringify(res.data.respBody))
        if(res.data.respBody.records[0]){
          this.efData = eval(res.data.respBody.records[0].efArea)
          this.efId=res.data.respBody.records[0].efId
          this.isInsert=1
          this.showef2()
        }else{
          console.log('请设置电子围栏')
          this.polygonPath=[]
          this.isInsert=0
        }
        
      })
    },
    // 监听输入的坐标-实现实时显示电子围栏
    ef_way1: function() {
      this.efCenter = { lng: 116.59241, lat: 35.415848 };
      this.polygonPath = [];
      // 获取经纬度
      let result = this.ef_way1.split(";");
      let lngList = [];
      let latList = [];
      for (let i = 0; i < result.length / 2; i++) {
        lngList.push(result[2 * i]);
        latList.push(result[2 * i + 1]);
      }
      // 求显示中心
      let clng = 0;
      let clat = 0;
      for (let i = 0; i < lngList.length; i++) {
        clng += parseFloat(lngList[i]);
        clat += parseFloat(latList[i]);
      }
      // console.log(clng);
      this.efCenter = {
        lng: clng / lngList.length,
        lat: clat / lngList.length
      };
      console.log(this.efCenter);
      let path = [];
      for (let i = 0; i < lngList.length; i++) {
        let one = {
          lng: lngList[i],
          lat: latList[i]
        };
        path.push(one);
      }
      this.polygonPath = path;
      console.log(this.polygonPath);
    }
  },
  methods: {
    showef2() {
      this.efCenter = { lng: 116.59241, lat: 35.415848 }
      this.polygonPath = []
      // 获取经纬度
      let lngList = []
      let latList = []
      console.log(typeof(this.efData),this.efData.length,this.efData[0]);
      for (let i = 0; i < this.efData.length; i++) {
        lngList.push(this.efData[i].lng)
        latList.push(this.efData[i].lat)
      }
      // 求显示中心
      let clng = 0
      let clat = 0
      for (let i = 0; i < lngList.length; i++) {
        clng += parseFloat(lngList[i])
        clat += parseFloat(latList[i])
      }
      console.log(clng);
      this.efCenter = {
        lng: clng / lngList.length,
        lat: clat / lngList.length,
      }
      this.zoom=16
      console.log(this.efCenter);
      let path = []
      for (let i = 0; i < lngList.length; i++) {
        let one = {
          lng: lngList[i],
          lat: latList[i],
        }
        path.push(one)
      }
      this.polygonPath = path
    },
    // 是否可以设置电子围栏
    isEnableEf(){
      if(this.selectedType && this.selectedName){
        this.efDialog = true
      }else{
        alert('请先选择围栏类型或名称！')
      }
      
    },
    // 电子围栏
    // 设置电子方法一-保存经纬度数据
    saveWay1() {
      this.lngList = [];
      this.latList = [];
      // 获取经纬度
      let result = this.ef_way1.split(";");
      for (let i = 0; i < result.length / 2; i++) {
        this.lngList.push(result[2 * i]);
        this.latList.push(result[2 * i + 1]);
      }
      
      // 封装数据
      let data = [];
      let time = new Date();
      let year = time.getFullYear();
      let mouth = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
      let day = time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate();
      let date = `${year}-${mouth}-${day}`;
      let onedata = {
        constructionId: this.constructionId,
        constructionName: this.selectedName,
        efArea: "",
        efId: 0,
        inputName: "",
        inputTime: date,
        lat: 0,
        lng: 0,
        type: this.SorI
      };
      
      let efArea=[]
      for (let i = 0; i < this.lngList.length; i++) {
        let oneEf = {
          lat: this.latList[i],
          lng: this.lngList[i]
        };
        efArea.push(oneEf);
      }
      onedata.efArea=JSON.stringify(efArea)
      if(this.isInsert===0){
        data.push(onedata);
        console.log('--------------插入操作')
        insertEfData(data);
      }else{
        let newdata={
          efId: this.efId,
          efArea: encodeURI(JSON.stringify(efArea))
        }
        console.log('--------------更新操作',typeof(JSON.stringify(efArea)),updateEfData(newdata))
        updateEfData(newdata)
      }

      this.efDialog = false;
    },
    // 方法2保存经纬度数据
    saveWay2() {
      this.lngList = [];
      this.latList = [];
      this.showef = false;
      for (let i = 0; i < this.polyline.paths[0].length; i++) {
        this.lngList.push(this.polyline.paths[0][i].lng);
        this.latList.push(this.polyline.paths[0][i].lat);
      }
      // 渲染电子围栏
      this.efCenter = { lng: 116.59241, lat: 35.415848 };
      this.polygonPath = [];
      // 求显示中心
      let clng = 0;
      let clat = 0;
      for (let i = 0; i < this.lngList.length; i++) {
        clng += parseFloat(this.lngList[i]);
        clat += parseFloat(this.latList[i]);
      }
      // console.log(clng);
      this.efCenter = {
        lng: clng / this.lngList.length,
        lat: clat / this.latList.length
      };
      console.log(this.efCenter);
      let path = [];
      for (let i = 0; i < this.lngList.length; i++) {
        let one = {
          lng: this.lngList[i],
          lat: this.latList[i]
        };
        path.push(one);
      }
      this.polygonPath = path;
      console.log(this.polygonPath);

      // 封装数据
      let data = [];
      let time = new Date();
      let year = time.getFullYear();
      let mouth = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
      let day = time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate();
      let date = `${year}-${mouth}-${day}`;
      let onedata = {
        constructionId: this.constructionId,
        constructionName: this.selectedName,
        efArea: "",
        efId: 0,
        inputName: "",
        inputTime: date,
        lat: this.efCenter.lat,
        lng: this.efCenter.lng,
        type: this.SorI
      };
      
      let efArea=[]
      for (let i = 0; i < this.lngList.length; i++) {
        let oneEf = {
          lat: this.latList[i],
          lng: this.lngList[i]
        };
        efArea.push(oneEf);
      }
      onedata.efArea=JSON.stringify(efArea)
      console.log('isInsert:',this.isInsert)
      
      selectByIdAndSOrI2(this.SorI, this.constructionId).then(res => {
        // this.efData = JSON.parse(JSON.stringify(res.data.respBody))
        if(res.data.respBody.records[0]){
          // 更新操作
          let newdata={
            efId: this.efId,
            efArea: encodeURI(JSON.stringify(efArea))
          }
          console.log('--------------更新操作',(JSON.stringify(newdata)))
          updateEfData(newdata)
        }else{
          // 插入操作
          data.push(onedata);
          console.log('--------------插入操作',JSON.stringify(data))
          insertEfData(data);
        }
        
      })


      // if(this.isInsert===0){
      //   data.push(onedata);
      //   console.log('--------------插入操作')
      //   insertEfData(data);
      // }else{
      //   let newdata={
      //     efId: this.efId,
      //     efArea: encodeURI(JSON.stringify(efArea))
      //   }
      //   console.log('--------------更新操作',typeof(JSON.stringify(efArea)),updateEfData(newdata))
      //   updateEfData(newdata)
      // }

      this.efDialog = false;
    },

    // 电子围栏显示
    //点击获取到当前经纬度
    getClickInfo(e) {
      // console.log(e.point.lng);
      // console.log(e.point.lat);
    },
    updatePolygonPath(e) {
      this.polygonPath = e.target.getPath();
      console.log(this.polygonPath);
    },
    // 绘制电子围栏的方法
    toggle(name) {
      this[name].editing = !this[name].editing;
    },
    syncPolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      if (!paths.length) {
        return;
      }
      const path = paths[paths.length - 1];
      if (!path.length) {
        return;
      }
      if (path.length === 1) {
        path.push(e.point);
      }
      this.$set(path, path.length - 1, e.point);
    },
    newPolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      if (!paths.length) {
        paths.push([]);
      }
      const path = paths[paths.length - 1];
      path.pop();
      if (path.length) {
        paths.push([]);
      }
    },
    paintPolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      !paths.length && paths.push([]);
      paths[paths.length - 1].push(e.point);
      // console.log(this.polyline);
    },
    del() {
      this.polyline = {
        editing: false,
        paths: []
      };
    }
  },
}
</script>

<style lang="scss" scoped>
#ef {
  height: 85vh;
  width: 82.76vw;
  border: 0.1vh solid #3dcaf5;
  #selectBar {
    height: 4.259vh;
    width: 82.76vw;
    margin: 0.0926vh auto;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    background: url('../../../static/img/icon27.png');
    background-size: 82.76vw 4.259vh;
    span {
      font-size: 1.667vh;
      color: rgb(255, 255, 255);
      margin: auto 1vw;
    }
    img {
      margin: 0vh 1vw;
    }
    .selectInput {
      margin-left: 0.147vw;
      width: 9.271vw;
      height: 2.963vh;
      // background-color: transparent;
      // color: #ffffff;
      font-size: 1.111vh;
      outline: none;
      border: solid #ffffff 0.052vw;
      font-family: MicrosoftYaHei;
      padding-left: 0.625vw;
      // opacity: 0.6;
      border-radius: 0.278vh;
    }
  }
  #bmap {
    height: 80.741vh;
    width: 82.76vw;
    margin: 0.0926vh auto;
    .bm-view {
      height: 100%;
      width: 100%;
    }
  }
  .showef {
    margin-top: 20px;
  }
  .bm-view2 {
    width: 100%;
    height: 300px;
  }
  .map {
    width: 100%;
    height: 300px;
  }
  .way1 {
  font-size: 16px;
  margin-bottom: 20px;
}
.handle-input4 {
  width: 400px;
}
.way1_p {
  margin-top: 10px;
  color: red;
}
.way2_btn {
  margin-left: 20px;
}
}
</style>
