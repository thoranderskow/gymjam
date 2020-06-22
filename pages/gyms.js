import fetch from 'isomorphic-unfetch'
import React, { Component } from 'react'

export default class extends React.Component {
  static async getInitialProps() {
    const res = await fetch('http://localhost:3000/api/gym')
    const data = await res.json()
    console.log(data);
    const newdata = JSON.stringify(data);
    return { newdata }
  }
  render() {
    return(
      <h1>{this.props.newdata}</h1>
    )
  }
}

/*export async function getServerSideProps() {
  const res = await fetch(`https://localhost:3000/api/gym`)
  const data = await res.json()

  return { props: { data } }
}*/
