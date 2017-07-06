import React, { Component } from 'react';

class MenuLeft extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      voice: false,
      actualZoom: 100,
    }
    this.toggleVoice = this.toggleVoice.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
  }

  componentDidMount(){
      this.setState({ loading: false})
  }

    toggleVoice() {
    this.setState({ voice: !this.state.voice})
  }

  zoomIn() {
    document.body.style.zoom = (this.state.actualZoom + 10 ).toString() + "%"
    this.setState({actualZoom: this.state.actualZoom + 10})
  }

  zoomOut() {
    document.body.style.zoom = (this.state.actualZoom -10).toString() + "%"
    this.setState({actualZoom: this.state.actualZoom - 10})
  }

  render() {
    return (
      <div id="MenuLeft">
        {this.state.voice
        }
            <div className="Zoom">
        </div>
      </div>
    );
  }
}

export default MenuLeft;
