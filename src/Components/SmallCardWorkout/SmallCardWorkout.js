import React from 'react'
import { Accordion, Button, Card } from 'react-bootstrap'
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import TimerIcon from '@material-ui/icons/Timer'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import { ArrowChange } from '../ArrowChange'
import { Alphabet } from '../../Utils/Constants'

export const SmallCardWorkout = ({
  workout,
  WodTypes,
  showIcon,
  setAddWorkout,
  workoutWeek,
  item,
  selectedGroup,
  setDeleteWorkout,
  setweigthCalculate,
  setViewStyle,
  setAddTime,
  indexItem,
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
    <div className="workout-container">
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <p className="category">
              {getWord(workout.index)}.{' '}
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
              ) : null}
              {showIcon === 'timeUpdate' ? (
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
              ) : null}
              {showIcon === 'timeDelete' ? (
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
              <span style={{ whiteSpace: 'pre-line' }}>{workout.workoutDescription}</span>
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
  )
}
