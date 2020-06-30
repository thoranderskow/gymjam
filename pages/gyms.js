import fetch from 'isomorphic-unfetch'
import React, { Component } from 'react'
import Navbar from './components/navbar.js'

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
          font-size: 12pt;
          padding-left: 5%;
          padding-right: 5%;
          padding-bottom: 5%;
          padding-top: 2%;
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

class Submit_button extends React.Component {
  render() {
    const time = new Date();
    const obj = {
      "comment": "TODOROKI",
      "c_level": 5,
      "r_avail": false,
      "time" : time
    }
    const submit = async () => {
      const res = await fetch('http://localhost:3000/api/gym', {
        method: 'post',
        body: JSON.stringify(obj)
      })
      this.props.func(obj);
    }
    return (
      <div>
        <button onClick={submit}>submit</button>
        <style jsx>{`
          div {
            width: 25%;
          }
          button {
            width: 100%;
          }
          `}
          </style>
          </div>
        )
      }
    }

function C_level_button(props) {
  const submit = () => {
    props.clevel(props.num);
  }
  return (
    <div>
      <button onClick={submit}>{props.num}</button>
      <style jsx>{`
        button {
          border-radius: 10px;
        }
        `}
      </style>
    </div>
  )
}

class C_level_buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      bool: true
    };
  }
  render() {
    const submit = () => {
      if (this.state.bool) {
        this.setState({bool: false});
        this.props.ravail(false);
      } else {
        this.setState({bool: true});
        this.props.ravail(true);
      }
    }
    return(
      <div className='whole'>
        <div className='vert'>
          How Crowded?
          <div className='flex'>
            <C_level_button num={1} clevel={this.props.clevel} />
            <C_level_button num={2} clevel={this.props.clevel} />
            <C_level_button num={3} clevel={this.props.clevel} />
            <C_level_button num={4} clevel={this.props.clevel} />
            <C_level_button num={5} clevel={this.props.clevel} />
          </div>
        </div>
        <div className='vert'>
          Racks Available?
          <button onClick={submit}>{this.state.bool.toString()}</button>
        </div>
          <style jsx>{`
            .whole {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }
            .vert {
              display: flex;
              flex-direction: column;
            }
            .flex {
              display: flex;
            }
            button {
              border-radius: 10px;
              width: 30%;
              align-self: center;
            }
            `}
          </style>
        </div>
      )
    }
  }

class Input_form extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      value: '',
      c_level: 0,
      r_avail: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.set_c_level = this.set_c_level.bind(this);
    this.set_r_avail = this.set_r_avail.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  set_c_level(num) {
    this.setState({c_level: num});
  }
  set_r_avail(bool) {
    this.setState({r_avail: bool});
  }
  render() {
    return (
      <div className='separator'>
        <div>
          <C_level_buttons clevel={this.set_c_level} ravail={this.set_r_avail}/>
        </div>
        <div className='flex'>
          <input className='comment' type='text' value={this.state.value} onChange={this.handleChange} />
          <Submit_button func={this.props.func}/>
          <style jsx>{`
            .separator {
              display: flex;
              flex-direction: column;
            }
            .flex {
              display: flex;
              align-items: flex-end;
            }
            .comment {
              margin-right: 2%;
              width:100%;
            }
            `}
          </style>
        </div>
      </div>
    )
  }
}

function Show_five_comments(props) {
  const arr = props.arr.slice(0,5);
  const comments = arr.map((obj) =>
    <Create_commentbox key={obj.id} com={obj.comment} c_level={obj.c_level} racks={obj.r_avail} time={obj.time}/>
  );
  return (
    <div className='flex'>
      <div className='space'>{comments}</div>
      <div><Input_form func={props.func}/></div>
      <style jsx>{`
        .flex {
          display: flex;
          width: 30%;
          height: 450px;
          flex-direction: column;
        }
        .space {
          overflow: auto;
          border-radius: 10px;
        }
        *::-webkit-scrollbar {
          width: 0px;
        }
        `}
      </style>
    </div>
  )
}

function Show_gym(props) {
  return (
    <div>
      <img src={props.name} alt='ratner' />
      <style jsx>{`
        img {
          width: 100%;
          height: auto;
        }
        div {
          width: 10%;
        }
        `}
      </style>
    </div>)
}

export default class extends React.Component {
  static async getInitialProps() {
    const res = await fetch('http://localhost:3000/api/gym')
    const data = await res.json()
    //array is reversed for most recent to show up
    const arr = data.comments.reverse();
    return { arr }
  }
  constructor(props) {
    super(props);
    this.state = {comms: this.props.arr};
  }
  refreshcomments = (newcomm) => {
    this.getInitialProps;
    var oldarr = this.props.arr;
    oldarr.unshift(newcomm);
    this.setState({comms: oldarr});
  }
  render() {
    return(
      <div>
        <Navbar />
      <div className='flex'>
        <Show_gym name='/ratner.png' />
        <Show_five_comments arr={this.state.comms} func={this.refreshcomments}/>
        <style jsx>{`
          .flex {
            align-items: center;
            justify-content: space-evenly;
          }
          `}
        </style>
        <style global jsx>{`
          .flex {
            display: flex;
          }
          body {
            background: #ff2424;
          }
          `}
        </style>
      </div>
      </div>
    )
  }
}

/*export async function getServerSideProps() {
  const res = await fetch(`https://localhost:3000/api/gym`)
  const data = await res.json()

  return { props: { data } }
}*/
