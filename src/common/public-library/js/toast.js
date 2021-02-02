/*
 * @Author:lyh
 * @Date: 2020-01-10 11:01:41
 * @Purpose: Toast轻提示
 */

let iconSuccess = "/static/oss/success.png";
let iconError = "/static/oss/error.png";

export default (title = "未知信息", type = "none", mask = false) => {
	uni.showToast({
		title,
		icon: "none",
		image: type == "success" ? iconSuccess : type == "error" ? iconError : "",
		mask,
		duration: 2500,
	});

};
