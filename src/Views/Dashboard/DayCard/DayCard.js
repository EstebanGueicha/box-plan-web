import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card, Dropdown } from 'react-bootstrap'
import { ArrowChange } from '../../../Components/ArrowChange'
import { WodTypes } from '../../../Utils/Constants'
import EditIcon from '@material-ui/icons/Edit'
import './DayCard.scss'
import { Icon } from '@material-ui/core'

export const DayCard = (props) => {
  const { item, setAddWorkout, workoutWeek, startDate, isAdmin } = props
  const [dayWorkouts, setDayWorkouts] = useState(null)
  const [edit, setEdit] = useState(false)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    setDayWorkouts(null)
    if (workoutWeek && workoutWeek.length) {
      const result = workoutWeek.find(w => new Date(w.date).toUTCString() === new Date(item.dateDay).toUTCString())
      if (result) {
        setDayWorkouts(result)
      }
    }
  }, [workoutWeek, item, startDate])

  return (
    <Card className='day-card'>
      <Card.Title>
        <p className='day-title'> {item.description} {item.numberDay}</p>
        <Dropdown className='day-edit'>
          <Dropdown.Toggle variant='primary' id='dropdown-basic'>
            <Icon>
              <EditIcon />
            </Icon>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {isAdmin ? (
              <>
                <Dropdown.Item onClick={() => setAddWorkout({ showModal: true, workoutWeek, item })}>Agregar rutina</Dropdown.Item>
                <Dropdown.Item onClick={() => setEdit(prev => !prev)}>Modificar rutinas</Dropdown.Item>
                <Dropdown.Item onClick={() => setDeleted(prev => !prev)}>Eliminar rutinas</Dropdown.Item>
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
        {dayWorkouts && WodTypes && dayWorkouts.workouts.length ? (
          dayWorkouts.workouts.map((item, index) =>
            <div key={index}>
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey='0'>
                    <p className='category'> {WodTypes.find(w => w.id === item.wodType).description}</p>
                    <div className='arrow-time-container'>
                      <p className='time'> {item.workoutTime}'</p>
                      {edit ? <Button>Editar</Button> : null}
                      {deleted ? <Button>Eliminar</Button> : null}
                      <ArrowChange eventKey='0' />
                    </div>

                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey='0'>
                    <Card.Body>{item.workoutDescription}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          )
        ) : <p>No ha cargado rutinas todavia</p>}
      </Card.Body>
    </Card>
  )
}
