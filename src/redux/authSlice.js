/* eslint-disable react-hooks/rules-of-hooks */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2"

import authApi from "~/api/authApi"
import employeesApi from "~/api/employeesApi"

const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 10000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer)
        toast.addEventListener("mouseleave", Swal.resumeTimer)
    },
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: "idle",
        accessToken: "",
        userInfo: {},
        userId: null,
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        },
        logout: (state, action) => {
            state.status = "idle"
            state.userInfo = {}
            state.accessToken = ""
            localStorage.removeItem("accessToken")
            localStorage.removeItem("userInfo")
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                if (action.payload.id) {
                    state.status = "user"
                }
                state.userInfo = action.payload
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.status = "idle"
            })
            .addCase(login.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.status = "user"
                    state.userInfo = action.payload.data.userInfo
                    state.accessToken = "Bearer " + action.payload.data.accessToken
                    localStorage.setItem("accessToken", "Bearer " + action.payload.data.accessToken)
                    localStorage.setItem("userInfo", JSON.stringify(action.payload.data.userInfo))
                }
                else {
                    state.status = "idle"
                    Toast.fire({
                        title: "Đăng nhập",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "idle"
                Toast.fire({
                    title: "Đăng nhập",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(forgotPassword.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.status = "idle"
                    Toast.fire({
                        title: "Quên mật khẩu",
                        text: action.payload.message,
                        icon: "success",
                    })
                } else {
                    state.status = "warning"
                    Toast.fire({
                        title: "Quên mật khẩu",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.status = "error"
                Toast.fire({
                    title: "Quên mật khẩu",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(checkToken.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(checkToken.fulfilled, (state, action) => {
                state.status = action.payload.status
                if (action.payload.status === "OK") {
                    state.userId = action.payload.data.id
                    state.message = "Xác thực token thành công!"
                } else {
                    state.message = "Xác thực token thất bại!"
                }
            })
            .addCase(checkToken.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(resetPassword.pending, (state, action) => {
                if (state.status !== "OK") {
                    state.status = "loading"
                }
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.status = "success"
                    Toast.fire({
                        title: "thiết lập mật khẩu mới",
                        text: action.payload.message,
                        icon: "success",
                    })
                } else {
                    state.status = "warning"
                    Toast.fire({
                        title: "Thiết lập mật khẩu mới",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.status = "error"
                Toast.fire({
                    title: "Thiết lập mật khẩu mới",
                    text: action.error.message,
                    icon: "error",
                })
            })
    },
})

export const { setStatus, logout } = authSlice.actions

export const getUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
    const userId = JSON.parse(localStorage.getItem("userInfo")).id
    const response = await employeesApi.getEmployeeDetailById(userId)
    return response.data.data
})
export const login = createAsyncThunk("auth/login", async (userInfo) => {
    const response = await authApi.login(userInfo)
    return response.data
})
export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email) => {
    const response = await authApi.forgotPassword(email)
    return response.data
})
export const checkToken = createAsyncThunk("auth/checkToken", async (token) => {
    const response = await authApi.checkToken(token)
    return response.data
})
export const resetPassword = createAsyncThunk("auth/resetPassword", async (body) => {
    const response = await authApi.resetPassword(body)
    return response.data
})

export default authSlice
