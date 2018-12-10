import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment';
// import {isEmpty} from './utils';
import ReactTable from 'react-table';
import AddEmployee from './AddEmployee';
import NewProject from './NewProject';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class Project extends Component {
    state = {
        projectList: [],
        assignedEmployees: {},
        addEmployeeIsOpen: false,
        addProjectIsOpen: false,
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
            addEmployeeIsOpen: false
        })
    }

    handleOpen = (e) => {
        e.preventDefault()

        let projectID = e.target.title;

        this.setState({
            addEmployeeIsOpen: true,
        })

        if (projectID !== undefined){
            this.setState({
                currentProjectID: projectID 
            })
        }
    }

    handleOpenProj = (e) => {
        e.preventDefault()
        this.setState({
            addProjectIsOpen: true
        })
    }

    handleCloseProj = (e) => {
        e.preventDefault()
        this.setState({
            addProjectIsOpen: false
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

    deleteProject = (e) => {
        let id = e.target.name
        let url = `http://localhost:8080/projects/${id}`;
        let init = {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            }
        };

        fetch(url, init)
            .then( res => {
                res.json();
                this.fetchProjects();
            })
    }

    removeEmployee = (e) => {
        let idStr = (e.target.name)

        if (idStr) {
            let arr = idStr.split(',')
            let projectID = Number(arr[0]);
            let employeeID = Number(arr[1]);

            let url = `http://localhost:8080/schedule/${projectID}/${employeeID}`;
            let init = {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json'
                }
            };
    
            fetch(url, init)
                .then( res => {
                    console.dir(res)
                    this.fetchProjects();
                })
        }
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
                            end_date: moment(employee.end_date).format("MM/DD/YYYY"),
                            project_id: project.id

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
                    // <span title={row.original.id} onClick={this.handleOpen}>+ <i title={row.original.id} className="fas fa-male"></i> <i  title={row.original.id} className="fas fa-male"></i> <i  title={row.original.id} className="fas fa-male"></i></span>
                    <DropdownButton title={""} id={`dropdown${row.id}`} noCaret>
                        <MenuItem onClick={this.handleOpen} name={row.value.id} title={row.original.id} ><i className="fas fa-male" ></i> <i className="fas fa-male" ></i>  Add Employee</MenuItem>
                        <MenuItem><i className="fas fa-pencil-alt"></i>   Edit</MenuItem>
                        <MenuItem onClick={this.deleteProject} name={row.value.id}><i className="fas fa-trash-alt"></i>   Delete</MenuItem>
                    </DropdownButton>
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
                },
                {
                    Header: "",
                    accessor: "",
                    Cell: row => (
                        <DropdownButton title={""} id={`dropdown${row.id}`} noCaret>
                            <MenuItem onClick={this.removeEmployee} name={`${row.value.project_id},${row.value.id}`} ><i className="fas fa-trash-alt"></i>Remove</MenuItem>
                        </DropdownButton>
                    )
                }
            ]

            return (
                <ReactTable data={employeeData}
                            columns={employeeColumns}
                            minRows={0} 
                            showPagination={false}
                            className="employee__table"
                />
            )

        }


        return (
            <div className="project">
                <Link to="/projects"><div className="table"><i className="fas fa-list-alt"></i> List</div></Link>
                <Link to="/schedule"><div className="calendar"><i className="fas fa-calendar-alt"></i> Calendar</div></Link>
                <ReactTable data={data} 
                            columns={columns} minRows={0} 
                            defaultPageSize={15} 
                            className="-striped -highlight"
                            SubComponent = { row => {
                                return (
                                    <div>
                                        {employeeTable(row.original.assigned)}
                                    </div>
                                )
                            }}
                            />
                <button onClick={this.handleOpenProj} className="newItem project-newItem">++<i className="fas fa-file-alt"></i></button>
                <AddEmployee isOpen={this.state.addEmployeeIsOpen} 
                    handleClose={this.handleClose} 
                    projectDetails={this.state.projectList[this.state.currentProjectID-1]}
                    assignedEmployees={this.state.assignedEmployees[this.state.currentProjectID]}
                    fetchProjects={this.fetchProjects}
                    projectID={this.state.currentProjectID}/>
                
                <NewProject isOpen={this.state.addProjectIsOpen} 
                    fetchProjects={this.fetchProjects}
                    handleClose={this.handleCloseProj} />
                
            </div>
        )
    }
}
