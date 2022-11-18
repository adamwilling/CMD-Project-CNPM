/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { ListGroup, Modal, Table } from 'react-bootstrap'

import { departmentsSelector } from '~/redux/selectors'
import departmentsApi from '~/api/departmentsApi'
import Loading from '~/components/Loading'

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    departmentInfo: PropTypes.object.isRequired
}

const DepartmentDetail = ({ visible, setVisible, departmentInfo }) => {
    const departments = useSelector(departmentsSelector).departments    // Lấy danh sách phòng ban từ redux

    // const [loading, setLoading] = useState(true)
    // const [departmentInfo, setDepartmentInfo] = useState({})

    let parentName = ""     // Khởi tạo tên phòng ban cha mặc định là rỗng

    // useEffect(() => {
    //     departmentsApi.getDepartmentDetailById(departmentId)
    //         .then((response) => {
    //             setDepartmentInfo(response.data.data)
    //             setLoading(false)
    //         })
    // }, [])

    // Duyệt qua danh sách phòng ban để tìm ra tên phòng ban cha
    departments.forEach(dp => {
        if (dp.id === departmentInfo.fatherDepartmentId) {
            parentName = dp.name
        }
    })

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
                    Chi tiết phòng ban
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* {
                    loading ? <Loading /> : ( */}
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                Mã phòng ban: {departmentInfo.code}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Tên phòng ban: {departmentInfo.name}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Thuộc sự quản lý của phòng ban: {parentName || departmentInfo.name}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Mô tả về phòng ban: {departmentInfo.description === "" ? "Chưa có mô tả" : departmentInfo.description}
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
                                            <td>
                                                <span className="fw-bolder">
                                                    CHỨC VỤ
                                                </span>
                                            </td>
                                            <td>
                                                <span className="fw-bolder">
                                                    VAI TRÒ
                                                </span>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            departmentInfo.positions?.map((position, index) => (
                                                <tr key={index}>
                                                    <td>{position.name}</td>
                                                    <td>{position.role?.name}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </ListGroup.Item>
                        </ListGroup>
                    {/* )
                } */}
            </Modal.Body>
        </Modal>
    )
}

DepartmentDetail.propTypes = propTypes

export default DepartmentDetail