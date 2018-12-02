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



// set up a GET route at /schedule/:projectID that sends back a list of employees not already assigned to the project, sorted by distance
app.get('/schedule/:projectID', (req, res) => {

    let projectID = req.params.projectID
    let clientLocation = {};
  

    db.Project.findOne({
        where: { id: projectID},
        include: [
            {model: db.Client}
        ]
    })
    .then( project => {
       let client = project.Client.dataValues;
        clientLocation = sequelize.literal(`('POINT(${client.long} ${client.lat})')`);
        // console.log(clientLocation)
    })

    // var distance = sequelize.fn('ST_Distance_Sphere', sequelize.literal('location'), location);

    console.dir(distance(-79.39, 43.64, -79.38, 43.63, "K"))

    db.Employee.findAll({
        where: {
            [Op.or]: [
                {project_id: null},
                {project_id: {
                    [Op.not]: projectID
                }}
            ]
        }
    })
    .then(employees => {

        let employeeList = employees.map( (employee) => {
            return employee.dataValues
        })
        // console.log(employeeList)

        employeeList.forEach(employee => {
            let employeeLocation = sequelize.literal(`('POINT(${employee.long} ${employee.lat})')`);
            let distance = sequelize.fn('ST_Distance_Sphere', clientLocation, employeeLocation);

        });

        return res.status(200).json(employeeList)
    })
    .catch(err => {
        return res.status(500).json(err);
    })
})


// Set up a POST route at /schedule that lets you assign a project id to an employee as well as a start date/ end date. if no end date, defaults to 1 day

app.post('/schedule/:projectID', (req, res) => {

    let projectID = req.params.projectID
    let newAllocation = req.body

// still needs data validation

    db.Schedule.create({
        project_id: projectID,
        employee_id: newAllocation.employeeID,
        start_date: newAllocation.startDate,
        end_date: newAllocation.endDate
    })

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