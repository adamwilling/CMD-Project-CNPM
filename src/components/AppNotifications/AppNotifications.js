/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { Dropdown, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { BiCheckDouble, BiDotsHorizontalRounded, BiNotification } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'

import styles from "./AppNotification.module.scss"
import notificationIcon from '~/assets/icons/notification.svg'
import NotificationBody from './NotifycationBody'
import { getNotifyList, markAllRead } from '~/redux/notifiesSlice'
import useOnClickOutside from '~/customHooks/useOnClickOutside'
import { notifiesSelector } from '~/redux/selectors'
import clsx from 'clsx'

const AppNotifications = () => {
    const dispatch = useDispatch()

    const countUnread = useSelector(notifiesSelector).countUnread

    const [visible, setVisible] = useState(false)

    const notifiRef = useRef()

    useOnClickOutside(notifiRef, () => setVisible(false))

    useEffect(() => {
        dispatch(getNotifyList())
    }, [])

    return (
        <div
            ref={notifiRef}
            className={styles.notificationWrapper + " d-lg-block d-none"}
        >
            <div
                className={clsx(styles.notificationToggle, { [styles.ring]: countUnread !== 0 })}
                onClick={() => setVisible(!visible)}
                countunread={countUnread}
            >
                <Image src={notificationIcon} />
            </div>
            <div className={styles.notificationContent} style={{ display: visible && "block" }}>
                <div className={styles.notificationHeader}>
                    THÔNG BÁO
                    <div className={styles.notificationAction}>
                        <Dropdown align="end" drop="down">
                            <Dropdown.Toggle variant="none">
                                <BiDotsHorizontalRounded size={30} className="text-white" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                className="animate__animated animate__zoomIn animate__faster"
                                style={{
                                    boxShadow: "0 -4px 32px rgb(0 0 0 / 20%)"
                                }}
                            >
                                <Dropdown.Item onClick={() => dispatch(markAllRead())}>
                                    <BiCheckDouble /> Đánh dấu tất cả đã đọc
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <NavLink to="/notifications" onClick={() => setVisible(false)}>
                                        <BiNotification /> Quản lý thông báo
                                    </NavLink>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className={styles.notificationBody}>
                    <NotificationBody setVisible={setVisible} />
                </div>
            </div>
        </div>
    )
}

export default AppNotifications