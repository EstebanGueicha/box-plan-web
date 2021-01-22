import React from 'react'
import './Main.scss'
import { Card, Col, Container, Row } from 'react-bootstrap'
import iconTimer from '../../../Images/home/main/icons/iconTimer.svg'
import iconCalculator from '../../../Images/home/main/icons/iconCalculator.svg'
import iconTimeList from '../../../Images/home/main/icons/iconTimeList.svg'
import teamImage from '../../../Images/home/main/christian.jpg'
import athleteImage from '../../../Images/home/main/avatar.jpg'
import coachImage from '../../../Images/home/main/coach.jpg'
import { EmailForm } from '../EmailForm'

export const Main = () => {
  return (
    <Container bsPrefix='main-container'>
      <Card>
        <Row>
          <Col lg={12}>
            <div className='main-div'>
              <h2>Conocé Box Plan</h2>
              <p>Tus atletas podrán usar la APP para ver las planificaciones y no depender de otras Aplicaciones. El coach dispone de la WEB para que sea más sencillo gestionar los equipos y también esta la posibilidad de utilizar la APP con funciones similares. Conoce algunos beneficios.</p>
            </div>
          </Col>
          <Col lg={4}>
            <div className='main-div'>
              <img src={iconTimer} alt='ícono reloj' className='icon' />
              <h3>Timers</h3>
              <p>Los atletas podrán utilizar timers específicos para cada rutina.</p>
            </div>
          </Col>
          <Col lg={4}>
            <div className='main-div'>
              <img src={iconCalculator} alt='ícono calculadora' className='icon' />
              <h3>Weightlifting Calculator</h3>
              <p>Para cada sesión de Weightlifting se puede calcular el peso que el atleta desee en ese momento.</p>
            </div>
          </Col>
          <Col lg={4}>
            <div className='main-div'>
              <img src={iconTimeList} alt='ícono lista' className='icon' />
              <h3>List</h3>
              <p>El grupo podrá subir los tiempos de las rutinas para observar como les fue en el día con respecto a sus compañeros.</p>
            </div>
          </Col>
          <Col lg={12}>
            <div className='main-div'>
              <h2>El equipo</h2>
            </div>
          </Col>
          <Col lg={4}>
            <div className='main-div'>
              <img src={coachImage} alt='Imagen Coach' className='team-image' />
              <h3>Coachs</h3>
              <p>El coach va a poder crear distintos grupos y enviar distintias planificaciones para cada team.</p>
            </div>
          </Col>
          <Col lg={4}>
            <div className='main-div'>
              <img src={athleteImage} alt='Imagen Atleta' className='team-image' />
              <h3>Atletas</h3>
              <p>Los atletas puede pertenecer a distintos teams, ya sea para su box, o weigthlifting, natación, running, etc.</p>
            </div>
          </Col>
          <Col lg={4}>
            <div className='main-div'>
              <img src={teamImage} alt='Imagen Team' className='team-image' />
              <h3>Developers</h3>
              <p>Contanos si tenés alguna mejora o problema para poder ayudar y progresar juntos.</p>
            </div>
          </Col>
          <Col lg={12}>
            <div className='main-div'>
              <h2 className='title'>Dejanos algún comentario</h2>
              <p>Contanos que te parece Box Plan. Si tenés alguna sugerencia o crítica será bien recibida. Estamos trabajando para poder darte más beneficios cada día.</p>
              <EmailForm />
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}
