import { scmpost, ResultParameter } from '@/api/scmapi';

export interface PolicyListRes {
  list: any[];
  errordate: string;
}
// 查询组别
export async function Getgrouplist(param: any) {
  if (param.org_id == null) {
    param.org_id = '';
  }
  if (param.plant_id == null) {
    param.plant_id = '';
  }
  if (param.dept_no == null) {
    param.dept_no = '';
  }
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.IssueTrackingDashboardServer',
    'Getgrouplist',
    {
      org_id: param.org_id,
      plant_id: param.plant_id,
      dept_no: param.dept_no,
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
// 查询上级部门
export async function Getdeptlist(param: any) {
  if (param.org_id == null) {
    param.org_id = '';
  }
  if (param.plant_id == null) {
    param.plant_id = '';
  }
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.IssueTrackingDashboardServer',
    'Getdeptlist',
    {
      org_id: param.org_id,
      plant_id: param.plant_id,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(加载上级部门报错)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }
    return result;
  }
}
// 查询厂区
export async function Getplantlist(param: any) {
  if (param.org_id == null) {
    param.org_id = '';
  }
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.IssueTrackingDashboardServer',
    'Getplantlist',
    {
      org_id: param.org_id,
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
// 查询饼图
export async function GetpieRateData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.IssueTrackingDashboardServer',
    'GetpieRateData',
    {
      org_id: param.org_id,
      plant_id: param.plant_id,
      dept_no: param.dept_no,
      group_no: param.group_no.split('|')[0],
      startdate: param.startdate,
      enddate: param.enddate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(查询饼图报错)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}
// 查询折线图
export async function GetlineRateData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.IssueTrackingDashboardServer',
    'GetlineRateData',
    {
      org_id: param.org_id,
      plant_id: param.plant_id,
      dept_no: param.dept_no,
      group_no: param.group_no.split('|')[0],
      startdate: param.startdate,
      enddate: param.enddate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(查询折线图报错)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}
// 查询表格
export async function GetquestionList(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.IssueTrackingDashboardServer',
    'GetquestionList',
    {
      org_id: param.org_id,
      plant_id: param.plant_id,
      dept_no: param.dept_no,
      group_no: param.group_no.split('|')[0],
      startdate: param.startdate,
      enddate: param.enddate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(查询表格报错)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }
    return result;
  }
}
// 查询表格
export async function GetquestionQty(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.IssueTrackingDashboardServer',
    'GetquestionQty',
    {
      org_id: param.org_id,
      plant_id: param.plant_id,
      dept_no: param.dept_no,
      group_no: param.group_no.split('|')[0],
      startdate: param.startdate,
      enddate: param.enddate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(查询问题数量报错)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }
    return result;
  }
}
export async function loadUserInfo() {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.IssueTrackingDashboardServer',
    'loadUserInfo',
    {}
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(加载数据报错)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }
    return result;
  }
}

export async function GetQCOData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.IssueTrackingDashboardServer',
    'GetQCOData',
    {
      org_id: param.org_id,
      plant_id: param.plant_id,
      dept_no: param.dept_no,
      group_no: param.group_no.split('|')[0],
      startdate: param.startdate,
      enddate: param.enddate,
      ART: param.ART,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetQCOData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}
export async function GetQCOIEratemm(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.IssueTrackingDashboardServer',
    'GetQCOIEratemm',
    {
      org_id: param.org_id,
      plant_id: param.plant_id,
      dept_no: param.dept_no,
      group_no: param.group_no.split('|')[0],
      startdate: param.startdate,
      enddate: param.enddate,
      ART: param.ART,
      PROCESS_NO: param.PROCESS_NO,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetQCOIEratemm)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetPROCESS() {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.IssueTrackingDashboardServer',
    'GetPROCESS',
    {}
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetPROCESS)`);
  } else {
    result.list = JSON.parse(data.RetData) as any;
    return result;
  }
}
// 查询厂区
export async function GetplantlistNew(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.IssueTrackingDashboardServer',
    'GetplantlistNew',
    {
      org_id: param.org_id,
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
