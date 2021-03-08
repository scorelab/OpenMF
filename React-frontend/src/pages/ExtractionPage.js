import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../components/core/Layout';
import DeviceItem from '../components/Extractor/DeviceItem';
import ExtractDataModal from '../components/Extractor/ExtractDataModal';
import { fetchLiveDevices, selectDevice } from '../store/actions/extraction';

const ExtractionPage = () => {
  const dispatch = useDispatch();
  const [showModal, toggleShowModal] = useState(false);
  const { isLoading, devices } = useSelector(state => state.extraction);

  useEffect(() => {
    dispatch(fetchLiveDevices());
  }, [dispatch]);

  const selectDeviceHandler = device => {
    toggleShowModal(true);
    dispatch(selectDevice(device));
  };

  return (
    <Layout>
      <div className='mt-4'>
        <h1>Live Devices</h1>
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          <div className='row'>
            {devices.map(device => (
              <DeviceItem
                device={device}
                onClick={() => selectDeviceHandler(device)}
              />
            ))}
          </div>
        )}
        <ExtractDataModal onToggle={toggleShowModal} isOpen={showModal} />
      </div>
    </Layout>
  );
};

export default ExtractionPage;
