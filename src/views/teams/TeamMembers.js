import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'

const propTypes = {
    teamInfo: PropTypes.object.isRequired
}

const TeamMembers = ({ teamInfo }) => {
    return (
        <>
            {
                teamInfo.employees?.length === 0 ? <div className="list-group-item bg-light">Đội nhóm này chưa có thành viên</div> : (
                    <Table
                        striped
                        hover
                        responsive
                        borderless
                    >
                        <thead>
                            <tr>
                                <td className="fw-bolder">
                                    HỌ VÀ TÊN
                                </td>
                                <td className="fw-bolder">
                                    EMAIL
                                </td>
                                <td className="fw-bolder">
                                    SĐT
                                </td>
                                <td className="fw-bolder">
                                    CHỨC VỤ
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                teamInfo.employees?.map(employee => (
                                    <tr key={employee.id}>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.phoneNumber}</td>
                                        <td>{employee.position.name}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                )
            }
        </>
    )
}

TeamMembers.propTypes = propTypes

export default TeamMembers