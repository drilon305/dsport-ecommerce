import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import TextField from  '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles } from '@material-ui/core/styles'

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
  
}))

export default function Login() {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)

  return (
    <>
      <Grid item>
        <img src={accountIcon} alt="login page" />
      </Grid>
      <Grid item>
        <TextField
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          classes={{ root: classes.textField }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <span className={classes.emailAdornment}>
                  <EmailAdornment />
                </span>
              </InputAdornment>
            ),
            classes: { input: classes.input }
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          classes={{ root: classes.textField }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <span className={classes.emailAdornment}>
                  <img src={PasswordAdornment} alt='password' />
                </span>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <img src={visible ? ShowPasswordIcon : HidePasswordIcon} alt={`${visible ? 'Show' : 'Hidde'} Password`} />
              </InputAdornment>
            ),
            classes: { input: classes.input }
          }}
        />
      </Grid>
      <Grid item>
        <Button variant='contained' color='secondary'>
          <Typography variant='h5'>
            login
          </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button>
            <Typography variant='h3'>
              login with Facebook
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