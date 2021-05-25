import React, { useEffect, useState } from 'react'
import './Profile.scss'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import { shallowEqual, useSelector } from 'react-redux'
import groupsService from '../../../Service/groups'

export const Profile = () => {
  const { name, mail, avatar, id } = useSelector((state) => state.user, shallowEqual) || ''
  const [groupsCoach, setGroupsCoach] = useState([])
  const [groupsAthleta, setGroupsAthleta] = useState([])

  useEffect(() => {
    const getGroups = async () => {
      try {
        const { groupsAsAdmin } = await groupsService.getGroups({
          userID: id,
          isAdmin: true,
          isProfileInfo: false,
        })
        const { groupsAsMember } = await groupsService.getGroups({
          userID: id,
          isAdmin: false,
          isProfileInfo: false,
        })
        setGroupsCoach(groupsAsAdmin)
        setGroupsAthleta(groupsAsMember)
      } catch (err) {
        console.log(err)
      }
    }
    getGroups()
  }, [])

  return (
    <Container className="profile-container">
      <Card>
        <Card.Body>
          <div className="info-continer">
            {avatar ? (
              <Image src={avatar} className="img-fluid" alt="Imagen de Empresa" />
            ) : (
              <div className="avatar-circle">
                <span className="initials">{name.toUpperCase().charAt(0)}</span>
              </div>
            )}
            <p className="name-tile">{name}</p>
            <p className="email-title">{mail}</p>
          </div>
          <div className="group-container">
            <div className="coach-container">
              <p className="coach-title">GRUPOS EN LOS QUE SOY COACH</p>
              <Row>
                {groupsCoach.length
                  ? groupsCoach.map((item, index) => (
                      <Col md={6} key={index}>
                        <p className="groups-title">{item.name}</p>
                      </Col>
                    ))
                  : null}
              </Row>
            </div>
            <div className="coach-container">
              <p className="coach-title">GRUPOS EN LOS QUE SOY ATLETA</p>
              <Row>
                {groupsAthleta.length
                  ? groupsAthleta.map((item, index) => (
                      <Col md={6} key={index}>
                        <p className="groups-title">{item.name}</p>
                      </Col>
                    ))
                  : null}
              </Row>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}
