<template>
  <div id="realTimeTrack">
    <!-- 百度地图 -->
    <div id="map">
      <div id="bm-view"></div>

        
    </div>

    <div id="controlBar">
      <div id="example">    
       
          <div class="shownTaxi" @click="loardPolyline">
            <img
              src="../../../static/img/bus_orange_s.png"
              alt="Overspeed Car"
            /><span>滑行道-</span>
          </div> 


          <div class="shownPoint" @click="loardPEKGrapyData">
            <img
              src="../../../static/img/bus_purple_s.png"
              alt="Online Car"
            /><span >冲突点-</span>
          </div>   


          <div class="cleanAll" @click="cleanOverlayers">
            <img
              src="../../../static/img/bus_gray_s.png"
              alt="Offline Car"
            /><span>清除掉-</span>
          </div> 

 
          <div class="test1" @click="loardPath">
            
            <img
              src="../../../static/img/bus_yellow_s.png"
              alt="Stop Car"
            /><span>加载路1--</span>
          </div>      
 
          <div class="test2" @click="loardPath3(0)">   
            <img
              src="../../../static/img/bus_yellow_s.png"
              alt="Stop Car"
            /><span>路书图2--</span>
          </div>   
          <div class="test2" @click="cleanLushuTest">   
            <img
              src="../../../static/img/bus_yellow_s.png"
              alt="Stop Car"
            /><span>清路书---</span>
          </div>     

      </div>

    </div>
    <div id="CustomControl" style="padding: 7px"></div>

  </div>
</template>
<script>
//引入Dialog可拖拽
import "../../assets/js/directives.js";
// 导入百度转84
/* eslint-disable no-undef */
import {
  getAllPositionDataInPEK,
  getTypeOfPositionInPEK,
  getSheduledByMan,
} from "../../assets/axios/index";

