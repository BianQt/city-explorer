import React from "react";
import { Card, Button } from "react-bootstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Card className="text-center">
          <Card.Footer className="text-muted footer">©{new Date().getFullYear()} City Explorer</Card.Footer>
        </Card>
      </footer>
    );
  }
}

export default Footer;
