import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { AiOutlineDownload } from 'react-icons/ai'
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`


const Manual = () => {
    const [width, setWidth] = useState(1200)
    const [numPages, setNumPages] = useState(null)

    useEffect(() => {
        setWidth(window.innerWidth)
    }, [])


    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
    }

    return (
        <Container fluid className="d-flex flex-wrap justify-content-center align-items-center">
                <Document
                    file="https://raw.githubusercontent.com/adamwilling/CMD-FE-BUILD/main/HDSD.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            scale={width > 786 ? 2.5 : 0.6}
                        />
                    ))}
                </Document>
        </Container>
    )
}

export default Manual