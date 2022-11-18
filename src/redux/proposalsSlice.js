import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2"

import proposalsApi from "~/api/proposalsApi"

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

const proposalsSlice = createSlice({
    name: "proposals",
    initialState: {
        status: "idle",
        proposals: [],
        pagination: {
            page: 1,
            limit: 10,
            totalItem: 0,
        },
        countByStatuses: []
    },
    reducers: {
        addProposalToList: (state, action) => {
            if (state.pagination.page === 1) {
                state.proposals.unshift(action.payload)
                state.proposals.pop()
            }
        },
        updateProposalList: (state, action) => {
            state.proposals.forEach((proposal, index, array) => {
                if (proposal.id === action.payload.id) {
                    array[index] = action.payload
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProposalList.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getProposalList.fulfilled, (state, action) => {
                state.proposals = action.payload.proposals
                state.pagination = action.payload.pagination
                state.countByStatuses = action.payload.countByStatuses
                state.status = "success"
            })
            .addCase(getProposalList.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(getProposalListCreatedByMe.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getProposalListCreatedByMe.fulfilled, (state, action) => {
                state.proposals = action.payload.proposals
                state.pagination = action.payload.pagination
                state.countByStatuses = action.payload.countByStatuses
                state.status = "success"
            })
            .addCase(getProposalListCreatedByMe.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(getProposalListApproveByMe.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getProposalListApproveByMe.fulfilled, (state, action) => {
                state.proposals = action.payload.proposals
                state.pagination = action.payload.pagination
                state.countByStatuses = action.payload.countByStatuses
                state.status = "success"
            })
            .addCase(getProposalListApproveByMe.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addProposal.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    if (state.pagination.page === 1) {
                        state.proposals.unshift(action.payload.data)
                        state.proposals.pop()
                    }
                    Toast.fire({
                        title: "Thêm đề xuất",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Toast.fire({
                        title: "Thêm đề xuất",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(addProposal.rejected, (state, action) => {
                Toast.fire({
                    title: "Thêm đề xuất",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(updateProposal.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.proposals.forEach((proposal, index, array) => {
                        if (proposal.id === action.payload.data.id) {
                            array[index] = action.payload.data
                        }
                    })
                    Toast.fire({
                        title: "Chỉnh sửa đề xuất",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Toast.fire({
                        title: "Chỉnh sửa đề xuất",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(updateProposal.rejected, (state, action) => {
                Toast.fire({
                    title: "Chỉnh sửa đề xuất",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(deleteProposal.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.proposals = state.proposals.filter((proposal) => proposal.id !== action.payload.data)
                    Toast.fire({
                        title: "Xóa đề xuất",
                        text: action.payload.message,
                        icon: "success",
                    })
                }
                else {
                    Toast.fire({
                        title: "Xóa đề xuất",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(deleteProposal.rejected, (state, action) => {
                Toast.fire({
                    title: "Xóa đề xuất",
                    text: action.error.message,
                    icon: "error",
                })
            })
    },
})
export default proposalsSlice

export const { addProposalToList, updateProposalList } = proposalsSlice.actions

export const getProposalList = createAsyncThunk("proposals/getProposalList", async (params) => {
    const response = await proposalsApi.getProposalList(params.params, params.filters)
    return response.data.data
})
export const getProposalListCreatedByMe = createAsyncThunk("proposals/getProposalListCreatedByMe", async (params) => {
    const response = await proposalsApi.getProposalListCreatedByMe(params.params, params.filters)
    return response.data.data
})
export const getProposalListApproveByMe = createAsyncThunk("proposals/getProposalListApproveByMe", async (params) => {
    const response = await proposalsApi.getProposalListApproveByMe(params.params, params.filters)
    return response.data.data
})
export const addProposal = createAsyncThunk("proposals/addProposal", async (proposalInfo) => {
    const response = await proposalsApi.addProposal(proposalInfo)
    return response.data
})
export const updateProposal = createAsyncThunk("proposals/updateProposal", async (proposalInfo) => {
    const response = await proposalsApi.updateProposal(proposalInfo)
    console.log(proposalInfo)
    return response.data
})
export const deleteProposal = createAsyncThunk("proposals/deleteProposal", async (proposalId) => {
    const response = await proposalsApi.deleteProposal(proposalId)
    return response.data
})
