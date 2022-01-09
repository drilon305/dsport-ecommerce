import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import TextField from  '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles } from '@material-ui/core/styles'

import validate from '../ui/validate'

import accountIcon from "../../images/account.svg"
import EmailAdornment from "../../images/EmailAdornment"
import PasswordAdornment from "../../images/password-adornment.svg"
import HidePasswordIcon from "../../images/hide-password.svg"
import ShowPasswordIcon from "../../images/show-password.svg"
import addUserIcon from "../../images/add-user.svg"
import forgotPasswordIcon from "../../images/forgot.svg"
import close from "../../images/close.svg"

const useStyles = makeStyles(theme => ({
    emailAdornment: {
        width: 22,
        height: 17,
        marginBottom: 10,
    },
    accountIcon: {
      marginTop: '2rem'
    },
    textField: {
      width: '20rem',
    },
    input: {
      color: theme.palette.secondary.main,
    },
    login: {
      width: '20rem',
      borderRadius: 50,
      textTransform: 'none',
    },
    fbText: {
      fontSize: '1.5rem',
      fontWeight: 700,
      textTransform: 'none',
    },
    fbButton: {
      marginTop: '-1rem',
    },
    visibleIcon: {
      padding: 0,
    },
    passwordError: {
      marginTop: 0
    },
    "@global": {
      ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
      },
      ".MuiInput-underline:after": {
        borderBottom: `2px solid ${theme.palette.primary.main}`,
      },
    },
}))

export default function Login() {
    const classes = useStyles()

  const [values, setValues] = useState({
    email: '',
    password: ''
  })
    const [errors, setErrors] = useState({})
    const [visible, setVisible] = useState(false)

  const fields = {
    email: {
      helperText: 'invalid email',
      placeholder: 'Email',
      type: 'text',
      startAdornment: (
        <span className={classes.emailAdornment}>
          <EmailAdornment />
        </span>
      ),
    },
    password: {
      helperText: 'your password must be at least 8 characters and include one uppercase letter, one number, and special character',
      placeholder: 'Password',
      type: visible ? 'text' : 'password',
      startAdornment: <img src={PasswordAdornment} alt='password' />,
      endAdornment: (
        <img src={visible ? ShowPasswordIcon : HidePasswordIcon} alt={`${visible ? 'Show' : 'Hidde'} Password`} />
      ),
    }
  }

  return (
    <>
      <Grid item classes={{root: classes.accountIcon}}>
        <img src={accountIcon} alt="login page" />
      </Grid>
      {Object.keys(fields).map(field => {
       const validateHelper = event => {
       const valid = validate({[field]: event.target.value })
       setErrors({...errors, [field]: !valid[field] })
}

      return (
      <Grid item key={field}>
        <TextField
          value={values[field]}
          onChange={e => {
            if (errors[field]) {
              validateHelper(e)
            }
            setValues({ ...values, [field]: e.target.value })
          }}
          placeholder={fields[field].placeholder}
          onBlur={e => validateHelper(e)}
          error={errors[field]}
          helperText={errors[field] && fields[field].helperText}
          type={fields[field].type}
          classes={{ root: classes.textField }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <span className={classes.emailAdornment}>
                  {fields[field].startAdornment}
                </span>
              </InputAdornment>
            ),
            endAdornment: fields[field].endAdornment ? (
              <InputAdornment position='end'>
                <IconButton classes={{ root: classes.visibleIcon }} onClick={() => setVisible(!visible)}>
                  {fields[field].endAdornment}
                </IconButton>

              </InputAdornment>
            ) : undefined,
            classes: { input: classes.input }
          }}
        />
      </Grid>
      )
      })}

      <Grid item>
        <Button variant='contained' color='secondary' classes={{root: classes.login}}>
          <Typography variant='h5'>
            login
          </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button classes={{root: clsx(classes.fbButton, {
            [classes.passwordError]: errors.password 
          })}}>
            <Typography variant='h3' classes={{root: classes.fbText}}>
              Login with Facebook
            </Typography>
          </Button>
        </Grid>
        <Grid item container justifyContent='space-between'>
          <Grid item>
            <IconButton>
              <img src={addUserIcon} alt='sign up' />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <img src={forgotPasswordIcon} alt='forgot password' />
            </IconButton>
          </Grid>
        </Grid>
      </>
    )
}