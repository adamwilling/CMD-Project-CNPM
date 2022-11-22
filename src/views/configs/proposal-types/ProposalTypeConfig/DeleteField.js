import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

const DeleteField = ({ visible, setVisible, field }) => {

    const dispatch = useDispatch()

    const handleDelete = () => {
        setVisible({
            ...visible,
            [field.id]: false
        })
    }

    useEffect(() => {
        if (visible) {
            Swal.fire({
                title: "Xóa trường",
                html: `Bạn có chắc muốn xóa trường <strong>${field.label}</strong>?`,
                showCancelButton: true,
                cancelButtonText: "Hủy",
            }).then((result) => {
                if (result.isConfirmed) {
                    handleDelete()
                }
                else {
                    setVisible(false)
                }
            })
        }
    })
    
    return null
}

export default DeleteField