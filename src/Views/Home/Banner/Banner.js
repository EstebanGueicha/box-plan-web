import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './Banner.scss'

export const Banner = () => {
  return (
    <Container className='banner-container'>
      <Container className='box-title'>
        <Row>
          <Col lg={6}>
            <div className='principal-text-container'>
              <h1 className='principal-title'>Descubrí una nueva forma de entrenar.</h1>
              <p className='principal-text'>Mantene a tu equipo actualizado con la planificación de la semana, permitiendo utilizar todas las aplicaciones en un solo lugar. Planificá tu entrenamiento con nosotros.</p>
              <Button className='cta' onClick={() => window.open('https://www.youtube.com/watch?v=h3pkeICnRlY&ab_channel=EspacioTecnol%C3%B3gicoRGA')}>Ver video</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
