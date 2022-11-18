/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import React, { useState } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { markRead } from '~/redux/notifiesSlice'

import { notifiesSelector } from '~/redux/selectors'
import ProposalDetail from '~/views/proposals/ProposalDetail'
import TaskDetail from '~/views/tasks/TaskDetail'
import Loading from '../Loading'

const NotificationBody = ({ setVisible }) => {
    const notifies = useSelector(notifiesSelector).notifies

    const dispatch = useDispatch()

    const [visibleDetail, setVisibleDetail] = useState(false)

    return (
        <ListGroup variant="flush">
            {
                notifies.length > 0 ? notifies.map((notify) => (
                    <React.Fragment key={notify.id}>
                        <ListGroup.Item
                            className="list-group-item-action cursor-pointer"
                            onClick={() => {
                                setVisibleDetail({
                                    [notify.id]: true
                                })
                                if (!notify.isRead) {
                                    dispatch(markRead([notify.id]))
                                }
                                setVisible(false)
                            }}
                        >
                            <div className="d-flex flex-column">
                                <Col className="d-flex">
                                    {
                                        !notify.isRead && <div
                                            className="rounded-circle bg-primary mt-1 me-2"
                                            style={{ width: "10px", height: "10px" }} />
                                    }
                                    <Col className="col fw-bolder text-primary">
                                        {notify.title}
                                    </Col>
                                    <Col className="text-black-50 text-end col-auto">
                                        {notify.createdAt}
                                    </Col>
                                </Col>
                                <Col>
                                    {notify.description}
                                </Col>
                            </div>
                        </ListGroup.Item>
                        {
                            notify.type === "proposal" ? visibleDetail[notify.id] && (
                                <ProposalDetail
                                    visible={visibleDetail[notify.id]}
                                    setVisible={(visible) => setVisibleDetail({
                                        [notify.id]: visible
                                    })}
                                    proposalId={notify.detailId}
                                />
                            ) : notify.type === "task" ? visibleDetail[notify.id] && (
                                <TaskDetail
                                    visible={visibleDetail[notify.id]}
                                    setVisible={(visible) => setVisibleDetail({
                                        [notify.id]: visible
                                    })}
                                    taskId={notify.detailId}
                                />
                            ) : null
                        }
                    </React.Fragment>
                )) : (
                    <div className="text-center p-3">
                        Chưa có thông báo nào
                    </div>
                )
            }
        </ListGroup>
    )
}

export default NotificationBody