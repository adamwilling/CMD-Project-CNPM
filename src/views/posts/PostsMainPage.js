/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react"
import { Button, Card, Container, Row } from "react-bootstrap"
import AppSearch from "~/components/AppSearch"
import Post from "./PostItem"
import { authSelector, postsSelector } from "~/redux/selectors"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "~/redux/postsSlice"
import Loading from "~/components/Loading"
import { BiEdit } from "react-icons/bi"
import FormSubmitPost from "./features/FormSubmitPost"
import ListEmployee from "./ListEmployee"

const PostsMainPage = () => {
    const postPermissions = useSelector(authSelector).userInfo.role?.post

    const dispatch = useDispatch()
    const posts = useSelector(postsSelector).posts
    const status = useSelector(postsSelector).status

    const [filter, setFilter] = useState({ content: "" })
    const [visibleFormAddPostUI, setVisibleFormAddPostUI] = useState(false)

    useEffect(() => {
        document.title = "Bảng tin"
    }, [])
    useEffect(() => {
        const search = setTimeout(() => {
            dispatch(fetchPosts(filter))
        }, 1000)
        return () => clearTimeout(search)
    }, [filter])

    const searchPost = (input) => {
        setFilter({ ...filter, content: input })
    }

    return (
        <Container fluid>
            <div className="d-flex justify-content-between align-items-start flex-wrap p-3">
                <div className="post__container--left">
                    <div className="d-lg-none d-flex flex-wrap justify-content-center mb-3 gap-3">
                        <div className="col-auto">
                            <AppSearch value={filter.content} onSearch={searchPost} />
                        </div>
                        {
                            postPermissions?.create && (
                                <div className="col-auto">
                                    <Button
                                        className="bg-gradient border-0 d-flex"
                                        onClick={() => setVisibleFormAddPostUI(true)}
                                    >
                                        <BiEdit size={20} />
                                        <div className="ms-2 fw-bold">
                                            Tạo bài viết mới
                                        </div>
                                    </Button>
                                </div>
                            )
                        }
                    </div>
                    {
                        status === "loading" ? (
                            <Loading />
                        ) : status === "error" ? (
                            <div className="text-center py-3">
                                Có lỗi trong quá trình lấy dữ liệu từ Server
                            </div>
                        ) : (
                            posts.length === 0 ? (
                                <div className="mt-5 text-center">
                                    Chưa có bài đăng
                                </div>
                            ) : posts.map((post) => {
                                return (
                                    <Post
                                        key={post.id}
                                        postInfo={post}
                                    />
                                )
                            })
                        )
                    }
                </div>
                <div className="post__container--right ">
                    <div className="col-auto d-flex justify-content-center gap-3">
                        <div className="col">
                            <AppSearch value={filter.content} onSearch={searchPost} />
                        </div>
                        {
                            postPermissions?.create && (
                                <div className="col-auto">
                                    <Button
                                        className="bg-gradient border-0 d-flex"
                                        onClick={() => setVisibleFormAddPostUI(true)}
                                    >
                                        <BiEdit size={20} />
                                        <div className="ms-2 fw-bold">
                                            Tạo bài viết mới
                                        </div>
                                    </Button>
                                </div>
                            )
                        }
                    </div>
                    <Card className="col-auto mt-3">
                        <Card.Header>
                                THÀNH VIÊN
                        </Card.Header>
                        <div className="listEmployee__container">
                            <ListEmployee />
                        </div>
                    </Card>
                </div>
            </div>
            {
                visibleFormAddPostUI && <FormSubmitPost
                    visible={visibleFormAddPostUI}
                    setVisible={setVisibleFormAddPostUI}
                />
            }
        </Container>
    )
}

export default PostsMainPage