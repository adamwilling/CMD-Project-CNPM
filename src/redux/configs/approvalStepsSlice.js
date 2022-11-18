import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2"

import approvalStepsApi from "~/api/appprovalStepsApi"

const approvalStepsSlice = createSlice({
    name: "approvalSteps",
    initialState: {
        status: "idle",
        approvalSteps: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(getApprovalStepList.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getApprovalStepList.fulfilled, (state, action) => {
                state.approvalSteps = action.payload
                state.status = "success"
            })
            .addCase(getApprovalStepList.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addApprovalStep.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.approvalSteps.push(action.payload.data)
                    Swal.fire({
                        title: "Thêm bước duyệt",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Swal.fire({
                        title: "Thêm bước duyệt",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(addApprovalStep.rejected, (state, action) => {
                Swal.fire({
                    title: "Thêm bước duyệt",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(updateApprovalStep.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.approvalSteps.forEach((approvalStep, index, array) => {
                        if (approvalStep.id === action.payload.data.id) {
                            array[index] = action.payload.data
                        }
                    })
                    Swal.fire({
                        title: "Chỉnh sửa bước duyệt",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Swal.fire({
                        title: "Chỉnh sửa bước duyệt",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(updateApprovalStep.rejected, (state, action) => {
                Swal.fire({
                    title: "Chỉnh sửa bước duyệt",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(deleteApprovalStep.fulfilled, (state, action) => {
                console.log(action.payload)
                if (action.payload.data.status === "OK") {
                    state.approvalSteps = state.approvalSteps.filter((approvalStep) => approvalStep.id !== action.payload.id)
                    Swal.fire({
                        title: "Xóa bước duyệt",
                        text: action.payload.data.message,
                        icon: "success",
                    })
                }
                else {
                    Swal.fire({
                        title: "Xóa bước duyệt",
                        text: action.payload.data.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(deleteApprovalStep.rejected, (state, action) => {
                Swal.fire({
                    title: "Xóa bước duyệt",
                    text: action.payload.message,
                    icon: "error",
                })
            })
    },
})
export default approvalStepsSlice

export const getApprovalStepList = createAsyncThunk("approvalSteps/getApprovalStepList", async (proposalTypeId) => {
    const response = await approvalStepsApi.getApprovalStepList(proposalTypeId)
    return response.data.data
})
export const addApprovalStep = createAsyncThunk("approvalSteps/addApprovalStep", async (approvalStepInfo) => {
    const response = await approvalStepsApi.addApprovalStep(approvalStepInfo)
    return response.data
})
export const updateApprovalStep = createAsyncThunk("approvalSteps/updateApprovalStep", async (approvalStepInfo) => {
    const response = await approvalStepsApi.updateApprovalStep(approvalStepInfo)
    return response.data
})
export const deleteApprovalStep = createAsyncThunk("approvalSteps/deleteApprovalStep", async (approvalStepId) => {
    const response = await approvalStepsApi.deleteApprovalStep(approvalStepId)
    return {
        id: approvalStepId,
        data: response.data
    }
})