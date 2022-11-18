import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import Roles from './RolesMainPage'

const ButtonShowRoles = () => {

    const [visible, setVisible] = useState(false)

    return (
        <>
            <Button
                variant="outline-primary"
                className="fw-bolder w-100"
                onClick={() => setVisible(!visible)}
            >
                Vai trò
            </Button>
            {
                visible && <Roles visible={visible} setVisible={setVisible} />
            }
        </>
    )
}

export default ButtonShowRoles