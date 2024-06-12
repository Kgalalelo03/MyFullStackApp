import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Employees from './components/Employees';
import Department from './components/Department';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/employees">All Employees</Link></li>
            <li><Link to="/department/engineering">Engineering</Link></li>
            <li><Link to="/department/marketing">Marketing</Link></li>
            <li><Link to="/department/finance">Finance</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/department/:departmentName" element={<Department />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
