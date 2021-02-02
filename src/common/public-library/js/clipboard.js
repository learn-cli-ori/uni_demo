/*
 * @Author:lyh
 * @Date: 2020-01-07 11:09:21
 * @Purpose: 设置剪贴板内容
 */

import toast from "./toast";

/**
 * @method setClipboardData 设置剪贴板内容
 * @param {String} content 内容
 */
export let setClipboardData = (content) => {
  if (!content) return toast("内容不能为空");
  if (typeof content != "string") return toast("只支持字符串类型");

  return new Promise((resolve, reject) => {
    if (typeof document == "undefined") {
      uni.setClipboardData({
        data: content,
        success: (res) => {
          resolve();
          toast("已复制");
        },
        fail: (err) => {
          reject();
          toast("复制失败");
        },
      });
    } else {
      let input = document.createElement("input");

      input.setAttribute("readonly", "readonly");
      input.setAttribute("value", content);
      input.style.cssText = `position: fixed; top: -200vh; left: -200vw; opacity: 0;`;

      document.body.appendChild(input);

      input.select();
      input.setSelectionRange(0, 9999);

      if (document.execCommand("copy")) {
        document.execCommand("copy");
        resolve();
        toast("已复制");
      } else {
        reject();
        toast("复制失败");
      }
    }
  });
};

/**
 * @method getClipboardData 获取剪贴板内容
 * @return {String} 内容
 */
export let getClipboardData = () => {
  return new Promise((resolve, reject) => {
    if (typeof document == "undefined") {
      uni.getClipboardData({
        data: content,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        },
      });
    } else {
      toast("获取失败");
      reject();
    }
  });
};
