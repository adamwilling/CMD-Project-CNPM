import axios from "axios"
import axiosClient from "./axiosClient"

// API liên quan đến phần bảng tin
const baseUrl = "/posts"
const postsApi = {
    getAll: (filtersParams) => {
        const requestUrl = `${baseUrl}`
        return axiosClient.get(requestUrl, {params:{...filtersParams}})
    },
    get: (postId) => {
        const requestUrl = `${baseUrl}/${postId}`
        return axiosClient.get(requestUrl)
    },
    addPost: (postInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, postInfo)
    },
    updatePost: (postInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, postInfo)
    },
    deletePost: (postId) => {
        const requestUrl = `${baseUrl}/delete/${postId}`
        return axiosClient.delete(requestUrl)
    },
    likePost: (postId) => {
        const requestUrl = `${baseUrl}/${postId}/likes`
        return axiosClient.get(requestUrl)
    },
    uploadImages:(data)=>{
        const url =  "api/upload-images"
       return axiosClient.post(url, data)
    }
}
//

export default postsApi