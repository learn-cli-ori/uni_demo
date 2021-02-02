/*
 * @Author:lyh
 * @Date: 2020-01-09 10:54:37
 * @Purpose: Request方法二次封装
 */


import Toast from "./toast";
import Loading from "./loading";

let currentRequestCount = 0;
let defaultContentType = "application/x-www-form-urlencoded; charset=UTF-8";

export default (config = {}) => {
	let {
		remote = "", // 域名，H5端传空（走代理）、小程序端要传、多端则用# ifdef H5 / MP-WEIXIN进行判断
			successCode = 200, // // 成功状态码，默认为200
			showGlobalLoading = true, // 是否显示loading
			showGlobalToast = true, // 是否显示toast
			showRequestConsole = false, // 是否显示请求信息
			defaultTimeout = 15000, // 接口请求超时时间
			getExtraParams = () => {}, // 接口公共参数
			getExtraHeaders = () => {}, // 接口公共请求头
			start = () => {}, // 开始回调
			finish = () => {}, // 结束回调
			success = () => {}, // 成功回调
			fail = () => {}, // 失败回调
	} = config;

	// 封装增删改查方法
	let request = new Object();
	["post", "del", "put", "get"].forEach((method) => {
		request[method] = (url, params = {}, extra = {}) =>
			new Promise((resolve, reject) => {
				let prefix = url.includes("http") ? "" : remote;

				let {
					title = "", // 加载文字
						showLoading = true, // 是否显示单条接口的loading
						showToast = true, // 是否显示单条接口的toast
						ignoreAuth = false, // 是否忽略授权（可在finish或者success回调中拿到，只是一个标识，方便在回调中处理单条接口的忽略授权问题）
						timeout = 0, // 单条接口的请求超时时间

						// 请求头
						headers = {
							"content-type": defaultContentType,
						},
				} = extra;

				if (!showGlobalLoading) showLoading = false;
				if (!showGlobalToast) showToast = false;
				if (timeout != 0) defaultTimeout = timeout;

				let currentLoading = null;

				// 开始发送请求
				if (showLoading) {
					currentRequestCount += 1;
					currentLoading = Loading.show(title);
				}

				// 添加额外参数
				let extraParams = getExtraParams(extra) || {};

				extraParams &&
					Object.keys(extraParams).map((key) => {
						if (!params.hasOwnProperty(key)) {
							params[key] = extraParams[key];
						}
					});

				// 开始请求回调
				start(params);

				// 输出请求信息
				if (showRequestConsole) {
					console.log("--------------------");
					console.log("请求地址：", prefix + url);
					console.log("请求参数：", params);
				}

				// 添加额外请求头
				let extraHeaders = getExtraHeaders(extra) || {};


				uni
					.request({
						url: prefix + url,
						header: {
							...headers,
							...extraHeaders,
						},
						data: params,
						method,
						timeout: defaultTimeout,
					})
					.then((chunk) => {
						let [err, res] = chunk;
						if (res) successCallback(res);
						else errorCallback(err);
					});



				function successCallback(res) {
					// 输出请求信息
					if (showRequestConsole) {
						console.log("返回数据：", res);
						console.log("--------------------");
					}

					// 清空全局loading
					if (currentRequestCount > 0) currentRequestCount -= 1;
					if (currentRequestCount <= 0) Loading.hide(currentLoading);

					// 添加额外字段
					let response = res.data;
					if (typeof response == "object") response.ignoreAuth = ignoreAuth;

					// 数据获取
					let code = "";
					let status = "";
					let message = "";
					let msg = "请求失败，请重试";

					let isLocationRequest =
						typeof response == "string" &&
						response.includes("renderReverse&&renderReverse");

					if (typeof response == "object") {
						code = response.code;
						status = response.status;
						message = response.message;
						msg = response.msg || "请求失败，请重试";
					} else if (isLocationRequest) {
						code = successCode;
					}

					code = code || status;
					message = message || msg;

					finish(response); // 请求结束回调

					// 请求成功
					if (code == successCode) {
						success(response); // 请求成功回调
						if (!isLocationRequest) response.code = 200;
					}

					// 请求失败
					if (code != successCode) {
						response.code = code;
						response.message = message;
						fail(response); // 请求失败回调

						if (showToast && !ignoreAuth) {
							Toast(message);
						}
					}

					resolve(response);
				}

				function errorCallback(err) {
					finish(err); // 请求结束回调
					fail(err); // 请求失败回调

					if (currentRequestCount > 0) currentRequestCount -= 1;
					showToast && Toast("请求失败，请重试");
					reject(err);
				}
			});
	});

	return request;
};
