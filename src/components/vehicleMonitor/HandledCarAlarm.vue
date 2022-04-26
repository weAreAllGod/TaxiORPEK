<template>
  <div>
    <!-- 面包屑 -->
    <div id="title">
      <div class="crumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-if="(this.rolen === 'admin') | (this.rolen === 'superadmin')"
            >报警车辆信息</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <img src="../../../static/img/icon26.png" alt="箭头" />
    </div>
    <!-- 筛选框 -->
    <div id="select">
      <!-- <button
        @click="routeDialog = true"
        v-if="rolen !== 'admin'"
        class="add-btu ml"
      >
        <i class="el-icon-circle-plus"></i> 新增
      </button> -->
      <span>车牌号：</span>
      <el-input
        v-model="select_terminalId"
        type="text"
        size="mini"
        style="margin-left:0.3vw;width:12vw"
        placeholder="请输入车牌号"
      />
      <!-- <button
        @click="handlePage()"
        v-if="rolen !== 'admin'"
        class="handle-btu ml"
      >
        多选处理
      </button> -->
    </div>
    <!-- 表格 -->
    <div id="mytable">
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        :header-cell-style="headerStyle"
        :cell-style="cellStyle"
        max-height="600"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" align="center" width="55">
        </el-table-column> -->
        <!-- <el-table-column
          type="index"
          label="ID"
          align="center"
          width="50"
        ></el-table-column> -->
        <el-table-column prop="id" label="id" v-if="false"></el-table-column>
        <el-table-column prop="carNo" label="车牌号"></el-table-column>
        <!-- <el-table-column prop="routeName" label="路线"></el-table-column> -->

        <el-table-column
          prop="latitude"
          label="纬度"
          width="100vw"
        ></el-table-column>
        <el-table-column
          prop="longitude"
          label="经度"
          width="100vw"
        ></el-table-column>
           <el-table-column prop="updateTime" label="处理时间"></el-table-column>
        <el-table-column label="处理状态" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.handled === 0"
              >未处理</el-tag
            >
            <el-tag type="info" v-if="scope.row.handled === 1">已处理</el-tag>
          </template>
        </el-table-column>
     <el-table-column label="报警状态" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === 0"
              >误报</el-tag
            >
            <el-tag type="info" v-if="scope.row.status === 1">正常报警</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注"
          width="100vw"
        ></el-table-column>
           <el-table-column
          prop="updateUser"
          label="处理人"
          width="100vw"
        ></el-table-column>
        <el-table-column label="查看">
          <template slot-scope="scope">
            <!-- <el-button
              type="primary"
              icon="el-icon-document"
              size="mini"
              @click="handle(scope.row.id)"
              style="width:auto;padding: 0.5em;"
              >处理</el-button
            > -->
            <el-button
              type="primary"
              icon="el-icon-document"
              size="mini"
              @click="getRoadList(scope.row.terminalId)"
              style="width:auto;padding: 0.5em;"
              >路线详情</el-button
            >
          </template>
        </el-table-column>

        <!-- <el-table-column
          prop="updateUser"
          label="处理人"
          v-if="false"
        ></el-table-column> -->


        <!-- <el-table-column label="查看详情" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              type="success" plain

              @click="getMessage(scope.row.carId)"
              >详情</el-button
            >

          </template>
        </el-table-column> -->
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="PageSize"
          :total="totalCount"
        ></el-pagination>
      </div>
    </div>

    <!-- 路线 -->
    <el-dialog
      :visible.sync="routeDialog"
      width="74%"
      title="路线位置"
      label-width="80px"
      append-to-body
    >
      <div id="route">路线详情 ：{{ this.routeConvertedDesign }}</div>
      <div id="map">
        <div id="mapview"></div>
      </div>

      <!-- <div id="input">
            <div id="r-result">
              <el-input
                type="text"
                id="suggestId"
                placeholder="请输入搜索的地址"
                v-model="input"
                clearable
              >
              </el-input>
              <div id="searchResultPanel"></div>
            </div>
          </div> -->
    </el-dialog>

    <!-- 新增表单 -->
    <el-dialog
      :visible.sync="carAlarmDialog"
      width="60%"
      height="40vh"
      title="插入车辆报警信息"
      label-width="80px"
      append-to-body
    >
      <el-form
        ref="carInfoFormRef2"
        :rules="insertFormRUles"
        :model="carInfoForm2"
        :inline="true"
      >
        <el-form-item label="车辆终端设备" prop="terminalId">
          <el-input
            v-model.number="carInfoForm2.terminalId"
            class="handle-input mr10"
          ></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input
            v-model.number="carInfoForm2.latitude"
            class="handle-input mr10"
          ></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input
            v-model.number="carInfoForm2.longitude"
            class="handle-input mr10"
          ></el-input>
        </el-form-item>

        <!-- <el-form-item label="处理状态" prop="handled">
          <el-radio-group v-model="carInfoForm2.handled">
            <el-radio label="未处理"></el-radio>
            <el-radio label="已处理"></el-radio>
          </el-radio-group>
        </el-form-item> -->
        <!-- <el-form-item label="处理人" prop="updateUser">
          <el-input
            v-model="carInfoForm2.updateUser"
            class="handle-input mr10"
          ></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="时间" prop="updateTime">
          <el-input
            v-model="carInfoForm2.updateTime"
            class="handle-input mr10"
          ></el-input>
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="insertData">确认</el-button>
          <el-button @click="resetCarInfoForm2">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectCarDataByInputName,
  insertCarData,
  updateCarAlarmData,
  deleteCarDataById,
  updateCarReviewStatus,
  selectAllCarDataByPage,
  selectNumOfAllCarData,
  getAllHandled,
  getRoad,
  getRouteById,
  pageHandle,
  insertCarAlarm,
  getAllConvertedrouteData
} from "../../assets/axios/index";

