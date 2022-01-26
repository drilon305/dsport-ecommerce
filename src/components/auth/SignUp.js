import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles } from '@material-ui/core/styles'

import Fields from './Fields'
import { EmailPassword } from './Login'
import { setUser, setSnackbar } from '../../contexts/actions'


import addUserIcon from '../../images/add-user.svg'
import nameAdornment from '../../images/name-adornment.svg'
import forward from '../../images/forward-outline.svg'
import backward from '../../images/backwards-outline.svg'

const useStyles = makeStyles(theme => ({
    addUserIcon: {
        height: '9rem',
        width: '10rem',
        marginTop: '5rem'
    },
      navigation: {
        height: '4rem',
        width: '4rem'
      },
      visibleIcon: {
        padding: 0,
      },
      signUp: {
        width: '20rem',
        borderRadius: 50,
        marginTop: '-3rem',
       
        [theme.breakpoints.down('xs')]: {
            width: '15rem',
        },
      },
      hideButton: {
         display: 'none',
      },
      signUpText: {
        textTransform: 'none',
        fontSize: '1.5rem',
        [theme.breakpoints.down("xs")]: {
            fontSize: "1.25rem",
          },
        },
      emailAdornment: {
        width: 22,
        height: 17,
        marginBottom: 10,
    },
    removeBtnMargin: {
        marginTop: 0,
    },
}))

export default function SignUp({ steps, setSelectedStep, dispatchUser, dispatchFeedback }) {
    const classes = useStyles()
    const [values, setValues] = useState({
        email: '',
        password: '',
        name: ''
    })
    const [errors, setErrors] = useState({})
    const [visible, setVisible] = useState(false)
    const [info, setInfo] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleNavigate = direction => {
        if(direction === 'forward') {
            setInfo(true)
        } else {
            if(info) {
                setInfo(false)
            } else {
                const login = steps.find(step => step.label === 'Login');
                setSelectedStep(steps.indexOf(login))
            }
           
        }
    }

    const handleComplete = () => {
        setLoading(true)

        axios.post(process.env.GATSBY_STRAPI_URL + '/auth/local/register', {
            username: values.name,
            email: values.email,
            password: values.password
        }).then(response => {
            setLoading(false)
            dispatchUser(setUser({ ...response.data.user, jwt: response.data.jwt}))
            const complete = steps.find(step => step.label === 'Complete')
           
            setSelectedStep(steps.indexOf(complete))
        }).catch(error => {
            const { message } = error.response.data.message[0].messages[0]
            setLoading(false)
            console.error(error)
            dispatchFeedback(setSnackbar({ status: 'error', message}))
        })

      
    }

    const nameField = { name: {
        helperText: 'you must enter a name' ,
        placeholder: 'Name',
        startAdornment: (
            <img src={nameAdornment} alt='name' />

        )  
    }}


    const fields = info ? EmailPassword(classes, false, false, visible, setVisible) : nameField

    const disabled = Object.keys(errors).some(error => errors[error] === true) ||
        Object.keys(errors).length !== Object.keys(values).length

    return (
        <>
        <Grid item>
            <img src={addUserIcon} alt='new user' className={classes.addUserIcon} />
        </Grid>
            <Fields fields={fields} errors={errors} setErrors={setErrors} values={values} setValues={setValues} />
            <Grid item>
                <Button
                disabled={loading || info && disabled}
                onClick={() => info ? handleComplete() : null} 
                variant='contained'
                color='secondary'
                classes={{
                root: clsx(classes.signUp, {
                    [classes.hideButton]: info === false,
                }),
                }}
                >
                    {loading ? <CircularProgress /> : (
                        <Typography variant='h5' classes={{ root: classes.signUpText }}>
                       Sign Up
                    </Typography>
                    )}
                    
                </Button>
            </Grid>
            <Grid item container justifyContent='space-between'>
                <Grid item>
                    <IconButton onClick={() => handleNavigate('backward')}>
                        <img src={backward} alt='back to login' className={classes.navigation} />
                    </IconButton>
                </Grid>
                {info ? null : (
                    <Grid item>
                    <IconButton onClick={() => handleNavigate('forward')}>
                        <img src={forward} alt='continue registration' className={classes.navigation} />
                    </IconButton>
                </Grid>
                )}
                
            </Grid>
        </>
    )
}