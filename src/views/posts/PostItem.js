import React from "react"
import { useState } from "react"
import { BiEdit, BiTrash } from "react-icons/bi"
import three_dot_icon from "../../assets/icons/more.svg"
import { Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import { Dropdown } from "react-bootstrap"
import DeletePost from "./features/DeletePost"
import { NavLink } from "react-router-dom"
import { authSelector } from "~/redux/selectors"
import FormSubmitPost from "./features/FormSubmitPost"
import { likePost } from "~/redux/postsSlice"

const PostItem = ({ postInfo }) => {
    const postPermissions = useSelector(authSelector).userInfo.role?.post

    const dispatch = useDispatch()

    // const [showComment, setShowComment] = useState(false);
    const [visibleEditPostUI, setVisibleEditPostUI] = useState(false)
    const [visibleDeletePostUI, setVisibleDeletePostUI] = useState(false)
    const handleLikePost = () => {
        dispatch(likePost({
            postId: postInfo.id,
            like: postInfo.like
        }))
    }

    return (
        <div
            key={postInfo.id}
            className="post__item"
        >
            <div className="header__wrapper">
                <NavLink
                    className="header__user"
                    to={`/profile/${postInfo.creator.id}`}
                >
                    <div className="header__avatar">
                        <Image
                            src={"data:image/png;base64," + postInfo.creator.avatar}
                        />
                    </div>
                    <div className="header__info">
                        <div className="header__info--name">
                            {postInfo.creator.name}
                        </div>
                        <div className="header__info--time">
                            {postInfo.createDate}
                        </div>
                    </div>
                </NavLink>
                <div className="header__actions">
                    <Dropdown>
                        {
                            (postPermissions?.update || postPermissions?.delete) && (
                                <>
                                    <Dropdown.Toggle variant="none">
                                        <Image src={three_dot_icon} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                                        {
                                            postPermissions?.update && (
                                                <Dropdown.Item onClick={() => setVisibleEditPostUI(true)}>
                                                    <BiEdit /> Chỉnh sửa
                                                </Dropdown.Item>
                                            )
                                        }
                                        {
                                            postPermissions?.delete && (
                                                <Dropdown.Item onClick={() => setVisibleDeletePostUI(true)}>
                                                    <BiTrash />  Xóa
                                                </Dropdown.Item>
                                            )
                                        }
                                    </Dropdown.Menu></>
                            )
                        }
                    </Dropdown>
                </div>
            </div>
            {
                visibleEditPostUI && <FormSubmitPost
                    visible={visibleEditPostUI}
                    setVisible={setVisibleEditPostUI}
                    post={postInfo}
                />
            }
            {
                visibleDeletePostUI && <DeletePost
                    visible={visibleDeletePostUI}
                    setVisible={setVisibleDeletePostUI}
                    postInfo={postInfo}
                />
            }
            <div className="content__wrapper">
                <h3 className="title">
                    {postInfo.title}
                </h3>
                <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
            </div>
            <div className="react-wrapper">
                <div className="react__button"
                    onClick={handleLikePost}>
                    <div
                        className={postInfo.like ? "react__button--heart-fill" : "react__button--heart-outline"}
                    />
                    <span>{postInfo.likeTotal || 0} lượt thích</span>
                </div>
            </div>
        </div>
    )
}

export default PostItem