import React from 'react'
import styled from 'styled-components'
import {useLocation } from 'wouter'

import colors from '../colors'
import typo from '../typo'
import Spinner from './Spinner'

const ButtonTag = styled.button`
  ${typo.button};
  margin-top: 8px;
  // margin: 8px auto auto;
  width: 360px;
  height: 48px;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
  transition: all .2s ease-in-out;
  display: inline-block;
  text-align: center;
  padding: 0 13px;
  background: ${colors.brightPrimary};
  color: ${colors.white};
  border: 1px solid transparent;

  &:hover {
    background: ${colors.mediumPrimary};
  }
  &:disabled {
    background: #B6C5DC;
  }
`

export default function Button({children, onClick, disabled}) {
  
  return (
    <ButtonTag
    onClick={onClick}
    disabled ={disabled}
    ><div>{children}</div></ButtonTag>
  )
}