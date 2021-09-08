import React, { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";

class Movies extends React.Component {
  render() {
    console.log(this.props.moviesList);
    return <div className="movies">
      <h2>Movies List!</h2>
      <Row xs={1} md={6} className="g-4">
        {this.props.moviesList.map((element, idx) => (
          <Col>
            <Card>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500${element.img}`}
              />
              <Card.Body>
                <Card.Title>{element.tit}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>;
  }
}

export default Movies;
