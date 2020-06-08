import React from 'react'
import Layout from '../components/Layout'
import Container from '../components/Container'
import PageTitle from '../components/PageTitle'
import SEO from '../components/SEO'
import SearchContainer from '../components/SearchContainer'

const SearchPage = () => (
  <Layout>
    <SEO title="Search" description="Search description goes here" />
    <Container>
      <PageTitle>Search</PageTitle>
      <SearchContainer />
    </Container>
  </Layout>
)

export default SearchPage