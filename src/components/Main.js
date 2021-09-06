import React from "react";
import axios from "axios";
import {
  Form,
  Button,
  Row,
  Container,
  Col,
  Table,
  Alert,
} from "react-bootstrap";
import Weather from "./Weather";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      countryName: "",
      lat: "",
      lon: "",
      imgUrl: "",
      displayName: "",
      show: false,
      errShow: false,
      weatherData: {},
    };
  }
  onChange = (e) => {
    this.setState({
      cityName: e.target.value,
    });
  };

  submission = async (e) => {
    e.preventDefault();
    const apiKey = process.env.REACT_APP_LOCATION_API_KEY;
    const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&city=${this.state.cityName}&format=json`;
    const weatherUrl = `${process.env.REACT_APP_LOCAL_SERVER_API}/weather?q=${this.state.cityName}`;
    try {
      const locationData = await axios.get(url);
      const weatherData = await axios.get(weatherUrl);
      const imgUrl = `https://maps.locationiq.com/v3/staticmap?key=${apiKey}&center=${locationData.data[0].lat},${locationData.data[0].lon}&zoom=14&size=450x300&markers=icon:large-red-cutout|${locationData.data[0].lat},${locationData.data[0].lon}`;
      console.log(weatherData.data.data[0].weather.description);
      this.setState({
        lat: locationData.data[0].lat,
        lon: locationData.data[0].lon,
        imgUrl: imgUrl,
        displayName: locationData.data[0].display_name,
        show: true,
        errShow: false,
        weatherData: weatherData.data,
      });
    } catch (e) {
      console.log("Something went wrong.");
      this.setState({
        show: false,
        errShow: true,
      });
    }
  };

  render() {
    return (
      <main>
        <Container>
          <Row className="row-grid align-items">
            <Col md="6">
              <Form className="form" onSubmit={this.submission}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <h3>Find Your Next Destination!</h3>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter City Name"
                    onChange={this.onChange}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Button className="button" variant="danger" type="submit">
                  Find
                </Button>
              </Form>
              {this.state.show && (
                <Weather
                  weatherData={this.state.weatherData}
                  days={this.state.days}
                  weatherCond={this.state.weatherCond}
                />
              )}
            </Col>
            {this.state.show && (
              <Col md="6" style={{ visibility: this.state.show }}>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <td>City</td>
                      <td>{this.state.displayName}</td>
                    </tr>
                    <tr>
                      <td>Latitude</td>
                      <td>{this.state.lat}</td>
                    </tr>
                    <tr>
                      <td>Longtitude</td>
                      <td>{this.state.lon}</td>
                    </tr>
                  </tbody>
                </Table>
                <img className="map" src={this.state.imgUrl} />
              </Col>
            )}
          </Row>
          {this.state.errShow && (
            <Alert
              className="alert"
              style={{ visibility: this.state.errShow }}
              variant="danger"
            >
              <Alert.Heading>Oh snap! There is Nothing Found!</Alert.Heading>
              <p>
                Please try again. Check the spelling & your internet connection.
              </p>
            </Alert>
          )}
        </Container>
      </main>
    );
  }
}

export default Main;
