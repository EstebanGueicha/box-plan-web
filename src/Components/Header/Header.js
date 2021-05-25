import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import './Header.scss'

export const Header = () => {
  const history = useHistory()
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark" fixed="top">
        <Container className="header-container">
          <Navbar.Brand href="#home">BoxPlan</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Button variant="link" onClick={() => history.push('/ingresar')}>
                Ingresar
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
