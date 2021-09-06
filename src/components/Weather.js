import React from "react";
import react from "react";
import { Card, ListGroup } from 'react-bootstrap'


class Weather extends React.Component {

    render() {
        console.log(this.props);

        return <Card style={{ width: '31.5rem' }}>
            <Card.Body>
                <Card.Title>{this.props.weatherData.city_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{this.props.weatherData.timezone}</Card.Subtitle>
                <ListGroup variant="flush">
                    <ListGroup.Item><span style={{ fontWeight: 'bold' }}>Date : {this.props.weatherData.data[0].datetime}</span>
                        <br />
                        Max: {this.props.weatherData.data[0].high_temp}F, Min: {this.props.weatherData.data[0].low_temp}F
                        <br />
                        <span style={{ color:"blue" }}>{this.props.weatherData.data[0].weather.description}</span>
                    </ListGroup.Item>
                    <ListGroup.Item><span style={{ fontWeight: 'bold' }}>Date : {this.props.weatherData.data[1].datetime}</span>
                        <br />
                        Max: {this.props.weatherData.data[1].high_temp}F, Min: {this.props.weatherData.data[1].low_temp}F
                        <br />
                        <span style={{ color:"blue" }}>{this.props.weatherData.data[1].weather.description}</span>
                    </ListGroup.Item><ListGroup.Item><span style={{ fontWeight: 'bold' }}>Date : {this.props.weatherData.data[2].datetime}</span>
                        <br />
                        Max: {this.props.weatherData.data[2].high_temp}F, Min: {this.props.weatherData.data[2].low_temp}F
                        <br />
                        <span style={{ color:"blue" }}>{this.props.weatherData.data[2].weather.description}</span>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    }

}

export default Weather;