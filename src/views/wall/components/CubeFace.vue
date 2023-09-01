<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';
import {TwistyPlayer} from 'cubing/twisty';

const uniqueId = 'twisty-player-' + (new Date()).getTime().toString();

const container = ref<HTMLElement | null>(null);
const player = ref<TwistyPlayer | null>(null);

const params = computed(() => {
    return {
        puzzle: "3x3x3",
        alg: props.alg,
        visualization: "2D",
    }
})

onMounted(() => {
    if (container.value) {
        player.value = new TwistyPlayer(params.value);
        if ("appendChild" in container.value) {
            container.value.appendChild(player.value);
        }
    }
});

watch([() => props.alg], () => {
    if (container.value && player.value) {
        if ("removeChild" in container.value) {
            container.value.removeChild(player.value);
        }
        player.value = new TwistyPlayer(params.value);
        if ("appendChild" in container.value) {
            container.value.appendChild(player.value);
        }
    }
});

const props = defineProps<{
    alg: string;
    cube_matrix: number[][]
}>();
</script>

<template>
  <div class="twisty-player">
    <div :id="uniqueId" ref="container"></div>
  </div>
</template>

<style scoped>
.twisty-player {
    /* 16:9 aspect ratio */
    position: relative;
    padding-bottom: max(56.25%, 200px);
    height: 0;
    overflow: hidden;
}
.twisty-player div {
    /* clip 10% of the bottom */
    clip-path: polygon(0 0, 100% 0, 100% 78%, 0 78%);
}
</style>
