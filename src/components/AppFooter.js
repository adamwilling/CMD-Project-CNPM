/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { Navbar } from 'react-bootstrap'
import { BsChatDotsFill, BsEnvelopeFill, BsTelephoneForwardFill } from 'react-icons/bs'

const AppFooter = () => {
    return (
        <Navbar
            id="footer"
            className="container-fluid"
        >
                <div className="row flex-lg-row flex-column p-2">
                    <div className="col-lg-5 col">
                        <span className="fw-bolder">
                            Địa chỉ: {""}
                        </span>
                        <a
                            className="text-decoration-none text-white"
                            href="https://goo.gl/maps/LqaLLZmwrJdDVzY86"
                            target="_blank"
                        >
                            KTX Cỏ May, Tổ 1, Khu phố 6, Phường Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh (trong khuôn viên Trường Đại học Nông Lâm TP.HCM) {""}
                        </a>
                    </div>
                    <div className="col" />
                    <div className="col-lg-3 col">
                        <span className="fw-bolder">
                            Số điện thoại: {""}
                        </span>
                        0913887055 {""}
                        <a
                            className="text-decoration-none text-white"
                            href="tel:0913887055"
                            target="_blank"
                        >
                            <BsTelephoneForwardFill />
                        </a>
                        <a
                            className="text-decoration-none text-white ms-2"
                            href="sms:0913887055"
                            target="_blank"
                        >
                            <BsChatDotsFill />
                        </a>
                        <br />
                        <span className="fw-bolder">
                            Email: {""}
                        </span>
                        kytucxa@comaygroup.com {""}
                        <a
                            className="text-decoration-none text-white"
                            href="mailto:kytucxa@comaygroup.com"
                            target="_blank"
                        >
                            <BsEnvelopeFill />
                        </a>
                    </div>
                </div>
        </Navbar>
    )
}

export default React.memo(AppFooter)