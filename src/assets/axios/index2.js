import ajax from "./axios";
import ajax1 from "./axios1";
// 通过环境来取动态主机地址
const BASE_URL = process.env.API_KEY;

// //上一版请求
// // *****************************************************************************
// // 运输车辆申报
// // 根据用户名查询数据
// export const selectByInputName = (data) => ajax(  `/carInfo/selectByInputName`, "POST", data)
// // 插入数据
// export const insert = (data) => ajax(  `/carInfo/insert`, "POST", data)
// // 普通用户修改信息
// export const updateData = (data) => ajax(  `/carInfo/updateData`, "POST", data)
// // 普通用户删除信息
// export const deleteByCarId = (data) => ajax(  `/carInfo/delete`, "POST", data)
// // 管理员查询数据总量
// export const getNumOfAllData = () => ajax(  `/carInfo/getNumOfAllData`, "GET", {})
// // 管理员分页查询数据
// export const findAll = (data) => ajax(  '/carInfo/find', "POST", data)
// // 管理员修改审核状态
// export const updateReviewStatus = (data) => ajax(  `/carInfo/updateReviewStatus`, "POST", data)
// // *****************************************************************************
// // 运输企业申报
// // 根据用户名查询数据
// export const selectByInputName2 = (data) => ajax(  `/CarCompany/selectByInputName2`, "POST", data)
// // 插入数据
// export const insert2 = (data) => ajax(  `/CarCompany/insert3`, "POST", data)
// // 普通用户修改信息
// export const updateData2 = (data) => ajax(  `/CarCompany/update3`, "POST", data)
// // 普通用户删除信息
// export const deleteByCarId2 = (data) => ajax(  `/CarCompany/delete3`, "POST", data)
// // 管理员查询所有信息
// export const selectAll2 = () => ajax(  `/CarCompany/selectall`, "GET", {})
// // 管理员修改审核状态
// export const updateReviewStatus2 = (data) => ajax(  `/CarCompany/updateReviewStatus`, "POST", data)
// // *****************************************************************************
// // 产生源申报
// // 根据用户名查询数据
// export const selectByInputName3 = (data) => ajax(  `/newSourceInfo/selectByInputName`, "POST", data)
// // 插入数据
// export const insert3 = (data) => ajax(  `/newSourceInfo/insert`, "POST", data)
// // 普通用户修改信息
// export const updateData3 = (data) => ajax(  `/newSourceInfo/updateData`, "POST", data)
// // 普通用户删除信息
// export const deleteBySourceId = (data) => ajax(  `/newSourceInfo/delete`, "POST", data)
// // 管理员查询所有信息
// export const selectAll3 = () => ajax(  `/newSourceInfo/selectAll`, "GET", {})
// // 管理员修改审核状态
// export const updateReviewStatus3 = (data) => ajax(  `/newSourceInfo/updateReviewStatus`, "POST", data)
// //根据id查询一条产生源数据
// export const selectBySourceId3 = (data) => ajax(  `/newSourceInfo//selectBySourceId`, "POST", data)
// // *****************************************************************************
// // 电子围栏
// // 根据id和s_or_i 查询经纬度
// export const selectByIdAndSOrI0 = (data)=>ajax(`/efInfo/selectByIdAndSOrI`,"POST",data)
// // 电子围栏经纬度录入
// export const insertEfData0 = (data)=>ajax(`/efInfo/insert`,"POST",data)
// // 删除电子围栏经纬度数据
// export const deleteEfData0 = (data)=>ajax(`/efInfo/delete`,"POST",data)
// // *****************************************************************************
// // 消纳场申报
// // 根据用户名查询数据
// export const selectByInputName4 = (data) => ajax(  `/newIntakePlant/selectByInputName`, "POST", data)
// // 插入数据
// export const insert4 = (data) => ajax(  `/newIntakePlant/insert`, "POST", data)
// // 普通用户修改信息
// export const updateData4 = (data) => ajax(  `/newIntakePlant/updateData`, "POST", data)
// // 普通用户删除信息T
// export const deleteBySourceId4 = (data) => ajax(  `/newIntakePlant/delete`, "POST", data)
// // 管理员查询所有信息
// export const selectAll4 = () => ajax(  `/newIntakePlant/selectAll`, "GET", {})
// // 管理员查询所有信息
// export const selectAll4 = () => ajax(  `/newIntakePlant/selectAll`, "GET", {})
// // 管理员修改审核状态
// export const updateReviewStatus4 = (data) => ajax(  `/newIntakePlant/updateReviewStatus`, "POST", data)
// //根据id查询一条消纳场数据
// export const selectByIntakeId4 = (data) => ajax(  `/newIntakePlant/selectByINTAKE_PLANT_ID`, "POST", data)
// // *****************************************************************************
// // 资源场申报
// // 根据用户名查询数据
// export const selectByInputName5 = (data) => ajax(  `/newResourcePlant/selectByInputName`, "POST", data)
// // 插入数据
// export const insert5 = (data) => ajax(  `/newResourcePlant/insert`, "POST", data)
// // 普通用户修改信息
// export const updateData5 = (data) => ajax(  `/newResourcePlant/updateData`, "POST", data)
// // 普通用户删除信息
// export const deleteBySourceId5 = (data) => ajax(  `/newResourcePlant/delete`, "POST", data)
// // 管理员查询所有信息
// export const selectAll5 = () => ajax(  `/newResourcePlant/selectAll`, "GET", {})
// // 管理员修改审核状态
// export const updateReviewStatus5 = (data) => ajax(  `/newResourcePlant/updateReviewStatus`, "POST", data)
// //根据id查询一条消纳场数据
// export const selectBySourceId5 = (data) => ajax(  `/newResourcePlant/selectByRESOURCE_PLANT_ID`, "POST", data)
// // *****************************************************************************
// // 首页大屏
// export const selectChart7 = () => ajax(  `/constructionWasteInfo/total`, "GET", {})

