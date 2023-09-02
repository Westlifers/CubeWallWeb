<script setup lang="ts">
import IconCube from "@/components/icons/IconCube.vue";
import IconCommunity from "@/components/icons/IconCommunity.vue";
import DividerItem from "@/views/login/components/DividerItem.vue";
import IconWall from "@/components/icons/IconWall.vue";
</script>

<template>
  <main>
    <DividerItem>
      <template #icon>
        <IconCommunity />
      </template>
      <template #heading>Chengdu Universities Cube Union</template>
      成都高校魔方联盟（CUCU）成立于2023年，旨在为成都市乃至四川省内高校的魔方爱好者提供方便交流的平台。我们定期举办成都高校魔方赛，欢迎省内大学生报名参加！
      联盟QQ群：140028406
    </DividerItem>

    <DividerItem>
      <template #icon>
        <IconCube />
      </template>
      <template #heading>Rubik's cube</template>
      我们因魔方相聚于此
    </DividerItem>

    <DividerItem>
      <template #icon>
        <IconWall />
      </template>
      <template #heading>Cube Wall</template>
      本站的目的是提供一个方便的魔方墙搭建辅助工具。将魔方墙上传，网站会自动为进入的用户分配任务，每个用户仅需关注自己需要完成的那一面，
      所有用户的总进度会实时显示在网站上，以期减少传统方法的“难寻目标”“沟通失误”等诸多困难，提高效率。
    </DividerItem>
  </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}

</style>
