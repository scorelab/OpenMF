/*
* Page to display Page Not Found (i.e. 404) error.
*/

// Import Dependecies
import React, { useEffect } from 'react'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


// Custom Styles
const useStyles = makeStyles((theme) => ({
  header: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(8, 0, 6)
  }
}))


// Main NotFound Component
function NotFound () {

  // Invoking custom styles
  const classes = useStyles()

  // History object
  const history = useHistory()

  // useEffect to change title
  useEffect(() => {
    document.title = 'Not Found - OpenMF '
  })

  // Main return statement
  return (
    <Container maxWidth="lg" className={classes.header}>
      <Typography variant="h1" align="center" gutterBottom>
        404 Not Found
      </Typography>
      <Typography
        variant="h4"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        Sorry, Requested page not found
      </Typography>
      <Button
        color="secondary"
        onClick={() => history.push('/')}
      >
          Go To Home
      </Button>
    </Container>
  )
}


export default NotFound