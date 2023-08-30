<script setup lang="ts">

import LoginForm from "@/views/login/components/LoginForm.vue";
import MiddleDivider from "@/views/login/components/MiddleDivider.vue";
</script>

<template>
  <div class="login-view">
    <div class="login-view-left">
      <img src="@/assets/logo.svg" alt="这是一张图片">
    </div>

    <div class="login-view-middle">
      <MiddleDivider />
    </div>

    <div class="login-view-right">
      <LoginForm />
    </div>
  </div>

</template>

<style scoped>
.login-view {
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
}

.login-view-left, .login-view-right {
    width: 45%;
}

.login-view-right {
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-view-left {
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-view-left img {
    scale: 170%;
    transform: translateX(10%);
}

@media (min-width: 1024px) {
    .login-view-middle {
        max-width: 40%;
    }
}

@media (max-width: 1024px) {
    .login-view {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .login-view-right {
        width: 100%;
    }

    img {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
    }
}
</style>
