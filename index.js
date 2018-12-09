// --- SET UP SERVER ---

const dotenv = require('dotenv');
dotenv.config(); // this line reads all key-value pairs from .env into process.env


const express = require('express'),
    PORT = process.env.PORT || 8181
    KEY = process.env.API_KEY
    bodyParser = require('body-parser'),
    app = express(),
    Sequelize = require('sequelize'),
    cors = require('cors'),
    db = require('./models'),
    Op = Sequelize.Op,
    fetch = require('node-fetch');

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

// --- GET METHODS --- 

// Set up a GET route at /employees that sends back a list of employees
app.get('/employees', (req, res) => {

    db.Employee.findAll()
    .then(employees => {
        return res.status(200).json(employees)
    })
    .catch(err => {
        return res.status(500).json(err);
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


// Set up a GET route that sends back a list of employees already assigned to the project
app.get('/projects/:projectID', (req, res) => {
    let assignedList = [];
    let projectID = req.params.projectID

    // search schedule for the project whose ID is being requested and return a list of assigned employees 
    db.Schedule.findAll({
        where: {
            project_id: projectID
            
        }
    })
    .then( assignedEmployees => { 
        assignedList = (assignedEmployees.map(employee => {
            return employee.dataValues
        }))
      
        let employeeIDs = assignedList.map((employee) => employee.employee_id )
        
        // search employee table and return a list of employee IDs assigned to the current project
        db.Employee.findAll({
            where: {
                id: {
                    [Op.in]: employeeIDs
                }
            }
        })
        .then(employees => {
            let newArray = []
            // attach start and end dates for each employee and return array to client
            let employeeArray = (employees.map(employee => employee.dataValues))

            if (employeeArray.length > 0) {
                employeeArray.forEach((employee, i) => {
                    employee.start_date = assignedList[i].start_date;
                    employee.end_date = assignedList[i].end_date;
                    employee.project_id = projectID
              
                })
            }
            return res.status(200).json(employeeArray)

        })
        .catch(err => {
            return res.status(500).json(err);
        })
    })
    .catch(err => {
        return res.status(500).json(err);
    })

});

// set up a GET route at /schedule/:projectID that sends back a list of employees not already assigned to the project, sorted by distance
app.get('/schedule/:projectID', (req, res) => {
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

        // return list of all employees that are not already assigned to the current project
        db.Employee.findAll({
            where: {
                id: {
                    [Op.notIn]:  assigned
                },
            }
        })
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
})


// --- POST METHODS --- 

// Set up a POST route at /clients that lets you add a new client to the database 

app.post('/clients', (req, res) => {
    let { name, address } = req.body;
    
    let lat, long = 0;

    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${KEY}`;
    
    // validation layer

    if (typeof address === "string" && typeof name === "string") {

        // send get request to API 
        fetch(url)
            .then(resp => {
                return resp.json()
            })
            .then(json => {
                lat = json.results[0].geometry.location.lat
                long = json.results[0].geometry.location.lng
    
                let address = json.results[0].address_components;
                let street = address[0].long_name + " " + address[1].long_name;
                let postCode = address[7].long_name;
                let city = address[3].long_name;
                let province = address[5].long_name;
                let country = address[6].long_name;
    
                db.Client.create({
                    name: name,
                    lat: lat,
                    long: long,
                    street: street,
                    post_code: postCode,
                    city: city,
                    province: province,
                    country: country
                })
                .then( entry => {
                    return res.status(200).json(entry)
                })
                .catch(err => {
                    return res.status(500).json(err);
                })
            })
            .catch(err => {
                return res.status(500).json(err);
            })
    }
})


// Set up a POST route at /employees that lets you add a new employee to the database

app.post('/employees', (req, res) => {
    let { firstName, lastName, address } = req.body;
    
    let lat, long = 0;

    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${KEY}`;
    
    // validation layer

    if (typeof address === "string" && typeof firstName === "string" && typeof lastName === "string") {

        // send get request to API 
        fetch(url)
            .then(resp => {
                return resp.json()
            })
            .then(json => {
                lat = json.results[0].geometry.location.lat
                long = json.results[0].geometry.location.lng
    
                let address = json.results[0].address_components;
                let street = address[0].long_name + " " + address[1].long_name;
                let postCode = address[7].long_name;
                let city = address[3].long_name;
                let province = address[5].long_name;
                let country = address[6].long_name;
    
                db.Employee.create({
                    first_name: firstName,
                    last_name: lastName,
                    lat: lat,
                    long: long,
                    street: street,
                    post_code: postCode,
                    city: city,
                    province: province,
                    country: country
                })
                .then( entry => {
                    return res.status(200).json(entry)
                })
                .catch(err => {
                    return res.status(500).json(err);
                })
            })
            .catch(err => {
                return res.status(500).json(err);
            })
    }
})

// Set up a POST route at /projects that lets you add a new project to the database


app.post('/projects', (req, res) => {
    let {name, startDate, endDate, clientID} = req.body;

    db.Project.create({
        name: name,
        start_date: startDate,
        end_date: endDate,
        client_id: clientID
    })
    .then( entry => {
        return res.status(200).json(entry)
    })
    .catch( err => {
        return res.status(500).json(err)
    })
})


// Set up a POST route at /project that lets you assign a project id to an employee as well as a start date/ end date. if no end date, defaults to 1 day

app.post('/project/:projectID', (req, res) => {

    let projectID = req.params.projectID
    let {employeeID, startDate, endDate, projectStart, projectEnd} = req.body
  
    let employeeProjects = []
    let isProjectOverlap = false

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

        // check that dates are within project dates
        if ( (startDate >= projectStart) && (startDate <= projectEnd) && (endDate <= projectEnd) && (endDate >= projectStart) 
            // check that dates do not overlap with any projects already assigned to the employee
            && (endDate >= startDate) && (isProjectOverlap === false)) { 
    
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
                    console.log(err)
                    return res.status(500).json(err);
                })
        } else {
            return res.status(500).json({error: "Invalid project dates. Ensure that employee dates do not conflict."})
        }
    })

})


