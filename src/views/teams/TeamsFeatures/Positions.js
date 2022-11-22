/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, ListGroup } from 'react-bootstrap'
import { BiTrash } from 'react-icons/bi'

import { getRoleList } from '~/redux/rolesSlice'
import { rolesSelector } from '~/redux/selectors'
import Select from '~/components/Select'

const Positions = ({ teamInfo, setTeamInfo }) => {
    const roles = useSelector(rolesSelector).roles
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRoleList())
    }, [])

    /* Các hàm thay đổi giá trị của state teamInfo mỗi khi người dùng nhập/chọn dữ liệu mới */
    const handleInputChange = (e) => {
        const index = e.target.tabIndex
        const name = e.target.name
        const value = (e.target.type === "checkbox") ? e.target.checked : e.target.value
        const start = teamInfo.positions.slice(0, index) || []
        const end = teamInfo.positions.slice(index + 1, teamInfo.positions.length + 1) || []
        setTeamInfo({
            ...teamInfo,
            positions: [
                ...start,
                {
                    ...teamInfo.positions[index],
                    [name]: value
                },
                ...end]
        })
    }
    const handleRoleChange = (newRole, index) => {
        let newPositions = teamInfo.positions.map((position, key) => {
            if (key === index) {
                return {
                    ...position,
                    role: newRole
                }
            }
            return position
        })
        setTeamInfo({
            ...teamInfo,
            positions: newPositions
        })
    }
    const handleDelete = (index) => {
        const array = teamInfo.positions.filter((e, idx) => index !== idx)
        setTeamInfo({
            ...teamInfo,
            positions: array
        })
    }
    //

    // Thêm một form nhập chức vụ mới mỗi khi click vào Button Thêm chức vụ
    const handleShowFormAddPostion = () => {
        if (teamInfo.positions?.length === 0) {
            setTeamInfo({
                ...teamInfo,
                positions: [{
                    name: "",
                    isManager: false,
                    role: {
                        id: "",
                        name: ""
                    }
                }]
            })
        }
        else {
            setTeamInfo({
                ...teamInfo,
                positions: [
                    ...teamInfo.positions,
                    {
                        name: "",
                        isManager: false,
                        role: {
                            id: "",
                            name: ""
                        }
                    }
                ]
            })
        }
    }

    return (
        <>
            {
                teamInfo?.positions?.map((position, index) => (
                    <ListGroup.Item key={index} className="bg-light text-body">
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Tên chức vụ<span style={{ color: "red" }}>*</span>:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                tabIndex={index}
                                placeholder="Nhập tên chức vụ..."
                                value={position.name}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập tên chức vụ.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Vai trò<span style={{ color: "red" }}>*</span>:
                            </Form.Label>
                            <Select
                                placeholder="Chọn vai trò"
                                displayValue="name"
                                value={position.role}
                                options={roles}
                                onSelect={(newRole) => handleRoleChange(newRole, index)}
                                required={true}
                                feedbackElement={
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng chọn vai trò.
                                    </Form.Control.Feedback>
                                }
                            />
                        </Form.Group>
                        <div className="row justify-content-center">
                            <Form.Check
                                label="Là trưởng phòng"
                                name="isManager"
                                className="col ms-3"
                                tabIndex={index}
                                disabled={teamInfo.positions.some(e => e.isManager === true) && position.isManager === false}
                                checked={position.isManager}
                                onChange={handleInputChange}
                            />
                            <Button variant="none" className="col-auto me-3" onClick={() => handleDelete(index)}>
                                <BiTrash />
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))
            }
            <div className="mb-3 mt-3">
                <Button variant="outline-primary" className="d-table m-auto" onClick={handleShowFormAddPostion}>
                    Thêm chức vụ
                </Button>
            </div>
        </>
    )
}

export default Positions