export default {
  /* eslint-disable no-undef */
  data() {
    return {

      map: null, // 地图控件
      // Loading 遮罩层
      loading: true,
      allDataInFile:"1",
      typeOfPosition:"2",
      scheduledByMan:"3",
      lushuList:[],
      polyList:[],
      st:null,
      speedBeiShu:10
    };
  },
  created: function() {
    // 初始化页面数据
    // this.initData();
    //this.getSign();
    //  this.getSign();
    // this.Init();
    
  },
  mounted: function() {
    // 初始化百度地图
    this.initBaiDuMap();
    this.initPEKGrapyData();
  },

  watch: {

  },
  methods: {

    // 判断传入的节点是不是选中节点的子节点
    // 初始化百度地图
    cleanLushuTest:function(){
      // console.log(this.map.getOverlays());
      if (this.lushuList.length>0){
      var thisLushu=this.lushuList.pop();
      var thisPoly=this.polyList.pop();
      thisLushu.toString() == "[object Marker]"
      thisLushu.stop();
      thisLushu.hideInfoWindow();
      this.map.removeOverlay(thisLushu._marker);
      this.map.removeOverlay(thisLushu._markerL);
      this.map.removeOverlay(thisLushu._markerR);
      clearTimeout(thisLushu._timeoutFlag);
      thisLushu._overlay && this.map.removeOverlay(thisLushu._overlay);
      this.map.removeOverlay(thisPoly);
      }else{
        console.log("没有可以清除的飞机")
      }
      
    },
    loardPath:function(){
      console.log(this.scheduledByMan);
      for (var j=0;j<10;j++){
        var pathOne2=this.scheduledByMan[j]["path"];
        var AorD=this.scheduledByMan[j]["AorD"];
        var point2 = [];
        console.log("===============================pathOne2");
        console.log(pathOne2);
        for (var i = 0; i < pathOne2.length; i++) {
            point2.push(new BMapGL.Point(this.allDataInFile[pathOne2[i][0]][0],this.allDataInFile[pathOne2[i][0]][1]));
        }
        console.log("---------------",j);
        var color="black";
        if (AorD="A"){
          color="red";
        }else{
          color="green";
        };
        var pl2 = new BMapGL.Polyline(point2, {
              strokeColor: color,
              strokeWeight: 2,
              strokeOpacity: 1
          });
        this.map.addOverlay(pl2);
      }
      
    },

    loardPath3:function(idx){
      console.log(this.scheduledByMan);
      var index=this.scheduledByMan["lordOrder"][idx];
      var nextIndex=this.scheduledByMan["lordOrder"][idx+1];
      var pathOne1=this.scheduledByMan[index]["path"];
      var unixtime_ms = new Date().getTime();
      var thisStartTime=this.scheduledByMan[index]["path"][0][1]["departure_time"];
      var nextStartTime=this.scheduledByMan[nextIndex]["path"][0][1]["departure_time"];
      
      var AorD1=this.scheduledByMan[index]["AorD"];
      var color1="black";
      var planColor="../static/img/plan_red.png"
      var defartContentText="";
      if (AorD1="A"){
        color1="black";
        planColor="../static/img/plan_red.png";
        defartContentText="到达";
        }
      else{
        color1="green";
        planColor="../static/img/plan_blue.png";
        defartContentText="离开";
        }
      var point1 = [];
      var landmarkPoisList=[];
      // console.log("====================================");
      

      for (var i = 0; i < pathOne1.length; i++) {
          point1.push(new BMapGL.Point(this.allDataInFile[pathOne1[i][0]][0],this.allDataInFile[pathOne1[i][0]][1]));
          if (pathOne1[i][1]["holding_time"]!=0){
            // console.log("第",i,"个点");
            // 第一个点如果就是等待点，第二个点将发生跳跃，为了解决这个问题让他在第二个点处等待
            if (i===0){
              continue;
            //   console.log("确实等待");
            //   var newLng=this.allDataInFile[pathOne1[i][0]][0]+(this.allDataInFile[pathOne1[i+1][0]][0]-this.allDataInFile[pathOne1[i][0]][0])/100;
            //   var newLat=this.allDataInFile[pathOne1[i][0]][1]+(this.allDataInFile[pathOne1[i+1][0]][1]-this.allDataInFile[pathOne1[i][0]][1]/100);
            //  landmarkPoisList.push({lng:newLng,lat:newLat,html:'等待点',pauseTime:Math.floor(pathOne1[i][1]["holding_time"]/speedBeiShu)}); 
            // landmarkPoisList.push({lng:this.allDataInFile[pathOne1[i+1][0]][0],lat:this.allDataInFile[pathOne1[i+1][0]][1],html:'等待点',pauseTime:Math.floor(pathOne1[i][1]["holding_time"]/speedBeiShu)});

            }
            landmarkPoisList.push({lng:this.allDataInFile[pathOne1[i][0]][0],lat:this.allDataInFile[pathOne1[i][0]][1],html:'等待点',pauseTime:Math.floor(pathOne1[i][1]["holding_time"]/this.speedBeiShu)});
      }
     
      }
      var pl1 = new BMapGL.Polyline(point1, {
              strokeColor: color1,
              strokeWeight: 1,
              strokeOpacity: 1
          });
      this.map.addOverlay(pl1);
      var lushu = new BMapGLLib.LuShu(this.map, point1, {
                    defaultContent: "到达"+index, // "信息窗口文案"
                    autoView: false, // 是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整             
                    speed: 5.14*this.speedBeiShu,
                    // icon: new BMapGLGL.Icon('./images/car.png', new BMapGLGL.Size(32, 32), { anchor: new BMapGLGL.Size(10, 10) }),
                    icon: new BMapGL.Icon(planColor, new BMapGL.Size(28, 28), { anchor: new BMapGL.Size(14, 14) }),
                    enableRotation: true, // 是否设置marker随着道路的走向进行旋转
                    landmarkPois:landmarkPoisList,
                });
      lushu.start();
      this.lushuList.push(lushu);
      this.polyList.push(pl1);    
      // 在这里判断，加载下一个到底还需要多久   
      var timeGap=new Date(nextStartTime).getTime()-new Date(thisStartTime).getTime();
        if (idx===10){
          clearTimeout(this.st);

        }else{   
        // clearTimeout(this.st); 
        console.log("gap",Math.floor(timeGap/this.speedBeiShu))  
        this.st=setTimeout(()=>{
        this.loardPath3(idx+1)
        },Math.floor(timeGap/this.speedBeiShu));
        }     
      
    },

    cleanOverlayers:function(){
      while(this.lushuList.length>0){
      var thisLushu=this.lushuList.pop();
      var thisPoly=this.polyList.pop();
      thisLushu.toString() == "[object Marker]"
      thisLushu.stop();
      thisLushu.hideInfoWindow();
      this.map.removeOverlay(thisLushu._marker);
      this.map.removeOverlay(thisLushu._markerL);
      this.map.removeOverlay(thisLushu._markerR);
      clearTimeout(thisLushu._timeoutFlag);
      thisLushu._overlay && this.map.removeOverlay(thisLushu._overlay);
      this.map.removeOverlay(thisPoly);
      }
      this.map.clearOverlays();
    }
    ,
    loardPolyline:function(){
        // 给需要的点之间添加边
      for (var i in this.typeOfPosition["eadgesWithOutDirection"]){
          var p1=this.typeOfPosition["eadgesWithOutDirection"][i][0];
          var p2=this.typeOfPosition["eadgesWithOutDirection"][i][1];
          var polyline = new BMapGL.Polyline([
          new BMapGL.Point(this.allDataInFile[p1][0],this.allDataInFile[p1][1]),
          new BMapGL.Point(this.allDataInFile[p2][0],this.allDataInFile[p2][1]),
          ], {
              strokeColor: 'black',
              strokeWeight: 2,
              strokeOpacity: 1
          });
          this.map.addOverlay(polyline);

      }}
    ,

    loardPEKGrapyData:function(){
      console.log(this.allDataInFile);
      //先绘制parkingPosition
      var myRedIcon = new BMapGL.Icon('../static/img/allStyleMarker.png', new BMapGL.Size(18, 27),{"imageOffset":new BMapGL.Size(-36, -22)});
      // var myRedIcon = new BMapGL.Icon('../static/img/point4.png', new BMapGL.Size(9, 27));
      for (var p in this.typeOfPosition["parkingPosition"]){
        var thisLable=this.typeOfPosition["parkingPosition"][p];
        var newMarker=new BMapGL.Marker(new BMapGL.Point(this.allDataInFile[thisLable][0],this.allDataInFile[thisLable][1]),{icon: myRedIcon});
        //   // newMarker.setLabel(new BMapGL.Label(i,{offset:new BMapGL.Size(20,-10)})
        // newMarker.setLabel(new BMapGL.Label(thisLable,{offset:new BMapGL.Size(20,-10)}));
        this.map.addOverlay(newMarker);
        // this.map.Marker.isTrue=False;
      }
      // var myIcon = new BMapGL.Icon("allStyleMarker.png", new BMapGL.Size(23, 25),{
      // anchor: new BMapGL.Size(10, 30)
      //  });
      //跑道的进入点
      var myYellowIcon = new BMapGL.Icon('../static/img/allStyleMarker.png', new BMapGL.Size(18, 27),{"imageOffset":new BMapGL.Size(-54, -22)});
      // var myYellowIcon = new BMapGL.Icon('../static/img/point5.png');
      for (var p in this.typeOfPosition["runwayEntrance"]){
        var thisPoint=this.typeOfPosition["runwayEntrance"][p];
        var newMarker=new BMapGL.Marker(new BMapGL.Point(this.allDataInFile[thisPoint][0],this.allDataInFile[thisPoint][1]),{icon: myYellowIcon});
        var thisLable=new BMapGL.Label(thisPoint,{offset:new BMapGL.Size(20,-10)});
        // newMarker.setLabel(thisLable);
        this.map.addOverlay(newMarker);
      }
      //跑道的退出点
      var myPurpleIcon = new BMapGL.Icon('../static/img/allStyleMarker.png', new BMapGL.Size(18, 27),{"imageOffset":new BMapGL.Size(-72, -22)});
      // var myPurpleIcon = new BMapGL.Icon('../static/img/point6.png');
      for (var p in this.typeOfPosition["runwayExit"]){
        var thisPoint=this.typeOfPosition["runwayExit"][p];
        var newMarker=new BMapGL.Marker(new BMapGL.Point(this.allDataInFile[thisPoint][0],this.allDataInFile[thisPoint][1]),{icon: myPurpleIcon});
        var thisLable=new BMapGL.Label(thisPoint,{offset:new BMapGL.Size(20,-10)});
        // newMarker.setLabel(thisLable);
        this.map.addOverlay(newMarker);
      }
      //行进过程中的交叉点
      //跑道的退出点
      var myBlueIcon = new BMapGL.Icon('../static/img/allStyleMarker.png', new BMapGL.Size(18, 27),{"imageOffset":new BMapGL.Size(-18, -22)});
      // var myBlueIcon = new BMapGL.Icon('../static/img/point7.png');
      for (var p in this.typeOfPosition["intersection"]){
        var thisPoint=this.typeOfPosition["intersection"][p];
        var newMarker=new BMapGL.Marker(new BMapGL.Point(this.allDataInFile[thisPoint][0],this.allDataInFile[thisPoint][1]),{icon: myBlueIcon});
        var thisLable=new BMapGL.Label(thisPoint,{offset:new BMapGL.Size(20,-10)});
        // newMarker.setLabel(thisLable);
        this.map.addOverlay(newMarker);
      }
    },
    
    initPEKGrapyData:function(){
      console.log("加载基本数据");
      // var allDataInFile;
      getAllPositionDataInPEK().then(res => {
        // console.log(this.allDataInFile);
        this.allDataInFile = res.data;
        // console.log(this.allDataInFile);

      })
      .catch(error => console.log(error));

      getTypeOfPositionInPEK().then(res => {
        // console.log(this.allDataInFile);
        this.typeOfPosition = res.data;
        // console.log(this.allDataInFile);
      })
      .catch(error => console.log(error));

      getSheduledByMan().then(res => {
        // console.log(this.allDataInFile);
        this.scheduledByMan = res.data;
        // console.log(this.allDataInFile);
      })
      .catch(error => console.log(error));
      // console.log(this.allDataInFile);
    },
    initBaiDuMap: function() {
      // let _this = this
      // this.map = new BMapGL.Map("bm-view"); // 创建Map实例
      // this.map = BMapGLGL.Map("bm-view");
      // // this.map = new BMapGLGL.Map("bm-view");
      // this.map.centerAndZoom(new BMapGLGL.Point(116.610792,40.088932), 16); // 初始化地图,设置中心点坐标和地图级别
      
      this.map = new BMapGL.Map('bm-view'); // 创建Map实例
      this.map.centerAndZoom(new BMapGL.Point(116.610792,40.088932), 15.5); // 初始化地图,设置中心点坐标和地图级别
      this.map.enableScrollWheelZoom(false); // 开启鼠标滚轮缩放
      this.map.setMapType(BMAP_EARTH_MAP);
      this.map.setHeading(98);
      // // this.map.setTilt(73)
      // // 添加地图类型-右上角
      // this.map.addControl(
      //   new BMapGLGL.MapTypeControl({
      //     anchor: BMapGL_ANCHOR_TOP_RIGHT,
      //     mapTypes: [
      //       BMapGL_NORMAL_MAP, // 地图
      //       BMapGL_SATELLITE_MAP, // 卫星地图
      //       // BMapGL_HYBRID_MAP // 混合地图
      //     ]
      //   })
      // );
      // // 添加比例尺-左上角
      // let scaleControl = new BMapGLGL.ScaleControl({
      //   anchor: BMapGL_ANCHOR_TOP_LEFT
      // });
      // this.map.addControl(scaleControl);
      // // 添加缩放平移-左上角
      // let navigationControl = new BMapGLGL.NavigationControl();
      // this.map.addControl(navigationControl);
      // // 添加城市列表-右下角
      // this.map.addControl(
      //   // new BMapGL.CityListControl({
      //   //   anchor: BMapGL_ANCHOR_BOTTOM_RIGHT,
      //   //   offset: offset 
      //   // }
      //   // )
      // );

     
      //   *************************************************
    }
    // 初始化数据请求以渲染右侧表格 (selectCompany -> selectCars)
    // 自定义百度地图组件中绑定的切换跟随车辆的方法
    // 增加车辆到渲染队列

  }
};
</script>

