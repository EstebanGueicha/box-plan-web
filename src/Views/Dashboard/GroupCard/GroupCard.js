import React, { useEffect, useState } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import { Button, Card, Col, Image, Row, Spinner } from 'react-bootstrap'
import groupsService from '../../../Service/groups'
import EditIcon from '@material-ui/icons/Edit'
import './GroupCard.scss'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import LoadingOverlay from 'react-loading-overlay'
import ClearIcon from '@material-ui/icons/Clear'
import { shallowEqual, useSelector } from 'react-redux'
import Coach from '../../../Images/coach.svg'

export const GroupCard = (props) => {
  const {
    item,
    deleteGroup,
    isAdmin,
    setAddMember,
    setDeleteMember,
    setDeleteGroupModal,
    fetchingMembers,
    setDeleteGroup,
    setFetching,
    setAddCoach,
    setDeleteCoach,
  } = props
  const { id } = useSelector((state) => state.user, shallowEqual) || ''
  const [athletes, setAthletes] = useState([])
  const [coaches, setCoaches] = useState([])
  const [editName, setEditName] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newName, setNewName] = useState(item.name)

  useEffect(() => {
    const getGroupMembers = async () => {
      try {
        const { athletes, coaches } = await groupsService.getGroupMembers({ groupID: item.id })
        setAthletes(athletes)
        setCoaches(coaches)
      } catch (err) {
        console.log(err)
      }
    }

    getGroupMembers()
  }, [item, fetchingMembers])

  const changeNameGroup = async () => {
    const data = {}
    try {
      setLoading(true)
      data.name = newName
      data.groupID = item.id
      await groupsService.renameGroup(data)
      setLoading(false)
      setFetching((prev) => !prev)
      setEditName((prev) => !prev)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <LoadingOverlay
      active={deleteGroup}
      spinner={
        <Button
          onClick={() => {
            setDeleteGroup((prev) => !prev)
            setDeleteGroupModal({ showModal: true, selectedGroup: item })
          }}
        >
          Eliminar grupo {item.name}
        </Button>
      }
      className={`overlay ${deleteGroup}`}
    >
      <Card className="group-card">
        <Card.Title>
          <div className="group-continer">
            {editName ? (
              <TextField value={newName} onChange={(e) => setNewName(e.target.value)} />
            ) : (
              <p className="group-title">{item.name}</p>
            )}
            {editName ? (
              <Button
                className="change-name"
                disabled={loading}
                onClick={() => (newName ? changeNameGroup() : null)}
              >
                {loading ? (
                  <Spinner
                    animation="border"
                    role="status"
                    size="sm"
                    style={{ marginRight: '0.5rem' }}
                  />
                ) : null}
                Cambiar
              </Button>
            ) : null}
            {isAdmin ? (
              <IconButton title="Editar nombre" onClick={() => setEditName((prev) => !prev)}>
                {editName ? <ClearIcon /> : <EditIcon />}
              </IconButton>
            ) : null}
          </div>
          {isAdmin ? (
            <div>
              <IconButton
                onClick={() => setAddMember({ showModal: true, selectedGroup: item })}
                title="Agregar integrante"
              >
                <PersonAddIcon />
              </IconButton>
              <IconButton
                onClick={() => setAddCoach({ showModal: true, selectedGroup: item })}
                title="Agregar coach"
              >
                <img src={Coach} alt="coach" width="20" height="20" />
              </IconButton>
            </div>
          ) : null}
        </Card.Title>
        <Card.Body>
          <Row>
            <Col md={12}>
              <Row>
                <Col md={2}>
                  <p className="title">Coaches:</p>
                </Col>
                <Col md={10}>
                  <Row>
                    {coaches.length ? (
                      coaches.map((coach, index) => (
                        <Col md={3} key={index}>
                          <div className="member-container">
                            {coach.avatar ? (
                              <Image
                                src={coach.avatar.imageUrl}
                                className="img-fluid"
                                alt="Imagen de Empresa"
                              />
                            ) : (
                              <div className="avatar-circle">
                                <span className="initials">
                                  {coach.name ? coach.name.toUpperCase().charAt(0) : ''}
                                </span>
                              </div>
                            )}
                            <p className="member">{coach.name}</p>
                            {coach.id !== id && isAdmin ? (
                              <IconButton
                                className="icon-button"
                                title="Eliminar integrante"
                                onClick={() =>
                                  setDeleteCoach({
                                    showModal: true,
                                    member: coach,
                                    selectedGroup: item,
                                  })
                                }
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            ) : null}
                          </div>
                        </Col>
                      ))
                    ) : (
                      <p>No hay Coaches</p>
                    )}
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Row>
                <Col md={2}>
                  <p className="title">Atletas:</p>
                </Col>
                <Col md={10}>
                  <Row>
                    {athletes.length ? (
                      athletes.map((athlet, index) => (
                        <Col md={3} key={index}>
                          <div className="member-container">
                            {athlet.avatar ? (
                              <Image
                                src={athlet.avatar.imageUrl}
                                className="img-fluid"
                                alt="Imagen de Empresa"
                              />
                            ) : (
                              <div className="avatar-circle">
                                <span className="initials">
                                  {athlet.name ? athlet.name.toUpperCase().charAt(0) : ''}
                                </span>
                              </div>
                            )}
                            <p className="member">{athlet.name}</p>
                            {athlet.id !== id && isAdmin ? (
                              <IconButton
                                className="icon-button"
                                title="Eliminar integrante"
                                onClick={() =>
                                  setDeleteMember({
                                    showModal: true,
                                    member: athlet,
                                    selectedGroup: item,
                                  })
                                }
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            ) : null}
                          </div>
                        </Col>
                      ))
                    ) : (
                      <p>No hay Atletas aún</p>
                    )}
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </LoadingOverlay>
  )
}
