function getUrlParams(url: string): any[] {
  return url
    .slice(url.indexOf('?') + 1)
    .split('&')
    .map((param) => param.split('='))
    .map(([key, value]) => ({
      key,
      value,
    }));
}

function getUrlParam(url: string, key: string): string {
  return getUrlParams(url).find((el) => el.key === key)?.value;
}

// 公共-获取字符串长度
function getStringLen(fontSize: number, fontFamily: string, text: string) {
  let width = 0;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx != null) {
    ctx.font = `${fontSize}px ${fontFamily}`;
    const metrics = ctx.measureText(text);
    // width =
    //   Math.abs(metrics.actualBoundingBoxLeft) +
    //   Math.abs(metrics.actualBoundingBoxRight);
    width = Math.floor(metrics.width);
  }
  return width;
}

// 公共-压入空行
function pushEmptyRow(data: any, rowNum: number, columnNum: number) {
  if (data.length > rowNum) {
    return;
  }
  const emptyRow = [];
  for (let j = 0; j < columnNum; j += 1) {
    emptyRow.push('');
  }
  const len = rowNum - data.length;
  for (let i = 0; i < len; i += 1) {
    data.push(emptyRow);
  }
}

// 公共-获取随机数
function getRandomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export { getUrlParams, getUrlParam, getStringLen, pushEmptyRow, getRandomNum };
