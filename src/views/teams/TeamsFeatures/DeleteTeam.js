import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'

import { deleteTeam } from '~/redux/teamsSlice'
import Swal from 'sweetalert2'

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    teamInfo: PropTypes.object.isRequired
}

const DeleteTeam = ({ visible, setVisible, teamInfo }) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteTeam(teamInfo.id))
        setVisible(false)
    }

    useEffect(() => {
        if (visible) {
            Swal.fire({
                title: "Xóa đội nhóm",
                html: `Bạn có chắc muốn xóa đội nhóm <strong>${teamInfo.name}</strong>?`,
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
}

DeleteTeam.propTypes = propTypes

export default DeleteTeam