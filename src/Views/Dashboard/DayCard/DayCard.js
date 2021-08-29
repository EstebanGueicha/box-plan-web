import React, { useEffect, useState } from 'react'
import { Card, Col, Dropdown, Row } from 'react-bootstrap'
import { WodTypes } from '../../../Utils/Constants'
import EditIcon from '@material-ui/icons/Edit'
import './DayCard.scss'
import { Icon } from '@material-ui/core'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { SmallCardWorkout } from '../../../Components/SmallCardWorkout'
import { BigCardWorkout } from '../../../Components/BigCardWorkout'
import worksService from '../../../Service/works'

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
    setAddTime,
  } = props

  const [workouts, setWorkouts] = useState([])
  const [showIcon, setShowIcon] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setWorkouts(null)
    if (workoutWeek && workoutWeek.length) {
      const result = workoutWeek.find(
        (w) => new Date(w.date).toUTCString() === new Date(item.dateDay).toUTCString(),
      )
      if (result) {
        const sortWorkout = result.workouts.sort((a, b) => a.index - b.index)
        setWorkouts(sortWorkout)
      }
    }
  }, [workoutWeek, item, startDate])

  const SortableItemBig = SortableElement(({ workout, index }) => (
    <Col md={6} key={index} style={showIcon === 'move' ? { cursor: 'move' } : {}}>
      <BigCardWorkout
        workout={workout}
        WodTypes={WodTypes}
        showIcon={showIcon}
        setAddWorkout={setAddWorkout}
        workoutWeek={workoutWeek}
        item={item}
        selectedGroup={selectedGroup}
        setDeleteWorkout={setDeleteWorkout}
        setweigthCalculate={setweigthCalculate}
        setAddTime={setAddTime}
      />
    </Col>
  ))

  const SortableItemSmall = SortableElement(({ workout, index }) => (
    <li className="sortable-list-small" style={showIcon === 'move' ? { cursor: 'move' } : {}}>
      <SmallCardWorkout
        workout={workout}
        WodTypes={WodTypes}
        showIcon={showIcon}
        setAddWorkout={setAddWorkout}
        workoutWeek={workoutWeek}
        item={item}
        selectedGroup={selectedGroup}
        setDeleteWorkout={setDeleteWorkout}
        setweigthCalculate={setweigthCalculate}
        setViewStyle={setViewStyle}
        setAddTime={setAddTime}
      />
    </li>
  ))

  const SortableListBig = SortableContainer(({ dayWorkouts }) => {
    return (
      <Row>
        {dayWorkouts.map((workout, index) => (
          <SortableItemBig
            key={index}
            workout={workout}
            index={index}
            disabled={showIcon !== 'move' || loading}
          />
        ))}
      </Row>
    )
  })

  const SortableListSmall = SortableContainer(({ dayWorkouts }) => {
    return (
      <ul className="sortable-list-small">
        {dayWorkouts.map((value, index) => (
          <SortableItemSmall
            key={`item-${index}`}
            index={index}
            workout={value}
            disabled={showIcon !== 'move' || loading}
          />
        ))}
      </ul>
    )
  })
  useEffect(() => {
    const modificateIndexWorkout = async () => {
      try {
        setLoading(true)
        const changeId = workouts.map((item) => {
          return { workoutID: item._id, index: item.index }
        })
        await worksService.postSwitchWorkoutsIndex({ workouts: changeId })
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    if (showIcon === 'move') {
      modificateIndexWorkout()
    }
  }, [workouts])

  const sortWorkout = ({ oldIndex, newIndex }) => {
    const sortArray = arrayMove(workouts, oldIndex, newIndex)
    const switchIndex = sortArray.map((item, index) => {
      item.index = index
      return item
    })
    setWorkouts(switchIndex)
  }
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
                {showIcon === 'move' ? (
                  <Dropdown.Item onClick={() => setShowIcon('')}>Cancelar</Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={() => setShowIcon('move')}>
                    Cambiar posiciones
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
                {showIcon === 'timeUpdate' ? (
                  <Dropdown.Item onClick={() => setShowIcon('')}>Cancelar</Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={() => setShowIcon('timeUpdate')}>
                    Modificar mis tiempos
                  </Dropdown.Item>
                )}
                {showIcon === 'timeDelete' ? (
                  <Dropdown.Item onClick={() => setShowIcon('')}>Cancelar</Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={() => setShowIcon('timeDelete')}>
                    Eliminar mis tiempos
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
        {workouts && WodTypes && workouts.length ? (
          viewStyle ? (
            <SortableListBig dayWorkouts={workouts} onSortEnd={sortWorkout} axis="xy" />
          ) : (
            <SortableListSmall dayWorkouts={workouts} lockAxis="y" onSortEnd={sortWorkout} />
          )
        ) : (
          <p>No ha cargado rutinas todavia</p>
        )}
      </Card.Body>
    </Card>
  )
}
