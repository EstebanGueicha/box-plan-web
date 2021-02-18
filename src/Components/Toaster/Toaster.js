import React from 'react'
import './Toaster.scss'
import { Toast } from 'react-bootstrap'

export const Toaster = (props) => {
  const { setShow, show } = props
  return (
    <Toast onClose={() => setShow(prev => !prev)} show={show} delay={3000} autohide>
      <Toast.Header>
        <strong className='mr-auto'>BoxPlan</strong>
      </Toast.Header>
      <Toast.Body>¡Tu mensaje fué enviado con éxito!</Toast.Body>
    </Toast>
  )
}
