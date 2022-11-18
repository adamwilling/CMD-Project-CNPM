import React, { useEffect, useState } from 'react'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'

import departmentsApi from '~/api/departmentsApi'
import MultiSelect from '~/components/MultiSelect'

const FiltersAdvanced = ({ visible, setVisible, filtersAdvanced, setFiltersAdvanced }) => {
    const [departmentList, setDepartmentList] = useState([])
    const [positionList, setPositionList] = useState([])

    useEffect(() => {
        departmentsApi.getDepartmentList()
            .then((response) => {
                setDepartmentList(response.data.data)
            })
    }, [])

    const handleDepartmentSearch = (value) => {
        departmentsApi.getDepartmentList()
            .then((response) => {
                const results = response.data.data.filter((department) => department.name.includes(value))
                setDepartmentList(results)
            })
    }
    const handlePositionSearch = (currentDepartmentIds, value) => {
        departmentsApi.getPositionListByDepartmentIds(currentDepartmentIds)
            .then((response) => {
                const results = response.data.data.filter((position) => position.name.includes(value))
                setPositionList(results)
            })
    }

    const handleResetFilters = () => {
        setFiltersAdvanced({
            code: "",
            name: "",
            dob: "",
            email: "",
            phone: "",
            departmentIds: [],
            positionIds: [],
        })
    }

    /* Xử lý Form với Formik */
    let initialValues = {
        ...filtersAdvanced,
        departments: filtersAdvanced.departments ? filtersAdvanced.departments : [],
        positions: filtersAdvanced.positions ? filtersAdvanced.positions : [],
    }

    const validationSchema = Yup.object({
        code: Yup.string(),
        name: Yup.string(),
        dob: Yup.date(),
        email: Yup.string(),
        phone: Yup.number(),
        departments: Yup.array(),
        positions: Yup.array()
    })

    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true)
        const data = {
            ...values,
            departmentIds: values.departments?.map((department) => department.id) || [],
            positionIds: values.positions?.map((position) => position.id) || [],
        }
        setFiltersAdvanced({
            ...filtersAdvanced,
            ...data
        })
        actions.setSubmitting(false)
    }
    //

    return (
        <Offcanvas
            scroll
            backdrop
            placement="end"
            responsive="lg"
            show={visible}
            onHide={() => setVisible(false)}
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    Lọc nâng cao
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        ({ values, handleChange, handleSubmit, handleReset, setFieldValue }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <Form.Label>Nhập mã:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="code"
                                        placeholder="Nhập mã"
                                        value={values.code}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Form.Label>Họ và tên:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Nhập họ và tên"
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Form.Label>Ngày sinh:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dob"
                                        value={values.dob}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        placeholder="Nhập email"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Form.Label>Số điện thoại:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        placeholder="Nhập số điện thoại"
                                        value={values.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Form.Label>Phòng ban:</Form.Label>
                                    <MultiSelect
                                        placeholder="Chọn phòng ban"
                                        displayValue="name"
                                        showCheckbox
                                        options={departmentList}
                                        selectedValues={filtersAdvanced.departments}
                                        onSelect={(selectedList) => {
                                            setFieldValue("departments", selectedList)
                                            departmentsApi.getPositionListByDepartmentIds(selectedList.map(department => department.id))
                                                .then((response) => {
                                                    setPositionList(response.data.data)
                                                })
                                        }}
                                        onRemove={(selectedList) => {
                                            setFieldValue("departments", selectedList)
                                            departmentsApi.getPositionListByDepartmentIds(selectedList.map(department => department.id))
                                                .then((response) => {
                                                    setPositionList(response.data.data)
                                                })
                                        }}
                                        onSearch={handleDepartmentSearch}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Form.Label>Chức vụ:</Form.Label>
                                    <MultiSelect
                                        placeholder="Chọn chức vụ"
                                        displayValue="name"
                                        showCheckbox
                                        options={positionList}
                                        selectedValues={filtersAdvanced.positions}
                                        onSelect={(selectedList) => {
                                            setFieldValue("positions", selectedList)
                                        }}
                                        onRemove={(selectedList) => {
                                            setFieldValue("positions", selectedList)
                                        }}
                                        onSearch={(value) => handlePositionSearch(values.departments.map(department => department.id), value)}
                                    />
                                </div>
                                <div className="mb-6" />
                                <div className="offcanvas-footer">
                                    <Button
                                        variant="outline-primary"
                                        className="col-5 fw-bolder mx-2"
                                        onClick={(e) => {
                                            handleReset(e)
                                            handleResetFilters()
                                        }}
                                    >
                                        Đặt lại
                                    </Button>
                                    <Button
                                        className="col-5 fw-bolder mx-2"
                                        type="submit"
                                    >
                                        Áp dụng
                                    </Button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default FiltersAdvanced