/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Card, Container, FloatingLabel, Form, Image } from "react-bootstrap"
import { BsArrowLeft } from "react-icons/bs"
import { Formik } from "formik"
import * as Yup from "yup"
import clsx from "clsx"
import { useNavigate } from "react-router-dom"

import styles from './index.module.scss'
import background from "~/assets/images/focus.svg"
import { authSelector } from "~/redux/selectors"
import { forgotPassword, setStatus } from "~/redux/authSlice"

const ForgotPassword = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const status = useSelector(authSelector).status

    useEffect(() => {
        document.title = "Quên mật khẩu"
    }, [])
    useEffect(() => {
        if (status === "user") {
            navigate("/")
        }
        else if (status === "success") {
            dispatch(setStatus("idle"))
        }
    }, [status])

    /* Xử lý form với formik */
    const initialValues = {
        username: "",
    }
    const validationSchema = Yup.object({
        username: Yup.string().required("Vui lòng nhập email."),
    })
    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true)
        dispatch(forgotPassword(values))
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
                                <div className={styles.title}>Quên mật khẩu</div>
                                <hr />
                                <FloatingLabel label="Email" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        placeholder="Email"
                                        className={clsx({
                                            "is-invalid": touched.username && errors.username,
                                        })}
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.username && errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                </FloatingLabel>
                                <Button
                                    type="submit"
                                    disabled={!(dirty && isValid)}
                                    className={styles.submitBtn}
                                >
                                    <span className="fw-bold fs-4">
                                        Gửi email xác nhận
                                    </span>
                                    {
                                        status === "loading" && (
                                            <div className="d-inline text-center ms-3">
                                                <div className="spinner-border"></div>
                                            </div>
                                        )
                                    }
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Card.Body>
                <div className={styles.backToLogin}>
                    <div className={styles.backToLogin__btn} onClick={() => navigate("/login")}>
                        <BsArrowLeft className="me-2" size={25} />
                        Quay lại trang đăng nhập
                    </div>
                </div>
            </Card>
        </Container>
    )
}

export default ForgotPassword
