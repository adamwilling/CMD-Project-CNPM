import axios from "axios"
import axiosClient from "./axiosClient"

const queryString = require("query-string")

// API liên quan đến phần sinh viên
const baseUrl = "/employees"
const employeesApi = {
    getEmployeeList: (params, filters) => {
        const requestUrl = `${baseUrl}?${queryString.stringify(params)}`
        return axiosClient.post(requestUrl, filters)
    },
    getEmployeeListToDownload: (params, filters) => {
        const requestUrl = `${baseUrl}/download?${queryString.stringify(params)}`
        return axiosClient.post(requestUrl, filters)
    },
    getEmployeeListByName: (employeeName) => {
        const requestUrl = `${baseUrl}/name?name=${employeeName}`
        return axiosClient.get(requestUrl)
    },
    getEmployeeDetailById: (employeeId) => {
        const requestUrl = `${baseUrl}/${employeeId}`
        return axiosClient.get(requestUrl)
    },
    addEmployee: (employeeInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, employeeInfo)
    },
    updateEmployee: (employeeInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, employeeInfo)
    },
    deleteEmployee: (employeeId) => {
        const requestUrl = `${baseUrl}/delete/${employeeId}`
        return axiosClient.delete(requestUrl)
    },
    importEmployeeList: (formData) => {
        const requestUrl = `${baseUrl}/import`
        return axiosClient.post(requestUrl, formData)
    },
    uploadAvatar: (formData) => {
        const requestUrl = `/api/upload-images`
        return axiosClient.post(requestUrl, formData)
    }
}
//

export default employeesApi