import {defineStore} from 'pinia'
import type {User} from "@/types/user";


export const UserInfoStore = defineStore('userInfo', {
    state: () => ({
        userInfo: {
            username: '',
            avatar: '',
            is_scuer: false,
            is_superuser: false,
        }
    }),
    getters: {
        is_login: (state) => state.userInfo.username === '',
    },
    actions: {
        setUserInfo(userInfo: User) {
            this.userInfo = userInfo
        }
    }
})


export const wallStore = defineStore('wallStore', {

})
