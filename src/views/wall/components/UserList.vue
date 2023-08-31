<script setup lang="ts">

defineProps<{
    user_and_doing: object
}>()
</script>

<template>
<div class="user-list-container">
  <p class="user-list-container-header">
    在线用户
  </p>

  <el-scrollbar>
    <div class="user-item" v-for="user in Object.keys(user_and_doing)" :key="user">
      <div class="user-avatar">
        <el-avatar src="http://img.yougi.top/default.png" />
      </div>

      <div class="user-name">
        <p>{{user}}</p>
      </div>
    </div>
  </el-scrollbar>

</div>
</template>

<style scoped>
.user-list-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    border-radius: 30px;
    padding: 0 10px 0 10px;
    background-color: var(--yougi-projects-section);
}

.user-list-container > p {
    width: 100%;
    text-align: center;
    margin-top: 10px;
}

.user-item {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: start;
}

.user-avatar {
    margin: 10px 10px 0 0;
}

@media (max-width: 1024px) {
    .user-list-container {
        display: none;
    }
}
</style>
