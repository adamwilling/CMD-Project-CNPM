import axiosClient from "./axiosClient"

const baseUrl =  "/api/auth"
const authApi = {
    login: (userInfo) => {
        const requestUrl = `${baseUrl}/signin`
        return axiosClient.post(requestUrl, userInfo)
    },
    changePassword: (data) => {
        const requestUrl = `${baseUrl}/change-password`
        return axiosClient.post(requestUrl, data)
    },
    forgotPassword: (body) => {
        const requestUrl = `${baseUrl}/forgot_password`
        return axiosClient.post(requestUrl,body)
    },
    checkToken: (token) => {
        const requestUrl = `${baseUrl}/reset_password?token=${token}`
        return axiosClient.get(requestUrl)
    },
    resetPassword: (body) => {
        const requestUrl = `${baseUrl}/reset_password`
        return axiosClient.post(requestUrl, body)
    }
}

export default authApi