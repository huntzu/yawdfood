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
  font-weight: 600;
  margin: 1em 0;
`

const StoryTitle = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  margin: 1em 0;
`

const Story = styled.li`

`

const StoryBody = styled.div`

`

const StoryList = props => {
  return (
    <List>
      <Title>Stories</Title>
      {props.stories.map(story => (
        <Story key={story.id}>
          <StoryTitle>{`${story.title}, by ${story.interviewee.name}`}</StoryTitle>
          <StoryBody>
            {story.body.content[0].content[0].value}
          </StoryBody>
        </Story>
      ))}
    </List>
  )
}

export default StoryList