<script setup lang="ts">

const props = defineProps<{
    user_and_doing: object
}>()
</script>

<template>
<div class="user-list-container">
  <div class="user-item" v-for="user in Object.keys(user_and_doing)" :key="user">

  </div>
</div>
</template>

<style scoped>

</style>
