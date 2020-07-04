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

class Submit_button extends React.Component {
  render() {
    const err_handle = (val) => {
      if (val === '') {
        return "No comment specified"
      } else if (val === 0) {
        return "No crowd level specified"
      } else {
        return ''
      }
    }
    const time = new Date();
    const obj = {
      "comment": this.props.com,
      "c_level": this.props.clevel,
      "r_avail": this.props.ravail,
      "time" : time
    }
    const submit = async () => {
      const err1 = err_handle(this.props.com);
      const err2 = err_handle(this.props.clevel);
      if (err1 !== '') {
        this.props.error(err_handle(this.props.com));
        return
      } else if (err2 !== '') {
        this.props.error(err_handle(this.props.clevel));
        return
      }
      this.props.reset('');
      this.props.error('');
      const res = await fetch('http://localhost:3000/api/gym', {
        method: 'post',
        body: JSON.stringify(obj)
      })
      this.props.func(obj);
    }
    const enter = () => {
      submit();
    }
    return (
      <div>
        <button onClick={enter}>submit</button>
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

class C_level_button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {}
    }
  }
  componentDidUpdate(prev) {
    if (this.props.arr !== prev.arr) {
      const blank = {backgroundColor: 'white'};
      const active = {backgroundColor: '#ffa238'};
      var flag = false;
      this.props.arr.map(x => (x == this.props.num ? flag = true : console.log('none')));
      if (flag) {
        this.setState({style: blank});
      } else {
        this.setState({style: active});
      }
    }
  }
  render () {
    const submit = () => {
      this.props.clevel(this.props.num);
      this.props.func(this.props.num);
    }
    return (
      <div>
        <button style={this.state.style} onClick={submit}>{this.props.num}</button>
        <style jsx>{`
          button {
            border-radius: 10px;
          }
          button:focus {
            outline: none;
          }
          `}
        </style>
      </div>
    )
  }
}

class C_level_buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      bool: true,
      bs: this.props.arr,
      t_f_style: {
        backgroundColor: 'green',
        color: 'white',
        width: '100%'
      }
    };
    this.b = this.b.bind(this);
  }
  componentDidUpdate(prev) {
    if (prev.arr !== this.props.arr) {
      this.setState({bs: this.props.arr});
    }
  }
  b (num) {
    var arr = [1,2,3,4,5];
    delete arr[num-1];
    this.setState({
      bs: arr,
    });
  }
  render() {
    const submit = () => {
      if (this.state.bool) {
        this.setState({
          bool: false,
          t_f_style: {
            backgroundColor: 'red',
            color: 'white',
            width: '100%'
          }
        });
        this.props.ravail(false);
      } else {
        this.setState({
          bool: true,
          t_f_style: {
            backgroundColor: 'green',
            color: 'white',
            width: '100%'
          }
        });
        this.props.ravail(true);
      }
    }
    return(
      <div className='whole'>
        <div className='vert'>
          How Crowded?
          <div className='flex'>
            <C_level_button arr={this.state.bs} func={this.b} num={1} clevel={this.props.clevel} />
            <C_level_button arr={this.state.bs} func={this.b} num={2} clevel={this.props.clevel} />
            <C_level_button arr={this.state.bs} func={this.b} num={3} clevel={this.props.clevel} />
            <C_level_button arr={this.state.bs} func={this.b} num={4} clevel={this.props.clevel} />
            <C_level_button arr={this.state.bs} func={this.b} num={5} clevel={this.props.clevel} />
          </div>
        </div>
        <div className='vert'>
          Racks Available?
          <button style={this.state.t_f_style} onClick={submit} type='submit'>{this.state.bool.toString()}</button>
        </div>
          <style jsx>{`
            .whole {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              margin-bottom: 2%;
            }
            .vert {
              display: flex;
              flex-direction: column;
              font-family: Charcoal, sans-serif;
              font-size: 1em;
              color: white;
              text-shadow: 1px 1px #000000;
            }
            .flex {
              display: flex;
            }
            button {
              border-radius: 10px;
              width: 30%;
              align-self: center;
            }
            button:focus {
              outline: none;
            }
            `}
          </style>
        </div>
      )
    }
  }

function isOverflown(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

class Input_form extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      value: '',
      c_level: 0,
      r_avail: true,
      button_arr: [1,2,3,4,5],
      err_str: '',
      rows: 1,
      len_switch: 0,
      line_len: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.set_c_level = this.set_c_level.bind(this);
    this.set_r_avail = this.set_r_avail.bind(this);
    this.reset1 = this.reset1.bind(this);
    this.set_err_str = this.set_err_str.bind(this);
  }
  reset1(str) {
    console.log('here');
    this.setState((state) => ({
      value: str,
      button_arr: [1,2,3,4,5]
    }));
  }
  handleChange(event) {
    event.preventDefault();
    var len = event.target.value.length;
    var newline = isOverflown(document.getElementById('input_text'));
    if (newline && this.state.line_len == 0) {
      this.setState({line_len: len-1});
    }
    if (len % this.state.line_len == 0 || len % this.state.line_len < this.state.line_len) {
      var rows = (len / this.state.line_len) + 1
      this.setState({rows: rows});
    }
    this.setState({value: event.target.value});
  }
  set_c_level(num) {
    this.setState({c_level: num});
  }
  set_r_avail(bool) {
    this.setState({r_avail: bool});
  }
  set_err_str(str) {
    this.setState({err_str: str});
  }
  render() {
    return (
      <div className='separator'>
      <div style={{color: 'red'}}>{this.state.err_str}</div>
        <div>
          <C_level_buttons arr={this.state.button_arr} clevel={this.set_c_level} ravail={this.set_r_avail}/>
        </div>
        <div className='flex'>
          <div className='input_overflow'>
            <textarea id='input_text' maxlength='500' rows={this.state.rows} className='comment' type='text' value={this.state.value} onChange={this.handleChange} placeHolder='enter comment'/>
          </div>
          <Submit_button error={this.set_err_str} reset={this.reset1} handle={this.handleChange} func={this.props.func} com={this.state.value} clevel={this.state.c_level} ravail={this.state.r_avail}/>
          <style jsx>{`
            .input_overflow {
              width: 100%;
              margin-right: 2%;
            }
            .separator {
              display: flex;
              flex-direction: column;
            }
            .flex {
              display: flex;
              align-items: flex-center;
            }
            .comment {
              border-radius: 5px;
              margin-right: 2%;
              width: 100%;
              resize: none;

              max-height: 10vh;
            }
            .comment:focus {
              outline: none;
              box-shadow: 0 0 1pt 1pt gray;
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
    <div className='separator'>Comments</div>
      <div className='space'>{comments}</div>
      <div className='form'><Input_form func={props.func}/></div>
      <style jsx>{`
        .separator {
          margin-bottom: 3%;
          font-family: Impact, Charcoal, sans-serif;
          font-size: 2em;
          color: white;
          text-shadow: 2px 2px #000000;
        }
        .form {
          margin-top: 5%;
          background-color: #ffc738;
          padding: 3%;
          border-radius: 5px;
          box-shadow: 0 0 3pt 2pt gray;
        }
        .flex {
          display: flex;
          width: 30%;
          height: 550px;
          flex-direction: column;
          background-color: #ffbb00;
          padding: 0.5% 2% 2% 2%;
          border-radius: 10px;
        }
        .space {
          overflow: auto;
          border-radius: 10px;
          box-shadow: 0 0 3pt 2pt gray;
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
