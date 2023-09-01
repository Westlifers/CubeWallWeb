<script setup lang="ts">
import {watch} from "vue";
import CubeFace from "@/views/wall/components/CubeFace.vue";

const props = defineProps<{
    user_and_doing: object
    wall: number[][]
}>()

watch(props.wall, () => {console.log(props.wall)})
</script>

<template>
<CubeFace :cube_matrix="wall" />
</template>

<style scoped>

</style>
