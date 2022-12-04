<template>
	<div>
		<el-form v-model="form">
			<el-form-item label="商品类目" prop="collection_id">
				<el-select v-model="form.collection_id">
					<el-option value="1" label="option1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="销售地区">
				<el-checkbox-group v-model="form.area">
					<el-checkbox label="线下采购" />
					<el-checkbox label="线上采购" />
				</el-checkbox-group>
			</el-form-item>
		</el-form>

		<div class="card-groups">
			<div class="card card-item" style="margin-left: 0">
				<div class="title">多属性</div>
				<div class="content">
					<el-checkbox label="此产品有多个选项，例如不同的尺寸或颜色" />
				</div>

				<el-table :data="multipleAttr.data" style="width: 100%">
					<el-table-column label="Date">
						<template #default="scope">
							<el-input v-model="multipleAttr.data[scope.$index].chinese" autocomplete="off" />
						</template>
					</el-table-column>
					<el-table-column label="Name">
						<template #default="scope">
							<el-select
								v-model="multipleAttr.data[scope.$index].chinese2"
								multiple
								filterable
								allow-create
								default-first-option
								:reserve-keyword="false"
								placeholder="Choose tags for your article"
								@change="attrChange"
							>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column label="Name">
						<template #default="scope">
							<el-button color="#626aef" @click="handleDeleteAttrInfo(scope.$index)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>

				<el-button color="#626aef" @click="handleAddAttrInfo">添加属性</el-button>
			</div>

			<div class="card card-item">
				<div class="title">属性预览</div>
				<div class="content">
					<el-table :data="attrPreviewData.data" style="width: 100%">
						<el-table-column label="keyName" width="180" prop="keyName"> </el-table-column>
						<el-table-column label="Date" width="180">
							<template #default="scope">
								<el-input
									v-model="attrPreviewData.data[scope.$index].chinese"
									autocomplete="off"
									v-if="!attrPreviewData.data[scope.$index].isDelete"
								/>
								<span v-else>是否删除</span>
							</template>
						</el-table-column>
						<el-table-column label="Operations">
							<template #default="scope">
								<el-button
									v-if="!attrPreviewData.data[scope.$index].isDelete"
									size="small"
									type="danger"
									@click="handleDeleteAttrPreInfo(scope.$index, true)"
									>删除</el-button
								>
								<el-button size="small" type="danger" v-else @click="handleDeleteAttrPreInfo(scope.$index, false)"
									>撤销</el-button
								>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>

		<div class="card content-box">
			<div class="header-content">
				<el-button plain @click="contentPreviewDialog = true">预览</el-button>
			</div>
			<WangEditor height="400px" v-model:value="form.product_details" />

			<el-dialog v-model="contentPreviewDialog" title="富文本内容预览" width="1300px" top="50px">
				<div class="view" v-html="form.product_details"></div>
			</el-dialog>
		</div>
		<div class="card">
			<div class="title">商品图片</div>
			<div class="content">
				<el-dialog v-model="dialogVisible">
					<img w-full :src="dialogImageUrl" alt="Preview Image" />
				</el-dialog>
				<div class="img-box">
					<VueDraggableNext class="list-group" :list="draggableData.list" @change="log">
						<el-image
							v-for="(element, index) in draggableData.list"
							:class="index === 0 ? 'list-group-item first-item' : 'list-group-item'"
							:key="index"
							:src="element.pic_url"
							class="image-content"
							@click="handlePictureCardPreview(element.pic_url)"
						>
						</el-image>
					</VueDraggableNext>
				</div>
			</div>
			<el-upload
				class="avatar-uploader"
				action="http://localhost:3301/api/api/upload/"
				name="img"
				drag
				multiple
				:auto-upload="true"
				:on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUploads"
				:show-file-list="false"
			>
				<img v-if="imageUrl" :src="imageUrl" class="avatar" />
				<el-icon v-else class="avatar-uploader-icon">
					<Plus />
				</el-icon>
			</el-upload>
		</div>

		<div class="card">
			<div class="title">商品详情图片</div>
			<div class="content">
				<el-dialog v-model="dialogVisible2">
					<img w-full :src="dialogImageUrl2" alt="Preview Image" />
				</el-dialog>
				<div class="img-box">
					<VueDraggableNext class="list-group" :list="draggableData2.list" @change="log">
						<el-image
							v-for="(element, index) in draggableData2.list"
							:class="index === 0 ? 'list-group-item first-item' : 'list-group-item'"
							:key="index"
							:src="element.pic_url"
							class="image-content"
							@click="handlePictureCardPreview(element.pic_url)"
						>
						</el-image>
					</VueDraggableNext>
				</div>
			</div>
			<el-upload
				class="avatar-uploader"
				action="http://localhost:3301/api/api/upload/"
				name="img"
				drag
				multiple
				:auto-upload="true"
				:on-success="handleAvatarSuccess2"
				:before-upload="beforeAvatarUploads"
				:show-file-list="false"
			>
				<img v-if="imageUrl" :src="imageUrl" class="avatar" />
				<el-icon v-else class="avatar-uploader-icon">
					<Plus />
				</el-icon>
			</el-upload>
		</div>

		<div class="card-groups">
			<div class="card card-item">
				<el-header>商品属性</el-header>
				<el-form :model="businessAttr.data" ref="formInstant" :rules="businessAttr.rules">
					<el-form-item label="进货价" prop="purchase_price">
						<el-input v-model="businessAttr.data.purchase_price" autocomplete="off" />
					</el-form-item>
					<el-form-item label="重量" prop="weight">
						<el-input v-model="businessAttr.data.weight" autocomplete="off" />
					</el-form-item>
				</el-form>
			</div>

			<div class="card card-item">
				<el-header>供应商</el-header>
				<el-form :model="businessSupplier.data" ref="formInstant" :rules="businessSupplier.rules">
					<el-form-item label="采购方式" prop="supplier_source">
						<el-checkbox-group v-model="businessSupplier.data.supplier_source">
							<el-checkbox label="印尼" />
							<el-checkbox label="菲律宾" />
						</el-checkbox-group>
					</el-form-item>

					<el-form-item label="选择供应商" prop="supplier_id">
						<el-select v-model="businessSupplier.data.supplier_id" class="m-2" placeholder="Select">
							<el-option label="选项一" value="1" />
							<el-option label="选项二" value="2" />
							<el-option label="选项三" value="3" />
						</el-select>
					</el-form-item>

					<el-form-item label="供应商货号" prop="supplier_code">
						<el-input v-model="businessSupplier.data.supplier_code" autocomplete="off" />
					</el-form-item>
					<el-form-item label="采购链接" prop="supplier_url">
						<el-input v-model="businessSupplier.data.supplier_url" autocomplete="off" />
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import WangEditor from "@/components/WangEditor/index.vue";
import { Plus } from "@element-plus/icons-vue";

