import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'xterm/dist/xterm.css'
import { Terminal } from 'xterm'
import * as attach from 'xterm/lib/addons/attach/attach'

Terminal.applyAddon(attach)

class App extends Component {

  async componentDidMount() {
    const protocol = (window.location.protocol === 'https:') ? 'wss://' : 'ws://';
    let socketURL = protocol + window.location.hostname + ((window.location.port) ? (':' + window.location.port) : '') + '/terminals/'
    
    const term = new Terminal({});
    term.open(this.termElm);
    
    const res = await fetch('/terminals?cols=' + term.cols + '&rows=' + term.rows, {method: 'POST'})
    const processId = await res.text()
    
    // const pid = processId;
    socketURL += processId;
    const socket = new WebSocket(socketURL);
    
    socket.onopen = () => {
      term.attach(socket);
      term._initialized = true;
    }
    this.term = term
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div style={{padding:'10px'}}>
          <div ref={ref=>this.termElm = ref}></div>
        </div>
      </div>
    );
  }
}

export default App;
