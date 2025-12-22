const express = require("express");
const router = express.Router();
const mysql=require('mysql');
const db =mysql.createConnection({
    host:'',
    user:'root',
    password:'',
    database:'ESMs'
});
db.connect((err) =>{
    if(err) return console.log('Not connected to MYSQL Server:',err);
    else{
        console.log('CONNECTED TO MYSQL SERVER https://localhost:9000')
    }
})


// GET all students
router.get("/students", (req, res) => {
db.query("SELECT * FROM students", (err, results) => {
if (err) return res.status(500).send(err);
res.json(results);
});
});


// ADD Student
router.post("/students", (req, res) => {
const { option_code,first_name,last_name,gender,dob,father_names,mother_names,district} = req.body;
const sql = "INSERT INTO students( option_code,first_name,last_name,gender,dob,father_names,mother_names,district)values(?,?,?,?,?,?,?,?)";
db.query(sql,[ option_code,first_name,last_name,gender,dob,father_names,mother_names,district], (err, result) => {
if (err) return res.status(500).send(err);
res.json({ message: "Student added", id: result.insertId });
});
});


// UPDATE Student
router.put("/students/:s_id", (req, res) => {
const { s_id } = req.params;
const data = req.body;
const sql = "UPDATE students SET ? WHERE s_id = ?";


db.query(sql, [data, s_id], (err) => {
if (err) return res.status(500).send(err);
res.json({ message: "Student updated" });
});
});


// DELETE Student
router.delete("/students/:s_id", (req, res) => {
const { s_id } = req.params;
db.query("DELETE FROM students WHERE s_id = ?", s_id, (err) => {
if (err) return res.status(500).send(err);
res.json({ message: "Student deleted" });
});
});
//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// GET all students
router.get("/options", (req, res) => {
db.query("SELECT * FROM options", (err, results) => {
if (err) return res.status(500).send(err);
res.json(results);
});
});


// ADD Student
router.post("/options", (req, res) => {
const { option_code,option_name,class_name} = req.body;
const sql = "INSERT INTO options( option_code,option_name,class_name)values(?,?,?)";
db.query(sql,[option_code,option_name,class_name], (err, result) => {
if (err) return res.status(500).send(err);
res.json({ message: "Student added", id: result.insertId });
});
});


// UPDATE Student
router.put("/options/:option_code", (req, res) => {
const { option_code } = req.params;
const data = req.body;
const sql = "UPDATE options SET ? WHERE option_code = ?";


db.query(sql, [data, option_code], (err) => {
if (err) return res.status(500).send(err);
res.json({ message: "Option updated" });
});
});


// DELETE Student
router.delete("/options/:option_code", (req, res) => {
const { option_code } = req.params;
db.query("DELETE FROM options WHERE option_code = ?", option_code, (err) => {
if (err) return res.status(500).send(err);
res.json({ message: "Option deleted" });
});
});
module.exports = router;