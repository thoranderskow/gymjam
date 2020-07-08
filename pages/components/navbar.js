import React, { Component } from 'react'
import Link from 'next/link'

/* navbar template found at https://getbootstrap.com/docs/4.0/components/navbar/ */
export default class extends React.Component {
  render() {
    return(
      <div>
      <navbar className='flex'>
        <Link href='./about'><a className='title'>About</a></Link>
        <Link href='./gyms'><a><div className='title'>GYMJAM</div></a></Link>
        <a className='title'>Contact</a>
      </navbar>
      <div className='underline'></div>
      <style jsx>{`
        button {
          background-color: #ff2424;
          border: 0;
          padding: 0;
        }
        button:focus {
          outline: none;
        }
        a {
          text-decoration: none;
        }
        .flex {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }
        a.title {
          font-size: 2em;
          text-decoration: none;
        }
        .title {
          font-family: Impact, Charcoal, sans-serif;
          font-size: 5em;
          color: white;
          text-shadow: 2px 2px #000000;
          margin-bottom: 1vh;
        }
        .underline {
          outline: 2px solid #ffc738;
          margin: 0 auto;
          width: 70%;
        }
        `}
      </style>
      </div>
    );
  }
}
