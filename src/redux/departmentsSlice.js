import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2"

import departmentsApi from "~/api/departmentsApi"

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

const departmentsSlice = createSlice({
    name: "departments",
    initialState: {
        status: "idle",
        departments: []
    },
    reducers: {
        addDepartmentToList: (state, action) => {
            state.departments.push(action.payload)
        },
        updateDepartmentList: (state, action) => {
            state.departments.forEach((department, index, array) => {
                if (department.id === action.payload.id) {
                    array[index] = action.payload
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDepartmentList.pending, (state, action) => {
                if (state.status !== "success") {
                    state.status = "loading"
                }
            })
            .addCase(getDepartmentList.fulfilled, (state, action) => {
                state.departments = action.payload
                state.status = "success"
            })
            .addCase(getDepartmentList.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addDepartment.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.departments.push(action.payload.data)
                    Toast.fire({
                        title: "Thêm phòng ban",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Toast.fire({
                        title: "Thêm phòng ban",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(addDepartment.rejected, (state, action) => {
                Toast.fire({
                    title: "Thêm phòng ban",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(updateDepartment.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.departments.forEach((department, index, array) => {
                        if (department.id === action.payload.data.id) {
                            array[index] = action.payload.data
                        }
                    })
                    Toast.fire({
                        title: "Chỉnh sửa phòng ban",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Toast.fire({
                        title: "Chỉnh sửa phòng ban",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(updateDepartment.rejected, (state, action) => {
                Toast.fire({
                    title: "Chỉnh sửa phòng ban",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(deleteDepartment.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.departments = state.departments.filter((department) => department.id !== action.payload.data)
                    Toast.fire({
                        title: "Xóa phòng ban",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Toast.fire({
                        title: "Xóa phòng ban",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(deleteDepartment.rejected, (state, action) => {
                Toast.fire({
                    title: "Xóa phòng ban",
                    text: action.error.message,
                    icon: "error",
                })
            })
    },
})

export default departmentsSlice

export const { addDepartmentToList, updateDepartmentList } = departmentsSlice.actions

export const getDepartmentList = createAsyncThunk("departments/getDepartmentList", async (params) => {
    const response = await departmentsApi.getDepartmentList(params)
    return response.data.data
})
export const addDepartment = createAsyncThunk("departments/addDepartment", async (departmentInfo) => {
    const response = await departmentsApi.addDepartment(departmentInfo)
    return response.data
})
export const updateDepartment = createAsyncThunk("departments/updateDepartment", async (departmentInfo) => {
    const response = await departmentsApi.updateDepartment(departmentInfo)
    return response.data
})
export const deleteDepartment = createAsyncThunk("departments/deleteDepartment", async (departmentId) => {
    const response = await departmentsApi.deleteDepartment(departmentId)
    return response.data
})
