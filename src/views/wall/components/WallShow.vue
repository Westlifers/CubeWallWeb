<script setup lang="ts">
import {watch} from "vue";

const props = defineProps<{
    user_and_doing: object
    wall: number[][]
}>()

watch(props.wall, () => {console.log(props.wall)})
</script>

<template>
{{wall}}
</template>

<style scoped>

</style>