// *****************************************************************************
// 登录页面
// 获取验证码
export let imgBasePath = `/getCode`;
export const getcaptcha = () => ajax1(`/imageGeneration`, "GET", {});
export const login = (captcha, username, password, isRememberMe) =>
  ajax1(
    `/user/login?captcha=${captcha}&loginName=${username}&password=${password}&rememberMe=${isRememberMe}`,
    "POST",
    {}
  );

// *****************************************************************************
// 运输车辆申报
// 根据用户名查询数据
export const selectCarDataByInputName = (inputName, isPage, pageNo, pageSize) =>
  ajax1(
    `/carInfo/selectByInputName?inputName=${inputName}&pageFlag=${isPage}&pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  );
// 插入数据
export const insertCarData = data =>
  ajax1(`/carInfo/createCarInfo`, "POST", data);
// 普通用户修改信息
export const updateCarData = data => ajax1(`/carInfo/putCarInfo`, "PUT", data);
// 普通用户删除信息
export const deleteCarDataById = id =>
  ajax1(`/carInfo/{carInfoIds}?ids=${id}`, "DELETE", {});

// 管理员查询数据总量
export const selectNumOfAllCarData = () =>
  ajax1(`/carInfo/getNumAll`, "GET", {});
// 管理员分页查询数据
export const selectAllCarDataByPage = (isPage, pageNo, pageSize) =>
  ajax1(
    `/carInfo/listCarInfoByPage?pageFlag=${isPage}&pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  );
// 管理员修改审核状态
export const updateCarReviewStatus = (id, status) =>
  ajax1(`/carInfo/changeReview?carId=${id}&reviewStatus=${status}`, "PUT", {});

// *****************************************************************************
// 运输企业申报
// 根据用户名查询数据
export const selectCompanyDataByInputName = (inputName, isPage) =>
  ajax1(
    `/carCompany/selectByInputName?inputName=${inputName}&pageFlag=${isPage}`,
    "GET",
    {}
  );
// 插入数据
export const insertCompanyData = data =>
  ajax1(`/carCompany/createCarCompany`, "POST", data);
// 普通用户修改信息
export const updateCompanyData = data =>
  ajax1(`/carCompany/putCarCompany`, "PUT", data);
