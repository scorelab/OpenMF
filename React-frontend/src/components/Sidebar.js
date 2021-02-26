import React from 'react';

import SidebarTile from './core/SidebarTile';

const Sidebar = () => {
  return (
    <div className='sidebar-container'>
      <div className='sidebar'>
        <SidebarTile route='/' icon='fa-home' label='Home' />
        <SidebarTile route='/about' icon='fa-user' label='About' />
        <SidebarTile route='/contact' icon='fa-phone' label='Contact' />
        <SidebarTile route='/admin' icon='fa-users' label='Admin' />
      </div>
    </div>
  );
};
export default Sidebar;
