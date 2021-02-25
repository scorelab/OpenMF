import React from 'react';

const StatsCard = ({ image, upperText, lowerText }) => {
  return (
    <div className='card my-3'>
      <div className='row py-3 px-4'>
        <div className='col-4'>
          <img src={image} alt='Image' height='90px' width='90px' />
        </div>
        <div className='col-8'>
          <p className='lead'>{upperText}</p>
          <p className='display-4'>{lowerText}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
