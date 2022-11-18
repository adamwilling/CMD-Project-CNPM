import axiosClient from "./axiosClient"

const queryString = require("query-string")

// API liên quan đến phần thiết bị
const baseUrl = "/departments/devices"
const devicesApi = {
    getDeviceList: (params) => {
        const requestUrl = `/devices`
        return axiosClient.get(requestUrl)
    },
    getDeviceListOfDepartments: () => {
        const requestUrl = `${baseUrl}`
        return axiosClient.get(requestUrl)
    },
    addDeviceToDepartment: (deviceInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, deviceInfo)
    },
    updateDeviceOfDepartment: (deviceInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, deviceInfo)
    },
    deleteDeviceOfDepartment: (deviceId) => {
        const requestUrl = `${baseUrl}/delete/${deviceId}`
        return axiosClient.delete(requestUrl)
    }
}
//

export default devicesApi