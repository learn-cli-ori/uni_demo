/*
 * @Author:lyh
 * @Date: 2020-01-03 17:03:48
 * @Purpose: 工具类合集
 */
import Toast from "./toast";

const IS_UNI = typeof uni != "undefined";

/**
 * @method formatParams 将一段查询字符串格式化为JSON对象
 * @param {String} search 查询参数
 * @return {Object} JSON对象
 */
export let formatParams = (
  search = typeof location != "undefined"
    ? location.search || location.hash
    : ""
) => {
  let params = new Object();

  if (!search) return params;

  let str = search.includes("?") ? search.split("?")[1] : search;
  let strs = str.split("&");
  strs.map(
    (item) =>
      (params[item.split("=")[0]] = decodeURIComponent(item.split("=")[1]))
  );

  console.log("当前获取到的参数：", params);
  return params;
};

/**
 * @method throttle 函数节流
 * @param {Function} fn 需要执行的函数
 * @param {Number} interval 节流间隔
 */
export let throttle = (fn, interval = 1000) => {
  let run = true;

  return function() {
    if (!run) return;
    run = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      run = true;
    }, interval);
  };
};

/**
 * @method debounce 函数防抖
 * @param {Function} fn 需要执行的函数
 * @param {Number} interval 防抖间隔
 */
export let debounce = (fn, interval = 500) => {
  let timeout = null;

  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, interval);
  };
};

/**
 * @method backToTop 返回顶部
 * @param {Object} element 指定节点
 */
export let backToTop = (element = document) => {
  return new Promise((resolve) => {
    if (IS_UNI && element == document) {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 100,
      });

      setTimeout(() => {
        console.log("已滚动到顶部");
        resolve();
      }, 100);
    } else {
      let timer = setInterval(() => {
        let y = 0;

        if (element == document) {
          y = element.scrollingElement.scrollTop;
        } else {
          y = element.scrollTop;
        }

        if (y > 0) {
          if (element == document) {
            element.scrollingElement.scrollTop = y - y / 8;
          } else {
            element.scrollTop = y - y / 8;
          }
        } else {
          clearInterval(timer);
          console.log("已滚动到顶部");
          resolve();
        }
      }, 10);
    }
  });
};

/**
 * @method scrollToBottom 滚动到底部
 * @param {Object} element 指定节点
 */
export let scrollToBottom = (element = document) => {
  return new Promise((resolve) => {
    if (IS_UNI && element == document) {
      uni.pageScrollTo({
        scrollTop: 1000000,
        duration: 100,
      });

      setTimeout(() => {
        console.log("已滚动到底部");
        resolve();
      }, 100);
    } else {
      let lastY = 0;

      let timer = setInterval(() => {
        let y = 0;

        if (element == document) {
          y = element.scrollingElement.scrollTop;
        } else {
          y = element.scrollTop;
        }

        y = y == 0 ? 50 : y;

        if (y != lastY) {
          if (element == document) {
            element.scrollingElement.scrollTop = y + y / 8;
          } else {
            element.scrollTop = y + y / 8;
          }

          lastY = y;
        } else {
          clearInterval(timer);
          console.log("已滚动到底部");
          resolve();
        }
      }, 10);
    }
  });
};

/**
 * @method onReachBottom 触底事件
 * @param {Function} fn 需要执行的函数
 * @param {Object} element 指定节点
 */
export let onReachBottom = (fn, element) => {
  let isGlobal = typeof element == "undefined";

  let handel = throttle(() => {
    let doc = isGlobal ? document.documentElement : element;
    let scr = isGlobal ? document.scrollingElement : element;

    if (scr.scrollTop + doc.clientHeight >= doc.scrollHeight - 100) fn && fn();
  }, 300);

  // 持续监听
  if (isGlobal) {
    window.removeEventListener("scroll", handel);
    window.addEventListener("scroll", handel);
  } else {
    element.removeEventListener("scroll", handel);
    element.addEventListener("scroll", handel);
  }
};

/**
 * @method onPullDownRefresh 下拉刷新
 * @param {Object} params 参数
 */
export let onPullDownRefresh = (params) => {
  let { distance = 100, updated, success, cancel } = params;

  let startY = 0; // 开始高度
  let currentY = 0; // 当前高度
  let endY = 0; // 结束高度
  let diffY = 0; // 相差高度
  let maxDiff = distance; // 最大相差高度（相差高度大于这个值的时候，状态变成2）
  let status = 0; // 下拉状态。1下拉中，2下拉处于顶峰，3下拉成功，4下拉取消

  window.addEventListener("touchstart", (event) => {
    // 必须在页面最顶部时下拉才算，否则就是页面滚动
    if (document.scrollingElement.scrollTop != 0) return false;

    let touch = event.touches[0];
    startY = touch.pageY;
  });

  window.addEventListener("touchmove", (event) => {
    // 必须在页面最顶部时下拉才算，否则就是页面滚动
    if (document.scrollingElement.scrollTop != 0) return false;

    let touch = event.touches[0];
    currentY = touch.pageY;
    diffY = currentY - startY;

    if (diffY > 0) {
      console.log("下拉更新");
      setBodyTransform(diffY);
      status = 1;
      updated && updated();
    }

    if (diffY > maxDiff) {
      console.log("松开更新");
      setBodyTransform(maxDiff);
      status = 2;
    }
  });

  window.addEventListener("touchend", () => {
    // 必须在页面最顶部时下拉才算，否则就是页面滚动
    if (document.scrollingElement.scrollTop != 0) return false;

    endY = currentY;

    if (diffY > maxDiff) {
      console.log("更新中...");
      status = 3;
      success && success();
    } else {
      console.log("已取消");
      setBodyTransform(0, true);
      status = 4;
      cancel && cancel();
    }
  });

  function setBodyTransform(translateY, needAnimation) {
    document
      .querySelector("uni-page-body")
      .setAttribute(
        "style",
        needAnimation
          ? `transform: translateY(${translateY}px); transition: all 0.5s ease;`
          : `transform: translateY(${translateY}px);`
      );
  }
};

/**
 * @method URLToBase64 链接转Base64
 * @param {String} url 图片链接
 * @return {String} Base64地址
 */
export let URLToBase64 = (url) => {
  return new Promise((resolve, reject) => {
    try {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let img = new Image();

      img.crossOrigin = "Anonymous";
      img.onload = () => {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);

        let base64 = canvas.toDataURL("image/png");
        resolve(base64);
      };

      img.src = url;
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @method HexToRGB
 * @param {String} hex 16进制字符串
 * @return {String} RGB字符串
 */
export let HexToRGB = (hex, opacity) => {
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let color = hex.toLowerCase();

  // 正则检测
  if (reg.test(color)) {
    if (color.length === 4) {
      let colorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    let colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    return opacity
      ? `rgba(${colorChange.join(", ")}, ${opacity})`
      : `rgb(${colorChange.join(", ")})`;
  } else {
    return color;
  }
};

/**
 * @method RGBToHex
 * @param {String} rgb RGB字符串
 * @return {String} 16进制字符串
 */
export let RGBToHex = (rgb) => {
  let reg = /^(rgb|RGB)/;
  let color = rgb;

  // 正则检测
  if (reg.test(color)) {
    let strHex = "#";
    let colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    for (let i = 0; i < colorArr.length; i++) {
      let hex = Number(colorArr[i]).toString(16);
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    return strHex;
  } else {
    return String(color);
  }
};
