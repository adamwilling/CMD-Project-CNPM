import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import FormSubmitProposal from './SubmitProposal/FormSubmitProposal'

const AddProposal = () => {
    const [visibleFormAddProposal, setVisibleFormAddProposal] = useState(false)       // State hiển thị Form thêm đề xuất
    return (
        <>
            <Button
                variant="primary"
                onClick={() => setVisibleFormAddProposal(!visibleFormAddProposal)}
            >
                <span className="fw-bold">
                    Thêm đề xuất
                </span>
            </Button>
            {
                visibleFormAddProposal && <FormSubmitProposal visible={visibleFormAddProposal} setVisible={setVisibleFormAddProposal} />
            }
        </>
    )
}

export default AddProposal