import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2"

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

const employeesSlice = createSlice({
    name: "employees",
    initialState: {
        status: "idle",
        employees: [],
        pagination: {
            page: 1,
            limit: 10,
            totalItem: 0,
        },
    },
    reducers: {
        resetStatus: (state, action) => {
            state.status = "idle"
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEmployeeList.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getEmployeeList.fulfilled, (state, action) => {
                state.employees = action.payload.employees
                state.pagination = action.payload.pagination
                state.status = "idle"
            })
            .addCase(getEmployeeList.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addEmployee.pending, (state, action) => {
                state.status = "sending"
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    if (state.pagination.page === 1) {
                        state.employees.unshift(action.payload.data)
                        state.employees.pop()
                    }
                    Toast.fire({
                        title: "Thêm sinh viên",
                        text: action.payload.message,
                        icon: "success",
                    })
                    state.status = "success"
                } else {
                    Toast.fire({
                        title: "Thêm sinh viên",
                        text: action.payload.message,
                        icon: "warning",
                    })
                    state.status = "idle"
                }
            })
            .addCase(addEmployee.rejected, (state, action) => {
                Toast.fire({
                    title: "Thêm sinh viên",
                    text: action.error.message,
                    icon: "error",
                })
                state.status = "idle"
            })
            .addCase(updateEmployee.pending, (state, action) => {
                state.status = "sending"
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.employees.forEach((employee, index, array) => {
                        if (employee.id === action.payload.data.id) {
                            array[index] = action.payload.data
                        }
                    })
                    Toast.fire({
                        title: "Chỉnh sửa sinh viên",
                        text: action.payload.message,
                        icon: "success",
                    })
                    state.status = "success"
                } else {
                    Toast.fire({
                        title: "Chỉnh sửa sinh viên",
                        text: action.payload.message,
                        icon: "warning",
                    })
                    state.status = "idle"
                }
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                Toast.fire({
                    title: "Chỉnh sửa sinh viên",
                    text: action.error.message,
                    icon: "error",
                })
                state.status = "idle"
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.employees = state.employees.filter((employee) => employee.id !== action.payload.data)
                    Toast.fire({
                        title: "Xóa sinh viên",
                        text: action.payload.message,
                        icon: "success",
                    })
                    state.status = "success"
                } else {
                    Toast.fire({
                        title: "Xóa sinh viên",
                        text: action.payload.message,
                        icon: "warning",
                    })
                    state.status = "idle"
                }
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                Toast.fire({
                    title: "Xóa sinh viên",
                    text: action.error.message,
                    icon: "error",
                })
                state.status = "idle"
            })
    },
})
export default employeesSlice

export const { resetStatus } = employeesSlice.actions

export const getEmployeeList = createAsyncThunk("employees/getEmployeeList", async (params) => {
    const response = await employeesApi.getEmployeeList(params.params, params.filters)
    return response.data.data
})
export const addEmployee = createAsyncThunk("employees/addEmployee", async (employeeInfo) => {
    const response = await employeesApi.addEmployee(employeeInfo)
    return response.data
})
export const updateEmployee = createAsyncThunk("employees/updateEmployee", async (employeeInfo) => {
    const response = await employeesApi.updateEmployee(employeeInfo)
    return response.data
})
export const deleteEmployee = createAsyncThunk("employees/deleteEmployee", async (employeeId) => {
    const response = await employeesApi.deleteEmployee(employeeId)
    return response.data
})
