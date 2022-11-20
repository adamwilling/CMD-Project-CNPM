import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Offcanvas, Row } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'

import MultiSelect from '~/components/MultiSelect'
import employeesApi from '~/api/employeesApi'
import proposalsApi from '~/api/proposalsApi'
import proposalTypesApi from '~/api/proposalTypesApi'
import Swal from 'sweetalert2'

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    filtersAdvanced: PropTypes.object.isRequired,
    setFiltersAdvanced: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
}

const FiltersAdvanced = ({ visible, setVisible, filtersAdvanced, setFiltersAdvanced, type }) => {

    const [values, setValues] = useState(filtersAdvanced)
    const [creatorList, setCreatorList] = useState([])
    const [statusList, setStatusList] = useState([])
    const [proposalTypeList, setProposalTypeList] = useState([])

    useEffect(() => {
        proposalTypesApi.getProposalTypeList()
            .then((response) => {
                setProposalTypeList(response.data.data)
            })
        employeesApi.getEmployeeListByName("")
            .then((response) => {
                setCreatorList(response.data.data.employees)
            })
        proposalsApi.getStatusList()
            .then((response) => {
                setStatusList(response.data.data)
            })
    }, [])

    const handleProposalTypeSearch = (value) => {
        proposalsApi.getProposalTypeList()
            .then((response) => {
                const results = response.data.data.filter((status) => status.name.includes(value))
                setProposalTypeList(results)
            })
    }
    const handleCreatorSearch = (value) => {
        employeesApi.getEmployeeListByName(value)
            .then((response) => {
                setCreatorList(response.data.data.employees)
            })
    }
    const handleStatusSearch = (value) => {
        proposalsApi.getStatusList()
            .then((response) => {
                const results = response.data.data.filter((status) => status.name.includes(value))
                setStatusList(results)
            })
    }

    const setFieldValue = (fieldName, value) => {
        setValues({
            ...values,
            [fieldName]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-start',
            showConfirmButton: false,
            timer: 10000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
        })
        if (new Date(values.createDateFrom).getTime() >= new Date(values.createDateTo).getTime()) {
            Toast.fire({
                title: "Cảnh báo lỗi",
                text: "Khoảng thời gian lọc theo ngày tạo đề xuất không hợp lệ.",
                icon: "error",
            })
            return
        }

        setFiltersAdvanced({
            ...values,
            proposalTypeIds: values.proposalTypes?.map((proposalType) => proposalType.id) || [],
            creatorIds: values.creators?.map((creator) => creator.id) || [],
            statusIds: values.statuses?.map((status) => status.id) || []
        })
    }
    //

    const handleReset = () => {
        setValues({
            statuses: [],
            statusIds: [],
            creators: [],
            creatorIds: [],
            createDateFrom: "",
            createDateTo: "",
            proposalTypes: [],
            proposalTypeIds: [],
        })
    }

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
                <Form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Form.Label>Loại đề xuất:</Form.Label>
                        <MultiSelect
                            placeholder="Chọn loại đề xuất..."
                            displayValue="name"
                            showCheckbox
                            options={proposalTypeList}
                            selectedValues={values.proposalTypes}
                            onSelect={(selectedList) => setFieldValue("proposalTypes", selectedList)}
                            onRemove={(selectedList) => {
                                setFieldValue("proposalTypes", selectedList)
                            }}
                            onSearch={handleProposalTypeSearch}
                        />
                    </div>
                    {
                        type !== "created-by-me" && (
                            <div className="mb-4">
                                <Form.Label>Người đề xuất:</Form.Label>
                                <MultiSelect
                                    placeholder="Chọn người đề xuất..."
                                    displayValue="name"
                                    showCheckbox
                                    options={creatorList}
                                    selectedValues={values.creators}
                                    onSelect={(selectedList) => setFieldValue("creators", selectedList)}
                                    onRemove={(selectedList) => {
                                        setFieldValue("creators", selectedList)
                                    }}
                                    onSearch={handleCreatorSearch}
                                />
                            </div>
                        )
                    }
                    <div className="mb-4">
                        <Form.Label>Trạng thái:</Form.Label>
                        <MultiSelect
                            placeholder="Chọn trạng thái..."
                            displayValue="name"
                            showCheckbox
                            options={statusList}
                            selectedValues={values.statuses}
                            onSelect={(selectedList) => setFieldValue("statuses", selectedList)}
                            onRemove={(selectedList) => setFieldValue("statuses", selectedList)}
                            onSearch={handleStatusSearch}
                        />
                    </div>
                    <Row className="mb-4 justify-content-betwween">
                        <div className="col-12 col-lg-6">
                            <Form.Label>Ngày tạo từ:</Form.Label>
                            <Form.Control
                                type="date"
                                name="createDateFrom"
                                value={values.createDateFrom}
                                onChange={(e) => setFieldValue("createDateFrom", e.target.value)}
                            />
                        </div>
                        <div className="col-12 col-lg-6">
                            <Form.Label>Đến ngày:</Form.Label>
                            <Form.Control
                                type="date"
                                name="createDateTo"
                                value={values.createDateTo}
                                onChange={(e) => setFieldValue("createDateTo", e.target.value)}
                            />
                        </div>
                    </Row>
                    <div className="mb-6" />
                    <div className="offcanvas-footer">
                        <Button
                            variant="outline-primary"
                            className="col-5 fw-bolder mx-2"
                            onClick={handleReset}
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
            </Offcanvas.Body>
        </Offcanvas>
    )
}

FiltersAdvanced.propTypes = propTypes

export default FiltersAdvanced