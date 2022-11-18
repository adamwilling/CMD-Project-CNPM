import axiosClient from "./axiosClient"

const queryString = require("query-string")

// API liên quan đến phần công việc
const baseUrl = "/tasks"
const tasksApi = {
    getTaskList: (params, filters) => {
        const requestUrl = `${baseUrl}?${queryString.stringify(params)}`
        return axiosClient.post(requestUrl, filters)
    },
    getTaskListCreatedByMe: (params, filters) => {
        const requestUrl = `${baseUrl}/created-by-me?${queryString.stringify(params)}`
        return axiosClient.post(requestUrl, filters)
    },
    getTaskListAssignedToMe: (params, filters) => {
        const requestUrl = `${baseUrl}/assiged-to-me?${queryString.stringify(params)}`
        return axiosClient.post(requestUrl, filters)
    },
    getTaskDetailById: (taskId) => {
        const requestUrl = `${baseUrl}/${taskId}`
        return axiosClient.get(requestUrl)
    },
    getStatusList: () => {
        const requestUrl = `/status/task`
        return axiosClient.get(requestUrl)
    },
    addTask: (taskInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, taskInfo)
    },
    updateTask: (taskInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, taskInfo)
    },
    deleteTask: (taskId) => {
        const requestUrl = `${baseUrl}/delete/${taskId}`
        return axiosClient.delete(requestUrl)
    },
    receiveTask: (taskId) => {
        const requestUrl = `${baseUrl}/changeStatus/${taskId}`
        return axiosClient.get(requestUrl)
    },
    refuseTask: (data) => {
        const requestUrl = `${baseUrl}/reopen`
        return axiosClient.post(requestUrl, data)
    },
    getTaskDiscussion: (taskId) => {
        const requestUrl = `${baseUrl}/${taskId}/discuss`
        return axiosClient.get(requestUrl)
    },
    addDiscussion: (taskInfo) => {
        const requestUrl = `${baseUrl}/discuss/add`
        return axiosClient.post(requestUrl, taskInfo)
    },
    getTaskReminders: (taskId) => {
        const requestUrl = `${baseUrl}/${taskId}/reminders`
        return axiosClient.get(requestUrl)
    },
    addTaskReminder: (reminderInfo) => {
        const requestUrl = `${baseUrl}/reminders/add`
        return axiosClient.post(requestUrl, reminderInfo)
    },
    updateTaskReminder: (reminderInfo) => {
        const requestUrl = `${baseUrl}/reminders/edit`
        return axiosClient.put(requestUrl, reminderInfo)
    },
    deleteTaskReminder: (reminderId) => {
        const requestUrl = `${baseUrl}/reminders/delete/${reminderId}`
        return axiosClient.delete(requestUrl)
    },
}
//

export default tasksApi