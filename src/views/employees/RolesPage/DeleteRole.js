import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

import { deleteRole } from '~/redux/rolesSlice'


const DeleteRole = ({ visible, setVisible, roleInfo }) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteRole(roleInfo.id))
        setVisible(false)
    }

    useEffect(() => {
        if (visible) {
            Swal.fire({
                title: "Xóa vai trò",
                html: `Bạn có chắc muốn xóa vai trò <strong>${roleInfo.name}</strong>?`,
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

export default DeleteRole