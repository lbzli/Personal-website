<template>
  <div class="card">
    <el-form label-position="left">
      <el-form-item label="姓名">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="系统用户名">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="初始密码">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="确认初始密码">
        <el-input></el-input>
      </el-form-item>
      <div></div>

      <el-form-item>
        <el-checkbox>此用户拥有所有权限</el-checkbox>
      </el-form-item>

      <el-form-item label="商品库模块" prop="indonesia">
        <el-checkbox-group>
          <el-checkbox label="线下采购" />
          <el-checkbox label="线上采购" />
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="订单模块" prop="indonesia">
        <el-checkbox-group>
          <el-checkbox label="线下采购" />
          <el-checkbox label="线上采购" />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>