import { http } from "@/utils/http";

export type Member = {
  id: number;
  username: string;
  email: string;
  phone: string;
  status: number;
};

/** 获取会员列表 */
export const getMembers = () => {
  return http.request<{ success: boolean; data: Member[] }>("get", "/member");
};

/** 添加会员 */
export const addMember = (data: Member) => {
  return http.request<{ success: boolean }>("post", "/member", { data });
};

/** 更新会员 */
export const updateMember = (data: Member) => {
  return http.request<{ success: boolean }>("put", `/member/${data.id}`, {
    data
  });
};

/** 删除会员 */
export const deleteMember = (id: number) => {
  return http.request<{ success: boolean }>("delete", `/member/${id}`);
};
