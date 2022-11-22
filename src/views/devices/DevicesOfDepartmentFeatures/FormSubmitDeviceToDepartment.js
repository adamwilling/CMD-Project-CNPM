/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Button, Form, Modal } from "react-bootstrap"
import PropTypes from 'prop-types'

import { addDeviceToDepartment, addDeviceToList, updateDeviceList, updateDeviceOfDepartment } from "~/redux/devicesOfDepartmentsSlice"
import Select from "~/components/Select"
import devicesApi from "~/api/devicesApi"
import Swal from "sweetalert2"
import { addDepartmentToList } from "~/redux/departmentsSlice"

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    departmentId: PropTypes.number,
    device: PropTypes.object
}

const FormSubmitDeviceToDepartment = ({ visible, setVisible, departmentId, device = null }) => {
    const dispatch = useDispatch()

    const [deviceList, setDeviceList] = useState([])
    const [data, setData] = useState({
        departmentId: departmentId,
        device: {},
        description: "",
        isActive: 1
    })

    useEffect(() => {
        if (device?.id) {
            setData({
                ...device,
                departmentId
            })
        }
        devicesApi.getDeviceList()
            .then((response) => {
                setDeviceList(response.data.data)
            })
    }, [])

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSelectDevice = (selecedDevice) => {
        setData({
            ...data,
            device: selecedDevice
        })
    }

    /* Xử lý Submit Form */
    const [validated, setValidated] = useState(false)
    const handleSubmit = (e) => {
        const form = e.currentTarget
        e.preventDefault()
        e.stopPropagation()
        setValidated(true)
        if (form.checkValidity() === true) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 10000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                },
            })
            if (data?.id) {
                devicesApi.updateDeviceOfDepartment(data)
                    .then((response) => {
                        if (response.data.status === "OK") {
                            Toast.fire({
                                title: "Chỉnh sửa thiết bị của phòng ban",
                                text: response.data.message,
                                icon: "success",
                            })
                            dispatch(updateDeviceList({ ...response.data, departmentId: data.departmentId }))
                            setVisible(false)
                        }
                        else {
                            Toast.fire({
                                title: "Chỉnh sửa thiết bị của phòng ban",
                                text: response.data.message,
                                icon: "warning",
                            })
                        }
                    })
            }
            else {
                devicesApi.addDeviceToDepartment(data)
                    .then((response) => {
                        if (response.data.status === "OK") {
                            Toast.fire({
                                title: "Thêm thiết bị vào phòng ban",
                                text: response.data.message,
                                icon: "success",
                            })
                            dispatch(addDeviceToList({ ...response.data, departmentId: data.departmentId }))
                            setVisible(false)
                        }
                        else {
                            Toast.fire({
                                title: "Chỉnh sửa thiết bị vào phòng ban",
                                text: response.data.message,
                                icon: "warning",
                            })
                        }
                    })
            }
            setVisible(false)
        }
    }

    return (
        <Modal
            className="modal-fullheight"
            size="lg"
            scrollable
            backdrop="static"
            show={visible}
            onHide={() => setVisible(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {device?.id ? "Chỉnh sửa thiết bị" : "Thêm thiết bị"}
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
                            Thiết bị<span style={{ color: "red" }}>*</span> :
                        </Form.Label>
                        <Select
                            placeholder="Chọn thiết bị..."
                            displayValue="name"
                            value={data.device}
                            options={deviceList}
                            onSelect={(selecedDevice) => handleSelectDevice(selecedDevice)}
                            required={true}
                            feedbackElement={
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng chọn thiết bị.
                                </Form.Control.Feedback>
                            }
                        />
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
                            placeholder="Nhập mô tả thiết bị..."
                            value={data.description}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập mô tả về thiết bị.
                        </Form.Control.Feedback>
                    </div>
                    <div className="mb-6" />
                    <Modal.Footer>
                        <Button className="fw-bolder" type="submit">
                            {(device?.id) ? "Cập nhật" : "Lưu"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

FormSubmitDeviceToDepartment.propTypes = propTypes

export default FormSubmitDeviceToDepartment