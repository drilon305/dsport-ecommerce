import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import CheckoutNavigation from './CheckoutNavigation'
import Details from '../settings/Details'
import Location from '../settings/Location'
import Shipping from './Shipping'

const useStyles = makeStyles(theme => ({
    stepContainer: {    
        width: '40rem',
        height: '25rem',
        backgroundColor: theme.palette.primary.main,
    },
    "@global": {
      ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottom: "2px solid #fff",
      },
      ".MuiInput-underline:after": {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
      },
    },
}))

export default function CheckoutPortal({ user }) {
  const classes = useStyles()
  const [selectedStep, setSelectedStep] = useState(0)
  const [detailValues, setDetailValues] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [detailSlot, setDetailSlot] = useState(0)
  const [locationValues, setLocationValues] = useState({
    state: "",
    zip: "",
    city: "",
    state: "",
  })
  const [locationSlot, setLocationSlot] = useState(0)
  const [locationBilling, setLocationBilling] = useState(false)
  const [detailBilling, setDetailBilling] = useState(false)

  const [errors, setErrors] = useState({})

  const [selectedShipping, setSelectedShipping] = useState(null)
  
  const shippingOptions = [{ label: 'FREE SHIPPING', price: 0}, { label: '2-DAY SHIPPING', price: 5.99}, 
  { label: 'OVERNIGHT SHIPPING', price: 19.99}]

  const steps = [
    {
      title: "Contact Info",
      component: (
        <Details
          user={user}
          values={detailValues}
          setValues={setDetailValues}
          slot={detailSlot}
          setSlot={setDetailSlot}
          errors={errors}
          setErrors={setErrors}
          checkout
          billing={detailBilling}
          setBilling={setDetailBilling}
        />
      ),
    },
    {
      title: "Address",
      component: (
        <Location
          user={user}
          values={locationValues}
          setValues={setLocationValues}
          slot={locationSlot}
          setSlot={setLocationSlot}
          errors={errors}
          setErrors={setErrors}
          billing={locationBilling}
          setBilling={setLocationBilling}
          checkout
        />
      ),
    },
    { title: "Shipping", component: <Shipping selectedShipping={selectedShipping}
     setSelectedShipping={setSelectedShipping} shippingOptions={shippingOptions} /> },
    { title: "Payment" },
    { title: "Confirmation" },
    { title: `Thanks, ${user.username}!` },
  ]

  return (
    <Grid item container alignItems="flex-end" direction="column" xs={6}>
      <CheckoutNavigation
        steps={steps}
        selectedStep={selectedStep}
        setSelectedStep={setSelectedStep}
      />
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        classes={{ root: classes.stepContainer }}
      >
        {steps[selectedStep].component}
      </Grid>
    </Grid>
  )
}