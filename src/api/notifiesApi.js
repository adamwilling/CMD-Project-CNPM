import axiosClient from "./axiosClient"

const baseUrl =  "/employees/notifies"
const notifiesApi = {
    getNotifyList: () => {
        const requestUrl = `${baseUrl}`
        return axiosClient.get(requestUrl)
    },
    markRead: (notifyIds) => {
        const requestUrl = `${baseUrl}/allRead`
        return axiosClient.post(requestUrl, {
            notifyIds
        })
    },
    markAllRead: () => {
        const requestUrl = `${baseUrl}/allRead`
        return axiosClient.post(requestUrl, {
            notifyIds: []
        })
    },
    deleteNotify: (notifyIds) => {
        const requestUrl = `${baseUrl}/delete`
        return axiosClient.put(requestUrl, {
            notifyIds
        })
    },
}

export default notifiesApi