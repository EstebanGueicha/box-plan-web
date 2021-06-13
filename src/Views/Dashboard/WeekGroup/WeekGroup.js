import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Dropdown, Row } from 'react-bootstrap'
import { shallowEqual, useSelector } from 'react-redux'
import worksService from '../../../Service/works'
import { CalendarByWeek } from '../CalendarByWeek'
import { DayCard } from '../DayCard'
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import './WeekGroup.scss'
import { IconButton } from '@material-ui/core'

export const WeekGroup = (props) => {
  const {
    setAddWorkout,
    selectedGroup,
    groups,
    setSelectedGroup,
    isAdmin,
    setShowComponent,
    fetchingWorkout,
    setDeleteWorkout,
    setweigthCalculate,
  } = props
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [viewStyle, setViewStyle] = useState(false)
  const [workoutWeek, setWorkoutWeek] = useState([])
  const [selectedDay, setSelectedDay] = useState(0)
  const { days } = useSelector((state) => state, shallowEqual) || []

  useEffect(() => {
    const getWeekWorkouts = async () => {
      try {
        const workout = await worksService.getDaysForWeek({
          startDate,
          endDate,
          groupID: selectedGroup.id,
        })
        setWorkoutWeek(workout)
      } catch (err) {
        console.log()
      }
    }
    if (startDate && endDate) {
      getWeekWorkouts()
    }
  }, [startDate, endDate, fetchingWorkout, selectedGroup])

  return (
    <Container className="week-group-container">
      <div className="grops-container">
        <div className="group-view">
          <Dropdown className="group">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Grupo: {selectedGroup ? selectedGroup.name : null}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {groups && groups.length && selectedGroup
                ? groups.map((item, index) => (
                    <Dropdown.Item
                      key={index}
                      active={item.id === selectedGroup.id}
                      onClick={() => setSelectedGroup(item)}
                    >
                      {item.name}
                    </Dropdown.Item>
                  ))
                : null}
            </Dropdown.Menu>
          </Dropdown>
          <IconButton
            className="icon-button"
            title="Cambiar vista"
            color="secondary"
            onClick={() => setViewStyle((prev) => !prev)}
          >
            {viewStyle ? <ViewModuleIcon /> : <ViewCarouselIcon />}
          </IconButton>
        </div>
        {isAdmin ? (
          <Button variant="secondary" onClick={setShowComponent}>
            Administrar Grupo
          </Button>
        ) : null}
      </div>
      <Row>
        <Col md={4}>
          <Card className="calendar-card">
            <CalendarByWeek setStartDate={setStartDate} setEndDate={setEndDate} />
          </Card>
          {viewStyle ? (
            <div className="scroll-container">
              {Object.keys(days).length
                ? Object.values(days).map((item, index) =>
                    selectedDay !== index ? (
                      <Card
                        key={index}
                        className="card-only-day"
                        onClick={() => setSelectedDay(index)}
                      >
                        <Card.Title>
                          <p className="day-title">
                            {' '}
                            {item.description} {item.numberDay}
                          </p>
                        </Card.Title>
                      </Card>
                    ) : null,
                  )
                : null}
            </div>
          ) : null}
        </Col>
        {viewStyle ? (
          <Col md={8}>
            <DayCard
              item={days[selectedDay]}
              setAddWorkout={setAddWorkout}
              setDeleteWorkout={setDeleteWorkout}
              setweigthCalculate={setweigthCalculate}
              workoutWeek={workoutWeek}
              startDate={startDate}
              isAdmin={isAdmin}
              viewStyle={viewStyle}
              selectedGroup={selectedGroup}
              setViewStyle={setViewStyle}
            />
          </Col>
        ) : Object.keys(days).length ? (
          Object.values(days).map((item, index) => (
            <Col md={4} key={index}>
              <DayCard
                item={item}
                setAddWorkout={setAddWorkout}
                setDeleteWorkout={setDeleteWorkout}
                setweigthCalculate={setweigthCalculate}
                workoutWeek={workoutWeek}
                startDate={startDate}
                isAdmin={isAdmin}
                viewStyle={viewStyle}
                selectedGroup={selectedGroup}
                setViewStyle={setViewStyle}
              />
            </Col>
          ))
        ) : null}
      </Row>
    </Container>
  )
}
