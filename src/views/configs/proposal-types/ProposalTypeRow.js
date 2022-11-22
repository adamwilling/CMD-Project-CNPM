import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import { Dropdown, Image } from "react-bootstrap"
import { BiEdit, BiTrash } from "react-icons/bi"

import moreIcon from "~/assets/icons/more.svg"
import FormSubmitProposalType from "./ProposalTypesFeatures/SubmitProposalType/FormSubmitProposalType"
import DeleteProposalType from "./ProposalTypesFeatures/DeleteProposalType"
import { authSelector } from "~/redux/selectors"

const propTypes = {
    proposalTypeInfo: PropTypes.object.isRequired,
}

const ProposalTypeRow = ({ proposalTypeInfo }) => {
    const typePermissions = useSelector(authSelector).userInfo.role.type

    const navigate = useNavigate()

    const [visibleDeleteProposalTypeUI, setVisibleDeleteProposalTypeUI] = useState(false)

    const showDate = (d) => {
        const date = new Date(d)
        return (
            "" +
            (date.getDate() < 10 ? "0" : "") +
            date.getDate() +
            "/" +
            (date.getMonth() + 1 < 10 ? "0" : "") +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear()
        )
    }

    return (
        <div className="item proposalType list-group-item">
            <div className="item-label" />
            <div className="ms-lg-5" />
            <div className="proposalType-name">
                <div className="d-lg-none fw-bolder col text-break">Tên loại đề xuất:</div>
                <div className="col text-break">{proposalTypeInfo.name}</div>
            </div>
            <div className="proposalType-status">
                <div className="d-lg-none fw-bolder col text-break">Trạng thái:</div>
                <div className="col text-break">
                    {proposalTypeInfo.activeFlag === true ? (
                        <span className="text-success fw-bold">Đang hiệu lực</span>
                    ) : (
                        <span className="text-danger fw-bold">Không hiệu lực</span>
                    )}
                </div>
            </div>
            <div className="proposalType-createDate">
                <div className="d-lg-none fw-bolder col text-break">Ngày tạo:</div>
                <div className="col text-break">{showDate(proposalTypeInfo?.createDate)}</div>
            </div>
            <Dropdown className="proposalType-more more">
                {(typePermissions.update || typePermissions.delete) && (
                    <>
                        <Dropdown.Toggle variant="none">
                            <Image src={moreIcon} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                            {typePermissions.update && (
                                <Dropdown.Item onClick={() => navigate(`/proposal-types/config/${proposalTypeInfo.id}`)}>
                                    <BiEdit /> Thiết lập
                                </Dropdown.Item>
                            )}
                            {typePermissions.delete && (
                                <Dropdown.Item onClick={() => setVisibleDeleteProposalTypeUI(true)}>
                                    <BiTrash /> Xóa
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </>
                )}
            </Dropdown>
            {visibleDeleteProposalTypeUI && (
                <DeleteProposalType visible={visibleDeleteProposalTypeUI} setVisible={setVisibleDeleteProposalTypeUI} proposalTypeInfo={proposalTypeInfo} />
            )}
        </div>
    )
}

ProposalTypeRow.propTypes = propTypes

export default ProposalTypeRow
