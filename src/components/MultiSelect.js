import React from 'react'
import Multiselect from 'multiselect-react-dropdown'

const MultiSelect = ({ ...props }) => {
    const style = {
        chips: {
            background: "#348EE0",
            borderRadius: "0.5rem"
        },
        optionListContainer: {
            border: "1px solid #4fa7f7",
        },
        searchBox: {
            padding: "0.375rem 0.5rem",
            fontSize: "0.875rem",
            fontWeight: "400",
            lineHeight: "1.5",
            color: "#2f6bb1",
            backgroundColor: "#fff",
            backgroundClip: "padding-box",
            border: "1px solid #4fa7f7",
            appearance: "none",
            borderRadius: "0.5rem",
            transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
        }
    }
    return <Multiselect
        emptyRecordMsg="Không có lựa chọn phù hợp"
        avoidHighlightFirstOption
        keepSearchTerm
        style={style}
        {...props}
    />
}

export default MultiSelect