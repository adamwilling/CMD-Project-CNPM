import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { deleteApprovalStep } from '~/redux/configs/approvalStepsSlice'

const DeleteApprovalStep = ({ visible, setVisible, step }) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteApprovalStep(step.id))
        setVisible(false)
    }

    useEffect(() => {
        if (visible) {
            Swal.fire({
                title: "Xóa bước duyệt",
                html: `Bạn có chắc muốn xóa bước duyệt <strong>${step.name}</strong>?`,
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

export default DeleteApprovalStep