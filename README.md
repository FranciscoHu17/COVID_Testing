# COVID_Testing

This project was designed to simulate Stony Brook University's COVID testing procedure. I collaborated on this project with another SBU student, Derek Liu.

Stony Brook is preparing to start mass weekly testing for all students, faculty and hospital employees (approximately 28K people) using saliva tests. Since they cannot test all 28K samples, multiple tests will be mixed together in the same "pool" to be tested at once. A lab employee will put this pool in a testing "well" once it becomes available. If the well turns out negative, all the tests are negative. If the well turns out positive, they have to continue testing the remaining saliva for all the participants (also in this binary testing fashion, that is, 50% in a separate well and 50% in another well, and the process continues until all positives are found). From 1 saliva sample, they can dilute it to a fixed maximum number of samples (3-5).

## How It Works ##
The user goes to the main page and can log in as either an lab technician or an employee. The flowchart at COVID_Testing/Diagrams/flowchart.png demonstrates how the user navigates from one webpage to the next. Each picture under COVID_Testing/Diagrams illustrates its corresponding webpage.

Lab Technician:    
If the user clicks the lab tech button from the main page, then they will be prompted to enter their credentials after being directed to the lab tech login page. Once they input the correct username and password information, they will be directed to lab home. At lab home, they are able to select 3 options: test collection, pool mapping, well testing. In test collection, the lab technician is able to input test barcodes for each employee tested. In pool mapping, they're able to create pools and add one or more test barcodes for each pool. In well testing, the lab tech adds a relationship between each well and each pool as well as indicate whether that well has a "positive", "negative", or "in progress" testing result.

Employee:     
If the user clicks the employee button from the main page, then they will be prompted to enter their credentials after being directed to the employee log in page. Once they input the correct username and password information, they will be directed to employee home. At employee home, employees will be able to view their testing results arranged by the lab technicians.

Database:   
The local MySQL database is represented by the UML diagram at COVID_Testing/Diagrams/UML.PNG and can be recreated using the sbu_covid_db.sql file.

Utilized HTML, CSS, JavaScript, Express.js, and MySQL
