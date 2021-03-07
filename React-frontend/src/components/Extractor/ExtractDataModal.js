import React, { useReducer } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { extractData } from '../../store/actions/extraction';
import Dropdown from '../core/Dropdown';
import formReducer from '../../utils/formReducer';
import { setAlert } from '../../store/actions/alerts';

const ExtractDataModal = ({ isOpen, onToggle }) => {
  const dispatch = useDispatch();
  const options = ['all', 'facebook', 'whatsapp', 'phone', 'report'];
  const initialFormData = {
    case_name: '',
    data: options[0],
  };

  const [formData, setFormData] = useReducer(formReducer, initialFormData);
  const { isLoading, currentDevice } = useSelector(state => state.extraction);

  const extractDataHandler = () => {
    if (!formData.case_name) {
      dispatch(setAlert('Please enter case name', 'warning'));
      return;
    }
    const config = {
      device_id: currentDevice.transpot_id,
      ...formData,
    };
    dispatch(extractData(config, () => onToggle(false)));
  };

  return (
    <MDBModal isOpen={isOpen}>
      <MDBModalHeader>Extract Data</MDBModalHeader>
      <MDBModalBody>
        {isLoading ? (
          <p className='lead'>Extracting data</p>
        ) : (
          <div className='col' align='center'>
            <MDBInput
              name='case_name'
              label='Enter Case Name'
              value={formData.case_name}
              required
              onChange={event => setFormData(event.target)}
            />
            <Dropdown
              name='data'
              value={formData.data}
              label='Select type of data'
              options={options}
              onChange={event => setFormData(event.target)}
            />
          </div>
        )}
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn
          disabled={isLoading}
          color='secondary'
          onClick={() => onToggle(false)}>
          Cancel
        </MDBBtn>
        <MDBBtn
          disabled={isLoading}
          color='primary'
          onClick={extractDataHandler}>
          Extract Data
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
};

export default ExtractDataModal;
