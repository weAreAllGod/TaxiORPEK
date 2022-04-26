import ajax from "./axios";
import ajax1 from "./axios1";
// 通过环境来取动态主机地址
const BASE_URL = process.env.API_KEY

// //上一版请求
// // *****************************************************************************
// // 运输车辆申报
// // 根据用户名查询数据
// export const selectByInputName = (data) => ajax(BASE_URL + `/carInfo/selectByInputName`, "POST", data)
// // 插入数据
// export const insert = (data) => ajax(BASE_URL + `/carInfo/insert`, "POST", data)
// // 普通用户修改信息
// export const updateData = (data) => ajax(BASE_URL + `/carInfo/updateData`, "POST", data)
// // 普通用户删除信息
// export const deleteByCarId = (data) => ajax(BASE_URL + `/carInfo/delete`, "POST", data)
// // 管理员查询数据总量
// export const getNumOfAllData = () => ajax(BASE_URL + `/carInfo/getNumOfAllData`, "GET", {})
// // 管理员分页查询数据
// export const findAll = (data) => ajax(BASE_URL + '/carInfo/find', "POST", data)
// // 管理员修改审核状态
// export const updateReviewStatus = (data) => ajax(BASE_URL + `/carInfo/updateReviewStatus`, "POST", data)
// // *****************************************************************************
// // 运输企业申报
// // 根据用户名查询数据
// export const selectByInputName2 = (data) => ajax(BASE_URL + `/CarCompany/selectByInputName2`, "POST", data)
// // 插入数据
// export const insert2 = (data) => ajax(BASE_URL + `/CarCompany/insert3`, "POST", data)
// // 普通用户修改信息
// export const updateData2 = (data) => ajax(BASE_URL + `/CarCompany/update3`, "POST", data)
// // 普通用户删除信息
// export const deleteByCarId2 = (data) => ajax(BASE_URL + `/CarCompany/delete3`, "POST", data)
// // 管理员查询所有信息
// export const selectAll2 = () => ajax(BASE_URL + `/CarCompany/selectall`, "GET", {})
// // 管理员修改审核状态
// export const updateReviewStatus2 = (data) => ajax(BASE_URL + `/CarCompany/updateReviewStatus`, "POST", data)
// // *****************************************************************************
// // 产生源申报
// // 根据用户名查询数据
// export const selectByInputName3 = (data) => ajax(BASE_URL + `/newSourceInfo/selectByInputName`, "POST", data)
// // 插入数据
// export const insert3 = (data) => ajax(BASE_URL + `/newSourceInfo/insert`, "POST", data)
// // 普通用户修改信息
// export const updateData3 = (data) => ajax(BASE_URL + `/newSourceInfo/updateData`, "POST", data)
// // 普通用户删除信息
// export const deleteBySourceId = (data) => ajax(BASE_URL + `/newSourceInfo/delete`, "POST", data)
// // 管理员查询所有信息
// export const selectAll3 = () => ajax(BASE_URL + `/newSourceInfo/selectAll`, "GET", {})
// // 管理员修改审核状态
// export const updateReviewStatus3 = (data) => ajax(BASE_URL + `/newSourceInfo/updateReviewStatus`, "POST", data)
// //根据id查询一条产生源数据
// export const selectBySourceId3 = (data) => ajax(BASE_URL + `/newSourceInfo//selectBySourceId`, "POST", data)
// // *****************************************************************************
// // 电子围栏
// // 根据id和s_or_i 查询经纬度
// export const selectByIdAndSOrI0 = (data)=>ajax(BASE_URL+`/efInfo/selectByIdAndSOrI`,"POST",data)
// // 电子围栏经纬度录入
// export const insertEfData0 = (data)=>ajax(BASE_URL+`/efInfo/insert`,"POST",data)
// // 删除电子围栏经纬度数据
// export const deleteEfData0 = (data)=>ajax(BASE_URL+`/efInfo/delete`,"POST",data)
// // *****************************************************************************
// // 消纳场申报
// // 根据用户名查询数据
// export const selectByInputName4 = (data) => ajax(BASE_URL + `/newIntakePlant/selectByInputName`, "POST", data)
// // 插入数据
// export const insert4 = (data) => ajax(BASE_URL + `/newIntakePlant/insert`, "POST", data)
// // 普通用户修改信息
// export const updateData4 = (data) => ajax(BASE_URL + `/newIntakePlant/updateData`, "POST", data)
// // 普通用户删除信息T
// export const deleteBySourceId4 = (data) => ajax(BASE_URL + `/newIntakePlant/delete`, "POST", data)
// // 管理员查询所有信息
// export const selectAll4 = () => ajax(BASE_URL + `/newIntakePlant/selectAll`, "GET", {})
// // 管理员查询所有信息
// export const selectAll4 = () => ajax(BASE_URL + `/newIntakePlant/selectAll`, "GET", {})
// // 管理员修改审核状态
// export const updateReviewStatus4 = (data) => ajax(BASE_URL + `/newIntakePlant/updateReviewStatus`, "POST", data)
// //根据id查询一条消纳场数据
// export const selectByIntakeId4 = (data) => ajax(BASE_URL + `/newIntakePlant/selectByINTAKE_PLANT_ID`, "POST", data)
// // *****************************************************************************
// // 资源场申报
// // 根据用户名查询数据
// export const selectByInputName5 = (data) => ajax(BASE_URL + `/newResourcePlant/selectByInputName`, "POST", data)
// // 插入数据
// export const insert5 = (data) => ajax(BASE_URL + `/newResourcePlant/insert`, "POST", data)
// // 普通用户修改信息
// export const updateData5 = (data) => ajax(BASE_URL + `/newResourcePlant/updateData`, "POST", data)
// // 普通用户删除信息
// export const deleteBySourceId5 = (data) => ajax(BASE_URL + `/newResourcePlant/delete`, "POST", data)
// // 管理员查询所有信息
// export const selectAll5 = () => ajax(BASE_URL + `/newResourcePlant/selectAll`, "GET", {})
// // 管理员修改审核状态
// export const updateReviewStatus5 = (data) => ajax(BASE_URL + `/newResourcePlant/updateReviewStatus`, "POST", data)
// //根据id查询一条消纳场数据
// export const selectBySourceId5 = (data) => ajax(BASE_URL + `/newResourcePlant/selectByRESOURCE_PLANT_ID`, "POST", data)
// // *****************************************************************************
// // 首页大屏
// export const selectChart7 = () => ajax(BASE_URL + `/constructionWasteInfo/total`, "GET", {})

