/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button, Card, Container } from 'react-bootstrap'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BiSortAlt2 } from 'react-icons/bi'

import AppPagination from '~/components/AppPagination'
import Loading from '~/components/Loading'
import { getProposalTypeList } from '~/redux/configs/proposalTypesSlice'
import { authSelector, proposalTypesSelector } from '~/redux/selectors'
import AddProposalType from './ProposalTypesFeatures/AddProposalType'
import ProposalTypeRow from './ProposalTypeRow'

const queryString = require('query-string')

const ProposalTypesMainPage = () => {
    const typePermissions = useSelector(authSelector).userInfo.role.type

    const status = useSelector(proposalTypesSelector).status
    const proposalTypes = useSelector(proposalTypesSelector).proposalTypes
    const pagination = useSelector(proposalTypesSelector).pagination

    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()

    const [filtersBase, setFiltersBase] = useState({
        page: 1
    })

    useEffect(() => {
        document.title = "Loại đề xuất"
        if (location.search.length > 0) {
            const params = queryString.parse(location.search)
            setFiltersBase(params)
        }
    }, [])

    useEffect(() => {
        const requestUrl = location.pathname + "?" + queryString.stringify(filtersBase)
        dispatch(getProposalTypeList(filtersBase))
        navigation(requestUrl)
    }, [filtersBase])

    const handlePageChange = (newPage) => {
        setFiltersBase({
            ...filtersBase,
            page: newPage
        })
    }

    const handleSearch = (searchTerm) => {
        setFiltersBase({
            ...filtersBase,
            page: 1,
            name: searchTerm
        })
    }

    const handleSort = (sortBy) => {
        if (filtersBase.order === null || !filtersBase.order) {
            setFiltersBase({
                ...filtersBase,
                sort: sortBy,
                order: "asc"
            })
        }
        else if (filtersBase.order === "asc") {
            setFiltersBase({
                ...filtersBase,
                sort: sortBy,
                order: "desc"
            })
        }
        else {
            setFiltersBase({
                ...filtersBase,
                sort: null,
                order: null
            })
        }
    }
    return (
        <Container fluid>
            <Container fluid>
                <div className="row justify-content-xl-between justify-content-end align-items-center">
                    <div className="col-auto fw-bolder fs-5 mb-xl-0 mb-3">
                        LOẠI ĐỀ XUẤT
                    </div>
                    <div className="col" />
                    {
                        typePermissions.create && (
                            <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                                <AddProposalType />
                            </div>
                        )
                    }
                </div>
                <hr />
            </Container>
            <Container fluid>
                <div className="proposalType proposalType-header">
                    <div className="ms-lg-5" />
                    <div className="proposalType-name">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("name")}
                        >
                            TÊN LOẠI ĐỀ XUẤT
                            {
                                (filtersBase.sort === "name" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "name" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="proposalType-status">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("status")}
                        >
                            TRẠNG THÁI
                            {
                                (filtersBase.sort === "status" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "status" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="proposalType-createDate">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("createDate")}
                        >
                            NGÀY TẠO
                            {
                                (filtersBase.sort === "createDate" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "createDate" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
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
                                proposalTypes?.map((proposalType) => (
                                    <ProposalTypeRow
                                        key={proposalType.id}
                                        proposalTypeInfo={proposalType}
                                    />
                                ))
                            }
                            {
                                proposalTypes?.length === 0 ? (
                                    <Card.Body align="center">
                                        Không có dữ liệu
                                    </Card.Body>
                                ) : null
                            }
                        </div>
                    )
                }
                <AppPagination
                    pagination={{
                        ...pagination,
                        page: filtersBase.page
                    }}
                    onPageChange={handlePageChange}
                />
            </Container>
        </Container>
    )
}

export default ProposalTypesMainPage