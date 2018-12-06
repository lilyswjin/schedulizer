import React, { Component } from 'react';
import ReactTable from 'react-table';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default class EmployeeList extends Component {

    state = {
        employeeList: []
    }

    componentDidMount() {
        this.fetchEmployees();
    }

    fetchEmployees = () => {
        fetch("http://localhost:8080/employees")
        .then(res => res.json())
        .then(data => {
            this.setState({employeeList: data})
        })  
    }

    render() {
        const data = this.state.employeeList.map((employee)=>{
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
                        <DropdownButton noCaret>
                            <MenuItem><i className="fas fa-pencil-alt"></i>   Edit</MenuItem>
                            <MenuItem><i className="fas fa-trash-alt"></i>   Delete</MenuItem>
                        </DropdownButton>
                    )
                }
            }
        ];

        return (
            <div className="employee">
              <ReactTable data={data} columns={columns} minRows={1} defaultPageSize={8} className="-striped -highlight" />
              <button className="newItem">++<i className="fas fa-male"></i></button>
            </div>
        )
    }
}
