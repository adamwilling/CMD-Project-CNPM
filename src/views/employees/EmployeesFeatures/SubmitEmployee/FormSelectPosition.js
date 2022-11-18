import React, { useRef, useState } from 'react'

import { ListGroup } from 'react-bootstrap'
import useOnClickOutside from '../../../../customHooks/useOnClickOutside'

const FormSelectPosition = ({ index, current, positions, onChange }) => {
    const [visible, setVisible] = useState(false)       // State quản lý hiển thị danh sách phòng ban

    const ref = useRef()        // Ref form select position

    useOnClickOutside(ref, () => setVisible(false))     // Hàm xử lý đóng form select position khi click ra ngoài

    let selectPositionElement = null
    if (positions === null) {
        selectPositionElement = <ListGroup.Item>Chưa chọn phòng ban</ListGroup.Item>
    }
    else if (positions?.length === 0) {
        selectPositionElement = <ListGroup.Item>Phòng ban chưa có chức vụ</ListGroup.Item>
    }
    else {
        selectPositionElement = positions?.map((position) => (
            <ListGroup.Item
                action
                key={position.id}
                onClick={() => onChange(index, position)}
                active={current?.name === position.name}
            >
                {position.name}
            </ListGroup.Item>
        ))
    }

    return (
        <div
            ref={ref}
            onClick={() => setVisible(!visible)}
            className="form-select"
        >
            {current?.name || "Chọn chức vụ"}
            <div className="select">
                {(visible) ? selectPositionElement : null}
            </div>
        </div>
    )
}

export default FormSelectPosition