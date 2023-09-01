<script setup lang="ts">
import router from "@/router";
import TaskFix from "@/views/wall/components/TaskFix.vue";
import {computed, ref} from "vue";
import UserList from "@/views/wall/components/UserList.vue";
import WallShow from "@/views/wall/components/WallShow.vue";
import UserListFix from "@/views/wall/components/UserListFix.vue";
import {get_m_n_cube_of_wall} from "@/utils/wall_related";

const wallName = router.currentRoute.value.params.wallname
const baseUrl = 'ws://127.0.0.1:8000/ws/'
const socket = new WebSocket(baseUrl + 'wall/' + wallName + '/')
const user_and_doing = ref({})
const wall = ref([[0]])
const cubes_done = ref([])
const my_choice = ref([0, 0])
const my_task_cube = computed(() => {
    return get_m_n_cube_of_wall(my_choice.value[0], my_choice.value[1], wall.value)
})


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
  <div class="user-list">
    <UserList :user_and_doing="user_and_doing" />
  </div>

  <div class="wall-show">
    <WallShow :wall="wall" :user_and_doing="user_and_doing" />
  </div>

  <UserListFix :user_and_doing="user_and_doing" />

  <TaskFix :cube="my_task_cube" />
</div>
</template>

<style scoped>
.container {
    height: 100vh;
    display: flex;
    flex-direction: row;
}

.user-list {
    width: 20%;
    height: 100%;
    padding: 10px;
}

.wall-show {
    padding: 10px;
    width: 80%;
}

@media (max-width: 1024px) {
    .user-list {
        display: none;
    }

    .wall-show {
        width: 100%;
    }
}

</style>
