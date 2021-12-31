import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "gatsby"

import cta from "../../images/cta.png"


const useStyles = makeStyles(theme => ({
account: {
    color: '#fff',
    marginLeft: '2rem'
},
body: {
    maxWidth: '45rem',
    [theme.breakpoints.down('md')]: {
        padding: '0 1rem'
    },
    [theme.breakpoints.down('xs')]: {
        padding: '0',
    },
},
container: {
    margin: '15rem 0',
},
buttonContainer: {
    marginTop: '3rem'
},
headingContainer: {
    [theme.breakpoints.down('md')]: {
        padding: '5rem 1rem'
    },
    [theme.breakpoints.down('xs')]: {
        padding: '0'
    },
},
icon: {
    [theme.breakpoints.down('xs')]: {
        height: '16rem',
        width: '20rem',
        marginBottom: '3em'
    },
},
textQuality: {
    [theme.breakpoints.down('xs')]: {
            fontSize: '2.3rem'
    },
},
mjellmaText: {
    [theme.breakpoints.down('xs')]: {
        fontSize: '1rem'
},
},
}))

export default function CallToAction() {
    const classes = useStyles()
    const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))
    const matchesXS = useMediaQuery(theme => theme.breakpoints.down('xs'))

    return (
      <Grid
        container
        alignItems="center"
        justifyContent="space-around"
        classes={{ root: classes.container }}
        direction={matchesMD ? "column" : "row"}
      >
        <Grid item>
          <img src={cta} className={classes.icon} alt="cta" />
        </Grid>
        <Grid item classes={{root: classes.headingContainer}}>
          <Grid container direction="column">
            <Grid item>
              <Typography classes={{root: classes.textQuality}} align={matchesMD ? "center" : undefined} variant="h1">
                Commited to Quality
              </Typography>
            </Grid>
            <Grid item classes={{ root: classes.body }}>
              <Typography
                align={matchesMD ? "center" : undefined}
                variant="body1"
                classes={{root: classes.mjellmaText}}
              >
                At Mjellma our mission is to provide comfortable, durable,
                premium, designer clothing accessories.
              </Typography>
            </Grid>
            <Grid
              item
              container
              justifyContent={matchesMD ? "center" : undefined}
              classes={{ root: classes.buttonContainer }}
            >
              <Grid item>
                <Button
                  component={Link}
                  to="/contact"
                  variant="outlined"
                  color="primary"
                >
                  Contact Us
                </Button>
              </Grid>
              <Grid item>
                <Button
                  component={Link}
                  to="/account"
                  variant="contained"
                  color="primary"
                  classes={{ root: classes.account }}
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
}