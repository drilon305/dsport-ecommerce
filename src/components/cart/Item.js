import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import QtyButton from '../product-list/QtyButton'

const useStyles = makeStyles(theme => ({
    productImage: {
        height: '8rem',
        width: '8rem',
    },
    name: {
        color: theme.palette.secondary.main,
    },
}))

export default function Item({ item }) {
    const classes = useStyles()

    return (
        <Grid item container>
            <Grid item>
                <img
                className={classes.productImage}
                 src={process.env.GATSBY_STRAPI_URL + item.variant.images[0].url}
                  alt={item.variant.id} />
            </Grid>
            <Grid item container direction='column'>
            <Grid item container justifyContent='space-between'>
            <Grid item>
                <Typography variant='h5' classes={{root: classes.name}}>

                </Typography>
            </Grid>
            </Grid>
            </Grid>
        </Grid>
    )
}