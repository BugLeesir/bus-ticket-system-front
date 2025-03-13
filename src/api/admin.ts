import { http } from "@/utils/http";

export type Admin = {
  id: number;
  username: string;
  email: string;
  phone: string;
  status: number;
};

/** 获取管理员列表 */
export const getAdmins = () => {
  return http.request<{ success: boolean; data: Admin[] }>("get", "/admin");
};

/** 添加管理员 */
export const addAdmin = (data: Admin) => {
  return http.request<{ success: boolean }>("post", "/admin", { data });
};

/** 更新管理员 */
export const updateAdmin = (data: Admin) => {
  return http.request<{ success: boolean }>("put", `/admin/${data.id}`, {
    data
  });
};

/** 删除管理员 */
export const deleteAdmin = (id: number) => {
  return http.request<{ success: boolean }>("delete", `/admin/${id}`);
};
