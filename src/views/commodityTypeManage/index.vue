<template>
	<div>
		<div class="card table">
			<!-- 表格头部 操作按钮 -->
			<div class="table-header">
				<div class="header-button-lf"></div>
				<div class="header-button-ri">
					<el-button ref="buttonRef" @click="dialogFormVisible = true">创建</el-button>
				</div>
			</div>

			<el-table :data="tableData.data" border style="width: 100%">
				<el-table-column prop="id" label="供应商id" />
				<el-table-column prop="pic_url" label="类目主图" :show-overflow-tooltip="true" />
				<el-table-column prop="business_name" label="商品类目名称" />
				<el-table-column prop="default_weight" label="类目默认重量" />
				<el-table-column prop="auto_price_count" label="自动定价状态" />
				<el-table-column label="操作">
					<template #default="scope">
						<el-button link type="primary" size="small" @click="editData(scope.$index)">编辑</el-button>
						<el-button link type="primary" size="small" @click="deleteData(scope.$index)">删除</el-button>
						<el-button link type="primary" size="small" @click="editAutoData(scope.$index)">自动价格表</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination background layout="prev, pager, next" :total="total" @current-change="changePage" />
		</div>

		<el-dialog v-model="dialogFormVisible" title="Shipping address" width="30%">
			<BusinessTypeForm ref="formRef" />
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel">Cancel</el-button>
					<el-button type="primary" @click="confirm"> Confirm </el-button>
				</span>
			</template>
		</el-dialog>

		<el-dialog v-model="dialogFormVisible2" title="Shipping address" width="60%">
			<AutoPriceFormVue ref="autoPriceFormRef" />
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="priceCancel">Cancel</el-button>
					<el-button type="primary" @click="priceConfirm"> Confirm </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import BusinessTypeForm from "./formComponent/businessTypeForm.vue";
import AutoPriceFormVue from "./formComponent/autoPriceForm.vue";
import { getBusinessTypeList, addBusinessTypeInfo, deleteBusinessTypeInfo } from "./service";

const dialogFormVisible = ref(false);
const dialogFormVisible2 = ref(false);
const isEdit = ref("");
const formRef = ref();
const autoPriceFormRef = ref();
const tableData = reactive({
	data: []
});
const total = ref(0);
const currentPage = ref(1);

const cancel = () => {
	formRef.value?.setData?.({});
	dialogFormVisible.value = false;
};

const priceCancel = () => {
	dialogFormVisible2.value = false;
};

const priceConfirm = () => {
	console.log(autoPriceFormRef.value.getData());
	if (isEdit.value !== "") {
		const result = autoPriceFormRef.value?.getData?.();
		tableData.data[isEdit.value].priceInfo = result;
		dialogFormVisible2.value = false;
		isEdit.value = "";
		autoPriceFormRef.value?.setData?.([]);
	} else {
		const result = autoPriceFormRef.value?.getData?.();
		tableData.data.push(result);
		autoPriceFormRef.value?.setData?.({});
		dialogFormVisible.value = false;
	}
};

const confirm = () => {
	formRef.value.getFormInstant().validate((valid, fields) => {
		if (valid) {
			if (isEdit.value !== "") {
				const result = formRef.value?.getData?.();
				result.multi_language.forEach(item => {
					item.text = result[item.lang];
				});
				console.log(result);

				dialogFormVisible.value = false;
				isEdit.value = "";
				formRef.value?.setData?.({});
			} else {
				const result = formRef.value?.getData?.();
				console.log(result);
				addBusinessTypeInfo(result).then(() => {
					ElMessage.success("提交成功！");
					tableData.data.push(result);
					formRef.value?.setData?.({});
					dialogFormVisible.value = false;
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

const editAutoData = index => {
	isEdit.value = index;
	const fillingData = tableData.data[index];
	dialogFormVisible2.value = true;
	nextTick(() => {
		autoPriceFormRef.value?.setData?.(fillingData.priceInfo || [{}]);
	});
};

const deleteData = index => {
	ElMessageBox.alert("确认删除？", "提示", {
		confirmButtonText: "OK",
		callback: () => {
			deleteBusinessTypeInfo(tableData.data[index].id).then(() => {
				ElMessage.success("删除成功！");
			});
		}
	});
};

const getBusinessTypeListData = () => {
	getBusinessTypeList({
		pageSize: 10,
		page: currentPage.value
	}).then(data => {
		tableData.data = data.data.data?.map?.(item => {
			const businessName = item.multi_language.find?.(item => item.lang === "zh")?.text;
			item.business_name = businessName || "";
			return item;
		});
		total.value = data.data.total;
	});
};

const changePage = page => {
	currentPage.value = page;
	getBusinessTypeListData();
};

onMounted(() => {
	getBusinessTypeListData();
});
</script>
