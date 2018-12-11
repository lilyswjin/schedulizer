import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import NavBar from './Navbar'
import Sidebar from './Sidebar'
import EmployeeList from './EmployeeList';
import ClientList from './ClientList';
import Project from './Project';
import './App.css';
import Schedule from './Schedule';
import Dashboard from './Dashboard';

class App extends Component {

  state = {
    company: {
      name: "BrainStation",
      lat: 43.645543000,
      long: -79.395385000,
    },
    clientList: [],
    projectList: [],
    employeeList: [],
    assignedEmployees: {},
  }

  componentDidMount() {
    this.fetchClients();
    this.fetchProjects();
    this.fetchEmployees();
  }

  fetchClients = () => {
      fetch("http://localhost:8080/clients")
      .then(res => res.json())
      .then(data => {
          this.setState({clientList: data})
      })  
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

  fetchEmployees = () => {
    fetch("http://localhost:8080/employees")
    .then(res => res.json())
    .then(data => {
        this.setState({employeeList: data})
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
      <Router>
        <div className="App">
            <NavBar/>
          <main className="main">
            <Sidebar/>
            <section className="section">
            <Switch>
              <Route path="/dashboard" exact render={(routeProps) => <Dashboard {...routeProps} employeeList={this.state.employeeList} projectList={this.state.projectList}  clientList={this.state.clientList} assignedEmployees={this.state.assignedEmployees} /> } />
              <Route path="/employees" exact render={(routeProps) => <EmployeeList {...routeProps} employeeList={this.state.employeeList} fetchEmployees={this.fetchEmployees} /> } />
              <Route path="/clients" exact render={(routeProps) => <ClientList {...routeProps} clientList={this.state.clientList} fetchClients={this.fetchClients} />}/>
              <Route path="/projects" exact render={(routeProps) => <Project {...routeProps} projectList={this.state.projectList} assignedEmployees={this.state.assignedEmployees} fetchProjects={this.fetchProjects} /> } />
              <Route path="/schedule" exact render={(routeProps) => <Schedule {...routeProps} projectList={this.state.projectList} assignedEmployees={this.state.assignedEmployees} fetchProjects={this.fetchProjects} /> } />
              <Route path={"/"} exact render={() => {return <Redirect to="/dashboard"/> }}/>
            </Switch>
            </section>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