// *****************************************************************************
// 登录页面
// 获取验证码
export let imgBasePath = BASE_URL + `/getCode`;
export const getcaptcha = () => ajax1(BASE_URL + `/imageGeneration`, "GET", {});
export const login = (captcha, username, password, isRememberMe) =>
  ajax1(
    BASE_URL + `/user/login?captcha=${captcha}&loginName=${username}&password=${password}&rememberMe=${isRememberMe}`,
    "POST",
    {}
  );

// *****************************************************************************
// 运输车辆申报
// 根据用户名查询数据
export const selectCarDataByInputName = (inputName, isPage, pageNo, pageSize) =>
  ajax1(
    BASE_URL + `/carInfo/selectByInputName?inputName=${inputName}&pageFlag=${isPage}&pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  );
// 插入数据
export const insertCarData = data =>
  ajax1(BASE_URL + `/carInfo/createCarInfo`, "POST", data);
// 普通用户修改信息
export const updateCarData = data =>
  ajax1(BASE_URL + `/carInfo/putCarInfo`, "PUT", data);
// 普通用户删除信息
export const deleteCarDataById = id =>
  ajax1(BASE_URL + `/carInfo/{carInfoIds}?ids=${id}`, "DELETE", {});

// 管理员查询数据总量
export const selectNumOfAllCarData = () =>
  ajax1(BASE_URL + `/carInfo/getNumAll`, "GET", {});
// 管理员分页查询数据
export const selectAllCarDataByPage = (isPage, pageNo, pageSize) =>
  ajax1(
    BASE_URL + `/carInfo/listCarInfoByPage?pageFlag=${isPage}&pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  );
// 管理员修改审核状态
export const updateCarReviewStatus = (carId, reviewStatus) =>
  ajax1(BASE_URL + `/carInfo/changeReview?carid=${carId}&reviewStatus=${reviewStatus}`, "PUT", {});

// *****************************************************************************
// 运输企业申报
// 根据用户名查询数据
export const selectCompanyDataByInputName = (inputName, isPage) =>
  ajax1(
    BASE_URL + `/carCompany/selectByInputName?inputName=${inputName}&pageFlag=${isPage}`,
    "GET",
    {}
  );
// 插入数据
export const insertCompanyData = data =>
  ajax1(BASE_URL + `/carCompany/createCarCompany`, "POST", data);
// 普通用户修改信息
export const updateCompanyData = data =>
  ajax1(BASE_URL + `/carCompany/putCarCompany`, "PUT", data);
