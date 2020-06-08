import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

const Post = styled.li`
  display: flex;
  flex-direction: row;
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 2px;
  margin: 0 0 1em 0;
  transition: background 0.2s;
  list-style-type: none;

  &:hover {
    background: ${props => props.theme.colors.tertiary};
  }

  color: ${props => props.theme.colors.text};
`
const Details = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`
const StyledLink = styled(Link)`
  text-decoration: none;  
`
const StyledImg = styled.img`
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
  background-color: #eeeeee;
  max-width: 100%;
  height: auto;
`
const Title = styled.h2`
  font-size: 1em;
  font-weight: 600;
  text-transform: capitalize;
  margin: 1rem 1rem 0.5rem 1rem;
`
const Date = styled.h3`
  font-size: 1em;
  margin: 0 1rem 0.5rem 1rem;
  color: gray;
`
const Excerpt = styled.p`
  margin: 0 1rem 1rem 1rem;
  line-height: 1.6;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const SearchCard = ({ post, basePath }) => {
  return (
    <StyledLink to={`/${post.fields.slug}`}>
      <Post> 
        <StyledImg src={`https:${post.fields.heroImage.fields.file.url}?fit=fill&w=100&h=100`} />
        <Details>
          <Title>{post.fields.title}</Title>
          <Date>{post.fields.publishDate}</Date>
          <Excerpt>{post.fields.body}</Excerpt>
        </Details>
      </Post> 
    </StyledLink>

  )
}

export default SearchCard