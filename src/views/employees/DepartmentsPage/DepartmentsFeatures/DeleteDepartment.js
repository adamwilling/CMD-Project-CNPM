import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { deleteDepartment } from '~/redux/departmentsSlice'
import Swal from 'sweetalert2'


const DeleteDepartment = ({ visible, setVisible, departmentInfo }) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteDepartment(departmentInfo.id))
        setVisible(false)
    }

    useEffect(() => {
        if (visible) {
            Swal.fire({
                title: "Xóa phòng ban",
                html: `Bạn có chắc muốn xóa phòng ban <strong>${departmentInfo.name}</strong>?`,
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

export default DeleteDepartment