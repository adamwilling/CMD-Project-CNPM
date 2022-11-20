/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Accordion, Button, Col, Image, Modal, Row } from 'react-bootstrap'
import { BiSend } from 'react-icons/bi'
import Swal from 'sweetalert2'

import proposalsApi from '~/api/proposalsApi'
import { useDispatch, useSelector } from 'react-redux'
import { updateProposalList } from '~/redux/proposalsSlice'
import { authSelector } from '~/redux/selectors'

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    proposal: PropTypes.object,
    proposalId: PropTypes.number,
}

const ProposalDetail = ({ visible, setVisible, proposal, proposalId }) => {
    const userInfo = useSelector(authSelector).userInfo

    const dispatch = useDispatch()

    const [proposalInfo, setProposalInfo] = useState({})

    useEffect(() => {
        if (proposalId) {
            proposalsApi.getProposalDetailById(proposalId)
                .then((response) => {
                    setProposalInfo(response.data.data)
                })
        }
        if (proposal) {
            setProposalInfo(proposal)
        }
    }, [])

    const showDate = (d) => {
        const date = new Date(d)
        return "" + (date.getDate() < 10 ? "0" : "") + date.getDate() + "/" + (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1) + "/" + date.getFullYear()
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 10000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
    })
    const handleAcceptProposal = (proposalId) => {
        proposalsApi.acceptProposal(proposalId)
            .then((response) => {
                if (response.data.status === "OK") {
                    Toast.fire({
                        title: "Duyệt đề xuất",
                        text: response.data.message,
                        icon: "success"
                    })
                    setProposalInfo(response.data.data)
                    dispatch(updateProposalList(response.data.data))
                }
                else {
                    Toast.fire({
                        title: "Duyệt đề xuất",
                        text: response.data.message,
                        icon: "warning",
                    })
                }
            })
    }
    const handleDenyProposal = async (proposalId) => {
        setVisible(false)
        const { value: reason } = await Swal.fire({
            title: "Từ chối đề xuất",
            input: 'textarea',
            inputLabel: 'Lý do từ chối',
            inputPlaceholder: 'Nhập lý do từ chối...',
            inputAttributes: {
                'aria-label': 'Nhập lý do từ chối'
            },
            showCancelButton: true
        })

        if (reason) {
            return proposalsApi.denyProposal({
                id: proposalId,
                reason: reason
            })
                .then((response) => {
                    if (response.data.status === "OK") {
                        Toast.fire({
                            title: "Từ chối đề xuất",
                            text: response.data.message,
                            icon: "success",
                        })
                        setProposalInfo(response.data.data)
                        dispatch(updateProposalList(response.data.data))
                    }
                    else {
                        Toast.fire({
                            title: "Từ chối đề xuất",
                            text: response.data.message,
                            icon: "warning",
                        })
                    }
                })
        }
    }

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
                    Chi tiết đề xuất
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column justify-content-between">
                    <div className="mb-4">
                        <div className="text-uppercase fw-bolder">
                            Thông tin đề xuất
                        </div>
                        <Row className="m-2">
                            <div className="col-4 fw-bolder">Người tạo:</div>
                            <div className="col-8">{proposalInfo.creator?.name}</div>
                        </Row>
                        <Row className="m-2">
                            <div className="col-4 fw-bolder">Ngày tạo:</div>
                            <div className="col-8">{showDate(proposalInfo.createdDate)}</div>
                        </Row>
                        <Row className="m-2">
                            <div className="col-4 fw-bolder">Loại đề xuất:</div>
                            <div className="col-8">{proposalInfo.proposalType?.name}</div>
                        </Row>
                        <Row className="m-2">
                            <div className="col-4 fw-bolder">Trạng thái:</div>
                            <div className="col-8 text-primary fw-bolder">
                                {proposalInfo.status?.name}
                            </div>
                        </Row>
                    </div>
                    <div className="mb-4">
                        <div className="text-uppercase fw-bolder">
                            Nội dung đề xuất
                        </div>
                        {
                            proposalInfo.contents?.map((content) => (
                                <Row key={content.fieldId} className="m-2">
                                    <div className="col-4 fw-bolder">{content.fieldName}:</div>
                                    <div className="col-8">
                                        {content.content}
                                    </div>
                                </Row>
                            ))
                        }
                    </div>
                    <Accordion defaultActiveKey={['0']}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Thảo luận</Accordion.Header>
                            <Accordion.Body>
                                <div className="d-flex justify-content-evenly">
                                    <div className="col-auto">
                                        <Image
                                            className="rounded-circle me-2"
                                            src={"data:image/png;base64," + userInfo.avatar}
                                            width={35}
                                            height={35}
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Nhập nội dung thảo luận"
                                        />
                                    </div>
                                    <div className="col-auto ms-2">
                                        <BiSend size={35} />
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </Modal.Body>
            {proposalInfo.canApprove === true && proposalInfo.status?.id === 7 && (
                <>
                    <div className='mb-6' />
                    <Modal.Footer>
                        <Button
                            variant="success"
                            className="col-4 fw-bolder mx-2"
                            onClick={() => handleAcceptProposal(proposalInfo.id)}
                        >
                            Duyệt
                        </Button>
                        <Button
                            variant="danger"
                            className="col-4 fw-bolder mx-2"
                            onClick={() => handleDenyProposal((proposalInfo.id))}
                        >
                            Từ chối
                        </Button>
                    </Modal.Footer>
                </>
            )
            }
        </Modal>
    )
}


ProposalDetail.propTypes = propTypes

export default ProposalDetail