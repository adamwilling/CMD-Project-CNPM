/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { Form, ListGroup } from 'react-bootstrap'

import useOnClickOutside from '~/customHooks/useOnClickOutside'

const FormSelectTeam = ({ index, currentTeam, onTeamChange, teams }) => {
    const [visible, setVisible] = useState(false)

    const ref = useRef()

    useOnClickOutside(ref, () => setVisible(false))

    return (
        <div
            ref={ref}
            onClick={() => setVisible(!visible)}
            className="form-select"
        >
            <input
                type="text"
                name="phoneNumber"
                placeholder="Chọn CLB/Đội nhóm"
                value={currentTeam?.name || ""}
                readOnly
                required
                style={{
                    width: "100%",
                    backgroundColor: "none",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    color: "#2f6bb1",
                    padding: "0"
                }}
            />
            <Form.Control.Feedback type="invalid">
                Vui lòng chọn phòng ban
            </Form.Control.Feedback>

            <div className="select">
                {(visible) ? teams.map((team) => (
                    <ListGroup.Item
                        action
                        key={team.id}
                        onClick={() => onTeamChange(index, team)}
                        active={currentTeam?.id === team.id}
                    >
                        {team.name}
                    </ListGroup.Item>
                )) : null}
            </div>
        </div>
    )
}

export default FormSelectTeam