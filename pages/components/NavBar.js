import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Navbar.Brand href="/">Fantasy Football Social</Navbar.Brand>
      <Nav>
        <Nav.Link href="/createTeam">Add Fantasy Team</Nav.Link>
        <Nav.Link href="/viewFantasyTeams">View Fantasy Team</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
