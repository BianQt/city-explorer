import React from "react";
import { Card, Button } from "react-bootstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer>
          <Card.Footer className="text-muted footer">©{new Date().getFullYear()} City Explorer</Card.Footer>
    
      </footer>
    );
  }
}

export default Footer;
