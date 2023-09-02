<script setup lang="ts">
import {get_alg_by_face} from "@/utils/alg_by_face";
import {COLOR_DICT} from "@/utils/wall_related";
import {computed} from "vue";

const cubeSize = computed(() => {
    console.log(window.innerWidth)
    return Math.min(Math.min(window.innerWidth, window.innerHeight) * 0.6, 100)
})

defineProps<{
    cube: number[][]
}>()
</script>

<template>
<div class="task-fix">
  <el-popover
      :width="100"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10p"
      trigger="click"
      placement="left-start"
      >
    <template #reference>
      <el-avatar src="https://avatars.githubusercontent.com/u/72015883?v=4" />
    </template>

    <template #default>
      <div class="task-fix-cube-face-container">
        <div class="task-row" v-for="(row, i) in cube"
             :key="i"
             :style="{'width': `${cubeSize}px`, 'height': `calc(${cubeSize}px / 3)`}"
        >
          <div class="task-item" v-for="(item, j) in cube[i]"
               :key="j"
               :style="{
                   'background-color': COLOR_DICT[item],
                   'width': 'calc(100% / 3)', 'height': `100%`
               }"
          />
        </div>
      </div>
      <p>{{get_alg_by_face(cube)}}</p>
      <el-button-group>
        <el-button type="primary">完成</el-button>
        <el-button type="primary">分配</el-button>
      </el-button-group>
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

.task-fix-cube-face-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.task-row {
    display: flex;
    flex-direction: row;
}

.task-item {
    border: solid black 1px;
}

p {
    width: 100%;
    padding: 5px;
    font-size: large;
}
</style>
