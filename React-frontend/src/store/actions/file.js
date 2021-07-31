/*
    Action and Action generators for File Reducer.
*/

import {
  DEFAULT_STATE,
    LOAD_FILE,
    LOAD_FILE_FAILED,
    LOAD_FILE_SUCCESSFULL
} from "../types/file";
import axios from '../../axios';
import { parse } from 'papaparse';



// ++++++++++++++ Utility functions ++++++++++++++++++++

// function to create config object
const createConfig = (token) => {

    //// create object
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    //// return object
    return config
  }

// ++++++++++++++++++++++++++++++++++++++++++++++++


// Action generator for default state
export const loadDefaultFileState = () => (dispatch) => {
  dispatch({
    type: DEFAULT_STATE
  })
}

// Action generator for load a file
export const loadfile = (file_pathname, fileType) => (dispatch) => {

  // cases loading
  dispatch({
      type: LOAD_FILE
  })

  // create request body data object
  const data = {
    file_pathname: file_pathname
  }

  // get jwt token and attach with config
  const token = localStorage.getItem('openmf_token')

  // check if token exists or not
  if(!token){
    dispatch({
        type: LOAD_FILE_FAILED,
        payload: {
            error: 'Unauthorized, Please logged in.'
        }
    })
    return
  }

  // get config object
  const config = createConfig(token)

  // set responseType to the config object
  config['responseType'] = 'blob'

  // send get request to server
  axios.post('/case/get-file',data,config)
      .then(async (res) => {

        // convert blob to readable stream
        try{
          const stream = await res.data.text()

          // parse the data
          let parsedData = null
          if(fileType === 'tsv'){
            parse(stream, {
              download: false,
              skipEmptyLines: true,
              complete: function(res, data){
                parsedData = res
              }
            })
          }


          // dispatch successful result
          dispatch({
            type: LOAD_FILE_SUCCESSFULL,
            payload: {
              file: stream,
              fileType: fileType,
              parsedData: parsedData
            }
          })

        }

        // handle blob conversion error
        catch(err){

          // dispatch fail with error message
          dispatch({
            type: LOAD_FILE_FAILED,
            payload: err.message
          })
        }

      })

      // Handle request error
      .catch((err) => {
          dispatch({
              type: LOAD_FILE_FAILED,
              payload: {
                  error: err.message
              }
          })
      })
}