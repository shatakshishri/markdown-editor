import React from 'react'
import Navbar from '../../components/common/Navbar'
import './auth.css'
import { GoMarkdown } from 'react-icons/go'
import GoogleLoginBtn from '../../components/buttons/GoogleLoginBtn'
import GithubLoginBtn from '../../components/buttons/GithubLoginBtn'
import { Toaster } from 'react-hot-toast'

const Auth = () => {
  return (
    <div className="bg-[#000] text-white w-screen h-screen px-8 pt-4">
      <Toaster/>
      <Navbar showLogin={false} />
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-2 text-xl font-semibold text-gray-200">
          <p>Login to</p>
          <GoMarkdown/>
          <p>Markdown Editor</p>
        </div>  
        <div className="flex flex-col items-center space-y-8 mt-8">
          <GoogleLoginBtn/>
          <GithubLoginBtn/>
        </div>
      </div>
    </div>
  )
}

export default Auth
