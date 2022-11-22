/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Accordion, Button, Form, ListGroup, Modal, Table } from 'react-bootstrap'

import FormSubmitDeviceToDepartment from './DevicesOfDepartmentFeatures/FormSubmitDeviceToDepartment'
import { BiEdit, BiTrash } from 'react-icons/bi'
import DeleteDeviceOfDepartment from './DevicesOfDepartmentFeatures/DeleteDeviceOfDepartment'
import { updateDeviceOfDepartment } from '~/redux/devicesOfDepartmentsSlice'
import { authSelector } from '~/redux/selectors'

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    devicesOfDepartment: PropTypes.object.isRequired
}

const DevicesOfDepartmentDetail = ({ visible, setVisible, devicesOfDepartment }) => {
    const devicePermissions = useSelector(authSelector).userInfo.role.device

    const dispatch = useDispatch()

    const [visibleAddDeviceToDepartmentUI, setVisibleAddDeviceToDepartmentUI] = useState(false)
    const [visibleEditDeviceOfDepartmentUI, setVisibleEditDeviceOfDepartmentUI] = useState({})
    const [visibleDeleteDeviceOfDepartmentUI, setVisibleDeleteDeviceOfDepartmentUI] = useState({})

    const handleActiveChange = (device) => {
        dispatch(updateDeviceOfDepartment({
            ...device,
            departmentId: devicesOfDepartment.id,
            deviceId: device.id,
            isActive: !device.isActive
        }))
    }

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
                    Danh sách thiết bị - Phòng {devicesOfDepartment.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <div className="d-flex justify-content-end align-items-center mb-3">
                            <Button
                                variant="primary"
                                onClick={() => setVisibleAddDeviceToDepartmentUI(true)}
                            >
                                Thêm thiết bị
                            </Button>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Table
                            striped
                            hover
                            responsive
                            borderless
                        >
                            <thead>
                                <tr>
                                    <td className="fw-bolder">
                                        TÊN THIẾT BỊ
                                    </td>
                                    <td className="fw-bolder">
                                        MÔ TẢ
                                    </td>
                                    <td className="fw-bolder">
                                        TRẠNG THÁI
                                    </td>
                                    {
                                        (devicePermissions.update || devicePermissions.delete) && (
                                            <td className="fw-bolder">
                                                THAO TÁC
                                            </td>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    devicesOfDepartment.devices?.map((device) => (
                                        <tr key={device.id}>
                                            <td>{device.device.name}</td>
                                            <td>{device.description}</td>
                                            <td>
                                                {
                                                    devicePermissions.update ? (
                                                        <Form.Check
                                                            type="switch"
                                                            label="Đang hoạt động"
                                                            checked={device.isActive}
                                                            onChange={() => handleActiveChange(device)}
                                                        />
                                                    ) : device.isActive ? (
                                                        <span className="text-success fw-bold">
                                                            Đang hoạt động
                                                        </span>
                                                    ) : (
                                                        <span className="text-secondary fw-bold">
                                                            Không hoạt động
                                                        </span>
                                                    )
                                                }
                                            </td>
                                            {
                                                (devicePermissions.update || devicePermissions.delete) && (
                                                    <td className="fw-bolder">
                                                        <BiEdit
                                                            size={20}
                                                            className="ms-1 cursor-pointer"
                                                            onClick={() => {
                                                                setVisibleEditDeviceOfDepartmentUI({
                                                                    ...visibleEditDeviceOfDepartmentUI,
                                                                    [device.id]: true
                                                                })
                                                            }}
                                                        />
                                                        <BiTrash
                                                            size={20}
                                                            className="ms-1 cursor-pointer"
                                                            onClick={() => {
                                                                setVisibleDeleteDeviceOfDepartmentUI({
                                                                    ...visibleDeleteDeviceOfDepartmentUI,
                                                                    [device.id]: true
                                                                })
                                                            }}
                                                        />
                                                        {
                                                            visibleEditDeviceOfDepartmentUI[device.id] && <FormSubmitDeviceToDepartment
                                                                visible={visibleEditDeviceOfDepartmentUI[device.id]}
                                                                setVisible={(visible) => setVisibleEditDeviceOfDepartmentUI({
                                                                    ...visibleEditDeviceOfDepartmentUI,
                                                                    [device.id]: visible
                                                                })}
                                                                departmentId={devicesOfDepartment.id}
                                                                device={device}
                                                            />
                                                        }
                                                        {
                                                            visibleDeleteDeviceOfDepartmentUI[device.id] && <DeleteDeviceOfDepartment
                                                                visible={visibleDeleteDeviceOfDepartmentUI[device.id]}
                                                                setVisible={(visible) => setVisibleDeleteDeviceOfDepartmentUI({
                                                                    ...visibleDeleteDeviceOfDepartmentUI,
                                                                    [device.id]: visible
                                                                })}
                                                                departmentId={devicesOfDepartment.id}
                                                                deviceInfo={device}
                                                            />
                                                        }
                                                    </td>
                                                )
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            {
                visibleAddDeviceToDepartmentUI && <FormSubmitDeviceToDepartment
                    visible={visibleAddDeviceToDepartmentUI}
                    setVisible={setVisibleAddDeviceToDepartmentUI}
                    departmentId={devicesOfDepartment.id}
                />
            }
        </Modal>
    )
}

DevicesOfDepartmentDetail.propTypes = propTypes

export default DevicesOfDepartmentDetail