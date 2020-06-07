import React, { useState, useEffect } from 'react'
import * as JsSearch from 'js-search'
import { createClient } from 'contentful'
import CardList from '../components/CardList'
import Card from '../components/Card'
import SearchCard from '../components/SeachCard'
import Container from '../components/Container'

const SearchContainer = () => {
  const [postData, setPostData] = useState({
    posts: [],
    search: [],
    searchResults: [],
    isLoading: true,
    isError: false,
    searchQuery: ''
  })

  const {posts, search, searchQuery, isLoading } = postData
  const basePath = '/'

  useEffect(() => {
    const client = createClient({
      space: '410724wvyej4',
      accessToken: 'gM76IGr5cKE4F166kXUCbwOzDP1k6etYJMQS2gS30SU'
    })

    client
      .getEntries({
        content_type: 'post',
        order: 'sys.createdAt'
      })
      .then(
        result => {
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
    const dataToSearch = new JsSearch.Search('title')
    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex('title')
    
    dataToSearch.addIndex('body')
    dataToSearch.addDocuments(posts)

    setPostData({
      ...postData,
      search: dataToSearch,
      isLoading: false
    })
  }

  const searchData = e => {
    const queryResult = search.search(e.target.value)
    const currentPosts = e.target.value === '' ? posts : queryResult
    setPostData({
      ...postData,
      searchQuery: e.target.value,
      searchResults: queryResult,
      foundPosts: currentPosts
    })
  }

  const handleSubmit = e => e.preventDefault

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          id="Search"
          value={searchQuery}
          onChange={e => searchData(e)}
          placeholder='Search for food'
        />
      </form>
      <Container>
        <CardList>
          { posts && posts.map((post) => (
            <SearchCard key={post.sys.id} post={post} basePath={basePath} />
          ))}
        </CardList>
      </Container>
    </div>
  )
}

export default SearchContainer