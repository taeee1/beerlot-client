import React from 'react'
import Profile from './user-info/Profile'
import Tools from './Tools'
import BeerInfo from './beer-info/BeerInfo'

const AccountsTemplate = () => {
  return (
    <>
      <Tools />
      <Profile />
      <BeerInfo />
    </>
  )
}

export default AccountsTemplate
