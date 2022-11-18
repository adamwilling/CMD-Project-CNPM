/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import styles from './index.module.scss'
import useOnClickOutside from '~/customHooks/useOnClickOutside'

const propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    displayValue: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.any.isRequired,
    onSelect: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    isClear: PropTypes.bool,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    feedbackElement: PropTypes.node,
}
const defaultProps = {
    name: "",
    placeholder: "",
    displayValue: "",
    options: null,
    value: null,
    defaultValue: null,
    onSelect: () => { },
    isClear: true,
    disabled: false,
    required: false,
    feedbackElement: null
}

const Select = (props) => {
    const [visible, setVisible] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    console.log(props.value)
    const selectContainerRef = useRef()

    useOnClickOutside(selectContainerRef, () => setVisible(false))

    useEffect(() => {
        setSearchTerm(props?.value?.[props.displayValue] || "")
    }, [props.value])

    const currentOptions = props.options?.filter(option => option[props.displayValue].includes(searchTerm))

    return (
        <div
            className={styles.selectContainer}
            ref={selectContainerRef}
            onClick={() => setVisible(!visible)}
        >
            <input
                type="search"
                className="form-control"
                autoComplete="off"
                disabled={props.disabled}
                placeholder={props.placeholder}
                name={props.name}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={props.onBlur}
                required={props.required}
            />
            {
                props.required && (
                    props.feedbackElement
                )
            }
            <ul className={clsx(styles.optionsContainer, { [styles.show]: visible })}>
                {
                    currentOptions?.length > 0 ? currentOptions.map((option) => (
                        <li
                            key={option.id}
                            className={clsx(styles.optionsItem, { [styles.active]: option.id === props.value?.id })}
                            onClick={() => {
                                props.onSelect(option)
                                setSearchTerm(option[props.displayValue])
                            }}
                        >
                            {option[props.displayValue]}
                        </li>
                    )) : (
                        <div className={styles.noOptionsMessage}>
                            Không có lựa chọn phù hợp
                        </div>
                    )
                }
            </ul>
        </div>
    )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select