/*
 * @Author:lyh
 * @Date: 2020-01-09 11:06:13
 * @Purpose: 公共方法
 */

import initRequest from "./request";
import Toast from "./toast";
import Loading from "./loading";


let request = initRequest({
	remote: "":
});


/**
 * @method getLocationInfo 获取位置信息
 * @return {Object} 位置信息
 */
export let getLocationInfo = () => {
	return new Promise((resolve, reject) => {
		Loading.hide();
		let currentLoading = Loading.show();
		console.log("开始获取定位信息");

		uni.getLocation().then((chunk) => {
			let [err, res] = chunk;

			if (res) {
				let {
					latitude,
					longitude
				} = res;
				console.log("拿到定位信息：", res);
				uni.setStorageSync("location", res);

				// 根据经纬度换取城市信息
				console.log("开始获取位置信息");
				request
					.get(
						`https://api.map.baidu.com/geocoder/v2/?ak=wWYw0yCb8ntXmSgTxTx40vKR&callback=renderReverse&output=json&pois=1&location=${[
              latitude,
              longitude,
            ].join(",")}`, {}, {
							noPrefix: true,
							showToast: false,
							showLoading: false,
						}
					)
					.then((data) => {
						Loading.hide(currentLoading);

						if (data) {
							let res = {};
							let str = data.split("renderReverse&&renderReverse(")[1];

							res = JSON.parse(str.substring(0, str.length - 1));
							console.log("拿到位置信息：", res);
							resolve(res);
						}
					})
					.catch((err) => {
						Loading.hide(currentLoading);
						Toast("定位失败");
						console.log("未拿到位置信息：", err);
						reject(err);
					});
			} else {
				Loading.hide(currentLoading);
				Toast("定位失败");
				console.log("未拿到定位信息：", err);
				reject({
					isAuth: false
				});
			}
		});
	});
};

/**
 * @method chooesImage 选择图片
 * @param {String} params.action 上传地址
 * @param {Number} params.residue 每次最多上传的图片个数
 * @param {Boolean} params.unUpload 不上传到服务器，只返回本地路径
 * @param {Object} params.extraParams uni-app额外参数
 * @param {Object} params.extraRequestParams 上传额外请求参数
 * @param {Object} params.extraRequestHeaders 上传额外请求头
 * @return {Array} 接口结果数组
 */
export let chooseImage = ({
	action = "",
	residue = 1,
	unUpload = false,
	extraParams = {},
	extraRequestParams = {},
	extraRequestHeaders = {},
} = {}) => {
	return new Promise((resolve, reject) => {
		uni
			.chooseImage({
				...extraParams,
				count: residue,
			})
			.then((chunk) => {
				let [err, res] = chunk;

				if (res) {
					let paths = res.tempFilePaths;
					console.log("选中的文件信息：", paths);

					uni.showLoading({
						mask: true,
					});

					if (unUpload) {
						// 不上传
						let res = [];
						paths.map((item) => {
							res.push({
								code: 200,
								data: item,
								message: "操作成功",
							});
						});
						resolve(res);
						uni.hideLoading();
					} else {
						// 上传图片队列
						let tasks = paths.map((item) => {
							return uploadFile({
								action,
								filePath: item,
								extraRequestParams,
								extraRequestHeaders,
							});
						});

						Promise.all(tasks)
							.then((res) => {
								resolve(res);
								uni.hideLoading();
							})
							.catch((err) => {
								reject(err);
								Toast("上传失败，请重试");
							});
					}
				}
			});
	});
};

/**
 * @method chooesImage 选择视频
 * @param {String} params.action 上传地址
 * @param {Boolean} params.unUpload 不上传到服务器，只返回本地路径
 * @param {Object} params.extraParams uni-app额外参数
 * @param {Object} params.extraRequestParams 上传额外请求参数
 * @param {Object} params.extraRequestHeaders 上传额外请求头
 * @return {Object} 接口结果
 */
export let chooseVideo = ({
	action = "https://app.yatiku.com/tool/uploadFileOss",
	unUpload = false,
	extraParams = {},
	extraRequestParams = {},
	extraRequestHeaders = {},
} = {}) => {
	return new Promise((resolve, reject) => {
		uni.chooseVideo(extraParams).then((chunk) => {
			let [err, res] = chunk;

			if (res) {
				let paths = res.tempFilePath;
				console.log("选中的文件信息：", paths);

				uni.showLoading({
					mask: true,
				});

				// 不上传
				if (unUpload) {
					let res = [];
					paths.map((item) => {
						res.push({
							code: 200,
							data: item,
							message: "操作成功",
						});
					});
					resolve(res);
					uni.hideLoading();
				} else {
					uploadFile({
							action,
							filePath: paths,
							extraRequestParams,
							extraRequestHeaders,
						})
						.then((res) => {
							resolve(res);
							uni.hideLoading();
						})
						.catch((err) => {
							reject(err);
							Toast("上传失败，请重试");
						});
				}
			}
		});
	});
};

/**
 * @method uploadFile 上传文件到OSS
 * @param {Object} params 上传参数
 * @param {Object} params.extraRequestParams 上传额外请求参数
 * @param {Object} params.extraRequestHeaders 上传额外请求头
 * @return {Object} 接口结果
 */
export let uploadFile = ({
	action = "https://app.yatiku.com/tool/uploadFileOss",
	filePath = "",
	extraRequestParams = {},
	extraRequestHeaders = {},
}) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			mask: true,
		});

		uni
			.uploadFile({
				url: action,
				filePath: filePath,
				name: "file",
				formData: extraRequestParams,
				header: extraRequestHeaders,
			})
			.then((chunk) => {
				let [err, res] = chunk;

				if (res) {
					let data = JSON.parse(res.data);
					console.log("上传成功", data);
					resolve(data);
				} else {
					console.error(err);
					Toast("上传失败，请重试");
					reject(err);
				}
			});
	});
};

/**
 * @method previewImage 预览图片
 * @param {Object} params 参数
 */
export let previewImage = (params) => {
	let {
		images = [],
			index = 0,
			onClose = () => {},
			onChange = () => {},
	} = params;


	uni.previewImage({
		urls: images,
		current: index,
	});

};
