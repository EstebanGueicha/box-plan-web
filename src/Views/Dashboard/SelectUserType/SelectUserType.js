import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import './SelectUserType.scss'

export const SelectUserType = () => {
  const history = useHistory()

  return (
    <div className='select-user-type'>
      <Button bsPrefix='buttonBase athlete' onClick={() => history.push('/dashboard/athlete')}>
        <p className='title'>
          Athlete
          <div className='mark' />
        </p>
      </Button>
      <Button bsPrefix='buttonBase coach' onClick={() => history.push('/dashboard/coach')}>
        <p className='title'>
          Coach
          <div className='mark' />
        </p>
      </Button>
    </div>
  )
}
