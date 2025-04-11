import { scmpost, ResultParameter } from '@/api/scmapi';
import { isNullOrEmptyStr } from '@/utils/is';

export interface ResponseResult {
  status: boolean;
  data: any;
  msg: string;
}
export interface PolicyListRes {
  list: any[];
  errordate: string;
}
export async function GerPersonCountByPlan(orgId: string, Date: string) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.Production_KanbanServer',
    'GerPersonCountByPlan',
    {
      org_id: orgId,
      vDate: Date,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.status = false;
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.status = true;
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}
export async function GetTranOutInCountByPlan(orgId: string, Date: string) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.Production_KanbanServer',
    'GetTranOutInCountByPlan',
    {
      org_id: orgId,
      vDate: Date,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}
export async function GetTranOutInMonthHoursByPlan(
  orgId: string,
  Date: string
) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.Production_KanbanServer',
    'GetTranOutInMonthHoursByPlan',
    {
      org_id: orgId,
      vDate: Date,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}

export async function GetTranOutInCountByDept(
  orgId: string,
  plantid: string,
  Date: string
) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.Production_KanbanServer',
    'GetTranOutInCountByDept',
    {
      org_id: orgId,
      plant_id: plantid,
      vDate: Date,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}
export async function GetTranOutInHoursByMonth(
  orgId: string,
  plantid: string,
  Date: string
) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.Production_KanbanServer',
    'GetTranOutInHoursByMonth',
    {
      org_id: orgId,
      plant_id: plantid,
      vDate: Date,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}
export async function GetStaffTranInSkillByDay(
  orgId: string,
  plantid: string,
  deptNo: string,
  Date: string
) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.Production_KanbanServer',
    'GetStaffTranInSkillByDay',
    {
      org_id: orgId,
      plant_id: plantid,
      dept_No: deptNo,
      vDate: Date,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}
export async function GetStaffTranInSkillPercentByDay(
  orgId: string,
  plantid: string,
  deptNo: string,
  Date: string
) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.Production_KanbanServer',
    'GetStaffTranInSkillPercentByDay',
    {
      org_id: orgId,
      plant_id: plantid,
      dept_No: deptNo,
      vDate: Date,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}
export async function GetPlantTranInSkillCountByMonth(
  orgId: string,
  Date: string
) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.Production_KanbanServer',
    'GetPlantTranInSkillCountByMonth',
    {
      org_id: orgId,
      vDate: Date,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}
export async function GetPlantTranInSkillCountByWeek(
  orgId: string,
  plantid: string,
  Date: string
) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.Production_KanbanServer',
    'GetPlantTranInSkillCountByWeek',
    {
      org_id: orgId,
      plant_id: plantid,
      vDate: Date,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData)
      ? []
      : (JSON.parse(data.RetData) as any);
  }
  return result;
}
// 查询厂区
export async function Getplantlist(orgid: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.Production_KanbanServer',
    'Getplantlist',
    {
      org_id: orgid,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(加载厂区报错)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }
    return result;
  }
}
// 查询组别
export async function Getgrouplist(orgid: any, plantid: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.Production_KanbanServer',
    'Getgrouplist',
    {
      org_id: orgid,
      plant_id: plantid,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(组别报错)`);
  } else {
    result.list = JSON.parse(data.RetData) as any;
    return result;
  }
}
