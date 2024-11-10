import React from 'react'
import AuthNav from '../Components/auth/AuthNav'
import { Outlet } from 'react-router-dom'

const Authlayout = () => {
  return (
    <>
        <AuthNav/>
        <Outlet/>
    </>
  )
}

export default Authlayout