// 导入js方法
// 求当前时间的方法
import getNowtime from "../../assets/js/index";
import wgs2bd from "../../assets/js/wgs842bd09";
export default {


inject:['reload'],

  data() {
    return {
      //表格绑定样式
      headerStyle: {
        border: "0.093vh solid #067EA5",
        fontSize: "1.296vh",
        fontFamily: "Microsoft YaHei",
        fontWeight: "bold",
        color: "#FFFFFF",
        lineHeight: "3.333vh",
        textAlign: "center"
      },
      //行的样式
      cellStyle: {
        background: "rgb(34, 74, 138,0.1)",
        border: "0.093vh solid #067EA5",
        fontSize: "1.296vh",
        fontFamily: "Microsoft YaHei",
        fontWeight: "bold",
        color: "#FFFFFF",
        lineHeight: "3.333vh",
        textAlign: "center",
        height: "2.3vh"
      },

      // 角色---登录后获取
      rolen: window.sessionStorage.usern,
      username: window.sessionStorage.namen,

      map: "",
      // 获取的数据
      allData: [],
      routeConvertedDesign: "",

      routeInfoForm: {
        routeId: "",
        routeName: "",
        routeDesign: "",
        routeConvertedDesign: "",
        lngLat: "",
        inputName: "",
        inputTime: "",
        content: ""
      },
      pts: [],
      pts1: [],
      // 渲染表格的数据
      tableData: [],
      // 备用数据
      subTableData: [],

      // 前端分页功能
      // 当前页，默认显示第1页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 20],
      // 默认每页显示的条数（可修改）
      PageSize: 5,

      // 查询功能的绑定值--使用watch监听
      select_carId: "",
      select_terminalId: "",
      select_carNo: "",
      select_company: "",

      // 填写申报信息的对话框
      carAlarmDialog: false,

      routeDialog: false,
      //carInfoDialog2: false,
      // 表单绑定值
      carInfoForm2: {
        id: "",
        routeName: "",
        terminalId: "",
        latitude: "",
        longitude: "",
        handled: "",
        updateUser: "",
        updateTime: ""
      },
      insertFormRUles: {
        terminalId: [
          { required: true, message: "不能为空！", trigger: "blur" },
          { type: "number", message: "必须为数字值！", trigger: "blur" }
        ],
        longitude: [
          { required: true, message: "不能为空！", trigger: "blur" },
          { type: "number", message: "必须为数字值！", trigger: "blur" }
        ],
        latitude: [
          { required: true, message: "不能为空！", trigger: "blur" },
          { type: "number", message: "必须为数字值！", trigger: "blur" }
        ]
      },
      // 打开查看详情的对话框
      carInfoDialog3: false,
      alarmNum: window.sessionStorage.alarmNum
    };
  },

  created() {
    this.getData();
  },

  methods: {
    init() {
      this.map = new BMap.Map("mapview");
      this.map.centerAndZoom("济宁", 12);
      this.map.enableScrollWheelZoom(true);

      this.map.clearOverlays();
      //console.log("init方法执行");

      for (var i = 0; i < this.pts.length; i++) {
        let list = [];
        if (this.pts == []) {
          return false;
        } else {
          const res = wgs2bd.getbd09xy(this.pts[i][1], this.pts[i][0]);
          list.push(res.lng);
          list.push(res.lat);
          this.pts1.push(list);
        }
      }

      //   生成起终点标记
      this.mp1 = this.pts1[0];
      this.mp2 = this.pts1[this.pts1.length - 1];
      var start = new BMap.Point(this.mp1[0], this.mp1[1]);
      var end = new BMap.Point(this.mp2[0], this.mp2[1]);
      this.m1 = new BMap.Marker(start); //起点
      this.m2 = new BMap.Marker(end); //终点
      console.log(this.m2);
      this.map.addOverlay(this.m1);
      this.map.addOverlay(this.m2);
      let lab1 = new BMap.Label("起点", { position: start });
      let lab2 = new BMap.Label("终点", { position: end });
      this.map.addOverlay(lab1);
      this.map.addOverlay(lab2);
      // 生成坐标点
      let trackPoint1 = [];
      for (var i = 0; i < this.pts1.length; i++) {
        trackPoint1.push(new BMap.Point(this.pts1[i][0], this.pts1[i][1]));
      }
      this.polyline1 = new BMap.Polyline(trackPoint1, {
        strokeColor: "red",
        strokeWeight: 6,
        strokeOpacity: 0.5
      });
      this.map.addOverlay(this.polyline1);
    },
    //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
    // 请求数据方法
    async getData() {
      await getAllHandled(this.currentPage, this.PageSize)
        .then(res => {
          //console.log(res.data.respBody.records);

          this.allData = JSON.parse(JSON.stringify(res.data.respBody.records));
          //console.log(this.allData);
          window.sessionStorage.alarmNum = res.data.respBody.total;
          this.totalCount = res.data.respBody.total;
          // 时间格式转换*******************************************
          //this.tableData = JSON.parse(JSON.stringify(this.allData));
          let data = this.allData;
          for (let i = 0; i < this.allData.length; i++) {
            data[i].updateTime = this.$moment(data[i].updateTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          } // this.tableData = JSON.parse(JSON.stringify(this.allData));
          this.tableData = data;

          //this.totalCount=this.tableData.length;
          //console.log( this.totalCount);
          // 备份数据
          this.subTableData = JSON.parse(JSON.stringify(this.tableData));
        })
        .then(() => {
          getAllConvertedrouteData().then(res => {
            console.log(this.allData);
            //console.log(res.data.respBody[0].routeConvertedDesign);
            //this.totalCount = res.data.respBody.length;
            for (let j = 0; j <= this.allData.length; j++) {
              for (let i = 0; i < res.data.respBody.length; i++) {
                if (this.allData[j].routeId == res.data.respBody[i].routeId) {
                  console.log(this.allData[j].routeId);
                  console.log(res.data.respBody[i].routeId);
                  this.routeConvertedDesign =
                    res.data.respBody[i].routeConvertedDesign;
                }
              }
            }
          });
        });

      //  for(let i=0;i<this.totalCount;i++){
      //  getRouteById(this.allData[i].routeId).then(res=>{
      //    console.log(res.data.respBody[0].routeName);
      //    this.tableData.routeName=JSON.parse(JSON.stringify(res.data.respBody[0].routeName));
      // });
      //  }

      // 路线信息表单  路线录入
      //  await getRouteInfoById(id) {
      // let index = this.allData.findIndex(item => {
      //   if (item.routeId == id) {
      //     return true;
      //   }
      // });
      //  }
    },

    getRoadList(id) {
      let index = this.allData.findIndex(item => {
        if (item.terminalId == id) {
          return true;
        }
      });
      console.log(index);
      console.log(this.allData[index].routeId);

      getRouteById(this.allData[index].routeId)
        .then(res => {
          this.routeDialog = true;
          // console.log(res);
          //console.log(res.data.respBody[0].routeDesign); //70||71

          //路线详情
          this.pts = [];
          this.pts1 = [];
          this.routeInfoForm = JSON.parse(JSON.stringify(res.data.respBody));
          //console.log(this.routeInfoForm);
          if (this.routeInfoForm[0].lngLat == "") {
            return false;
          } else {
            let json = JSON.parse(this.routeInfoForm[0].lngLat);
            //console.log(json);
            if (json != null) {
              this.pts = json.geometry.coordinates;
            } else {
              this.pts = [];
            }
          }
          // this.pts = [];
          // this.pts1 = [];
          //this.routeInfoForm3 = JSON.parse(JSON.stringify(res.data.respBody));
          //console.log(this.routeInfoForm3);
          // if (this.routeInfoForm3[0].lngLat == "") {
          //   return false;
          // } else {
          //   let json = JSON.parse(this.routeInfoForm3[0].lngLat);
          //   console.log(json);
          //   if (json != null) {
          //     this.pts = json.geometry.coordinates;
          //   } else {
          //     this.pts = [];
          //   }
          // }

          //   console.log(this.pts);
        })
        .then(() => {
          this.init();
          const position = wgs2bd.getbd09xy(
            this.allData[index].latitude,
            this.allData[index].longitude
          );
          //console.log(position.lat, position.lng);

          var myIcon = new BMap.Icon(
            "../../../static/img/bus_purple_s.png",
            new BMap.Size(52, 26)
          );
          var pt = new BMap.Point(position.lng, position.lat);
          var marker = new BMap.Marker(pt, {
            icon: myIcon
          });
          this.map.addOverlay(marker);
        });

      //   }).then(()=>{
      // getRoad(this.allData[index].terminalId).then(result => {
      //   console.log(result);
      //   if (result.data == false) {
      //     alert("没有对应路线");
      //   } else {
      //     //14268527702
      //     alert(result.data[0].routeId);
      //      console.log(result.data["routeId"]);
      //   }
      // });
      //    console.log(this.routeId)
      // getRoad(this.allData[index].terminalId)
      //  };
      //   });

      //console.log(this.allData)console.log(this.routeId)
    },

    // *****************************处理
    // 点击取消和X按钮，重置表单
    resetCarInfoForm2() {
      this.$refs.carInfoFormRef2.resetFields();
      this.carAlarmDialog = false;
    },
    handle(id) {
      let index = this.allData.findIndex(item => {
        if (item.id == id) {
          return true;
        }
        // console.log(this.id);
      });
      // console.log(this.id);
      // console.log(this.allData[index].id);
      console.log("22222" + "  " + this.allData[index].handled);
      //this.allData[index].handled = 1;
      console.log("11111" + "  " + this.allData[index].handled);
      this.$confirm("确定已处理吗？", "提示", {
        type: "warning"
      }).then(() => {
        updateCarAlarmData(this.allData[index].id)
          .then(() => {
            this.$message({
              message: "处理成功！",
              type: "success",
              offset: 300,
              center: true,
              duration: 1000
            });
          })
          .then(() => {
            //this.reviewDialog = false;
            console.log(this.allData);
            // this.$nextTick(()=>{
            // window.sessionStorage.alarmNum=this.allData.length;
            // })
            this.getData();

            //this.reload();
            let lengthNum = this.allData.length;
            this.$emit("func", lengthNum);
            console.log("fun");
            console.log(this.allData);
            console.log(this.allData.length);

            //location.reload();
          });
      });

      // this.allData[index].handled=1;
      // if (this.allData[index].handled === 0) {
      //   this.allData[index].handled = "未处理";
      // }
      // if (this.allData[index].handled === 1) {
      //   this.allData[index].handled = "已处理";
      // }

      // this.carInfoForm2 = JSON.parse(JSON.stringify(this.allData[index]));
      //this.carInfoDialog2 = true;
    },
    //多项处理
    handlePage() {
      let listData = [];
      for (const iter of this.multipleSelection) {
        listData.push(iter.id);
      }
      console.log(listData.length);

      // if(this.listData.length==0){
      //   console.log(66666666);
      //   this.$message("请先选择要处理的车辆")
      // }else

            // 二次确认删除
      this.$confirm("确定要处理吗？", "提示", {
        type: "warning"
      }).then(() => {
        pageHandle(listData, window.sessionStorage.usern).then(() => {
          // Message.success("成功")
          this.$message({
            message: "处理成功！",
            type: "success",
            offset: 300,
            center: true,
            duration: 1000
          });
          this.multipleSelection = [];
          // 重新渲染表格
          this.getData();
          // });
        });
      });


    },
    // 修改表单
    insertData() {
      //   // 表单验证
      let isLegal = true;
      this.$refs["carInfoFormRef2"].validate(valid => {
        if (!valid) {
          this.$message({
            message: "请按照规范完善表单！",
            type: "warning",
            duration: 2000
          });
          isLegal = false;
        }
      });
      if (!isLegal) {
        return;
      }
      //   // 封装状态值
      //   let handled = 2;
      //   if (this.carInfoForm2.handled === "未处理") {
      //     handled = 0;
      //   }
      //   if (this.carInfoForm2.handled === "已处理") {
      //     handled = 1;
      //   }
      //   // 封装插入的数据
      let data = {
        id: this.nextTodoId++,
        terminalId: this.carInfoForm2.terminalId,
        latitude: this.carInfoForm2.latitude,
        longitude: this.carInfoForm2.longitude,
        handled: 0,
        //updateUser:this.carInfoForm2.updateUser,
        updateTime: this.dateFormat(new Date())
      };
      insertCarAlarm(data)
        .then(() => {
          console.log(this.data);
          this.$message({
            message: "添加成功！",
            type: "success",
            offset: 300,
            center: true,
            duration: 1000
          });
        })
        .then(() => {
          // 重新渲染表格
          this.getData().then(() => {
            this.resetCarInfoForm2();
          });
        });
      //   // console.log(data);
      //   updateCarAlarmData(data)
      //     .then(() => {
      //       this.$message({
      //         message: "修改成功！",
      //         type: "success",
      //         offset: 300,
      //         center: true,
      //         duration: 1000
      //       });
      //       // 关闭对话框
      //       this.carInfoDialog2 = false;
      //       // 重置表单
      //       this.resetCarInfoForm2();
      //     })
      //     .then(() => {
      //       // 重新渲染表格
      //       this.getData();
      //     });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 前端分页功能
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;

      // 改变每页显示条数时请求数据
      getAllHandled(this.currentPage, this.PageSize).then(res => {
        console.log(res.data.respBody);

        this.allData = JSON.parse(JSON.stringify(res.data.respBody.records));
        //console.log(this.allData.length)394
        window.sessionStorage.alarmNum = res.data.respBody.total;
        this.totalCount = res.data.respBody.total;
        // 时间格式转换*******************************************
        //this.tableData = JSON.parse(JSON.stringify(this.allData));
        let data = this.allData;
        for (let i = 0; i < this.allData.length; i++) {
          data[i].updateTime = this.$moment(data[i].updateTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        } // this.tableData = JSON.parse(JSON.stringify(this.allData));
        this.tableData = data;
        //this.totalCount=this.tableData.length;
        //console.log( this.totalCount);
        // 备份数据
        this.subTableData = JSON.parse(JSON.stringify(this.tableData));
      });
      // let page = {
      //   page: this.currentPage,
      //   size: this.PageSize,
      // };
      // findAll(page).then((res) => {
      //   //console.log(res);
      //   this.allData = JSON.parse(JSON.stringify(res.data.respBody.records));
      //   this.tableData = JSON.parse(JSON.stringify(this.allData));
      //   // this.totalCount = this.tableData.length;
      //   // 备份数据
      //   this.subTableData = JSON.parse(JSON.stringify(this.tableData));
      //   // console.log(this.subTableData);
      // });
    },

    //},
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      //console.log(this.currentPage);
      // 改变页码时请求数据
      getAllHandled(this.currentPage, this.PageSize).then(res => {
        console.log(res.data.respBody);

        this.allData = JSON.parse(JSON.stringify(res.data.respBody.records));
        //console.log(this.allData.length)394
        window.sessionStorage.alarmNum = res.data.respBody.total;
        this.totalCount = res.data.respBody.total;
        // 时间格式转换*******************************************
        //this.tableData = JSON.parse(JSON.stringify(this.allData));
        let data = this.allData;
        for (let i = 0; i < this.allData.length; i++) {
          data[i].updateTime = this.$moment(data[i].updateTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        } // this.tableData = JSON.parse(JSON.stringify(this.allData));
        this.tableData = data;
        //this.totalCount=this.tableData.length;
        //console.log( this.totalCount);
        // 备份数据
        this.subTableData = JSON.parse(JSON.stringify(this.tableData));
      });
    },

    // 根据标签筛选
    filterTag(value, row) {
      return row.reviewStatus === value;
    },

    // 表单
    // 点击取消和X按钮，重置表单
    resetCarInfoForm() {
      this.$refs.carInfoFormRef.resetFields();
    },
    // 提交表单--增加数据
    addData() {
      // 表单验证
      let isLegal = true;
      this.$refs["carInfoFormRef"].validate(valid => {
        if (!valid) {
          this.$message({
            message: "请按照规范完善表单！",
            type: "warning",
            duration: 2000
          });
          isLegal = false;
        }
      });
      if (!isLegal) {
        return;
      }
      // 封装状态值
      let status = 0;
      if (this.carInfoForm.status === "未启用") {
        status = 1;
      }
      if (this.carInfoForm.status === "资质异常") {
        status = 2;
      }
      // 封装插入的数据
      let data = {
        loadCapacity: this.carInfoForm.loadCapacity,
        carLong: this.carInfoForm.carLong,
        carHigh: this.carInfoForm.carHigh,
        carWidth: this.carInfoForm.carWidth,
        carType: this.carInfoForm.carType,
        driverName: this.carInfoForm.driverName,
        motorcadeId: this.carInfoForm.motorcadeId,
        company: this.carInfoForm.company,
        carNo: this.carInfoForm.carNo,
        fromIp: this.carInfoForm.fromIp,
        status: status,
        linkman: this.carInfoForm.linkman,
        phoneNo: this.carInfoForm.phoneNo,
        inputName: window.sessionStorage.namen,
        inputTime: getNowtime(),
        reviewStatus: this.carInfoForm.reviewStatus
      };
      //console.log(data);
    },

    // 获取需要更新数据的id-并把信息显示在对话框中
    getUpdateCarId(id) {
      // 根据id找到index
      let index = this.allData.findIndex(item => {
        if (item.carId == id) {
          return true;
        }
      });
      // console.log(this.allData[index]);
      // 修改状态值 0-启用。。。
      if (this.allData[index].status === 0) {
        this.allData[index].status = "启用";
      }
      if (this.allData[index].status === 1) {
        this.allData[index].status = "未启用";
      }
      if (this.allData[index].status === 2) {
        this.allData[index].status = "资质异常";
      }
      this.carInfoForm2 = JSON.parse(JSON.stringify(this.allData[index]));
      this.carInfoDialog2 = true;
    }

    // getMessage(id) {
    //   // 根据id找到index
    //   let index = this.allData.findIndex(item => {
    //     if (item.carId == id) {
    //       return true;
    //     }
    //   });
    //   // console.log(this.allData[index]);
    //   // 修改状态值 0-启用。。。
    //   if (this.allData[index].status === 0) {
    //     this.allData[index].status = "启用";
    //   }
    //   if (this.allData[index].status === 1) {
    //     this.allData[index].status = "未启用";
    //   }
    //   if (this.allData[index].status === 2) {
    //     this.allData[index].status = "资质异常";
    //   }
    //   this.carInfoForm2 = JSON.parse(JSON.stringify(this.allData[index]));
    //   this.carInfoDialog3 = true;
    // },
  },
  watch: {
    select_terminalId: function() {
      // console.log(this.select_carNo);
      this.tableData = JSON.parse(JSON.stringify(this.subTableData));
      let input = this.select_terminalId;

      let table = [];
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].carNo.toString().indexOf(input) != -1) {
          table.push(this.tableData[i]);
        }
      }
      this.tableData = JSON.parse(JSON.stringify(table));
      // this.totalCount = this.tableData.length;
      // this.currentPage = 1;
    }
  }
};
</script>

