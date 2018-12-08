import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';

export default class Sidebar extends Component {

  render() {

    let style = {
      color: "rgb(255, 208, 0)",
      backgroundColor: "rgb(58, 64, 77)"
    }

    return (
      <aside className="sidebar">
          <div className="sidebar__links">
              <NavLink activeStyle={style} to="/projects"><i className="fas fa-file-alt"></i>  Projects</NavLink>
              <NavLink activeStyle={style} to="/clients"><i className="fas fa-building"></i>  Clients</NavLink>
              <NavLink activeStyle={style} to="/employees"><i className="fas fa-male"></i>  Employees</NavLink>
              <NavLink activeStyle={style} to="/schedule"><i className="fas fa-male"></i>  Schedule</NavLink>
         </div>
      </aside>
    )
  }
}
