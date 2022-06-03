import React, { useEffect, useState, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'

import favorite from '../../images/favorite.svg'
import subscription from '../../images/subscription.svg'
import Rating from '../home/Rating'

import Sizes from '../product-list/Sizes'
import Swatches from '../product-list/Swatches'
import QtyButton from '../product-list/QtyButton'
import { colorIndex } from '../product-list/ProductFrameGrid'

import { UserContext, FeedbackContext } from '../../contexts'
import { setSnackbar } from '../../contexts/actions'


const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: theme.palette.secondary.main,
        height: '38rem',
        width: '28rem',
        [theme.breakpoints.down('md')]: {
          width: '100%'
        },
        [theme.breakpoints.down('xs')]: {
          height: '55rem'
        },
    },
    center: {
        backgroundColor: theme.palette.primary.main,
        height: '30rem',
        width: '38rem',
        position: 'absolute',
        [theme.breakpoints.down('lg')]: {
          width: '35rem'
        },
        [theme.breakpoints.down('md')]: {
          width: '100%'
        },
        [theme.breakpoints.down('xs')]: {
          height: '45rem'
        },
    },
    icon: {
        height: '3rem',
        width: '3rem',
        margin: '0.5rem 1rem'
    },
    sectionContainer: {
      height: 'calc(100% / 3)',
    },
    descriptionContainer: {
      backgroundColor: theme.palette.secondary.main,
      overflowY: 'auto',
      padding: '0.5rem 1rem'
    },
    name: {
      color: '#fff',
    },
    reviewButton: {
      textTransform: 'none',
    },
    detailsContainer: {
      paddingLeft: '1rem'
    },
    chipContainer: {
      marginTop: '1rem',
      [theme.breakpoints.down('xs')]: {
        marginTop: 0,
        marginBottom: '1rem'
      },
    },
    chipRoot: {
      height: '3rem',
      width: '8rem',
      borderRadius: 50,
      marginRight: '1rem'
    },
    chipLabel: {
      fontSize: '1.5rem'
    },
    stock: {
      color: '#fff',
      paddingLeft: '1rem'
    },
    sizesAndSwatches: {
      maxWidth: '12.5rem',
    },
    actionsContainer: {
      padding: '0 1rem',
    },
    'global': {
      '.MuiButtonGroup-groupedOutlinedVertical:not(:first-child)': {
        marginTop: 0,
    },
  },
}))

export const getStockDisplay = (stock, variant) => {
  switch(stock) {
    case undefined:
    case null:
    return 'Loading Inventory...';
    break
    case -1:
      return 'Error Loading Inventory...';
    break
    default:
      if(stock[variant].qty === 0) {
        return 'Out of Stock'
      } else {
        return  `${stock[variant].qty} Currently In Stock`
      }
    break
  }
}

export default function ProductInfo({
  name,
  description,
  variants,
  selectedVariant,
  setSelectedVariant,
  stock,
  rating,
  setEdit
}) {
  const classes = useStyles()
  const { user } = useContext(UserContext)
  const { dispatchFeedback } = useContext(FeedbackContext)
  const [selectedSize, setSelectedSize] = useState(variants[selectedVariant].size)
  const [selectedColor, setSelectedColor] = useState(null)

  const matchesXS = useMediaQuery(theme => theme.breakpoints.down('xs'));

  const imageIndex = colorIndex({node: { variants }}, variants[selectedVariant], selectedColor )

  const sizes = []
  const colors = []
  variants.map(variant => {
    sizes.push(variant.size)

    if (
      !colors.includes(variant.color) &&
      variant.size === selectedSize &&
      variant.style === variants[selectedVariant].style
    ) {
      colors.push(variant.color)
    }
  })

  useEffect(() => {
    setSelectedColor(null)

    const newVariant = variants.find(
      variant =>
        variant.size === selectedSize &&
        variant.style === variants[selectedVariant].style &&
        variant.color === colors[0]
    )

    setSelectedVariant(variants.indexOf(newVariant))
  }, [selectedSize])

  useEffect(() => {
    if(imageIndex !== -1) {
      setSelectedVariant(imageIndex)
    }
  }, [imageIndex])


  const stockDisplay = getStockDisplay(stock, selectedVariant);

  const handleEdit = () => {
    if(user.username === 'Guest') {
      dispatchFeedback({status: 'error', message: 'You must be logged in to leave a review'})
      return
    }

    setEdit(true)
    const reviewRef = document.getElementById('reviews')
    reviewRef.scrollIntoView({ behavior: 'smooth'})
  }
  

  return (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="flex-end"
      direction="column"
      lg={6}
    >
      <Grid
        item
        container
        justifyContent="flex-end"
        classes={{ root: classes.background }}
      >
        <Grid item>
          <img
            src={favorite}
            alt="add item to favroites"
            className={classes.icon}
          />
        </Grid>
        <Grid item>
          <img
            src={subscription}
            alt="add item to subscriptions"
            className={classes.icon}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        classes={{ root: classes.center }}
      >
        <Grid
          item
          container
          direction={matchesXS ? 'column' : 'row'}
          justifyContent="space-between"
          classes={{
            root: clsx(classes.detailsContainer, classes.sectionContainer),
          }}
        >
          <Grid item>
            <Grid item container direction="column">
              <Grid item>
                <Typography variant="h1" classes={{ root: classes.name }}>
                  {name.split(" ")[0]}
                </Typography>
              </Grid>
              <Grid item>
                <Rating number={rating} />
              </Grid>
              <Grid item>
                <Button onClick={handleEdit}>
                  <Typography
                    variant="body2"
                    classes={{ root: classes.reviewButton }}
                  >
                    Leave A Review >
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item classes={{ root: classes.chipContainer }}>
            <Chip
              label={`$${variants[selectedVariant].price}`}
              classes={{ root: classes.chipRoot, label: classes.chipLabel }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          classes={{
            root: clsx(classes.descriptionContainer, classes.sectionContainer),
          }}
        >
          <Grid item>
            <Typography variant="h5">Description</Typography>
            <Typography variant="body2">{description}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction={matchesXS ? 'column' : 'row'}
          justifyContent={matchesXS ? 'space-around' : 'space-between'}
          alignItems={matchesXS ? 'flex-start' : 'center'}
          classes={{ root: clsx(classes.actionsContainer, classes.sectionContainer) }}
        >
          <Grid item>
            <Grid container direction="column">
              <Grid item classes={{ root: classes.sizesAndSwatches }}>
                <Sizes
                  sizes={sizes}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
                <Swatches
                  colors={colors}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
              </Grid>
              <Grid item>
                <Typography variant="h3" classes={{ root: classes.stock }}>
                  {stockDisplay}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <QtyButton stock={stock} selectedVariant={selectedVariant} name={name} variants={variants} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}