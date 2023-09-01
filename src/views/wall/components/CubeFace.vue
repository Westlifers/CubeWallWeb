<script setup lang="ts">

import {COLOR_DICT} from "@/utils/wall_related";
import {onMounted, ref, watch} from "vue";

const props = defineProps<{
    cube_matrix: number[][]
}>();

const scale = ref(1)
const canvasRef = ref()
const canvasContainerRef = ref()
const isDragging = ref(false)
const startOffsetX = ref(0)
const startOffsetY = ref(0)

const drawCubeFace = () => {
    const canvas = canvasRef.value;
    const ctx = canvas.getContext('2d')
    const cellSize = 20 * scale.value
    const separationLineWidth = 2 * scale.value; // 分隔线的宽度
    canvas.width = canvasContainerRef.value.clientWidth
    canvas.height = canvasContainerRef.value.clientHeight
    const numRows = props.cube_matrix.length;
    const numCols = props.cube_matrix[0].length;
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < props.cube_matrix.length; i++) {
        for (let j = 0; j < props.cube_matrix[i].length; j++) {
            const value = props.cube_matrix[i][j]
            ctx.fillStyle = COLOR_DICT[value]
            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize)
        }
    }

    // 绘制横向分隔线
    for (let i = 0; i < numRows; i++) {
        const y = i * (cellSize * 3); // 在每3行之后绘制一条线
        ctx.fillStyle = 'black'; // 分隔线的颜色
        ctx.fillRect(0, y - separationLineWidth / 2, canvas.width, separationLineWidth);
    }

    // 绘制纵向分隔线
    for (let j = 0; j < numCols; j++) {
        const x = j * (cellSize * 3); // 在每3列之后绘制一条线
        ctx.fillStyle = 'black'; // 分隔线的颜色
        ctx.fillRect(x - separationLineWidth / 2, 0, separationLineWidth, canvas.height);
    }
}

watch(scale, () => {
    drawCubeFace()
})

onMounted(() => {
    drawCubeFace()
})

</script>

<template>
<!--<div class="cube-container">
  <div class="cube-row" v-for="(row, i) in cube_matrix" :key="i">
    <div class="cube-item"
         v-for="(item, j) in cube_matrix[i]"
         :key="j"
         :style="{'background-color': COLOR_DICT[item], 'width': `calc(100% / ${row.length})`}">
      {{item}}
    </div>
  </div>
</div>-->
  <div class="cube-canvas-container" ref="canvasContainerRef">
    <canvas ref="canvasRef" />
    <div class="scaler">
      <el-input-number v-model="scale" :precision="2" :step="0.01" :max="10" :min="0.01" />
    </div>
  </div>

</template>

<style scoped>
.cube-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.cube-row {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.cube-item {
    height: 100%;
}

.cube-canvas-container {
    width: 100%;
    height: 100%;
}

.scaler {
    position: absolute;
    right: 10px;
    top: 10px
}

canvas {
    width: 100%;
    height: 100%;
}
</style>
