<script setup lang="ts">
import router from "@/router";
import TaskFix from "@/views/wall/components/TaskFix.vue";
import {ref} from "vue";
import UserList from "@/views/wall/components/UserList.vue";
import WallShow from "@/views/wall/components/WallShow.vue";

const wallName = router.currentRoute.value.params.wallname
const baseUrl = 'ws://127.0.0.1:8000/ws/'
const socket = new WebSocket(baseUrl + 'wall/' + wallName + '/')
const user_and_doing = ref({})
const wall = ref([])
const cubes_done = ref([])


socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log('receive message from websocket: => ')
    console.log(message)

    switch (message['type']) {
        case 'upgrade_user':
            user_and_doing.value = message['message']
            break
        case 'get_wall':
            wall.value = message['message']
            break
        case 'upgrade_cubes_done':
            cubes_done.value = message['message']
            break
    }
}
</script>

<template>
<div class="container">
  <el-row>
    <el-col :span="4">
      <UserList :user_and_doing="user_and_doing" />
    </el-col>

    <el-col :span="20">
      <WallShow :wall="wall" :user_and_doing="user_and_doing" />
    </el-col>
  </el-row>

  <TaskFix />
</div>
</template>

<style scoped>
.container {
    min-height: 100vh;
}
</style>
