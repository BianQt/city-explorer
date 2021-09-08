import React from "react";
import react from "react";
import { Card, ListGroup, Row, Col } from "react-bootstrap";

class Weather extends React.Component {
  render() {
    console.log(this.props);

    return (
      <Row
        xs={1}
        md={4}
        className="g-4"
        style={{ width: "550px", marginLeft: "30px" }}
      >
        {this.props.weatherData.map((element, idx) => (
          <Col>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ padding: "0" }}>
                <p style={{ fontWeight: "bold", color: "grey" }}>
                  {element.date}
                </p>
                Max: {element.max} C° <br />
                Min: {element.min} C°
                <br />
                <span style={{ color: "blue" }}>
                  {element.desc}
                </span>
                <img
                  src={`https://www.weatherbit.io/static/img/icons/${element.icon}.png`}
                  style={{ width: "50px", marginLeft: "20px" }}
                />
              </ListGroup.Item>
            </ListGroup>
          </Col>
        ))}
      </Row>
    );
  }
}

export default Weather;
