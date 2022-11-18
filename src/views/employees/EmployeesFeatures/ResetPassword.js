import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
import { BsShieldLock } from 'react-icons/bs'

import { updateEmployee } from '~/redux/employeesSlice'


const ResetPassword = ({ employee }) => {
    const dispatch = useDispatch()
    const [visibleResetPassword, setVisibleResetPassword] = useState(false)              // State hiển thị thông báo xác nhận xóa sinh viên
    const [info, setInfo] = useState({
        password: "",
        repassword: ""
    })

    const handleInputChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    /* Xử lý Submit Form */
    const [validated, setValidated] = useState(false)
    const handleResetPassword = (e) => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }
        setValidated(true)
        if (form.checkValidity() === true) {
            e.preventDefault()
            e.stopPropagation()
            dispatch(updateEmployee({
                ...employee,
                user: {
                    ...info.user,
                    password: info.password
                }
            }))
            setVisibleResetPassword(false)
        }
    }
    //

    return (
        <>
            <Dropdown.Item
                component="button"
                onClick={() => setVisibleResetPassword(!visibleResetPassword)}
            >
                <BsShieldLock /> Cấp lại mật khẩu
            </Dropdown.Item>
            <Modal
                scrollable
                centered
                size="lg"
                show={visibleResetPassword}
                onHide={() => setVisibleResetPassword(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Cấp lại mật khẩu - {employee.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        className="modal-body"
                        noValidate
                        validated={validated}
                        onSubmit={handleResetPassword}
                    >
                        <div className="mb-3">
                            <Form.Label htmlFor="password">Mật khẩu:</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Nhập mật khẩu..."
                                value={info.password}
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập mật khẩu.
                            </Form.Control.Feedback>
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="repassword">Nhập lại mật khẩu:</Form.Label>
                            <Form.Control
                                type="password"
                                name="repassword"
                                placeholder="Nhập lại mật khẩu..."
                                value={info.repassword}
                                onChange={handleInputChange}
                                isInvalid={!(info.password === info.repassword)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Mật khẩu nhập lại không trùng khớp
                            </Form.Control.Feedback>
                        </div>
                        <Button variant="primary">
                            Xác nhận
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ResetPassword