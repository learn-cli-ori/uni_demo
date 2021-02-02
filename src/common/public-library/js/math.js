/*
 * @Author:lyh
 * @Date: 2020-01-03 17:03:48
 * @Purpose: 数学类
 */

/**
 * @method toPercent 转换成百分比数值
 * @param {Number} a 除数
 * @param {Number} b 被除数
 * @param {Number} retain 保留多少位小数
 * @return {Number} 百分比数字
 */
export let toPercent = (a = 0, b = 0, retain = 2) => {
  return Number(((a / b) * 100 || 0).toFixed(retain));
};

/**
 * @method smallToBig 金额小写转大写
 * @param {Number} n 小写数字
 * @return {String} 大写数字
 */
export let smallToBig = (n) => {
  let fraction = ["角", "分"];
  let digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  let unit = [
    ["元", "万", "亿"],
    ["", "拾", "佰", "仟"],
  ];
  let head = n < 0 ? "欠" : "";
  n = Math.abs(n);

  let s = "";

  for (let i = 0; i < fraction.length; i++) {
    s += (
      digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
    ).replace(/零./, "");
  }
  s = s || "整";
  n = Math.floor(n);

  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = "";
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, "元")
      .replace(/(零.)+/g, "零")
      .replace(/^整$/, "零元整")
  );
};

/**
 * @method numToChinese 小写数字转中文数字
 * @param {Number} num 小写数字
 */
export let numToChinese = (num) => {
  let isMinus = false;
  if (num[0] == "-") {
    // 负数
    num = num.split("-")[1];
    isMinus = true;
  }
  if (!/^\d*(\.\d*)?$/.test(num)) {
    return false;
  }
  let AA = new Array(
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九"
  );
  let BB = new Array("", "十", "百", "千", "万", "亿", "点", "");
  let a = ("" + num).replace(/(^0*)/g, "").split("."),
    k = 0,
    re = "";
  for (let i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re;
        break;
      case 4:
        if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
          re = BB[4] + re;
        break;
      case 8:
        re = BB[5] + re;
        BB[7] = BB[5];
        k = 0;
        break;
    }
    if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
      re = AA[0] + re;
    if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
    k++;
  }
  if (a.length > 1) {
    //加上小数部分(如果有小数部分)
    re += BB[6];
    for (let i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
  }
  if (isMinus) re = `负${re}`;
  return re;
};
