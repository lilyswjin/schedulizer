import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './Navbar'
import Sidebar from './Sidebar'
import EmployeeList from './EmployeeList';
import ClientList from './ClientList';
import Project from './Project';
import Maps from './Maps';
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
  }

  componentDidMount() {
    this.fetchClients();
  }

  fetchClients = () => {
      fetch("http://localhost:8080/clients")
      .then(res => res.json())
      .then(data => {
          this.setState({clientList: data})
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
              <Route path="/" exact component={Dashboard} />
              <Route path="/employees" exact component={EmployeeList} />
              <Route path="/clients" exact render={(routeProps) => <ClientList {...routeProps} clientList={this.state.clientList} fetchClients={this.fetchClients} />}/>
              <Route path="/projects" exact component={Project} />
              {/* <Route path="/projects/:id" exact component={AddEmployee} /> */}
              <Route path="/schedule" exact component={Schedule} />
              <Route path="/map" exact component={Maps} />
            </Switch>
            </section>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
