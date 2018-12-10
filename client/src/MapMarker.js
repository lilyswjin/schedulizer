import React, { Component } from 'react'

export default class MapMarker extends Component {
  render() {
    return (
      <div className="map__maker" >
        <div className="tooltip">
            <div>Name:{this.props.name}</div>
            <div>Distance:{this.props.distance} km</div>
            <div>Role: Web Developer </div>
        </div>
            <i className="fas fa-male" title={"Lily"} ></i>
      </div>
    )
  }
}
