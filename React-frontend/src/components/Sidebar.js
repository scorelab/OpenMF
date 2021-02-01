import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <Link className="myLink" to="/">
          <div className="sidebar-link">Home</div>
        </Link>
        <Link className="myLink" to="/about">
          <div className="sidebar-link">About</div>
        </Link>
        <Link className="myLink" to="/contact">
          <div className="sidebar-link">Contact</div>
        </Link>
      </div>
    </div>
  );
};
export default Sidebar;
