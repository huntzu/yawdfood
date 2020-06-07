import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const StyledImg = styled(Img)`
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
`

const SearchCard = ({ post, basePath }) => {
  
  
  return (
    <div>
    {
      <Link to={`${basePath}/${post.fields.slug}`}>
        <img src={`https:${post.fields.heroImage.fields.file.url}?w=600`} backgroundColor={'#eeeeee'} />
        {`https:${post.fields.heroImage.fields.file.url}?w=600`}
      </Link>
    }
    </div>
  )
}

export default SearchCard