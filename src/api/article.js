//封装接口api
import request from "@/utils/request";

//文章分类
export const artGetChannelsService = () => request.get("/my/cate/list");
export const artDelChannelService = (id) =>
  request.delete("/my/cate/del", { params: { id } });
export const artEditChannelService = (data) =>
  request.put("/my/cate/info", data);
export const artAddChannelService = (data) =>
  request.post("/my/cate/add", data);

//分类
export const artGetListService = (params) =>
  request.get("/my/article/list", { params });
export const artpubLishService = (data) =>
  request.post("/my/article/add", data);

export const artGetDatailService = (id) =>
  request.get("/my/article/info", { params: { id } });

export const artEditService = (data) => request.put("/my/article/info", data);

export const artDelService = (id) =>
  request.delete("/my/article/info", { params: { id } });
