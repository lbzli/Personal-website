<template>
	<div class="table-box">
		<div class="card table">
			<!-- 表格头部 操作按钮 -->
			<div class="table-header">
				<div class="header-button-lf"></div>
				<div class="header-button-ri">
					<el-button ref="buttonRef" @click="dialogFormVisible = true">创建</el-button>
				</div>
			</div>

			<el-table :data="tableData.data" border style="width: 100%">
				<el-table-column prop="id" label="供应商ID" />
				<el-table-column prop="name" label="供应商名称" />
				<el-table-column prop="contacts" label="对接人" />
				<el-table-column prop="contact_details" label="联系方式" />
				<el-table-column label="操作">
					<template #default="scope">
						<el-button link type="primary" size="small" @click="editData(scope.$index)">编辑</el-button>
						<el-button link type="primary" size="small" @click="deleteData(scope.$index)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination background layout="prev, pager, next" :total="total" :page-size="10" @current-change="changePage" />

			<el-dialog v-model="dialogFormVisible" title="Shipping address" width="30%">
				<SupplierFormVue ref="formRef" />
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="cancel">Cancel</el-button>
						<el-button type="primary" @click="confirm"> Confirm </el-button>
					</span>
				</template>
			</el-dialog>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import SupplierFormVue from "./formComponent/supplierForm.vue";
import { getSupplierList, addSupplierInfo, updateSupplierInfo, deleteSupplierInfo } from "./service";

const dialogFormVisible = ref(false);
const isEdit = ref("");
const formRef = ref();
const tableData = reactive({
	data: []
});
const total = ref(0);
const currentPage = ref(1);

const cancel = () => {
	formRef.value?.setData?.({});
	dialogFormVisible.value = false;
};

const confirm = () => {
	formRef.value.getFormInstant().validate((valid, fields) => {
		if (valid) {
			if (isEdit.value !== "") {
				const result = formRef.value?.getData?.();

				updateSupplierInfo({
					...tableData.data[isEdit.value],
					...result
				}).then(() => {
					dialogFormVisible.value = false;
					isEdit.value = "";
					formRef.value?.setData?.({});
					ElMessage({
						message: "修改成功",
						type: "success"
					});
					getSupplierListData();
				});
			} else {
				const result = formRef.value?.getData?.();

				addSupplierInfo(result).then(() => {
					formRef.value?.setData?.({});
					dialogFormVisible.value = false;
					ElMessage({
						message: "提交成功",
						type: "success"
					});
					getSupplierListData();
				});
			}
		} else {
			console.log("error submit!", fields);
		}
	});
};

const editData = index => {
	isEdit.value = index;
	const fillingData = tableData.data[index];
	dialogFormVisible.value = true;
	nextTick(() => {
		formRef.value?.setData?.(fillingData);
	});
};

const deleteData = index => {
	ElMessageBox.alert("确认删除？", "提示", {
		confirmButtonText: "OK",
		callback: () => {
			deleteSupplierInfo(tableData.data[index].id).then(() => {
				ElMessage.success("删除成功");
				getSupplierListData();
			});
		}
	});
};

const getSupplierListData = () => {
	getSupplierList({
		pageSize: 10,
		page: currentPage.value
	}).then(data => {
		tableData.data = data.data.data;
		total.value = data.data.total;
	});
};

const changePage = page => {
	currentPage.value = page;
	getSupplierListData();
};

// 页面初始化
onMounted(() => {
	getSupplierListData();
});
</script>

<style lang="scss" scoped></style>
