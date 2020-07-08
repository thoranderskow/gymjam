import React, { Component } from 'react'
import Navbar from './components/navbar.js'
import Link from 'next/link'

export default class extends React.Component {
  render() {
    return(
      <div>
        <Navbar />
        <div className='flex'>
          <div className='text'>
            GYMJAM is web application made with Nextjs and MongoDB Atlas that allows
            the students of UChicago to comment on the level of fullness either of the
            on-campus gyms has. Thus by visiting and commenting on gymjam, the UChicago
            meathead community can effectively see at all times just how crowded Ratner or
            Crown is, if there are any events going on, and if one can find a rack to squat in.
          </div>
        </div>
        <style global jsx>{`
          .flex {
            display: flex;
            justify-content: center;
          }
          .text {
            margin-top: 2%;
            border-radius: 10px;
            background-color: white;
            padding: 2%;
            max-width: 50%;
            font-size: 16pt;
            line-height: 200%;
          }

          body {
            background: #ff2424;
          }
          `}
        </style>
      </div>
    )
  }
}
