import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { shallowEqual, useSelector } from 'react-redux'
import worksService from '../../../Service/works'
import { CalendarByWeek } from '../CalendarByWeek'
import { DayCard } from '../DayCard'
import './WeekGroup.scss'

export const WeekGroup = (props) => {
  const { setAddWorkout } = props
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [workoutWeek, setWorkoutWeek] = useState([])
  const days = useSelector((state) => state.days, shallowEqual) || ''

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
  }, [startDate, endDate])

  return (
    <div className='week-group-container'>
      <Container>
        <Row>
          <Col md={4}>
            <Card className='calendar-card'>
              <CalendarByWeek setStartDate={setStartDate} setEndDate={setEndDate} />
            </Card>
          </Col>
          {days.map((item, index) =>
            <Col md={4} key={index}>
              <DayCard item={item} setAddWorkout={setAddWorkout} workoutWeek={workoutWeek} />
            </Col>
          )}
        </Row>
      </Container>
    </div>
  )
}
