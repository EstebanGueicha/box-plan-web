import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

export const WeigthCalculate = (props) => {
  const { weigthCalculate, setweigthCalculate } = props
  const [weight, setWeight] = useState(0)

  const handleChangeWeight = (event) => {
    setWeight(event.target.value)
  }
  return (
    <>
      <Modal
        show={weigthCalculate.showModal}
        onHide={() => setweigthCalculate((prev) => ({ ...prev, showModal: false }))}
        centered
      >
        <Modal.Header>
          <Modal.Title>Calcular peso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="weight-container">
              <Form.Group controlId="ProductCategory">
                <Form.Control
                  type="text"
                  placeholder="Peso en kilos"
                  name="weight"
                  value={weight}
                  onChange={handleChangeWeight}
                />
              </Form.Group>
              <Row>
                <Col md={3}>
                  <p>Sets</p>
                </Col>
                <Col md={3}>
                  <p>Reps</p>
                </Col>
                <Col md={3}>
                  <p>%</p>
                </Col>

                <Col md={3}>
                  <p>Kilos</p>
                </Col>
              </Row>
              {weigthCalculate.weightLiftingSession.map((item, index) => (
                <Row key={index}>
                  <Col md={3}>
                    <p>{item.sets}</p>
                  </Col>
                  <Col md={3}>
                    <p>{item.repetitions}</p>
                  </Col>
                  <Col md={3}>
                    <p>{item.percentaje}</p>
                  </Col>
                  <Col md={3}>
                    <p>{weight ? (weight * item.percentaje) / 100 : 0}</p>
                  </Col>
                </Row>
              ))}
            </div>

            <div className="button-container">
              <Button
                variant="outline-secondary"
                onClick={() => setweigthCalculate((prev) => ({ ...prev, showModal: false }))}
              >
                Cerrar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
