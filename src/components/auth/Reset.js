import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

import { setSnackbar } from '../../contexts/actions'
import Fields from './Fields'
import { EmailPassword } from './Login'

import accountIcon from '../../images/account.svg'

const useStyles = makeStyles(theme => ({
    reset: {
        width: '20rem',
        borderRadius: 50,
        textTransform: 'none',
        marginBottom: '4rem'
    },
    icon: {
        marginTop: '2rem'
    },
}))

export default function Reset({ steps, setSelectedStep, dispatchFeedback }) {
    const classes = useStyles()
    const [visible, setVisible] = useState(false)
    const [values, setValues] = useState({ password: '', confirmation: ''})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const { password } = EmailPassword(classes, true, false, visible, setVisible)

    const fields = { password, confirmation: { ...password, placeholder: 'Confirm Password' }}
    
    const handleReset = () => {
        setLoading(true)
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        axios.post(process.env.GATSBY_STRAPI_URL + '/auth/reset-password', {
            code,
            password: values.password,
            passwordConfirmation: values.confirmation
        }).then(response => {
            setLoading(false)
            dispatchFeedback(setSnackbar({ status: 'sucess', message: 'Password Reset Successfully'}))

            setTimeout(() => {
                window.history.replaceState(null, null, window.location.pathname)

                const login = steps.find(step => step.label === 'Login')
                setSelectedStep(steps.indexOf(login))
            }, 6000)
        }).catch(error => {
            setLoading(false)
            console.error(error)
            const { message } = error.response.data.message[0].messages[0]
            dispatchFeedback(setSnackbar({ status: 'error', message}))
        })

    }

    const disabled = Object.keys(errors).some(error => errors[error] === true) ||
        Object.keys(errors).length !== Object.keys(values).length || values.password !== values.confirmation

    return (
        <>
            <Grid item classes={{ root: classes.icon }}>
                <img src={accountIcon} alt='reset password page' />
            </Grid>
            <Fields fields={fields} errors={errors}
                setErrors={setErrors} values={values} setValues={setValues} />
            <Grid item>
                <Button
                    variant='contained'
                    color='secondary'
                    disabled={disabled}
                    classes={{ root: classes.reset }}
                    onClick={handleReset}
                >
                    {loading ? <CircularProgress /> : (
                        <Typography variant='h5'>
                            reset password
                        </Typography>)}

                </Button>
            </Grid>
        </>
    )
}