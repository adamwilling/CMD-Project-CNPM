import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

import { deleteProposalType } from '~/redux/configs/proposalTypesSlice'

const DeleteProposalType = ({ visible, setVisible, proposalTypeInfo }) => {
    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(deleteProposalType(proposalTypeInfo.id))
        setVisible(false)
    }

    useEffect(() => {
        if (visible) {
            Swal.fire({
                title: "Xóa loại đề xuất",
                html: `Bạn có chắc muốn xóa loại đề xuất <strong>${proposalTypeInfo.name}</strong>?`,
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

export default DeleteProposalType