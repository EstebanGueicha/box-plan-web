import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
import './Banner.scss'

export const Banner = () => {
  const history = useHistory()
  return (
    <Container className="banner-container">
      <Container className="box-title">
        <Row>
          <Col lg={6}>
            <div className="principal-text-container">
              <h1 className="principal-title">Descubrí una nueva forma de entrenar.</h1>
              <p className="principal-text">
                Mantene a tu equipo actualizado con la planificación de la semana, permitiendo
                utilizar todas las aplicaciones en un solo lugar. Planificá tu entrenamiento con
                nosotros.
              </p>
              <Button className="cta" variant="secondary" onClick={() => history.push('/ingresar')}>
                Quiero ser parte
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
