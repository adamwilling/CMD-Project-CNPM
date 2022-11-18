import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2"

import rolesApi from "~/api/rolesApi"

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 10000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
})

const rolesSlice = createSlice({
    name: "roles",
    initialState: {
        status: "idle",
        roles: [],
        pagination: {
            page: 1,
            limit: 10,
            totalItem: 0,
        },
    },
    reducers: {
        addRoleToList: (state, action) => {
            if (state.pagination.page === 1) {
                state.roles.unshift(action.payload)
                state.roles.pop()
            }
        },
        updateRoleList: (state, action) => {
            state.roles.forEach((role, index, array) => {
                if (role.id === action.payload.id) {
                    array[index] = action.payload
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoleList.pending, (state, action) => {
                if (state.status !== "success") {
                    state.status = "loading"
                }
            })
            .addCase(getRoleList.fulfilled, (state, action) => {
                state.roles = action.payload.roles
                state.pagination = action.payload.pagination
                state.status = "success"
            })
            .addCase(getRoleList.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addRole.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    if (state.pagination.page === 1) {
                        state.roles.unshift(action.payload.data)
                        state.roles.pop()
                    }
                    Toast.fire({
                        title: "Thêm vai trò",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Toast.fire({
                        title: "Thêm vai trò",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(addRole.rejected, (state, action) => {
                Toast.fire({
                    title: "Thêm vai trò",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.roles.forEach((role, index, array) => {
                        if (role.id === action.payload.data.id) {
                            array[index] = action.payload.data
                        }
                    })
                    Toast.fire({
                        title: "Chỉnh sửa vai trò",
                        text: action.payload.message,
                        icon: "success",
                    })
                    window.location.reload()
                }
                else {
                    Toast.fire({
                        title: "Chỉnh sửa vai trò",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(updateRole.rejected, (state, action) => {
                Toast.fire({
                    title: "Chỉnh sửa vai trò",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(deleteRole.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.roles = state.roles.filter((role) => role.id !== action.payload.data)
                    Toast.fire({
                        title: "Xóa vai trò",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Toast.fire({
                        title: "Xóa vai trò",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(deleteRole.rejected, (state, action) => {
                Toast.fire({
                    title: "Xóa vai trò",
                    text: action.error.message,
                    icon: "error",
                })
            })
    },
})
export default rolesSlice

export const { addRoleToList, updateRoleList } = rolesSlice.actions

export const getRoleList = createAsyncThunk("roles/getRoleList", async (params) => {
    const response = await rolesApi.getRoleList(params)
    return response.data.data
})
export const addRole = createAsyncThunk("roles/addRole", async (roleInfo) => {
    const response = await rolesApi.addRole(roleInfo)
    return response.data
})
export const updateRole = createAsyncThunk("roles/updateRole", async (roleInfo) => {
    const response = await rolesApi.updateRole(roleInfo)
    return response.data
})
export const deleteRole = createAsyncThunk("roles/deleteRole", async (roleId) => {
    const response = await rolesApi.deleteRole(roleId)
    return response.data
})
