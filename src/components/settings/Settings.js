import React, { useContext, useState, useEffect } from 'react'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import Details from './Details'
import Payments from './Payments'
import Location from './Location'
import Edit from './Edit'

import { UserContext } from '../../contexts'

const useStyles = makeStyles(theme => ({
    bottomRow: {
        borderTop: '4px solid #fff'
    },
    sectionContainer: {
        height: '50%'
    },
}))

const stripePromise = loadStripe(process.env.GATSBY_STRAPI_PK)

export default function Settings({ setSelectedSetting}) {
    const classes = useStyles()
    const { user, dispatchUser } = useContext(UserContext)
    const [edit, setEdit] = useState(false)
    const [changesMade, setChangesMade] = useState(false)
    const [detailValues, setDetailValues] = useState({
        name: "",
        phone: "",
        password: "********",
      })
       const [detailSlot, setDetailSlot] = useState(0) 
       const [detailErrors, setDetailErrors] = useState({})
       const [billingSlot, setBillingSlot] = useState(0)


      const [locationValues, setLocationValues] = useState({
        street: "",
        zip: "",
        city: "",
        state: "",
      })
      const [locationSlot, setLocationSlot] = useState(0) 
      const [locationErrors, setLocationErrors] = useState({})

      const allErrors = {...detailErrors, ...locationErrors}
      const isError = Object.keys(allErrors).some(error => allErrors[error] === true)
     
      useEffect(() => {
setDetailErrors({})
      }, [detailSlot])
    
     useEffect(() => {
          setLocationErrors({})
      }, [locationSlot])


    return (
      <>
        <Grid container classes={{ root: classes.sectionContainer }}>
          <Details
            user={user}
            edit={edit}
            setChangesMade={setChangesMade}
            values={detailValues}
            setValues={setDetailValues}
            slot={detailSlot}
            errors={detailErrors}
            setErrors={setDetailErrors}
            setSlot={setDetailSlot}
          />
          <Elements stripe={stripePromise}>
          <Payments
           user={user}
            edit={edit}
             slot={billingSlot} 
            setSlot={setBillingSlot} />
            </Elements>
        </Grid>
        <Grid
          container
          classes={{ root: clsx(classes.bottomRow, classes.sectionContainer) }}
        >
          <Location
            setChangesMade={setChangesMade}
            user={user}
            values={locationValues}
            setValues={setLocationValues}
            edit={edit}
            slot={locationSlot}
            errors={locationErrors}
            setErrors={setLocationErrors}
            setSlot={setLocationSlot}
          />
          <Edit
            user={user}
            dispatchUser={dispatchUser}
            setSelectedSetting={setSelectedSetting}
            changesMade={changesMade}
            edit={edit}
            setEdit={setEdit}
            details={detailValues}
            locations={locationValues}
            detailSlot={detailSlot}
            locationSlot={locationSlot}
            isError={isError}
          />
        </Grid>
      </>
    )
}