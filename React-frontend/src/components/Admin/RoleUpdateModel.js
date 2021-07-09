/*
 Functional model component to render
 role update form
*/
import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Slide
} from '@material-ui/core';
import RoleUpdateForm from './RoleUpdateForm';

// Transitionn component
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
})



// Add member model
function RoleUpdateModel({isOpen, toggleUpdateRoleModel}) {

  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => toggleUpdateRoleModel(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Role Update Form</DialogTitle>
        <DialogContent>
            <DialogContentText >Enter Member's Password</DialogContentText>
            <RoleUpdateForm toggleUpdateRoleModel={toggleUpdateRoleModel} />
        </DialogContent>
        <DialogActions>

          <Button
            color="primary"
            variant="outlined"
            onClick={() => toggleUpdateRoleModel(false)}
          >
            Cancel
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  )
}

export default RoleUpdateModel

