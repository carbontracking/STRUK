import React, { Component } from 'react';
import MenuTop             from "./components/organisms/MenuTop"
import MenuLeft             from "./components/organisms/MenuLeft"
import MenuRight             from "./components/organisms/MenuRight"
import Parameters             from "./components/organisms/Parameters"
import Document             from "./components/organisms/Document"
import Mousetrap            from 'mousetrap'

import './style/index.css';

class App extends Component {
  constructor(props){
    super(props);
    this.selectedVoice = undefined
    this.TOC = []
    this.state = {
      loading: true,
      displayedParameters: false,
    }
    this.showParameters = this.showParameters.bind(this)
  }

  componentDidMount(){
      this.setState({ loading: false })
      window.addEventListener("keydown", function(e) {
            // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
    //Shortcut for menu
    Mousetrap.bind('escape', () => {
      this.showParameters()
    })
  }

  showParameters(){
    this.setState({displayedParameters: !this.state.displayedParameters})
  }

  setSelectedVoice(e){
    this.selectedVoice = e.target.value
  }

  initTOC(){
      this.TOC = []
  }

  pushToTOC(title){
    this.TOC.push(title)
  }

  render() {
    return (
      <div className="App">
        <MenuTop showParameters={this.showParameters} />
        <div className="Container">
          <MenuLeft TOC={this.TOC}/>
          <Document selectedVoice={this.selectedVoice} pushToTOC={this.pushToTOC.bind(this)}/>
          <MenuRight />
        </div>
        {this.state.displayedParameters ? <div onClick={this.showParameters} className="HiddenApp"></div> : null}
       {this.state.displayedParameters
         ? <Parameters setSelectedVoice={this.setSelectedVoice.bind(this)}/>
         : null
       }
      </div>
    );
  }
}

export default App;