<style lang="scss" scoped>
#realTimeTrack {
  height: 100vh;
  width: 100vw;
  #map {
    position: relative;
    height: 92vh;
    width: 100vw;
    float: left;
    border: 0.1vh solid #3dcaf5;
    transition: 0.5s;
    #bm-view {
      height: 100%;
      width: 100%;
    }
    #searchCar {
      margin-top: -84vh;
      margin-left: 42vw;
      position: absolute;
      font-size: 22px;   
      width: 20%;
      height: 8%;
    }
  }
  #controlBar {
    position: relative;
    height: 8vh;
    width: 100vw;
    float: right;
    background-image: url("../../../static/img/icon32-1-1.png");
    background-position: center;
    background-size: 15vw 85vh;
    transition: 0.5s;

    #example {

      display: flex;
      justify-content: flex-start;
      div{
        margin: 2vh 1vw 2vh 1vw;

      }



      // .shownTaxi{
      //     color: #ffffff;
      //     font-size: 1.296vh;
      //     display: flex;
      //     // align-items: center;
      //     justify-content: flex-start;
      //     margin: 0vh 1vw;
      //     width: 10vw;
      //     span {
      //       margin-left: 0.5vw;
      //       white-space: nowrap;
      //     }
      //   }
      //   .shownPoint{
      //     color: #ffffff;
      //     font-size: 1.296vh;
      //     display: flex;
      //     // align-items: left;
      //     justify-content: flex-start;
      //     margin: 0vh 1vw;
      //     width: 10vw;
      //     span {
      //       margin-left: 0.5vw;
      //       white-space: nowrap;
      //     }
      //   }
      //    .cleanAll{
      //     color: #ffffff;
      //     font-size: 1.296vh;
      //     display: flex;
      //     // align-items: left;
      //     justify-content: flex-start;
      //     margin: 0vh 1vw;
      //     width: 10vw;
      //     span {
      //       margin-left: 0.5vw;
      //       white-space: nowrap;
      //     }
      //   }
      //   .test1{
      //     color: #ffffff;
      //     font-size: 1.296vh;
      //     display: flex;
      //     // align-items: left;
      //     justify-content: flex-start;
      //     margin: 0vh 1vw;
      //     width: 10vw;
      //     span {
      //       margin-left: 0.5vw;
      //       white-space: nowrap;
      //     }
      //   }
      //   .test2{
      //     color: #ffffff;
      //     font-size: 1.296vh;
      //     display: flex;
      //     // align-items: left;
      //     justify-content: flex-start;
      //     margin: 0vh 1vw;
      //     width: 10vw;
      //     span {
      //       margin-left: 0.5vw;
      //       white-space: nowrap;
      //     }
      //   }

      // div {
      //     color: #ffffff;
      //     font-size: 1.296vh;
      //     display: block;
      //     align-items: left;
      //     justify-content: left;
      //     margin: 0vh 1vw;
      //     width: 10vw;
      //     span {
      //       margin-left: 0.5vw;
      //       white-space: nowrap;
      //     }
      //   }
 
      // selection {
      //   margin: 5vh 0vw 5vh 0vw;
      //   // align-items: left;
      //   display: left;
      //   justify-content: left;
      //   div {
      //     color: #ffffff;
      //     font-size: 1.296vh;
      //     display: block;
      //     align-items: left;
      //     justify-content: left;
      //     margin: 0vh 1vw;
      //     width: 10vw;
      //     span {
      //       margin-left: 0.5vw;
      //       white-space: nowrap;
      //     }
      //   }
      // }
    }

  }
  .carDialog {
    #position {
      padding: 1vh;
    }
    #positionDate {
      margin-top: 2vh;
      padding: 1vh;
      border: 1px solid rgba(255, 238, 238, 0.99);
      border-radius: 5px;
      #datePicker {
        margin-top: 1vh;
        margin-left: 2vw;
      }
    }
    #carFooter {
      text-align: center;
    }
    #shape {
      margin-top: 2vh;
      padding: 1vh;
      border: 1px solid rgba(255, 238, 238, 0.99);
      border-radius: 5px;
      #shapeRadio {
        margin-top: 2vh;
      }
    }
    #carFooter {
      margin-top: 2vh;
    }
  }
}
</style>

