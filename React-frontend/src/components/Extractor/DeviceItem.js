import React from 'react';

import DeviceImage from '../../images/Dashboard/device.png';

const DeviceItem = ({ device, onClick }) => {
  return (
    <div className='col-lg-2 m-3' align='center'>
      <img src={DeviceImage} alt='Device' height='100px' />
      <p className='lead'>{device.device_codename}</p>
      <button className='btn btn-success btn-sm' onClick={onClick}>
        Extract Data
      </button>
    </div>
  );
};

export default DeviceItem;
