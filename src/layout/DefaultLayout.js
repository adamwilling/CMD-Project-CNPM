/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import AppContent from "~/components/AppContent"
// import AppFooter from "~/components/AppFooter"
import AppHeader from "~/components/AppHeader"
import { authSelector } from "~/redux/selectors"

const DefaultLayout = () => {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        }
    }, [])
    return (
        <React.Fragment>
            <AppHeader />
            <AppContent />
            {/* <AppFooter /> */}
        </React.Fragment>
    )
}

export default DefaultLayout
