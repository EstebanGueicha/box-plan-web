import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card, Col, Dropdown, Row } from 'react-bootstrap'
import { ArrowChange } from '../../../Components/ArrowChange'
import { WodTypes } from '../../../Utils/Constants'
import EditIcon from '@material-ui/icons/Edit'
import TimerIcon from '@material-ui/icons/Timer'
import './DayCard.scss'
import { Icon, IconButton } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'

export const DayCard = (props) => {
  const {
    item,
    setAddWorkout,
    workoutWeek,
    startDate,
    isAdmin,
    viewStyle,
    selectedGroup,
    setDeleteWorkout,
    setViewStyle,
    setweigthCalculate,
  } = props
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
                  onClick={() =>
                    setAddWorkout({ showModal: true, workoutWeek, item, selectedGroup })
                  }
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
                {showIcon === 'time' ? (
                  <Dropdown.Item onClick={() => setShowIcon('')}>Cancelar</Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={() => setShowIcon('time')}>
                    Agregar mis tiempos
                  </Dropdown.Item>
                )}
                {showIcon === 'weight' ? (
                  <Dropdown.Item onClick={() => setShowIcon('')}>Cancelar</Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={() => setShowIcon('weight')}>Calcular peso</Dropdown.Item>
                )}
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Card.Title>
      <Card.Body>
        <Row>
          {dayWorkouts && WodTypes && dayWorkouts.workouts.length ? (
            dayWorkouts.workouts.map((workout, index) =>
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
                          {workout.title
                            ? workout.title
                            : WodTypes.find((w) => w.id === workout.wodType).description}
                        </p>
                        <p className="time"> {workout.workoutTime}'</p>
                      </div>
                      <p className="title">DESCRIPCIÓN</p>
                      <p>{workout.workoutDescription}</p>
                      {workout.weightLiftingSession && workout.weightLiftingSession.length ? (
                        <Accordion>
                          <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                              <p className="category">Weightlifting</p>
                              <div className="arrow-time-container">
                                <ArrowChange eventKey="0" />
                              </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                              <Card.Body>
                                <Row>
                                  <Col md={1} />
                                  <Col md={3}>
                                    <p>Sets</p>
                                  </Col>
                                  <Col md={3}>
                                    <p>Reps</p>
                                  </Col>
                                  <Col md={3}>
                                    <p>%</p>
                                  </Col>
                                  <Col md={1} />
                                </Row>
                                {workout.weightLiftingSession.map((weightLifting, index) => (
                                  <Row key={index}>
                                    <Col md={1} />
                                    <Col md={3}>
                                      <p>{weightLifting.sets}</p>
                                    </Col>
                                    <Col md={3}>
                                      <p>{weightLifting.repetitions}</p>
                                    </Col>
                                    <Col md={3}>
                                      <p>{weightLifting.percentaje}</p>
                                    </Col>
                                    <Col md={1} />
                                  </Row>
                                ))}
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion>
                      ) : null}
                    </Card.Body>

                    {showIcon === 'edit' ? (
                      <Card.Footer>
                        <IconButton
                          className="icon-button"
                          title="Actualizar workout"
                          onClick={() =>
                            setAddWorkout({
                              showModal: true,
                              workoutWeek,
                              item,
                              selectedGroup,
                              workout,
                              update: true,
                            })
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </Card.Footer>
                    ) : null}
                    {showIcon === 'delete' ? (
                      <Card.Footer>
                        <IconButton
                          className="icon-button"
                          title="Eliminar workout"
                          onClick={() =>
                            setDeleteWorkout({
                              showModal: true,
                              workoutWeek,
                              item,
                              selectedGroup,
                              workout,
                            })
                          }
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </Card.Footer>
                    ) : null}
                    {showIcon === 'time' ? (
                      <Card.Footer>
                        <IconButton className="icon-button" title="Agregar mis tiempos">
                          <TimerIcon />
                        </IconButton>
                      </Card.Footer>
                    ) : null}
                    {showIcon === 'weight' &&
                    workout.weightLiftingSession &&
                    workout.weightLiftingSession.length ? (
                      <Card.Footer>
                        <IconButton
                          className="icon-button"
                          title="Calcular Peso"
                          onClick={() =>
                            setweigthCalculate({
                              showModal: true,
                              weightLiftingSession: workout.weightLiftingSession,
                            })
                          }
                        >
                          <FitnessCenterIcon />
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
                            {workout.title
                              ? workout.title
                              : WodTypes.find((w) => w.id === workout.wodType).description}
                          </p>
                          <div className="arrow-time-container">
                            <p className="time"> {workout.workoutTime}'</p>
                            {showIcon === 'edit' ? (
                              <IconButton
                                className="icon-button"
                                title="Actualizar workout"
                                onClick={() =>
                                  setAddWorkout({
                                    showModal: true,
                                    workoutWeek,
                                    item,
                                    workout,
                                    selectedGroup,
                                    update: true,
                                  })
                                }
                              >
                                <EditIcon />
                              </IconButton>
                            ) : null}
                            {showIcon === 'delete' ? (
                              <IconButton
                                className="icon-button"
                                title="Eliminar workout"
                                onClick={() =>
                                  setDeleteWorkout({
                                    showModal: true,
                                    workoutWeek,
                                    item,
                                    workout,
                                    selectedGroup,
                                  })
                                }
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            ) : null}
                            {showIcon === 'time' ? (
                              <IconButton className="icon-button" title="Agregar mis tiempos">
                                <TimerIcon />
                              </IconButton>
                            ) : null}
                            {showIcon === 'weight' &&
                            workout.weightLiftingSession &&
                            workout.weightLiftingSession.length ? (
                              <IconButton
                                className="icon-button"
                                title="Calcular Peso"
                                onClick={() =>
                                  setweigthCalculate({
                                    showModal: true,
                                    weightLiftingSession: workout.weightLiftingSession,
                                  })
                                }
                              >
                                <FitnessCenterIcon />
                              </IconButton>
                            ) : null}
                            <ArrowChange eventKey="0" />
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            {workout.workoutDescription}{' '}
                            {workout.wodType === 2 ? (
                              <Button variant="link" onClick={() => setViewStyle(true)}>
                                Ver Detalle
                              </Button>
                            ) : null}
                          </Card.Body>
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
