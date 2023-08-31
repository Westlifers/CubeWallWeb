<script setup lang="ts">

</script>

<template>
<div class="task-fix">
  <el-popover
      :width="300"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10p"
      trigger="click"
      >
    <template #reference>
      <el-avatar src="https://avatars.githubusercontent.com/u/72015883?v=4" />
    </template>

    <template #default>
      asdfasdf
    </template>
  </el-popover>
</div>
</template>

<style scoped>
.task-fix {
    position: absolute;
    bottom: 10px;
    right: 10px;
}
</style>
