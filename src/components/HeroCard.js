import React from 'react'
import Hero from '../components/Hero'
import { Link } from 'gatsby'

const HeroCard = ({ heroTitle, basePath, height, post }) => (
  <Link to={`${basePath}/${post.slug}/`}>
    <Hero title={heroTitle} image={post.heroImage} height={height} />
  </Link>
)

export default HeroCard