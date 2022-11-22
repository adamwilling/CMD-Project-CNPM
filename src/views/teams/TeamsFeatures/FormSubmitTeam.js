import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Button, Form, Modal } from "react-bootstrap"
import PropTypes from 'prop-types'

import { addTeam, addTeamToList, updateTeam, updateTeamList } from "~/redux/teamsSlice"
import Positions from "./Positions"
import Swal from "sweetalert2"
import teamsApi from "~/api/teamsApi"

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    team: PropTypes.object
}

const FormSubmitTeam = ({ visible, setVisible, team = null }) => {
    const dispatch = useDispatch()

    /* Quản lý các state */
    const [teamInfo, setTeamInfo] = useState({
        // State lưu thông tin của đội nhóm khi người dùng nhập dữ liệu
        code: "",
        name: "",
        description: "",
        positions: []
    })
    //

    useEffect(() => {
        if (team?.id) {
            setTeamInfo(team)
        }
    }, [team])

    /* Các hàm thay đổi giá trị của state teamInfo mỗi khi người dùng nhập/chọn dữ liệu mới */
    const handleInputChange = (e) => {
        setTeamInfo({
            ...teamInfo,
            [e.target.name]: e.target.value
        })
    }
    //

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
            if (team?.id) {
                teamsApi.updateTeam(teamInfo)
                    .then((response) => {
                        if (response.data.status === "OK") {
                            Toast.fire({
                                title: "Chỉnh sửa đội nhóm",
                                text: response.data.message,
                                icon: "success",
                            })
                            dispatch(updateTeamList(response.data.data))
                            setVisible(false)
                        }
                        else {
                            Toast.fire({
                                title: "Chỉnh sửa đội nhóm",
                                text: response.data.message,
                                icon: "warning",
                            })
                        }
                    })
            }
            else {
                teamsApi.addTeam(teamInfo)
                    .then((response) => {
                        if (response.data.status === "OK") {
                            Toast.fire({
                                title: "Thêm đội nhóm",
                                text: response.data.message,
                                icon: "success",
                            })
                            dispatch(addTeamToList(response.data.data))
                            setVisible(false)
                        }
                        else {
                            Toast.fire({
                                title: "Thêm đội nhóm",
                                text: response.data.message,
                                icon: "warning",
                            })
                        }
                    })
            }
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
                    {team?.id ? "Chỉnh sửa đội nhóm" : "Thêm đội nhóm"}
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
                        Mã đội nhóm<span style={{ color: "red" }}>*</span>:
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="code"
                            placeholder="Nhập mã đội nhóm..."
                            value={teamInfo.code}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập mã đội nhóm.
                        </Form.Control.Feedback>
                    </div>
                    <hr />
                    <div className="mb-3">
                        <Form.Label>
                        Tên đội nhóm<span style={{ color: "red" }}>*</span>:
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nhập tên đội nhóm..."
                            value={teamInfo.name}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập tên đội nhóm.
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
                            placeholder="Nhập mô tả đội nhóm..."
                            value={teamInfo.description}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập mô tả về đội nhóm.
                        </Form.Control.Feedback>
                    </div>
                    <hr />
                    <Positions teamInfo={teamInfo} setTeamInfo={setTeamInfo} />
                    <div className="mb-6" />
                    <Modal.Footer>
                        <Button className="fw-bolder" type="submit">
                            {(team?.id) ? "Cập nhật" : "Lưu"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

FormSubmitTeam.propTypes = propTypes

export default FormSubmitTeam