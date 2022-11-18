import axiosClient from "./axiosClient"

// API liên quan đến phần bước duyệt
let baseUrl = "/proposaal-type-step-config"
const approvalStepsApi = {
    // Lấy danh sách người có thể chọn trong phần chọn người có thể tạo và duyệt đề xuất/bước duyệt
    getApprovalOption: (name) => {
        const requestUrl = `/approval-option?name=${name}`
        return axiosClient.get(requestUrl)
    },
    getApprovalStepList: (proposalTypeId) => {
        const requestUrl = `${baseUrl}?proposalTypeId=${proposalTypeId}`
        return axiosClient.get(requestUrl)
    },
    addApprovalStep: (approvalStepInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, approvalStepInfo)
    },
    updateApprovalStep: (approvalStepInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, approvalStepInfo)
    },
    deleteApprovalStep: (approvalStepId) => {
        const requestUrl = `${baseUrl}/delete/${approvalStepId}`
        return axiosClient.delete(requestUrl)
    }
}
//

export default approvalStepsApi