// 普通用户删除信息
export const deleteCompanyDataById = id =>
  ajax1(`/carCompany/{carCompanyIds}?ids=${id}`, "DELETE", {});

// 管理员查询所有信息
export const selectAllCompanyData = isPage =>
  ajax1(`/carCompany/listCarCompanyByPage?pageFlag=${isPage}`, "GET", {});
// 管理员修改审核状态
export const updateCompanyReviewStatus = data =>
  ajax1(`/carCompany/changeReview`, "PUT", data);

// *****************************************************************************
// 产生源申报
// 根据用户名查询数据
export const selectSourceDataByInputName = inputName =>
  ajax1(`/sourceInfo/selectByInputName?inputName=${inputName}`, "GET", {});
// 插入数据
export const insertSourceData = data =>
  ajax1(`/sourceInfo/createSource`, "POST", data);
// 普通用户修改信息
export const updateSourceData = data =>
  ajax1(`/sourceInfo/putSource`, "PUT", data);
// 普通用户删除信息
export const deleteSourceDataById = id =>
  ajax1(`/sourceInfo/{sourceId}?sourceId=${id}`, "DELETE", {});

// 管理员查询所有信息
export const selectAllSourceData = () =>
  ajax1(`/sourceInfo/listInfoByPage?pageFlag=false`, "GET", {});
export const selectAllSourceDataNew = isPage =>
  ajax1(`/sourceInfo/listInfoByPage?pageFlag=${isPage}`, "GET", {});
// 根据分页查询资源场的数据
export const selectSourceDataByPage = (isPage, pageNo, pageSize) =>
  ajax1(
    `/sourceInfo/listInfoByPage?pageFlag=${isPage}&pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  );
// 管理员修改审核状态
export const updateSourceReviewStatus = (id, status) =>
  ajax1(
    `/sourceInfo/updateReviewStatus?reviewStatus=${status}&sourceId=${id}`,
    "PUT",
    {}
  );
// 产生源电子围栏
//根据id查询一条产生源数据
export const selectOneSourceData = id =>
  ajax1(`/sourceInfo/selectSourceId?sourceId=${id}`, "GET", {});

// *****************************************************************************
// 核准表申请
// 查询所有审核单列表
export const selectAllApply = () =>
  ajax1(`/ApplyInfo/selectAll?pageFlag=false`, "GET", {});
// 根据分页查询资源场的数据
export const selectApplyByPage = (isPage, pageNo, pageSize) =>
  ajax1(
    `/ApplyInfo/selectAll?pageFlag=${isPage}&pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  );
// 查询所有审核单列表, 多表查询
export const selectAllApplyMore = () =>
  ajax1(`/ApplyInfo/selectAllCompletely?pageFlag=false`, "GET", {});
