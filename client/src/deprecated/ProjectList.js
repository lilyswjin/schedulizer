import React, { Component } from 'react'
import moment from 'moment';
import Accordion from './Accordion';
import {isEmpty} from '../utils';
import AddEmployee from '../AddEmployee';

export default class ProjectList extends Component {

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

    handleClose = (e) => {
        e.preventDefault()
        this.setState({
            isOpen: false
        })
    }

    handleOpen = (e) => {
        e.preventDefault()

        let projectID = e.target.title;

        this.setState({
            isOpen: true,
        })

        if (projectID !== undefined){
            this.setState({
                currentProjectID: projectID 
            })
        }
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
        let projectRows = this.state.projectList.map((project) => {
        
            let employees = this.state.assignedEmployees;

            let assignedEmployees = (projectID) => {
                let result ;
            
                if (projectID !== undefined && !isEmpty(employees) && employees !== undefined && employees[project.id] !== undefined) { 
                    result = employees[project.id].map((employee) => {
                        return (
                            <div className="assignedEmployees" key={employee.id} >
                                <span>{employee.id}</span>
                                <span>{employee.first_name}</span>
                                <span>{employee.last_name}</span>
                                <span>{moment(employee.start_date).format("MM/DD/YYYY")}</span>
                                <span>{moment(employee.end_date).format("MM/DD/YYYY")}</span>
                            </div>
                        )
                    })

                } else {
                    result = <div></div>
                }

                return (
                result
                )
            }


            return (
                <div className="project__container" key={project.id}  >
                    <div className="project__row" id={project.id} >
                        <span>{project.id}</span> 
                        <span>{project.name}</span> 
                        <span></span>
                        <span>{moment(project.start_date).format("MM/DD/YYYY")}</span>
                        <span>{moment(project.end_date).format("MM/DD/YYYY")}</span>
                        <span title={project.id} onClick={this.handleOpen}>+ <i title={project.id} class="fas fa-male"></i> <i  title={project.id} class="fas fa-male"></i> <i  title={project.id} class="fas fa-male"></i></span>
                        {/* <button onClick={this.handleOpen}>Add employee</button> */}
                    </div>
                    <Accordion allowMultipleOpen >
                        <div label={`project${project.id}`} >
                        {assignedEmployees(project.id)}
                        </div>
                    </Accordion>
                    
                </div>

            )
        });

        return (
            <div className="project">
                <div className="project__row">
                    <span>ID</span>
                    <span>Project Name</span>
                    <span><i className="fas fa-ellipsis-h"></i></span> 
                    <span>Start Date</span>
                    <span>End Date</span>
                    <span></span>
                </div>
                {projectRows}
                <AddEmployee isOpen={this.state.isOpen} 
                            handleClose={this.handleClose} 
                            projectDetails={this.state.projectList[this.state.currentProjectID-1]}
                            assignedEmployees={this.state.assignedEmployees[this.state.currentProjectID]}
                            projectID={this.state.currentProjectID}/>
            </div>
        )
    }
}

