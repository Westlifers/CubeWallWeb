<script setup lang="ts">

import {COLOR_DICT} from "@/utils/wall_related";
import {computed, onMounted, ref, watch} from "vue";
import {ElMessage} from "element-plus";

const props = defineProps<{
    cube_matrix: number[][]
    user_and_doing: object
    cubes_done: number[][]
    updater: number
    choice: number[]
}>()

const emits = defineEmits<{
    choose: [choice: number[]]
}>()

const scale = ref(1)
const updater = computed(() => props.updater)
const canvasRef = ref()
const canvasContainerRef = ref()
const dragStart = ref(false)
const isDragging = ref(false)
const finishDrag = ref(false)  // 标签，用来解决拖动后会选择魔方的问题
const posAtDraggingStart = ref([0, 0])  // 记录初始位置
const lastOffsetPos = ref([0, 0])  // 上次的偏移
const totalOffsetPos = ref([0, 0])  // 总的偏移
const STANDARD_CELL_SIZE = 20
const numRows = computed(() => props.cube_matrix.length)
const numCols = computed(() => props.cube_matrix[0].length)
const min_scale = computed(() => {
    let m = 0.1
    if (canvasContainerRef.value && canvasContainerRef.value) {
        m = Math.min(
            canvasContainerRef.value.clientWidth / (STANDARD_CELL_SIZE * numCols.value),
            canvasContainerRef.value.clientHeight / (STANDARD_CELL_SIZE * numRows.value))
    }
    return m
})
const mouse_pos = ref([0, 0])
const cube_pointed = computed(() => [
    Math.floor((mouse_pos.value[1] - totalOffsetPos.value[1]) / (STANDARD_CELL_SIZE * scale.value) / 3),
    Math.floor((mouse_pos.value[0] - totalOffsetPos.value[0]) / (STANDARD_CELL_SIZE * scale.value) / 3)
])
const is_pointed_cube_out_of_bound = computed(() =>
    (cube_pointed.value[0] >= props.cubes_done.length) ||
    (cube_pointed.value[0] < 0) ||
    (cube_pointed.value[1] >= props.cubes_done[0].length) ||
    (cube_pointed.value[1] < 0)
)


const update_mouse_pos_and_drag = (e) => {
    // 两个功能，一个是更新鼠标坐标，另一个是实现拖拽功能
    // 1.更新鼠标坐标
    if (!dragStart.value) {
        mouse_pos.value = [e.clientX - canvasRef.value.getBoundingClientRect().x,
            e.clientY - canvasRef.value.getBoundingClientRect().y
        ]
    }

    // 2.实现拖拽功能
    if (dragStart.value) {
        isDragging.value = true
        totalOffsetPos.value[0] = lastOffsetPos.value[0] + (e.x - posAtDraggingStart.value[0])
        totalOffsetPos.value[1] = lastOffsetPos.value[1] + (e.y - posAtDraggingStart.value[1])
    }
}

const startDrag = (e) => {
    dragStart.value = true
    // 记录初始位置
    if (!isDragging.value) {
        posAtDraggingStart.value = [e.x, e.y]
    }
}

const endDrag = (e) => {
    if (isDragging.value) {
        finishDrag.value = true
    }
    dragStart.value = false
    isDragging.value = false
    // lastOffsetPos.value = totalOffsetPos.value  // wrong! 是引用类型!
    lastOffsetPos.value[0] = totalOffsetPos.value[0]
    lastOffsetPos.value[1] = totalOffsetPos.value[1]
}


const choose = () => {
    // 拖拽时不选择
    if (finishDrag.value) {
        finishDrag.value = false
        return
    }
    // 越界则不管
    if (is_pointed_cube_out_of_bound.value) return
    // 如果该处已被选择则拒绝选择
    for (let pos of Object.values(props.user_and_doing)) {
        if (pos && (pos.toString() == cube_pointed.value.toString())) {
            ElMessage({
                type: 'error',
                message: '此魔方已被选择'
            })
            return
        }
    }
    // 如果该处已完成也拒绝选择
    if (props.cubes_done[cube_pointed.value[0]][cube_pointed.value[1]]) {
        ElMessage({
            type: 'error',
            message: '此魔方已完成'
        })
        return
    }

    emits('choose', cube_pointed.value)
}

