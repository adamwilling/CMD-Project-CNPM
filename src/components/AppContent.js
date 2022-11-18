import React from 'react'
import { useSelector } from 'react-redux'
import { useRoutes } from 'react-router-dom'

import { authSelector } from '~/redux/selectors'
import './style.css'

const Manual = React.lazy(() => import("~/views/manual"))
const PostsMainPage = React.lazy(() => import("~/views/posts/PostsMainPage"))
const TasksForAll = React.lazy(() => import("~/views/tasks/TasksForAll"))
const TasksCreatedByMe = React.lazy(() => import("~/views/tasks/TasksCreatedByMe"))
const TasksAssignedToMe = React.lazy(() => import("~/views/tasks/TasksAssignedToMe"))
const ProposalsForAll = React.lazy(() => import("~/views/proposals/ProposalsForAll"))
const ProposalsCreatedByMe = React.lazy(() => import("~/views/proposals/ProposalsCreatedByMe"))
const ProposalsApproveByMe = React.lazy(() => import("~/views/proposals/ProposalsApproveByMe"))
const EmployeesMainPage = React.lazy(() => import("~/views/employees/EmployeesMainPage"))
const TeamsMainPage = React.lazy(() => import("~/views/teams/TeamsMainPage"))
const DevicesMainPage = React.lazy(() => import("~/views/devices/DevicesMainPage"))
const ProposalTypesMainPage = React.lazy(() => import("~/views/configs/proposal-types/ProposalTypesMainPage"))
const ProposalTypeConfig = React.lazy(() => import("~/views/configs/proposal-types/ProposalTypeConfig/ProposalTypeConfig"))
const ProfileMainPage = React.lazy(() => import("~/views/profile/ProfileMainPage"))
const NotificationsMainPage = React.lazy(() => import("~/views/notifications/NotificationsMainPage"))

const AppContent = () => {
    const userPermission = useSelector(authSelector).userInfo.role

    const routes = [
        {
            name: "Trang chủ",
            path: "/",
            element: <PostsMainPage />
        },
        {
            path: "posts",
            name: "Bảng tin",
            element: <PostsMainPage />
        },
        {
            path: "notifications",
            name: "Thông báo",
            element: <NotificationsMainPage />
        },
        {
            path: "profile/:id",
            name: "Thông tin tài khoản",
            element: <ProfileMainPage />
        },
        {
            path: "manual",
            name: "Hướng dẫn sử dụng",
            element: <Manual />
        }
    ]

    if ((userPermission?.task.view || userPermission?.task.view_all) && userPermission?.task.create) {
        routes.push(
            {
                name: "Tất cả công việc",
                path: "tasks",
                element: <TasksForAll />
            },
            {
                name: "Công việc tôi giao",
                path: "tasks/created-by-me",
                element: <TasksCreatedByMe />
            },
            {
                name: "Công việc của tôi",
                path: "tasks/assigned-to-me",
                element: <TasksAssignedToMe />
            }
        )
    }
    else if (userPermission?.task.view || userPermission?.task.view_all) {
        routes.push(
            {
                name: "Tất cả công việc",
                path: "tasks",
                element: <TasksForAll />
            },
            {
                name: "Công việc của tôi",
                path: "tasks/assigned-to-me",
                element: <TasksAssignedToMe />
            }
        )
    }

    if ((userPermission?.proposal.view || userPermission?.proposal.view_all) && userPermission?.proposal.create && userPermission?.proposal.update) {
        routes.push(
            {
                name: "Tất cả đề xuất",
                path: "proposals",
                element: <ProposalsForAll />
            },
            {
                name: "Đề xuất của tôi",
                path: "proposals/created-by-me",
                element: <ProposalsCreatedByMe />
            },
            {
                name: "Đề xuất tôi duyệt",
                path: "proposals/approve-by-me",
                element: <ProposalsApproveByMe />
            }
        )
    }
    else if ((userPermission?.proposal.view || userPermission?.proposal.view_all) && userPermission?.proposal.create) {
        routes.push(
            {
                name: "Tất cả đề xuất",
                path: "proposals",
                element: <ProposalsForAll />
            },
            {
                name: "Đề xuất của tôi",
                path: "proposals/created-by-me",
                element: <ProposalsCreatedByMe />
            }
        )
    }
    else if ((userPermission?.proposal.view || userPermission?.proposal.view_all) && userPermission?.proposal.update) {
        routes.push(
            {
                name: "Tất cả đề xuất",
                path: "proposals",
                element: <ProposalsForAll />
            },
            {
                name: "Đề xuất tôi duyệt",
                path: "proposals/approve-by-me",
                element: <ProposalsApproveByMe />
            }
        )
    }
    else if (userPermission?.proposal.view || userPermission?.proposal.view_all) {
        routes.push({
            name: "Tất cả đề xuất",
            path: "proposals",
            element: <ProposalsForAll />
        })
    }

    if (userPermission?.employee.view || userPermission?.employee.view_all) {
        routes.push({
            path: "students",
            name: "Sinh viên",
            element: <EmployeesMainPage />
        })
    }

    if (userPermission?.team.view || userPermission?.team.view_all) {
        routes.push({
            path: "teams",
            name: "Đội nhóm",
            element: <TeamsMainPage />
        })
    }

    if (userPermission?.device.view || userPermission?.device.view_all) {
        routes.push({
            path: "devices",
            name: "Thiết bị",
            element: <DevicesMainPage />
        })
    }

    if (userPermission?.type.view || userPermission?.type.view_all) {
        routes.push(
            {
                path: "proposal-types",
                name: "Loại đề xuất",
                element: <ProposalTypesMainPage />
            },
            {
                path: "proposal-types/config/:id",
                name: "Thiết lập loại đề xuất",
                element: <ProposalTypeConfig />
            }
        )
    }
    const routesElement = useRoutes(routes)
    return (
        <div className="container-fluid mt-3">
            {routesElement}
        </div>
    )
}

export default React.memo(AppContent)
