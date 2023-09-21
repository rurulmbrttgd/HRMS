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
    methods: ["POST", "GET"],
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
  } = req.body;

  // Start a transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return response
        .status(500)
        .json({ status: 'Error', message: 'Internal server error' });
    }

    // Insert into employees_personal_info
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

        // Insert into dual_citizenship
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
            // Roll back the transaction in case of an error
            console.error('Error inserting dual_citizenship: ', err);
            db.rollback(() => {
              console.error('Transaction rolled back');
              return response.status(500).json({ status: 'Error', message: 'Internal server error' });
            });
          } else {
            // Update the placeholder values for permanent and residential addresses
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
      }
    });
  });
});

app.listen(8081, () => {
  console.log("Running");
});