<style>
.el-collapse {
  border: none;
}
/* 点击后的当前节点的样式 */
.el-tree-node.is-current > .el-tree-node__content {
  background: none !important;
  color: rgb(64, 158, 255);
}
/* 点击后的当前节点的子节点的背景颜色 */
.el-tree-node:focus > .el-tree-node__content {
  background: none;
  color: rgb(64, 158, 255);
}
/* 鼠标悬浮的当前节点  */
.el-tree-node__content:hover {
  /* background: #1571db!important; */
  background: none;
  color: rgb(64, 158, 255);
}
.el-tree {
  background: none;
  color: white;
}
.el-collapse-item__header {
  background: transparent !important;
  color: #fff;
  height: 6vh;
  line-height: 2.5vh;
  font-size: 1.111vh;
  border: none;
  padding-left: 0.5vw;
}
.el-collapse-item__content {
  color: #fff;
  max-height: 20vh;
  overflow-y: scroll;
  padding: 0;
  font-size: 1.111vh;
  line-height: 4vh;
  padding-left: 2vw;
  border: none;
}
.el-collapse-item__header.is-active {
  color: #3dcaf5 !important;
}
.el-collapse-item__wrap {
  background-color: transparent !important;
  border: none;
}
.el-checkbox {
  color: white;
}
.el-checkbox__label {
  font-size: 1.111vh;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #3dcaf5 !important;
}
.el-table__body-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 5px;
}
/* .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: blue;
  border-radius: 3px;
} */
</style>