// 根据分页查询审核单的数据, 多表查询
export const selectApplyByPageMore = (isPage, pageNo, pageSize) =>
  ajax1(
    `/ApplyInfo/selectAllCompletely?pageFlag=${isPage}&pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  );
//
// 更新审核单数据
export const updateApplyInfo = data =>
  ajax1(`/ApplyInfo/updateData`, "PUT", data);
// 插入审核单数据
export const insertApplyInfo = data => ajax1(`/ApplyInfo/insert`, "POST", data);
// 删除审核单数据
export const deleteApplyInfo = applyId =>
  ajax1(`/ApplyInfo/{delete}?applyID=${applyId}`, "DELETE", {});

// *****************************************************************************
// 电子围栏
// 根据id和s_or_i 查询经纬度
export const selectByIdAndSOrI = (SOrI, id) =>
  ajax1(`/efInfo/selectByIdAndSOrI?SOrI=${SOrI}&id=${id}`, "GET", {});
// 电子围栏经纬度录入
export const insertEfData = data => ajax1(`/efInfo/insert`, "POST", data);
// 删除电子围栏经纬度数据
export const deleteEfData = (SOrI, id) =>
  ajax1(`/efInfo/{delete}?SOrI=${SOrI}&id=${id}`, "DELETE", {});

// *****************************************************************************
// 消纳场申报
// 根据用户名查询数据
export const selectIntakeDataByInputName = inputName =>
  ajax1(`/newIntakePlant/selectByInputName?inputName=${inputName}`, "GET", {});
// 插入数据
export const insertIntakeData = data =>
  ajax1(`/newIntakePlant/insert`, "POST", data);
// 普通用户修改信息
export const updateIntakeData = data =>
  ajax1(`/newIntakePlant/updateData`, "PUT", data);
// 普通用户删除信息T
export const deleteIntakeDataById = id =>
  ajax1(`/newIntakePlant/{delete}?intakePlantId=${id}`, "DELETE", {});

// 管理员查询所有信息
export const selectAllIntakeData = isPage =>
  ajax1(`/newIntakePlant/selectAll?pageFlag=${isPage}`, "GET", {});
export const selectAllIntakeDataNew = isPage =>
  ajax1(`/newIntakePlant/selectAll?pageFlag=${isPage}`, "GET", {});

// 管理员修改审核状态
export const updateIntakeReviewStatus = (id, status) =>
  ajax1(
    `/newIntakePlant/updateReviewStatus?intakePlantId=${id}&reviewStatus=${status}`,
    "PUT",
    {}
  );
//根据id查询一条消纳场数据
export const selectOneIntakeData = id =>
  ajax1(
    `/newIntakePlant/selectByINTAKE_PLANT_ID?intakePlantId=${id}`,
    "GET",
    {}
  );

// *****************************************************************************
// 资源场申报
// 根据用户名查询数据
export const selectResourceDataByInputName = inputName =>
  ajax1(
    `/newResourcePlant/selectByInputName?inputName=${inputName}`,
    "GET",
    {}
  );
// 插入数据
export const insertResourceData = data =>
  ajax1(`/newResourcePlant/insert`, "POST", data);
// 普通用户修改信息
export const updateResourceData = data =>
  ajax1(`/newResourcePlant/updateData`, "PUT", data);
// 普通用户删除信息
export const deleteResourceDataById = id =>
  ajax1(`/newResourcePlant/{delete}?resourcePlantId=${id}`, "DELETE", {});

// 管理员查询所有信息
export const selectAllResourceData = isPage =>
  ajax1(`/newResourcePlant/selectAll?pageFlag=${isPage}`, "GET", {});
export const selectAllResourceDataNew = isPage =>
  ajax1(`/newResourcePlant/selectAll?pageFlag=${isPage}`, "GET", {});

// 管理员修改审核状态
export const updateResourceReviewStatus = (id, status) =>
  ajax1(
    `/newResourcePlant/updateReviewStatus?resourcePlantId=${id}&reviewStatus=${status}`,
    "PUT",
    {}
  );
//根据id查询一条消纳场数据
export const selectOneResourceData = id =>
  ajax1(
    `/newResourcePlant/selectByRESOURCE_PLANT_ID?resourcePlantId=${id}`,
    "GET",
    {}
  );

// *****************************************************************************
// 车辆监控
// 根据公司名称查询车辆信息数据
// 根据公司名称查询车辆信息数据
export const selectCarNameByCompany = data =>
  ajax(`/carInfo/selectCarNameByCompany`, "POST", data);
export const selectCarNoByCompany = (name, isPage) =>
  ajax1(
    `/carInfo/selectByCompany?company=${name}&pageFlag=${isPage}`,
    "GET",
    {}
  );
// 根据车牌号查询一条数据
export const selectVMData = (carId, index) =>
  ajax1(`/carTrail/dynamic?CAR_ID=${carId}&ID=${index}`, "POST", {});
// 根据车牌号查询一条数据(数据少)
export const selectVMDataNew = (carId, index) =>
  ajax1(`/carTrailNew/dynamic?CAR_ID=${carId}&ID=${index}`, "POST", {});
// 根据车牌号查询轨迹数据
export const selectHTData = (carId, isPage, start, end) =>
  ajax1(
    `/carTrail/history?END_TIME=${end}&START_TIME=${start}&carId=${carId}&pageFlag=${isPage}`,
    "GET",
    {}
  );
export const selectHTDataNew = (carId, isPage, start, end) =>
  ajax1(
    `/carTrailNew/history?END_TIME=${end}&START_TIME=${start}&carId=${carId}&pageFlag=${isPage}`,
    "GET",
    {}
  );
export const selectREData2 = (terminalId, isPage, start, end) =>
  ajax1(`/tRealTimePostionController/selectAll`, "GET", {});
export const selectHTData2 = (carNo, isPage, start, end) =>
  ajax1(
    `/tHistoryPosition/history?END_TIME=${end}&START_TIME=${start}&carNo=${carNo}&pageFlag=${isPage}`,
    "GET",
    {}
  );

export const selectcarno = () =>
  ajax1(`/carInfo/listCarInfoByPage?pageFlag=false`, "GET", {});
export const selectcarnoByTerminalId = terminalId =>
  ajax1(`/carInfo/selectCarNoByTid?terminalId=${terminalId}`, "GET", {});
//车辆报警

export const getAllHandled = (pageNo, pageSize) =>
  ajax1(
    `/vehicleAlarm/getAllHandled?pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  );

