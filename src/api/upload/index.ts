import http from "@/api";

/**
 * @name 文件上传模块
 */
// * 图片上传
export const uploadImg = data => {
	return http.post(`/api/upload/`, { data, headers: { "Content-Type": "multipart/form-data" } });
};
