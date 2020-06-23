import fetch from 'isomorphic-unfetch'
import React, { Component } from 'react'

function Create_commentbox(props) {
  return(
    <div className='flex'>
      <div className='comlev'>
        <div className='bold'>crowd level: {props.c_level}</div>
        <div className='bold'>Racks available? {props.racks ? 'yes' : 'no'}</div>
      </div>
      <div className='unemph'>{props.com}</div>
      <style jsx>{`
        .flex {
          display: flex;
          border-right: 2px solid black;
          border-left: 2px solid black;
          border-top: 2px solid black;
          border-bottom: 0;
          justify-content: space-evenly;
          flex-direction: column;
          margin-bottom: 5px;
        }
        .flex:last-child{
          border-bottom: 2px solid black;
        }
        .flex:nth-child(odd){
          background-color: #CCC;
        }
        .comlev {
          display: flex;
          justify-content: space-evenly;
          margin-bottom: 5px;
        }
        .bold {
          font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
        }
        .unemph {
          font-family: Charcoal, sans-serif;
          line-height: 150%;
          font-size: 16pt;
        }
        `}
      </style>
    </div>
  );
}

function Show_five(props) {
  const arr = props.arr.slice(0,5);
  const comments = arr.map((obj) =>
    <Create_commentbox key={obj.id} com={obj.comment} c_level={obj.c_level} racks={obj.r_avail} />
  );
  return (
    <div>
      <div>{comments}</div>
    </div>
  )
}

export default class extends React.Component {
  static async getInitialProps() {
    const res = await fetch('http://localhost:3000/api/gym')
    const data = await res.json()
    //array is reversed for most recent to show up
    const arr = data.comments.reverse();
    return { arr }
  }
  render() {
    console.log(this.props.arr);
    return(
      <Show_five arr={this.props.arr}/>
    )
  }
}

/*export async function getServerSideProps() {
  const res = await fetch(`https://localhost:3000/api/gym`)
  const data = await res.json()

  return { props: { data } }
}*/
