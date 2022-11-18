import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2"

import notifiesApi from "~/api/notifiesApi"

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

const notifiesSlice = createSlice({
    name: "notifies",
    initialState: {
        status: "idle",
        notifies: [],
        pagination: {
            page: 1,
            limit: 10,
            totalItem: 0,
        },
        countUnread: 0
    },
    reducers: {
        addNotifyToList: (state, action) => {
            if (state.pagination.page === 1) {
                state.notifies.unshift(action.payload)
                state.notifies.pop()
            }
        },
        updateNotifyList: (state, action) => {
            state.notifies.forEach((notify, index, array) => {
                if (notify.id === action.payload.id) {
                    array[index] = action.payload
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotifyList.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getNotifyList.fulfilled, (state, action) => {
                state.notifies = action.payload.items
                state.pagination = action.payload.pagination
                state.countUnread = action.payload.countUnread
                state.status = "success"
            })
            .addCase(getNotifyList.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(markAllRead.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(markAllRead.fulfilled, (state, action) => {
                state.notifies = state.notifies.map((notify) => ({
                    ...notify,
                    isRead: true
                }))
                state.countUnread = 0
                state.status = "success"
            })
            .addCase(markRead.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(markRead.fulfilled, (state, action) => {
                state.notifies = state.notifies.map((notify) => {
                    if (action.payload.includes(notify.id)) {
                        state.countUnread -= 1
                        return {
                            ...notify,
                            isRead: true
                        }
                    }
                    else {
                        return notify
                    }
                })
                state.status = "success"
            })
            .addCase(deleteNotify.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.notifies = state.notifies.filter((notify) => !action.payload.data.includes(notify.id))
                    Toast.fire({
                        title: "Xóa thông báo",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Toast.fire({
                        title: "Xóa thông báo",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(deleteNotify.rejected, (state, action) => {
                console.log(action)
                Toast.fire({
                    title: "Xóa thông báo",
                    text: action.error.message,
                    icon: "error",
                })
            })
    },
})
export default notifiesSlice

export const { addNotifyToList, updateNotifyList } = notifiesSlice.actions

export const getNotifyList = createAsyncThunk("notifies/getNotifyList", async (params) => {
    const response = await notifiesApi.getNotifyList(params)
    return response.data.data
})
export const markAllRead = createAsyncThunk("notifies/markAllRead", async () => {
    const response = await notifiesApi.markAllRead()
    return response.data.data
})
export const markRead = createAsyncThunk("notifies/markRead", async (notifyIds) => {
    const response = await notifiesApi.markRead(notifyIds)
    return response.data.data
})
export const deleteNotify = createAsyncThunk("notifies/deleteNotify", async (notifyIds) => {
    const response = await notifiesApi.deleteNotify(notifyIds)
    return response.data
})
