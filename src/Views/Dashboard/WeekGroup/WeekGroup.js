import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Dropdown, Row } from 'react-bootstrap'
import { shallowEqual, useSelector } from 'react-redux'
import worksService from '../../../Service/works'
import { CalendarByWeek } from '../CalendarByWeek'
import { DayCard } from '../DayCard'
import './WeekGroup.scss'

export const WeekGroup = (props) => {
  const { setAddWorkout, fetching, selectedGroup, groups, setSelectedGroup, isAdmin, setShowComponent } = props
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [workoutWeek, setWorkoutWeek] = useState([])
  const { days } = useSelector((state) => state, shallowEqual) || []

  useEffect(() => {
    const getWeekWorkouts = async () => {
      try {
        const workout = await worksService.getDaysForWeek({ startDate, endDate })
        setWorkoutWeek(workout)
      } catch (err) {
        console.log()
      }
    }
    if (startDate && endDate) {
      getWeekWorkouts()
    }
  }, [startDate, endDate, fetching])

  return (
    <Container className='week-group-container'>
      <div className='grops-container'>
        <Dropdown className='group'>
          <Dropdown.Toggle variant='primary' id='dropdown-basic'>
            Grupo: {selectedGroup ? selectedGroup.name : null}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {groups && groups.length && selectedGroup ? (
              groups.map((item, index) => (
                <Dropdown.Item key={index} active={item.id === selectedGroup.id} onClick={() => setSelectedGroup(item)}>{item.name}</Dropdown.Item>
              ))) : null}

          </Dropdown.Menu>
        </Dropdown>
        {isAdmin
          ? (
            <Button onClick={setShowComponent}>Administrar Grupo</Button>
          ) : null}
      </div>
      <Row>
        <Col md={4}>
          <Card className='calendar-card'>
            <CalendarByWeek setStartDate={setStartDate} setEndDate={setEndDate} />
          </Card>
        </Col>
        {Object.keys(days).length ? (
          Object.values(days).map((item, index) =>
            <Col md={4} key={index}>
              <DayCard item={item} setAddWorkout={setAddWorkout} workoutWeek={workoutWeek} startDate={startDate} isAdmin={isAdmin} />
            </Col>
          )) : null}
      </Row>
    </Container>

  )
}
