/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Accordion, Card, Container } from 'react-bootstrap'

import { authSelector, teamsSelector } from '~/redux/selectors'
import { getTeamList } from '~/redux/teamsSlice'
import AppSearch from '~/components/AppSearch'
import TeamRow from './TeamRow'
import AddTeam from './TeamsFeatures/AddTeam'
import Loading from '~/components/Loading'

const TeamsMainPage = ({ visible, setVisible }) => {
    const teamPermissions = useSelector(authSelector).userInfo.role.team

    const status = useSelector(teamsSelector).status
    const teams = useSelector(teamsSelector).teams

    const dispatch = useDispatch()

    const [filters, setFilters] = useState({
        name: ""
    })

    useEffect(() => {
        document.title = "Đội nhóm"
    }, [])


    useEffect(() => {
        dispatch(getTeamList(filters))
    }, [filters])

    const handleSearchTerm = (searchTerm) => {
        setFilters({
            name: searchTerm
        })
    }
    //

    return (
        <Container fluid>
            <Container fluid>
                <div className="row justify-content-xl-between justify-content-end align-items-center">
                    <div className="col-auto fw-bolder fs-5 mb-xl-0 mb-3">
                        DANH SÁCH ĐỘI NHÓM
                    </div>
                    <div className="col" />
                    <div className="col-auto mb-xl-0 mb-3">
                        <AppSearch
                            value={filters.name}
                            onSearch={handleSearchTerm}
                        />
                    </div>
                    {
                        teamPermissions.create && (
                            <div className="col-auto mb-xl-0 mb-3">
                                <AddTeam />
                            </div>
                        )
                    }
                </div>
                <hr />
            </Container>
            <Container fluid>
                <div className="team team-header">
                    <div className="ms-lg-5" />
                    <div className="team-code">
                        <span
                            className="fw-bolder cursor-pointer"
                            // onClick={() => handleSort("name")}
                        >
                            MÃ ĐỘI NHÓM
                            {/* {
                                (filtersBase.sort === "name" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "name" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            } */}
                        </span>
                    </div>
                    <div className="team-name">
                        <span
                            className="fw-bolder cursor-pointer"
                            // onClick={() => handleSort("name")}
                        >
                            TÊN ĐỘI NHÓM
                            {/* {
                                (filtersBase.sort === "name" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "name" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            } */}
                        </span>
                    </div>
                    <div className="team-numberOfMembers">
                        <span className="fw-bolder cursor-pointer">
                            SỐ LƯỢNG THÀNH VIÊN
                        </span>
                    </div>
                    <div className="team-leader">
                        <span className="fw-bolder cursor-pointer">
                            ĐỘI TRƯỞNG
                        </span>
                    </div>
                    <div className="more" />
                </div>
                {
                    status === "loading" ? (
                        <Loading />
                    ) : status === "error" ? (
                        <div className="text-center py-3">Có lỗi trong quá trình lấy dữ liệu từ Server</div>
                    ) : (
                        <div className="list-group-horizontal-lg">
                            {
                                teams?.map((team) => (
                                    <TeamRow
                                        key={team.id}
                                        teamInfo={team}
                                    />
                                ))
                            }
                            {
                                teams?.length === 0 ? (
                                    <Card.Body align="center">
                                        Chưa có đội nhóm
                                    </Card.Body>
                                ) : null
                            }
                        </div>
                    )
                }
            </Container>
        </Container>
    )
}

export default TeamsMainPage