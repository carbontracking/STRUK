import React, { Component } from 'react';

class DisabilityList extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
	list: ['Basique', 'Bichromate sans bleu','Bichromate sans rouge',
      'Bichromate sans vert','Monochromate avec bleu','Monochromate avec vert',
      'Monochromate avec rouge','Non voyant','Dyslexique'],
      selected: 0,
    }
  }

  componentDidMount(){
      this.setState({ loading: false})
  }

  toggleVoice() {
    this.setState({ voice: !this.state.voice})
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default DisabilityList;
