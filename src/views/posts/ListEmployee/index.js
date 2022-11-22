import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import employeesApi from '~/api/employeesApi'
import { NavLink } from 'react-router-dom'
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Loading from '~/components/Loading'

const ListEmployee = props => {

    const [loading, setLoading] = useState(true)
    const [employeeList, setEmployeeList] = useState([])

    useEffect(() => {
        setLoading(true)
        employeesApi.getEmployeeListByName("")
            .then((response) => {
                setEmployeeList(response.data.data.employees)
                setLoading(false)
            })
    }, [])

    return loading ? <Loading /> : employeeList?.map((employee) => (
        <NavLink
            key={employee.id}
            to={`/profile/${employee.id}`}
            className="col-auto"
        >
            <OverlayTrigger
                placement="top-start"
                overlay={
                    <Tooltip>
                        {employee.name}
                    </Tooltip>
                }
            >
                <Image
                    className="rounded-circle float-end cursor-pointer"
                    width={50}
                    height={50}
                    src={"data:image/png;base64," + employee.avatar}
                />
            </OverlayTrigger>
        </NavLink>
    ))
}

ListEmployee.propTypes = {}

export default ListEmployee