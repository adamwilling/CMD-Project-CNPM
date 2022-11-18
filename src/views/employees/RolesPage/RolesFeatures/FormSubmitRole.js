/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { Button, Form, Modal, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from 'prop-types'

import rolesApi from "~/api/rolesApi"
import { addRole, updateRole } from "~/redux/rolesSlice"
import { authSelector } from "~/redux/selectors"

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    role: PropTypes.object
}

const FormSubmitRole = ({ visible, setVisible, role = null }) => {
    const userInfo = useSelector(authSelector).userInfo

    const dispatch = useDispatch()
    const [roleInfo, setRoleInfo] = useState({
        name: "",
        createBy: null,
        modifyBy: null,
        options: [],
        positions: [],
    })

    useEffect(() => {
        if (role?.id) {
            setRoleInfo(role)
        }
        else {
            rolesApi.getRoleOptions()
                .then((response) => {
                    setRoleInfo({
                        ...roleInfo,
                        options: response.data.data
                    })
                })
        }
    }, [])

    const handleInputChange = (e) => {
        setRoleInfo({
            ...roleInfo,
            [e.target.name]: e.target.value,
        })
    }
    const handleCheck = (option_index, permission_index) => {
        const startOptions = roleInfo.options.slice(0, option_index) || []
        const endOptions = roleInfo.options.slice(option_index + 1, roleInfo.options.length + 1) || []

        const startPermissions = roleInfo.options[option_index].permissions.slice(0, permission_index) || []
        const endPermissions =
            roleInfo.options[option_index].permissions.slice(permission_index + 1, roleInfo.options[option_index].permissions.length + 1) || []

        setRoleInfo({
            ...roleInfo,
            options: [
                ...startOptions,
                {
                    ...roleInfo.options[option_index],
                    permissions: [
                        ...startPermissions,
                        {
                            ...roleInfo.options[option_index].permissions[permission_index],
                            selected: !roleInfo.options[option_index].permissions[permission_index].selected,
                        },
                        ...endPermissions,
                    ],
                },
                ...endOptions,
            ],
        })
    }
    const handleCheckAll = (option_index) => {
        const startOptions = roleInfo.options.slice(0, option_index) || []
        const endOptions = roleInfo.options.slice(option_index + 1, roleInfo.options.length + 1) || []
        const isAllTrue = roleInfo.options[option_index]?.permissions.every((permission) => permission.selected === true)
        setRoleInfo({
            ...roleInfo,
            options: [
                ...startOptions,
                {
                    ...roleInfo.options[option_index],
                    permissions: roleInfo.options[option_index]?.permissions.map((permission) => {
                        return {
                            ...permission,
                            selected: isAllTrue ? false : true,
                        }
                    }),
                },
                ...endOptions,
            ],
        })
    }

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
            if (roleInfo.id) {
                dispatch(
                    updateRole({
                        ...roleInfo,
                        modifyBy: userInfo.id,
                    })
                )
            } else {
                dispatch(
                    addRole({
                        ...roleInfo,
                        createBy: userInfo.id,
                        modifyBy: null,
                    })
                )
            }
            setVisible(false)
        }
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
                <Modal.Title>
                    {role?.id ? "Chỉnh sửa vai trò" : "Tạo mới vai trò"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <div className="mb-3">
                        <Form.Label htmlFor="name">
                            Tên vai trò<span style={{ color: "red" }}>*</span>:
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nhập tên vai trò..."
                            value={roleInfo.name}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập tên vai trò.
                        </Form.Control.Feedback>
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="permissions">Quyền:</Form.Label>
                        <Table borderless>
                            <thead>
                                <tr>
                                    <td></td>
                                    {roleInfo.options[0]?.permissions.map((permission, permission_index) => (
                                        <td key={permission_index}>{permission.label}</td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {roleInfo.options?.map((option, option_index) => (
                                    <tr key={option_index}>
                                        <td>
                                            <Form.Check
                                                type="checkbox"
                                                name={option.name}
                                                label={option.label + ":"}
                                                checked={roleInfo.options[option_index].permissions.every(
                                                    (permission) => permission.selected === true
                                                )}
                                                onChange={() => handleCheckAll(option_index)}
                                            />
                                        </td>
                                        {roleInfo.options[0]?.permissions?.map((permission, permission_index) => (
                                            <td key={permission_index + 1}>
                                                <Form.Check
                                                    type="checkbox"
                                                    name={permission.name}
                                                    checked={roleInfo.options[option_index].permissions[permission_index].selected}
                                                    onChange={() => handleCheck(option_index, permission_index)}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="mb-6" />
                    <Modal.Footer>
                        <Button
                            className="fw-bolder"
                            type="submit"
                        >
                            {role?.id ? "Cập nhật" : "Lưu"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

FormSubmitRole.propTypes = propTypes

export default FormSubmitRole