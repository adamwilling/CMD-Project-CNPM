/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Dropdown, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { AiFillCloseCircle, AiFillInfoCircle } from 'react-icons/ai'
import { FcOk } from 'react-icons/fc'
import { BiEdit } from 'react-icons/bi'
import { BsFileEarmarkX } from 'react-icons/bs'
import clsx from 'clsx'
import Swal from 'sweetalert2'

import moreIcon from "~/assets/icons/more.svg"
import DeleteProposal from './ProposalsFeatures/CancelProposal'
import ProposalDetail from './ProposalDetail'
import proposalsApi from '~/api/proposalsApi'
import { updateProposalList } from '~/redux/proposalsSlice'
import FormSubmitProposal from './ProposalsFeatures/SubmitProposal/FormSubmitProposal'
import { authSelector } from '~/redux/selectors'

const ProposalRow = ({ proposalInfo, steps }) => {
    const userInfo = useSelector(authSelector).userInfo
    const proposalPermissions = useSelector(authSelector).userInfo.role.proposal

    const dispatch = useDispatch()

    const [visibleProposalDetailUI, setVisibleProposalDetailUI] = useState(false)
    const [visibleEditProposalUI, setVisibleEditProposalUI] = useState(false)
    const [visibleDeleteProposalUI, setVisibleDeleteProposalUI] = useState(false)

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

    let dropdownItemElement = null
    if (proposalInfo.canApprove === true && proposalInfo.status?.index === 1) {
        dropdownItemElement = <>
            <Dropdown.Item
                className="text-success"
                onClick={() => handleAcceptProposal(proposalInfo.id)}
            >
                <FcOk /> Duyệt
            </Dropdown.Item>
            <Dropdown.Item
                className="text-danger"
                onClick={() => handleDenyProposal(proposalInfo.id)}
            >
                <AiFillCloseCircle /> Từ chối
            </Dropdown.Item>

            <Dropdown.Divider />
        </>
    }
    return (
        <>
            <div className="item proposal list-group-item">
                <div className="item-label" />
                <div className="ms-lg-5" />
                <div className="proposal-creator">
                    <div className="d-lg-none fw-bold col text-break">
                        Người đề xuất:
                    </div>
                    <div className="col text-break">
                        <NavLink to={`/profile/${proposalInfo.creator.id}`}>
                            <Image
                                src={"data:image/png;base64," + proposalInfo.creator.avatar}
                                width={40}
                                height={40}
                                className="rounded-circle me-2"
                            />
                            <span className="text-primary fw-bolder">
                                {proposalInfo.creator.name}
                            </span>
                        </NavLink>
                    </div>
                </div>
                <div className="proposal-type">
                    <div className="d-lg-none fw-bold col text-break">
                        Loại đề xuất:
                    </div>
                    <div className="col text-break">
                        {proposalInfo.proposalType.name}
                    </div>
                </div>
                <div className="proposal-content">
                    <div className="d-lg-none fw-bold col text-break">
                        Mục đích/Lý do:
                    </div>
                    <div className="col text-break">
                        {
                            proposalInfo.contents[0].content.length > 45 ? (
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip>
                                            {proposalInfo.contents[0].content}
                                        </Tooltip>
                                    }
                                >
                                    <div>
                                        {proposalInfo.contents[0].content.slice(0, 80).trim() + "..."}
                                    </div>
                                </OverlayTrigger>
                            ) : proposalInfo.contents[0].content
                        }
                    </div>
                </div>
                <div className="proposal-createDate">
                    <div className="d-lg-none fw-bold col text-break">
                        Ngày tạo:
                    </div>
                    <div className="col text-break">
                        {showDate(proposalInfo.createdDate)}
                    </div>
                </div>
                <div className="proposal-status">
                    <div className="d-lg-none fw-bold col text-break">
                        Trạng thái:
                    </div>
                    <div className="col step-container">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    Tạo đề xuất
                                </Tooltip>
                            }
                        >
                            <div
                                className={clsx("step-item")
                                }
                                style={{
                                    "--custom-bg-color": proposalInfo.status.index === 4 ? "#343a40" : "#0dcaf0",
                                    "opacity": proposalInfo.status.index === 4 ? 1 : 0.5,
                                }}>
                                TĐX
                            </div>
                        </OverlayTrigger>
                        {
                            steps.map((step) => (
                                <OverlayTrigger
                                    key={step.id}
                                    placement="top"
                                    overlay={
                                        <Tooltip>
                                            {step.name}
                                        </Tooltip>
                                    }
                                >
                                    <div
                                        className={clsx("step-item", {
                                            "step-item-active": proposalInfo.status.index === 1 && proposalInfo.currentStep === step.index
                                        })}
                                        style={{
                                            "--custom-bg-color": proposalInfo.status.index === 3 && proposalInfo.currentStep === step.index ? "#b10f1f" : "#2f6bb1",
                                            "opacity": proposalInfo.status.index === 3 && proposalInfo.currentStep === step.index ? 1 : 0.5,
                                        }}
                                    >
                                        {step.name.split(' ').map(word => word[0]).join('').toUpperCase()}
                                    </div>
                                </OverlayTrigger>
                            ))
                        }
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    Hoàn thành
                                </Tooltip>
                            }
                        >
                            <div
                                className={clsx("step-item")
                                }
                                style={{
                                    "--custom-bg-color": "#198754",
                                    "opacity": proposalInfo.status.index === 2 ? 1 : 0.5,
                                }}
                            >
                                HT
                            </div>
                        </OverlayTrigger>
                    </div>
                </div>
                <Dropdown className="proposal-more more">
                    {
                        ((((userInfo.id === proposalInfo.creator?.id && proposalPermissions.update) || proposalPermissions.update_all) && (proposalInfo.status?.index === 1 && proposalInfo.currentStep === 1))
                            || (((userInfo.id === proposalInfo.creator?.id && proposalPermissions.delete) || proposalPermissions.delete_all) && (proposalInfo.status?.index === 1 && proposalInfo.currentStep === 1))
                            || (proposalInfo.canApprove === true && proposalInfo.status?.index === 1)
                            || (proposalInfo.canApprove === true && proposalInfo.status?.index === 1)) && (
                            <>
                                <Dropdown.Toggle variant="none">
                                    <Image src={moreIcon} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                                    {dropdownItemElement}
                                    {
                                        ((userInfo.id === proposalInfo.creator?.id && proposalPermissions.update) || proposalPermissions.update_all) && (proposalInfo.status?.index === 1 && proposalInfo.currentStep === 1) && (
                                            <Dropdown.Item onClick={() => setVisibleEditProposalUI(true)}>
                                                <BiEdit /> Chỉnh sửa
                                            </Dropdown.Item>
                                        )
                                    }
                                    {
                                        ((userInfo.id === proposalInfo.creator?.id && proposalPermissions.delete) || proposalPermissions.delete_all) && (proposalInfo.status?.index === 1 && proposalInfo.currentStep === 1) && (
                                            <Dropdown.Item onClick={() => setVisibleDeleteProposalUI(true)}>
                                                <BsFileEarmarkX /> Hủy
                                            </Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                            </>
                        )
                    }
                    <div
                        className="view-detail"
                        onClick={() => setVisibleProposalDetailUI(true)}
                    >
                        <AiFillInfoCircle size={20} />
                    </div>
                </Dropdown>
                <div
                    className="view-detail-custom"
                    onClick={() => setVisibleProposalDetailUI(true)}
                >
                    <AiFillInfoCircle size={20} />
                </div>
            </div>
            {
                visibleProposalDetailUI && <ProposalDetail visible={visibleProposalDetailUI} setVisible={setVisibleProposalDetailUI} proposal={proposalInfo} />
            }
            {
                visibleEditProposalUI && <FormSubmitProposal visible={visibleEditProposalUI} setVisible={setVisibleEditProposalUI} proposal={proposalInfo} />
            }
            {
                visibleDeleteProposalUI && <DeleteProposal visible={visibleDeleteProposalUI} setVisible={setVisibleDeleteProposalUI} proposalInfo={proposalInfo} />
            }
        </>
    )
}

export default ProposalRow