import React, { useEffect, useState } from "react"
import styled from "styled-components"
import api from '../api'
import {Link, useLocation } from 'wouter'
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router'

import Input from "../components/InputCreatePoll"
import Button from "../components/ButtonCrearePoll"
import Spinner from '../components/Spinner'

import colors from '../colors'
import typo from '../typo'

const General = styled.div`
  ${typo.body1};
  text-align: center; 
`

/* Заголовок страницы */
const H1 = styled.h1`
  ${typo.h1};
  color: ${colors.mainText};
  font-weight: 500;
  margin-top: 40px;
  text-align: center;
`

/* Заголовок контента */
const HeaderContent = styled.div`
  ${typo.body1};
  margin: 12px auto 15px;
  font-size: 15px;
  width: 417px;
  color: ${colors.secondaryTextOnGray};
  text-align: center;
`

/* Контейнер для poll */
const Container = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.almostWhite};
  width: 560px;
  max-height: 388px;
  margin: 0 auto;
  // border: 1px solid #F1F1F1;
  box-sizing: border-box;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 32px 10px 32px 40px;
  overflow: auto;
`

/* Типа кнопка добавления poll */
const AddOption = styled.div`
  ${typo.label1};
  color: ${colors.mainText};
  text-align: left; 
  margin-bottom: 8px;
  margin-top: 8px;
  cursor: pointer;
`

export default function CreatePoll() {

  const [namePoll, setNamePoll] = useState({value: "" , validate: true})
  const [options, setOptions] = useState([
    {id: 1, value: "" , validate: true},
    {id: 2, value: "" , validate: true}
  ])
  const [isFormValid, setIsFormValid] = useState(false)
  const [id, setID] = useState(3)
  const [location, setLocation] = useLocation();
  const [reply, setReply] = useState(false)

  const addPoll = () => {
    let arrayOptions = options;
    arrayOptions.push({id: id, value: "" , validate: true })
    setOptions(arrayOptions)
    setID(id + 1)
  }

  const remove = (item) => {
    setOptions( prevState => {
      const newState = [...prevState].filter((el) => el.id !== item)
      return newState
    })
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
      if (name == "namePoll"){
      const { validate } = namePoll;
      setNamePoll({ value, validate })
    }
    else {
      const r = /\d+/;
      const number = name.match(r);
      setOptions( prevState => {
        const newState = [...prevState]
        newState[number - 1].value = value
        return newState
      })
    }
  }

  const validate = (value, name) => {
    if (name === "namePoll"){
      const check = value.length > 0;
    setNamePoll({ value: namePoll.value, validate: check })
    return check;
    }
    else{
      let numberNoNullValue = 0;
      options.forEach((item) => {
        if (item.value !== ""){
          numberNoNullValue++
        }
      })
      if (numberNoNullValue > 1 && namePoll.value !== ""){
        setIsFormValid(true)
      }
      else{
        setIsFormValid(false)
      }
    }

  }

  const handleSubmit = (e) => {
    setReply(true)
    e.preventDefault();
    const optionsPolls = []
    options.forEach((item) => {
      if (item.value != "")
        optionsPolls.push({"title": item.value})
    })

    const poll = {
      "question": namePoll.value,
      "options": optionsPolls
    }
    
    api.createPoll(poll).then(() => setLocation("/"))
  }

  return (
    <General>
      <H1>Create a new poll</H1>
      <HeaderContent>To start a poll just share a link on them with your friends. 
        Once you have one vote it can't be edited anymore.</HeaderContent>
      <form onSubmit={handleSubmit}>  
      <Container>
        <Input 
          name = "namePoll"
          type = "text"
          label = "Poll question"
          placeholder = "Eg. What is your favourite programming language?"
          deleted = "no"
          value = {namePoll.value}
          validate = {validate}
          onChange = {handleInputChange}
          messageError="This fuild is required"
          valid = {namePoll.validate}
          >
        </Input>
        {options.map((item, index) => (
          <Input
            key ={item.id}
            id ={item.id}
            name = {"Option " + (index + 1)}
            label={"Option " + (index + 1)}
            placeholder={"Eg. option " + (index + 1)}
            value = {item.value}
            validate = {validate}
            onChange = {handleInputChange}
            messageError = "Should be a valid name"
            remove={remove}
            valid = {item.validate}
          >
          </Input>
        ))}
        <AddOption onClick={addPoll}>+ Add another option</AddOption>
      </Container>
      {!reply ?
      <Button type="submit" disabled={!isFormValid} >Create poll</Button>:
        <Button type="submit"><Spinner color = "#FFF" scale={0.75} margin={'0 154px'}></Spinner></Button> }
      </form>
    </General>
  )
}