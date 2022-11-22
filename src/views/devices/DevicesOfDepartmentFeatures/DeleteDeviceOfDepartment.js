import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { deleteDeviceOfDepartment } from '~/redux/devicesOfDepartmentsSlice'
import Swal from 'sweetalert2'

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    departmentId: PropTypes.number.isRequired,
    deviceInfo: PropTypes.object.isRequired
}

const DeleteDeviceOfDepartment = ({ visible, setVisible, departmentId, deviceInfo }) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteDeviceOfDepartment({
            deviceId: deviceInfo.id,
            departmentId
        }))
        setVisible(false)
    }

    useEffect(() => {
        if (visible) {
            Swal.fire({
                title: "Xóa thiết bị",
                html: `Bạn có chắc muốn xóa thiết bị <strong>${deviceInfo.device.name}</strong> khỏi phòng ban này?`,
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

DeleteDeviceOfDepartment.propTypes = propTypes

export default DeleteDeviceOfDepartment