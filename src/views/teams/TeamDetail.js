/* eslint-disable react-hooks/exhaustive-deps */
import React, {  } from "react"
import PropTypes from "prop-types"
import { Accordion, ListGroup, Modal, Table } from "react-bootstrap"

import TeamMembers from "./TeamMembers"
import { useSelector } from "react-redux"
import { authSelector } from "~/redux/selectors"

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    teamInfo: PropTypes.object.isRequired,
}

const TeamDetail = ({ visible, setVisible, teamInfo }) => {
    const rolePermissions = useSelector(authSelector).userInfo.role.role
    return (
        <Modal className="modal-fullheight" fullscreen scrollable show={visible} onHide={() => setVisible(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết đội nhóm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>Mã đội nhóm: {teamInfo.code}</ListGroup.Item>
                    <ListGroup.Item>Tên đội nhóm: {teamInfo.name}</ListGroup.Item>
                    <ListGroup.Item>Mô tả về đội nhóm: {teamInfo.description === "" ? "Chưa có mô tả" : teamInfo.description}</ListGroup.Item>
                    <ListGroup.Item>
                        <Table striped hover responsive borderless>
                            <thead>
                                <tr>
                                    <td className="fw-bolder">DANH SÁCH CHỨC VỤ</td>
                                    {(rolePermissions.view || rolePermissions.view_all) && <td className="fw-bolder">VAI TRÒ</td>}
                                </tr>
                            </thead>
                            <tbody>
                                {teamInfo.positions?.map((position) => (
                                    <tr key={position.id}>
                                        <td>{position.name}</td>
                                        {(rolePermissions.view || rolePermissions.view_all) && <td>{position.role?.name}</td>}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </ListGroup.Item>
                </ListGroup>
                <Accordion flush defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Danh sách thành viên</Accordion.Header>
                        <Accordion.Body>
                            <TeamMembers teamInfo={teamInfo} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Modal.Body>
        </Modal>
    )
}

TeamDetail.propTypes = propTypes

export default TeamDetail
