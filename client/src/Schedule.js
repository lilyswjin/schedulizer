import React, { Component } from 'react'

import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]

const items = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(1, 'hour')
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour')
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  }
]


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


  render() {

    return (
      <div>
        <Timeline
            groups={groups}
            items={items}
            defaultTimeStart={moment().add(-12, 'hour')}
            defaultTimeEnd={moment().add(12, 'hour')}
        />
      </div>
    )
  }
}
