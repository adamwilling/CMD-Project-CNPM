/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Card, Container, FloatingLabel, Form, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Formik } from "formik"
import * as Yup from "yup"
import clsx from "clsx"

import styles from "./index.module.scss"
import background from "~/assets/images/OTP.svg"
import { authSelector } from "~/redux/selectors"
import { resetPassword, setStatus } from "~/redux/authSlice"

const ResetPassword = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const userId = useSelector(authSelector).userId
    const status = useSelector(authSelector).status

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Thiết lập mật khẩu mới"
    }, [])
    useEffect(() => {
        if (userInfo) {
            navigate("/")
        } else if (status === "success") {
            navigate("/login")
            dispatch(setStatus("idle"))
        } else {
            if (!userId) {
                navigate("/forgot-password")
            }
        }
    }, [status])

    /* Xử lý form với formik */
    const initialValues = {
        password: "",
        repeatPassword: "",
    }
    const validationSchema = Yup.object({
        password: Yup.string().required("Vui lòng nhập mật khẩu."),
        repeatPassword: Yup.string().test("passwords-match", "Mật khẩu không trùng khớp", function (value) {
            return this.parent.password === value
        }),
    })
    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true)
        dispatch(resetPassword({ id: userId, newPassword: values.password }))
        actions.setSubmitting(false)
    }
    //

    return (
        <Container fluid className={styles.container}>
            <Card className="col-lg-6 col-md-8 col d-flex">
                <Image src={background} className={styles.backgroundImage} />
                <Card.Body>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ values, touched, errors, handleChange, handleBlur, handleSubmit, isValid, dirty }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className={styles.title}>Thiết lập mật khẩu mới</div>
                                <hr />
                                <FloatingLabel label="Mật khẩu mới" className="mb-3">
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Nhập mật khẩu mới"
                                        className={clsx({
                                            "is-invalid": touched.password && errors.password,
                                        })}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </FloatingLabel>
                                <FloatingLabel label="Nhập lại mật khẩu" className="mb-3">
                                    <Form.Control
                                        type="password"
                                        name="repeatPassword"
                                        placeholder="Nhập lại mật khẩu"
                                        className={clsx({
                                            "is-invalid": touched.repeatPassword && errors.repeatPassword,
                                        })}
                                        value={values.repeatPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.repeatPassword && errors.repeatPassword && <div className="invalid-feedback">{errors.repeatPassword}</div>}
                                </FloatingLabel>
                                <Button type="submit" disabled={!(dirty && isValid)} className={styles.submitBtn}>
                                    <span className="fw-bold fs-4">Xác nhận</span>
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

export default ResetPassword
