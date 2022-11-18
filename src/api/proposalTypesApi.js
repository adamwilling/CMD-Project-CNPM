import axiosClient from "./axiosClient"

const queryString = require("query-string")

// API liên quan đến phần đề xuất
let baseUrl = "/proposal-type"
const proposalTypesApi = {
    getProposalTypeList: (params) => {
        const requestUrl = `${baseUrl}/config?${queryString.stringify(params)}`
        return axiosClient.get(requestUrl)
    },
    getProposalTypePermission: () => {
        const requestUrl = `${baseUrl}/permission`
        return axiosClient.get(requestUrl)
    },
    getProposalTypeDetail: (proposalTypeId) => {
        const requestUrl = `/proposal-type-detail/${proposalTypeId}`
        return axiosClient.get(requestUrl)
    },
    addProposalType: (proposalTypeInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, proposalTypeInfo)
    },
    updateProposalType: (proposalTypeInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, proposalTypeInfo)
    },
    deleteProposalType: (proposalTypeId) => {
        const requestUrl = `${baseUrl}/delete/${proposalTypeId}`
        return axiosClient.delete(requestUrl)
    },
    // Data type
    getDataTypeList: () => {
        const requestUrl = `/data-types`
        return axiosClient.get(requestUrl)
    }
}
//

export default proposalTypesApi