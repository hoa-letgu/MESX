
import { scmpost, ResultParameter } from '@/api/scmapi';

export interface ResponseResult {
    status: boolean;
    data: any;
    msg: string;
}
/*
 * 日志接口
 */
export async function InsertLog(param: any) {
    const result: ResponseResult = { data: [], msg: '', status: true };
    const data: ResultParameter = await scmpost(
        'SJ_KanBanAPI',
        'SJ_KanBanAPI.Common',
        'InsertReportLog',
        param
    );
    result.status = data.IsSuccess;
}

/*
 * 市场反馈接口
 */
export async function GetContent(param: any) {
    const result: ResponseResult = { data: [], msg: '', status: true };
    const data: ResultParameter = await scmpost(
        'SJeMES_IQC',
        'SJeMES_IQC.Marketfeedback',
        'Kanban_MainGetList',
        param
    );
    result.status = data.IsSuccess;
    if (!data.IsSuccess) {
        result.msg = data.ErrMsg;

    } else {
        result.data = JSON.parse(data.RetData) as any;
    }
    return result;
}

export async function GetYearReturn(param: any) {
    const result: ResponseResult = { data: [], msg: '', status: true };
    const data: ResultParameter = await scmpost(
        'SJeMES_IQC',
        'SJeMES_IQC.Marketfeedback',
        'Kanban_YearGetList',
        param
    );
    result.status = data.IsSuccess;
    if (!data.IsSuccess) {
        result.msg = data.ErrMsg;

    } else {
        result.data = JSON.parse(data.RetData) as any;
    }
    return result;
}


export async function GetDetailContent(param: any) {
    const result: ResponseResult = { data: [], msg: '', status: true };
    const data: ResultParameter = await scmpost(
        'SJeMES_IQC',
        'SJeMES_IQC.Marketfeedback',
        'Kanban_ReturnDetail',
        param
    );
    result.status = data.IsSuccess;
    if (!data.IsSuccess) {
        result.msg = data.ErrMsg;

    } else {
        result.data = JSON.parse(data.RetData) as any;
    }
    return result;
}

export async function getOptime() {
    const dataMain = {
        reportName: "aqlAnalysis"
    }
    const result: ResponseResult = { data: '', msg: '', status: true };
    const data: ResultParameter = await scmpost(
        'SJ_KanBanAPI',
        'SJ_KanBanAPI.WholeLife',
        'GetLastUsedTime',
        dataMain
    );
    result.status = data.IsSuccess;
    if (!data.IsSuccess) {
        result.msg = data.ErrMsg;

    } else {

        result.data = data.RetData
    }
    return result;
}

/*
*AQL分析接口
*/

export async function GetLastOpenTime(reportName: any) {
    const dataMain = {
        reportName
    }

    const result: ResponseResult = { data: '', msg: '', status: true };
    const data: ResultParameter = await scmpost(
        'SJ_KanBanAPI',
        'SJ_KanBanAPI.WholeLife',
        'GetLastUsedTime',
        dataMain
    );
    result.status = data.IsSuccess;
    if (!data.IsSuccess) {
        result.msg = data.ErrMsg;

    } else {

        result.data = data.RetData1
    }
    return result;
}

export async function getDataDt(param: any, apiName: any) {
    const data: ResultParameter = await scmpost(
        'SJ_BASEAPI',
        'SJ_BASEAPI.BASE',
        apiName,
        param
    );
    const result = data
    return result;
}

