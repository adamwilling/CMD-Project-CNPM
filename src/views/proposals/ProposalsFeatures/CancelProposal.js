import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import proposalsApi from '~/api/proposalsApi'

import { deleteProposal, updateProposalList } from '~/redux/proposalsSlice'

const CancelProposal = ({ visible, setVisible, proposalInfo }) => {
    const dispatch = useDispatch()

    const handleCancelProposal = async () => {
        const { value: reason } = await Swal.fire({
            title: "Hủy đề xuất",
            input: 'textarea',
            inputLabel: 'Lý do hủy đề xuất',
            inputPlaceholder: 'Nhập lý do hủy đề xuất...',
            inputAttributes: {
                'aria-label': 'Nhập lý do hủy đề xuất'
            },
            showCancelButton: true,
            cancelButtonText: "Hủy"
            
        })

        if (reason) {
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
            return proposalsApi.cancelProposal({
                id: proposalInfo.id,
                reason: reason
            })
                .then((response) => {
                    if (response.data.status === "OK") {
                        Toast.fire({
                            title: "Từ chối xác nhận hoàn thành",
                            text: response.data.message,
                            icon: "success",
                        })
                        dispatch(updateProposalList(response.data.data))
                    }
                    else {
                        Toast.fire({
                            title: "Từ chối xác nhận hoàn thành",
                            text: response.data.message,
                            icon: "warning",
                        })
                    }
                })
        }
    }

    useEffect(() => {
        if (visible) {
            handleCancelProposal()
        }
    },[])

    return null
}

export default CancelProposal