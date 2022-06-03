import * as React from "react"
import { Link } from "gatsby"



import Layout from "../components/ui/layout"
import HeroBlock from '../components/home/HeroBlock'
import PromotionalProduct from '../components/home/PromotionalProduct'
import FeaturedProducts from '../components/home/FeaturedProducts'
import MarketingButtons from '../components/home/MarketingButtons'
import CallToAction from '../components/home/CallToAction'


const IndexPage = () => (
  <Layout>
    <HeroBlock />
    <PromotionalProduct />
    <FeaturedProducts />
    <MarketingButtons />
    <CallToAction />
  </Layout>
)

export default IndexPage
