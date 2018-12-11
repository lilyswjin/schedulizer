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
          {/* <div className="logo"><NavLink to="/"><i className=" fas fa-pen-nib"></i>Schedulizer</NavLink></div> */}
          <div className="sidebar__links">
              <NavLink activeStyle={style} to="/dashboard"><i className="fas fa-tachometer-alt"></i> <span>Dashboard</span></NavLink>
              <NavLink activeStyle={style} to="/projects"><i className="fas fa-file-alt"></i> <span>Projects</span></NavLink>
              <NavLink activeStyle={style} to="/clients"><i className="fas fa-building"></i>  <span>Clients</span></NavLink>
              <NavLink activeStyle={style} to="/employees"><span><i className="fas fa-male"></i><i className="fas fa-male"></i></span>  <span>Employees</span></NavLink>
              {/* <NavLink activeStyle={style} to="/schedule"><i className="fas fa-male"></i>  Schedule</NavLink> */}
         </div>
      </aside>
    )
  }
}
