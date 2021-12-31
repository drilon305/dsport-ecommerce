import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'

import Cart from '../../images/Cart'

const useStyles = makeStyles(theme => ({
        qtyText: {
            color: '#fff'
        },
        mainGroup: {
            height: '3rem',
        },
        editButtons: {
            height: '1.525rem',
            borderRadius: 0,
            backgroundColor: theme.palette.secondary.main,
            borderLeft: '2px solid #fff',
            borderRight: '2px solid #fff',
            borderBottom: 'none',
            borderTop: 'none'
        },
        endButtons: {
            borderRadius: 50,
            backgroundColor: theme.palette.secondary.main,
            border: 'none'
        },
        cartButton: {
            marginLeft: '0 !important'
        },
        minus: {
            marginTop: '-0.25rem'
        },
        minusButton: {
            borderTop: '2px solid #fff'
        },
}))

export default function QtyButton() {
    const classes = useStyles()
    const [qty, setQty] = useState(1)

    if(qty <= 0) {
      return setQty(1)
    }

    return (
      <Grid item>
        <ButtonGroup classes={{ root: classes.mainGroup }}>
          <Button classes={{ root: classes.endButtons }}>
            <Typography variant="h3" classes={{ root: classes.qtyText }}>
              {qty}
            </Typography>
          </Button>
          <ButtonGroup orientation="vertical">
            <Button
              onClick={() => setQty(qty + 1)}
              classes={{ root: classes.editButtons }}
            >
              <Typography variant="h3" classes={{ root: classes.qtyText }}>
                +
              </Typography>
            </Button>
            <Button
              onClick={() => setQty(qty - 1)}
              classes={{ root: clsx(classes.editButtons, classes.minusButton) }}
            >
              <Typography
                variant="h3"
                classes={{ root: clsx(classes.qtyText, classes.minus) }}
              >
                -
              </Typography>
            </Button>
          </ButtonGroup>
          <Button
            classes={{ root: clsx(classes.endButtons, classes.cartButton) }}
          >
               <Cart color="#fff" />
          </Button>
        </ButtonGroup>
      </Grid>
    )
}