import React, { useState, useEffect } from 'react'
import * as JsSearch from 'js-search'
import { createClient } from 'contentful'
import SearchCard from '../components/SeachCard'
import Container from '../components/Container'
import styled from '@emotion/styled'

const Form = styled.form`
  max-width: ${props => props.theme.sizes.maxWidthCentered};
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  input,
  textarea {
    font-family: inherit;
    font-size: inherit;
    background: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.text};
    border-radius: 2px;
    padding: 1em;
    &::-webkit-input-placeholder {
      color: gray;
    }
    &::-moz-placeholder {
      color: gray;
    }
    &:-ms-input-placeholder {
      color: gray;
    }
    &:-moz-placeholder {
      color: gray;
    }
    &:required {
      box-shadow: none;
    }
  }
  &::before {
    content: '';
    background: black;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    transition: 0.2s all;
    opacity: ${props => (props.overlay ? '.8' : '0')};
    visibility: ${props => (props.overlay ? 'visible' : 'hidden')};
  }
`

const Search = styled.textarea`
  margin: 0 0 1em 0;
  width: 100%;
  @media (min-width: ${props => props.theme.responsive.small}) {
    width: 100%;
  }
`

const SearchContainer = () => {
  const [postData, setPostData] = useState({
    posts: [],
    foundPosts: [],
    search: [],
    searchResults: [],
    isLoading: true,
    isError: false,
    searchQuery: ''
  })

  console.log(`Environment: ${process.env.NODE_ENV}`)
  console.log(`Space ID: ${process.env.SPACE_ID}`)
  console.log(`Access Token: ${process.env.ACCESS_TOKEN}`)

  const spaceId = process.env.SPACE_ID
  const accessToken = process.env.ACCESS_TOKEN

  console.log(`accessToken: ${accessToken}`)

  const {posts, search, searchResults, searchQuery, isLoading } = postData
  const basePath = '/'
  const client = createClient({
    space: spaceId,
    accessToken: accessToken
  })

  useEffect(() => {
    client
      .getEntries({
        content_type: 'post',
        order: 'sys.createdAt'
      })
      .then(
        result => {
          result.items.forEach((item, i) => { item.id = i.toString() })
          setPostData({
            isLoading: false,
            posts: result.items
          })
          rebuildIndex()
        },
        error => {
          setPostData({
            isLoading: false,
            error: error
          })
        }
      )
  }, [isLoading])

  const rebuildIndex = () => {
    const dataToSearch = new JsSearch.Search('id')
    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()
    
    dataToSearch.addIndex(['fields', 'title'])
    dataToSearch.addDocuments(posts)

    setPostData({
      ...postData,
      search: dataToSearch,
      isLoading: false
    })
  }

  const searchData = e => {
    const queryResult = search.search(e.target.value)
    setPostData({
      ...postData,
      searchQuery: e.target.value,
      searchResults: e.target.value === '' ? posts : queryResult
    })
  }

  const handleSubmit = e => e.preventDefault

  return (
    <div>
      <Form onSubmit={e => handleSubmit(e)}>
        <Search
          id="Search"
          value={searchQuery}
          onChange={e => searchData(e)}
          placeholder='Search for food by name'
        />
      </Form>
      <Container>
        <ul>
          {searchResults && searchResults.map((post) => (
            <SearchCard key={post.sys.id} post={post} basePath={basePath} />
          ))}
        </ul>
      </Container>
    </div>
  )
}

export default SearchContainer