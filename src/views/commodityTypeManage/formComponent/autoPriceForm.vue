<template>
	<el-form :model="form" ref="formInstant" :rules="rules">
		<el-checkbox-group v-model="checkList">
			<el-checkbox label="中文" />
			<el-checkbox label="英语" />
			<el-checkbox label="印尼语" />
		</el-checkbox-group>
	</el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
const checkList = ref(["中文"]);

const tableData = reactive({
	data: [{}]
});

const form = reactive({
	name: "",
	region: "",
	date1: "",
	date2: "",
	delivery: false,
	type: [],
	resource: "",
	desc: ""
});

const rules = reactive({
	chinese: [
		{ required: true, message: "请填写供应商名称", trigger: "blur" },
		{ max: 30, message: "长度不能超过30个字符", trigger: "blur" }
	]
});

const formInstant = ref();

const getFormInstant = () => formInstant.value;
const getData = () => {
	return [...tableData.data];
};
const setData = fillingData => {
	tableData.data = fillingData;
};
defineExpose({
	getData,
	setData,
	getFormInstant
});
</script>
