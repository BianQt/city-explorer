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
import Movies from "./Movies";

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
      weatherData: [],
      moviesData: [],
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
   
    const moviesUrl = `${process.env.REACT_APP_LOCAL_SERVER_API}/movies?q=${this.state.cityName}`;

    try {
      axios.get(url).then((locationData) => {
        const imgUrl = `https://maps.locationiq.com/v3/staticmap?key=${apiKey}&center=${locationData.data[0].lat},${locationData.data[0].lon}&zoom=14&size=450x300&markers=icon:large-red-cutout|${locationData.data[0].lat},${locationData.data[0].lon}`;
        this.setState({
          lat: locationData.data[0].lat,
          lon: locationData.data[0].lon,
          imgUrl: imgUrl,
          displayName: locationData.data[0].display_name,
        });
        const weatherUrl = `${process.env.REACT_APP_LOCAL_SERVER_API}/weather?lat=${locationData.data[0].lat}&lon=${locationData.data[0].lon}`;
        axios.get(weatherUrl).then((weatherData) => {
          this.setState({
            weatherData: weatherData.data,
          });
        });
      });

      axios.get(moviesUrl).then((moviesData) => {
        this.setState({
          moviesData: moviesData.data,
        });
      });

      this.setState({
        show: true,
        errShow: false,
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
                <div>
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
                </div>
              )}
            </Col>
            {this.state.show && (
              <Col md="6" style={{ visibility: this.state.show }}>
                <Weather weatherData={this.state.weatherData} />
              </Col>
            )}
          </Row>
          {this.state.show && <Movies moviesList={this.state.moviesData} />}
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
