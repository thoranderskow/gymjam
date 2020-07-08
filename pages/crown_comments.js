import React, { Component } from 'react'
import Navbar from './components/navbar.js'
import Link from 'next/link'

function getClockTime(now){
   var hour   = now.getHours();
   var minute = now.getMinutes();
   var ap = "AM";
   if (hour   > 11) { ap = "PM";             }
   if (hour   > 12) { hour = hour - 12;      }
   if (hour   == 0) { hour = 12;             }
   if (hour   < 10) { hour   = hour;   }
   if (minute < 10) { minute = "0" + minute; }
   var date = ((now.getMonth() > 8) ? (now.getMonth() + 1) : ('0' + (now.getMonth() + 1))) + '/' + ((now.getDate() > 9) ? now.getDate() : ('0' + now.getDate())) + '/' + now.getFullYear()
   var timeString = hour + ':' + minute + " " + ap + " " + date;
   return timeString;
}

function Create_commentbox(props) {
  return(
    <div className='flex'>
      <div className='comlev'>
        <div className='bold'>crowd level: {props.c_level}</div>
        <div className='bold'>Racks available? {props.racks ? 'yes' : 'no'}</div>
      </div>
      <div className='indent'>
        {getClockTime((new Date (props.time))).toString()}
      </div>
      <div className='unemph'>{props.com}</div>
      <style jsx>{`
        .flex {
          display: flex;
          justify-content: space-evenly;
          flex-direction: column;
          background-color: #FFF
        }
        .flex:nth-child(odd){
          background-color: #CCC;
        }
        .flex:first-child {
          border-radius: 10px 10px 0px 0px;
        }
        .flex:last-child {
          border-radius: 0px 0px 10px 10px;
        }
        .comlev {
          display: flex;
          justify-content: space-evenly;
          margin-bottom: 20px;
          padding-top: 3%;
        }
        .bold {
          font-family: Georgia, serif;
        }
        .unemph {
          font-family: Georgia, serif;
          line-height: 150%;
          font-size: 14pt;
          padding-left: 5%;
          padding-right: 5%;
          padding-bottom: 5%;
          padding-top: 2%;
          word-break: break-all;
        }
        .indent {
          padding-left: 5%;
          color: #999;
        }
        `}
      </style>
    </div>
  );
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comms: this.props.arr
    };
  }
  static async getInitialProps(obj) {
    const res = await fetch('http://localhost:3000/api/crown')
    const data = await res.json()
    //array is reversed for most recent to show up
    const arr = data.comments.reverse();
    return { arr }
  }
  render() {
    const comments = this.state.comms.map((obj) =>
      <Create_commentbox key={obj.id} com={obj.comment} c_level={obj.c_level} racks={obj.r_avail} time={obj.time}/>
    );
    return(
      <div>
        <div className='nav'>
          <Navbar />
        </div>
        <div className='flex'>
          <div>
          <Link href='./gyms'><a>Return</a></Link>
          </div>
          <div className='comments'>
            {comments}
          </div>
          <div>
          </div>
        </div>
        <style jsx>{`
          .flex {
            display: flex;
            align-items: flex-end;
          }
          .comments {
            width: 50%;
            margin: 0 auto;
            padding: 2%;
            background-color: #ffc738;
            border-radius: 10px;
          }
          .nav {
            margin-bottom: 2%;
          }
          a{
            text-decoration: none;
            font-family: Impact, Charcoal, sans-serif;
            font-size: 2em;
            color: white;
            text-shadow: 2px 2px #000000;
          }
          a:hover {
            color: #ff2424;
          }
          `}
        </style>
        <style global jsx>{`
          body {
            background: #ff2424;
          }
          `}
        </style>
      </div>
    )
  }
}
