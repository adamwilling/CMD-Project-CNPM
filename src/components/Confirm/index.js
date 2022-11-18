import { useEffect } from 'react'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    onConfirm: PropTypes.func.isRequired,
    showCancelButton: PropTypes.bool,
    cancelButtonText: PropTypes.string,
}
const defaultProps = {
    visible: false,
    setVisible: null,
    title: "",
    content: "",
    onConfirm: null,
    showCancelButton: true,
    cancelButtonText: "Hủy",
}

const Confirm = (props) => {
    useEffect(() => {
        if (props.visible) {
            Swal.fire({
                title: props.title,
                html: props.content,
                showCancelButton: props.showCancelButton,
                cancelButtonText: props.cancelButtonText,
            }).then((result) => {
                if (result.isConfirmed) {
                    props.onConfirm()
                }
                else {
                    props.setVisible(false)
                }
            })
        }
    })
    
    return null
}

Confirm.propTypes = propTypes
Confirm.defaultProps = defaultProps

export default Confirm