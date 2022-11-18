import axiosClient from "./axiosClient"

const queryString = require("query-string")

// API liên quan đến phần vai trò
const baseUrl = "/roles"
const rolesApi = {
    getRoleList: (params) => {
        const requestUrl = `${baseUrl}?${queryString.stringify(params)}`
        return axiosClient.get(requestUrl)
    },
    getRoleDetailById: (roleId) => {
        const requestUrl = `${baseUrl}/${roleId}`
        return axiosClient.get(requestUrl)
    },
    addRole: (roleInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, roleInfo)
    },
    updateRole: (roleInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, roleInfo)
    },
    deleteRole: (roleId) => {
        const requestUrl = `${baseUrl}/delete/${roleId}`
        return axiosClient.delete(requestUrl)
    },
    getRoleOptions: () => {
        const requestUrl = `/options`
        return axiosClient.get(requestUrl)
    }
}
//

export default rolesApi