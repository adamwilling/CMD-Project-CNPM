import React, { useState } from 'react'
import { Dropdown, Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { authSelector } from '~/redux/selectors'

const AppNavbarNav = () => {
    const userPermission = useSelector(authSelector).userInfo.role

    const [visibleDropdown, setVisibleDropdown] = useState({})

    const navList = []

    if (userPermission?.post.view || userPermission?.post.view_all) {
        navList.push({
            name: 'Bảng tin',
            to: '/posts'
        })
    }
    
    if ((userPermission?.task.view || userPermission?.task.view_all) && userPermission?.task.create) {
        navList.push({
            name: 'Công việc',
            to: '/tasks',
            children: [
                {
                    name: 'Công việc tôi giao',
                    to: '/tasks/created-by-me'
                },
                {
                    name: 'Công việc của tôi',
                    to: '/tasks/assigned-to-me'
                },
            ]
        })
    }
    else if (userPermission?.task.view || userPermission?.task.view_all) {
        navList.push({
            name: 'Công việc',
            to: '/tasks',
            children: [
                {
                    name: 'Công việc của tôi',
                    to: '/tasks/assigned-to-me'
                },
            ]
        })
    }
    
    if ((userPermission?.proposal.view || userPermission?.proposal.view_all) && userPermission?.proposal.create && userPermission?.proposal.update) {
        navList.push({
            name: 'Đề xuất',
            to: '/proposals',
            children: [
                {
                    name: 'Đề xuất của tôi',
                    to: '/proposals/created-by-me'
                },
                {
                    name: 'Đề xuất tôi duyệt',
                    to: '/proposals/approve-by-me'
                },
            ]
        })
    }
    else if ((userPermission?.proposal.view || userPermission?.proposal.view_all) && userPermission?.proposal.create) {
        navList.push({
            name: 'Đề xuất',
            to: '/proposals',
            children: [
                {
                    name: 'Đề xuất của tôi',
                    to: '/proposals/created-by-me'
                }
            ]
        })
    }
    else if ((userPermission?.proposal.view || userPermission?.proposal.view_all) && userPermission?.proposal.update) {
        navList.push({
            name: 'Đề xuất',
            to: '/proposals',
            children: [
                {
                    name: 'Đề xuất tôi duyệt',
                    to: '/proposals/approve-by-me'
                }
            ]
        })
    }
    else if (userPermission?.proposal.view || userPermission?.proposal.view_all) {
        navList.push({
            name: 'Đề xuất',
            to: '/proposals'
        })
    }

    if (userPermission?.employee.view || userPermission?.employee.view_all) {
        navList.push({
            name: 'Sinh viên',
            to: '/students'
        })
    }

    if (userPermission?.team.view || userPermission?.team.view_all) {
        navList.push({
            name: 'Đội nhóm',
            to: '/teams'
        })
    }

    if (userPermission?.device.view || userPermission?.device.view_all) {
        navList.push({
            name: 'Thiết bị',
            to: '/devices'
        })
    }

    if (userPermission?.type.view || userPermission?.type.view_all) {
        navList.push({
            name: 'Loại đề xuất',
            to: '/proposal-types'
        })
    }

    return (
        <Nav
            className="col row flex-lg-row align-items-center justify-content-evenly"
            style={{ maxHeight: '200px' }}
            navbarScroll
        >
            {
                navList.map((navItem, indexItem) => (
                    navItem.children?.length > 0 ? (
                        <Dropdown
                            key={indexItem}
                            className="col-auto px-0"
                            show={visibleDropdown[indexItem]}
                            onToggle={() => setVisibleDropdown({
                                ...visibleDropdown,
                                [indexItem]: !visibleDropdown[indexItem]
                            })}
                            onMouseMove={() => setVisibleDropdown({
                                ...visibleDropdown,
                                [indexItem]: true
                            })}
                            onMouseOut={() => setVisibleDropdown({
                                ...visibleDropdown,
                                [indexItem]: false
                            })}
                        >
                            <Dropdown.Toggle variant="none" className="d-flex align-items-center">
                                <NavLink
                                    to={navItem.to}
                                    className={({ isActive }) =>
                                        "btn fw-bold col-auto " + (isActive ? "bg-gradient border-0 text-white" : "btn-none")
                                    }
                                >
                                    {navItem.name.toUpperCase()}
                                </NavLink>
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                className="animate__animated animate__faster animate__slideInRight"
                                style={{
                                    marginTop: "-0.125rem"
                                }}>
                                {
                                    navItem.children.map((children, indexChildren) => (
                                        <Dropdown.Item key={indexChildren}>
                                            <NavLink
                                                to={children.to}
                                                className={({ isActive }) =>
                                                    "btn fw-bold col-auto " + (isActive ? "bg-gradient border-0 text-white" : "btn-none")
                                                }
                                            >
                                                {children.name.toUpperCase()}
                                            </NavLink>
                                        </Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>

                    ) : (
                        <NavLink
                            key={indexItem}
                            to={navItem.to}
                            className={({ isActive }) =>
                                "btn fw-bold col-auto border-light " + (isActive ? "bg-gradient text-white" : "btn-none")
                            }
                        >
                            {navItem.name.toUpperCase()}
                        </NavLink>
                    )
                ))
            }
        </Nav>
    )
}

export default React.memo(AppNavbarNav)