<style lang="scss" scoped>
#title {
  width: 33.542vw;
  height: 4.259vh;
  margin: 0.0926vh 0 0 0.052vw;
  // background-color: #fff;
  background: url("../../../static/img/icon27.png") no-repeat;
  background-position: center;
  background-size: 33.542vw 4.259vh;
  display: flex;
  align-items: center;
  color: #ffffff;
  .crumb {
    margin-left: 1.5625vw;
  }
  img {
    margin-left: 1vw;
  }
}
#select {
  height: 3.333vh;
  width: 78vw;
  // border: red solid 1px;
  margin-top: 2.315vh;
  display: flex;
  align-items: center;
  font-size: 1.296vh;
  color: #ffffff;
  span {
    margin-left: 1.615vw;
  }
  .input-style {
    margin-left: 0.147vw;
    width: 9.271vw;
    height: 2.963vh;
    background-color: transparent;
    color: #ffffff;
    // color: #ffffff;
    font-size: 1.111vh;
    outline: none;
    border: solid #ffffff 0.052vw;
    font-family: MicrosoftYaHei;
    padding-left: 0.625vw;
    opacity: 0.3;
    border-radius: 0.278vh;
  }
  .select-btu {
    width: 4.896vw;
    height: 2.963vh;
    background: #0566b3;
    border-radius: 1.481vh;
    border: none;
    font-size: 1.296vh;
    font-family: Microsoft YaHei;
    // font-weight: bold;
    outline: none;
    color: #ffffff;
  }
  .select-btu:hover,
  .select-btu:active {
    //添加数据按钮鼠标移入和激活样式
    width: 4.896vw;
    height: 2.963vh;
    opacity: 0.5;
  }
  .add-btu {
    width: 4.896vw;
    height: 2.963vh;
    background: #24a04b;
    border-radius: 1.481vh;
    border: none;
    font-size: 1.296vh;
    font-family: Microsoft YaHei;
    // font-weight: bold;
    color: #ffffff;
    outline: none;
  }
  .handle-btu {
    width: 4.896vw;
    height: 3.145vh;
    background: #a86c13;
    border-radius: 1.481vh;
    border: none;
    font-size: 1.296vh;
    font-family: Microsoft YaHei;
    // font-weight: bold;
    color: #ffffff;
    outline: none;
  }
  .add-btu:hover,
  .handle-btu:hover,
  .add-btu:active {
    //添加数据按钮鼠标移入和激活样式
    width: 4.896vw;
    height: 2.963vh;
    opacity: 0.5;
  }
  .handle-btu:active {
    //添加数据按钮鼠标移入和激活样式
    width: 4.896vw;
    height: 2.963vh;
    opacity: 0.5;
  }
  .edit-btu {
    width: 4.896vw;
    height: 2.963vh;
    background: #0566b3;
    border-radius: 1.481vh;
    border: none;
    font-size: 1.296vh;
    font-family: Microsoft YaHei;
    // font-weight: bold;
    color: #ffffff;
    outline: none;
  }
  .edit-btu:hover,
  .edit-btu:active {
    //添加数据按钮鼠标移入和激活样式
    width: 4.896vw;
    height: 2.963vh;
    opacity: 0.5;
  }
  .delete-btu {
    width: 4.896vw;
    height: 2.963vh;
    background: #b77036;
    border-radius: 1.481vh;
    border: none;
    font-size: 1.296vh;
    font-family: Microsoft YaHei;
    // font-weight: bold;
    color: #ffffff;
    outline: none;
  }
  .delete-btu:hover,
  .delete-btu:active {
    //添加数据按钮鼠标移入和激活样式
    width: 4.896vw;
    height: 2.963vh;
    opacity: 0.5;
  }
  .ml {
    margin-left: 1.7vw;
  }
}
#mytable {
  width: 82.76vw;
  height: 69.444vh;
  .table {
    width: 79.323vw;
    height: 63.5vh;
    margin: 2.407vh 0 0 1.615vw;
    background: transparent !important;
    // border: 0.1vh solid #067EA5;

    // border: none;
    // color: #ffffff;
  }
}
#route {
  margin-bottom: 3vh;
  margin-left: 4vw;
}
#map {
  position: relative;
  height: 66vh;
  width: 70vw;
  // float: left;
  border: 0.1vh solid #3dcaf5;
  transition: 0.5s;
  #mapview {
    position: absolute;
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
}
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #b3b3b3; /* placeholder字体大小  */
  font-size: 1.111vh;
}
</style>
<style>
.el-breadcrumb__inner,
el-breadcrumb__item {
  color: #ffffff !important;
  font-size: 1.574vh !important;
}
.el-table th,
.el-table tr {
  background-color: rgba(61, 202, 245, 0.15) !important;
  border: 0.1vh solid #067ea5;
}
.el-table__row {
  background-color: transparent !important;
  border: 0.1vh solid #067ea5;
}
.pagination {
  /* margin: 2vh 0 0 59vw; */
  float: right;
  margin-right: 1.8vw;
}
.pagination span {
  color: #ffffff;
}
/* 删除表格下横线 */
.el-table::before {
  bottom: 0;
  width: 100%;
  height: 0px;
}
/* 删除表格右横线 */
.el-table--border,
.el-table--group {
  border: none;
}
.el-table__header-wrapper th:nth-last-of-type(2) {
  border-right: none;
}
.el-table--border td:nth-last-of-type(1) {
  border-right: none;
}
.el-table--border::after,
.el-table--group::after {
  width: 0;
}
#mytable
  > div.el-table.table.el-table--fit.el-table--border.el-table--fluid-height.el-table--scrollable-y.el-table--enable-row-hover.el-table--enable-row-transition.el-table--small
  > div.el-table__body-wrapper.is-scrolling-none {
  height: 55vh;
}
</style>
