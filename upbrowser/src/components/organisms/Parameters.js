import React, { Component } from 'react';
import SizeList from "../molecules/SizeList"
import FontList from "../molecules/FontList"
import PaletteList from "../molecules/PaletteList"
import VoiceList from "../molecules/VoiceList"


class Parameters extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      disease: "Basique"
    }
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount(){
      this.setState({ loading: false })
  }

  onChange(e){
    this.setState({disease: e.target.value})
  }

  render() {
    return (
      <div className="Parameters">
        <div className="Online">
          <SizeList disease={this.state.disease}/>
          <FontList disease={this.state.disease}/>
            </div>
	    	    <PaletteList disease={this.state.disease}/>
            <VoiceList setSelectedVoice={this.props.setSelectedVoice}/>
      </div>
    );
  }
}

export default Parameters;
