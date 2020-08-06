import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

const List = styled.ul`
  width: 100%;
  margin: 0 auto 1em auto;
  max-width: ${props => props.theme.sizes.maxWidthCentered};
`

const Title = styled.h3`
  font-size: 1rem;
  margin: 1em 0;
  font-weight: 600;
`

const Location = styled.li`
  display: inline-block;
  margin: 0 0.25em 0.25em 0;
  a {
    float: left;
    transition: 0.2s;
    background: ${props => props.theme.colors.tertiary};
    padding: 0.5em;
    border-radius: 2px;
    text-transform: capitalize;
    text-decoration: none;
    color: ${props => props.theme.colors.text};
    border: 1px solid ${props => props.theme.colors.secondary};
    &:hover {
      background: ${props => props.theme.colors.secondary};
    }
  }
`

const LocationList = props => {
  return (
    <List>
    <Title>Locations</Title>
    {props.locations.map(location => (
      <Location key={location.id}>
        <a>
          {location.origin ? `${location.title} (origin)` : location.title}
        </a>
      </Location>
    ))}
    </List>
  )
}

export default LocationList