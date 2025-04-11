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



export async function GetTodayInOutRecord(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_chemma_KanBanServer',
    'GetTodayInOutRecord',
    {
      org_id: param.org_id,
      WAREHOUSE_CODE: param.WAREHOUSE_CODE.split('|')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetTodayInOutRecord)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetstockRecord(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_chemma_KanBanServer',
    'GetstockRecord',
    {
      org_id: param.org_id,
      WAREHOUSE_CODE: param.WAREHOUSE_CODE.split('|')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetstockRecord)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetWarningData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_chemma_KanBanServer',
    'GetWarningData',
    {
      org_id: param.org_id,
      WAREHOUSE_CODE: param.WAREHOUSE_CODE.split('|')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetWarningData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetDayInOutSum(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_chemma_KanBanServer',
    'GetDayInOutSum',
    {
      org_id: param.org_id,
      WAREHOUSE_CODE: param.WAREHOUSE_CODE.split('|')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetDayInOutSum)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetMonthInOutSum(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_chemma_KanBanServer',
    'GetMonthInOutSum',
    {
      org_id: param.org_id,
      WAREHOUSE_CODE: param.WAREHOUSE_CODE.split('|')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetMonthInOutSum)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetStockSum(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_chemma_KanBanServer',
    'GetStockSum',
    {
      org_id: param.org_id,
      WAREHOUSE_CODE: param.WAREHOUSE_CODE.split('|')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetStockSum)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetDailyInOutSumData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_chemma_KanBanServer',
    'GetDailyInOutSumData',
    {
      org_id: param.org_id,
      WAREHOUSE_CODE: param.WAREHOUSE_CODE.split('|')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetDailyInOutSumData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetStocklist(param: any) {
  if (param.org_id == null) {
    param.org_id = '';
  }
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_BottomReceiptServer',
    'GetWarehouseList_ByOrg',
    {
      vOrgId: param.org_id,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetWarehouseList_ByOrg)`);
  } else {
    result.list = JSON.parse(data.RetData) as any;
    return result;
  }
}

export async function queryReportTargetRate(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_BottomDefectsServer',
    'queryReportTargetRate',
    {
      org_id: param.org_id,
      shift_no: param.SHIFT_NO === '00'?'':param.SHIFT_NO,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(queryReportTargetRate)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function queryReportOtherData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_BottomDefectsServer',
    'queryReportOtherData',
    {
      org_id: param.org_id,
      shift_no: param.SHIFT_NO === '00'?'':param.SHIFT_NO,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(queryReportOtherData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function queryReportMoldRate(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_BottomDefectsServer',
    'queryReportMoldRate',
    {
      org_id: param.org_id,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(queryReportMoldRate)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function queryReportList(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_BottomDefectsServer',
    'queryReportList',
    {
      org_id: param.org_id,
      shift_no: param.SHIFT_NO === '00'?'':param.SHIFT_NO,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(queryReportList)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function queryMoldList(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_BottomDefectsServer',
    'queryMoldList',
    {
      org_id: param.org_id,
      shift_no: param.SHIFT_NO === '00'?'':param.SHIFT_NO,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(queryMoldList)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function queryReportDownHot(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_BottomDefectsServer',
    'queryReportDownHot',
    {
      org_id: param.org_id,
      shift_no: param.SHIFT_NO === '00'?'':param.SHIFT_NO,
      meter_no: param.meter_no,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(queryReportDownHot)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function queryReportDownMold(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_BottomDefectsServer',
    'queryReportDownMold',
    {
      org_id: param.org_id,
      mold_no:param.mold_no,
      shift_no: param.SHIFT_NO_MOLD === '00'?'':param.SHIFT_NO_MOLD,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(queryReportDownMold)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetMonthPickData(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_chemma_KanBanServer',
    'GetMonthPickData',
    {
      org_id: param.org_id,
      WAREHOUSE_CODE: param.WAREHOUSE_CODE.split('|')[0],
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetMonthPickData)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetTodayCapacity(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_chemma_KanBanServer',
    'GetTodayCapacity',
    {
      org_id: param.org_id,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetTodayCapacity)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetTodayTotalCapacity(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_chemma_KanBanServer',
    'GetTodayTotalCapacity',
    {
      org_id: param.org_id,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetTodayTotalCapacity)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetTodayCapacityTOP10(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_chemma_KanBanServer',
    'GetTodayCapacityTOP10',
    {
      org_id: param.org_id,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetTodayCapacityTOP10)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}

export async function GetExpiredOrder(param: any) {
  const result: PolicyListRes = { list: [], errordate: '' };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_chemma_KanBanServer',
    'GetExpiredOrder',
    {
      org_id: param.org_id,
    }
  );
  if (!data.IsSuccess) {
    result.errordate = data.ErrMsg;
    console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetExpiredOrder)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}