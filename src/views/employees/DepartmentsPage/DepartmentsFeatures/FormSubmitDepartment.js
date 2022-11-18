/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Form, Modal } from "react-bootstrap"

import { addDepartment, updateDepartment } from "~/redux/departmentsSlice"
import { departmentsSelector } from "~/redux/selectors"
import FormSelectDepartment from "../../EmployeesFeatures/SubmitEmployee/FormSelectDepartment"
import Positions from "./Positions"

const FormSubmitDepartment = ({ visible, setVisible, department = null }) => {
    const departments = useSelector(departmentsSelector).departments
    const dispatch = useDispatch()

    /* Quản lý các state */
    const [departmentInfo, setDepartmentInfo] = useState({
        // State lưu thông tin của phòng ban khi người dùng nhập dữ liệu
        code: "",
        name: "",
        description: "",
        fatherDepartmentId: null,
        positions: []
    })
    //

    useEffect(() => {
        if (department?.id) {
            setDepartmentInfo(department)
        }
    }, [department])

    /* Các hàm thay đổi giá trị của state departmentInfo mỗi khi người dùng nhập/chọn dữ liệu mới */
    const handleInputChange = (e) => {
        setDepartmentInfo({
            ...departmentInfo,
            [e.target.name]: e.target.value
        })
    }
    const handleDepartmentChange = (index, department) => {
        setDepartmentInfo({
            ...departmentInfo,
            level: department.level + 1,
            fatherDepartmentId: department.id
        })
    }
    //

    /* Xử lý Submit Form */
    const [validated, setValidated] = useState(false)
    const handleSubmit = (e) => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }
        setValidated(true)
        if (form.checkValidity() === true) {
            e.preventDefault()
            e.stopPropagation()
            if (departmentInfo.id) {
                dispatch(updateDepartment({
                    ...departmentInfo,
                    fatherDepartmentId: departmentInfo.fatherDepartmentId === -1 ? null : departmentInfo.fatherDepartmentId
                }))
            }
            else {
                dispatch(addDepartment({
                    ...departmentInfo,
                    fatherDepartmentId: departmentInfo.fatherDepartmentId === -1 ? null : departmentInfo.fatherDepartmentId
                }))
            }
            setVisible(false)
        }
    }
    //

    // Tìm phòng ban cha dựa theo id
    const fatherDepartment = departments.find(department => department.id === departmentInfo.fatherDepartmentId) || {
        id: null,
        name: "Không có phòng ban cha"
    }
    return (
        <Modal
            className="modal-fullheight"
            size="lg"
            backdrop="static"
            scrollable
            show={visible}
            onHide={() => setVisible(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {department?.id ? "Chỉnh sửa phòng ban" : "Thêm mới phòng ban"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <div className="mb-3">
                        <Form.Label>
                            Mã phòng ban<span style={{ color: "red" }}>*</span>:
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="code"
                            placeholder="Nhập mã phòng ban..."
                            value={departmentInfo.code}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập mã phòng ban.
                        </Form.Control.Feedback>
                    </div>
                    <hr />
                    <div className="mb-3">
                        <Form.Label>
                            Tên phòng ban<span style={{ color: "red" }}>*</span>:
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nhập tên phòng ban..."
                            value={departmentInfo.name}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập tên phòng ban.
                        </Form.Control.Feedback>
                    </div>
                    <hr />
                    <div className="mb-3">
                        <Form.Label>
                            Mô tả<span style={{ color: "red" }}>*</span>:
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={10}
                            name="description"
                            placeholder="Nhập mô tả phòng ban..."
                            value={departmentInfo.description}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập mô tả về phòng ban.
                        </Form.Control.Feedback>
                    </div>
                    <hr />
                    <div className="mb-3">
                        <Form.Label>
                            Phòng ban cha<span style={{ color: "red" }}>*</span>:
                        </Form.Label>
                        <FormSelectDepartment
                            index={null}
                            currentDepartment={fatherDepartment}
                            onDepartmentChange={handleDepartmentChange}
                            departments={departments}
                        />
                    </div>
                    <Positions departmentInfo={departmentInfo} setDepartmentInfo={setDepartmentInfo} />
                    <div className="mb-6" />
                    <Modal.Footer>
                        <Button
                            className="fw-bolder"
                            type="submit"
                        >
                            {(department?.id) ? "Cập nhật" : "Tạo phòng ban"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default FormSubmitDepartment
