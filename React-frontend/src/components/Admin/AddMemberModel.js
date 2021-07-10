/*
 Function model component to render
 add member form
*/
import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide
} from '@material-ui/core';
import AddMemberForm from './AddMemberForm';


// Transitionn component
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
})



// Add member model
function AddMemberModel({isOpen, toggleAddMemberModel}) {

  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => toggleAddMemberModel(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Add New Member</DialogTitle>
        <DialogContent>
            <AddMemberForm toggleAddMemberModel={toggleAddMemberModel}/>
        </DialogContent>
        <DialogActions>

          <Button
            color="primary"
            variant="outlined"
            onClick={() => toggleAddMemberModel(false)}
          >
            Cancel
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddMemberModel

