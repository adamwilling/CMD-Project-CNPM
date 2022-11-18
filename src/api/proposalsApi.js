import axiosClient from "./axiosClient"

const queryString = require("query-string")

// API liên quan đến phần đề xuất
const baseUrl = "/proposals"
const proposalsApi = {
    getProposalList: (params, filters) => {
        const requestUrl = `${baseUrl}?${queryString.stringify(params)}`
        return axiosClient.post(requestUrl, filters)
    },
    getProposalListCreatedByMe: (params, filters) => {
        const requestUrl = `${baseUrl}/createdByMe?${queryString.stringify(params)}`
        return axiosClient.post(requestUrl, filters)
    },
    getProposalListApproveByMe: (params, filters) => {
        const requestUrl = `${baseUrl}/approveByMe?${queryString.stringify(params)}`
        return axiosClient.post(requestUrl, filters)
    },
    getProposalDetailById: (proposalId) => {
        const requestUrl = `${baseUrl}/${proposalId}`
        return axiosClient.get(requestUrl)
    },
    getStatusList: () => {
        const requestUrl = `/status/proposal`
        return axiosClient.get(requestUrl)
    },
    addProposal: (proposalInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, proposalInfo)
    },
    updateProposal: (proposalInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, proposalInfo)
    },
    deleteProposal: (proposalId) => {
        const requestUrl = `${baseUrl}/delete/${proposalId}`
        return axiosClient.delete(requestUrl)
    },
    acceptProposal: (proposalId) => {
        const requestUrl = `${baseUrl}/accept/${proposalId}`
        return axiosClient.put(requestUrl)
    },
    denyProposal: (data) => {
        const requestUrl = `${baseUrl}/denied`
        return axiosClient.put(requestUrl, data)
    },
    cancelProposal: (data) => {
        const requestUrl = `${baseUrl}/cancel`
        return axiosClient.put(requestUrl, data)
    },
    checkPermissionApprove: (proposalId) => {
        const requestUrl = `${baseUrl}/checkPermissionApprove/${proposalId}`
        return axiosClient.get(requestUrl)
    }
}
//

export default proposalsApi