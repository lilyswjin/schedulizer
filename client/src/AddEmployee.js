import React, { Component } from 'react';
import {isEmpty} from './utils';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ReactTable from 'react-table';
import "react-datepicker/dist/react-datepicker.css";
import Maps from './Maps';

export default class AddEmployee extends Component {

  state = {
    employees: [],
    startDate: new Date(),
    endDate: new Date(),
    selectedEmployeeID: -1,
    searchText: "",
    errorMsg: "",
    isValid: false
  }

  componentDidMount() {
    if (this.props.projectID !== null){
      this.fetchEmployeeByLocation(Number(this.props.projectID))
     
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.projectID !== this.props.projectID) {
      this.fetchEmployeeByLocation(Number(this.props.projectID));
    }
  }

  fetchEmployeeByLocation = (projectID) => {
    // retrieve list of employees not already assigned to the project
    // sorted by location
    fetch(`http://localhost:8080/schedule/${projectID}`)
    .then(res => res.json())
    .then(data => {  
        this.setState({
            employees: data
        })
        
    })  
  }

  scheduleEmployee = () => {

    let url = `http://localhost:8080/project/${this.props.projectID}`;
    let body = {
      employeeID: Number(this.state.selectedEmployeeID),
      startDate: moment(this.state.startDate).startOf("day").valueOf(),
      endDate: moment(this.state.endDate).endOf("day").valueOf(),
      projectStart: this.props.projectDetails.start_date,
      projectEnd: this.props.projectDetails.end_date
    }

    console.log(body)

    let init = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json'
      }
    }

    // validate inputs
    if (body.employeeID !== -1) {
      fetch(url, init)
          .then(res => {
            // console.dir(res);
            if (res.status === 500) {
              this.setState({
                errorMsg: "The selected employee has a conflict. Please resolve before assigning."
              })
            } else {

              this.props.fetchProjects()
              this.fetchEmployeeByLocation()
            }
          })
          .catch(err => console.log(err))
    }
  }

  validateForm = (e) => {


    if (moment(this.state.startDate).startOf('day').valueOf() < this.props.projectDetails.start_date && moment(this.state.startDate).startOf('day').valueOf()  > this.props.projectDetails.end_date) {
      this.setState({
        errorMsg: "Start date must be within project dates!"
      })
    } else if ( moment(this.state.endDate).endOf("day").valueOf() < this.props.projectDetails.end_date && moment(this.state.endDate).endOf("day").valueOf() < this.props.projectDetails.start_date) {
      this.setState({
        errorMsg: "End date must be within project dates!"
      })
    } else if (moment(this.state.endDate).endOf("day").valueOf() < moment(this.state.startDate).startOf('day').valueOf()) {
      this.setState({
        errorMsg: "End date cannot be before start date!"
      })
    } else if (this.state.selectedEmployeeID < 0) {
      this.setState({
        errorMsg: "Please select an employee!"
      })  
    } else {
      this.setState({
        isValid: true
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.validateForm();
    if (this.state.isValid) {
      this.scheduleEmployee()
    }
  }

  handleSelect = (e) => {
    this.setState({
      selectedEmployeeID: Number(e.target.value)
    })
  }

  handleChangeStart = (date) => {
    this.setState({
      startDate: date
    })
  }

  handleChangeEnd = (date) => {
    this.setState({
      endDate: date
    })
  }

  handleSearch = (e) => {
    this.setState({
      searchText: e.target.value
    })
  }

  render() {

    let projectInfo = () => {
      let result;
      if (!isEmpty(this.props.projectDetails) & this.props.projectDetails !== undefined) {
        result =  
          <div className="project__details--info">
            <div className="project__details--name">Project: {this.props.projectDetails.name}</div>
            <div className="project__details--date">
              <div style={{fontWeight: "bold"}}>Project start:</div> <div>{moment(this.props.projectDetails.start_date).format("MM/DD/YYYY")}</div>
              <div style={{fontWeight: "bold"}}>Project end:</div> <div>{moment(this.props.projectDetails.end_date).format("MM/DD/YYYY")}</div>
            </div>
           
            <div style={{fontWeight: "bold", paddingBottom: "1rem"}}>Assigned Employees:</div>
              <div className="project__details--list" style={{fontWeight: "bold"}} >
                <span>ID</span>
                <span>First Name</span>
                <span>Last Name</span>
                <span>Start Date</span>
                <span>End Date</span>
                {/* <span></span> */}
              </div>
              {this.props.assignedEmployees.map((employee)=>{
                return (
                  <div className="project__details--list" key={employee.id} >
                    {/* <span><img src="./assets/icons/employee2.svg" height="25px" width="25px" alt="employee"/></span> */}
                    <span>{employee.id}</span>
                    <span>{employee.first_name}</span>
                    <span>{employee.last_name}</span>
                    <span>{moment(employee.start_date).format("MM/DD/YYYY")}</span>
                    <span>{moment(employee.end_date).format("MM/DD/YYYY")}</span>
                    {/* <span></span> */}
                  </div>
                )
              })}
          </div>
      } else {
        result = <div></div>
      }
      return result
    }

    // set up data structure for react-table for presenting employee list

    let employeeList = this.state.employees ? this.state.employees : [];

    let employeeData = this.state.employees ? employeeList
      .filter((employee) => {
        
        let result = []
        let regex = new RegExp(this.state.searchText, "i")

        if (this.state.searchText === "") {
          result = employee.id > 0
        } else {
          result = regex.test(employee.first_name) || regex.test(employee.last_name) 
        }

        return (
          result
        )
      })
      .map( employee => {
      return (
        {
          id: employee.id,
          firstName: employee.first_name,
          lastName: employee.last_name,
          distance: parseFloat(Math.round(employee.distance * 100) / 100).toFixed(2) + ' km'
        }
      ) 
    }) : {}

    const employeeColumns = [
      {
        Header: "",
        accessor: "",
        Cell: row => {
          return (
            <input type="radio" name="addEmployee" value={row.original.id} onChange={this.handleSelect} ></input>
          )
        }
      },
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
        Header: "Travel Distance",
        accessor: "distance"
      }
    ]

  
    let clientCoords = () => {
      let result;
      if (!isEmpty(this.props.clientDetails)) {
       
        result = {
          lat: this.props.clientDetails.lat,
          long: this.props.clientDetails.long,
          name: this.props.clientDetails.name
        }
      } else {
        result = {
          lat: 43.645543000,
          long: -79.395385000,
          name: "BrainStation"
        }
      }
      return result;
    }

    return (
      <div style={{...flex, display: this.props.isOpen ? 'flex' : 'none'}}>
        <div className='modal-layer' onClick={this.props.handleClose} style={modalLayer}></div>
          <div className="form-container" style={formModal}>
            <div className="scheduler">
              <div className="project__details">
                {projectInfo()}
              </div>
              <form className="addEmployee__search" >
                <div className="addEmployee__heading">Available Employees:</div>
                <input type="text" id="searchbar" placeholder="Search employees" value={this.state.searchText} onChange={this.handleSearch} ></input>
              </form>
              <ReactTable data={employeeData} 
                          columns={employeeColumns} 
                          className="addEmployee__table"
                          sortable={false}
                          showPagination={false}
                          minRows={1}  />
              <form className="addEmployee" >
                <div className="addEmployee__heading">Employee Scheduled Duration:</div>
                <div className="addEmployee__dates">
                  <label className="addEmployee__date">
                    From: <DatePicker selected={this.state.startDate} onChange={this.handleChangeStart}/>
                  </label>
                  <label className="addEmployee__date">
                    To: <DatePicker selected={this.state.endDate} onChange={this.handleChangeEnd}/>
                  </label>
                </div>
                <button className="addEmployee__btn" onClick={this.handleSubmit} >Schedulize!</button>
              </form>      
              <div className="errorMsg">{this.state.errorMsg}</div>
            </div>
            <div className="schedulerMap">
              <Maps employees={this.state.employees} coord={clientCoords()} />
            </div>
          </div>
      </div>
    )
  }
}


AddEmployee.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

const flex = {
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  zIndex: 1,
  overflow: 'hidden',
  backgroundColor: 'rgba(57,57,57,0.6)',
  top: 0,
  left: 0
};

const modalLayer = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  zIndex: 1,
  backgroundColor: 'transparent',
};
  

const formModal = {
  position: 'absolute',
  color: 'rgb(57,57,57)',
  backgroundColor: '#FFFFFF',
  width: '90%',
  maxWidth: '100%',
  height: '85vh',
  maxHeight: '100%',
  zIndex: 2,
  borderRadius: '3px',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'row'
};



