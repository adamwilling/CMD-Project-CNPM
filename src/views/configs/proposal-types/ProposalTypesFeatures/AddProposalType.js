import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import FormSubmitProposalType from './SubmitProposalType/FormSubmitProposalType'

const AddProposalType = () => {
    const [visibleFormAddProposalType, setVisibleFormAddProposalType] = useState(false)
    return (
        <>
            <Button
                variant="primary"
                onClick={() => setVisibleFormAddProposalType(!visibleFormAddProposalType)}
            >
                <span className="fw-bold">
                    Tạo mới
                </span>
            </Button>
            {
                visibleFormAddProposalType && <FormSubmitProposalType visible={visibleFormAddProposalType} setVisible={setVisibleFormAddProposalType} />
            }
        </>
    )
}

export default AddProposalType