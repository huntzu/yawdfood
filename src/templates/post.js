import React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Container from '../components/Container'
import PageBody from '../components/PageBody'
import TagList from '../components/TagList'
import LocationList from '../components/LocationList'
import PostLinks from '../components/PostLinks'
import PostDetails from '../components/PostDetails'
import StoryList from '../components/StoryList'
import SEO from '../components/SEO'

const PostTemplate = ({ data, pageContext }) => {
  const {
    title,
    publishDate,
    heroImage,
    foodType,
    ethnicOrigins,
    body,
    recipe,
    locations,
    indigenousKnowledge,
    sacredFunctions,
    secularFunctions,
    taboos,
    stories,
    tags,
    metaDescription,
    
  } = data.contentfulPost

  const previous = pageContext.prev
  const next = pageContext.next
  const { basePath } = pageContext
  const combinedTags = [...ethnicOrigins, foodType, ...tags]

  let ogImage
  try {
    ogImage = heroImage.ogimg.src
  } catch (error) {
    ogImage = null
  }

  return (
    <Layout>
      <SEO
        title={title}
        description={
          metaDescription
            ? metaDescription.internal.content
            : body.childMarkdownRemark.excerpt
        }
        image={ogImage}
      />
      <Hero title={title} image={heroImage} height={'50vh'} />
      <Container>
      <PostDetails
        date={publishDate}
        timeToRead={body.childMarkdownRemark.timeToRead}
      />
        {tags && 
          <TagList tags={combinedTags} basePath={basePath} />}
        {locations && 
          <LocationList locations={locations} />}
        <PageBody body={body} />
        {indigenousKnowledge && 
          <PageBody title='Indigenous Knowledge' body={indigenousKnowledge} /> }
        {sacredFunctions && 
          <PageBody title='Sacred Functions' body={sacredFunctions} /> }
        {secularFunctions && 
          <PageBody title='Secular Functions' body={secularFunctions} /> }
        {taboos && 
          <PageBody title='Taboos' body={taboos} /> }
        {recipe && 
          <PageBody title='Recipe' body={recipe} /> }
        {stories && 
          <StoryList stories={stories} />}
      </Container>
      <PostLinks previous={previous} next={next} basePath={basePath} />
    </Layout>
  )
}

export const query = graphql`
query ($slug: String!) {
  contentfulPost(slug: {eq: $slug}) {
    title
    slug
    publishDate(formatString: "MMMM DD, YYYY")
    publishDateISO: publishDate(formatString: "YYYY-MM-DD")
    heroImage {
      title
      fluid(maxWidth: 1800) {
        src
      }
      ogimg: resize(width: 1800) {
        # ...GatsbyContentfulFluid_withWebp_noBase64
        src
      }
    }
    foodType {
      id
      title
      slug
    }
    ethnicOrigins {
      id
      title
      slug
    }
    body {
      childMarkdownRemark {
        timeToRead
        html
        excerpt(pruneLength: 320)
      }
    }
    recipe {
      childMarkdownRemark {
        html
      }
    }
    locations {
      id
      title
      origin
    }
    indigenousKnowledge {
      childMarkdownRemark {
        html
      }
    }
    sacredFunctions {
      childMarkdownRemark {
        html
      }
    }
    secularFunctions {
      childMarkdownRemark {
        html
      }
    }
    taboos {
      childMarkdownRemark {
        html
      }
    }
    stories {
      id
      title
      interviewee {
        name
      }
      body {
        content {
        	content {
            value
          }
        }
      }
    }
    tags {
      title
      id
      slug
    }
  }
}

`

export default PostTemplate
