const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/*const employees = [
    { id: 1, name: 'John', surname: 'Doe', gender: 'Male', department: 'Engineering', salary: 50000 },
    { id: 2, name: 'Jane', surname: 'Smith', gender: 'Female', department: 'Marketing', salary: 60000 },
    { id: 3, name: 'Michael', surname: 'Brown', gender: 'Male', department: 'Finance', salary: 55000 },
    { id: 4, name: 'Emily', surname: 'Davis', gender: 'Female', department: 'Engineering', salary: 65000 },
    { id: 5, name: 'Anna', surname: 'Wilson', gender: 'Female', department: 'Marketing', salary: 62000 }
];*/

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Define your Employee schema and model here
const employeeSchema = new mongoose.Schema({
    name: String,
    surname: String,
    gender: String,
    department: String,
    salary: Number
});

const Employee = mongoose.model('Employee', employeeSchema);

// API routes
app.get('/api/employees/view', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/employees/add', async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        surname: req.body.surname,
        gender: req.body.gender,
        department: req.body.department,
        salary: req.body.salary
    });
    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/employees/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/employees/delete/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
