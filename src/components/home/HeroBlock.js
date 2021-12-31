import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import mjellma from '../../images/mjellma.jpg'

const useStyles = makeStyles(theme => ({
  textContainer: {
    padding: "1rem",
  },
  [theme.breakpoints.down("xs")]: {
    padding: "0.5rem",
  },
  heading: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.8rem",
    },
  },
}))


export default function HeroBlock() {
  const classes = useStyles()
  const matchesLG = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down('xs'))


  return (
    <Grid item container justifyContent="space-around" alignItems='center' >
      <Grid item classes={{ root: classes.textContainer }}>
        <Grid item container direction="column">
    <Grid item>
        <Typography align='center' variant='h1' classes={{ root: classes.heading }}>
    The premier
    <br />
    Developer clothing line
        </Typography>
    </Grid>
    <Grid item>
        <Typography align='center' variant='h3'>
            High quality, custom desgined, shirt, hats, and hoodies
        </Typography>
        </Grid>
      </Grid>
      </Grid>
      <Grid item>
          <img src={mjellma} alt='mjellma' width={matchesXS
              ? "350rem"
              : matchesMD
              ? "550rem"
              : matchesLG
              ? "650rem"
              : "850rem"}
              />
               </Grid>
    </Grid>
  )
}