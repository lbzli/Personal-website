<template>
	<div class="card">
		<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
			<el-tab-pane label="ProductType" name="first">ProductType</el-tab-pane>
			<el-tab-pane label="Config" name="second">Config</el-tab-pane>
			<el-tab-pane label="Role" name="third">Role</el-tab-pane>
			<el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
		</el-tabs>

		<el-form v-model="form" inline>
			<el-form-item label="商品类目">
				<el-select v-model="form.collection_id">
					<el-option label="option1" value="1">option1</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="商品名称">
				<el-input v-model="form.text"></el-input>
			</el-form-item>
			<el-form-item label="商品来源">
				<el-select v-model="form.type">
					<el-option label="option1" value="1">option1</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="未翻译多语言">
				<el-select v-model="form.not_translated">
					<el-option label="option1" value="1">option1</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="定价状态">
				<el-select v-model="form.price_status">
					<el-option label="option1" value="1">option1</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" />
			<!-- <el-table-column label="Date" width="120">
				<template #default="scope">{{ scope.row.date }}</template>
			</el-table-column> -->
			<el-table-column property="id" label="商品ID" />
			<el-table-column label="商品图片" show-overflow-tooltip>
				<template #default="scope">{{ getProdImage(scope.row) }}</template>
			</el-table-column>
			<el-table-column label="商品名称" show-overflow-tooltip>
				<template #default="scope"> {{ getProdName(scope.row) }} </template>
			</el-table-column>
			<el-table-column label="商品来源" show-overflow-tooltip>
				<template #default="scope"> {{ getProdSourceInfo(scope.row) }}</template>
			</el-table-column>
			<el-table-column property="collection.default_weight" label="重量" show-overflow-tooltip />
			<el-table-column label="进货价" show-overflow-tooltip>
				<template #default="scope">
					<div v-for="(item, index) in getSalesOriginal(scope.row)" :key="index">
						<span>{{ item.currency }}：</span><span>{{ item.sales_original }}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="销售价" show-overflow-tooltip>
				<template #default="scope">
					<div v-for="(item, index) in getSalesCurrent(scope.row)" :key="index">
						<span>{{ item.currency }}：</span><span>{{ item.sales_current }}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column property="status" label="入库状态" show-overflow-tooltip />
			<el-table-column label="操作" width="300">
				<template #default>
					<el-button @click="openDetailDialog">详情</el-button>
					<el-button>修改</el-button>
					<el-button>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div style="margin-top: 20px">
			<el-button @click="toggleSelection([tableData[1], tableData[2]])"
				>Toggle selection status of second and third rows</el-button
			>
			<el-button @click="toggleSelection()">Clear selection</el-button>
		</div>
		<el-drawer v-model="drawer" title="I am the title" :direction="direction" :close-on-click-modal="false">
			<el-form v-model="drawerForm">
				<el-image></el-image>
				<el-form-item label="商品名称" prop="prodName">
					<el-input v-model="drawerForm.prodName"></el-input>
				</el-form-item>
				<el-form-item label="商品来源" prop="prodSource">
					<el-input v-model="drawerForm.source"></el-input>
				</el-form-item>
				<el-form-item label="重量" prop="default_weight">
					<el-input v-model="drawerForm.default_weight"></el-input>
				</el-form-item>
				<el-form-item label="进货价" prop="sales_original">
					<el-input v-model="drawerForm.sales_original"></el-input>
				</el-form-item>
				<el-form-item label="销售价" prop="sales_current">
					<el-input v-model="drawerForm.sales_current"></el-input>
				</el-form-item>
				<el-form-item label="入库状态" prop="status">
					<el-input v-model="drawerForm.status"></el-input>
				</el-form-item>
			</el-form>
		</el-drawer>
	</div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { TabsPaneContext, ElTable } from "element-plus";

const activeName = ref("first");
const form = reactive({ source: 1 });
const drawer = ref(false);
const drawerForm = reactive({
	prodName: "",
	source: "",
	default_weight: "",
	sales_original: "",
	sales_current: "",
	status: ""
});

const handleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event);
};

