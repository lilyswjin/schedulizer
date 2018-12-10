import React, { Component } from 'react'

export default class MapMarker extends Component {
  render() {
    let icon = () => {
        let result;
        if (this.props.type === "client") {
            result = <i style={{color: "rgb(85, 174, 247)"}} className="fas fa-building" ></i>
        } else if (this.props.type === "employee") {
            result = <i className="fas fa-male" ></i>
        }
        return result;
    }

    let hoverStyle = {
        display: "flex",
        flexDirection: "column",
        width: "15rem",
        backgroundColor: "rgb(58, 64, 77)",
        color: "white",
        padding: "1rem"
    }

    let normalStyle = {
        display: "none"
    }


    const style = this.props.$hover ? hoverStyle : normalStyle;


    return (
      <div className="map__maker"  >
       {icon()}
        <div style={style}  className="tooltiptext">
            <div>
                Name: {this.props.text}
            </div>
            <div>
                Distance: {parseFloat(Math.round(this.props.distance * 100) / 100).toFixed(2)} km
            </div>
        </div>
       
    </div>
    )
  }
}
