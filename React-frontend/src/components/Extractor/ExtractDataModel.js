/*
 Functional model component to render
 Extract Data Form
*/

// Import Depedencies
import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide
} from '@material-ui/core';
import ExtractDataForm from './ExtractDataForm';


// Transitionn component
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
})


// Extract Data Model
function ExtractDataModel({isOpen, toggleExtractDataModel}) {

   
  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => toggleExtractDataModel(false)}
        aria-labelledby="Extract Data Model"
        aria-describedby="Extract Data Model"
      >
        <DialogTitle id="extractDataModel">Extract Data And Create Case</DialogTitle>
        <DialogContent>
            <ExtractDataForm toggleExtractDataModel={toggleExtractDataModel}/>
        </DialogContent>
        <DialogActions>

          <Button
            color="primary"
            variant="outlined"
            onClick={() => toggleExtractDataModel(false)}
          >
            Cancel
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ExtractDataModel

