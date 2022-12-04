<template>
	<div class="card">
		<el-form label-position="top">
			<el-form-item label="采购方式" prop="indonesia">
				<el-checkbox-group>
					<el-checkbox label="线下采购" />
					<el-checkbox label="线上采购" />
				</el-checkbox-group>
			</el-form-item>

			<div>
				<div class="title">商品标题</div>
				<el-table :data="[]" style="width: 100%">
					<el-table-column label="Date">
						<template #default="scope">
							<el-input autocomplete="off" />
						</template>
					</el-table-column>
					<el-table-column label="Name">
						<template #default="scope">
							<el-select
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
			</div>

			<div>
				<div class="title">商品规格</div>
				<el-table :data="[]" style="width: 100%">
					<el-table-column label="Date">
						<template #default="scope">
							<el-input autocomplete="off" />
						</template>
					</el-table-column>
					<el-table-column label="Name">
						<template #default="scope">
							<el-select
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
			</div>

			<div>
				<div class="title">详情页翻译</div>
				<el-form-item label="中文" prop="indonesia">
					<el-input v-model="textarea" maxlength="30" placeholder="Please input" show-word-limit type="textarea" />
				</el-form-item>
				<el-form-item label="英文" prop="indonesia">
					<el-input v-model="textarea" maxlength="30" placeholder="Please input" show-word-limit type="textarea" />
				</el-form-item>
				<el-form-item label="印尼文" prop="indonesia">
					<el-input v-model="textarea" maxlength="30" placeholder="Please input" show-word-limit type="textarea" />
				</el-form-item>
			</div>
		</el-form>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
