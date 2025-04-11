import axios from 'axios';
import { scmpost, ResultParameter } from '@/api/scmapi';

export interface factoryareaData {
  ORG_CODE: string;
  ORG_NAME: string;
}
export interface PolicyListRes {
  list: object;
  org_list: object;
  RTLS: object;
  PLANS: object;
  MATHS: object;
  ARTS: object;
}

export async function Getfactory() {
  const result: PolicyListRes = {
    list: {},
    org_list: {},
    RTLS: [],
    PLANS: [],
    MATHS: [],
    ARTS: [],
  };
  const data: ResultParameter = await scmpost(
    'KZ_RTLAPI',
    'KZ_RTLAPI.Controllers.ImportDataServer',
    'LoadAllOrg',
    {}
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    console.warn(data);
    if (data.RetData1 !== null) {
      result.list = data.RetData1.factorys as factoryareaData[];
      result.org_list = data.RetData1.orgs;
    }
    return result;
  }
}

export async function GetOneDayLeftData(datas: any) {
  const result: any = { oneDayLeftData: {}, XList: {} };
  const data: ResultParameter = await scmpost(
    'KZ_RTLAPI',
    'KZ_RTLAPI.Controllers.ImportDataServer',
    'OneDalAll',
    datas
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    if (data.RetData1 !== undefined) {
      result.oneDayLeftData = data.RetData1.oneDayLeftData;
      result.XList = data.RetData1.XList;
      result.RTLS = data.RetData1.RTLS;
      result.PLANS = data.RetData1.PLANS;
      result.MATHS = data.RetData1.MATHS;
      result.ARTS = data.RetData1.ARTS;
      result.R_RTLS = data.RetData1.R_RTLS;
    }
    return result;
  }
}

export async function GetOneDayItemData(datas: any) {
  const result: any = [];
  const data: ResultParameter = await scmpost(
    'KZ_RTLAPI',
    'KZ_RTLAPI.Controllers.ImportDataServer',
    'OneDalItemData',
    datas
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    console.warn(data, '接口第一层');
    if (data.RetData1 !== undefined) {
      console.warn(data, '接口第一层');
      result.value = data.RetData1;
    }
    return result;
  }
}

export async function GetThridDayAllData(datas: any) {
  const result: any = {};
  const data: ResultParameter = await scmpost(
    'KZ_RTLAPI',
    'KZ_RTLAPI.Controllers.ImportDataServer',
    'ThridDateAll',
    datas
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    console.log(data.RetData1, '3DAY 返回数据-------------');
    if (data.RetData1 !== undefined) {
      result.XList = data.RetData1.XList;
      result.RTLS = data.RetData1.RTLS;
      result.PLANS = data.RetData1.PLANS;
      result.MATHS = data.RetData1.MATHS;
      result.ARTS = data.RetData1.ARTS;
    }
    return result;
  }
}

export async function GetThridDayItemData(datas: any) {
  const result: any = [];
  const data: ResultParameter = await scmpost(
    'KZ_RTLAPI',
    'KZ_RTLAPI.Controllers.ImportDataServer',
    'ThridDateItem',
    datas
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    console.warn(data, '3天接口第一层');
    if (data.RetData1 !== undefined) {
      console.warn(data, '接口第一层');
      result.value = data.RetData1;
    }
    return result;
  }
}
