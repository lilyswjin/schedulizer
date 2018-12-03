import React, { Component } from 'react'
import moment from 'moment';

export default class ProjectList extends Component {

  state = {
    projectList: []
  }

  componentDidMount() {
    this.fetchProjects();
}

fetchProjects = () => {
    fetch("http://localhost:8080/projects")
    .then(res => res.json())
    .then(data => {
        this.setState({projectList: data})
    })  
}

render() {
    let projectRows = this.state.projectList.map((project) => {
        return (
            <div className="project__row" key={project.id} >
                <span>{project.id}</span> 
                <span>{project.name}</span> 
                <span>{moment(project.start_date).format("MM/DD/YYYY")}</span>
                <span>{moment(project.end_date).format("MM/DD/YYYY")}</span>
                <span></span>
                {/* <span><img src="./assets/icons/employee2.svg" height="25px" width="25px" alt="employee"/></span> */}
            </div>
        )
    });

    return (
        <div className="project">
        <div className="project__row">
            <span>ID</span>
            <span>Project Name</span>
            <span>Start Date</span>
            <span>End Date</span>
            <span><i className="fas fa-ellipsis-h"></i></span> 
        </div>
        {projectRows}
    </div>
    )
}
}
