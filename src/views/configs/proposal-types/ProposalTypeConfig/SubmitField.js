import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { Formik } from 'formik'
import clsx from 'clsx'
import { Button, Form, Modal } from 'react-bootstrap'

import proposalTypesApi from '~/api/proposalTypesApi'
import Select from '~/components/Select'

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    type: PropTypes.string,
    field: PropTypes.object
}

const SubmitField = ({ visible, setVisible, type, info }) => {
    const [dataTypeList, setDataTypeList] = useState([])

    useEffect(() => {
        proposalTypesApi.getDataTypeList()
            .then((response) => {
                setDataTypeList(response.data.data)
            })
    }, [])

    /* Xử lý Form với Formik */
    let initialValues = {
        label: "",
        placeholder: "",
        showDescription: false,
        description: "",
        feedback: "",
        dataType: {
            id: "",
            name: ""
        },
        required: false
    }
    if (info?.id) {
        initialValues = {
            ...info,
            showDescription: info.description !== "" && info.description !== null
        }
    }

    const validationSchema = Yup.object({
        label: Yup.string().required("Vui lòng nhập tên trường."),
        placeholder: Yup.string().required("Vui lòng nhập placeholder."),
        description: Yup.string(),
        feedback: Yup.string(),
        dataType: Yup.object().required("Vui lòng chọn loại."),
        required: Yup.bool()
    })

    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true)
        // if (task?.id) {
        //     dispatch(updateTask({
        //         ...values,
        //         creatorId: userInfo.id,
        //         receiverId: values.receiver.id,
        //         statusId: values.status.id
        //     }))
        // }
        // else {
        //     dispatch(addTask({
        //         ...values,
        //         creatorId: userInfo.id,
        //         receiverId: values.receiver.id
        //     }))
        // }
        setVisible(false)
        actions.setSubmitting(false)
    }
    //

    return (
        <Modal
            centered
            size="md"
            backdrop="static"
            show={visible}
            onHide={() => setVisible(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {
                        type === "proposal-type" ? info?.id ? "Chỉnh sửa trường - Biểu mẫu" : "Thêm trường - Biểu mẫu" : info?.id ? `Chỉnh sửa trường - ${info.name}` : `Thêm trường - Bước duyệt`
                    }
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
                                    <Form.Label>Tên trường<span className="text-danger">*</span>:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="label"
                                        placeholder="Nhập tên trường"
                                        className={clsx({
                                            "is-invalid": touched.label && errors.label
                                        })}
                                        value={values.label}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        touched.label && errors.label && <div className="invalid-feedback">{errors.label}</div>
                                    }
                                </div>
                                <div className="mb-4">
                                    <Form.Label>Loại<span className="text-danger">*</span>:</Form.Label>
                                    <Select
                                        name="dataType"
                                        placeholder="Chọn trường"
                                        displayValue="name"
                                        value={values.dataType}
                                        options={dataTypeList}
                                        onSelect={(newValue) => setFieldValue("dataType", newValue)}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        touched.dataType && errors.dataType && <div className="invalid-feedback">{errors.dataType}</div>
                                    }
                                </div>
                                <div className="mb-4">
                                    <Form.Label>Placeholder<span className="text-danger">*</span>:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="placeholder"
                                        placeholder="Nhập placeholder"
                                        className={clsx({
                                            "is-invalid": touched.placeholder && errors.placeholder
                                        })}
                                        value={values.placeholder}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        touched.placeholder && errors.placeholder && <div className="invalid-feedback">{errors.placeholder}</div>
                                    }
                                </div>
                                <div className="mb-4">
                                    <Form.Check
                                        type="switch"
                                        name="required"
                                        label="Bắt buộc"
                                        checked={values.required}
                                        onChange={handleChange}
                                    />
                                    {
                                        values.required && (
                                            <>
                                                <Form.Control
                                                    type="text"
                                                    name="feedback"
                                                    placeholder="Nhập feedback"
                                                    value={values.feedback}
                                                    onChange={handleChange}
                                                />
                                                Feedback là đoạn cảnh báo sẽ hiển thị nếu người dùng chưa nhập thông tin.
                                            </>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    <Form.Check
                                        type="checkbox"
                                        name="showDescription"
                                        label="Thông tin mô tả"
                                        checked={values.showDescription}
                                        onChange={handleChange}
                                    />
                                    {
                                        values.showDescription && (
                                            <div className="mt-3">
                                                <Form.Control
                                                    as="textarea"
                                                    name="description"
                                                    placeholder="Nhập thông tin mô tả"
                                                    value={values.description}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="mb-6" />
                                <Modal.Footer>
                                    <Button
                                        type="submit"
                                        disabled={!(dirty && isValid)}
                                    >
                                        Lưu
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

SubmitField.propTypes = propTypes

export default SubmitField