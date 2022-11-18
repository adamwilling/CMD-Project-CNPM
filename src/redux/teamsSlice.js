import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2"

import teamsApi from "~/api/teamsApi"

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

const teamsSlice = createSlice({
    name: "teams",
    initialState: {
        status: "idle",
        teams: []
    },
    reducers: {
        addTeamToList: (state, action) => {
                state.teams.push(action.payload)
        },
        updateTeamList: (state, action) => {
            state.teams.forEach((team, index, array) => {
                if (team.id === action.payload.id) {
                    array[index] = action.payload
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTeamList.pending, (state, action) => {
                if (state.status !== "success") {
                    state.status = "loading"
                } 
            })
            .addCase(getTeamList.fulfilled, (state, action) => {
                state.teams = action.payload
                state.status = "success"
            })
            .addCase(getTeamList.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addTeam.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                        state.teams.push(action.payload.data)
                    Toast.fire({
                        title: "Thêm đội nhóm",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Toast.fire({
                        title: "Thêm đội nhóm",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(addTeam.rejected, (state, action) => {
                Toast.fire({
                    title: "Thêm đội nhóm",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(updateTeam.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.teams.forEach((team, index, array) => {
                        if (team.id === action.payload.id) {
                            array[index] = action.payload
                        }
                    })
                    Toast.fire({
                        title: "Chỉnh sửa đội nhóm",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Toast.fire({
                        title: "Chỉnh sửa đội nhóm",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(updateTeam.rejected, (state, action) => {
                Toast.fire({
                    title: "Chỉnh sửa đội nhóm",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(deleteTeam.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.teams = state.teams.filter((team) => team.id !== action.payload.id)
                    Toast.fire({
                        title: "Xóa đội nhóm",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Toast.fire({
                        title: "Xóa đội nhóm",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(deleteTeam.rejected, (state, action) => {
                Toast.fire({
                    title: "Xóa đội nhóm",
                    text: action.error.message,
                    icon: "error",
                })
            })
    },
})
export default teamsSlice

export const { addTeamToList, updateTeamList } = teamsSlice.actions

export const getTeamList = createAsyncThunk("teams/getTeamList", async (params) => {
    const response = await teamsApi.getTeamList(params)
    return response.data.data
})
export const addTeam = createAsyncThunk("teams/addTeam", async (teamInfo) => {
    const response = await teamsApi.addTeam(teamInfo)
    return response.data
})
export const updateTeam = createAsyncThunk("teams/updateTeam", async (teamInfo) => {
    const response = await teamsApi.updateTeam(teamInfo)
    return response.data
})
export const deleteTeam = createAsyncThunk("teams/deleteTeam", async (teamId) => {
    const response = await teamsApi.deleteTeam(teamId)
    return { ...response.data, id: teamId }
})
