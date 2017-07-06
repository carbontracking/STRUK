import React, { Component } from 'react';

class SizeList extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
      this.setState({ loading: false})
      this.populateVoiceList()
  }

  populateVoiceList() {
    var voiceSelect = this.voiceSelect
    var synth = window.speechSynthesis
    var voices = []
    voices = synth.getVoices()
    var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex
    voiceSelect.innerHTML = ''
      for(let i = 0; i < voices.length ; i++) {
      var option = document.createElement('option')
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')'

      if(voices[i].default) {
        option.textContent += ' -- DEFAULT'
      }

	  option.setAttribute('data-lang', voices[i].lang)
      option.setAttribute('data-name', voices[i].name)
      option.setAttribute('value', voices[i].name)
      voiceSelect.appendChild(option);
    }
    voiceSelect.selectedIndex = selectedIndex;
  }

  render() {
    let array = []
      for (let i = 12; i<=50; i++) {
      array.push(i)
    }
    return (
      <div className="Voice">
            Voix
	<div></div>
        <select id="voiceSelect"
          ref={(select) => { this.voiceSelect = select; }}
          onChange={(e) => this.props.setSelectedVoice(e)}
        >

        </select>
      </div>
    );
  }
}

export default SizeList;
