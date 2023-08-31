<script setup lang="ts">

defineProps<{
    user_and_doing: object
}>()
</script>

<template>
  <div class="user-list-fix">
    <el-popover
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10p"
        trigger="click"
    >
      <template #reference>
        <el-avatar src="https://avatars.githubusercontent.com/u/72015883?v=4" />
      </template>

      <template #default>
        <el-scrollbar>
          <el-popover :width="300"
                      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10p"
                      trigger="hover"
                      v-for="user in Object.keys(user_and_doing)" :key="user"
                      >

            <template #reference>
              <el-avatar src="http://img.yougi.top/default.png" />
            </template>

            <template #default>
              <p>{{user}}</p>
            </template>

          </el-popover>

        </el-scrollbar>
      </template>

    </el-popover>
  </div>
</template>

<style scoped>
.user-list-fix {
    position: absolute;
    bottom: 10px;
    left: 10px;
}

@media (min-width: 1024px) {
    .user-list-fix {
        display: none;
    }
}
</style>