// --- DELETE METHODS --- 

// Set up a DELETE route at /clients that lets you delete a client from the database
app.delete('/clients/:id', (req, res) => {
    let clientID = parseInt(req.params.id)

    db.Client.find({
        where: {
            id: clientID
        }
    })
    .then( client => {
        client.destroy()
        return res.status(200).json(client)
    })
    .catch(err => {
        return res.status(500).json(err);
    })
   
})


// Set up a DELETE route at /employees that lets you delete an employee from the database

app.delete('/employees/:id', (req, res) => {
    let employeeID = parseInt(req.params.id)

    db.Employee.find({
        where: {
            id: employeeID
        }
    })
    .then( employee => {
        employee.destroy()
        return res.status(200).json(employee)
    })
    .catch(err => {
        return res.status(500).json(err);
    })
})

// Set up a DELETE route at /projects that lets you delete a project from the database
app.delete('/projects/:id', (req, res) => {
    let projectID = parseInt(req.params.id)

    db.Project.find({
        where: {
            id: projectID
        }
    })
    .then( project => {
        project.destroy()
        return res.status(200).json(project)
    })
    .catch(err => {
        return res.status(500).json(err);
    })
})


// Set up a DELETE route at /schedule that lets you remove an employee from a project

app.delete('/schedule/:projectID/:employeeID', (req, res) => {
    let projectID = parseInt(req.params.projectID)
    let employeeID = parseInt(req.params.employeeID)

    db.Schedule.find({
        where: {
            project_id: projectID,
            employee_id: employeeID
        }
    })
    .then( schedule => {
        schedule.destroy()
        return res.status(200).json(schedule)
    })
    .catch(err => {
        return res.status(500).json(err);
    })

})


// --- PUT METHODS --- 

// Set up a PUT route at /clients that lets you edit a client from the database

// Set up a PUT route at /employees that lets you edit an employee from the database

// Set up a PUT route at /projects that lets you edit a project from the database





app.listen(PORT, ()=> {
    console.log('server running on ', PORT)
});



// FUNCTIONS

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