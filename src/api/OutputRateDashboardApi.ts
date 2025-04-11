import { scmpost, ResultParameter } from '@/api/scmapi';

export interface PolicyListRes {
  list: any[];
  errordate: string;
}
export async function GetProcess() {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetPROCESS',
    {
      
    }
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

export async function GetPlantOutputData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetPlantOutputData',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetPlantOutputData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetDeptOutputData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetDeptOutputData',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0]
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetDeptOutputData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetGroupOutputData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetGroupOutputData',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0],
      Dept:param.Dept.split('(')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetGroupOutputData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetDayOutputByPlint(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetDayOutputByPlint',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0]
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetDayOutputByPlint)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetDayOutputByDept(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetDayOutputByDept',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0],
      Dept:param.Dept.split('(')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetDayOutputByDept)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetDayOutputByGroup(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetDayOutputByGroup',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0],
      Dept:param.Dept.split('(')[0],
      Group:param.Group.split('(')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetDayOutputByGroup)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetWeekOutputByPlint(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetWeekOutputByPlint',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0]
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetWeekOutputByPlint)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetWeekOutputByDept(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetWeekOutputByDept',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0],
      Dept:param.Dept.split('(')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetWeekOutputByDept)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetWeekOutputByGroup(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetWeekOutputByGroup',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0],
      Dept:param.Dept.split('(')[0],
      Group:param.Group.split('(')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetWeekOutputByGroup)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetMonthOutputByPlint(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetMonthOutputByPlint',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0]
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetMonthOutputByPlint)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetMonthOutputByDept(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetMonthOutputByDept',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0],
      Dept:param.Dept.split('(')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetMonthOutputByDept)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetMonthOutputByGroup(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetMonthOutputByGroup',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0],
      Dept:param.Dept.split('(')[0],
      Group:param.Group.split('(')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetMonthOutputByGroup)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetSeasonOutputByPlint(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetSeasonOutputByPlint',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0]
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetSeasonOutputByPlint)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetSeasonOutputByDept(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetSeasonOutputByDept',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0],
      Dept:param.Dept.split('(')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetSeasonOutputByDept)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetSeasonOutputByGroup(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetSeasonOutputByGroup',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0],
      Dept:param.Dept.split('(')[0],
      Group:param.Group.split('(')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetSeasonOutputByGroup)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetYearOutputByPlint(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetYearOutputByPlint',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0]
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetYearOutputByPlint)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetYearOutputByDept(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetYearOutputByDept',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0],
      Dept:param.Dept.split('(')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetYearOutputByDept)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetYearOutputByGroup(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetYearOutputByGroup',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0],
      Dept:param.Dept.split('(')[0],
      Group:param.Group.split('(')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetYearOutputByGroup)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetSupervisorinfo(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetSupervisorinfo',
    {
      UserCode:param.UserCode,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetSupervisorinfo)`);
  } else {
    result.list = JSON.parse(data.RetData) as any;
    return result;
  }
}


export async function GetDaySupervisorOutputData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetDaySupervisorOutputData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetDaySupervisorOutputData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetDayGroupOutputData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetDayGroupOutputData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
      Day:param.Day,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetDayGroupOutputData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetDaySupervisorRateData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetDaySupervisorRateData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetDaySupervisorRateData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetDayGroupRateData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetDayGroupRateData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
      Day:param.Day,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetDayGroupRateData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetWeekSupervisorOutputData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetWeekSupervisorOutputData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetWeekSupervisorOutputData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetWeekGroupOutputData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetWeekGroupOutputData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
      Week:param.Week,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetWeekGroupOutputData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetWeekSupervisorRateData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetWeekSupervisorRateData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetWeekSupervisorRateData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetWeekGroupRateData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetWeekGroupRateData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
      Week:param.Week,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetWeekGroupRateData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetMonthSupervisorOutputData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetMonthSupervisorOutputData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetMonthSupervisorOutputData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}
export async function GetMonthGroupOutputData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetMonthGroupOutputData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
      Month:param.Month,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetMonthGroupOutputData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}
export async function GetMonthSupervisorRateData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetMonthSupervisorRateData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetMonthSupervisorRateData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}
export async function GetMonthGroupRateData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetMonthGroupRateData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
      Month:param.Month,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetMonthGroupRateData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetSeasonSupervisorOutputData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetSeasonSupervisorOutputData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetSeasonSupervisorOutputData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetSeasonGroupOutputData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetSeasonGroupOutputData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
      Season:param.Season,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetSeasonGroupOutputData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetSeasonSupervisorRateData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetSeasonSupervisorRateData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetSeasonSupervisorRateData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetSeasonGroupRateData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetSeasonGroupRateData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
      Season:param.Season,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetSeasonGroupRateData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetYearSupervisorOutputData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetYearSupervisorOutputData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetYearSupervisorOutputData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetYearGroupOutputData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetYearGroupOutputData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
      Year:param.Year,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetYearGroupOutputData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetYearSupervisorRateData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetYearSupervisorRateData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetYearSupervisorRateData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetYearGroupRateData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetYearGroupRateData',
    {
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      UserCode:param.UserCode,
      Year:param.Year,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetYearGroupRateData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetExportPlantData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetExportPlantData',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetExportPlantData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetExportDeptData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetExportDeptData',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0]
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetExportDeptData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetExportGroupData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.OutputRateDashboardServer',
    'GetExportGroupData',
    {
      org_id: param.org_id,
      PROCESS_NO: param.PROCESS_NO,
      startdate:param.startdate,
      enddate:param.enddate,
      Plant:param.Plant.split('(')[0],
      Dept:param.Dept.split('(')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetExportGroupData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

// export async function GetDayRateByPlant(param: any) {
//   const result: PolicyListRes = { list: [], errordate: '' };
//   const data: ResultParameter = await scmpost(
//     'KZ_MESAPI',
//     'KZ_MESAPI.Controllers.OutputRateDashboardServer',
//     'GetDayRateByPlant',
//     {
//       org_id: param.org_id,
//       PROCESS_NO: param.PROCESS_NO,
//       startdate:param.startdate,
//       enddate:param.enddate,
//       Plant:param.Plant.split('(')[0]
//     }
//   );
//   if (!data.IsSuccess) {
//     result.errordate = data.ErrMsg;
//     console.log(data.ErrMsg);
//     throw new Error(`${data.ErrMsg}(GetDayRateByPlant)`);
//   } else {
//     if (data.RetData !== '') {
//       result.list = JSON.parse(data.RetData) as any;
//     }

//     return result;
//   }
// }


// export async function GetDayRateByDept(param: any) {
//   const result: PolicyListRes = { list: [], errordate: '' };
//   const data: ResultParameter = await scmpost(
//     'KZ_MESAPI',
//     'KZ_MESAPI.Controllers.OutputRateDashboardServer',
//     'GetDayRateByDept',
//     {
//       org_id: param.org_id,
//       PROCESS_NO: param.PROCESS_NO,
//       startdate:param.startdate,
//       enddate:param.enddate,
//       Plant:param.Plant.split('(')[0],
//       Dept:param.Dept.split('(')[0],
//     }
//   );
//   if (!data.IsSuccess) {
//     result.errordate = data.ErrMsg;
//     console.log(data.ErrMsg);
//     throw new Error(`${data.ErrMsg}(GetDayRateByDept)`);
//   } else {
//     if (data.RetData !== '') {
//       result.list = JSON.parse(data.RetData) as any;
//     }

//     return result;
//   }
// }

// export async function GetDayRateByGroup(param: any) {
//   const result: PolicyListRes = { list: [], errordate: '' };
//   const data: ResultParameter = await scmpost(
//     'KZ_MESAPI',
//     'KZ_MESAPI.Controllers.OutputRateDashboardServer',
//     'GetDayRateByGroup',
//     {
//       org_id: param.org_id,
//       PROCESS_NO: param.PROCESS_NO,
//       startdate:param.startdate,
//       enddate:param.enddate,
//       Plant:param.Plant.split('(')[0],
//       Dept:param.Dept.split('(')[0],
//       Group:param.Group.split('(')[0],
//     }
//   );
//   if (!data.IsSuccess) {
//     result.errordate = data.ErrMsg;
//     console.log(data.ErrMsg);
//     throw new Error(`${data.ErrMsg}(GetDayRateByGroup)`);
//   } else {
//     if (data.RetData !== '') {
//       result.list = JSON.parse(data.RetData) as any;
//     }

//     return result;
//   }
// }

// export async function GetWeekRateByPlant(param: any) {
//   const result: PolicyListRes = { list: [], errordate: '' };
//   const data: ResultParameter = await scmpost(
//     'KZ_MESAPI',
//     'KZ_MESAPI.Controllers.OutputRateDashboardServer',
//     'GetWeekRateByPlant',
//     {
//       org_id: param.org_id,
//       PROCESS_NO: param.PROCESS_NO,
//       startdate:param.startdate,
//       enddate:param.enddate,
//       Plant:param.Plant.split('(')[0]
//     }
//   );
//   if (!data.IsSuccess) {
//     result.errordate = data.ErrMsg;
//     console.log(data.ErrMsg);
//     throw new Error(`${data.ErrMsg}(GetWeekRateByPlant)`);
//   } else {
//     if (data.RetData !== '') {
//       result.list = JSON.parse(data.RetData) as any;
//     }

//     return result;
//   }
// }

// export async function GetWeekRateByDept(param: any) {
//   const result: PolicyListRes = { list: [], errordate: '' };
//   const data: ResultParameter = await scmpost(
//     'KZ_MESAPI',
//     'KZ_MESAPI.Controllers.OutputRateDashboardServer',
//     'GetWeekRateByDept',
//     {
//       org_id: param.org_id,
//       PROCESS_NO: param.PROCESS_NO,
//       startdate:param.startdate,
//       enddate:param.enddate,
//       Plant:param.Plant.split('(')[0],
//       Dept:param.Dept.split('(')[0],
//     }
//   );
//   if (!data.IsSuccess) {
//     result.errordate = data.ErrMsg;
//     console.log(data.ErrMsg);
//     throw new Error(`${data.ErrMsg}(GetWeekRateByDept)`);
//   } else {
//     if (data.RetData !== '') {
//       result.list = JSON.parse(data.RetData) as any;
//     }

//     return result;
//   }
// }

// export async function GetWeekRateByGroup(param: any) {
//   const result: PolicyListRes = { list: [], errordate: '' };
//   const data: ResultParameter = await scmpost(
//     'KZ_MESAPI',
//     'KZ_MESAPI.Controllers.OutputRateDashboardServer',
//     'GetWeekRateByGroup',
//     {
//       org_id: param.org_id,
//       PROCESS_NO: param.PROCESS_NO,
//       startdate:param.startdate,
//       enddate:param.enddate,
//       Plant:param.Plant.split('(')[0],
//       Dept:param.Dept.split('(')[0],
//       Group:param.Group.split('(')[0],
//     }
//   );
//   if (!data.IsSuccess) {
//     result.errordate = data.ErrMsg;
//     console.log(data.ErrMsg);
//     throw new Error(`${data.ErrMsg}(GetWeekRateByGroup)`);
//   } else {
//     if (data.RetData !== '') {
//       result.list = JSON.parse(data.RetData) as any;
//     }

//     return result;
//   }
// }

// export async function GetMonthRateByPlant(param: any) {
//   const result: PolicyListRes = { list: [], errordate: '' };
//   const data: ResultParameter = await scmpost(
//     'KZ_MESAPI',
//     'KZ_MESAPI.Controllers.OutputRateDashboardServer',
//     'GetMonthRateByPlant',
//     {
//       org_id: param.org_id,
//       PROCESS_NO: param.PROCESS_NO,
//       startdate:param.startdate,
//       enddate:param.enddate,
//       Plant:param.Plant.split('(')[0]
//     }
//   );
//   if (!data.IsSuccess) {
//     result.errordate = data.ErrMsg;
//     console.log(data.ErrMsg);
//     throw new Error(`${data.ErrMsg}(GetMonthRateByPlant)`);
//   } else {
//     if (data.RetData !== '') {
//       result.list = JSON.parse(data.RetData) as any;
//     }

//     return result;
//   }
// }

// export async function GetMonthRateByDept(param: any) {
//   const result: PolicyListRes = { list: [], errordate: '' };
//   const data: ResultParameter = await scmpost(
//     'KZ_MESAPI',
//     'KZ_MESAPI.Controllers.OutputRateDashboardServer',
//     'GetMonthRateByDept',
//     {
//       org_id: param.org_id,
//       PROCESS_NO: param.PROCESS_NO,
//       startdate:param.startdate,
//       enddate:param.enddate,
//       Plant:param.Plant.split('(')[0],
//       Dept:param.Dept.split('(')[0]
//     }
//   );
//   if (!data.IsSuccess) {
//     result.errordate = data.ErrMsg;
//     console.log(data.ErrMsg);
//     throw new Error(`${data.ErrMsg}(GetMonthRateByDept)`);
//   } else {
//     if (data.RetData !== '') {
//       result.list = JSON.parse(data.RetData) as any;
//     }

//     return result;
//   }
// }

// export async function GetMonthRateByGroup(param: any) {
//   const result: PolicyListRes = { list: [], errordate: '' };
//   const data: ResultParameter = await scmpost(
//     'KZ_MESAPI',
//     'KZ_MESAPI.Controllers.OutputRateDashboardServer',
//     'GetMonthRateByGroup',
//     {
//       org_id: param.org_id,
//       PROCESS_NO: param.PROCESS_NO,
//       startdate:param.startdate,
//       enddate:param.enddate,
//       Plant:param.Plant.split('(')[0],
//       Dept:param.Dept.split('(')[0],
//       Group:param.Group.split('(')[0]
//     }
//   );
//   if (!data.IsSuccess) {
//     result.errordate = data.ErrMsg;
//     console.log(data.ErrMsg);
//     throw new Error(`${data.ErrMsg}(GetMonthRateByGroup)`);
//   } else {
//     if (data.RetData !== '') {
//       result.list = JSON.parse(data.RetData) as any;
//     }

//     return result;
//   }
// }

// export async function GetSeasonRateByPlant(param: any) {
//   const result: PolicyListRes = { list: [], errordate: '' };
//   const data: ResultParameter = await scmpost(
//     'KZ_MESAPI',
//     'KZ_MESAPI.Controllers.OutputRateDashboardServer',
//     'GetSeasonRateByPlant',
//     {
//       org_id: param.org_id,
//       PROCESS_NO: param.PROCESS_NO,
//       startdate:param.startdate,
//       enddate:param.enddate,
//       Plant:param.Plant.split('(')[0]
//     }
//   );
//   if (!data.IsSuccess) {
//     result.errordate = data.ErrMsg;
//     console.log(data.ErrMsg);
//     throw new Error(`${data.ErrMsg}(GetSeasonRateByPlant)`);
//   } else {
//     if (data.RetData !== '') {
//       result.list = JSON.parse(data.RetData) as any;
//     }

//     return result;
//   }
// }

// export async function GetSeasonRateByDept(param: any) {
//   const result: PolicyListRes = { list: [], errordate: '' };
//   const data: ResultParameter = await scmpost(
//     'KZ_MESAPI',
//     'KZ_MESAPI.Controllers.OutputRateDashboardServer',
//     'GetSeasonRateByDept',
//     {
//       org_id: param.org_id,
//       PROCESS_NO: param.PROCESS_NO,
//       startdate:param.startdate,
//       enddate:param.enddate,
//       Plant:param.Plant.split('(')[0],
//       Dept:param.Dept.split('(')[0]
//     }
//   );
//   if (!data.IsSuccess) {
//     result.errordate = data.ErrMsg;
//     console.log(data.ErrMsg);
//     throw new Error(`${data.ErrMsg}(GetSeasonRateByDept)`);
//   } else {
//     if (data.RetData !== '') {
//       result.list = JSON.parse(data.RetData) as any;
//     }

//     return result;
//   }
// }

// export async function GetSeasonRateByGroup(param: any) {
//   const result: PolicyListRes = { list: [], errordate: '' };
//   const data: ResultParameter = await scmpost(
//     'KZ_MESAPI',
//     'KZ_MESAPI.Controllers.OutputRateDashboardServer',
//     'GetSeasonRateByGroup',
//     {
//       org_id: param.org_id,
//       PROCESS_NO: param.PROCESS_NO,
//       startdate:param.startdate,
//       enddate:param.enddate,
//       Plant:param.Plant.split('(')[0],
//       Dept:param.Dept.split('(')[0],
//       Group:param.Group.split('(')[0]
//     }
//   );
//   if (!data.IsSuccess) {
//     result.errordate = data.ErrMsg;
//     console.log(data.ErrMsg);
//     throw new Error(`${data.ErrMsg}(GetSeasonRateByGroup)`);
//   } else {
//     if (data.RetData !== '') {
//       result.list = JSON.parse(data.RetData) as any;
//     }

//     return result;
//   }
// }

// export async function GetYearRateByPlant(param: any) {
//   const result: PolicyListRes = { list: [], errordate: '' };
//   const data: ResultParameter = await scmpost(
//     'KZ_MESAPI',
//     'KZ_MESAPI.Controllers.OutputRateDashboardServer',
//     'GetYearRateByPlant',
//     {
//       org_id: param.org_id,
//       PROCESS_NO: param.PROCESS_NO,
//       startdate:param.startdate,
//       enddate:param.enddate,
//       Plant:param.Plant.split('(')[0]
//     }
//   );
//   if (!data.IsSuccess) {
//     result.errordate = data.ErrMsg;
//     console.log(data.ErrMsg);
//     throw new Error(`${data.ErrMsg}(GetYearRateByPlant)`);
//   } else {
//     if (data.RetData !== '') {
//       result.list = JSON.parse(data.RetData) as any;
//     }

//     return result;
//   }
// }

// export async function GetYearRateByDept(param: any) {
//   const result: PolicyListRes = { list: [], errordate: '' };
//   const data: ResultParameter = await scmpost(
//     'KZ_MESAPI',
//     'KZ_MESAPI.Controllers.OutputRateDashboardServer',
//     'GetYearRateByDept',
//     {
//       org_id: param.org_id,
//       PROCESS_NO: param.PROCESS_NO,
//       startdate:param.startdate,
//       enddate:param.enddate,
//       Plant:param.Plant.split('(')[0],
//       Dept:param.Dept.split('(')[0],
//     }
//   );
//   if (!data.IsSuccess) {
//     result.errordate = data.ErrMsg;
//     console.log(data.ErrMsg);
//     throw new Error(`${data.ErrMsg}(GetYearRateByDept)`);
//   } else {
//     if (data.RetData !== '') {
//       result.list = JSON.parse(data.RetData) as any;
//     }

//     return result;
//   }
// }
// export async function GetYearRateByGroup(param: any) {
//   const result: PolicyListRes = { list: [], errordate: '' };
//   const data: ResultParameter = await scmpost(
//     'KZ_MESAPI',
//     'KZ_MESAPI.Controllers.OutputRateDashboardServer',
//     'GetYearRateByGroup',
//     {
//       org_id: param.org_id,
//       PROCESS_NO: param.PROCESS_NO,
//       startdate:param.startdate,
//       enddate:param.enddate,
//       Plant:param.Plant.split('(')[0],
//       Dept:param.Dept.split('(')[0],
//       Group:param.Group.split('(')[0],
//     }
//   );
//   if (!data.IsSuccess) {
//     result.errordate = data.ErrMsg;
//     console.log(data.ErrMsg);
//     throw new Error(`${data.ErrMsg}(GetYearRateByGroup)`);
//   } else {
//     if (data.RetData !== '') {
//       result.list = JSON.parse(data.RetData) as any;
//     }

//     return result;
//   }
// }