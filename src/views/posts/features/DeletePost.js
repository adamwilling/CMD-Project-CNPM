import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import Confirm from '~/components/Confirm'

import { deletePost } from '~/redux/postsSlice'

const DeletePost = ({ visible, setVisible, postInfo }) => {

    const dispatch = useDispatch()
    
    const handleDelete = () => {
        dispatch(deletePost(postInfo.id))
        setVisible(false)
    }

    return <Confirm
        visible={visible}
        setVisible={setVisible}
        title="Xóa bài viết"
        content={`Bạn có chắc muốn xóa bài viết?`}
        onConfirm={handleDelete}
    />
}

export default DeletePost