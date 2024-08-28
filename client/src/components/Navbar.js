import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar 
      bg={scrolled ? 'primary' : 'dark'} 
      variant={scrolled ? 'dark' : 'dark'} 
      expand="lg" 
      sticky="top" 
      className={`transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}
    >

      <Container>
        <Navbar.Brand as={Link} to="/" className="text-white">
          Z-GROUP
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="responsive-navbar-nav" 
          onClick={toggleMenu}
          className="text-white"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav" className={`${isOpen ? 'show' : ''}`}>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className="flip-container ml-4">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    Home
                  </div>
                  <div className="flip-card-back">
                    Home
                  </div>
                </div>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="flip-container ml-4">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    About
                  </div>
                  <div className="flip-card-back">
                    About
                  </div>
                </div>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/companies" className="flip-container ml-4">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    Companies
                  </div>
                  <div className="flip-card-back">
                    Companies
                  </div>
                </div>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/promotions" className="flip-container ml-4">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    Promotions
                  </div>
                  <div className="flip-card-back">
                    Promotions
                  </div>
                </div>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="flip-container ml-4">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    Contact
                  </div>
                  <div className="flip-card-back">
                    Contact
                  </div>
                </div>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="flip-container ml-4">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    Login
                  </div>
                  <div className="flip-card-back">
                    Login
                  </div>
                </div>
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
