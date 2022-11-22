/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Table } from 'react-bootstrap'

import { authSelector, devicesOfDepartmentsSelector } from '~/redux/selectors'
import { getDeviceListOfDepartments } from '~/redux/devicesOfDepartmentsSlice'
import AppSearch from '~/components/AppSearch'
import Loading from '~/components/Loading'
import DeviceOfDepartmentRow from './DevicesOfDepartmentRow'

const DevicesMainPage = () => {
    const devicePermissions = useSelector(authSelector).userInfo.role.device

    const status = useSelector(devicesOfDepartmentsSelector).status
    const devicesOfDepartments = useSelector(devicesOfDepartmentsSelector).devicesOfDepartments

    const dispatch = useDispatch()

    const [filters, setFilters] = useState({
        name: ""
    })

    useEffect(() => {
        document.title = "Thiết bị"
    }, [])


    useEffect(() => {
        dispatch(getDeviceListOfDepartments(filters))
    }, [filters])

    const handleSearchTerm = (searchTerm) => {
        setFilters({
            name: searchTerm
        })
    }
    //

    return (
        <Container fluid>
            <Container fluid>
                <div className="row justify-content-xl-between justify-content-end align-items-center">
                    <div className="col-auto fw-bolder fs-5 mb-xl-0 mb-3">
                        THIẾT BỊ
                    </div>
                    <div className="col" />
                    {/* {
                        devicePermissions.create && (
                            <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                                <AddDevice />
                            </div>
                        )
                    } */}
                </div>
                <hr />
            </Container>
            <Container fluid>
                <Container fluid className="bg-white">
                    {
                        status === "loading" ? <Loading /> : (
                            <Table
                                striped
                                borderless
                                hover
                                responsive
                                className="mt-2"
                            >
                                <thead>
                                    <tr>
                                        <td className="fw-bolder">
                                            Phòng
                                        </td>
                                        <td className="fw-bolder">
                                            Số lượng thiết bị
                                        </td>
                                        <td className="fw-bolder">
                                            Chi tiết
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        devicesOfDepartments.map((device) => (
                                            <DeviceOfDepartmentRow key={device.id} data={device} />
                                        ))
                                    }
                                </tbody>
                            </Table>
                        )
                    }
                </Container>
            </Container>
        </Container>
    )
}

export default DevicesMainPage