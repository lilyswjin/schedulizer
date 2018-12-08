import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class Navbar extends Component {
  render() {

    // let style = {
    //     color: "rgb(255, 208, 0)",
    //     backgroundColor: "rgb(58, 64, 77)"
    // }

    return (
      <nav className="navbar">
        <div className="logo"><NavLink to="/"><i className=" fas fa-pen-nib"></i>Schedulizer</NavLink></div>
        <div className="navbar__links">
            {/* <NavLink activeStyle={style} to="/clients">Clients</NavLink>
            <NavLink activeStyle={style} to="/projects">Projects</NavLink>
            <NavLink activeStyle={style} to="/employees">Employees</NavLink> */}
            {/* <NavLink to="/"><i className="fas fa-user-circle"></i> Profile</NavLink>
            <NavLink to="/"><i className="fas fa-bars"></i> Options</NavLink>
            <NavLink to="/"><i className="fas fa-power-off"></i> Log Out</NavLink> */}
        </div>
      </nav>
    )
  }
}
