import React, { Component } from 'react'
export default class Sidebar extends Component {
    renderSidebar = () => {
      return <div className="sidebar">
        <div className="sidebar-link">Home</div>
        <div className="sidebar-link">About</div>
        <div className="sidebar-link">Contact</div>
      </div>
    }
    render() {
      return <div className="sidebar-container">
        {this.renderSidebar()}
      </div>
    }
  }