interface ProductType {
	id: number;
	collection_id: number;
	handle: string;
	supplier_source: number;
	supplier_id: number;
	supplier_code: string;
	supplier_url: string;
	status: string;
	source: number;
	media: {
		id: number;
		product_id: number;
		url: string;
		format: number;
		type: number;
		sort: number;
	}[];
	multi_language: {
		id: number;
		lang: string;
		type_id: number;
		type: number;
		text: string;
	}[];
	collection: {
		id: number;
		pic_url: string;
		default_weight: number;
	};
	sku: {
		id: number;
		product_id: number;
		sku_no: string;
		barcode: string;
		attr_ids: string;
		sku_media_id: number;
		purchase_price: string;
		weight: number;
		stock: number;
		is_oversold: number;
		price: {
			id: number;
			sku_id: number;
			area: string;
			currency: string;
			sales_original: string;
			sales_current: string;
		}[];
	}[];
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<ProductType[]>([]);
const toggleSelection = (rows?: ProductType[]) => {
	if (rows) {
		rows.forEach(row => {
			// TODO: improvement typing when refactor table
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			multipleTableRef.value!.toggleRowSelection(row, undefined);
		});
	} else {
		multipleTableRef.value!.clearSelection();
	}
};
const handleSelectionChange = (val: ProductType[]) => {
	multipleSelection.value = val;
};

const tableData: ProductType[] = [
	{
		id: 2,
		collection_id: 2,
		handle: "qwer-02",
		supplier_source: 0,
		supplier_id: 2,
		supplier_code: "AB002",
		supplier_url: "https://item.jd.com/10064137278787.html",
		status: "init",
		source: 1,
		media: [
			{
				id: 2,
				product_id: 2,
				url: "https://sponsors.vuejs.org/images/xitujuejinjishushequ.png",
				format: 1,
				type: 1,
				sort: 0
			},
			{
				id: 3,
				product_id: 2,
				url: "https://sponsors.vuejs.org/images/xitujuejinjishushequ.png",
				format: 1,
				type: 1,
				sort: 0
			},
			{
				id: 4,
				product_id: 2,
				url: "https://sponsors.vuejs.org/images/xitujuejinjishushequ.png",
				format: 1,
				type: 1,
				sort: 0
			}
		],
		multi_language: [
			{
				id: 24,
				lang: "zh",
				type_id: 2,
				type: 2,
				text: "这是某件衣服商品名"
			},
			{
				id: 25,
				lang: "en",
				type_id: 2,
				type: 2,
				text: "this is clothes titleName"
			},
			{
				id: 26,
				lang: "id",
				type_id: 2,
				type: 2,
				text: "GaaaGaaaGaaaGaaa"
			},
			{
				id: 27,
				lang: "zh",
				type_id: 2,
				type: 5,
				text: "这里是详情测试这里是详情测试这里是详情测试这里是详情测试"
			},
			{
				id: 32,
				lang: "id",
				type_id: 2,
				type: 5,
				text: "这里是详情印尼语印尼语印尼语印尼语"
			}
		],
		collection: {
			id: 2,
			pic_url: "https://sponsors.vuejs.org/images/xitujuejinjishushequ.png",
			default_weight: 1234
		},
		sku: [
			{
				id: 1,
				product_id: 2,
				sku_no: "6901236348420",
				barcode: "6901236348420",
				attr_ids: "1,2,3",
				sku_media_id: 1,
				purchase_price: "10",
				weight: 100,
				stock: 1,
				is_oversold: 1,
				price: [
					{
						id: 1,
						sku_id: 1,
						area: "cn",
						currency: "CNY",
						sales_original: "11",
						sales_current: "11"
					},
					{
						id: 2,
						sku_id: 1,
						area: "id",
						currency: "IDR",
						sales_original: "999",
						sales_current: "999"
					}
				]
			},
			{
				id: 3,
				product_id: 2,
				sku_no: "6901236348421",
				barcode: "6901236348421",
				attr_ids: "2,3,16",
				sku_media_id: 1,
				purchase_price: "10",
				weight: 111,
				stock: 1,
				is_oversold: 1,
				price: [
					{
						id: 3,
						sku_id: 3,
						area: "cn",
						currency: "CNY",
						sales_original: "22",
						sales_current: "22"
					},
					{
						id: 4,
						sku_id: 3,
						area: "id",
						currency: "IDR",
						sales_original: "22",
						sales_current: "22"
					},
					{
						id: 5,
						sku_id: 3,
						area: "ph",
						currency: "PHP",
						sales_original: "20",
						sales_current: "21"
					}
				]
			}
		]
	}
];

const getProdName = (source: ProductType) => {
	const target = source.multi_language.find(item => item.lang === "zh");
	return target?.text;
};

const getProdImage = (source: ProductType) => {
	const target = source.media[0];
	return target.url;
};

const prodSourceName: Record<string, string> = {
	"0": "自动采集",
	"1": "手动录入"
};
const getProdSourceInfo = (source: ProductType) => {
	return prodSourceName[String(source.source)];
};
const getSalesOriginal = (source: ProductType) => {
	const target = source.sku.map(item => item.price);
	const prodPriceData = target.flat(Infinity);
	return prodPriceData;
};
const getSalesCurrent = (source: ProductType) => {
	const target = source.sku.map(item => item.price);
	const prodPriceData = target.flat(Infinity);
	return prodPriceData;
};

const openDetailDialog = () => {
	drawer.value = true;
	drawerForm.prodName = "";
};
</script>
<style>
.demo-tabs > .el-tabs__content {
	display: none;
}
</style>
