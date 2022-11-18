import React, { useState } from 'react'
import { Accordion, Button, ListGroup, Table } from 'react-bootstrap'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { authSelector } from '~/redux/selectors'

import DeleteRole from './DeleteRole'
import FormSubmitRole from './RolesFeatures/FormSubmitRole'

const RoleItem = ({ role }) => {
    const rolePermissions = useSelector(authSelector).userInfo.role.role

    const [visibleEditRoleUI, setVisibleEditRoleUI] = useState(false)
    const [visibleDeleteRoleUI, setVisibleDeleteRoleUI] = useState(false)

    return (
        <>
            <Accordion.Header>
                {role.name}
            </Accordion.Header>
            <Accordion.Body>
                <ListGroup.Item>
                    <div className="row justify-content-around">
                        {
                            rolePermissions.update && (
                                <Button
                                    variant="warning"
                                    className="col-auto"
                                    onClick={() => setVisibleEditRoleUI(true)}
                                >
                                    <BiEdit /> <span className="ps-1">Chỉnh sửa</span>
                                </Button>
                            )
                        }
                        {
                            rolePermissions.delete && (
                                <Button
                                    variant="danger"
                                    className="col-auto"
                                    onClick={() => setVisibleDeleteRoleUI(true)}
                                >
                                    <BiTrash /> <span className="ps-1">Xóa</span>
                                </Button>
                            )
                        }

                    </div>
                </ListGroup.Item>
                {
                    role.positions?.length === 0 ? <div className="list-group-item bg-light">Vai trò này chưa có chức vụ nào nắm giữ</div> : (
                        <Table
                            striped
                            hover
                            responsive
                            borderless
                        >
                            <thead>
                                <tr className="fs-5">
                                    <td>CHỨC VỤ</td>
                                    <td>PHÒNG BAN</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    role.positions?.map(position => (
                                        <tr key={position.id}>
                                            <td>{position.name}</td>
                                            <td>{position.department?.name}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    )
                }
            </Accordion.Body>
            {
                visibleEditRoleUI && <FormSubmitRole visible={visibleEditRoleUI} setVisible={setVisibleEditRoleUI} role={role} />
            }
            {
                visibleDeleteRoleUI && <DeleteRole visible={visibleDeleteRoleUI} setVisible={setVisibleDeleteRoleUI} roleInfo={role} />
            }
        </>
    )
}

export default RoleItem