/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Image } from 'react-bootstrap'
import { BsPersonCircle } from 'react-icons/bs'
import { VscBook } from 'react-icons/vsc'

import logoutIcon from '~/assets/icons/logout.svg'
import listbarIcon from '~/assets/icons/listbar.svg'
import { authSelector } from '~/redux/selectors'
import { logout } from '~/redux/authSlice'

const AppHeaderDropdown = () => {
    const userInfo = useSelector(authSelector).userInfo

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }

    return (
        <Dropdown drop="down" align="end" className="col-auto d-flex justify-content-center align-items-center">
            <NavLink to={`/profile/${userInfo.id}`} className="col-auto d-flex align-items-center">
                <Image
                    src={"data:image/png;base64," + userInfo.avatar}
                    style={{ width: "35px", height: "35px" }}
                    className="col-auto rounded-circle me-2"
                />
                <div className="col d-flex flex-column">
                    <span className="fw-bolder">
                        {userInfo.name}
                    </span>
                    <span>
                        {userInfo.code}
                    </span>
                </div>
            </NavLink>
            <Dropdown.Toggle variant="none">
                <Image
                    src={listbarIcon}
                    className="col-auto ms-3"
                />
            </Dropdown.Toggle>
            <Dropdown.Menu className="animate__animated animate__slideInRight">
                <Dropdown.Item>
                    <NavLink
                        to={"/profile/" + userInfo.id}
                        className={({ isActive }) =>
                            "btn fw-bold " + (isActive ? "bg-gradient border-0 text-white" : "btn-none")
                        }
                    >
                        <BsPersonCircle className="me-2" />
                        Tài khoản
                    </NavLink>
                </Dropdown.Item>
                <Dropdown.Item>
                    <NavLink
                        to="/manual"
                        className={({ isActive }) =>
                            "btn fw-bold " + (isActive ? "bg-gradient border-0 text-white" : "btn-none")
                        }
                    >
                        <VscBook className="me-2" />
                        Hướng dẫn sử dụng
                    </NavLink>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            "btn fw-bold " + (isActive ? "bg-gradient border-0 text-white" : "btn-none")
                        }
                    >
                        <Image src={logoutIcon} className="me-2" />
                        Đăng xuất
                    </NavLink>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default AppHeaderDropdown
