import React from 'react'
import { graphql } from 'gatsby'
import { startCase } from 'lodash'
import styled from '@emotion/styled'
import Layout from '../components/Layout'
import HeroCard from '../components/HeroCard'
import CardList from '../components/CardList'
import Card from '../components/Card'
import Container from '../components/Container'
import SEO from '../components/SEO'

const IndexPage = ({ data }) => {
  const posts = data.allContentfulPost.edges
  const basePath = '/'
  let featuredPost
  let ogImage

  try {
    featuredPost = posts[0].node
  } catch (error) {
    featuredPost = null
  }

  try {
    ogImage = posts[0].node.heroImage.ogimg.src
  } catch (error) {
    ogImage = null
  }

  const Title = styled.h1`
    z-index: 2;
    font-size: 3em;
    text-transform: capitalize;
    font-weight: 600;
    width: 100%;
    padding: 0 1rem;
    margin-top: 1em;
    text-align: center;
  `
  const Subtitle = styled.h2`
    z-index: 2;
    font-size: 1.2em;
    width: 100%;
    padding: 1rem;
    text-align: center;
  `

  return (
    <Layout>
      <SEO title={startCase(basePath)} image={ogImage} />
      <HeroCard heroTitle={featuredPost.title} basePath='/' height={'50vh'} post={featuredPost} />
      <Title>Featured Foods</Title>
      <Subtitle>Recipes, Stories, and Food Culture from Around the World.</Subtitle>
      <Container>
        <CardList>
          {posts.slice(1).map(({ node: post }) => (
            <Card key={post.id} {...post} basePath='' />
          ))}
        </CardList>
      </Container>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allContentfulPost(
      sort: { fields: [publishDate], order: DESC}
      limit: 5
    ) {
      edges {
        node {
          title
          id
          slug
          publishDate(formatString: "MMMM DD, YYYY")
          heroImage {
            title
            fluid(maxWidth: 1800) {
              src
            }
            ogimg: resize(width: 1800) {
              src
            }
          }
          body {
            childMarkdownRemark {
              timeToRead
              excerpt(pruneLength: 80)
            }
          }
        }
      }
    }
  }
`