# Schedulizer

**Description**: 

A sleek, modern scheduler to help accounting/consulting firms to schedule their projects while taking into account employee travel times. 

One of the biggest pain points for employees who have to travel as part of their job duties is the amount of time spent commuting to and from clients. For companies that also reimburse employees for client travel, this becomes a real cost to the company in terms of mileage and reduced employee morale. Schedulizer aims to minimize both of these costs by factoring in the travel times for employees into the scheduling process. 

**Requirements**:
Google API key is needed.

**TechStack**:
This application was built using React for front-end, express.js for back-end with a MySQL database. 

**Core Features**:

1) Project List

- Show a list of all projects along with employees assigned
- Ability to add projects, delete projects, and add employees: 

2) Project Calendar
- Displays gantt chart of employees assigned to each project

2) Schedule Employee
- Brings up a panel showing a list of available employees, sorted by the physical distance from the client's location 
- Makes calls to google maps geolocation API to graphically represent distances 

