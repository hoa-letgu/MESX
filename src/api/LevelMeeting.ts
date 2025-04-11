/* eslint-disable prettier/prettier */
import { scmpost, ResultParameter } from '@/api/scmapi';

export interface PolicyListRes {
  list: any[];
  errordate: string;
}

export interface TTData {
  TT: string;
  errordate: string;
}

export interface TAacceptedData {
  TAaccepted: string;
  errordate: string;
}
export interface PagecountData {
  pagecount: number;
  errordate: string;
}

export interface WORKQTYData {
  WORKQTY: string;
  errordate: string;
}

export interface FINISHQTYData {
  FINISHQTY: string;
  errordate: string;
}

export interface IERATEData {
  IERATE: string;
  errordate: string;
}

export interface LinePassRateData {
  LinePassRate: string;
  errordate: string;
}

export async function GetDepartmentNameByUserId() {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.LevelMeetingServer',
    'GetDepartmentNameByUserId',
    {}
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetDepartmentNameByUserId)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetCzgAndSzz(departmentNo: any, searchDate: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.LevelMeetingServer',
    'GetCzgAndSzz',
    {
      departmentNo,
      searchDate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetCzgAndSzz)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetTT(departmentNo: any, searchDate: any) {
  const result: TTData = { TT: '0', errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.LevelMeetingServer',
    'GetTT',
    {
      departmentNo,
      searchDate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetTT)`);
  } else {
    if (data.RetData !== '') {
      result.TT = data.RetData;
    }

    return result;
  }
}

export async function GetTAaccepted(departmentNo: any, searchDate: any) {
  const result: TAacceptedData = { TAaccepted: '0', errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.LevelMeetingServer',
    'GetTAaccepted',
    {
      departmentNo,
      searchDate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetTAaccepted)`);
  } else {
    if (data.RetData !== '') {
      result.TAaccepted = data.RetData;
    }

    return result;
  }
}

export async function GetIETHTList(departmentNo: any, searchDate: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.LevelMeetingServer',
    'GetIETHTList',
    {
      departmentNo,
      searchDate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetIETHTList)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetWORKQTY(departmentNo: any, searchDate: any) {
  const result: WORKQTYData = { WORKQTY: '0', errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.LevelMeetingServer',
    'GetWORKQTY',
    {
      departmentNo,
      searchDate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetWORKQTY)`);
  } else {
    if (data.RetData !== '') {
      result.WORKQTY = data.RetData;
    }

    return result;
  }
}

export async function GetFINISHQTY(departmentNo: any, searchDate: any) {
  const result: FINISHQTYData = { FINISHQTY: '0', errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.LevelMeetingServer',
    'GetFINISHQTY',
    {
      departmentNo,
      searchDate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetFINISHQTY)`);
  } else {
    if (data.RetData !== '') {
      result.FINISHQTY = data.RetData;
    }

    return result;
  }
}

export async function GetMonthWORKQTY(departmentNo: any, searchDate: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.LevelMeetingServer',
    'GetMonthWORKQTY',
    {
      departmentNo,
      searchDate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetMonthWORKQTY)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetBadTOP3(departmentNo: any, searchDate: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.LevelMeetingServer',
    'GetBadTOP3',
    {
      departmentNo,
      searchDate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetBadTOP3)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetIERATE(departmentNo: any, searchDate: any) {
  const result: IERATEData = { IERATE: '0', errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.LevelMeetingServer',
    'GetIERATE',
    {
      departmentNo,
      searchDate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetIERATE)`);
  } else {
    if (data.RetData !== '') {
      result.IERATE = data.RetData;
    }

    return result;
  }
}

export async function GetDNGData(departmentNo: any, searchDate: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.LevelMeetingServer',
    'GetDNGData',
    {
      departmentNo,
      searchDate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetDNGData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetWorkHourRecords(departmentNo: any, searchDate: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.LevelMeetingServer',
    'GetWorkHourRecords',
    {
      departmentNo,
      searchDate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetWorkHourRecords)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetHourlyProduction(departmentNo: any, searchDate: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.LevelMeetingServer',
    'GetHourlyProduction',
    {
      departmentNo,
      searchDate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetHourlyProduction)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetLineBalance(departmentNo: any, searchDate: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.LevelMeetingServer',
    'GetLineBalance',
    {
      departmentNo,
      searchDate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetLineBalance)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetLinePassRate(departmentNo: any, searchDate: any) {
  const result: LinePassRateData = { LinePassRate: '0', errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.LevelMeetingServer',
    'GetLinePassRate',
    {
      departmentNo,
      searchDate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetLinePassRate)`);
  } else {
    if (data.RetData !== '') {
      result.LinePassRate = data.RetData;
    }

    return result;
  }
}
export async function GetNoticeList(departmentNo: any, searchDate: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.LevelMeetingServer',
    'GetNoticeList',
    {
      departmentNo,
      searchDate,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(查询公告栏数量报错)`);
  } else {
    if (data.RetData !== '') {
      result.list = data.RetData as any;
    }
    return result;
  }
}
