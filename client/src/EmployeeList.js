import React, { Component } from 'react'


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
        let employeeRows = this.state.employeeList.map((employee) => {
            return (
                <div className="employee__row" key={employee.id} >
                    <span>{employee.id}</span> 
                    <span>{employee.first_name}</span> 
                    <span>{employee.last_name}</span>
                    <span></span>
                    {/* <span><img src="./assets/icons/employee2.svg" height="25px" width="25px" alt="employee"/></span> */}
                </div>
            )
        });

        return (
            <div className="employee">
            <div className="employee__row">
                <span>ID</span>
                <span>First Name</span>
                <span>Last Name</span>
                <span><i className="fas fa-ellipsis-h"></i></span> 
            </div>
            {employeeRows}
        </div>
        )
    }
}
