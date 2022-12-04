<template>
	<el-form :model="form" ref="formInstant" :rules="rules">
		<el-form-item label="供应商名称" :label-width="formLabelWidth" prop="name">
			<el-input v-model="form.name" autocomplete="off" />
		</el-form-item>
		<el-form-item label="对接人" :label-width="formLabelWidth" prop="contacts">
			<el-input v-model="form.contacts" autocomplete="off" />
		</el-form-item>
		<el-form-item label="联系方式" :label-width="formLabelWidth" prop="contact_details">
			<el-input v-model="form.contact_details" autocomplete="off" />
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const formLabelWidth = "140px";

const form = reactive({});

const rules = reactive({
	name: [
		{ required: true, message: "请填写供应商名称", trigger: "blur" },
		{ max: 30, message: "长度不能超过30个字符", trigger: "blur" }
	]
});

const formInstant = ref();

const getFormInstant = () => formInstant.value;
const getData = () => {
	return { ...form };
};
const setData = fillingData => {
	form.name = fillingData.name;
	form.contacts = fillingData.contacts;
	form.contact_details = fillingData.contact_details;
};
defineExpose({
	getData,
	setData,
	getFormInstant
});
</script>

<style lang="scss" scoped></style>
