import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import DisabilityList from "../molecules/DisabilityList"
import SizeList from "../molecules/SizeList"
import FontList from "../molecules/FontList"
import PaletteList from "../molecules/PaletteList"
import VoiceList from "../molecules/VoiceList"

class MenuTop extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      voice: false
    }
  }

  componentDidMount(){
      this.setState({ loading: false })
  }

  generateTOC(){
//    if (this.props.TOC === ""){
      let finalHtml = ""
      let nb_link = 1
      for(let key in this.props.TOC){
	if (key % 2 === 0){
        let element = this.props.TOC[key]
        finalHtml += "<"+element.type+"><a href=\"#section_"+nb_link+"\">"+element.text+"</a></"+element.type+">"
        nb_link += 1
        }
      }
//    }
    return finalHtml
  }

  render() {
    return (
	    <div id="MenuTop">
            { ReactHtmlParser(this.generateTOC()) }
	<DisabilityList onChange={this.onChange} />
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

export default MenuTop;
