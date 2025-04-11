/* eslint-disable prettier/prettier */
import { scmpost, ResultParameter } from '@/api/scmapi';

export interface orgData {
  org_code: string;
  org_name: string;
}
export interface factoryareaData {
  code: string;
  org: string;
}
export interface maintenanceData {
  KEY: string;
  ADDRESS: string;
  SNID: string;
  DEVICE_NAME: string;
  BODY_PART: string;
  ITEM: string;
  PLAN_FINISHDATE: string;
}
export interface repairData {
  KEY: string;
  ADDRESS: string;
  SNID: string;
  DEVICE_NAME: string;
  BZ_REMARK: string;
  BZ_USER: string;
  BZ_DATE: string;
}
export interface DevicestatusData {
  RATE: number;
  DEVICE_STATUS: string;
  NAME: string;
}
export interface MaintenanceRateData {
  ONERATE: number;
  TWORATE: number;
}
export interface RepairRateData {
  REPAIRINGRATE: number;
  FINISHDATA: number;
  WAITRATE: number;
}
export interface PolicyListRes {
  list: any[];
  errordate: string;
}
export interface PagecountData {
  pagecount: number;
  errordate: string;
}
export interface CutDetailData {
    KEY: string;
    wk_dept: string;
    NAME_T: string;
    se_id: string;
    develop_season: string;
    order_level: string;
    name_t: string;
    prod_no: string;
    last_no: string;
    base_sizeno: string;
    mold_no: string;
    wk_qty: string;
    cat_fsqty: string;
    Proportion:string;
    abn_cause: string;
    resp_vend:string;
  }
  
export async function GetCutDetailtList(pageindex:any,type:any,startdate:any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.Production_KanbanServer',
    'GetCutDetailtList',
    {
      pageindex,
      type,
      startdate
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetCutDetailtList)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as CutDetailData[];
    }

    return result;
  }
}

export async function Getdatapie(type:any,startdate:any) { 
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.Production_KanbanServer',
    'GetdatapieByType',
    {
      type,
      startdate
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetdatapieByType)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as CutDetailData[];
    }

    return result;
  }
}

export async function Getdatatable(type:any,startdate:any) { 
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.Production_KanbanServer',
    'GetdatatableByType',
    {
      type,
      startdate
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetdatatableByType)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as CutDetailData[];
    }

    return result;
  }
}

export async function GetCutpagecount(type:any,startdate:any) {
  const result: PagecountData = { pagecount: 0, errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.Production_KanbanServer',
    'GetCutpagecount',
    {
      type,
      startdate
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetCutpagecount)`);
  } else {
    if (data.RetData !== '') {
      result.pagecount = JSON.parse(data.RetData);
    }

    return result;
  }
}

export async function GetTechnologydatapie(startdate:any) { 
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.Production_KanbanServer',
    'GetTechnologydatapie',
    {
      startdate
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetTechnologydatapie)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as CutDetailData[];
    }

    return result;
  }
}

export async function GetTechnologydatatable(startdate:any) { 
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.Production_KanbanServer',
    'GetTechnologydatatable',
    {
      startdate
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetTechnologydatatable)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as CutDetailData[];
    }

    return result;
  }
}

export async function GetTechnologyDetailtList(pageindex:any,startdate:any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.Production_KanbanServer',
    'GetTechnologyDetailtList',
    {
      pageindex,
      startdate
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetTechnologyDetailtList)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as CutDetailData[];
    }

    return result;
  }
}

export async function GetTechnologypagecount(startdate:any) {
  const result: PagecountData = { pagecount: 0, errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_MESAPI',
    'KZ_MESAPI.Controllers.Production_KanbanServer',
    'GetTechnologypagecount',
    {
      startdate
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetTechnologypagecount)`);
  } else {
    if (data.RetData !== '') {
      result.pagecount = JSON.parse(data.RetData);
    }

    return result;
  }
}


