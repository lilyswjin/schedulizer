import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment';
import {Doughnut, HorizontalBar} from 'react-chartjs-2';

export default class Dashboard extends Component {
  render() {

    let unassignedProjects = (employees) => {
      let count = 0
      for (let key in employees) {
        if (employees.hasOwnProperty(key)) {
          if (employees[key].length !== 0) {
            count ++
          }
        }
      }
      return count;
    }

 
    let employeeUtilization = () => {
      let data = {}
      let labels = this.props.employeeList.map((employee)=>{return (employee.first_name)});

      let datasets = [
        {
          label: "Projects Assigned",
          backgroundColor: this.props.employeeList.map((employee, i) => "rgb(38, 42, 51)" ),
          data: this.props.employeeList.map((employees)=>{
            let count = 0;
            for (let key in this.props.assignedEmployees) {
              if (this.props.assignedEmployees.hasOwnProperty(key)) {
                for (let i = 0; i < this.props.assignedEmployees[key].length; i++) {
                    if (this.props.assignedEmployees[key][i].id === employees.id) {
                      count ++
                    }
                }
              }
            }
            return count;
          })
        }
      ]

      data.labels = labels;
      data.datasets = datasets;
      return data;
    }

    let projectsNotStarted = () => {
      let data = {};
      let labels = [
        "Started",
        "Not Started"
      ];

      let totalProj = this.props.projectList.length;
      let unassigned =  unassignedProjects(this.props.assignedEmployees);
      let assigned = totalProj - unassigned;

      let datasets = [
        {
          label: "Projects Assigned",
          backgroundColor: [
            "rgb(58, 64, 77)", "rgb(168, 190, 211)"
          ],
          data: [
            assigned, unassigned
          ]
        }
      ]

      data.labels = labels;
      data.datasets = datasets;

      return data;
    }
  
    return (
      <div className="dashboard"> 
        <div className="dashboard__top">
          <h1>DASHBOARD</h1>
          <h3>Welcome back, Mr. Fury!</h3>
        </div>
        <div className="bubble">
          <Link to="/clients"><div className="bubble__client">{this.props.clientList.length} <i className="fas fa-building"></i></div></Link>
          <Link to="/projects"><div className="bubble__project">{this.props.projectList.length} <i className="fas fa-file-alt"></i></div></Link>
          <Link to="/schedule"><div className="bubble__project">{this.props.projectList.length} <i className="fas fa-calendar-alt"></i></div></Link>
          <Link to="/employees"><div className="bubble__employee">{this.props.employeeList.length} <i className="fas fa-male"></i><i className="fas fa-male"></i></div></Link>
        </div>
        <div className="dashboard__overview">
          <h2>Overview</h2>
          <div>You have not assigned any employees to {unassignedProjects(this.props.assignedEmployees)} projects.</div>
          
          <div>

          </div>
        </div>
      
        <div className="dashboard__row" >
          <div className="dashboard__deadlines">
            <h2>Upcoming Due Dates</h2>
            <div className="dashboard__deadlines--projects">
              {this.props.projectList.sort((a, b)=> {return a.end_date - b.end_date }).map(project => {
                return (
                  <div className="dashboard__deadlines--projects--card" key={project.id}>
                    <div>{moment(project.end_date).format("MM/DD/YYYY")}</div>
                    <div>{project.name} </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="dashboard__charts">
            <div className="donut" >
             <h2>Ongoing Projects</h2>
                <Doughnut 
                  data={projectsNotStarted()}
                  width={50}
                  height={50}  
                />
            </div>
          </div>
          <div className="dashboard__charts">
            <div className="donut">
              <h2>Utilization Rates</h2>
                <HorizontalBar 
                  data={employeeUtilization()}
                  width={50}
                  height={50}  
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
