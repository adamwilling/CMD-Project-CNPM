import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import FormSubmitDepartment from './FormSubmitDepartment'

const AddDepartment = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Button
                className="d-block m-auto"
                onClick={() => setVisible(!visible)}
            >
                Tạo mới
            </Button>
            {
                visible && <FormSubmitDepartment visible={visible} setVisible={setVisible} />
            }
        </>
    )
}

export default React.memo(AddDepartment)