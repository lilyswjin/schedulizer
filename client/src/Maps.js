import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker';
// import {GoogleApiWrapper} from 'google-map-react';

// require('dotenv').config();

export default class Maps extends Component {
    
    static defaultProps = {
        center: {
            lat: 43.645543000,
            lng: -79.395385000
        },
        zoom: 11
    };
    
    
    render() {
    // console.log(process.env)
    const KEY = process.env.REACT_APP_MAP_API_KEY;

    let renderMapMarker = () => {
        return (
            this.props.employees.map((employee) => {
                return (
                    <MapMarker
                        lat={employee.lat}
                        lng={employee.long}
                        name={employee.first_name + " " + employee.last_name}
                        distance={employee.distance}
                        type="employee"
                        key={`emp${employee.id}`}
                        text={employee.first_name + " " + employee.last_name}
                        $hover={true}
                    />
                )
            })
            
        )
    }

    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: KEY}}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            >
          
            <MapMarker
                lat={this.props.coord.lat}
                lng={this.props.coord.long}
                type="client"
                text={this.props.coord.name}
                distance={0}
                $hover={true}
            />
            {renderMapMarker()}
        </GoogleMapReact>
    )
  }
}