// 普通用户删除信息
export const deleteCompanyDataById = id =>
  ajax1(
    BASE_URL + `/carCompany/{carCompanyIds}?ids=${id}`,
    "DELETE",
    {}
  );

// 管理员查询所有信息
export const selectAllCompanyData = isPage =>
  ajax1(
    BASE_URL + `/carCompany/listCarCompanyByPage?pageFlag=${isPage}`,
    "GET",
    {}
  );
// 管理员修改审核状态
export const updateCompanyReviewStatus = data =>
  ajax1(BASE_URL + `/carCompany/changeReview`, "PUT", data);

// *****************************************************************************
// 产生源申报
// 根据用户名查询数据
export const selectSourceDataByInputName = inputName => ajax1(BASE_URL + `/sourceInfo/selectByInputName?inputName=${inputName}`, "GET", {});
// 插入数据
export const insertSourceData = data =>
  ajax1(BASE_URL + `/sourceInfo/createSource`, "POST", data);
// 普通用户修改信息
export const updateSourceData = data =>
  ajax1(BASE_URL + `/sourceInfo/putSource`, "PUT", data);
// 普通用户删除信息
export const deleteSourceDataById = id =>
  ajax1(
    BASE_URL + `/sourceInfo/{sourceId}?sourceId=${id}`,
    "DELETE",
    {}
  );

// 管理员查询所有信息
export const selectAllSourceData = () =>
  ajax1(
    BASE_URL + `/sourceInfo/listInfoByPage?pageFlag=false`,
    "GET",
    {}
  );
