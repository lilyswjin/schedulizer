import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import uuid from 'uuid';

export default class Schedule extends Component {
  state = {
      isOpen: false,
      currentProjectID: null
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
    const groups = this.props.projectList ? this.props.projectList.map( project => {
      return (
        {
          id: project.id,
          title: project.name,
          tip: project.name
          
        }
      )
    }) : [{}];


    let items = [];
    let employees = this.props.assignedEmployees
    let keys = {
      groupIdKey: 'id',
      groupTitleKey: 'title',
      groupRightTitleKey: 'rightTitle',
      groupLabelKey: 'title', // key for what to show in `InfoLabel`
      itemIdKey: `id`,
      itemTitleKey: 'title',    // key for item div content
      itemDivTitleKey: 'title', // key for item div title (<div title="text"/>)
      itemGroupKey: 'group',
      itemTimeStartKey: 'start_time',
      itemTimeEndKey: 'end_time',
    }
   
    for (let key in employees) {
      if (employees.hasOwnProperty(key)) {
        if (employees[key].length > 0) {
          employees[key].forEach((employee) => {
            items.push({
              id: uuid() + employee.id,
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
      <div className="schedule">
        <Link to="/schedule"><div className="calendar"><i className="fas fa-calendar-alt"></i> Calendar</div></Link>
        <Link to="/projects"><div className="table"><i className="fas fa-list-alt"></i> List</div></Link>
        <Timeline
            groups={groups}
            keys={keys}
            items={items}
            defaultTimeStart={moment().startOf("day").add(-3, 'day')}
            defaultTimeEnd={moment().endOf("day").add(3, 'day')}
            stackItems={true}
            timeSteps={{day:1}}
            sidebarContent={<div>Projects</div>}
            sidebarWidth={200}
            itemsSorted
            showCursorLine
        />
      </div>
    )
  }
}
