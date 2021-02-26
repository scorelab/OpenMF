import React from 'react';
import { Link } from 'react-router-dom';

const SidebarTile = ({ route, label, icon }) => {
  return (
    <Link className='text-dark' to={route}>
      <p className='lead text-center'>
        <i className={`mr-3 fas ${icon}`}></i>
        <strong>{label}</strong>
      </p>
      <hr />
    </Link>
  );
};

export default SidebarTile;
