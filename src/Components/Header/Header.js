import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import './Header.scss'

export const Header = () => {
  return (
    <header>
      <Navbar collapseOnSelect expand='lg' bg='transparent' variant='dark' fixed='top'>
        <Container className='header-container'>
          <Navbar.Brand href='#home'>BoxPlan</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav>
              <Nav.Link href='#login'>Ingresar</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
