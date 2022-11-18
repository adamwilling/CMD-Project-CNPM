/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Accordion, Modal } from 'react-bootstrap'

import { getRoleList } from '~/redux/rolesSlice'
import { authSelector, rolesSelector } from '~/redux/selectors'
import AppPagination from '~/components/AppPagination'
import AppSearch from '~/components/AppSearch'
import RoleItem from './RoleItem'
import AddRole from './RolesFeatures/AddRole'
import Loading from '~/components/Loading'

const RolesMainPage = ({ visible, setVisible }) => {
    const rolePermissions = useSelector(authSelector).userInfo.role.role

    const isLoading = useSelector(rolesSelector).status
    const roles = useSelector(rolesSelector).roles
    const pagination = useSelector(rolesSelector).pagination
    const dispatch = useDispatch()
    const [filters, setFilters] = useState({})

    useEffect(() => {
        dispatch(getRoleList(filters))
    }, [filters])

    const handlePageChange = newPage => {
        setFilters({
            ...filters,
            page: newPage
        })
    }
    const handleSearchTerm = searchTerm => {
        setFilters({
            ...filters,
            page: 1,
            name: searchTerm
        })
    }
    return (
        <Modal
            className="modal-fullheight"
            size="lg"
            scrollable
            show={visible}
            onHide={() => setVisible(false)}
        >
            <Modal.Header closeButton className="bg-gradient">
                <Modal.Title>
                    Vai trò
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row align-content-between justify-content-between bg-light p-3">
                    <div className="col">
                        <AppSearch value={filters.name} onSearch={handleSearchTerm} />
                    </div>
                    {
                        rolePermissions.create && (
                            <div className="col-auto">
                                <AddRole />
                            </div>
                        )
                    }
                </div>
                {
                    isLoading === "loading" ? (
                        <Loading />
                    ) : (
                        <Accordion flush alwaysOpen>
                            {
                                roles?.map(role => (
                                    <Accordion.Item
                                        eventKey={role.id}
                                        key={role.id}
                                    >
                                        <RoleItem role={role} />
                                    </Accordion.Item>
                                ))
                            }
                        </Accordion>
                    )
                }
            </Modal.Body>
            <div className="mb-6" />
            <Modal.Footer>
                <AppPagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
            </Modal.Footer>
        </Modal>
    )
}

export default RolesMainPage