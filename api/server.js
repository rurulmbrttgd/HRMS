import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "capstone_hris",
});

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
  const sql = `SELECT e.ID, CONCAT(e.firstName, ' ', e.surname) AS fullName, DATE_FORMAT(e.dateOfBirth, '%M %e, %Y') AS dateOfBirth, e.email, t.typeName, 
  GROUP_CONCAT(d.deptName ORDER BY d.deptName ASC SEPARATOR ', ') AS departments 
  FROM employees_personal_info AS e 
  LEFT JOIN type AS t ON e.typeID = t.ID 
  LEFT JOIN department_employee AS de ON e.ID = de.employeeID
  LEFT JOIN department AS d ON de.deptID = d.ID 
  GROUP BY e.ID, e.firstName, e.surname, e.dateOfBirth, e.email, t.typeName 
  ORDER BY e.ID`;

  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ status: 'Error', message: 'Internal server error' });
    } else {
      res.json({ status: 'Success', data });
    }
  });
});


{/*VIEWFORM */ }
app.get('/employee/:id', (req, res) => {
  const employeeId = req.params.id;

  const sql = `
      SELECT e.*,
             r.houseNo AS residentialHouseNo, r.street AS residentialStreet, r.subdivision AS residentialSubdivision,
             r.barangay AS residentialBarangay, r.city AS residentialCity, r.province AS residentialProvince, r.zipCode AS residentialZipCode,
             p.houseNo AS permanentHouseNo, p.street AS permanentStreet, p.subdivision AS permanentSubdivision,
             p.barangay AS permanentBarangay, p.city AS permanentCity, p.province AS permanentProvince, p.zipCode AS permanentZipCode,
             d.citizenshipType AS dualCitizenshipType, d.citizenshipCountry AS dualCitizenshipCountry,
             s.firstName AS spouseFirstName, s.surname AS spouseSurname, s.firstName AS spouseFirstName, s.middleName AS spouseMiddleName, s.suffix AS spouseSuffix, 
             s.occupation AS spouseOccupation, s.employerName AS spouseEmployerName, s.businessAddress AS spouseBusinessAddress, s.telephoneNo AS spouseTelNo,
             f.firstName AS fatherFirstName, f.surname AS fatherSurname, f.firstName AS fatherFirstName, f.middleName AS fatherMiddleName, f.suffix AS fatherSuffix,
             m.firstName AS motherFirstName, m.surname AS motherSurname, m.firstName AS motherFirstName, m.middleName AS motherMiddleName,
             c.name AS childName, c.dateOfBirth AS childDateOfBirth
             FROM employees_personal_info AS e
      LEFT JOIN residential_address AS r ON e.ID = r.employeeID
      LEFT JOIN permanent_address AS p ON e.ID = p.employeeID
      LEFT JOIN dual_citizenship AS d ON e.ID = d.employeeID
      LEFT JOIN spouse AS s ON e.ID = s.employeeID
      LEFT JOIN father AS f ON e.ID = f.employeeID 
      LEFT JOIN mother AS m ON e.ID = m.employeeID
      LEFT JOIN children AS c ON e.ID = c.employeeID
      WHERE e.ID = ?
    `;

  db.query(sql, [employeeId], (err, data) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ status: 'Error', message: 'Internal server error' });
    } else if (data.length === 0) {
      // If no employee with the specified ID is found
      res.status(404).json({ status: 'Error', message: 'Employee not found' });
    } else {
      // If the employee is found, send the data in the response
      res.json({ status: 'Success', data: data[0] });
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
    permanentAddress,
    residentialAddress,
    dualCitizenship,
    spouse,
    father,
    mother,
    children,
  } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return response
        .status(500)
        .json({ status: 'Error', message: 'Internal server error' });
    }

    const employeeInfoSql = `
      INSERT INTO employees_personal_info (
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

    db.query(employeeInfoSql, employeeInfoValues, (err, res) => {
      if (err) {
        console.error('Error inserting employee_info: ', err);
        db.rollback(() => {
          console.error('Transaction rolled back');
          return response.status(500).json({ status: 'Error', message: 'Internal server error' });
        });
      } else {
        const employeeID = res.insertId;

        const dualCitizenshipSql = `
          INSERT INTO dual_citizenship (
            ID,
            employeeID,
            citizenshipType,
            citizenshipCountry
          ) 
          VALUES (?, ?, ?, ?)
        `;

        const dualCitizenshipValues = [
          null,
          employeeID,
          dualCitizenship.citizenshipType,
          dualCitizenship.citizenshipCountry,
        ];

        db.query(dualCitizenshipSql, dualCitizenshipValues, (err, res) => {
          if (err) {
            console.error('Error inserting dual_citizenship: ', err);
            db.rollback(() => {
              console.error('Transaction rolled back');
              return response.status(500).json({ status: 'Error', message: 'Internal server error' });
            });
          } else {
            const permanentAddressSql = `
              INSERT INTO permanent_address (
                ID,
                employeeID,
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

            const permanentAddressValues = [
              null,
              employeeID,
              permanentAddress.houseNo,
              permanentAddress.street,
              permanentAddress.subdivision,
              permanentAddress.barangay,
              permanentAddress.city,
              permanentAddress.province,
              permanentAddress.zipCode,
            ];

            // Insert data into permanent_address
            db.query(permanentAddressSql, permanentAddressValues, (err, res) => {
              if (err) {
                // Roll back the transaction in case of an error
                console.error('Error inserting permanent_address: ', err);
                db.rollback(() => {
                  console.error('Transaction rolled back');
                  return response.status(500).json({ status: 'Error', message: 'Internal server error' });
                });
              } else {
                // Insert into residential_address
                const residentialAddressSql = `
                  INSERT INTO residential_address (
                    ID,
                    employeeID,
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
                  employeeID,
                  residentialAddress.houseNo,
                  residentialAddress.street,
                  residentialAddress.subdivision,
                  residentialAddress.barangay,
                  residentialAddress.city,
                  residentialAddress.province,
                  residentialAddress.zipCode,
                ];

                db.query(residentialAddressSql, residentialAddressValues, (err, res) => {
                  if (err) {
                    // Roll back the transaction in case of an error
                    console.error('Error inserting residential_address: ', err);
                    db.rollback(() => {
                      console.error('Transaction rolled back');
                      return response.status(500).json({ status: 'Error', message: 'Internal server error' });
                    });
                  } else {
                    const spouseInfoSql = `
                    INSERT INTO spouse (
                      ID,
                      employeeID,
                      firstName,
                      surname,
                      suffix,
                      middleName,
                      occupation,
                      employerName,
                      businessAddress,
                      telephoneNo
                    ) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  `;
                    const spouseInfoValues = [
                      null,
                      employeeID,
                      spouse.firstName,
                      spouse.surname,
                      spouse.suffix,
                      spouse.middleName,
                      spouse.occupation,
                      spouse.employerName,
                      spouse.businessAddress,
                      spouse.telephoneNo
                    ];
                    db.query(spouseInfoSql, spouseInfoValues, (err, res) => {
                      if (err) {
                        console.error('Error inserting father: ', err);
                        db.rollback(() => {
                          console.error('Transaction rolled back');
                          return response.status(500).json({ status: 'Error', message: 'Internal server error' });
                        });
                      } else {
                        const fatherInfoSql = `
                    INSERT INTO father (
                      ID,
                      employeeID,
                      firstName,
                      surname,
                      suffix,
                      middleName
                    ) 
                    VALUES (?, ?, ?, ?, ?, ?)
                  `;

                        const fatherInfoValues = [
                          null,
                          employeeID,
                          father.firstName,
                          father.surname,
                          father.suffix,
                          father.middleName,
                        ];

                        db.query(fatherInfoSql, fatherInfoValues, (err, res) => {
                          if (err) {
                            console.error('Error inserting father: ', err);
                            db.rollback(() => {
                              console.error('Transaction rolled back');
                              return response.status(500).json({ status: 'Error', message: 'Internal server error' });
                            });
                          } else {
                            const motherInfoSql = `
                        INSERT INTO mother (
                          ID,  
                          employeeID,
                          surname,
                          firstName,
                          middleName
                        ) 
                        VALUES (?, ?, ?, ?, ?)
                      `;

                            const motherInfoValues = [
                              null,
                              employeeID,
                              mother.surname,
                              mother.firstName,
                              mother.middleName,
                            ];

                            db.query(motherInfoSql, motherInfoValues, (err, res) => {
                              if (err) {
                                console.error('Error inserting mother: ', err);
                                db.rollback(() => {
                                  console.error('Transaction rolled back');
                                  response.status(500).json({ status: 'Error', message: 'Error inserting mother' });
                                });
                              } else {

                                const childrenInfoSql = `
                            INSERT INTO children (
                              ID,
                              employeeID,
                              name,  
                              dateOfBirth
                            ) 
                            VALUES (?, ?, ?, ?)
                          `;

                                const childrenInfoValues = [
                                  null,
                                  employeeID,
                                  children.name,
                                  children.dateOfBirth,
                                ];

                                db.query(childrenInfoSql, childrenInfoValues, (err, res) => {
                                  if (err) {
                                    console.error('Error inserting children: ', err);
                                    db.rollback(() => {
                                      console.error('Transaction rolled back');
                                      return response.status(500).json({ status: 'Error', message: 'Internal server error' });
                                    });
                                  } else {
                                    db.commit((err) => {
                                      if (err) {
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
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  });
});

app.delete("/employee/:id", (req, res) => {
  const employeeId = req.params.id;
  const dept = "DELETE FROM department_employee WHERE employeeID = ?";
  const residential = "DELETE FROM residential_address WHERE employeeID =?";
  const permanent = "DELETE FROM permanent_address WHERE employeeID =?";
  const citizen = "DELETE FROM dual_citizenship WHERE employeeID = ?";
  const q = "DELETE FROM employees_personal_info WHERE ID = ?";

  db.query(dept, [employeeId], (err, data) => {
    if (err) {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ error: "An error occurred while deleting the employee." });
    }
    return res.status(204).end(); // Respond with a 204 status for success.
  });

  db.query(residential, [employeeId], (err, data) => {
    if (err) {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ error: "An error occurred while deleting the employee." });
    }
    return res.status(204).end(); // Respond with a 204 status for success.
  });

  db.query(permanent, [employeeId], (err, data) => {
    if (err) {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ error: "An error occurred while deleting the employee." });
    }
    return res.status(204).end(); // Respond with a 204 status for success.
  });

  db.query(citizen, [employeeId], (err, data) => {
    if (err) {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ error: "An error occurred while deleting the employee." });
    }
    return res.status(204).end(); // Respond with a 204 status for success.
  });

  db.query(q, [employeeId], (err, data) => {
    if (err) {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ error: "An error occurred while deleting the employee." });
    }
    return res.status(204).end(); // Respond with a 204 status for success.
  });
});

app.listen(8081, () => {
  console.log("Running");
});