export const getAllUnHandle = (pageNo, pageSize) =>
  ajax1(
    `/vehicleAlarm/getAllUnHandle?pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  );
export const getRoad = id =>
  ajax1(`/vehicleAlarm/getRoadList?terminalId=${id}`, "POST", {});
export const updateCarAlarmData = (CarAlarmId, remarks, status, updateUser) =>
  ajax1(
    `/vehicleAlarm/handleCarAlarm?CarAlarmId=${CarAlarmId}&remarks=${remarks}&status=${status}&updateUser=${updateUser}`,
    "POST",
    {}
  );
export const pageHandle = (data, remarks, status, updateUser) =>
  ajax1(
    `/vehicleAlarm/handleMCarAlarm?CarAlarmId=${data}&remarks=${remarks}&status=${status}&updateUser=${updateUser}`,
    "GET",
    {}
  );
export const insertCarAlarm = data =>
  ajax1(`/vehicleAlarm/insertCarAlarmInfo`, data, "POST", {});

// 区域查车
export const getRectangle = (endLat, endLong, startLat, startLong) =>
  ajax1(
    `/tRealTimePostionController/getRectangleRegionalVehicles?endLat=${endLat}&endLong=${endLong}&interval=1&startLat=${startLat}&startLong=${startLong}`,
    "POST",
    {}
  );
export const getHisRectangle = (
  endLat,
  endLong,
  endTime,
  startLat,
  startLong,
  startTime
) =>
  ajax1(
    `/tHistoryPosition/getRectangleRegionalVehiclesWithTimeLimit?endLat=${endLat}&endLong=${endLong}&endTime=${endTime}&startLat=${startLat}&startLong=${startLong}&startTime=${startTime}`,
    "POST",
    {}
  );
export const getCircle = (centerLat, centerLong, semidiamerer) =>
  ajax1(
    `/tRealTimePostionController/getCircleRegionalVehicles?centerLat=${centerLat}&centerLong=${centerLong}&interval=1&semidiameter=${semidiamerer}`,
    "POST",
    {}
  );
export const getHisCircle = (
  centerLat,
  centerLong,
  endTime,
  semidiamerer,
  startTime
) =>
  ajax1(
    `/tHistoryPosition/getCircleRegionalVehiclesWithTimeLimit?centerLat=${centerLat}&centerLong=${centerLong}&endTime=${endTime}&semidiameter=${semidiamerer}&startTime=${startTime}`,
    "POST",
    {}
    );
  // 多边形
export const getPolygonRegiona = data =>
ajax1(
    `/tRealTimePostionController/getPolygonRegionalVehicles?interval=1`,
  "POST",
  data,
  {}
);
// 带时间的
export const getHisPolygonRegiona = (endTime, startTime, data) =>
ajax1(
    `/tHistoryPosition/getPolygonRegionalVehiclesWithTimeLimit?endTime=${endTime}&startTime=${startTime}`,
  "POST",
  data,
  {}
);
// *****************************************************************************
// 系统管理
// 组织管理
//查询数据
export const selectOrgListByPage = () =>
  ajax1(`/sysOrganization/getOrgListByPage`, "GET", {});
export const selectOrgListByPageNew = () =>
  ajax1(`/sysOrganization/getOrgListByPage?pageFlag=false`, "GET", {});
export const selectAllOrgList = (isPage, pageNo, pageSize) =>
  ajax1(
    `/sysOrganization/getOrgListByPage?pageFlag=${isPage}&pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  );

