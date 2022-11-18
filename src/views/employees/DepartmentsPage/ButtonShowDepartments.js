import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import DepartmentsMainPage from './DepartmentsMainPage'

const ButtonShowDepartments = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Button
                variant="outline-primary"
                className="fw-bolder w-100"
                onClick={() => setVisible(true)}
            >
                Phòng ban
            </Button>
            {
                visible && <DepartmentsMainPage visible={visible} setVisible={setVisible} />
            }
        </>
    )
}

export default ButtonShowDepartments