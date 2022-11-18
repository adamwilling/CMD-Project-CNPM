/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy, Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Loading from './components/Loading'
import { getUserInfo } from './redux/authSlice'
import './scss/style.scss'

// Containers
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = lazy(() => import('./views/pages/Login'))
const ForgotPassword = lazy(() => import('./views/pages/ForgotPassword'))
const CheckTokenResetPassword = lazy(() => import('./views/pages/CheckTokenResetPassword'))
const ResetPassword = lazy(() => import('./views/pages/ResetPassword'))

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserInfo())
    }, [])

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/login" name="Đăng Nhập" element={<Login />} />
                <Route path="/*" name="Trang Chủ" element={<DefaultLayout />} />
                <Route path="/forgot-password" name="Quên mật khẩu" element={<ForgotPassword />} />
                <Route path="/check-token" name="Xác thực token" element={<CheckTokenResetPassword />} />
                <Route path="/reset-password" name="Thiết lập mật khẩu mới" element={<ResetPassword />} />
            </Routes>
        </Suspense>
    )
}

export default App
