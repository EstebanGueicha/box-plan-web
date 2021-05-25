import React, { useEffect, useState } from 'react'
import { Accordion, Card, Col, Dropdown, Row } from 'react-bootstrap'
import { ArrowChange } from '../../../Components/ArrowChange'
import { WodTypes } from '../../../Utils/Constants'
import EditIcon from '@material-ui/icons/Edit'
import './DayCard.scss'
import { Icon, IconButton } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

export const DayCard = (props) => {
  const { item, setAddWorkout, workoutWeek, startDate, isAdmin, viewStyle } = props
  const [dayWorkouts, setDayWorkouts] = useState(null)
  const [showIcon, setShowIcon] = useState('')

  useEffect(() => {
    setDayWorkouts(null)
    if (workoutWeek && workoutWeek.length) {
      const result = workoutWeek.find(
        (w) => new Date(w.date).toUTCString() === new Date(item.dateDay).toUTCString(),
      )
      if (result) {
        setDayWorkouts(result)
      }
    }
  }, [workoutWeek, item, startDate])

  console.log(dayWorkouts)

  return (
    <Card className={`day-card ${viewStyle}`}>
      <Card.Title>
        <p className="day-title">
          {' '}
          {item.description} {item.numberDay}
        </p>
        <Dropdown className="day-edit">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            <Icon>
              <EditIcon />
            </Icon>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {isAdmin ? (
              <>
                <Dropdown.Item
                  onClick={() => setAddWorkout({ showModal: true, workoutWeek, item })}
                >
                  Agregar rutina
                </Dropdown.Item>
                {showIcon === 'edit' ? (
                  <Dropdown.Item onClick={() => setShowIcon('')}>Cancelar</Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={() => setShowIcon('edit')}>
                    Modificar rutinas
                  </Dropdown.Item>
                )}
                {showIcon === 'delete' ? (
                  <Dropdown.Item onClick={() => setShowIcon('')}>Cancelar</Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={() => setShowIcon('delete')}>
                    Eliminar rutinas
                  </Dropdown.Item>
                )}
              </>
            ) : (
              <>
                <Dropdown.Item>Agregar mis tiempos</Dropdown.Item>
                <Dropdown.Item>Calcular peso</Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Card.Title>
      <Card.Body>
        <Row>
          {dayWorkouts && WodTypes && dayWorkouts.workouts.length ? (
            dayWorkouts.workouts.map((item, index) =>
              viewStyle ? (
                <Col md={6} key={index}>
                  <Card className="view-card-container">
                    <Card.Body>
                      <div className="cat-time-container">
                        <p className="title">CATEGORIA</p>
                        <p className="title">TIEMPO</p>
                      </div>
                      <div className="cat-time-container">
                        <p className="category">
                          {' '}
                          {WodTypes.find((w) => w.id === item.wodType).description}
                        </p>
                        <p className="time"> {item.workoutTime}'</p>
                      </div>
                      <p className="title">DESCRIPCIÓN</p>
                      <p>{item.workoutDescription}</p>
                    </Card.Body>

                    {showIcon === 'edit' ? (
                      <Card.Footer>
                        <IconButton className="icon-button" title="Eliminar integrante">
                          <EditIcon />
                        </IconButton>
                      </Card.Footer>
                    ) : null}
                    {showIcon === 'delete' ? (
                      <Card.Footer>
                        <IconButton className="icon-button" title="Eliminar integrante">
                          <DeleteForeverIcon />
                        </IconButton>
                      </Card.Footer>
                    ) : null}
                  </Card>
                </Col>
              ) : (
                <Col md={12} key={index}>
                  <div className="workout-container">
                    <Accordion>
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                          <p className="category">
                            {' '}
                            {WodTypes.find((w) => w.id === item.wodType).description}
                          </p>
                          <div className="arrow-time-container">
                            <p className="time"> {item.workoutTime}'</p>
                            {showIcon === 'edit' ? (
                              <IconButton className="icon-button" title="Eliminar integrante">
                                <EditIcon />
                              </IconButton>
                            ) : null}
                            {showIcon === 'delete' ? (
                              <IconButton className="icon-button" title="Eliminar integrante">
                                <DeleteForeverIcon />
                              </IconButton>
                            ) : null}
                            <ArrowChange eventKey="0" />
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>{item.workoutDescription}</Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                </Col>
              ),
            )
          ) : (
            <p>No ha cargado rutinas todavia</p>
          )}
        </Row>
      </Card.Body>
    </Card>
  )
}
