import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Modal, Row } from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"
import clsx from "clsx"

import employeesApi from '~/api/employeesApi'
import MultiSelect from '~/components/MultiSelect'

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    proposalType: PropTypes.object
}

const FormSubmitProposalType = ({ visible, setVisible, proposalType }) => {
    const [creatorList, setCreatorList] = useState([])

    useEffect(() => {
        employeesApi.getEmployeeListByName("")
            .then((response) => {
                setCreatorList(response.data.data.employees)
            })
    }, [])

    const handleCreatorSearch = (value) => {
        employeesApi.getEmployeeListByName(value)
            .then((response) => {
                setCreatorList(response.data.data.employees)
            })
    }

    /* Xử lý Form với Formik */
    let initialValues = {
        name: "",
        creators: [],
        repeat: 1
    }
    if (proposalType?.id) {
        initialValues = proposalType
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Vui lòng nhập tên loại đề xuất."),
        creators: Yup.array(),
        repeat: Yup.number().required()
    })

    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true)
        if (proposalType?.id) {

        }
        else {

        }
        setVisible(false)
        actions.setSubmitting(false)
    }
    //
    return (
        <Modal
            className="modal-fullheight"
            size="lg"
            scrollable
            show={visible}
            onHide={() => setVisible(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {proposalType?.id ? "Chỉnh sửa loại đề xuất" : "Thêm loại đề xuất"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        ({ values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue, isValid, dirty }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <Form.Label>Tên loại đề xuất<span style={{ color: "red" }}>*</span>:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Nhập tên loại đề xuất"
                                        className={clsx({
                                            "is-invalid": touched.name && errors.name
                                        })}
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>
                                    }
                                </div>
                                <div className="mb-4">
                                    <Form.Label>Người được phép tạo đề xuất:</Form.Label>
                                    <MultiSelect
                                        placeholder="Chọn người được phép tạo đề xuất..."
                                        displayValue="name"
                                        showCheckbox
                                        options={creatorList}
                                        selectedValues={values.creators}
                                        onSelect={(selectedList) => {
                                            setFieldValue("creators", selectedList)
                                        }}
                                        onRemove={(selectedList) => {
                                            setFieldValue("creators", selectedList)
                                        }}
                                        onSearch={handleCreatorSearch}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Form.Label>Lặp lại:</Form.Label>
                                    <Row className="flex-column justify-content-center ms-1">
                                        <Form.Check
                                            type="radio"
                                            name="repeat"
                                            label="Liên tục"
                                            className="col"
                                            checked={values.repeat === 1}
                                            onChange={() => {
                                                setFieldValue("repeat", 1)
                                            }}
                                        />
                                        <Form.Check
                                            type="radio"
                                            name="repeat"
                                            className="col"
                                            label="Lặp lại hàng tháng"
                                            checked={values.repeat === 2}
                                            onChange={() => {
                                                setFieldValue("repeat", 2)
                                            }}
                                        />
                                        <Form.Check
                                            type="radio"
                                            name="repeat"
                                            className="col"
                                            label="Lặp lại theo năm"
                                            checked={values.repeat === 3}
                                            onChange={() => {
                                                setFieldValue("repeat", 3)
                                            }}
                                        />
                                    </Row>
                                </div>
                                <div className="mb-6" />
                                <Modal.Footer>
                                    <Button
                                        className="fw-bolder"
                                        type="submit"
                                        disabled={!(dirty && isValid)}
                                    >
                                        {proposalType?.id ? "Cập nhật" : "Tạo loại đề xuất"}
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )
                    }
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

FormSubmitProposalType.propTypes = propTypes

export default FormSubmitProposalType