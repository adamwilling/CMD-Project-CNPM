import React, { useState } from 'react'
import { Button, Form, Modal, Row } from 'react-bootstrap'
import { CSVLink } from 'react-csv'
import Loading from '~/components/Loading'

const ExportEmployee = ({ data, visible, setVisible, loading }) => {
    const [fileName, setFileName] = useState("Employees-" + new Date() + ".csv") 

    let dataReport = data.map(item => {
        return {
            ...item,
            gender: item.gender === 0 ? "Nữ" : "Nam",
            username: item.user.enableLogin === true ? item.user.username : "Không được đăng nhập",
            active: item.active === true ? "Đang hoạt động" : "Không hoạt động",
            departments: item.departments?.length > 0 ? item.departments.map(department => {
                return "" + department.name + ":" + department.position.name
            }).join("\n") : "Chưa ở trong bất kì phòng ban nào",
            teams: item.teams?.length > 0 ? item.teams.map(team => {
                return "" + team.name + ":" + team.position.name
            }).join("\n") : "Chưa tham gia đội nhóm"
        }
    })
    const headers = [
        { label: "Id", key: "id" },
        { label: "Mã", key: "code" },
        { label: "Họ và tên", key: "name" },
        { label: "Ngày sinh", key: "dateOfBirth" },
        { label: "Email", key: "email" },
        { label: "Số điện thoại", key: "phoneNumber" },
        { label: "Link ảnh đại diện", key: "avatar" },
        { label: "Giới tính", key: "gender" },
        { label: "Tên người dùng", key: "username" },
        { label: "Trạng thái hoạt động", key: "active" },
        { label: "Ngày tạo", key: "createDate" },
        { label: "Tạo bởi", key: "createBy" },
        { label: "Ngày chỉnh sửa", key: "modifyDate" },
        { label: "Chỉnh sửa bởi", key: "modifyBy" },
        { label: "Danh sách phòng ban", key: "departments" },
        { label: "Danh sách đội nhóm", key: "teams" }
    ]
    const csvReport = {
        data: dataReport,
        headers: headers,
        filename: fileName

    }
    return (
        <Modal
            size="md"
            show={visible}
            onHide={() => setVisible(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Xuất danh sách
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {
                loading ? <Loading /> : (
                    <>
                <Row>
                    <Form.Label className="col-9">Tổng số sinh viên trong danh sách:</Form.Label>
                    <div className="col-3">{data.length}</div>
                </Row>
                        <div className="mb-4">
                            <Form.Label>Tên file:</Form.Label>
                            <Form.Control
                                type="text"
                                name="fileName"
                                placeholder="Nhập tên file..."
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập tên file.
                            </Form.Control.Feedback>
                        </div>
                <CSVLink
                    {...csvReport}
                    className="btn"
                >
                <div className="mb-4" />
                    <Modal.Footer>
                        <Button>
                            Tải danh sách
                        </Button>
                    </Modal.Footer>
                </CSVLink>
                    </>
                ) 
            }
            </Modal.Body>
        </Modal>
    )
}

export default ExportEmployee