// 根据分页查询资源场的数据
export const selectSourceDataByPage = (isPage, pageNo, pageSize) =>
  ajax1(
    BASE_URL + `/sourceInfo/listInfoByPage?pageFlag=${isPage}&pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  );
// 管理员修改审核状态
export const updateSourceReviewStatus = (id, status) =>
  ajax1(
    BASE_URL + `/sourceInfo/updateReviewStatus?reviewStatus=${status}&sourceId=${id}`,
    "PUT",
    {}
  );
// 产生源电子围栏
//根据id查询一条产生源数据
export const selectOneSourceData = id =>
  ajax1(
    BASE_URL + `/sourceInfo/selectSourceId?sourceId=${id}`,
    "GET",
    {}
  );

// *****************************************************************************
// 核准表申请
// 查询所有审核单列表
export const selectAllApply = () => ajax1(BASE_URL + `/ApplyInfo/selectAll?pageFlag=false`, "GET", {})
// 根据分页查询资源场的数据
export const selectApplyByPage = (isPage, pageNo, pageSize) =>
  ajax1(
    BASE_URL + `/ApplyInfo/selectAll?pageFlag=${isPage}&pageNo=${pageNo}&pageSize=${pageSize}`,
    "GET",
    {}
  )
// 更新审核单数据
export const updateApplyInfo = (data) => ajax1(BASE_URL + `/ApplyInfo/updateData`, "PUT", data);
// 插入审核单数据
export const insertApplyInfo = (data) => ajax1(BASE_URL + `/ApplyInfo/insert`, "POST", data);
// 删除审核单数据
export const deleteApplyInfo = (applyId) => ajax1(BASE_URL + `/ApplyInfo/{delete}?applyID=${applyId}`, "DELETE", {});


// *****************************************************************************
// 电子围栏
// 根据id和s_or_i 查询经纬度
export const selectByIdAndSOrI = (SOrI, id) =>
  ajax1(
    BASE_URL + `/efInfo/selectByIdAndSOrI?SOrI=${SOrI}&id=${id}`,
    "GET",
    {}
  );
// 电子围栏经纬度录入
export const insertEfData = data =>
  ajax1(BASE_URL + `/efInfo/insert`, "POST", data);
// 删除电子围栏经纬度数据
export const deleteEfData = (SOrI, id) =>
  ajax1(
    BASE_URL + `/efInfo/{delete}?SOrI=${SOrI}&id=${id}`,
    "DELETE",
    {}
  );

// *****************************************************************************
// 消纳场申报
// 根据用户名查询数据
export const selectIntakeDataByInputName = inputName =>
  ajax1(
    BASE_URL + `/newIntakePlant/selectByInputName?inputName=${inputName}`,
    "GET",
    {}
  );
// 插入数据
export const insertIntakeData = data =>
  ajax1(BASE_URL + `/newIntakePlant/insert`, "POST", data);
// 普通用户修改信息
export const updateIntakeData = data =>
  ajax1(BASE_URL + `/newIntakePlant/updateData`, "PUT", data);
// 普通用户删除信息T
export const deleteIntakeDataById = id =>
  ajax1(
    BASE_URL + `/newIntakePlant/{delete}?intakePlantId=${id}`,
    "DELETE",
    {}
  );

// 管理员查询所有信息
export const selectAllIntakeData = isPage =>
  ajax1(
    BASE_URL + `/newIntakePlant/selectAll?pageFlag=${isPage}`,
    "GET",
    {}
  );
// 管理员修改审核状态
export const updateIntakeReviewStatus = (id, status) =>
  ajax1(
    BASE_URL + `/newIntakePlant/updateReviewStatus?intakePlantId=${id}&reviewStatus=${status}`,
    "PUT",
    {}
  );
//根据id查询一条消纳场数据
export const selectOneIntakeData = id =>
  ajax1(
    BASE_URL + `/newIntakePlant/selectByINTAKE_PLANT_ID?intakePlantId=${id}`,
    "GET",
    {}
  );

// *****************************************************************************
// 资源场申报
// 根据用户名查询数据
export const selectResourceDataByInputName = inputName =>
  ajax1(
    BASE_URL + `/newResourcePlant/selectByInputName?inputName=${inputName}`,
    "GET",
    {}
  );
// 插入数据
export const insertResourceData = data =>
  ajax1(BASE_URL + `/newResourcePlant/insert`, "POST", data);
// 普通用户修改信息
export const updateResourceData = data =>
  ajax1(BASE_URL + `/newResourcePlant/updateData`, "PUT", data);
// 普通用户删除信息
export const deleteResourceDataById = id =>
  ajax1(
    BASE_URL + `/newResourcePlant/{delete}?resourcePlantId=${id}`,
    "DELETE",
    {}
  );

// 管理员查询所有信息
export const selectAllResourceData = isPage =>
  ajax1(
    BASE_URL + `/newResourcePlant/selectAll?pageFlag=${isPage}`,
    "GET",
    {}
  );
// 管理员修改审核状态
export const updateResourceReviewStatus = (id, status) =>
  ajax1(
    BASE_URL + `/newResourcePlant/updateReviewStatus?resourcePlantId=${id}&reviewStatus=${status}`,
    "PUT",
    {}
  );
//根据id查询一条消纳场数据
export const selectOneResourceData = id =>
  ajax1(
    BASE_URL + `/newResourcePlant/selectByRESOURCE_PLANT_ID?resourcePlantId=${id}`,
    "GET",
    {}
  );

// *****************************************************************************
// 车辆监控
// 根据公司名称查询车辆信息数据
// 根据公司名称查询车辆信息数据
export const selectCarNameByCompany = (data) => ajax(BASE_URL + `/carInfo/selectCarNameByCompany`, "POST", data)
export const selectCarNoByCompany = (name, isPage) => ajax1(BASE_URL + `/carInfo/selectByCompany?company=${name}&pageFlag=${isPage}`, "GET", {})
// 根据车牌号查询一条数据
export const selectVMData = (carId, index) => ajax1(BASE_URL + `/carTrail/dynamic?CAR_ID=${carId}&ID=${index}`, "POST", {})
// 根据车牌号查询一条数据(数据少)
export const selectVMDataNew = (carId, index) => ajax1(BASE_URL + `/carTrailNew/dynamic?CAR_ID=${carId}&ID=${index}`, "POST", {})
// 根据车牌号查询轨迹数据
export const selectHTData = (carId, isPage, start, end) => ajax1(BASE_URL + `/carTrail/history?END_TIME=${end}&START_TIME=${start}&carId=${carId}&pageFlag=${isPage}`, "GET", {})
export const selectHTDataNew = (carId, isPage, start, end) => ajax1(BASE_URL + `/carTrailNew/history?END_TIME=${end}&START_TIME=${start}&carId=${carId}&pageFlag=${isPage}`, "GET", {})
export const selectREData2 = (terminalId, isPage, start, end) => ajax1(BASE_URL + `/tRealTimePostionController/selectAll`, "GET", {})
export const selectHTData2 = (carNo, isPage, start, end) => ajax1(BASE_URL + `/tHistoryPosition/history?END_TIME=${end}&START_TIME=${start}&carNo=${carNo}&pageFlag=${isPage}`, "GET", {})

// *****************************************************************************
// 系统管理
// 组织管理
//查询数据
export const selectOrgListByPage = () =>
  ajax1(BASE_URL + `/sysOrganization/getOrgListByPage`, "GET", {});
//修改数据
export const updateOrgById = data =>
  ajax1(BASE_URL + `/sysOrganization/updateOrgById`, "PUT", data);
//删除一条数据
export const deleteOrgById = id =>
  ajax1(
    BASE_URL + `/sysOrganization/deleteOrgById/${id}`,
    "DELETE",
    {}
  );
//新增数据
export const createOrganization = data =>
  ajax1(
    BASE_URL + `/sysOrganization/createOrganization`,
    "POST",
    data
  );
//删除多条数据
export const deleteMOrgById = data =>
  ajax1(BASE_URL + `/sysOrganization/deleteMOrgById`, "POST", data);
//删除一条数据
export const deleteOrgById_get = id =>
  ajax1(
    BASE_URL + `/sysOrganization/deleteOrgById_get/${id}`,
    "GET",
    {}
  );
//删除多条数据
export const deleteMOrgById_get = data =>
  ajax1(
    BASE_URL + `/sysOrganization/deleteMOrgById_get/${data}`,
    "GET",
    data
  );

// 用户管理
//查询数据
export const selectUserByPage = () =>
  ajax1(BASE_URL + `/sysUser/listUserByPage`, "GET", {});
//修改数据
export const updateUser = data =>
  ajax1(BASE_URL + `/sysUser/updateUser`, "PUT", data);
//删除一条数据
export const deleteUserById = userIds =>
  ajax1(BASE_URL + `/sysUser/batchDelete/${userIds}`, "DELETE", {});
//新增数据
export const createUser = data =>
  ajax1(BASE_URL + `/sysUser/createUser`, "POST", data);
//根据ID删除多条数据，get方式
export const deleteMUserById_get = userid =>
  ajax1(
    BASE_URL + `/sysUser/deleteMUserById_get/${userid}`,
    "GET",
    {}
  );
//删除一条数据,get方式
export const deleteUserById_get = userid =>
  ajax1(
    BASE_URL + `/sysUser/deleteUserById_get/${userid}`,
    "GET",
    {}
  );

//角色管理
//查询数据
export const selectRoleListPage = () =>
  ajax1(BASE_URL + `/user_role/listRoleByPage`, "GET", {});
//修改数据
export const updateRole = data =>
  ajax1(BASE_URL + `/user_role/updateRole`, "PUT", data);
//根据ID批量删除数据
export const deleteRoleById = roleIds =>
  ajax1(
    BASE_URL + `/user_role/deleteRoleById/${roleIds}`,
    "DELETE",
    {}
  );
//根据用户名删除数据
export const deleteRoleByRoleName = () =>
  ajax1(
    BASE_URL + `/user_role/deleteRoleByRoleName/${rname}`,
    "DELETE",
    {}
  );
//新增数据
export const createRole = data =>
  ajax1(BASE_URL + `/user_role/createRole`, "POST", data);
//删除一条数据
export const deleteOneRole = roleid =>
  ajax1(
    BASE_URL + `/user_role/deleteOneRole/${roleid}`,
    "DELETE",
    {}
  );
//删除一条数据,get方式
export const deleteOneRole_get = roleid =>
  ajax1(
    BASE_URL + `/user_role/deleteOneRole_get/${roleid}`,
    "GET",
    {}
  );
//根据ID批量删除数据,get方法
export const deleteRoleById_get = roleIds =>
  ajax1(
    BASE_URL + `/user_role/deleteRoleById_get/${roleIds}`,
    "GET",
    {}
  );

// 获取轨迹数据方法
export const selectLine = () =>
  ajax1("../../../static/json/lines-bus.json", "GET", {});

export const selecHot = () =>
  ajax1("../../../static/json/hangzhou-tracks.json", "GET", {});

export const selecBin = () =>
  ajax1("../../../static/json/binning.json", "GET", {});

// *****************************************************************************
// 申报系统-车辆公司信息
export const updateOrInsertCarCompany = (data) => ajax1(BASE_URL + `/carCompany/updateOrInsertCarCompany`, "PUT", data);

// *****************************************************************************
// 申报系统-工地信息
export const updateOrInsertSource = (data) => ajax1(BASE_URL + `/sourceInfo/updateOrInsertSource`, "PUT", data);

// *****************************************************************************
// 申报系统-路线信息
export const updateOrInsertRoute = (data) => ajax1(BASE_URL + `/routeInfo/updateOrInsertRoute`, "PUT", data);

// *****************************************************************************
// 申报系统-路段信息
export const updateOrInsertRoad = (data) => ajax1(BASE_URL + `/roadInfo/updateOrInsertRoad`, "PUT", data);

// *****************************************************************************
// 申报系统-消纳场信息
export const updateOrInsertIntake = (data) => ajax1(BASE_URL + `/newIntakePlant/updateOrInsertIntake`, "PUT", data);
