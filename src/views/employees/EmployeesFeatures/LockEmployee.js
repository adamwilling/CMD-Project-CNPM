import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import { updateEmployee } from '~/redux/employeesSlice'
import Swal from 'sweetalert2'


const LockEmployee = ({ visible, setVisible, employeeInfo }) => {
    const dispatch = useDispatch()

    // Hàm xử lý khóa tài khoản
    const handleLock = () => {
        dispatch(updateEmployee({
            ...employeeInfo,
            active: !employeeInfo.active
        }))
        setVisible(false)
    }

    useEffect(() => {
        if (visible) {
            Swal.fire({
                title: "Khóa tài khoản",
                html: `Bạn có chắc muốn khóa tài khoản <strong>${employeeInfo.name}</strong>?`,
                showCancelButton: true,
                cancelButtonText: "Hủy",
            }).then((result) => {
                if (result.isConfirmed) {
                    handleLock()
                }
                else {
                    setVisible(false)
                }
            })
        }
    })
    
    return null
}

export default LockEmployee