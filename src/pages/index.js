import * as React from "react"
import { Link } from "gatsby"



import Layout from "../components/ui/layout"
import HeroBlock from '../components/home/HeroBlock'
import PromotionalProduct from '../components/home/PromotionalProduct'
import FeaturedProduct from '../components/home/FeaturedProduct'
import MarketingButtons from '../components/home/MarketingButtons'
import CallToAction from '../components/home/CallToAction'


const IndexPage = () => (
  <Layout>
    <HeroBlock />
    <PromotionalProduct />
    <FeaturedProduct />
    <MarketingButtons />
    <CallToAction />
  </Layout>
)

export default IndexPage
