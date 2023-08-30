import request from "@/api/index";

export async function guestLogin(){
    return request({
        url: '/guestlogin/',
        method: 'get'
    })
}
