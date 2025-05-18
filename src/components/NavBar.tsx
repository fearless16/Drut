import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

export const NavBar: React.FC = () => {
  return (
    <Navbar bg="light" expand="sm" className="mb-3 border-bottom">
      <Container>
        <Navbar.Brand href="#">DRUT</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/request">
            Request
          </Nav.Link>
          <Nav.Link as={NavLink} to="/history">
            History
          </Nav.Link>
          <Nav.Item as={NavLink} to="/history">
            <ThemeToggle />
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  )
}
