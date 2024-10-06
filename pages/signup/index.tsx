import { GetServerSideProps } from 'next'
import React from 'react'
import SignUpTemplate from '../../src/components/auth/sign-up/SignUpTemplate'

const index = () => {
  return <SignUpTemplate />
}

export default index

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (process.env.NODE_ENV === 'development') {
    return {
      props: {},
    }
  }
  const cookies = context.req.headers.cookie
  if (cookies && cookies.includes('beerlot-oauth-auth-request')) {
    return {
      redirect: {
        destination: '/account',
        permanent: false,
      },
    }
  }

  if (!cookies || !cookies.includes('beerlot-oauth-auth-guest')) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
