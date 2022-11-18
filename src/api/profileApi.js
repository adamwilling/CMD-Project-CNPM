import axiosClient from "./axiosClient"

// API liên quan đến phần trang cá nhân
const profileApi = {
    uploadAvatar: (formData) => {
        const requestUrl = `/api/upload-images`
        return axiosClient.post(requestUrl, formData)
    }
}
//

export default profileApi