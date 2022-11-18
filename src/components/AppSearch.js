import React from 'react'
import { Image } from 'react-bootstrap'

import searchIcon from '../assets/icons/search.svg'
/*
    Truyền vào 2 props:
    1. value: giá trị của state giữ giá trị đang tìm kiếm
    2. onSearch: hàm callback sẽ set lại giá trị của state khi người dung nhập giá trị mới
*/
const AppSearch = ({ value, onSearch }) => {
    return (
        <div
            className="d-inline-flex form-control w-100 py-1"
            style={{ borderRadius: "0.5rem" }}
        >
            <Image
                src={searchIcon}
                className="mx-auto h-100"
                style={{
                    marginTop: "0.1rem"
                }}
            />
            <input
                className="w-100"
                type="search"
                style={{
                    border: "none",
                    outline: "none",
                    color: "#2F6BB1",
                    fontSize: "14px"
                }}
                placeholder="Tìm kiếm..."
                value={value || ""}
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    )
}

export default React.memo(AppSearch)