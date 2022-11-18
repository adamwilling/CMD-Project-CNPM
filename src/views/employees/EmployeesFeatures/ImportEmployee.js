import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'

import employeesApi from '~/api/employeesApi'

const ImportEmployee = ({ visible, setVisible }) => {
    const [file, setFile] = useState("")

    const handleSendFile = () => {
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

        const formData = new FormData()
        formData.append("file", file)
        employeesApi.importEmployeeList(formData)
            .then((response) => {
                if (response.data.status === "OK") {
                    Toast.fire({
                        title: "Import",
                        text: response.data.message,
                        icon: "success"
                    })
                }
                else {
                    Toast.fire({
                        title: "Import",
                        text: response.data.message,
                        icon: "warning"
                    })
                }
            })
    }

    return (
        <Modal
            size="md"
            show={visible}
            onHide={() => setVisible(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Nhập danh sách
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-4">
                    <Form.Label>Danh sách cần nhập:</Form.Label>
                    <Form.Control
                        type="file"
                        name="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                    Danh sách cần nhập có định dạng .csv vã thỏa yêu cầu trong phần hướng dẫn sử dụng.
                </div>
                <div className="mb-6" />
                <Modal.Footer>
                    <Button onClick={handleSendFile}>
                        Nhập
                    </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}

export default ImportEmployee