import React from 'react'
import Layout from '../components/Layout'
import Container from '../components/Container'
import PageTitle from '../components/PageTitle'
import SEO from '../components/SEO'

const FoodPage = () => {
  return (
    <Layout>
      <SEO title="Contact" description="Contact description goes here" />
      <Container>
        <PageTitle>Food</PageTitle>
        <div>Food Page!</div>
      </Container>
    </Layout>
  )
}

export default FoodPage