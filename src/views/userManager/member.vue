<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getMembers,
  addMember,
  updateMember,
  deleteMember
} from "@/api/member"; // 假设你有这些API

const members = ref([]);
const loading = ref(false);
const dialogVisible = ref(false);
const isEdit = ref(false);
const currentMember = ref({
  id: null,
  username: "",
  email: "",
  phone: "",
  status: 0
});

const fetchMembers = async () => {
  loading.value = true;
  try {
    const response = await getMembers();
    members.value = response.data;
  } catch (error) {
    ElMessage.error("获取会员信息失败");
  } finally {
    loading.value = false;
  }
};

const handleAdd = () => {
  isEdit.value = false;
  currentMember.value = {
    id: null,
    username: "",
    email: "",
    phone: "",
    status: 0
  };
  dialogVisible.value = true;
};

const handleEdit = member => {
  isEdit.value = true;
  currentMember.value = { ...member };
  dialogVisible.value = true;
};

const handleDelete = id => {
  ElMessageBox.confirm("确定要删除该会员吗？", "提示", {
    type: "warning"
  }).then(async () => {
    try {
      await deleteMember(id);
      ElMessage.success("删除成功");
      fetchMembers();
    } catch (error) {
      ElMessage.error("删除失败");
    }
  });
};

const handleSave = async () => {
  try {
    if (isEdit.value) {
      await updateMember(currentMember.value);
      ElMessage.success("更新成功");
    } else {
      await addMember(currentMember.value);
      ElMessage.success("添加成功");
    }
    dialogVisible.value = false;
    fetchMembers();
  } catch (error) {
    ElMessage.error("操作失败");
  }
};

onMounted(() => {
  fetchMembers();
});
</script>

<template>
  <div>
    <el-button type="primary" @click="handleAdd">添加会员</el-button>
    <el-table v-loading="loading" :data="members" style="width: 100%">
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model:visible="dialogVisible" title="会员信息">
      <el-form :model="currentMember">
        <el-form-item label="用户名">
          <el-input v-model="currentMember.username" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="currentMember.email" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="currentMember.phone" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="currentMember.status">
            <el-option label="未激活" :value="0" />
            <el-option label="激活" :value="1" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
