import React from 'react'
import logo from '../../img/logo.png'
import MdEditorBtn from '../buttons/MdEditorBtn'
import ProfileBtn from '../buttons/ProfileBtn'
import { Link } from 'react-router-dom'

const HomeNavbar = ({ username }) => {
  return (
    <>
    <div className="flex justify-between items-center">
      <Link to="/" >
      <img className="w-28" src={logo} alt="logo" />
      </Link>
      <div className="flex space-x-4 items-center">
        <MdEditorBtn />
        <ProfileBtn username={username} />
      </div>
    </div>
    </>
  )
}

const DropDown = ()=> {
  return(
    <div className="absolute right-[3vw]">
      anubhav
    </div>
  )
}

export default HomeNavbar
