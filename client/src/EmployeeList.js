import React, { Component } from 'react';
import ReactTable from 'react-table';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import NewEmployee from './NewEmployee';

export default class EmployeeList extends Component {

    state = {
        isOpen: false
    }

    handleClose = (e) => {
        e.preventDefault()
        this.setState({
            isOpen: false
        })
    }

    handleOpen = (e) => {
        e.preventDefault()
        this.setState({
            isOpen: true,
        })
    }

    deleteEmployees = (e) => {
        let id = e.target.name
   
        let url = `http://localhost:8080/employees/${id}`;
        let init = {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            }
        };

        fetch(url, init)
            .then( res => {
                res.json();
                this.props.fetchEmployees();
            })
    }

    render() {
        const data = this.props.employeeList.map((employee)=>{
            return (
                {
                    id: employee.id,
                    firstName: employee.first_name,
                    lastName: employee.last_name
                }
            )
        })
        
        const columns = [
            {
                Header: "ID",
                accessor: 'id'
            }, 
            {
                Header: "First Name",
                accessor: 'firstName'
            },
            {
                Header: "Last Name",
                accessor: 'lastName'
            },
            {
                Header: "",
                accessor: "",
                Cell: row => {
                    return (
                        <DropdownButton title={""} id={`dropdown${row.id}`} noCaret>
                            <MenuItem><i className="fas fa-pencil-alt"></i>  Edit</MenuItem>
                            <MenuItem onClick={this.deleteEmployees} name={row.value.id} ><i className="fas fa-trash-alt"></i>  Delete</MenuItem>
                        </DropdownButton>
                    )
                }
            }
        ];

        return (
            <div className="employee">
                <h1>EMPLOYEES</h1>
                <ReactTable data={data} columns={columns} minRows={1} defaultPageSize={15} className="-striped -highlight" />
                <button onClick={this.handleOpen} className="newItem">++<i className="fas fa-male"></i><i className="fas fa-male"></i></button>
                <NewEmployee isOpen={this.state.isOpen} handleClose={this.handleClose} fetchEmployees={this.props.fetchEmployees} />
            </div>
        )
    }
}
