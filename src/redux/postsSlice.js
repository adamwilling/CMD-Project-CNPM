import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2"

import postsApi from "~/api/postsApi"

const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 10000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer)
        toast.addEventListener("mouseleave", Swal.resumeTimer)
    },
})

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        status: "idle",
        posts: [],
        nameFileUpload: "",
    },
    reducers: {
        addPostToList: (state, action) => {
            state.posts.unshift(action.payload)
        },
        updatePostList: (state, action) => {
            state.posts.forEach((post, index, array) => {
                if (post.id === action.payload.id) {
                    array[index] = action.payload
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload
                state.pagination = action.payload.pagination
                state.status = "success"
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addPost.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.posts.unshift(action.payload.data)
                    Toast.fire({
                        title: "Thêm bài viết",
                        text: action.payload.message,
                        icon: "success",
                    })
                } else {
                    Toast.fire({
                        title: "Thêm bài viết",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(addPost.rejected, (state, action) => {
                Toast.fire({
                    title: "Thêm bài viết",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.posts.forEach((post, index, array) => {
                        if (post.id === action.payload.data.id) {
                            array[index] = action.payload.data
                        }
                    })
                    Toast.fire({
                        title: "Chỉnh sửa bài viết",
                        text: action.payload.message,
                        icon: "success",
                    })
                } else {
                    Toast.fire({
                        title: "Chỉnh sửa bài viết",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(updatePost.rejected, (state, action) => {
                Toast.fire({
                    title: "Chỉnh sửa bài viết",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.posts = state.posts.filter((post) => post.id !== action.payload.id)
                    Toast.fire({
                        title: "Xóa bài viết",
                        text: action.payload.message,
                        icon: "success",
                    })
                } else {
                    Toast.fire({
                        title: "Xóa bài viết",
                        text: action.payload.message,
                        icon: "warning",
                    })
                }
            })
            .addCase(deletePost.rejected, (state, action) => {
                Toast.fire({
                    title: "Xóa bài viết",
                    text: action.error.message,
                    icon: "error",
                })
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.posts = state.posts.map((post) => {
                    if (post.id === action.payload.id) {
                            return action.payload
                    }
                    else {
                        return post
                    }
                })
                console.log(state.posts)
            })
            .addCase(uploadImages.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.nameFileUpload = action.payload.data
                }
            })
    },
})
export default postsSlice

export const { addPostToList, updatePostList } = postsSlice.actions

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (params) => {
    const response = await postsApi.getAll(params)
    return response.data.data
})
export const addPost = createAsyncThunk("posts/addPost", async (postInfo) => {
    const response = await postsApi.addPost(postInfo)
    return response.data
})
export const updatePost = createAsyncThunk("posts/updatePost", async (postInfo) => {
    const response = await postsApi.updatePost(postInfo)
    return response.data
})
export const deletePost = createAsyncThunk("posts/deletePost", async (postId) => {
    const response = await postsApi.deletePost(postId)
    return { ...response.data, id: postId }
})
export const likePost = createAsyncThunk("posts/likePost", async ({ postId, like }) => {
    const response = await postsApi.likePost(postId)
    return response.data.data
})
export const uploadImages = createAsyncThunk("posts/uploadImages", async (data) => {
    const response = await postsApi.uploadImages(data)
    return response.data
})
