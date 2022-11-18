import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

import { deleteEmployee } from '~/redux/employeesSlice'

const DeleteEmployee = ({ visible, setVisible, employeeInfo }) => {
    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(deleteEmployee(employeeInfo.id))
        setVisible(false)
    }

    useEffect(() => {
        if (visible) {
            Swal.fire({
                title: "Xóa sinh viên",
                html: `Bạn có chắc muốn xóa sinh viên <strong>${employeeInfo.name}</strong>?`,
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

export default DeleteEmployee