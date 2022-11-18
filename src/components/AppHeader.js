import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Image, Navbar } from 'react-bootstrap'

import AppNavbarNav from './AppNavbarNav'
import AppNotification from './AppNotifications/AppNotifications'
import AppHeaderDropdown from './header/AppHeaderDropdown'
import logo from "~/assets/brand/logo-full.png"
import notificationIcon from '~/assets/icons/notification.svg'

const AppHeader = () => {
    return (
        <Navbar
            id="navbarHeader"
            bg="light"
            expand="lg"
            sticky="top"
        >
            <Container fluid>
                <Navbar.Brand>
                    <NavLink to="/">
                        <Image
                            src={logo}
                            width="120"
                            height="40"
                            className="d-inline-block align-top"
                        />
                    </NavLink>
                </Navbar.Brand>
                <div className="col d-lg-none d-block" />
                <NavLink to="/notifications" className="d-lg-none d-block cursor-pointer">
                    <Image src={notificationIcon} />
                </NavLink>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <AppNavbarNav />
                    <AppNotification />
                    <AppHeaderDropdown />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default React.memo(AppHeader)
