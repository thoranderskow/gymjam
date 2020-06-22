import Head from 'next/head'
import React, { Component } from 'react'
import Link from 'next/link'

function Get_started () {
  return (
      <container>
        <Link href='./gyms'><a>Get Started</a></Link>
        <style jsx>{`
          a{
            text-decoration: none;
            font-family: Impact, Charcoal, sans-serif;
            font-size: 2em;
            color: black;
          }
          a:hover {
            color: #ff2424;
          }`}
          </style>
      </container>
  )
}

class Login extends React.Component {
  render() {
    const containerstyle = {
      backgroundColor: 'red',
      justifyContent: 'flex-end',
    };
    return(
      <container className='flex'>
        <div className='title'>GYMJAM</div>
        <div className='container'>
          <div className='login'>
            <Get_started />
          </div>
        </div>

        <style jsx>{`
          .title {
            font-family: Impact, Charcoal, sans-serif;
            font-size: 7em;
            color: white;
            text-shadow: 2px 2px #000000;
            margin-bottom: 5vh;
          }
          .flex {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 90vh;
          }
          .container {
            height: 10vh;
            width: 15vw;
            display: flex;
          }
          .login {
            display: flex;
            background: white;
            border-radius: 25px;
            width: 100vw;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 0 2pt black;
          }
          p{
            margin-left: 5px;
          }`}
        </style>
        <style global jsx>{`
          body{
            background: #ff2424;
          }`}
        </style>
      </container>
    )
  }
}

export default function Home() {
  return (
    <Login />
  )



}
