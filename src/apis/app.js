import request from '@/common/js/request';
import reConfig from "@/reConfig/index";

// 获取OpenId
export const getUserOpenId = (code, avatar, nickName) => request.get('/user/login', {
	code,
	avatar,
	nickName,
	appid: reConfig.appid,
	secret: reConfig.secret
});

// 获取用户信息
export const getUserInfo = (params) => request.get('/user/getUserInfo', params);

// 保存用户信息
export const updateUserInfo = params => request.get('/user/updateUserInfo', params);

//上传图片
export const uploadImage = (params) =>
	request.post("/common/file/uploadImage", params, {
		headers: {
			"Content-Type": "multipart/form-data"
		},
	});