const dialogImageUrl = ref("");
const dialogImageUrl2 = ref("");
const dialogVisible = ref(false);
const dialogVisible2 = ref(false);
const contentPreviewDialog = ref(false);
const draggableData = reactive({
	enabled: true,
	list: [],
	dragging: false
});
const draggableData2 = reactive({
	enabled: true,
	list: [],
	dragging: false
});
const multipleAttr = reactive({
	data: []
});
const attrPreviewData = reactive({
	data: []
});
const form = reactive({});

const businessAttr = reactive({
	data: {},
	rules: []
});

const businessSupplier = reactive({
	data: {},
	rules: []
});

const attrChange = () => {
	const targetData = multipleAttr.data.map(item => {
		return [...item.chinese2];
	});
	let result = [];
	while (targetData.length !== 0) {
		const item = targetData.shift();
		const temp = [];
		for (const subitem of item) {
			if (result.length !== 0) {
				for (const resultItem of result) {
					temp.push(`${resultItem}/${subitem}`);
				}
			} else {
				temp.push(subitem);
			}
		}
		if (temp.length === 0) break;
		result = temp;
	}

	attrPreviewData.data = result.map(item => {
		return {
			keyName: item
		};
	});
};

const handlePictureCardPreview = url => {
	dialogImageUrl.value = url;
	dialogVisible.value = true;
};

const log = () => {
	console.log(draggableData.list);
};

const handleAddAttrInfo = () => {
	multipleAttr.data.push({});
};

const handleDeleteAttrInfo = index => {
	multipleAttr.data.splice(index, 1);
	attrChange();
};

const handleDeleteAttrPreInfo = (index, state) => {
	attrPreviewData.data[index].isDelete = state;
};

const beforeAvatarUploads = () => {
	return true;
};

const handleAvatarSuccess = response => {
	draggableData.list.push({
		pic_url: response.data.pic_url
	});
};

const handleAvatarSuccess2 = response => {
	draggableData2.list.push({
		pic_url: response.data.pic_url
	});
};
</script>

<style lang="scss" scoped>
.list-group {
	display: grid;
	grid-template-columns: repeat(5, 110px);
	grid-gap: 10px;
	.list-group-item {
		width: 110px;
		height: 110px;
	}
	.first-item {
		grid-row: 1/3;
		grid-column: 1/3;
		width: 230px;
		height: 230px;
	}
}
.content-box {
	margin-bottom: 20px;
}
.card-groups {
	display: flex;
	.image-card {
		display: flex;
		flex: 2.5;
		margin-bottom: 20px;
	}
	.card-item {
		flex: 1;
		margin-bottom: 20px;
	}
}
.header-content {
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 15px;
}
.image-content {
	cursor: pointer;
}
.content {
	min-height: 200px;
}
</style>
