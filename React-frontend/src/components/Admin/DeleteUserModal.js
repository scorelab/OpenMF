/*
 Function model component to confirm
 delete process

*/
import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMember } from '../../store/actions/admin';
import { useHistory } from 'react-router-dom';


// Transitionn component
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
})



// Delete Confirmation model
function DeleteUserModal({isOpen, toggleShowDeleteModel}) {

  // Get selected member from admin reducer
  const member= useSelector(state => state.admin.selected_user)

  // history
  const history = useHistory()

  // dispatcher
  const dispatch = useDispatch()

  // delete user handler
  const handleDeleteMember = () => {
    dispatch(deleteMember(member.email, history))
    toggleShowDeleteModel(false)
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => toggleShowDeleteModel(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Confirmation Process</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this member?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => toggleShowDeleteModel(false)}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleDeleteMember}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteUserModal

