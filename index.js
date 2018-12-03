const express = require('express'),
    port = 8080,
    bodyParser = require('body-parser'),
    app = express(),
    Sequelize = require('sequelize'),
    cors = require('cors'),
    db = require('./models'),
    Op = Sequelize.Op

    app.use(cors());

// Set up connection to the db (db name, user name, pw)
const sequelize = new Sequelize('shoppr', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    dialect: "mysql",
    port: 8889
});

// set body parser for urlencoded and json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set up a GET route at /employees that sends back a list of employees
app.get('/employees', (req, res) => {

    db.Employee.findAll()
    .then(employees => {
        return res.status(200).json(employees)
    })
    .catch(err => {
        return res.status(404).json(err);
    })

});

// Set up a GET route at /clients that sends back a list of clients
app.get('/clients', (req, res) => {

    db.Client.findAll()
    .then(clients => {
        return res.status(200).json(clients)
    })
    .catch(err => {
        return res.status(500).json(err);
    })

});

// Set up a GET route at /projects that sends back a list of projects
app.get('/projects', (req, res) => {

    db.Project.findAll()
    .then(projects => {
        return res.status(200).json(projects)
    })
    .catch(err => {
        return res.status(500).json(err);
    })

});


// set up a GET route at /project/:projectID that sends back a list of employees not already assigned to the project, sorted by distance
app.get('/projects/:projectID', (req, res) => {
    let projectID = req.params.projectID
    let clientLat = 0
    let clientLong = 0
    let assigned = []
  
    // extract location of current client
    db.Project.findOne({
        where: { id: projectID},
        include: [
            {model: db.Client}
        ]
    })
    .then( project => {
       let client = project.Client.dataValues;
        // clientLocation = sequelize.literal(`('POINT(${client.long} ${client.lat})')`);
        clientLat = Number(client.lat);
        clientLong = Number(client.long);
    })


    // find all employees already scheduled on this project
    db.Schedule.findAll({
        where: {
            project_id: projectID
            
        }
    })
    .then( assignedEmployees => {
        assigned = (assignedEmployees.map(employee => {
            return employee.dataValues.employee_id
        }))
      
    })

    // return list of all employees that are not already assigned to the current project

    db.Employee.findAll({
        where: {
            id: {
                [Op.not]:  assigned
            }
        }
    })
    // return array of employees retrieved from the database
    .then(employees => {
        let employeeList = employees.map( (employee) => {
            return employee.dataValues
        })
  
        // for each employee, use distance() to calculate and store the distance from the client
        employeeList.forEach(employee => {
            let travelDist = distance(employee.long, employee.lat, clientLong, clientLat, "K" )
            employee.distance = travelDist
        });

        employeeList.sort((a, b) => a.distance - b.distance);

        return res.status(200).json(employeeList)
    })
    .catch(err => {
        return res.status(500).json(err);
    })
})


// Set up a POST route at /project that lets you assign a project id to an employee as well as a start date/ end date. if no end date, defaults to 1 day

app.post('/project/:projectID', (req, res) => {

    let projectID = req.params.projectID
    let {employeeID, startDate, endDate} = req.body
    let projectStart = 0;
    let projectEnd = 0;
    let employeeProjects = []
    let isProjectOverlap = false

    db.Project.findOne({
        where: { id: projectID},
    })
    .then( project => {
       projectStart = project.start_date;
       projectEnd = project.end_date;
        
    })

    db.Schedule.findAll({
        where: {
            employee_id: employeeID
        }
    })
    .then( employee => {
        employeeProjects = (employee.map( employee => {
            return employee.dataValues
        }))    
        
        // validate data and ensure that project dates do not overlap for the employee
        employeeProjects.forEach( (project) => {
            if ( project.start_date < endDate && project.start_date > startDate && project.end_date > startDate && project.end_date < endDate ) {
                isProjectOverlap = true;
            }
        })
    })

    // check that dates are within project dates
    if ( (startDate > projectStart) && (startDate < projectEnd) && (endDate > projectStart) && (endDate < projectEnd) 
        // check that dates do not overlap with any projects already assigned to the employee
        && (isProjectOverlap === false)) { 

            // create database entry in schedule to associate the employee with the project
            db.Schedule.create({
                project_id: projectID,
                employee_id: employeeID,
                start_date: startDate,
                end_date: endDate
            })

            // return json 
            .then( entry => {
                return res.status(200).json(entry)
            })
            .catch(err => {
                return res.status(500).json(err);
            })
    } else {
        return res.status(500).json({error: "Invalid project dates. Ensure that employee dates do not conflict."})
    }
})



app.listen(port, ()=> {
    console.log('server running on ', port)
});





//  JavaScript version of the Haversine formula as implemented by the GeoDataSource.com


function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}