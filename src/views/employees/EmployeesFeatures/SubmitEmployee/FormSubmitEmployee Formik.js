/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap"
import { BiPlusMedical, BiTrash } from 'react-icons/bi'
import { Formik } from "formik"
import * as Yup from "yup"
import clsx from "clsx"

import { addEmployee, updateEmployee } from "~/redux/employeesSlice"
import { departmentsSelector, teamsSelector } from "~/redux/selectors"
import { fetchDepartments } from "~/redux/departmentsSlice"
import { fetchTeams } from "~/redux/teamsSlice"
import FormSelectDepartment from "./FormSelectDepartment"
import FormSelectPosition from "./FormSelectPosition"
import FormSelectTeam from "./FormSelectTeam"

const FormSubmitEmployee = ({ visible, setVisible, employee = null }) => {
    const departments = useSelector(departmentsSelector).departments
    const teams = useSelector(teamsSelector).teams
    const dispatch = useDispatch()

    /* Quản lý các state */
    const [employeeInfo, setEmployeeInfo] = useState({
        // State lưu thông tin của nhân viên khi người dùng nhập dữ liệu
        code: "",
        name: "",
        avatar: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phoneNumber: "",
        teams: [],
        departments: [],
        user: {
            username: "",
            enableLogin: false
        }
    })
    console.log(employeeInfo)
    const [tab, setTab] = useState('departments')       // State chuyển từ điều chỉnh phòng ban <=> điều chỉnh đội nhóm
    //

    useEffect(() => {
        dispatch(fetchDepartments())
        dispatch(fetchTeams())
        console.log(departments)
        console.log(teams)
        if (employee?.id) {
            let data = {
                ...employee,
                user: (employee.user.enableLogin !== false) ? employee.user : { username: "" },
                departments: employee.departments.map((department, index, array) => {
                    return {
                        ...employee.departments[index],
                        positions: departments.find(dp => dp.id === department.id).positions
                    }
                })
            }
            setEmployeeInfo(data)
        }
    }, [])

    /* Các hàm thay đổi giá trị của state employeeInfo mỗi khi người dùng nhập/chọn dữ liệu mới */
    const handleInputChange = (e) => {
        if (e.target.type === "checkbox") {
            if (e.target.checked) {
                setEmployeeInfo({
                    ...employeeInfo,
                    user: {
                        username: null,
                        enableLogin: false
                    }
                })
            }
            else {
                setEmployeeInfo({
                    ...employeeInfo,
                    user: {
                        username: employeeInfo.email,
                        enableLogin: true
                    }
                })
            }
        }
        else {
            setEmployeeInfo({
                ...employeeInfo,
                [e.target.name]: e.target.value
            })
        }
    }
    const handleUserChange = (e) => {
        setEmployeeInfo({
            ...employeeInfo,
            user: {
                ...employeeInfo.user,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleToggleLogin = (e) => {
        if (e.target.checked) {
            setEmployeeInfo({
                ...employeeInfo,
                user: {
                    username: employeeInfo.user.username || employeeInfo.email,
                    enableLogin: true
                }
            })
        }
        else {
            setEmployeeInfo({
                ...employeeInfo,
                user: {
                    username: "",
                    enableLogin: false
                }
            })
        }
    }
    //

    /* Xử lý khi click vào button Thêm phòng ban */
    const handleShowFormSelectDepartment = (e) => {
        if (employeeInfo.departments?.length === 0) {
            setEmployeeInfo({
                ...employeeInfo,
                departments: [{}]
            })
        }
        else {
            setEmployeeInfo({
                ...employeeInfo,
                departments: [
                    ...employeeInfo.departments,
                    {}
                ]
            })
        }
    }

    const handleDepartmentChange = (index, newDepartment) => {
        let newDepartments = employeeInfo.departments.map((department, key) => {
            if (key === index) {
                return {
                    ...newDepartment,
                    position: {}
                }
            }
            return department
        })
        setEmployeeInfo({
            ...employeeInfo,
            departments: newDepartments
        })
    }

    const handlePositionOfDepartmentChange = (index, position) => {
        let newDepartments = employeeInfo.departments.map((department, key) => {
            if (key === index) {
                return {
                    ...department,
                    position
                }
            }
            return department
        })
        setEmployeeInfo({
            ...employeeInfo,
            departments: newDepartments
        })
    }

    const handleDeleteFormSelectDepartment = (index) => {
        const newDepartments = employeeInfo.departments.filter((e, idx) => index !== idx)
        setEmployeeInfo({
            ...employeeInfo,
            departments: newDepartments
        })
    }
    //

    /* Xử lý khi click vào button Thêm CLB/Đội nhóm */
    const handleShowFormSelectTeam = () => {
        if (employeeInfo.teams?.length === 0) {
            setEmployeeInfo({
                ...employeeInfo,
                teams: [{}]
            })
        }
        else {
            setEmployeeInfo({
                ...employeeInfo,
                teams: [
                    ...employeeInfo.teams,
                    {}
                ]
            })
        }
    }

    const handleTeamChange = (index, newTeam) => {
        let newTeams = employeeInfo.teams.map((team, key) => {
            if (key === index) {
                return {
                    ...newTeam,
                    position: {}
                }
            }
            return team
        })
        setEmployeeInfo({
            ...employeeInfo,
            teams: newTeams
        })
    }

    const handlePositionOfTeamChange = (index, position) => {
        let newTeams = employeeInfo.teams.map((team, key) => {
            if (key === index) {
                return {
                    ...team,
                    position
                }
            }
            return team
        })
        setEmployeeInfo({
            ...employeeInfo,
            teams: newTeams
        })
    }

    const handleDeleteFormSelectTeam = (index) => {
        const newTeams = employeeInfo.teams.filter((e, idx) => index !== idx)
        setEmployeeInfo({
            ...employeeInfo,
            teams: newTeams
        })
    }
    //

    /* Xử lý Submit Form */
    // const [validated, setValidated] = useState(false)
    // const handleSubmit = (e) => {
    //     const form = e.currentTarget
    //     if (form.checkValidity() === false) {
    //         e.preventDefault()
    //         e.stopPropagation()
    //     }
    //     setValidated(true)
    //     if (form.checkValidity() === true) {
    //         e.preventDefault()
    //         e.stopPropagation()
    //         if (employeeInfo.id) {
    //             let data = {
    //                 ...employeeInfo,
    //                 modifyBy: 1
    //             }
    //             data.departments?.forEach((department, index, array) => {
    //                 delete array[index].positions
    //             })
    //             if (data.hasOwnProperty("team") === false) {
    //                 data.teams = []
    //             }
    //             data.teams?.forEach((team, index, array) => {
    //                 delete array[index].positions
    //             })
    //             setVisible(false)
    //             dispatch(updateEmployee(data))
    //         }
    //         else {
    //             let data = {
    //                 ...employeeInfo,
    //                 createBy: 1
    //             }
    //             data.departments?.forEach((department, index, array) => {
    //                 delete array[index].positions
    //             })
    //             data.teams?.forEach((team, index, array) => {
    //                 delete array[index].positions
    //             })
    //             setVisible(false)
    //             dispatch(addEmployee(data))
    //         }
    //     }
    // }
    //


    /* Xử lý form với Formik */
    const initialValues = {
        code: "",
        name: "",
        avatar: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phoneNumber: "",
        teams: [],
        departments: [],
        user: {
            username: "",
            enableLogin: false
        }
    }
    const validationSchema = Yup.object({
        code: Yup.string().required("Vui lòng nhập mã nhân viên."),
        name: Yup.string().required("Vui lòng nhập họ và tên."),
        avatar: Yup.string(),
        dateOfBirth: Yup.date().required("Vui lòng nhập ngày sinh."),
        gender: Yup.number("Giới tính phải là Nam hoặc Nữ.").required("Vui lòng chọn giới tính."),
        email: Yup.string().required("Vui lòng nhập Email.").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không hợp lệ."),
        phoneNumber: Yup.string().required("Vui lòng nhập số điện thoại.").matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Số điện thoại không hợp lệ."),
        teams: Yup.array().of(
            Yup.object().required("Vui lòng chọn đội nhóm và chức vụ.")
        ),
        departments: Yup.array().of(
            Yup.object().required("Vui lòng chọn phòng ban và chức vụ.")
        ),
        user: Yup.object({
            username: Yup.string(),
            enableLogin: Yup.boolean()
        })
    })
    const handleSubmit = async (values, actions) => {
        console.log(values)
        actions.setSubmitting(true)
        if (employee?.id) {
            dispatch(updateEmployee(values))
        }
        else {
            dispatch(addEmployee(values))
        }
        setVisible(false)
        actions.setSubmitting(false)
    }
    //

    return (
        <Modal
            className="modal-fullheight"
            size="lg"
            scrollable
            show={visible}
            onHide={() => setVisible(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title className="text-white">
                    {employee?.id ? "Chỉnh sửa nhân viên" : "Thêm nhân viên"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        ({ values, touched, errors, handleChange, handleBlur, handleSubmit, isValid, dirty }) => (
                            <Form
                                onSubmit={handleSubmit}
                            >
                                <div className="modal-body-content">
                                    <div className="mb-3">
                                        <Form.Label>Mã nhân viên:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="code"
                                            placeholder="Nhập mã nhân viên..."
                                            className={clsx({
                                                "is-invalid": touched.code && errors.code
                                            })}
                                            value={values.code}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            touched.code && errors.code && <div className="invalid-feedback">{errors.code}</div>
                                        }
                                    </div>
                                    <hr />
                                    <div className="mb-3">
                                        <Form.Label>Họ và tên:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            placeholder="Nhập họ và tên..."
                                            className={clsx({
                                                "is-invalid": touched.name && errors.name
                                            })}
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>
                                        }
                                    </div>
                                    <hr />
                                    <div className="mb-3">
                                        <Form.Label>Ngày sinh:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="dateOfBirth"
                                            placeholder="Nhập ngày sinh..."
                                            className={clsx({
                                                "is-invalid": touched.dateOfBirth && errors.dateOfBirth
                                            })}
                                            value={values.dateOfBirth}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            touched.dateOfBirth && errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>
                                        }
                                    </div>
                                    <hr />
                                    <div className="mb-3">
                                        <Form.Label>Giới tính:</Form.Label>
                                        <Form.Select
                                            name="gender"
                                            className={clsx({
                                                "is-invalid": touched.gender && errors.gender
                                            })}
                                            value={values.gender}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <option>Chọn giới tính</option>
                                            <option value={0}>Nữ</option>
                                            <option value={1}>Nam</option>
                                        </Form.Select>
                                        {
                                            touched.gender && errors.gender && <div className="invalid-feedback">{errors.gender}</div>
                                        }
                                    </div>
                                    <hr />
                                    <div className="mb-3">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="email"
                                            placeholder="Nhập email..."
                                            className={clsx({
                                                "is-invalid": touched.email && errors.email
                                            })}
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>
                                        }
                                    </div>
                                    <hr />
                                    <div className="mb-3">
                                        <Form.Label>Số điện thoại:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phoneNumber"
                                            placeholder="Nhập số điện thoại..."
                                            className={clsx({
                                                "is-invalid": touched.phoneNumber && errors.phoneNumber
                                            })}
                                            value={values.phoneNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            touched.phoneNumber && errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>
                                        }
                                    </div>
                                    <hr />
                                    <div className="card mb-3">
                                        <Tabs
                                            activeKey={tab}
                                            onSelect={(k) => setTab(k)}
                                        >
                                            <Tab eventKey="departments" title="Phòng ban">
                                                <div className="card-body">
                                                    {
                                                        values.departments.map((department, index) => (
                                                            <div key={index} className="list-group-item bg-light mb-3">
                                                                <div className="d-flex flex-lg-row flex-column">
                                                                    <div className="mb-3 mb-lg-0 col">
                                                                        <Form.Label>Phòng ban số {index + 1}:</Form.Label>
                                                                        <FormSelectDepartment
                                                                            index={index}
                                                                            current={department}
                                                                            onChange={handleDepartmentChange}
                                                                        />
                                                                    </div>
                                                                    <div className="mb-3 ms-lg-3 col">
                                                                        <Form.Label>Chức vụ của phòng ban số {index + 1}:</Form.Label>
                                                                        <FormSelectPosition
                                                                            index={index}
                                                                            current={values.departments[index]?.position}
                                                                            positions={values.departments[index]?.positions}
                                                                            onChange={handlePositionOfDepartmentChange}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    variant="outline-danger"
                                                                    className="d-block m-auto"
                                                                    onClick={() => handleDeleteFormSelectDepartment(index)}
                                                                >
                                                                    <BiTrash /> Xóa
                                                                </Button>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="mb-3">
                                                    <Button
                                                        variant="outline-primary"
                                                        className="d-block m-auto"
                                                        onClick={(e) => {
                                                            console.log(e)
                                                        }}
                                                    >
                                                        <BiPlusMedical />{" "} Thêm phòng ban {" "}<BiPlusMedical />
                                                    </Button>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="teams" title="CLB/Đội nhóm">
                                                <div className="card-body">
                                                    {
                                                        values.teams?.map((team, index) => (
                                                            <div key={index} className="list-group-item bg-light mb-3">
                                                                <div className="d-flex flex-lg-row flex-column">
                                                                    <div className="mb-3 mb-lg-0 col">
                                                                        <Form.Label>CLB/Đội nhóm số {index + 1}:</Form.Label>
                                                                        <FormSelectTeam
                                                                            index={index}
                                                                            currentTeam={team}
                                                                            onTeamChange={handleTeamChange}
                                                                        />
                                                                    </div>
                                                                    <div className="mb-3 ms-lg-3 col">
                                                                        <Form.Label>Chức vụ của CLB/Đội nhóm số {index + 1}:</Form.Label>
                                                                        <FormSelectPosition
                                                                            index={index}
                                                                            current={values.teams[index]?.position}
                                                                            positions={values.teams[index]?.positions}
                                                                            onChange={handlePositionOfTeamChange}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    variant="outline-danger"
                                                                    className="d-block m-auto"
                                                                    onClick={() => handleDeleteFormSelectTeam(index)}
                                                                >
                                                                    <BiTrash /> Xóa
                                                                </Button>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="mb-3">
                                                    <Button
                                                        variant="outline-primary"
                                                        className="d-block m-auto"
                                                        onClick={handleShowFormSelectTeam}
                                                    >
                                                        <BiPlusMedical />{" "} Thêm CLB/Đội nhóm {" "}<BiPlusMedical />
                                                    </Button>
                                                </div>
                                            </Tab>
                                        </Tabs>
                                    </div>
                                    <hr />
                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <Form.Check
                                                type="switch"
                                                name="user.enableLogin"
                                                label="Cho phép đăng nhập"
                                                checked={values.user.enableLogin}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="card-body">
                                            {(employeeInfo.user.enableLogin) ? (
                                                <>
                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="username" className="mt-3">Tên đăng nhập:</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="user.username"
                                                            value={values.email}
                                                            onChange={handleUserChange}
                                                            required
                                                        />
                                                    </div>
                                                    {((employee?.id && employee?.user.username === "" && employee?.user.password === "cmdcmdcmd") || !employee) ? (
                                                        <>
                                                            <hr />
                                                            <div className="mb-3">
                                                                <Form.Label htmlFor="password">Mật khẩu:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="password"
                                                                    value={"cmacmacma"}
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </>
                                                    ) : null}
                                                </>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    size="lg"
                                    type="submit"
                                    disabled={!(dirty && isValid)}
                                    className="d-table m-auto"
                                >
                                    {(employee?.id) ? "Cập nhật thông tin" : "Xác nhận tạo mới"}
                                </Button>
                            </Form>
                        )
                    }
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default FormSubmitEmployee