//修改数据
export const updateOrgById = data =>
  ajax1(`/sysOrganization/updateOrgById`, "PUT", data);
//删除一条数据
export const deleteOrgById = id =>
  ajax1(`/sysOrganization/deleteOrgById/${id}`, "DELETE", {});
//新增数据
export const createOrganization = data =>
  ajax1(`/sysOrganization/createOrganization`, "POST", data);
//删除多条数据
export const deleteMOrgById = data =>
  ajax1(`/sysOrganization/deleteMOrgById`, "POST", data);
//删除一条数据
export const deleteOrgById_get = id =>
  ajax1(`/sysOrganization/deleteOrgById_get/${id}`, "GET", {});
//删除多条数据
export const deleteMOrgById_get = data =>
  ajax1(`/sysOrganization/deleteMOrgById_get/${data}`, "GET", data);

// 用户管理
//查询数据
export const selectUserByPage = () =>
  ajax1(`/sysUser/listUserByPage`, "GET", {});
export const selectUserByPageNew = () =>
  ajax1(`/sysUser/listUserByPage?pageFlag=false`, "GET", {});
export const selectAllUser = (isPage, pageNo, pageSize) =>
  ajax1(
    `/sysUser/listUserByPage?pageFlag=${isPage}&pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  );
//修改数据
export const updateUser = data => ajax1(`/sysUser/updateUser`, "PUT", data);
//删除一条数据
export const deleteUserById = userIds =>
  ajax1(`/sysUser/batchDelete/${userIds}`, "DELETE", {});
//新增数据
export const createUser = data => ajax1(`/sysUser/createUser`, "POST", data);
//根据ID删除多条数据，get方式
export const deleteMUserById_get = userid =>
  ajax1(`/sysUser/deleteMUserById_get/${userid}`, "GET", {});
//删除一条数据,get方式
export const deleteUserById_get = userid =>
  ajax1(`/sysUser/deleteUserById_get/${userid}`, "GET", {});

//角色管理
//查询数据
export const selectRoleListPage = () =>
  ajax1(`/user_role/listRoleByPage`, "GET", {});
export const selectRoleListPageNew = () =>
  ajax1(`/user_role/listRoleByPage?pageFlag=false`, "GET", {});
export const selecttRoleListByPage = (isPage, pageNo, pageSize) =>
  ajax1(
    `/user_role/listRoleByPage?pageFlag=${isPage}&pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  );
//修改数据
export const updateRole = data => ajax1(`/user_role/updateRole`, "PUT", data);
//根据ID批量删除数据
export const deleteRoleById = roleIds =>
  ajax1(`/user_role/deleteRoleById/${roleIds}`, "DELETE", {});
//根据用户名删除数据
export const deleteRoleByRoleName = () =>
  ajax1(`/user_role/deleteRoleByRoleName/${rname}`, "DELETE", {});
//新增数据
export const createRole = data => ajax1(`/user_role/createRole`, "POST", data);
//删除一条数据
export const deleteOneRole = roleid =>
  ajax1(`/user_role/deleteOneRole/${roleid}`, "DELETE", {});
//删除一条数据,get方式
export const deleteOneRole_get = roleid =>
  ajax1(`/user_role/deleteOneRole_get/${roleid}`, "GET", {});
//根据ID批量删除数据,get方法
export const deleteRoleById_get = roleIds =>
  ajax1(`/user_role/deleteRoleById_get/${roleIds}`, "GET", {});

// 获取轨迹数据方法
export const selectLine = () =>
  ajax1("../../../static/json/lines-bus.json", "GET", {});

