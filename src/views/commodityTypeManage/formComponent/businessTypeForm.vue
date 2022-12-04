<template>
	<el-form :model="form" ref="formInstant" :rules="rules" label-position="left">
		<el-form-item label="类目主图">
			<el-upload
				class="avatar-uploader"
				action="http://localhost:3301/api/api/upload/"
				name="img"
				:show-file-list="false"
				:on-success="handleAvatarSuccess"
				:auto-upload="true"
				:before-upload="beforeAvatarUploads"
			>
				<img v-if="imageUrl" :src="imageUrl" class="avatar" />
				<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
			</el-upload>
		</el-form-item>

		<el-form-item label="类目语种">
			<el-checkbox-group v-model="checkList">
				<el-checkbox label="中文" disabled />
				<el-checkbox label="英语" />
				<el-checkbox label="印尼语" />
			</el-checkbox-group>
		</el-form-item>

		<el-form-item label="中文" label-width="68px" prop="zh" v-if="checkList.includes('中文')">
			<el-input v-model="form.zh" autocomplete="off" />
		</el-form-item>
		<el-form-item label="英语" label-width="68px" prop="en" v-if="checkList.includes('英语')">
			<el-input v-model="form.en" autocomplete="off" />
		</el-form-item>
		<el-form-item label="印尼语" label-width="68px" prop="id" v-if="checkList.includes('印尼语')">
			<el-input v-model="form.id" autocomplete="off" />
		</el-form-item>
		<el-form-item label="默认重量" label-width="68px" prop="default_weight">
			<el-input-number v-model="form.default_weight" :step="1" />g
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
// import { ElMessage } from "element-plus";
const checkList = ref(["中文"]);

const imageUrl = ref("");

const handleAvatarSuccess = response => {
	imageUrl.value = response.data.pic_url;
};

const beforeAvatarUploads = rawFile => {
	console.log(rawFile);
	// imageUrl.value = URL.createObjectURL(rawFile.raw);
	// if (!rawFile.type.includes("image")) {
	// 	ElMessage.error("请上传图片格式!");
	// 	return true;
	// } else if (rawFile.size / 1024 / 1024 > 2) {
	// 	ElMessage.error("文件大小不能超过2MB!");
	// 	return true;
	// }
	return true;
};

const form = reactive({});

const rules = reactive({
	zh: [
		{ required: true, message: "请填写" },
		{ max: 80, message: "长度不能超过80个字符" }
	],
	en: [
		{ required: true, message: "请填写" },
		{ max: 80, message: "长度不能超过80个字符" }
	],
	id: [
		{ required: true, message: "请填写" },
		{ max: 80, message: "长度不能超过80个字符" }
	]
});

const formInstant = ref();

const getFormInstant = () => formInstant.value;

const getData = () => {
	if (!form.multi_language) {
		const { zh, en, id } = form;
		form.multi_language = [];
		if (zh) form.multi_language.push({ lang: "zh", text: zh });
		if (en) form.multi_language.push({ lang: "en", text: en });
		if (id) form.multi_language.push({ lang: "id", text: id });
	}
	const multi_language = form.multi_language?.map?.(item => {
		return { ...item };
	});

	return { ...form, pic_url: imageUrl.value, multi_language };
};

const setData = fillingData => {
	imageUrl.value = fillingData.pic_url;
	form.default_weight = fillingData.default_weight;
	form.multi_language = fillingData.multi_language;
	form.zh = fillingData.zh;
	form.en = fillingData.en;
	form.id = fillingData.id;
	checkList.value = fillingData.multi_language?.map?.(item => {
		if (item.lang === "zh") {
			form.zh = item.text;
			return "中文";
		}
		if (item.lang === "en") {
			form.en = item.text;
			return "英语";
		}
		if (item.lang === "id") {
			form.id = item.text;
			return "印尼语";
		}
	}) || ["中文"];
};

defineExpose({
	getData,
	setData,
	getFormInstant
});
</script>

<style scoped>
.avatar-uploader .avatar {
	display: block;
	width: 100px;
	height: 100px;
}
.avatar-uploader .el-upload {
	position: relative;
	overflow: hidden;
	cursor: pointer;
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
	width: 100px;
	height: 100px;
	font-size: 28px;
	color: #8c939d;
	text-align: center;
}
</style>
