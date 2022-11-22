/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Accordion, Button, Container, Form, Table } from 'react-bootstrap'
import { BsArrowLeft, BsFillTrashFill } from 'react-icons/bs'

import proposalTypesApi from '~/api/proposalTypesApi'
import SubmitField from './SubmitField'
import Loading from '~/components/Loading'
import DeleteField from './DeleteField'
import { BiEdit, BiPlusMedical, BiTrash } from 'react-icons/bi'
import MultiSelect from '~/components/MultiSelect'
import SubmitApprovalStep from './ApprovalStep/SubmitApprovalStep'
import { useDispatch, useSelector } from 'react-redux'
import { approvalStepsSelector, authSelector } from '~/redux/selectors'
import { getApprovalStepList } from '~/redux/configs/approvalStepsSlice'
import DeleteApprovalStep from './ApprovalStep/DeleteApprovalStep'

const ProposalTypeConfig = () => {
    const typePermissions = useSelector(authSelector).userInfo.role.type

    const approvalSteps = useSelector(approvalStepsSelector).approvalSteps
    const status = useSelector(approvalStepsSelector).status

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [proposalTypeInfo, setProposalTypeInfo] = useState({})
    const [visibleEditProposalTypeUI, setVisibleEditProposalTypeUI] = useState(false)
    const [visibleEditFieldUI, setVisileEditFieldUI] = useState({})
    const [visibleDeleteFieldUI, setVisileDeleteFieldUI] = useState({})
    const [visibleAddFieldOfFormUI, setVisibleAddFieldOfFormUI] = useState(false)
    const [visibleAddFieldOfApprovalStepUI, setvisibleAddFieldOfApprovalStepUI] = useState({})
    const [visibleAddApprovalStepUI, setVisibleAddApprovalStepUI] = useState(false)
    const [visibleEditApprovalStepUI, setVisibleEditApprovalStepUI] = useState({})
    const [visibleDeleteApprovalStepUI, setVisibleDeleteApprovalStepUI] = useState({})

    document.title = `Thiếp lập đề xuất - ${proposalTypeInfo.name}`

    useEffect(() => {
        proposalTypesApi.getProposalTypeDetail(params.id)
            .then((response) => {
                setProposalTypeInfo(response.data.data)
                setLoading(false)
            })
        dispatch(getApprovalStepList(params.id))
    }, [])

    const handleAddFieldOfApprovalStep = (stepId) => {
        setvisibleAddFieldOfApprovalStepUI({
            [stepId]: true
        })
    }

    return (
        <Container fluid>
            {
                loading || status === "loading" ? <Loading /> : (
                    <>
                        <Container fluid>
                            <div className="d-flex">
                                <div className="col fw-bolder text-uppercase fs-5 mb-3">
                                    <BsArrowLeft className="cursor-pointer me-2" size={25} onClick={() => navigate(-1)} />
                                    Thiếp lập đề xuất - {proposalTypeInfo.name}
                                </div>
                                <div className="col-auto">
                                    <BiEdit
                                        size={25}
                                        className="cursor-pointer"
                                        onClick={() => setVisibleEditProposalTypeUI(true)}
                                    />
                                </div>
                            </div>
                            <hr />
                        </Container>
                        <Container fluid>
                            <Accordion defaultActiveKey={['0']} alwaysOpen>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        Biểu mẫu
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Table
                                            striped
                                            borderless
                                            hover
                                            responsive
                                            className="bg-white"
                                        >
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Tên trường
                                                    </th>
                                                    <th>
                                                        Loại
                                                    </th>
                                                    <th>
                                                        Bắt buộc
                                                    </th>
                                                    {/* {
                            (typePermissions.update || typePermissions.delete) && (
                              <th>
                                Thao tác
                              </th>
                            )
                          } */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    proposalTypeInfo.fields?.map((field, index) => (
                                                        <tr key={field.id}>
                                                            <td>
                                                                {field.label}
                                                            </td>
                                                            <td>
                                                                {field.dataType.name}
                                                            </td>
                                                            <td>
                                                                {
                                                                    field.required ? (
                                                                        <span className="text-success fw-bold">
                                                                            Bắt buộc
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-secondary fw-bold">
                                                                            Không bắt buộc
                                                                        </span>
                                                                    )
                                                                }
                                                            </td>
                                                            {/* {
                                (typePermissions.update || typePermissions.delete) && (
                                  <>
                                    <td>
                                      {
                                        index !== 0 && (
                                          <>
                                            <BiEdit
                                              size={20}
                                              className="ms-1 cursor-pointer"
                                              onClick={() => setVisileEditFieldUI({
                                                ...visibleEditFieldUI,
                                                [field.id]: true
                                              })}
                                            />
                                            <BiTrash
                                              size={20}
                                              className="ms-1 cursor-pointer"
                                              onClick={() => setVisileDeleteFieldUI({
                                                ...visibleDeleteFieldUI,
                                                [field.id]: true
                                              })}
                                            />
                                          </>
                                        )
                                      }
                                    </td>
                                    {
                                      visibleEditFieldUI[field.id] && (
                                        <SubmitField
                                          visible={visibleEditFieldUI[field.id]}
                                          setVisible={(visible) => {
                                            setVisileEditFieldUI({
                                              [field.id]: visible
                                            })
                                          }}
                                          type="proposal-type"
                                          info={field}
                                        />
                                      )
                                    }
                                    {
                                      visibleDeleteFieldUI[field.id] && (
                                        <DeleteField
                                          visible={visibleDeleteFieldUI}
                                          setVisible={setVisileDeleteFieldUI}
                                          field={field}
                                        />
                                      )
                                    }
                                  </>
                                )
                              } */}
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                        {/* {
                      typePermissions.create && (
                        <Button
                          variant="outline-primary"
                          className="d-block m-auto fw-bolder"
                          onClick={() => setVisibleAddFieldOfFormUI(true)}
                        >
                          <BiPlusMedical /> Thêm trường <BiPlusMedical />
                        </Button>
                      )
                    } */}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            {
                                approvalSteps && approvalSteps.map((step) => (
                                    <Accordion
                                        key={step.id}
                                        alwaysOpen
                                        className="mt-4"
                                    >
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                {step.name}
                                                {
                                                    typePermissions.update && (
                                                        <BiEdit
                                                            size={20}
                                                            className="ms-1 cursor-pointer"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                setVisibleEditApprovalStepUI({
                                                                    ...visibleEditApprovalStepUI,
                                                                    [step.id]: !visibleEditApprovalStepUI[step.id] ? true : false
                                                                })
                                                            }}
                                                        />
                                                    )
                                                }
                                                {
                                                    typePermissions.delete && (
                                                        <BiTrash
                                                            size={20}
                                                            className="ms-1 cursor-pointer"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                setVisibleDeleteApprovalStepUI({
                                                                    ...visibleDeleteApprovalStepUI,
                                                                    [step.id]: !visibleDeleteApprovalStepUI[step.id] ? true : false
                                                                })
                                                            }}
                                                        />
                                                    )
                                                }
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className="mb-4">
                                                    <Form.Label>Đối tượng được duyệt:</Form.Label>
                                                    <MultiSelect
                                                        disable
                                                        showCheckbox
                                                        displayValue="name"
                                                        placeholder={""}
                                                        selectedValues={step.approvalConfigTargets}
                                                    />
                                                </div>
                                                {/* {
                          typePermissions.create && (
                            <Button
                              variant="outline-primary"
                              className="d-block m-auto fw-bolder"
                              onClick={() => handleAddFieldOfApprovalStep(step.id)}
                            >
                              <BiPlusMedical /> Thêm trường <BiPlusMedical />
                            </Button>
                          )
                        } */}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        {
                                            visibleAddFieldOfApprovalStepUI[step.id] && (
                                                <SubmitField
                                                    visible={visibleAddFieldOfApprovalStepUI[step.id]}
                                                    setVisible={(value) => {
                                                        setvisibleAddFieldOfApprovalStepUI({
                                                            ...visibleAddFieldOfApprovalStepUI,
                                                            [step.id]: value
                                                        })
                                                    }}
                                                    type="approval-step"
                                                />
                                            )
                                        }
                                        {
                                            visibleEditApprovalStepUI[step.id] && (
                                                <SubmitApprovalStep
                                                    visible={visibleEditApprovalStepUI[step.id]}
                                                    setVisible={(value) => {
                                                        setVisibleEditApprovalStepUI({
                                                            ...visibleEditApprovalStepUI,
                                                            [step.id]: value
                                                        })
                                                    }}
                                                    type="approval-step"
                                                    info={step}
                                                />
                                            )
                                        }
                                        {
                                            visibleDeleteApprovalStepUI[step.id] && (
                                                <DeleteApprovalStep
                                                    visible={visibleDeleteApprovalStepUI[step.id]}
                                                    setVisible={(value) => {
                                                        setVisibleDeleteApprovalStepUI({
                                                            ...visibleDeleteApprovalStepUI,
                                                            [step.id]: value
                                                        })
                                                    }}
                                                    step={step}
                                                />
                                            )
                                        }
                                    </Accordion>
                                ))
                            }
                            {
                                typePermissions.create && (
                                    <Button
                                        variant="outline-primary"
                                        className="mt-4 d-block m-auto fw-bolder"
                                        onClick={() => setVisibleAddApprovalStepUI(true)}
                                    >
                                        <BiPlusMedical /> Thêm bước duyệt <BiPlusMedical />
                                    </Button>
                                )
                            }
                        </Container>
                        {
                            visibleAddApprovalStepUI && (
                                <SubmitApprovalStep
                                    visible={visibleAddApprovalStepUI}
                                    setVisible={setVisibleAddApprovalStepUI}
                                    type="approval-step"
                                    index={approvalSteps?.length}
                                    proposalTypeId={proposalTypeInfo.id}
                                />
                            )
                        }
                        {
                            visibleEditProposalTypeUI && (
                                <SubmitApprovalStep
                                    visible={visibleEditProposalTypeUI}
                                    setVisible={setVisibleEditProposalTypeUI}
                                    type="proposal-type"
                                    info={proposalTypeInfo}
                                    setInfo={(info) => setProposalTypeInfo({
                                        ...proposalTypeInfo,
                                        ...info
                                    })}
                                />
                            )
                        }
                        {
                            visibleAddFieldOfFormUI && <SubmitField visible={visibleAddFieldOfFormUI} setVisible={setVisibleAddFieldOfFormUI} type="proposal-type" />
                        }
                    </>
                )
            }
        </Container>
    )
}

export default ProposalTypeConfig