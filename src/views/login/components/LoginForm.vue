<script setup lang="ts">
import {guestLogin} from "@/api/user";
import {UserInfoStore} from "@/store";
import {User} from "@/types/user";
import {computed, reactive, ref} from "vue";
import type {FormInstance} from "element-plus";
import {ElNotification} from "element-plus";
import router from "@/router";

const userInfoStore = UserInfoStore()
const is_login = computed(() => userInfoStore.is_login)
const username = computed(() => userInfoStore.userInfo.username)

const guest_login = async () => {
    const res = await guestLogin()
    const userInfo: User = {
        username: res['username'],
        is_scuer: res['is_scuer']?res['is_scuer']:false,
        is_superuser: res['is_superuser']?res['is_superuser']:false,
        avatar: res['avatar']?res['avatar']:''
    }
    userInfoStore.setUserInfo(userInfo)

    ElNotification({
        type: "success",
        message: `登录成功，游客用户名为：\n${username.value}`
    })

    await router.push({path: '/wall/1'})
}

const loginFormRef = ref<FormInstance>()
const validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
        callback(new Error("密码不少于6位"));
    } else {
        callback();
    }
};
const state = reactive({
    loginForm: {
        account: "",
        password: "",
    },

    loginRules: {
        account: [{ required: true, trigger: "blur" }],
        password: [
            {
                required: true,
                trigger: "blur",
                validator: validatePassword,
            },
        ],
    },
    passwordType: "password",
    loading: false
})

const handleLogin = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.validate((async valid => {
        if (valid) {
            state.loading = true;
            const req = {
                username: state.loginForm.account,
                password: state.loginForm.password,
            };
            try {
                console.log('logged in')
            } catch (e) {
                console.log('login failed')
            }
        }
    }))

}
</script>

<template>
  <el-form
      ref="loginFormRef"
      :model="state.loginForm"
      :rules="state.loginRules"
      label-width="100px"
      class="loginForm sign-in-form"
  >
    <div class="form-header">
      SCUCA账户登录
    </div>
    <el-form-item label="账号" prop="account">
      <el-input
          v-model="state.loginForm.account"
          placeholder="输入用户名..."
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
          v-model="state.loginForm.password"
          type="password"
          placeholder="输入密码..."
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button
          @click="handleLogin(loginFormRef)"
          type="primary"
          disabled
      >登录</el-button
      >
      <el-button
          @click="guest_login"
          type="warning"
      >快速登录</el-button>
    </el-form-item>

    <!-- 找回密码 -->
    <div class="tiparea">
      <p>忘记密码？ <a>立即找回</a></p>
    </div>
  </el-form>
</template>

<style scoped>
.loginForm {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0 5px 10px #cccc;
}

.tiparea {
    text-align: right;
    font-size: 12px;
    color: #333;
}
.tiparea p a {
    color: #409eff;
}
.form-header {
    width: 100%;
    height: 10%;
    text-align: center;
    margin: 0 0 10px 0;
    font-weight: 500;
}
</style>