export const selecHot = () =>
  ajax1("../../../static/json/hangzhou-tracks.json", "GET", {});

export const selecBin = () =>
  ajax1("../../../static/json/binning.json", "GET", {});

// 获取路段信息
export const insertRoadInfo = data =>
  ajax1(`/roadInfo/insertRoadInfo`, data, "POST", {});

// *****************************************************************************
// 申报系统-车辆公司信息
export const updateOrInsertCarCompany = data =>
  ajax1(`/carCompany/updateOrInsertCarCompany`, "PUT", data);
// 申报系统 - 根据车辆公司id获取记录
export const getCarCompanyById = id =>
  ajax1(
    `/carCompany/listCarCompanyByPage?carCompanyId=${id}&pageFlag=false`,
    "GET",
    {}
  );

// 申报系统-工地信息
export const updateOrInsertSource = data =>
  ajax1(`/sourceInfo/updateOrInsertSource`, "PUT", data);
// 申报系统 - 根据工地 id 获取记录
export const getSourceInfoById = id =>
  ajax1(`/sourceInfo/selectSourceId?sourceId=${id}`, "GET", {});

// 申报系统-路线信息
export const updateOrInsertRoute = data =>
  ajax1(`/routeInfo/updateOrInsertRoute`, "PUT", data);
// 申报系统 - 根据路线 id 获取记录
export const getRouteById = id =>
  ajax1(`/routeInfo/selectByRouteId?routeId=${id}`, "GET", {});
// 申报系统 - 根据路线 id 更新记录
export const updateRouteById = data =>
  ajax1(`/routeInfo/putRouteInfo`, "PUT", data);

// 申报系统-路段信息
export const updateOrInsertRoad = data =>
  ajax1(`/roadInfo/updateOrInsertRoad`, "PUT", data);
// 申报系统 - 根据路段 id 获取记录
export const getRoadById = id =>
  ajax1(`/roadInfo/selectByRoadId?roadId=${id}`, "GET", {});
// 申报系统 - 根据路段 id 删除记录
export const delRoadById = id =>
  ajax1(`/routeInfo/{delete}?routeId=${id}`, "DELETE", {});
// 申报系统-路线信息查询
export const getAllrouteData = () =>
  ajax1(`/routeInfo/listRoute?pageFlag=false`, "GET", {});
export const getRouteDataByPage = (isPage, pageNo, pageSize) =>
  ajax1(
    `/routeInfo/listRoute?pageFlag=${isPage}&pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  );
//申报系统-路线设计由ID转换为字符串路段名
export const getAllConvertedrouteData = () =>
  ajax1(`/routeInfo/listConvertedRoute?pageFlag=false`, "GET", {});
export const getConvertedRoute = (isPage, pageNo, pageSize) =>
  ajax1(
    `/routeInfo/listConvertedRoute?pageFlag=${isPage}&pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  );
//   申报系统 根据路线id查询已绑定车辆
export const alreadyCar = routeId =>
  ajax1(`/vehicleAlarm/getAllLinkedCarRoute?routeID=${routeId}`, "GET", {});
// 申报系统 路线绑定车辆
export const routeBoundVe = data =>
  ajax1(`/vehicleAlarm/insertCarRoadInfo`, "POST", data);
//   批量绑定车辆
export const routeBoundVes = data =>
  ajax1(`/vehicleAlarm/insertMCarRoute`, "POST", data);
// 申报系统-消纳场信息
export const updateOrInsertIntake = data =>
  ajax1(`/newIntakePlant/updateOrInsertIntake`, "PUT", data);
// 申报系统 - 根据消纳场 id 获取记录
export const getIntakeInfoById = id =>
  ajax1(
    `/newIntakePlant/selectByINTAKE_PLANT_ID?intakePlantId=${id}`,
    "GET",
    {}
  );

// 角色权限管理
export const getPagesourceListByRoleId = params =>
  ajax1(
    `/pageSource/getPagesourceListByRoleId?roleid=${params.roleid}&pageNo=${params.pageNo}&pageSize=${params.pageSize}`,
    "GET",
    {}
  );
