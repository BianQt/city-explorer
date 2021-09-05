import React from "react";
import {Navbar, Container} from 'react-bootstrap';


class Header extends React.Component {
  render() {
    return (
      <header>
        <Navbar className= "header shadow-sm p-3 mb-5 bg-white rounded" >
          <Container>
            <Navbar.Brand className="mr-lg-5" href="#home">
             <h1>City Explorer</h1> 
            </Navbar.Brand>
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default Header;
