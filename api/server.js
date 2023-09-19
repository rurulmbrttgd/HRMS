import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
// import second from 'bcrypt'

const app = express();
app.use(express.json());
app.use(cors(
  {
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
  }
))
app.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup"
})

//login form
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users_login WHERE (username = ? OR email = ?) AND password = ?";
  db.query(sql, [username, username, password], (err, data) => {
    if (err) {
      return res.status(500).json({ Message: "Server Side Error" });
    }
    if (data.length === 0) {
      return res.status(401).json({ Message: "Wrong Email or Password" });
    } else {
      const token = jwt.sign({ role: "admin" }, "jwt-secret-key", { expiresIn: '1d' });
      res.cookie('token', token);
      return res.json({ Status: "Login Successfully!" });
    }
  });
});

//show table of employees in EMPLOYEE nav-bar
app.get('/employee', (req, res) => {
  const sql = "SELECT e.ID, CONCAT(e.firstName, ' ', e.surname) AS fullName, DATE_FORMAT(e.dateOfBirth, '%M %e, %Y') AS dateOfBirth, e.email, t.typeName, d.departmentName FROM employees_info AS e INNER JOIN type AS t ON e.typeID = t.ID INNER JOIN department AS d ON e.departmentID = d.ID";

  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ status: 'Error', message: 'Internal server error' });
    } else {
      res.json({ status: 'Success', data });
    }
  });
});


/* CREATE EMPLOYEE FORM */
app.post('/create', (req, response) => {
  const {
    surname,
    firstName,
    middleName,
    suffix,
    sex,
    civilStatus,
    dateOfBirth,
    placeOfBirth,
    height,
    weight,
    bloodType,
    gsisIDNo,
    pagIbigIDNo,
    philhealthNo,
    sssNo,
    tinNo,
    agencyEmployeeNo,
    citizenship,
    telephoneNo,
    mobileNo,
    email,
    primaryAddress,
    residentialAddress,
  } = req.body;

  // Start a transaction
  if (!surname) {
    return response.status(400).json({ status: 'Error', message: 'Surname is required' });
  }

  // Insert into employees_info
  const employeeInfoSql = `
      INSERT INTO employees_info (
        ID, 
        surname, 
        firstName, 
        middleName, 
        suffix, 
        dateOfBirth, 
        placeOfBirth, 
        sex, 
        civilStatus, 
        height, 
        weight, 
        bloodType, 
        gsisIDNo, 
        pagIbigIDNo, 
        philhealthNo, 
        sssNo, 
        tinNo, 
        agencyEmployeeNo, 
        citizenship, 
        telephoneNo, 
        mobileNo, 
        email
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const employeeInfoValues = [
    null,
    surname,
    firstName,
    middleName,
    suffix,
    dateOfBirth,
    placeOfBirth,
    sex,
    civilStatus,
    height,
    weight,
    bloodType,
    gsisIDNo,
    pagIbigIDNo,
    philhealthNo,
    sssNo,
    tinNo,
    agencyEmployeeNo,
    citizenship,
    telephoneNo,
    mobileNo,
    email,
  ];

  // Insert into primary_address
  const primaryAddressSql = `
      INSERT INTO primary_address (
        addressID, 
        ID, 
        houseNo, 
        street, 
        subdivision, 
        barangay, 
        city, 
        province, 
        zipCode
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const primaryAddressValues = [
    null,
    null, // Placeholder for ID (employee ID)
    primaryAddress.houseNo,
    primaryAddress.street,
    primaryAddress.subdivision,
    primaryAddress.barangay,
    primaryAddress.city,
    primaryAddress.province,
    primaryAddress.zipCode,
  ];

  // Insert into residential_address
  const residentialAddressSql = `
      INSERT INTO residential_address (
        addressID, 
        ID, 
        houseNo, 
        street, 
        subdivision, 
        barangay, 
        city, 
        province, 
        zipCode
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const residentialAddressValues = [
    null,
    null, // Placeholder for ID (employee ID)
    residentialAddress.houseNo,
    residentialAddress.street,
    residentialAddress.subdivision,
    residentialAddress.barangay,
    residentialAddress.city,
    residentialAddress.province,
    residentialAddress.zipCode,
  ];

  // Insert data into employees_info
  db.query(employeeInfoSql, employeeInfoValues, (err, res) => {
    if (err) {
      // Roll back the transaction in case of an error
      console.error('Error inserting employee_info: ', err);
      db.rollback(() => {
        console.error('Transaction rolled back');
        return response.status(500).json({ status: 'Error', message: 'Internal server error' });
      });
    } else {
      // Get the last inserted ID (employee ID)
      const employeeID = res.insertId;

      // Update the placeholder values for primary and residential addresses
      primaryAddressValues[1] = employeeID;
      residentialAddressValues[1] = employeeID;

      // Insert data into primary_address
      db.query(primaryAddressSql, primaryAddressValues, (err, res) => {
        if (err) {
          // Roll back the transaction in case of an error
          console.error('Error inserting primary_address: ', err);
          db.rollback(() => {
            console.error('Transaction rolled back');
            return response.status(500).json({ status: 'Error', message: 'Internal server error' });
          });
        } else {
          // Insert data into residential_address
          db.query(residentialAddressSql, residentialAddressValues, (err, res) => {
            if (err) {
              // Roll back the transaction in case of an error
              console.error('Error inserting residential_address: ', err);
              db.rollback(() => {
                console.error('Transaction rolled back');
                return response.status(500).json({ status: 'Error', message: 'Internal server error' });
              });
            } else {
              // Commit the transaction if all inserts are successful
              db.commit((err) => {
                if (err) {
                  // Roll back the transaction in case of an error during commit
                  console.error('Error committing transaction: ', err);
                  db.rollback(() => {
                    console.error('Transaction rolled back');
                    return response.status(500).json({ status: 'Error', message: 'Internal server error' });
                  });
                } else {
                  console.log('Transaction committed successfully');
                  return response.json({ status: 'Success', message: 'Data inserted successfully' });
                }
              });
            }
          });
        }
      });
    }
  });
});

app.listen(8081, () => {
  console.log("Running");
});