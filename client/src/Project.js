import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment';
// import {isEmpty} from './utils';
import ReactTable from 'react-table';
import AddEmployee from './AddEmployee';

export default class Project extends Component {
    state = {
        projectList: [],
        assignedEmployees: {},
        isOpen: false,
        currentProjectID: null,
        table: true
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

        const data = this.state.projectList.map((project)=>{
            return (
                {
                    id: project.id,
                    projectName: project.name,
                    startDate: moment(project.start_date).format("MM/DD/YYYY"),
                    endDate: moment(project.end_date).format("MM/DD/YYYY"),
                    assigned: this.state.assignedEmployees[project.id] ? this.state.assignedEmployees[project.id].map( employee => {
                        return {
                            id: employee.id,
                            first_name: employee.first_name,
                            last_name: employee.last_name,
                            start_date: moment(employee.start_date).format("MM/DD/YYYY"),
                            end_date: moment(employee.end_date).format("MM/DD/YYYY")
                        }
                    }) : null
                }
            )
        })

        const columns = [
            {
                Header: "ID",
                accessor: 'id'
            }, 
            {
                Header: "Project Name",
                accessor: 'projectName'
            },
            {
                Header: "Start Date",
                accessor: 'startDate'
            },
            {
                Header: "End Date",
                accessor: 'endDate'
            },
            {
                Header: "",
                accessor: "",
                Cell: row => (
                    <span title={row.original.id} onClick={this.handleOpen}>+ <i title={row.original.id} className="fas fa-male"></i> <i  title={row.original.id} className="fas fa-male"></i> <i  title={row.original.id} className="fas fa-male"></i></span>
                )
            }
        ];

        const employeeTable = (assigned) => {
            let employeeData = assigned;
            let employeeColumns = [
                {
                    Header: "ID",
                    accessor: 'id'
                }, 
                {
                    Header: "First Name",
                    accessor: 'first_name'
                },
                {
                    Header: "Last Name",
                    accessor: 'last_name'
                },
                {
                    Header: "Start Date",
                    accessor: 'start_date'
                },
                {
                    Header: "End Date",
                    accessor: 'end_date'
                }
            ]

            return (
                <ReactTable data={employeeData}
                            columns={employeeColumns}
                            minRows={1} 
                            showPagination={false}
                />
            )

        }


        return (
            <div className="project">
            
                <ReactTable data={data} 
                            columns={columns} minRows={1} 
                            defaultPageSize={8} 
                            className="-striped -highlight"
                            SubComponent = { row => {
                                // console.dir(row)
                                return (
                                    <div>
                                    {/* {row.original.id} */}
                                        {employeeTable(row.original.assigned)}
                                    </div>
                                )
                            }}
                            />
                <button className="newItem">++<i className="fas fa-file-alt"></i></button>
                <AddEmployee isOpen={this.state.isOpen} 
                    handleClose={this.handleClose} 
                    projectDetails={this.state.projectList[this.state.currentProjectID-1]}
                    assignedEmployees={this.state.assignedEmployees[this.state.currentProjectID]}
                    fetchProjects={this.fetchProjects}
                    projectID={this.state.currentProjectID}/>
                <Link to="/schedule"><span>Calendar View</span></Link>
            </div>
        )
    }
}
