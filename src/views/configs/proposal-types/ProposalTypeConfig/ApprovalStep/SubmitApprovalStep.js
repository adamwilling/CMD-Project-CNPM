import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { Formik } from 'formik'
import clsx from 'clsx'
import { Button, Form, Modal } from 'react-bootstrap'

import { addApprovalStep, updateApprovalStep } from '~/redux/configs/approvalStepsSlice'
import MultiSelect from '~/components/MultiSelect'
import approvalStepsApi from '~/api/appprovalStepsApi'
import { addProposalType, updateProposalType } from '~/redux/configs/proposalTypesSlice'

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    type: PropTypes.string,
    info: PropTypes.object,
    setInfo: PropTypes.func,
    index: PropTypes.number,
    proposalTypeId: PropTypes.number
}

const SubmitApprovalStep = ({ visible, setVisible, type, info, setInfo, index, proposalTypeId }) => {
    const dispatch = useDispatch()

    const [approvalOption, setApprovalOption] = useState([])

    useEffect(() => {
        approvalStepsApi.getApprovalOption("")
            .then((response) => {
                if (response.data.status !== "ERROR") {
                    setApprovalOption(response.data.data)
                }
            })
    }, [])

    const handleApprovalOptionSearch = (value) => {
        approvalStepsApi.getApprovalOption(value)
            .then((response) => {
                if (response.data.status !== "ERROR") {
                    setApprovalOption(response.data.data)
                }
            })
    }

    /* Xử lý Form với Formik */
    let initialValues = null
    let validationSchema = null
    if (type === "proposal-type") {
        initialValues = {
            name: "",
            proposalConfigTargets: [],
            index: 0
        }
        validationSchema = Yup.object({
            name: Yup.string().required("Vui lòng nhập tên bước."),
            proposalConfigTargets: Yup.array(),
        })
    }
    else {
        initialValues = {
            name: "",
            approvalConfigTargets: [],
            index: 0
        }
        validationSchema = Yup.object({
            name: Yup.string().required("Vui lòng nhập tên bước."),
            approvalConfigTargets: Yup.array(),
        })
    }
    if (info?.id) {
        initialValues = info
    }

    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true)
        if (type === "proposal-type") {
            if (info?.id) {
                dispatch(updateProposalType(values))
                setInfo(values)
            }
            else {
                dispatch(addProposalType(values))
            }
        }
        else if (type === "approval-step") {
            if (info?.id) {
                dispatch(updateApprovalStep(values))
            }
            else {
                dispatch(addApprovalStep({
                    ...values,
                    index: index + 1,
                    id: proposalTypeId
                }))
            }
        }
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
                        type === "proposal-type" ? info?.id ? "Chỉnh sửa loại đề xuất" : "Thêm loại đề xuất" : info?.id ? "Chỉnh sửa bước duyệt" : "Thêm bước duyệt"
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
                                    <Form.Label>
                                    {type === "proposal-type" ? "Tên loại đề xuất" : "Tên bước"}
                                    <span className="text-danger">*</span>:
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder={type === "proposal-type" ? "Tên loại đề xuất" : "Tên bước"}
                                        className={clsx({
                                            "is-invalid": touched.name && errors.name
                                        })}
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        touched.label && errors.label && <div className="invalid-feedback">{errors.label}</div>
                                    }
                                </div>
                                <div className="mb-4">
                                    <Form.Label>
                                    {type === "proposal-type" ? "Đối tượng được tạo đề xuất:" : "Đối tượng được duyệt:"}
                                    
                                    </Form.Label>
                                    <MultiSelect
                                        showCheckbox
                                        displayValue="name"
                                        placeholder={type === "proposal-type" ? "Đối tượng được tạo" : "Đối tượng được duyệt:"}
                                        selectedValues={type === "proposal-type" ? info?.proposalConfigTargets : info?.approvalConfigTargets}
                                        options={approvalOption}
                                        onSelect={(selectedList) => {
                                            setFieldValue(`${type === "proposal-type" ? "proposalConfigTargets" : "approvalConfigTargets"}`, selectedList)
                                        }}
                                        onRemove={(selectedList) => {
                                            setFieldValue(`${type === "proposal-type" ? "proposalConfigTargets" : "approvalConfigTargets"}`, selectedList)
                                        }}
                                        onSearch={handleApprovalOptionSearch}
                                    />
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

SubmitApprovalStep.propTypes = propTypes

export default SubmitApprovalStep