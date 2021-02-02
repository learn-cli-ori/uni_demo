/*
 * @Author:lyh
 * @Date: 2020-01-07 11:09:21
 * @Purpose: 获取设备信息
 */

let device = {};

if (typeof document != "undefined") {
  let ua = window.navigator.userAgent.toLowerCase();

  device = {
    isPC: !ua.match(/(iphone|ipod|android|ios|ipad)/),
    isMobile: !!ua.match(/(iphone|ipod|android|ios|ipad)/),
    isAndroid: ua.includes("android") || ua.includes("adr"),
    isIos: ua.includes("iphone") || ua.includes("ipad"),
    isWechat: ua.includes("micromessenger"),
    isWeibo: ua.includes("weibo"),
    isQQ: ua.includes("qq"),
    isFirefox: ua.includes("firefox"),
    isChrome: ua.includes("chrome"),
    isSafari: ua.includes("safari") && !ua.includes("chrome"),
    isIE: ua.includes("compatible") && ua.includes("msie")
  };

  console.log("当前设备信息：", device);
}

export default device;
