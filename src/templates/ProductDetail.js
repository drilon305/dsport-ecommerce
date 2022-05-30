import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import Grid from '@material-ui/core/Grid'
import Layout from '../components/ui/layout'
import useMediaQuery from '@material-ui/core/useMediaQuery'


import ProductImages from '../components/product-detail/ProductImages'
import ProductInfo from '../components/product-detail/ProductInfo'
import ProductReviews from '../components/product-detail/ProductReviews'

import { GET_DETAILS } from '../apollo/queries'



export default function ProductDetail({
  pageContext: { name, id, category, variants, description, product },
}) {
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  const [stock, setStock] = useState(null)
  const [edit, setEdit] = useState(false)

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'));

  const params = new URLSearchParams(window.location.search)
  const style = params.get("style")

  const { loading, error, data } = useQuery(GET_DETAILS, {
    variables: { id },
  })
  

  useEffect(() => {
    if(error) {
      setStock(-1)
    } else if (data) {
      setStock(data.product.variants)
    }
  }, [error, data])

  
  

  useEffect(() => {
    
    const styledVariant = variants.filter(
      variant => variant.style === params.get("style")
    )[0]

    const variantIndex = variants.indexOf(styledVariant)
    setSelectedVariant(variantIndex)
  }, [style])

  return (
    <Layout>
      <Grid item container direction="column">
        <Grid
          item
          container
          direction={matchesMD ? "column" : "row"}
          
        >
          <ProductImages
            images={variants[selectedVariant].images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <ProductInfo
            name={name}
            description={description}
            variants={variants}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            stock={stock}
            setEdit={setEdit}
          />
        </Grid>
        <ProductReviews product={id} edit={edit} setEdit={setEdit} />
      </Grid>
    </Layout>
  )
}