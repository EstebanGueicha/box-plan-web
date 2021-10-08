import React from 'react'
import { Accordion, Card, Row, Col } from 'react-bootstrap'
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import TimerIcon from '@material-ui/icons/Timer'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import { ArrowChange } from '../ArrowChange'
import { Alphabet } from '../../Utils/Constants'

export const BigCardWorkout = ({
  workout,
  WodTypes,
  showIcon,
  setAddWorkout,
  workoutWeek,
  item,
  selectedGroup,
  setDeleteWorkout,
  setweigthCalculate,
  setAddTime,
}) => {
  const getWord = (index) => {
    const res = Alphabet[index]
    if (!res) {
      return index + 1
    } else {
      return res.word
    }
  }
  return (
    <Card className="view-card-container">
      <Card.Body>
        <div className="cat-time-container">
          <p className="title">{getWord(workout.index)}. CATEGORIA</p>
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
        {workout.weightLiftingDescription ? (
          <>
            <p className="title">DESCRIPCIÓN Weightlifting</p>
            <span style={{ whiteSpace: 'pre-line' }}>{workout.weightLiftingDescription}</span>
          </>
        ) : null}

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
        <p className="title">DESCRIPCIÓN</p>
        <span style={{ whiteSpace: 'pre-line' }}>{workout.workoutDescription}</span>
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
          <IconButton
            className="icon-button"
            title="Agregar mis tiempos"
            onClick={() =>
              setAddTime({
                showModal: true,
                workoutWeek,
                item,
                workout,
                selectedGroup,
                update: false,
              })
            }
          >
            <TimerIcon />
          </IconButton>
        </Card.Footer>
      ) : null}
      {showIcon === 'timeUpdate' ? (
        <Card.Footer>
          <IconButton
            className="icon-button"
            title="Modificar mis tiempos"
            onClick={() =>
              setAddTime({
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
        </Card.Footer>
      ) : null}
      {showIcon === 'timeDelete' ? (
        <Card.Footer>
          <IconButton
            className="icon-button"
            title="Eliminar mis tiempos"
            onClick={() =>
              setAddTime({
                showModal: true,
                workoutWeek,
                item,
                workout,
                selectedGroup,
                update: false,
              })
            }
          >
            <DeleteForeverIcon />
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
  )
}
