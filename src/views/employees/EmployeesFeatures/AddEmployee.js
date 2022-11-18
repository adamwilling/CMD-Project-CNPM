import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import FormSubmitEmployee from './SubmitEmployee/FormSubmitEmployee'

const AddEmployee = () => {
    const [visibleFormAddEmployee, setVisibleFormAddEmployee] = useState(false)       // State hiển thị Form thêm sinh viên
    return (
        <>
            <Button
                variant="primary"
                className="fw-bolder w-100"
                onClick={() => setVisibleFormAddEmployee(!visibleFormAddEmployee)}
            >
                Thêm sinh viên
            </Button>
            {
                visibleFormAddEmployee && <FormSubmitEmployee visible={visibleFormAddEmployee} setVisible={setVisibleFormAddEmployee} />
            }
        </>
    )
}

export default AddEmployee