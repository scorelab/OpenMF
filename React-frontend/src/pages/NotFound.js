// Page to display Page Not Found (i.e. 404) error.
import React, { useEffect } from 'react'

import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

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

function NotFound () {
  const classes = useStyles()
  const history = useHistory()

  useEffect(() => {
    document.title = 'Not Found - OpenMF '
  })

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