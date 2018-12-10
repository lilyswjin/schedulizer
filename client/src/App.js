import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './Navbar'
import Sidebar from './Sidebar'
import EmployeeList from './EmployeeList';
import ClientList from './ClientList';
// import ProjectList from './ProjectList';
// import AddEmployee from './AddEmployee';
import Project from './Project';
import Maps from './Maps';
import './App.css';
import Schedule from './Schedule';



class App extends Component {

  state = {
    company: {
      name: "BrainStation",
      lat: 43.645543000,
      long: -79.395385000,
    }
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
              {/* <Route path="/" exact component={Project} /> */}
              <Route path="/employees" exact component={EmployeeList} />
              <Route path="/clients" exact component={ClientList} />
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
