import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Layout from '../components/ui/layout'
import useMediaQuery from '@material-ui/core/useMediaQuery'


import ProductImages from '../components/product-detail/ProductImages'
import ProductInfo from '../components/product-detail/ProductInfo'


export default function ProductDetail({
  pageContext: { name, id, category, variants, description, product },
}) {
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'));

  

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const styledVariant = variants.filter(
      variant => variant.style === params.get("style")
    )[0]

    const variantIndex = variants.indexOf(styledVariant)
    setSelectedVariant(variantIndex)
  }, [])

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
          />
        </Grid>
      </Grid>
    </Layout>
  )
}