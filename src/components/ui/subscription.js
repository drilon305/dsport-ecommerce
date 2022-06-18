import React, { useState, useContext } from 'react'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import useMediaQuery  from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'

import QtyButton from '../product-list/QtyButton'
import SelectFrequency from './select-frequency'

import { CartContext, FeedbackContext, UserContext } from '../../contexts'
import { setSnackbar, addToCart, toggleSubsciption, toggleSubscriptions } from '../../contexts/actions'

import SubscriptionIcon from '../../images/Subscription'


const useStyles = makeStyles(theme => ({
    iconWrapper: {
        height: ({ size }) => `${size || 2}rem`,
        width: ({ size }) => `${size || 2}rem`,
    },
    row: {
        height: '4rem',
        padding: '0 0.5rem',
        [theme.breakpoints.down('xs')]: {
          height: 'auto'
        },
    },
    light: {
        backgroundColor: theme.palette.primary.main
    },
    dark: {
        backgroundColor: theme.palette.secondary.main
    },
    iconButton: {
        padding: ({ noPadding }) => noPadding ?  0 : undefined,
    },
    cartButton: {
        height: '8rem',
        borderRadius: 0,
        width: '100%',
        [theme.breakpoints.down('xs')]: {
          height: 'auto'  
          },
    },
    cartText: {
        color: '#fff',
        fontSize: '4rem',
        [theme.breakpoints.down('sm')]: {
          fontSize: '3.2rem'
        },
        [theme.breakpoints.down('xs')]: {
          fontSize: '1.8rem'
        },
    },
    dialog: {
        borderRadius: 0,
        backgroundColor: theme.palette.primary.main
    },
    buttonWrapper: {
      width: '100%'
    },
}))

export default function Subscription({
  size,
  stock,
  selectedVariant,
  variant,
  name,
  color,
  isCart,
  noPadding,
  cartFrequency
}) {
  const classes = useStyles({ size, noPadding })
  const [open, setOpen] = useState(false)
  const [qty, setQty] = useState(1)
  const [frequency, setFrequency] = useState( "Month")
  const { dispatchFeedback } = useContext(FeedbackContext)
  const { dispatchCart } = useContext(CartContext)
  const { user } = useContext(UserContext)
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down('xs'))

 

  const handleCart = () => {
    dispatchCart(addToCart(variant, qty, name, stock[selectedVariant].qty, cartFrequency))
    setOpen(false)
    dispatchFeedback(setSnackbar({ status: 'success', message: 'Subscription Added To Cart.'}))
  }

  const handleOpen = () => {
    if(isCart) {
      dispatchCart(toggleSubscriptions(isCart.variant, frequency))
      return
    }

    if (user.username === 'Guest') {
      dispatchFeedback(setSnackbar({ status: 'error', message: 'You must be logged in to create a subscription.'}))
      return
    } else {
    setOpen(true)
    }
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        classes={{ root: classes.iconButton }}
      >
        <span className={classes.iconWrapper}>
          <SubscriptionIcon color={color} />
        </span>
      </IconButton>
      <Dialog
      fullScreen={matchesXS}
        fullWidth
        maxWidth="md"
        open={open}
        onClose={() => setOpen(false)}
        classes={{ paper: classes.dialog }}
      >
        <Grid container direction="column" alignItems='center'>
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
            classes={{ root: clsx(classes.row, classes.dark) }}
          >
            <Grid item>
              <Typography variant="h4">Quantity</Typography>
            </Grid>
            <Grid item>
              <QtyButton
                stock={stock}
                override={{ value: qty, setValue: setQty}}
                selectedVariant={selectedVariant}
                white
                hideCartButton
                round
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            alignItems={matchesXS ? "flex-start" : "center"}
            direction={matchesXS ? 'column' : 'row'}
            justifyContent="space-between"
            classes={{ root: clsx(classes.row, classes.light) }}
          >
            <Grid item>
              <Typography variant="h4">Deliver Every</Typography>
            </Grid>
            <Grid item>
             <SelectFrequency value={frequency} setValue={setFrequency} />
            </Grid>
          </Grid>
          <Grid item classes={{root: classes.buttonWrapper}}>
            <Button
              variant="contained"
              onClick={handleCart}
              color="secondary"
              disabled={qty === 0}
              classes={{ root: classes.cartButton }}
            >
              <Typography variant="h1" classes={{ root: classes.cartText }}>
                Add Subscription To Cart
              </Typography>
            </Button>
          </Grid>
          {matchesXS && (
          <Grid item>
            <Button onClick={() => setOpen(false)}>
              <Typography  variant='body2'>
                Cancel
              </Typography>
            </Button>
          </Grid>
          )}
        </Grid>
      </Dialog>
    </>
  )
}