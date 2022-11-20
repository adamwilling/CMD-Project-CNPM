/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

import { addProposal, updateProposal } from '~/redux/proposalsSlice'
import proposalTypesApi from '~/api/proposalTypesApi'
import Select from '~/components/Select'
import Loading from '~/components/Loading'

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    proposal: PropTypes.object
}

const FormSubmitProposal = ({ visible, setVisible, proposal }) => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [proposalTypeList, setProposalTypeList] = useState([])
    const [formElement, setFormElement] = useState([])
    const [proposalTypeInfo, setProposalTypeInfo] = useState({
        proposalTypeId: "",
        proposalDetails: []
    })
    console.log(proposalTypeInfo)

    const handleInputChangeAdd = (e, field, i) => {
        setProposalTypeInfo((preState) => ({
            ...preState,
            proposalDetails: preState.proposalDetails.map((proposalDetail, index, array) => {
                if (index === i) {
                    return {
                        fieldId: field.id,
                        fieldName: field.label,
                        content: e.target.value
                    }
                }
                else {
                    return array[index]
                }
            })
        }))
    }
    const handleInputChangeEdit = (e, field, i) => {
        setProposalTypeInfo((preState) => ({
            ...preState,
            proposalDetails: preState.proposalDetails.map((proposalDetail, index, array) => {
                if (index === i) {
                    return {
                        ...proposalDetail,
                        content: e.target.value
                    }
                }
                else {
                    return array[index]
                }
            })
        }))
    }

    useEffect(() => {
        setLoading(true)
        proposalTypesApi.getProposalTypePermission()
            .then((response) => {
                setProposalTypeList(response.data.data)
                if (proposal?.id) {
                    setProposalTypeInfo({
                        id: proposal.id,
                        proposalType: proposal.proposalType,
                        proposalDetails: proposal.contents
                    })
                    const data = response.data.data
                    let tempElement = []
                    data.filter(proposalType => proposalType.id === proposal.proposalType.id)[0].fields.forEach((field, index) => {
                        switch (field.dataType.name) {
                            case "Text":
                                tempElement.push(
                                    <div className="mb-4">
                                        <Form.Label>
                                            {field.label}{field.required && <span style={{ color: "red" }}>*</span>}:
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={field.placeholder}
                                            defaultValue={proposal.contents[index].content}
                                            value={proposalTypeInfo.proposalDetails.filter((proposalDetail) => proposalDetail.id === Number.parseInt(field.id)).content}
                                            onChange={(e) => handleInputChangeEdit(e, field, index)}
                                            required={field.required}
                                        />
                                        {
                                            field.required && <Form.Control.Feedback type="invalid">
                                                {field.feedBack}
                                            </Form.Control.Feedback>
                                        }
                                        <div className="mt-1">
                                            {field.description}
                                        </div>
                                    </div>
                                )
                                break
                            case "Number":
                                tempElement.push(
                                    <div className="mb-4">
                                        <Form.Label>
                                            {field.label}{field.required && <span style={{ color: "red" }}>*</span>}:
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder={field.placeholder}
                                            defaultValue={proposal.contents[index].content}
                                            value={proposalTypeInfo.proposalDetails.filter((proposalDetail) => proposalDetail.id === field.id).content}
                                            onChange={(e) => handleInputChangeEdit(e, field, index)}
                                            required={field.required}
                                        />
                                        {
                                            field.required && <Form.Control.Feedback type="invalid">
                                                {field.feedBack}
                                            </Form.Control.Feedback>
                                        }
                                        <div className="mt-1">
                                            {field.description}
                                        </div>
                                    </div>
                                )
                                break
                            case "Textarea":
                                tempElement.push(
                                    <div className="mb-4">
                                        <Form.Label>
                                            {field.label}{field.required && <span style={{ color: "red" }}>*</span>}:
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            placeholder={field.placeholder}
                                            defaultValue={proposal.contents[index].content}
                                            value={proposalTypeInfo.proposalDetails.filter((proposalDetail) => proposalDetail.id === field.id).content}
                                            onChange={(e) => handleInputChangeEdit(e, field, index)}
                                            required={field.required}
                                        />
                                        {
                                            field.required && <Form.Control.Feedback type="invalid">
                                                {field.feedBack}
                                            </Form.Control.Feedback>
                                        }
                                        <div className="mt-1">
                                            {field.description}
                                        </div>
                                    </div>
                                )
                                break
                            case "HTML":
                                tempElement.push(
                                    <div className="mb-4">
                                        <Form.Label>
                                            {field.label}{field.required && <span style={{ color: "red" }}>*</span>}:
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder={field.placeholder}
                                            defaultValue={proposal.contents[index].content}
                                            value={proposalTypeInfo.proposalDetails.filter((proposalDetail) => proposalDetail.id === field.id).content}
                                            onChange={(e) => handleInputChangeEdit(e, field, index)}
                                            required={field.required}
                                        />
                                        {
                                            field.required && <Form.Control.Feedback type="invalid">
                                                {field.feedBack}
                                            </Form.Control.Feedback>
                                        }
                                        <div className="mt-1">
                                            {field.description}
                                        </div>
                                    </div>
                                )
                                break
                            default:
                                break
                        }
                    })
                    setFormElement(tempElement)
                }
                setLoading(false)
            })
    }, [])

    const handleProposalTypeChange = (proposalType) => {
        let tempElement = []
        proposalType.fields.forEach((field, index) => {
            switch (field.dataType.name) {
                case "Text":
                    tempElement.push(
                        <div className="mb-4" >
                            <Form.Label>
                                {field.label}{field.required && <span style={{ color: "red" }}>*</span>}:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={field.placeholder}
                                value={proposalTypeInfo.proposalDetails.filter((proposalDetail) => proposalDetail.id === Number.parseInt(field.id)).content}
                                onChange={(e) => handleInputChangeAdd(e, field, index)}
                                required={field.required}
                            />
                            {
                                field.required && <Form.Control.Feedback type="invalid">
                                    {field.feedBack}
                                </Form.Control.Feedback>
                            }
                            <div className="mt-1">
                                {field.description}
                            </div>
                        </div>
                    )
                    break
                case "Number":
                    tempElement.push(
                        <div className="mb-4">
                            <Form.Label>
                                {field.label}{field.required && <span style={{ color: "red" }}>*</span>}:
                            </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder={field.placeholder}
                                value={proposalTypeInfo.proposalDetails.filter((proposalDetail) => proposalDetail.id === field.id).content}
                                onChange={(e) => handleInputChangeAdd(e, field, index)}
                                required={field.required}
                            />
                            {
                                field.required && <Form.Control.Feedback type="invalid">
                                    {field.feedBack}
                                </Form.Control.Feedback>
                            }
                            <div className="mt-1">
                                {field.description}
                            </div>
                        </div>
                    )
                    break
                case "Textarea":
                    tempElement.push(
                        <div className="mb-4">
                            <Form.Label>
                                {field.label}{field.required && <span style={{ color: "red" }}>*</span>}:
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder={field.placeholder}
                                value={proposalTypeInfo.proposalDetails.filter((proposalDetail) => proposalDetail.id === field.id).content}
                                onChange={(e) => handleInputChangeAdd(e, field, index)}
                                required={field.required}
                            />
                            {
                                field.required && <Form.Control.Feedback type="invalid">
                                    {field.feedBack}
                                </Form.Control.Feedback>
                            }
                            <div className="mt-1">
                                {field.description}
                            </div>
                        </div>
                    )
                    break
                case "HTML":
                    tempElement.push(
                        <div className="mb-4">
                            <Form.Label>
                                {field.label}{field.required && <span style={{ color: "red" }}>*</span>}:
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder={field.placeholder}
                                value={proposalTypeInfo.proposalDetails.filter((proposalDetail) => proposalDetail.id === field.id).content}
                                onChange={(e) => handleInputChangeAdd(e, field, index)}
                                required={field.required}
                            />
                            {
                                field.required && <Form.Control.Feedback type="invalid">
                                    {field.feedBack}
                                </Form.Control.Feedback>
                            }
                            <div className="mt-1">
                                {field.description}
                            </div>
                        </div>
                    )
                    break
                default:
                    break
            }
        })
        setProposalTypeInfo({
            ...proposalTypeInfo,
            proposalType: proposalType,
            proposalDetails: proposalType.fields.map((field, index) => ({
                ...proposalTypeInfo.proposalDetails[index],
                fieldId: field.id,
                fieldName: field.label,
                content: ""
            }))
        })
        setFormElement(tempElement)
    }


    /* Xử lý Submit Form */
    const [validated, setValidated] = useState(false)
    const handleSubmit = (e) => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }
        setValidated(true)
        if (form.checkValidity() === true) {
            e.preventDefault()
            e.stopPropagation()
            if (proposal?.id) {
                setVisible(false)
                dispatch(updateProposal({
                    ...proposalTypeInfo,
                    proposalTypeId: proposalTypeInfo.proposalType.id
                }))
            }
            else {
                setVisible(false)
                dispatch(addProposal({
                    ...proposalTypeInfo,
                    proposalTypeId: proposalTypeInfo.proposalType.id
                }))
            }
        }
    }
    //

    return (
        <Modal
            className="modal-fullheight"
            size="lg"
            centered
            scrollable
            show={visible}
            onHide={() => setVisible(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {proposal?.id ? "Chỉnh sửa đề xuất" : "Tạo đề xuất"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    loading ? <Loading /> : (
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-4">
                                <Form.Label>
                                    Loại đề xuất<span style={{ color: "red" }}>*</span>:
                                </Form.Label>
                                <Select
                                    placeholder="Chọn loại đề xuất"
                                    displayValue="name"
                                    disabled={proposal?.id !== undefined}
                                    value={proposalTypeInfo.proposalType}
                                    options={proposalTypeList}
                                    onSelect={(newValue) => {
                                        if (proposal?.id === undefined) {
                                            handleProposalTypeChange(newValue)
                                        }
                                    }}
                                />
                                {
                                    proposal?.id && "Không được đổi loại đề xuất"
                                }
                            </div>
                            {
                                formElement.map((element, index) => (
                                    <React.Fragment key={index}>
                                        {element}
                                    </React.Fragment>
                                ))
                            }
                            <div className="mb-6" />
                            <Modal.Footer>
                                <Button className="fw-bolder" type="submit">
                                    {(proposal?.id) ? "Cập nhật" : "Tạo đề xuất"}
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )
                }
            </Modal.Body>
        </Modal>
    )
}

FormSubmitProposal.propTypes = propTypes

export default FormSubmitProposal