export const getNoPagesourceListByRoleId = id =>
  ajax1(`/pageSource/getNoPagesourceListByRoleId?id=${id}`, "GET", {});

export const getPageSourceListByPage = (isPage, pageNo, pageSize) =>
  ajax1(
    `/pageSource/listPageSourceByPage?pageFlag=${isPage}&pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  );

export const getPageSourceList = params =>
  ajax1(
    `/pageSource/listPageSourceByPage?roleid=${params.roleid}&pageNo=${params.pageNo}&pageSize=${params.pageSize}`,
    "GET",
    {}
  );
// 添加权限
// export const addPower = data =>
//   ajax1(  `/pageSource/insertPsource`, "POST", data);

export const addPower = params =>
  ajax1(
    `/SysRolePagesource/addByRoleIdJoinPsourceIdList?roleId=${params.roleId}&pSourceIdList=${params.pSourceIdList}`,
    "GET",
    {}
  );

// 删除权限
export const delByRoleIdJoinPsourceIdList = params =>
  ajax1(
    `/SysRolePagesource//delByRoleIdJoinPsourceIdList?roleId=${params.roleId}&pSourceIdList=${params.pSourceIdList}`,
    "GET",
    {}
  );

// 权限管理
export const getPageSource = () =>
  ajax1(`/pageSource/listPageSourceByPage?pageFlag=false`, "GET", {});
export const getPageSourceByPage = (isPage, pageNo, pageSize) =>
  ajax1(
    `/pageSource/listPageSourceByPage?pageFlag=${isPage}&pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  );

//修改数据
export const updatePageSource = data =>
  ajax1(`/pageSource/updatepageSource`, "PUT", data);
export const updateSP = data => ajax1(`/pageSource/updateSP`, "PUT", data);

//删除一条数据
export const deletePageSource = id =>
  ajax1(`/pageSource/deletepageSource/${id}`, "DELETE", {});
//新增数据
export const createPageSource = data =>
  ajax1(`/pageSource/addPageSource`, "POST", data);
//删除多条数据
export const deleteMPageSource = data =>
  ajax1(`/pageSource/deleteMpagesource?pagesourceid=${data}`, "GET", data);
//   修改密码**************************************************
export const resetpassword = (uname, oldPwd, newPwd) =>
  ajax1(`/sysUser/updatePwd/${uname}/${oldPwd}/${newPwd}`, "GET", {});

//      ************************************  首页图表接口  *****************************************
// 车辆模块 * 5
// 1. 7天报警车辆数量折线变化图
export const alarmCarNumberLineChart = () =>
  ajax1(`/graph/alarmCarNumberLineChart`, "GET", {});

// 2. 7天车辆使用数量的周变化折线图
export const numberOfVehicleUsed = tableName =>
  ajax1(`/graph/numberOfVehicleUsed?tableName=${tableName}`, "GET", {});

// 3. 车辆报警状态的误报比例扇形图
export const proportionOfVehicleCorrectAlarm = () =>
  ajax1(`/graph/proportionOfVehicleCorrectAlarm`, "GET", {});

// 4. 车辆审核状态占比扇形图
export const proportionOfVehicleReview = () =>
  ajax1(`/graph/proportionOfVehicleReview`, "GET", {});

// 5. 车辆使用状态占比扇形图
export const proportionOfVehicleStatus = () =>
  ajax1(`/graph/proportionOfVehicleStatus`, "GET", {});

// 消纳场模块 * 2
// .....

// 工地模块 * 4
// 垃圾种类占比饼图
export const sourcePie = () =>
  ajax1(`/graph/proportionOfGarbageTypes`, "GET", {});
// 不同垃圾种类直方图
export const sourceBar = () => ajax1(`/graph/quantityOfGarbage`, "GET", {});
// 每月垃圾总量数据
export const sourceBarByMonth = () =>
  ajax1(`/graph/quantityOfGarbageByMouth`, "GET", {}); //消纳场图表
// 消纳场
export const intakeReview = () =>
  ajax1(`/graph/proportionOfIntakeReview`, "GET", {});
