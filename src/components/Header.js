import React, { Component } from 'react'
import logo from './logo.png';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="title">
            <img className="logo" src={logo} alt="Beers and boards equals friends"/>
            <h1>Beer Boarding</h1>
        </div>
        <h2 className="tagline">Javascript Whiteboard Practice for Champions</h2>
        {/* <h3>return (Beer ? "WhiteBoard with friends!" : "Weep") </h3> */}
      </div>
    )
  }
}
