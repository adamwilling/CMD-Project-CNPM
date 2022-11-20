/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BiFilterAlt, BiSortAlt2 } from 'react-icons/bi'
import { Button, Card, Container, OverlayTrigger, Tooltip } from 'react-bootstrap'

import { getProposalListCreatedByMe } from '~/redux/proposalsSlice'
import { authSelector, proposalsSelector, proposalTypesSelector } from '~/redux/selectors'
import AppPagination from '~/components/AppPagination'
import Loading from '~/components/Loading'
import ProposalRow from './ProposalRow'
import AddProposal from './ProposalsFeatures/AddProposal'
import FiltersAdvanced from './ProposalsFeatures/FiltersAdvanced'
import FiltersByStatusIds from './ProposalsFeatures/FiltersByStatusIds'
import { getProposalTypeList } from '~/redux/configs/proposalTypesSlice'

const queryString = require('query-string')

const ProposalsCreatedByMe = () => {
    const proposalPermissions = useSelector(authSelector).userInfo.role.proposal

    const status = useSelector(proposalsSelector).status
    const countByStatuses = useSelector(proposalsSelector).countByStatuses
    const proposals = useSelector(proposalsSelector).proposals
    const pagination = useSelector(proposalsSelector).pagination
    const proposalTypes = useSelector(proposalTypesSelector).proposalTypes

    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()

    const [visibleFiltersAdvancedUI, setVisibleFiltersAdvancedUI] = useState(false)
    const [filtersBase, setFiltersBase] = useState({
        page: 1
    })
    const [filtersAdvanced, setFiltersAdvanced] = useState({
        proposalTypeIds: [],
        statusIds: [],
        statuses: [],
        createDateFrom: "",
        createDateTo: "",
    })

    useEffect(() => {
        document.title = "Đề xuất của tôi"
        const params = queryString.parse(location.search)
        dispatch(getProposalTypeList({ page: 1 }))
        if (Object.keys(params).length > 1 || (Object.keys(params).length > 0 && params.page !== "1")) {
            setFiltersBase(params)
        }
    }, [])

    useEffect(() => {
        const requestUrl = location.pathname + "?" + queryString.stringify(filtersBase)
        navigation(requestUrl)
        dispatch(getProposalListCreatedByMe({
            params: filtersBase,
            filters: filtersAdvanced
        }))
    }, [filtersBase, filtersAdvanced])

    const handlePageChange = (newPage) => {
        setFiltersBase({
            ...filtersBase,
            page: newPage
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
                        ĐỀ XUẤT CỦA TÔI
                    </div>
                    <div className="col" />
                    {
                        proposalPermissions.create && (
                            <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                                <AddProposal />
                            </div>
                        )
                    }
                    {
                        proposalPermissions.view_all && (
                            <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                                <OverlayTrigger
                                    placement="top-start"
                                    overlay={
                                        <Tooltip>
                                            Lọc nâng cao
                                        </Tooltip>
                                    }
                                >
                                    <Button
                                        variant="none"
                                        onClick={() => setVisibleFiltersAdvancedUI(true)}
                                    >
                                        <BiFilterAlt size={30} />
                                    </Button>
                                </OverlayTrigger>
                                {
                                    visibleFiltersAdvancedUI && (
                                        <FiltersAdvanced
                                            visible={visibleFiltersAdvancedUI}
                                            setVisible={setVisibleFiltersAdvancedUI}
                                            filtersAdvanced={filtersAdvanced}
                                            setFiltersAdvanced={setFiltersAdvanced}
                                            type="created-by-me"
                                        />
                                    )
                                }
                            </div>
                        )
                    }
                </div>
                <div className="d-flex flex-wrap justify-content-start align-items-center">
                    <FiltersByStatusIds
                    countByStatuses={countByStatuses}
                        filters={filtersAdvanced}
                        onFiltersChange={(listStatus) => setFiltersAdvanced({
                            ...filtersAdvanced,
                            statuses: listStatus,
                            statusIds: listStatus.map(status => status.id)
                        })}
                    />
                </div>
                <hr />
            </Container>
            <Container fluid>
                <div className="proposal proposal-header">
                    <div className="ms-lg-5" />
                    <div className="proposal-creator">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("pro.creator.name")}
                        >
                            NGƯỜI ĐỀ XUẤT
                            {
                                (filtersBase.sort === "pro.creator.name" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "pro.creator.name" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="proposal-type">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("pro.proposalType.id")}
                        >
                            LOẠI ĐỀ XUẤT
                            {
                                (filtersBase.sort === "pro.proposalType.id" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "pro.proposalType.id" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="proposal-content">
                        <span className="fw-bolder" >
                            MỤC ĐÍCH/LÝ DO
                        </span>
                    </div>
                    <div className="proposal-createDate">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("pro.createDate")}
                        >
                            NGÀY TẠO
                            {
                                (filtersBase.sort === "pro.createDate" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "pro.createDate" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="proposal-status">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("pro.status.id")}
                        >
                            TRẠNG THÁI
                            {
                                (filtersBase.sort === "pro.status.id" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "pro.status.id" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
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
                                proposals?.map((proposal) => (
                                    <ProposalRow
                                        key={proposal.id}
                                        proposalInfo={proposal}
                                        steps={proposalTypes.find(proposalType => proposalType.id === proposal.proposalType.id).steps}
                                    />
                                ))
                            }
                            {
                                proposals?.length === 0 ? (
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

export default ProposalsCreatedByMe