const drawCubeFace = () => {
    const canvas = canvasRef.value;
    const ctx = canvas.getContext('2d')
    const cellSize = STANDARD_CELL_SIZE * scale.value
    const separationLineWidth = 2 * scale.value  // 分隔线的宽度
    const smallSeparationLineWidth = scale.value  // 小分隔线的宽度
    canvas.width = canvasContainerRef.value.clientWidth
    canvas.height = canvasContainerRef.value.clientHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.translate(totalOffsetPos.value[0], totalOffsetPos.value[1])

    for (let i = 0; i < props.cube_matrix.length; i++) {
        for (let j = 0; j < props.cube_matrix[i].length; j++) {
            const value = props.cube_matrix[i][j]
            ctx.fillStyle = COLOR_DICT[value]
            // 如果绘制的方块处于被指的魔方中，且当前不是在拖拽中，则调整透明度
            if ((Math.floor(i / 3) == cube_pointed.value[0]) && (Math.floor(j / 3) == cube_pointed.value[1] && !isDragging.value)) {
                ctx.globalAlpha = 0.3
                // 但如果指中的魔方已完成，则不调整透明度
                if (props.cubes_done[cube_pointed.value[0]][cube_pointed.value[1]]) {
                    ctx.globalAlpha = 1
                }
            }
            // 如果绘制的方块没完成则调整透明度
            else if (!props.cubes_done[Math.floor(i / 3)][Math.floor(j / 3)])
                ctx.globalAlpha = 0
            else ctx.globalAlpha  = 1

            // 如果绘制的方块是客户端的任务，则标注
            if ((Math.floor(i / 3) == props.choice[0]) && Math.floor(j / 3) == props.choice[1]) {
                ctx.fillStyle = 'purple'
                ctx.globalAlpha = 1
            }
            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize)
        }
    }

    ctx.fillStyle = 'black'
    ctx.globalAlpha  = 1

    // 绘制横向分隔线
    for (let i = 0; i <= numRows.value; i++) {
        let y = i * cellSize
        if (i % 3 == 0) {
            ctx.fillRect(0, y - separationLineWidth / 2, cellSize * numCols.value, separationLineWidth)
        }

        ctx.fillRect(0, y - smallSeparationLineWidth / 2, cellSize * numCols.value, smallSeparationLineWidth)
    }

    // 绘制纵向分隔线
    for (let j = 0; j <= numCols.value; j++) {
        let x = j * cellSize
        if (j % 3 == 0) {
            ctx.fillRect(x - separationLineWidth / 2, 0, separationLineWidth, cellSize * numRows.value)
        }

        ctx.fillRect(x - smallSeparationLineWidth / 2, 0, smallSeparationLineWidth, cellSize * numRows.value)
    }
}

watch([scale, updater, totalOffsetPos], () => {
    drawCubeFace()
})
watch(cube_pointed, (value, oldValue) => {
    if ((value.toString() !== oldValue.toString()) && !is_pointed_cube_out_of_bound.value) {
        drawCubeFace()
    }
})

onMounted(() => {
    drawCubeFace()
})

</script>

<template>

  <div class="cube-canvas-container" ref="canvasContainerRef">
    <canvas ref="canvasRef"
            @mousemove="update_mouse_pos_and_drag"
            @click="choose"
            @mousedown="startDrag"
            @mouseup="endDrag"
    />
    <div class="scaler">
      <el-input-number v-model="scale" :precision="2" :step="0.01" :max="10" :min="min_scale" />
    </div>
  </div>

</template>

<style scoped>
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
