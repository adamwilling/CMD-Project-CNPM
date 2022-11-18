import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2"

import devicesApi from "~/api/devicesApi"

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

const devicesOfDepartmentsSlice = createSlice({
    name: "devicesOfDepartments",
    initialState: {
        status: "idle",
        devicesOfDepartments: []
    },
    reducers: {
        addDeviceToList: (state, action) => {
            state.devicesOfDepartments = state.devicesOfDepartments.map((devicesOfDepartment) => {
                if (devicesOfDepartment.id === action.payload.departmentId) {
                    return {
                        ...devicesOfDepartment,
                        devices: [...devicesOfDepartment.devices, action.payload.data]
                    }
                }
                else {
                    return devicesOfDepartment
                }
            })
        },
        updateDeviceList: (state, action) => {
            state.devicesOfDepartments = state.devicesOfDepartments.map((devicesOfDepartment) => {
                if (devicesOfDepartment.id === action.payload.departmentId) {
                    return {
                        ...devicesOfDepartment,
                        devices: devicesOfDepartment.devices.map((deviceOfDepartment) => {
                            if (deviceOfDepartment.id === action.payload.data.id) {
                                return action.payload.data
                            }
                            else {
                                return deviceOfDepartment
                            }
                        })
                    }
                }
                else {
                    return devicesOfDepartment
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDeviceListOfDepartments.pending, (state, action) => {
                if (state.status !== "success") {
                    state.status = "loading"
                }
            })
            .addCase(getDeviceListOfDepartments.fulfilled, (state, action) => {
                state.devicesOfDepartments = action.payload
                state.status = "success"
            })
            .addCase(getDeviceListOfDepartments.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addDeviceToDepartment.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.devicesOfDepartments = state.devicesOfDepartments.map((devicesOfDepartment) => {
                        if (devicesOfDepartment.id === action.payload.departmentId) {
                            return {
                                ...devicesOfDepartment,
                                devices: [...devicesOfDepartment.devices, action.payload.data]
                            }
                        }
                        else {
                            return devicesOfDepartment
                        }
                    })
                    Toast.fire({
                        title: "Thêm thiết bị",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Toast.fire({
                        title: "Thêm thiết bị",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(addDeviceToDepartment.rejected, (state, action) => {
                Toast.fire({
                    title: "Thêm thiết bị",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(updateDeviceOfDepartment.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.devicesOfDepartments = state.devicesOfDepartments.map((devicesOfDepartment) => {
                        if (devicesOfDepartment.id === action.payload.departmentId) {
                            return {
                                ...devicesOfDepartment,
                                devices: devicesOfDepartment.devices.map((deviceOfDepartment) => {
                                    if (deviceOfDepartment.id === action.payload.data.id) {
                                        return action.payload.data
                                    }
                                    else {
                                        return deviceOfDepartment
                                    }
                                })
                            }
                        }
                        else {
                            return devicesOfDepartment
                        }
                    })
                    Toast.fire({
                        title: "Chỉnh sửa thiết bị",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Toast.fire({
                        title: "Chỉnh sửa thiết bị",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(updateDeviceOfDepartment.rejected, (state, action) => {
                Toast.fire({
                    title: "Chỉnh sửa thiết bị",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(deleteDeviceOfDepartment.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.devicesOfDepartments = state.devicesOfDepartments.map((devicesOfDepartment) => {
                        if (devicesOfDepartment.id === action.payload.departmentId) {
                            return {
                                ...devicesOfDepartment,
                                devices: devicesOfDepartment.devices.filter(deviceOfDepartment => deviceOfDepartment.id !== action.payload.deviceId)
                            }
                        }
                        else {
                            return devicesOfDepartment
                        }
                    })
                    Toast.fire({
                        title: "Xóa thiết bị",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Toast.fire({
                        title: "Xóa thiết bị",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(deleteDeviceOfDepartment.rejected, (state, action) => {
                Toast.fire({
                    title: "Xóa thiết bị",
                    text: action.error.message,
                    icon: "error",
                })
            })
    },
})

export default devicesOfDepartmentsSlice

export const { addDeviceToList, updateDeviceList } = devicesOfDepartmentsSlice.actions

export const getDeviceListOfDepartments = createAsyncThunk("devices/getDeviceList", async (params) => {
    const response = await devicesApi.getDeviceListOfDepartments(params)
    return response.data.data
})
export const addDeviceToDepartment = createAsyncThunk("devices/addDeviceToDepartment", async (deviceInfo) => {
    const response = await devicesApi.addDeviceToDepartment(deviceInfo)
    return { ...response.data, departmentId: deviceInfo.departmentId }
})
export const updateDeviceOfDepartment = createAsyncThunk("devices/updateDeviceOfDepartment", async (deviceInfo) => {
    const response = await devicesApi.updateDeviceOfDepartment(deviceInfo)
    return { ...response.data, departmentId: deviceInfo.departmentId }
})
export const deleteDeviceOfDepartment = createAsyncThunk("devices/deleteDeviceOfDepartment", async (data) => {
    const response = await devicesApi.deleteDeviceOfDepartment(data.deviceId)
    return { ...response.data, ...data }
})
