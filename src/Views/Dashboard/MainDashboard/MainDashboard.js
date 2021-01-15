import React from 'react'
import { useParams } from 'react-router-dom'
import './MainDashboard.scss'

export const MainDashboard = () => {
  const { id } = useParams()
  return (
    <div>
      <p>{id}</p>
    </div>
  )
}
