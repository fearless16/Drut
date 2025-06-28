import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { useTheme } from '@/context/ThemeContext'

export const NavBar: React.FC = () => {
  const location = useLocation()
  const { variant } = useTheme()

  if (location.pathname === '/') return null

  return (
    <Navbar
      bg={variant}
      variant={variant}
      expand="sm"
      className="mb-3 border-bottom px-3 shadow-sm"
      fixed="top"
    >
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="fw-bold fs-4 text-uppercase"
        >
          ⚡ DRUT
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-3">
          <Nav className="me-3">
            <Nav.Link as={NavLink} to="/request" className="px-3">
              Request
            </Nav.Link>
            <Nav.Link as={NavLink} to="/history" className="px-3">
              History
            </Nav.Link>
          </Nav>
          <ThemeToggle />
        </div>
      </Container>
    </Navbar>
  )
}
