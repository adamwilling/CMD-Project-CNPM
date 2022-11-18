/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BiArrowFromTop, BiFilterAlt, BiImport, BiSortAlt2 } from 'react-icons/bi'
import { Button, Card, Container, Dropdown, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'

import { getEmployeeList } from '~/redux/employeesSlice'
import { authSelector, employeesSelector } from '~/redux/selectors'
import AppPagination from '~/components/AppPagination'
import EmployeeRow from './EmployeeRow'
import AddEmployee from './EmployeesFeatures/AddEmployee'
import ButtonShowDepartments from './DepartmentsPage/ButtonShowDepartments'
import AppSearch from '~/components/AppSearch'
import ButtonShowRoles from './RolesPage/ButtonShowRoles'
import ExportEmployee from './EmployeesFeatures/ExportEmployee'
import Loading from '~/components/Loading'
import FiltersAdvanced from './EmployeesFeatures/FiltersAdvanced'
import downloadIcon from '~/assets/icons/download.svg'
import employeesApi from '~/api/employeesApi'
import ImportEmployee from './EmployeesFeatures/ImportEmployee'
import { BsChevronDown } from 'react-icons/bs'

const queryString = require('query-string')

const EmployeesMainPage = () => {
    const employeePermissions = useSelector(authSelector).userInfo.role.employee
    const departmentPermissions = useSelector(authSelector).userInfo.role.department
    const rolePermissions = useSelector(authSelector).userInfo.role.role

    const [loading, setLoading] = useState(true)
    const status = useSelector(employeesSelector).status
    const employees = useSelector(employeesSelector).employees
    const pagination = useSelector(employeesSelector).pagination

    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()

    const [visibleExportEmployeeUI, setVisibleExportEmployeeUI] = useState(false)
    const [visibleImportEmployeeUI, setVisibleImportEmployeeUI] = useState(false)
    const [dataReport, setDataReport] = useState([])
    const [visibleFiltersAdvancedUI, setVisibleFiltersAdvancedUI] = useState(false)
    const [filtersBase, setFiltersBase] = useState({
        page: 1
    })
    const [filtersAdvanced, setFiltersAdvanced] = useState({
        name: "",
        dob: "",
        email: "",
        phone: "",
        departmentIds: [],
        positionIds: []
    })

    useEffect(() => {
        document.title = "Sinh viên"
        const params = queryString.parse(location.search)
        if (Object.keys(params).length > 1 || (Object.keys(params).length > 0 && params.page !== "1")) {
            setFiltersBase(params)
        }
    }, [])

    useEffect(() => {
        const requestUrl = location.pathname + "?" + queryString.stringify(filtersBase)
        dispatch(getEmployeeList({
            params: filtersBase,
            filters: filtersAdvanced
        }))
        navigation(requestUrl)
    }, [filtersBase, filtersAdvanced])

    const handlePageChange = (newPage) => {
        setFiltersBase({
            ...filtersBase,
            page: newPage
        })
    }

    const handleSearch = (searchTerm) => {
        setFiltersAdvanced({
            ...filtersAdvanced,
            name: searchTerm
        })
        setFiltersBase({
            ...filtersBase,
            page: 1
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

    const exportEmployee = () => {
        setLoading(true)
        employeesApi.getEmployeeListToDownload(filtersBase, filtersAdvanced)
            .then((response) => {
                setDataReport(response.data.data.employees)
                setLoading(false)
            })
        setVisibleExportEmployeeUI(true)
    }

    return (
        <Container fluid>
            <Container fluid>
                <div className="d-flex flex-wrap justify-content-xl-between justify-content-end align-items-center gap-2">
                    <div className="col-auto fw-bolder fs-5 mb-xl-0 mb-3">
                        DANH SÁCH SINH VIÊN
                    </div>
                    <div className="col" />
                    {
                        employeePermissions.import && (
                            <div className="col-auto mb-xl-0 mb-3">
                                <OverlayTrigger
                                    placement="top-start"
                                    overlay={
                                        <Tooltip>
                                            Nhập danh sách sinh viên qua file
                                        </Tooltip>
                                    }
                                >
                                    <Button
                                        variant="none"
                                        onClick={() => setVisibleImportEmployeeUI(true)}
                                    >
                                        <BiImport size={30} />
                                    </Button>
                                </OverlayTrigger>
                                {
                                    visibleImportEmployeeUI && <ImportEmployee visible={visibleImportEmployeeUI} setVisible={setVisibleImportEmployeeUI} />
                                }
                            </div>
                        )
                    }
                    {
                        employeePermissions.create && (
                            <div className="col-auto mb-xl-0 mb-3">
                                <AddEmployee />
                            </div>
                        )
                    }
                    <div className="col-auto mb-xl-0 mb-3">
                        <AppSearch value={filtersAdvanced.name} onSearch={handleSearch} />
                    </div>
                    {
                        departmentPermissions.view && (
                            <div className="col-auto mb-xl-0 mb-3">
                                <ButtonShowDepartments />
                            </div>
                        )
                    }
                    {
                        rolePermissions.view && (
                            <div className="col-auto mb-xl-0 mb-3">
                                <ButtonShowRoles />
                            </div>
                        )
                    }
                    {
                        employeePermissions.view_all && (
                            <>
                                <div className="col-auto mb-xl-0 mb-3">
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
                                    <FiltersAdvanced visible={visibleFiltersAdvancedUI} setVisible={setVisibleFiltersAdvancedUI} filtersAdvanced={filtersAdvanced} setFiltersAdvanced={setFiltersAdvanced} />
                                </div>
                                <div className="col-auto mb-xl-0 mb-3">
                                    <OverlayTrigger
                                        placement="top-start"
                                        overlay={
                                            <Tooltip>
                                                Xuất danh sách sinh viên
                                            </Tooltip>
                                        }
                                    >
                                        <Button
                                            variant="none"
                                            onClick={exportEmployee}
                                        >
                                            <Image src={downloadIcon} />
                                        </Button>
                                    </OverlayTrigger>
                                    {
                                        visibleExportEmployeeUI && <ExportEmployee data={dataReport} visible={visibleExportEmployeeUI} setVisible={setVisibleExportEmployeeUI} loading={loading} />
                                    }
                                </div>
                            </>
                        )
                    }
                    {/* <Dropdown autoClose="outside" className="col-auto d-sm-none">
                        <Dropdown.Toggle>
                            <BsChevronDown />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                            <Dropdown.ItemText className="d-block m-auto">
                                <AppSearch value={filtersAdvanced.name} onSearch={handleSearch} />
                            </Dropdown.ItemText>
                            {
                                employeePermissions.import && (
                                    <Dropdown.Item className="d-block m-auto">
                                        <Button
                                            variant="outline-primary"
                                            className="fw-bolder w-100"
                                            onClick={() => setVisibleImportEmployeeUI(true)}
                                        >
                                            Nhập danh sách
                                        </Button>
                                        {
                                            visibleImportEmployeeUI && <ImportEmployee visible={visibleImportEmployeeUI} setVisible={setVisibleImportEmployeeUI} />
                                        }
                                    </Dropdown.Item>
                                )
                            }
                            {
                                employeePermissions.create && (
                                    <Dropdown.Item className="d-block m-auto">
                                        <AddEmployee />
                                    </Dropdown.Item>
                                )
                            }
                            {
                                departmentPermissions.view && (
                                    <Dropdown.Item className="d-block m-auto">
                                        <ButtonShowDepartments />
                                    </Dropdown.Item>
                                )
                            }
                            {
                                rolePermissions.view && (
                                    <Dropdown.Item className="d-block m-auto">
                                        <ButtonShowRoles />
                                    </Dropdown.Item>
                                )
                            }
                            <Dropdown.Item className="d-block m-auto">
                                <Button
                                    variant="outline-primary"
                                    className="fw-bolder w-100"
                                    onClick={exportEmployee}
                                >
                                    Xuất danh sách
                                </Button>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}
                </div>
                <hr />
            </Container>
            <Container fluid>
                <div className="employee employee-header">
                    <div className="ms-lg-5" />
                    <div className="employee-active" />
                    <div className="employee-code">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("emp.code")}
                        >
                            MÃ
                            {
                                (filtersBase.sort === "emp.code" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "emp.code" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="employee-name">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("emp.name")}
                        >
                            HỌ VÀ TÊN
                            {
                                (filtersBase.sort === "emp.name" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "emp.name" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="employee-dob">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("emp.dateOfBirth")}
                        >
                            NGÀY SINH
                            {
                                (filtersBase.sort === "emp.dateOfBirth" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "emp.dateOfBirth" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="employee-email">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("emp.email")}
                        >
                            EMAIL
                            {
                                (filtersBase.sort === "emp.email" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "emp.email" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="employee-phoneNumber">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("emp.phoneNumber")}
                        >
                            SĐT
                            {
                                (filtersBase.sort === "emp.phoneNumber" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "emp.phoneNumber" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="employee-department">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("dep.name")}
                        >
                            PHÒNG
                            {
                                (filtersBase.sort === "dep.name" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "dep.name" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="employee-position">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("pos.name")}
                        >
                            CHỨC VỤ
                            {
                                (filtersBase.sort === "pos.name" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "pos.name" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
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
                                employees?.map(employee => (
                                    <EmployeeRow
                                        key={employee.id}
                                        employeeInfo={employee}
                                    />
                                ))
                            }
                            {
                                employees?.length === 0 ? (
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

export default EmployeesMainPage