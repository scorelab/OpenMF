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
import TaskUpdateForm from './TaskUpdateForm';

// Transitionn component
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
})



// Add member model
function TaskUpdateModel({isOpen, toggleUpdateTaskModel, task}) {

    console.log(task);

  return (
    <div>
        
      <Dialog
      suppressContentEditableWarning={true}
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => toggleUpdateTaskModel(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Task Update Form</DialogTitle>
        <DialogContent>
            <DialogContentText >Update Task Details</DialogContentText>
            <TaskUpdateForm
                toggleUpdateTaskModel={toggleUpdateTaskModel} 
                task={task}
                />
        </DialogContent>
        <DialogActions>

          <Button
            color="primary"
            variant="outlined"
            onClick={() => toggleUpdateTaskModel(false)}
          >
            Cancel
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  )
}

export default TaskUpdateModel

