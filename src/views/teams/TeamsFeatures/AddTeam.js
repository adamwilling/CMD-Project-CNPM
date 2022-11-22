import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import FormSubmitTeam from './FormSubmitTeam'

const AddTeam = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Button
                className="d-block m-auto"
                onClick={() => setVisible(!visible)}
            >
                Tạo mới
            </Button>
            <FormSubmitTeam visible={visible} setVisible={setVisible} />
        </>
    )
}

export default AddTeam