/*
*Podd验货分析
*/
export async function GetPODDInfo(param: any) {
    const result: ResponseResult = { data: '', msg: '', status: true };
    const data: ResultParameter = await scmpost(
        'SJ_KanBanAPI',
        'SJ_KanBanAPI.WholeLife',
        'GetPODDInfo',
        param
    );
    result.status = data.IsSuccess;
    if (!data.IsSuccess) {
        result.msg = data.ErrMsg;

    } else {

        result.data = data
    }
    return result;
}
/*
*验货总览
*/
export async function GetAQLInspectionOverview(param: any) {
    const result: ResponseResult = { data: '', msg: '', status: true };
    const data: ResultParameter = await scmpost(
        'SJ_KanBanAPI',
        'SJ_KanBanAPI.WholeLife',
        'GetAQLInspectionOverview',
        param
    );
    result.status = data.IsSuccess;
    if (!data.IsSuccess) {
        result.msg = data.ErrMsg;

    } else {

        result.data = data
    }
    return result;
}
/*
*月度总览
*/
export async function GetMonthInspectionAnalysis(param: any) {
    const result: ResponseResult = { data: '', msg: '', status: true };
    const data: ResultParameter = await scmpost(
        'SJ_KanBanAPI',
        'SJ_KanBanAPI.WholeLife',
        'GetMonthInspectionAnalysis',
        param
    );

    result.status = data.IsSuccess;
    if (!data.IsSuccess) {
        result.msg = data.ErrMsg;

    } else {

        result.data = data
    }
    return result;
}
/*
*年度验货分析
*/
export async function GetYearInspectionAnalysis(param: any) {
    const result: ResponseResult = { data: '', msg: '', status: true };
    const data: ResultParameter = await scmpost(
        'SJ_KanBanAPI',
        'SJ_KanBanAPI.WholeLife',
        'GetYearInspectionAnalysis',
        param
    );

    result.status = data.IsSuccess;
    if (!data.IsSuccess) {
        result.msg = data.ErrMsg;

    } else {

        result.data = data
    }
    return result;
}
/*
*验货员分析
*/
export async function GetInspectorAnalysis(param: any) {
    const result: ResponseResult = { data: '', msg: '', status: true };
    const data: ResultParameter = await scmpost(
        'SJ_KanBanAPI',
        'SJ_KanBanAPI.WholeLife',
        'GetInspectorAnalysis',
        param
    );

    result.status = data.IsSuccess;
    if (!data.IsSuccess) {
        result.msg = data.ErrMsg;

    } else {

        result.data = data
    }
    return result;
}
/*
*出货国家分析
*/
export async function GetDescountryAnalysis(param: any) {
    const result: ResponseResult = { data: '', msg: '', status: true };
    const data: ResultParameter = await scmpost(
        'SJ_KanBanAPI',
        'SJ_KanBanAPI.WholeLife',
        'GetDescountryAnalysis',
        param
    );

    result.status = data.IsSuccess;
    if (!data.IsSuccess) {
        result.msg = data.ErrMsg;

    } else {

        result.data = data
    }
    return result;
}
/*
*厂区验货分析
*/
export async function GetPlantAnalysis(param: any) {
    const result: ResponseResult = { data: '', msg: '', status: true };
    const data: ResultParameter = await scmpost(
        'SJ_KanBanAPI',
        'SJ_KanBanAPI.WholeLife',
        'GetPlantAnalysis',
        param
    );

    result.status = data.IsSuccess;
    if (!data.IsSuccess) {
        result.msg = data.ErrMsg;

    } else {

        result.data = data
    }
    return result;
}

/*
*前十问题点
*/
export async function GetTop10Issues(param: any) {
    const result: ResponseResult = { data: '', msg: '', status: true };
    const data: ResultParameter = await scmpost(
        'SJ_KanBanAPI',
        'SJ_KanBanAPI.WholeLife',
        'GetTop10Issues',
        param
    );

    result.status = data.IsSuccess;
    if (!data.IsSuccess) {
        result.msg = data.ErrMsg;

    } else {

        result.data = data
    }
    return result;
}

/*
*本月订单信息
*/
export async function GetCrrentMonthOrderInfo(param: any) {
    const result: ResponseResult = { data: '', msg: '', status: true };
    const data: ResultParameter = await scmpost(
        'SJ_KanBanAPI',
        'SJ_KanBanAPI.WholeLife',
        'GetCrrentMonthOrderInfo',
        param
    );

    result.status = data.IsSuccess;
    if (!data.IsSuccess) {
        result.msg = data.ErrMsg;

    } else {

        result.data = data
    }
    return result;
}

/*
*本月订单详细信息
*/
export async function GetCrrentMonthOrderDetail(param: any) {
    const result: ResponseResult = { data: '', msg: '', status: true };
    const data: ResultParameter = await scmpost(
        'SJ_KanBanAPI',
        'SJ_KanBanAPI.WholeLife',
        'GetCrrentMonthOrderDetail',
        param
    );

    result.status = data.IsSuccess;
    if (!data.IsSuccess) {
        result.msg = data.ErrMsg;

    } else {

        result.data = data
    }
    return result;
}

