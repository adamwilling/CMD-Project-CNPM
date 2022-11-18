import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2"

import proposalTypesApi from "~/api/proposalTypesApi"

const proposalTypesSlice = createSlice({
    name: "proposalTypes",
    initialState: {
        status: "idle",
        proposalTypes: [],
        // pagination: {
        //     page: 1,
        //     limit: 10,
        //     totalItem: 0,
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProposalTypeList.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getProposalTypeList.fulfilled, (state, action) => {
                state.proposalTypes = action.payload
                state.status = "success"
            })
            .addCase(getProposalTypeList.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addProposalType.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    if (state.pagination.page === 1) {
                        state.proposalTypes.unshift(action.payload.data)
                        state.proposalTypes.pop()
                    }
                    Swal.fire({
                        title: "Thêm loại đề xuất",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Swal.fire({
                        title: "Thêm loại đề xuất",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(addProposalType.rejected, (state, action) => {
                Swal.fire({
                    title: "Thêm loại đề xuất",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(updateProposalType.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.proposalTypes.forEach((proposalType, index, array) => {
                        if (proposalType.id === action.payload.data.id) {
                            array[index] = action.payload.data
                        }
                    })
                    Swal.fire({
                        title: "Chỉnh sửa loại đề xuất",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Swal.fire({
                        title: "Chỉnh sửa loại đề xuất",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(updateProposalType.rejected, (state, action) => {
                Swal.fire({
                    title: "Chỉnh sửa loại đề xuất",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(deleteProposalType.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.proposalTypes = state.proposalTypes.filter((proposalType) => proposalType.id !== action.payload.data)
                    Swal.fire({
                        title: "Xóa loại đề xuất",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Swal.fire({
                        title: "Xóa loại đề xuất",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(deleteProposalType.rejected, (state, action) => {
                Swal.fire({
                    title: "Xóa loại đề xuất",
                    text: action.payload.message,
                    icon: "error",
                })
            })
    },
})
export default proposalTypesSlice

export const getProposalTypeList = createAsyncThunk("proposalTypes/getProposalTypeList", async (params) => {
    const response = await proposalTypesApi.getProposalTypeList(params.params)
    return response.data.data
})
export const addProposalType = createAsyncThunk("proposalTypes/addProposalType", async (proposalTypeInfo) => {
    const response = await proposalTypesApi.addProposalType(proposalTypeInfo)
    return response.data
})
export const updateProposalType = createAsyncThunk("proposalTypes/updateProposalType", async (proposalTypeInfo) => {
    const response = await proposalTypesApi.updateProposalType(proposalTypeInfo)
    return response.data
})
export const deleteProposalType = createAsyncThunk("proposalTypes/deleteProposalType", async (proposalTypeId) => {
    const response = await proposalTypesApi.deleteProposalType(proposalTypeId)
    return response.data
})
