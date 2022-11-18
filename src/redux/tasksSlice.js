import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2"

import tasksApi from "~/api/tasksApi"

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

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        status: "idle",
        tasks: [],
        pagination: {
            page: 1,
            limit: 10,
            totalItem: 0,
        },
        countByStatuses: [],
        discussions: [],
        reminders: [],
    },
    reducers: {
        resetStatus: (state, action) => {
            state.status = "idle"
        },
        addTaskToList: (state, action) => {
            if (state.pagination.page === 1) {
                state.tasks.unshift(action.payload)
                state.tasks.pop()
            }
        },
        updateTaskList: (state, action) => {
            state.tasks.forEach((task, index, array) => {
                if (task.id === action.payload.id) {
                    array[index] = action.payload
                }
            })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTaskList.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getTaskList.fulfilled, (state, action) => {
                state.tasks = action.payload.tasks
                state.pagination = action.payload.pagination
                state.countByStatuses = action.payload.countByStatuses
                state.status = "idle"
            })
            .addCase(getTaskList.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(getTaskListCreatedByMe.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getTaskListCreatedByMe.fulfilled, (state, action) => {
                state.tasks = action.payload.tasks
                state.pagination = action.payload.pagination
                state.countByStatuses = action.payload.countByStatuses
                state.status = "idle"
            })
            .addCase(getTaskListCreatedByMe.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(getTaskListAssignedToMe.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getTaskListAssignedToMe.fulfilled, (state, action) => {
                state.tasks = action.payload.tasks
                state.pagination = action.payload.pagination
                state.countByStatuses = action.payload.countByStatuses
                state.status = "idle"
            })
            .addCase(getTaskListAssignedToMe.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addTask.pending, (state, action) => {
                state.status = "sending"
            })
            .addCase(addTask.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    if (state.pagination.page === 1) {
                        state.tasks.unshift(action.payload.data)
                        state.tasks.pop()
                    }
                    Toast.fire({
                        title: "Thêm công việc",
                        text: action.payload.message,
                        icon: "success",
                    })
                    state.status = "success"
                } else {
                    Toast.fire({
                        title: "Thêm công việc",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(addTask.rejected, (state, action) => {
                Toast.fire({
                    title: "Thêm công việc",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(updateTask.pending, (state, action) => {
                state.status = "sending"
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.tasks.forEach((task, index, array) => {
                        if (task.id === action.payload.data.id) {
                            array[index] = action.payload.data
                        }
                    })
                    Toast.fire({
                        title: "Chỉnh sửa công việc",
                        text: action.payload.message,
                        icon: "success",
                    })
                    state.status = "success"
                } else {
                    Toast.fire({
                        title: "Chỉnh sửa công việc",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                Toast.fire({
                    title: "Chỉnh sửa công việc",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.tasks = state.tasks.filter((task) => task.id !== action.payload.data)
                    Toast.fire({
                        title: "Xóa công việc",
                        text: action.payload.message,
                        icon: "success",
                    })
                } else {
                    Toast.fire({
                        title: "Xóa công việc",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(deleteTask.rejected, (state, action) => {
                Toast.fire({
                    title: "Xóa công việc",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(getTaskDiscussion.pending, (state, action) => {
                state.status = "loadingDiscussion"
            })
            .addCase(getTaskDiscussion.fulfilled, (state, action) => {
                state.discussions = action.payload
                state.status = "idle"
            })
            .addCase(getTaskDiscussion.rejected, (state, action) => {
                state.status = "errorDiscussion"
            })
            .addCase(addDiscussion.pending, (state, action) => {
                state.status = "sending"
            })
            .addCase(addDiscussion.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.discussions = action.payload.data
                    state.status = "success"
                } else {
                    Toast.fire({
                        title: "Thảo luận",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(addDiscussion.rejected, (state, action) => {
                Toast.fire({
                    title: "Thảo luận",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(getTaskReminders.pending, (state, action) => {
                state.status = "loadingReminders"
            })
            .addCase(getTaskReminders.fulfilled, (state, action) => {
                state.reminders = action.payload
                state.status = "idle"
            })
            .addCase(getTaskReminders.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addTaskReminder.pending, (state, action) => {
                state.status = "sending"
            })
            .addCase(addTaskReminder.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    if (state.pagination.page === 1) {
                        state.reminders = action.payload.data
                    }
                    Toast.fire({
                        title: "Thêm nhắc nhở công việc",
                        text: action.payload.message,
                        icon: "success",
                    })
                    state.status = "success"
                } else {
                    Toast.fire({
                        title: "Thêm nhắc nhở công việc",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(addTaskReminder.rejected, (state, action) => {
                Toast.fire({
                    title: "Thêm nhắc nhở công việc",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(updateTaskReminder.pending, (state, action) => {
                state.status = "sending"
            })
            .addCase(updateTaskReminder.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.reminders.forEach((task, index, array) => {
                        if (task.id === action.payload.data.id) {
                            array[index] = action.payload.data
                        }
                    })
                    Toast.fire({
                        title: "Chỉnh sửa nhắc nhở công việc",
                        text: action.payload.message,
                        icon: "success",
                    })
                    state.status = "success"
                } else {
                    state.status = "idle"
                    Toast.fire({
                        title: "Chỉnh sửa nhắc nhở công việc",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(updateTaskReminder.rejected, (state, action) => {
                Toast.fire({
                    title: "Chỉnh sửa nhắc nhở công việc",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(deleteTaskReminder.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.reminders = state.reminders.filter((reminder) => reminder.id !== action.payload.data)
                    Toast.fire({
                        title: "Xóa nhắc nhở công việc",
                        text: action.payload.message,
                        icon: "success",
                    })
                } else {
                    Toast.fire({
                        title: "Xóa nhắc nhở công việc",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(deleteTaskReminder.rejected, (state, action) => {
                Toast.fire({
                    title: "Xóa nhắc nhở công việc",
                    text: action.error.message,
                    icon: "error",
                })
            })
    },
})
export default tasksSlice

export const { resetStatus, addTaskToList, updateTaskList } = tasksSlice.actions

export const getTaskList = createAsyncThunk("tasks/getTaskList", async (params) => {
    const response = await tasksApi.getTaskList(params.params, params.filters)
    return response.data.data
})
export const getTaskListCreatedByMe = createAsyncThunk("tasks/getTaskListCreatedByMe", async (params) => {
    const response = await tasksApi.getTaskListCreatedByMe(params.params, params.filters)
    return response.data.data
})
export const getTaskListAssignedToMe = createAsyncThunk("tasks/getTaskListAssignedToMe", async (params) => {
    const response = await tasksApi.getTaskListAssignedToMe(params.params, params.filters)
    return response.data.data
})

export const getTaskDiscussion = createAsyncThunk("tasks/getTaskDiscussion", async (taskId) => {
    const response = await tasksApi.getTaskDiscussion(taskId)
    return response.data.data
})
export const addDiscussion = createAsyncThunk("tasks/addDiscussion", async (taskInfo) => {
    const response = await tasksApi.addDiscussion(taskInfo)
    return response.data
})

export const addTask = createAsyncThunk("tasks/addTask", async (taskInfo) => {
    const response = await tasksApi.addTask(taskInfo)
    return response.data
})
export const updateTask = createAsyncThunk("tasks/updateTask", async (taskInfo) => {
    const response = await tasksApi.updateTask(taskInfo)
    return response.data
})
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId) => {
    const response = await tasksApi.deleteTask(taskId)
    return response.data
})

export const getTaskReminders = createAsyncThunk("tasks/getTaskReminders", async (taskId) => {
    const response = await tasksApi.getTaskReminders(taskId)
    return response.data.data
})
export const addTaskReminder = createAsyncThunk("tasks/addTaskReminder", async (remindeInfo) => {
    const response = await tasksApi.addTaskReminder(remindeInfo)
    return response.data
})
export const updateTaskReminder = createAsyncThunk("tasks/updateTaskReminder", async (remindeInfo) => {
    const response = await tasksApi.updateTaskReminder(remindeInfo)
    return response.data
})
export const deleteTaskReminder = createAsyncThunk("tasks/deleteTaskReminder", async (reminderId) => {
    const response = await tasksApi.deleteTaskReminder(reminderId)
    return response.data
})
