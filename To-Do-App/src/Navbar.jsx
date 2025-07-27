// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>To-Do App</h2>
      <ul className="nav-links">
        <li><Link to="/">Todos</Link></li>
        <li><Link to="/notes">Notes</Link></li>
        <li><Link to="/add">Add</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;