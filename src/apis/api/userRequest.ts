import axios from "axios";
import request from "../https";

// 註冊帳號
export const apiPostRegister = (params :any) => request("post", "/User/Register", params);

// 取得密碼驗證
export const apiPostLoginResult = (params: any) => request("post", "/User/login", params);

// 忘記密碼
export const apiPostForgetPwd = (params: any) => request("post", "/User/forgetPwd", params);

// 重置密碼
export const apiPutResetPwd = (params: any) => request("put", "/User/changePwdWithToken", params);

//取得使用者資訊
export const apiGetUserProfile = (params: any) => request("get", "/User/getUserProfile", params);

// 取得所有使用者
export const apiGetAllUser = () => request("get", "/User/getAllUser");

// 取得活躍使用者
export const apiGetActiveUser = () => request("get", "/User/getActiveUser");

//取得活動資訊
export const apiGetActivity = () => request("get", "/Event/getSpecialEvent");

//新建活動
export const apiSaveEventData = (params: any) => request("post", "/Event/createEvent", params);

//檔案上傳
export const apiDataUpload = () => request("post", "/Event/dataUpload");

//更新JWT token
export const apiGetRefreshToken = () => request("get", "/Security/refreshJWT");

// 取得單筆活動
export const apiGetEvent = (params: any) => request("get", "/Event/getEvent/" + params);

// 取得活動附件
export const apiGetEventAppendix = (params: any) => request("get", "/Event/getEventAppendix/" + params);
