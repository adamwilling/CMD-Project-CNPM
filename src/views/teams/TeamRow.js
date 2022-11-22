import React, { useState } from "react"
import PropTypes from "prop-types"
import { Accordion, Button, Dropdown, Image, ListGroup } from "react-bootstrap"
import { BiEdit, BiTrash } from "react-icons/bi"

import moreIcon from "~/assets/icons/more.svg"
import TeamDetail from "./TeamDetail"
import DeleteTeam from "./TeamsFeatures/DeleteTeam"
import FormSubmitTeam from "./TeamsFeatures/FormSubmitTeam"
import { AiFillInfoCircle } from "react-icons/ai"
import { useSelector } from "react-redux"
import { authSelector } from "~/redux/selectors"
import { NavLink } from "react-router-dom"

const propTypes = {
    teamInfo: PropTypes.object.isRequired,
}

const TeamRow = ({ teamInfo }) => {
    const teamPermissions = useSelector(authSelector).userInfo.role.team

    const leaderInfo = teamInfo.headPosition === -1 ? null : teamInfo.employees.find((member) => member.position.id === teamInfo.headPosition)

    const [visibleTeamDetailUI, setVisibleTeamDetailUI] = useState(false)
    const [visibleEditTeamUI, setVisibleEditTeamUI] = useState(false)
    const [visibleDeleteTeamUI, setVisibleDeleteTeamUI] = useState(false)

    return (
        <div className="item team list-group-item">
            <div className="item-label" />
            <div className="ms-lg-5" />
            <div className="team-code">
                <div className="d-lg-none fw-bolder col text-break">Mã đội nhóm:</div>
                <div className="col text-break">{teamInfo.code}</div>
            </div>
            <div className="team-name">
                <div className="d-lg-none fw-bolder col text-break">Tên đội nhóm:</div>
                <div className="col text-break">{teamInfo.name}</div>
            </div>
            <div className="team-numberOfMembers">
                <div className="d-lg-none fw-bolder col text-break">Số lượng thành viên:</div>
                <div className="col text-break">{teamInfo.employees?.length}</div>
            </div>
            <div className="team-leader">
                <div className="d-lg-none fw-bolder col text-break">Đội trưởng:</div>
                <div className="col text-break">
                    {leaderInfo ? (
                        <NavLink to={`/profile/${leaderInfo.id}`}>
                            <Image src={"data:image/png;base64," + leaderInfo.avatar} width={40} height={40} className="rounded-circle me-2" />
                            <span className="text-primary fw-bolder">{leaderInfo.name}</span>
                        </NavLink>
                    ) : (
                        "Chưa có đội trưởng"
                    )}
                </div>
            </div>
            <Dropdown className="team-more more">
                {(teamPermissions.update || teamPermissions.delete) && (
                    <>
                        <Dropdown.Toggle variant="none">
                            <Image src={moreIcon} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                            {teamPermissions.update && (
                                <Dropdown.Item onClick={() => setVisibleEditTeamUI(true)}>
                                    <BiEdit /> Chỉnh sửa
                                </Dropdown.Item>
                            )}
                            {teamPermissions.delete && (
                                <Dropdown.Item onClick={() => setVisibleDeleteTeamUI(true)}>
                                    <BiTrash /> Xóa
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </>
                )}
                <div className="view-detail" onClick={() => setVisibleTeamDetailUI(true)}>
                    <AiFillInfoCircle size={20} />
                </div>
            </Dropdown>
            <div className="view-detail-custom" onClick={() => setVisibleTeamDetailUI(true)}>
                <AiFillInfoCircle size={20} />
            </div>
            {visibleTeamDetailUI && <TeamDetail visible={visibleTeamDetailUI} setVisible={setVisibleTeamDetailUI} teamInfo={teamInfo} />}
            {visibleEditTeamUI && <FormSubmitTeam visible={visibleEditTeamUI} setVisible={setVisibleEditTeamUI} team={teamInfo} />}
            {visibleDeleteTeamUI && <DeleteTeam visible={visibleDeleteTeamUI} setVisible={setVisibleDeleteTeamUI} teamInfo={teamInfo} />}
        </div>
    )
}

TeamRow.propTypes = propTypes

export default TeamRow
