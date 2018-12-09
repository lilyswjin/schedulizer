import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
// import componentResizeDetector from 'react-calendar-timeline/lib/resize-detector'

export default class Schedule extends Component {
  state = {
      projectList: [],
      assignedEmployees: {},
      isOpen: false,
      currentProjectID: null
  }

  componentDidMount() {
      this.fetchProjects();
  }

  fetchProjects = () => {
      fetch("http://localhost:8080/projects")
      .then(res => res.json())
      .then(data => {
          this.setState({projectList: data})
          data.forEach((project, i) => {
              return this.fetchAssignedEmployees(project.id);
          })

      })  
  }

  fetchAssignedEmployees = (projectID) => {
    // retrieve list of assigned employees
    fetch(`http://localhost:8080/projects/${projectID}`)
    .then(res => res.json())
    .then(data => {
        let employeeArray = this.state.assignedEmployees;        
        employeeArray[projectID] = data
    
        this.setState({
            assignedEmployees: employeeArray
        })
    })  
  }

  groupRenderer = ({ group }) => {
    return (
      <div className="custom-group" key={group.id}>
        <span className="title">{group.title}</span>
        <p className="tip">{group.tip}</p>
      </div>
    )
  }

  render() {

    // const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]

    const groups = this.state.projectList ? this.state.projectList.map( project => {
      return (
        {
          id: project.id,
          title: project.name,
          tip: project.name
          
        }
      )
    }) : [{}];


    let items = [];
    let employees = this.state.assignedEmployees

   
    for (let key in employees) {
      if (employees.hasOwnProperty(key)) {
        if (employees[key].length > 0) {
          employees[key].forEach((employee) => {
            items.push({
              id: employee.id,
              group: key,
              title: employee.last_name + ", " + employee.first_name,
              start_time: moment(employee.start_date).startOf("day"),
              end_time: moment(employee.end_date).endOf("day"),
              canResize: true,
              canChangeGroup: true,
              className: "employee-time"
            })
          })
        }
      }
    }

    return (
      <div>
        <Timeline
            groups={groups}
            items={items}
            defaultTimeStart={moment().startOf("day").add(-3, 'day')}
            defaultTimeEnd={moment().endOf("day").add(3, 'day')}
            stackItems={true}
            timeSteps={{day:1}}
            sidebarContent={<div>Projects</div>}
            sidebarWidth={100}
            itemsSorted
            showCursorLine
            // resizeDetector={componentResizeDetector}
        />
        <Link to="/projects"><span>Table View</span></Link>
      </div>
    )
  }
}
