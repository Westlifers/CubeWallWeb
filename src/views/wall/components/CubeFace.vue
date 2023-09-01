<script setup lang="ts">

import {COLOR_DICT} from "@/utils/wall_related";

const props = defineProps<{
    cube_matrix: number[][]
}>();

console.log(props.cube_matrix)
</script>

<template>
<div class="cube-container">
  <div class="cube-row" v-for="(row, i) in cube_matrix" :key="i">
    <div class="cube-item" v-for="(item, j) in cube_matrix[i]" :key="j" :style="{'background-color': COLOR_DICT[item]}">
      {{item}}
    </div>
  </div>
</div>

</template>

<style scoped>
.cube-container {
    display: flex;
    flex-direction: column;
}
.cube-row {
    display: flex;
    flex-direction: row;
}
</style>
