import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Accordion, Button, Card, Dropdown, Image, ListGroup, Table } from 'react-bootstrap'
import { BiEdit, BiInfoSquare, BiTrash } from 'react-icons/bi'

import moreIcon from '~/assets/icons/more.svg'
import DeviceDetail from './DevicesOfDepartmentDetail'
import DeleteDevice from './DevicesOfDepartmentFeatures/DeleteDeviceOfDepartment'
import FormSubmitDevice from './DevicesOfDepartmentFeatures/FormSubmitDeviceToDepartment'
import { AiFillInfoCircle } from 'react-icons/ai'
import devicesApi from '~/api/devicesApi'
import { authSelector } from '~/redux/selectors'
import { useSelector } from 'react-redux'

const propTypes = {
    data: PropTypes.object.isRequired
}

const DevicesOfDepartmentRow = ({ data }) => {
    const devicePermissions = useSelector(authSelector).userInfo.role.device

    const [visibleDeviceDetailUI, setVisibleDeviceDetailUI] = useState(false)
    const [visibleEditDeviceUI, setVisibleEditDeviceUI] = useState(false)
    const [visibleDeleteDeviceUI, setVisibleDeleteDeviceUI] = useState(false)

    return (
        <>
            <tr>
                <td>
                    {data.name}
                </td>
                <td>
                    {data.devices.length}
                </td>
                <td onClick={() => setVisibleDeviceDetailUI(true)} className="view-detail">
                    <AiFillInfoCircle size={20} />
                </td>
            </tr>
            {
                visibleDeviceDetailUI && <DeviceDetail
                    visible={visibleDeviceDetailUI}
                    setVisible={setVisibleDeviceDetailUI}
                    devicesOfDepartment={data}
                />
            }
        </>
    )
}

DevicesOfDepartmentRow.propTypes = propTypes

export default DevicesOfDepartmentRow