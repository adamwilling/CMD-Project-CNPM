/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Button, Card, Col, Container, FloatingLabel, Form, Image } from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"
import clsx from "clsx"
import { useDispatch, useSelector } from "react-redux"

import styles from "./index.module.scss"
import background from "~/assets/images/login-background.svg"
import { login } from "~/redux/authSlice"
import { authSelector } from "~/redux/selectors"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const status = useSelector(authSelector).status

    useEffect(() => {
        document.title = "Đăng Nhập"
    }, [])
    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [status])

    /* Xử lý form */
    const initialValues = {
        username: "",
        password: "",
    }
    const validationSchema = Yup.object({
        username: Yup.string().required("Vui lòng nhập tên người dùng."),
        password: Yup.string().required("Vui lòng nhập mật khẩu."),
    })
    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true)
        dispatch(login(values))
        actions.setSubmitting(false)
    }
    //

    return (
        <Container fluid className={styles.container}>
            <Card className="col-lg-6 col-md-8 col">
                <Image src={background} className={styles.backgroundImage} />
                <Card.Body>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ values, touched, errors, handleChange, handleBlur, handleSubmit, isValid, dirty }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className={styles.title}>Đăng nhập</div>
                                <hr />
                                <FloatingLabel label="Tên người dùng" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        placeholder="Tên người dùng"
                                        className={clsx({
                                            "is-invalid": touched.username && errors.username,
                                        })}
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.username && errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                </FloatingLabel>
                                <FloatingLabel label="Mật khẩu" className="mb-3">
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Mật khẩu"
                                        className={clsx({
                                            "is-invalid": touched.password && errors.password,
                                        })}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </FloatingLabel>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    {/* <Form.Check
                                                label="Ghi nhớ đăng nhập"
                                            /> */}
                                    <Col />
                                    <NavLink to="/forgot-password">Quên mật khẩu?</NavLink>
                                </div>
                                <Button type="submit" disabled={!(dirty && isValid)} className={styles.submitBtn}>
                                    <span className="fw-bold fs-4">Đăng nhập</span>
                                    {status === "loading" && (
                                        <div className="d-inline text-center ms-3">
                                            <div className="spinner-border"></div>
                                        </div>
                                    )}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Login
