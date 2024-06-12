const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Get all employees
router.get('/view', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get employees by department
router.get('/department/:departmentName', async (req, res) => {
  try {
    const employees = await Employee.find({ department: req.params.departmentName });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new employee
router.post('/add', async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    surname: req.body.surname,
    gender: req.body.gender,
    department: req.body.department,
    salary: req.body.salary,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing employee
router.put('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    Object.assign(employee, req.body);
    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    await employee.remove();
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
