import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { CartContext } from '../../contexts'
import Item from './Item'


const useStyles = makeStyles(theme => ({

}))

export default function CartItems() {
    const classes = useStyles()
    const { cart } = useContext(CartContext)

    return (
        <Grid item container direction='column' xs={6}>
                {cart.map(item => (
                    <Item  item={item} key={item.variant.id} />
                ))}
        </Grid>
    )
}