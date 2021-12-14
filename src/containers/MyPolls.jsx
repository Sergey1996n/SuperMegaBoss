import React, { useState, useEffect } from "react"
import styled from "styled-components"
import {Link} from 'wouter'

import Spinner from "../components/Spinner"
import PollListItem from "../components/PollListItem"

import api from '../api'
import colors from '../colors'
import typo from '../typo'

const Header = styled.div`
  max-width: 560px;
  margin: 70px auto 24px;
  display: flex;
  justify-content: space-between;
`

const H2 = styled.h2`
  ${typo.h2};
  color: ${colors.mainText};
  text-align: left;
`

const NewPollButton = styled.button`
  ${typo.button}
  background-color: transparent;
  border-color: transparent;
  color: #8897AD;
  border-radius: 4px;
  padding: 4px 12px;
  font-style: normal;
  letter-spacing: 0;
  cursor: pointer;

  &:hover {
    background-color: ${colors.grayBlue};
    color: ${colors.brightPrimary};
    }
`

const PollList = styled.div`
  max-width: 560px;
  margin: 0 auto;
`

export default function MyPolls() {
  const [polls, setPolls] = useState(null)
  
  useEffect(() => {
    api.getPolls().then((data) => {
      // api.getPoll("7cb0cfcfda317d53da442762").then((data)=> console.log(data))
      setPolls(data.polls)
    })
  }, [])

  if (!polls) {
    return <Spinner margin="70px auto"/>
  }

  // const remove = (id) => {
  //   api.voteForPoll(id, {optionId: 'iceua', title: 'Да!'})
  // }
  
  const remove = (id) => {
    api.deletePoll(id).then(()=>
    api.getPolls().then((data) => {
      setPolls(data.polls)
    }))
  }

  return (
    <>
      <Header>
        <H2>Your Polls</H2>
        <Link to="/new">
          <NewPollButton>New poll</NewPollButton>
        </Link>
      </Header>
      <PollList>
        {polls.map(({id, letters, question, votes, createdAt}) => (
          <PollListItem
            key={id}
            createdAt={createdAt}
            id={id}
            letters={letters}
            question={question}
            remove={remove}
            votes={votes}
          />
        ))}
      </PollList>
    </>
  )
}
