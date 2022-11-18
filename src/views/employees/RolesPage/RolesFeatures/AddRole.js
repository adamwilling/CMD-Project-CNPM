import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import FormSubmitRole from './FormSubmitRole'


const AddRole = () => {

    const [visible, setVisible] = useState(false)

    return (
        <>
            <Button
                variant="primary"
                onClick={() => setVisible(!visible)}
            >
                Tạo mới
            </Button>
            {
                visible && <FormSubmitRole visible={visible} setVisible={setVisible} />
            }
        </>
    )
}


export default AddRole