//封装接口api
import request from "@/utils/request";

export const userLogService = ({ username, password }) =>
  request.post("/api/login", { username, password });

export const userRegService = ({ username, password, repassword }) =>
  request.post("/api/reg", { username, password, repassword });

export const userGetService = () => request.get("/my/userinfo");

export const userUPdataService = ({ id, nickname, email }) =>
  request.put("/my/userinfo", { id, nickname, email });

export const userUPdataAvatarService = (avatar) =>
  request.patch("/my/update/avatar", { avatar });

//更新用户密码
export const userUPdataPwdService = (data) =>
  request.patch("/my/updatepwd", data);
