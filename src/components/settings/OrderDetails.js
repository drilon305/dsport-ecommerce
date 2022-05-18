import React from 'react'
import Grid from '@material-ui/core/Grid'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    drawer: {
        height: '100%',
        width: '30rem',
        backgroundColor: theme.palette.primary.main

    },
}))

export default function OrderDetails({ open, setOpen}) {
    const classes = useStyles()

    const iOS =
  typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
      <SwipeableDrawer
        open={!!open}
        onOpen={() => null}
        anchor='right'
        onClose={() => setOpen(null)}
        classes={{ paper: classes.drawer }}
        disableBackdropTransition={!iOS} disableDiscovery={iOS}
      ></SwipeableDrawer>
    )
}