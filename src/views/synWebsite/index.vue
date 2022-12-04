<template>
  <div class="card">
    <div class="header-content"></div>
    <el-form :inline="true">
      <el-form-item label="选择网站">
        <el-select v-model="value" class="m-2" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <div>
        <el-form-item label="同步方式">
          <el-radio-group v-model="radio1" class="ml-4">
            <el-radio label="1" size="large"></el-radio>
            <el-radio label="1" size="large">
              <el-row gutter="60">
                <el-col span="6"><span>eeeeeeee</span></el-col>
                <el-col span="18"
                  ><el-form-item label="eeeeee">
                    <el-select v-model="value" class="m-2" placeholder="Select">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
            </el-radio>
            <el-radio label="1" size="large">
              <el-row gutter="60">
                <el-col span="6"><span>eeeeeeee</span></el-col>
                <el-col span="18"
                  ><el-form-item label="eeeeee">
                    <el-select v-model="value" class="m-2" placeholder="Select">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="采购方式" prop="indonesia">
          <el-checkbox-group>
            <el-checkbox label="线下采购" />
            <el-checkbox label="线上采购" />
          </el-checkbox-group>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="采购方式" prop="indonesia">
          <el-checkbox-group>
            <el-checkbox label="线下采购" />
            <el-checkbox label="线上采购" />
          </el-checkbox-group>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="价格选项">
          <el-radio-group v-model="radio1" class="ml-4">
            <el-radio label="1" size="large"></el-radio>
            <el-radio label="1" size="large">
              <el-row gutter="60">
                <el-col span="6"><span>eeeeeeee</span></el-col>
                <el-col span="18"
                  ><el-form-item label="eeeeee">
                    <el-select v-model="value" class="m-2" placeholder="Select">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
            </el-radio>
            <el-radio label="1" size="large">
              <el-row gutter="60">
                <el-col span="6"><span>eeeeeeee</span></el-col>
                <el-col span="18"
                  ><el-form-item label="eeeeee">
                    <el-select v-model="value" class="m-2" placeholder="Select">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <el-button>加入同步队列</el-button>
    </el-form>
  </div>

  <div class="card">
    <el-table :data="[]" border style="width: 100%" height="600px">
      <el-table-column prop="id" label="供应商ID" />
      <el-table-column prop="name" label="供应商名称" />
      <el-table-column prop="contacts" label="对接人" />
      <el-table-column prop="contact_details" label="联系方式" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="editData(scope.$index)"
            >编辑</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="deleteData(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 20px;
}
.el-radio-group {
  display: flex;
  flex-direction: column;

  align-items: baseline;
}
</style>