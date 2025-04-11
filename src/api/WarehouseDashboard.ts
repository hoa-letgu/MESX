import { scmpost, ResultParameter } from '@/api/scmapi';
import { isNullOrEmptyStr } from '@/utils/is';

export interface ResponseResult {
  status: boolean;
  data: any;
  msg: string;
}

// 查询工厂
export async function LoadOrgId() {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_StoreHouseKanban',
    'LoadOrgId',
    {}
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询仓库信息
export async function GetWarehouseList(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_StoreHouseKanban',
    'GetWarehouseListByOrg',
    {
      vOrgId: param.orgId,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询每日异动库存信息
export async function GetDayChangeStock(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_StoreHouseKanban',
    'EveryDayChangeStock',
    {
      orgid: param.orgId,
      warehouse_code: param.wareHouseCode,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询每日异动库存明细信息
export async function GetDayChangeStockDetail(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_StoreHouseKanban',
    'EveryDayChangeStockDetail',
    {
      orgid: param.orgId,
      warehouse_code: param.wareHouseCode,
      c_type: param.storeType,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询库存类别信息
export async function GetStoreType(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_StoreHouseKanban',
    'GetStoreType',
    {
      orgid: param.orgId,
      warehouse_code: param.wareHouseCode,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询近一周领料需求信息
export async function GetItemNeedWeek(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_StoreHouseKanban',
    'ItemNeedWeek',
    {
      orgid: param.orgId,
      warehouse_code: param.wareHouseCode,
      c_type: param.storeType,
      diff: param.diff,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询近一月领料需求信息
export async function GetItemNeedMonth(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_StoreHouseKanban',
    'ItemNeedMonth',
    {
      orgid: param.orgId,
      warehouse_code: param.wareHouseCode,
      c_type: param.storeType,
      diff: param.diff,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询近三月领料需求信息
export async function GetItemNeedThreeMonth(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_StoreHouseKanban',
    'ItemNeedThreeMonth',
    {
      orgid: param.orgId,
      warehouse_code: param.wareHouseCode,
      c_type: param.storeType,
      diff: param.diff,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询近一周领料需求明细信息
export async function GetItemNeedDetailWeek(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_StoreHouseKanban',
    'ItemNeedDetailWeek',
    {
      orgid: param.orgId,
      warehouse_code: param.wareHouseCode,
      item_no: param.itemNo,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询近一月领料需求明细信息
export async function GetItemNeedDetailMonth(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_StoreHouseKanban',
    'ItemNeedDetailMonth',
    {
      orgid: param.orgId,
      warehouse_code: param.wareHouseCode,
      item_no: param.itemNo,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询近三月领料需求明细信息
export async function GetItemNeedDetailThreeMonth(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_StoreHouseKanban',
    'ItemNeedDetailThreeMonth',
    {
      orgid: param.orgId,
      warehouse_code: param.wareHouseCode,
      item_no: param.itemNo,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询销售单明细信息
export async function GetOrdersByPickNo(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_StoreHouseKanban',
    'GetOrdersByPickNo',
    {
      orgid: param.orgId,
      warehouse_code: param.wareHouseCode,
      item_no: param.itemNo,
      pick_no: param.pickNo,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询材料库存分析信息
export async function GetStoreAnalysis(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_StoreHouseKanban',
    'Stoc_Qty_Analysis',
    {
      orgid: param.orgId,
      warehouse_code: param.wareHouseCode,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询过期材料库存分类信息
export async function GetExpireStocItem(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_StoreHouseKanban',
    'Expire_Stoc_Item',
    {
      orgid: param.orgId,
      warehouse_code: param.wareHouseCode,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询过期材料明细信息
export async function GetExpireStocDetail(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_StoreHouseKanban',
    'Expire_Stoc_ItemDetail',
    {
      orgid: param.orgId,
      warehouse_code: param.wareHouseCode,
      page: param.page,
      c_type: param.storeType,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = JSON.parse(data.RetData) as any;
  }
  return result;
}

// 查询库存储位明细
export async function GetStocLocationDetail(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.RPT_WMS_Stock_DetailServer',
    'Stoc_LocationBindList',
    {
      org_id: param.orgId,
      stoc_no: param.wareHouseCode,
      item_no: param.itemNo,
      batch_no: param.batchNo,
      location_no: param.locationNo,
      IsIsStocQty: param.isStocQty,
      lastDate: param.lastDate,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData) ? [] : (JSON.parse(data.RetData) as any);
  }
  return result;
}

// 查询储位列表
export async function LoadShelfList(param: any) {
  const result: ResponseResult = { data: [], msg: '', status: true };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.WMS_CommonAPI_Server',
    'LoadLocationByStocList',
    {
      org_id: param.orgId,
      warehouse_code: param.wareHouseCode,
    }
  );
  result.status = data.IsSuccess;
  if (!data.IsSuccess) {
    result.msg = data.ErrMsg;
    // eslint-disable-next-line no-console
    console.log(data.ErrMsg);
  } else {
    result.data = isNullOrEmptyStr(data.RetData) ? [] : (JSON.parse(data.RetData) as any);
  }
  return result;
}
