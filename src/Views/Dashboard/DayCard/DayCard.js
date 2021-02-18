import React from 'react'
import { Card, Dropdown } from 'react-bootstrap'
import './DayCard.scss'

export const DayCard = (props) => {
  const { item, setAddWorkout, workoutWeek } = props
  return (
    <Card className='day-card'>
      <Card.Title>
        <Dropdown>
          <Dropdown.Toggle variant='primary' id='dropdown-basic'>
            {item.description} {item.numberDay}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setAddWorkout({ showModal: true, workoutWeek, item })}>Agregar rutina</Dropdown.Item>
            <Dropdown.Item>Modificar rutinas</Dropdown.Item>
            <Dropdown.Item>Eliminar rutinas</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Title>
      <Card.Body>
        <p>Warm up</p>
        <p>Early Conditioning</p>
        <p>Conditioning</p>
        <p>Running</p>
      </Card.Body>
    </Card>
  )
}
