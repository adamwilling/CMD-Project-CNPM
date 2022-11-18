import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Image, ListGroup } from 'react-bootstrap'
import { BiEdit, BiTrash } from 'react-icons/bi'

import departmentLevelIcon from '~/assets/icons/department_level.svg'
import moreIcon from '~/assets/icons/more.svg'
import DepartmentDetail from './DepartmentDetail'
import DeleteDepartment from './DepartmentsFeatures/DeleteDepartment'
import FormSubmitDepartment from './DepartmentsFeatures/FormSubmitDepartment'

const propTypes = {
    departmentInfo: PropTypes.object.isRequired
}

const DepartmentRow = ({ departmentInfo }) => {
    const departmentPermissions = JSON.parse(localStorage.getItem("userInfo")).role.department

    const [visibleDropdown, setVisibleDropdown] = useState(false)
    const [visibleDepartmentDetailUI, setVisibleDepartmentDetailUI] = useState(false)
    const [visibleEditDepartmentUI, setVisibleEditDepartmentUI] = useState(false)
    const [visibleDeleteDepartmentUI, setVisibleDeleteDepartmentUI] = useState(false)

    return (
        <>
            <ListGroup.Item
                className="position-relative list-group-item-action cursor-pointer"
                style={{ paddingLeft: departmentInfo.level * 40 }}
                onClick={() => setVisibleDepartmentDetailUI(true)}
            >
                <Image src={departmentLevelIcon} />
                <span className="ps-2" /> {departmentInfo.name}
                {
                    (departmentPermissions.update !== false || departmentPermissions.delete !== false) ? (
                        <div
                            className="position-absolute"
                            style={{
                                right: "1rem",
                                bottom: "50%",
                                transform: "translateY(50%)"
                            }}
                        >
                            <Dropdown
                                show={visibleDropdown}
                                onToggle={() => setVisibleDropdown(!visibleDropdown)}
                                className="col-auto"
                            >
                                <Dropdown.Toggle
                                    variant="none"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setVisibleDropdown(!visibleDropdown)
                                    }}>
                                    <Image src={moreIcon} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    onClick={(e) => e.stopPropagation()}
                                    className="animate__animated animate__zoomIn animate__faster"
                                >
                                    {
                                        departmentPermissions.update && (
                                            <Dropdown.Item onClick={(e) => setVisibleEditDepartmentUI(true)}>
                                                <BiEdit /> Chỉnh sửa
                                            </Dropdown.Item>
                                        )
                                    }
                                    {
                                        departmentPermissions.delete && (
                                            <Dropdown.Item onClick={() => setVisibleDeleteDepartmentUI(true)}>
                                                <BiTrash /> Xóa
                                            </Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    ) : null
                }
            </ListGroup.Item>
            {
                visibleDepartmentDetailUI && <DepartmentDetail visible={visibleDepartmentDetailUI} setVisible={setVisibleDepartmentDetailUI} departmentInfo={departmentInfo} />
            }
            {
                visibleEditDepartmentUI && <FormSubmitDepartment visible={visibleEditDepartmentUI} setVisible={setVisibleEditDepartmentUI} department={departmentInfo} />
            }
            {
                visibleDeleteDepartmentUI && <DeleteDepartment visible={visibleDeleteDepartmentUI} setVisible={setVisibleDeleteDepartmentUI} departmentInfo={departmentInfo} />
            }
        </>
    )
}

DepartmentRow.propTypes = propTypes

export default DepartmentRow