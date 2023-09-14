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
    database: "capstone_hris"
})

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

app.get('/employee', (req, res) => {
    const sql = `SELECT e.ID, CONCAT(e.firstName, ' ', e.surname) AS fullName, DATE_FORMAT(e.dateOfBirth, '%M %e, %Y') AS dateOfBirth, e.email, t.typeName, GROUP_CONCAT(d.deptName ORDER BY d.deptName ASC SEPARATOR ', ') AS departments FROM employees AS e INNER JOIN type AS t ON e.typeID = t.ID JOIN department_employee AS de ON e.ID = de.employeeID JOIN department AS d ON de.deptID = d.ID GROUP BY e.ID, e.firstName, e.surname, e.dateOfBirth, e.email, t.typeName ORDER BY e.ID`;

    db.query(sql, (err, data) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ status: 'Error', message: 'Internal server error' });
      } else {
        res.json({ status: 'Success', data });
      }
    });
  });
  


app.listen(8081, () => {
    console.log("Running");
})