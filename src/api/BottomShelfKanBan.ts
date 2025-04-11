import { scmpost, ResultParameter } from '@/api/scmapi';

export interface PolicyListRes {
    list: any[];
    errordate: string;
  }
export async function QueryAllShelf(param: any) {
    const result: PolicyListRes = { list: [], errordate: '' };
    const data: ResultParameter = await scmpost(
      'KZ_WMSAPI',
      'KZ_WMSAPI.Controllers.F_WMS_BottomDefectsServer',
      'QueryAllShelf',
      {}
    );
    if (!data.IsSuccess) {
      result.errordate = data.ErrMsg;
      console.log(data.ErrMsg);
      throw new Error(`${data.ErrMsg}(QueryAllShelf)`);
    } else {
      if (data.RetData !== '') {
        result.list = JSON.parse(data.RetData) as any;
      }
  
      return result;
    }
  }