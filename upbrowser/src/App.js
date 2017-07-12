import React, { Component } from 'react';
import Mousetrap	    from 'mousetrap'
import MenuLeft             from "./components/organisms/MenuLeft"
import Parameters             from "./components/organisms/Parameters"
import Document             from "./components/organisms/Document"
import MenuTop             from "./components/organisms/MenuTop"

import keyboard	from './keyboard.js';
import './style/index.css';


class App extends Component {
  constructor(props){
    super(props);
      this.selectedVoice = keyboard[9]
    this.TOC = []
    this.state = {
      loading: true,
      displayedParameters: false,
    }
    this.showParameters = this.showParameters.bind(this)
  }

  componentDidMount(){
      window.addEventListener("keydown", function(e) {
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
          Mousetrap.bind(keyboard[0], () =>
		   {
		       this.showParameters()
		   })
  }

    showParameters(){
      this.setState({displayedParameters: !this.state.displayedParameters})
  }

    setSelectedVoice(e){
	    this.setState({displayedParameters: this.state.displayedParameters})
	this.selectedVoice = e.target.value
	      if (this.selectedVoice !== 'Google français' && this.selectedVoice !== 'french' && this.selectedVoice !== 'Google french')
          keyboard[6] =  keyboard[7]
      else
          keyboard[6] =  keyboard[8]

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
	      <MenuLeft showParameters={this.showParameters} TOC={this.TOC}/>
	      	      <MenuTop showParameters={this.showParameters} TOC={this.TOC}/>
              <div className="Container">
            <Document selectedVoice={this.selectedVoice}  pushToTOC={this.pushToTOC.bind(this)}/>
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
