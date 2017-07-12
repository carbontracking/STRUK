import React, { Component } from 'react'

class PaletteList extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      active: 1,
      selected: 1,
    }
    this.toggleActive = this.toggleActive.bind(this)
  }

  componentDidMount(){
      this.setState({ loading: false})
  }

  componentDidUpdate(){
    console.log(this.state.active)
    switch(this.state.active) {
      default :
        document.getElementById("MenuLeft").style.background = '#FFFFFF'
        break;
      case 2:
        document.getElementById("MenuLeft").style.background = '#E0CDA9'
        break;
      case 3:
        document.getElementById("MenuLeft").style.background = '#D2CAEC'
        break;
    }
  }
  toggleActive(newActive){
    this.setState({active: newActive})

  }

  render() {
    return (
      <div className="PaletteTop">
        <div className="PaletteList">
          {this.state.active === 1
            ? <div className="Palette Active" onClick={() => this.toggleActive(1)}>
              <div style={{width: "4em", height: "4em", background: '#FFFFFF'}}></div>
            </div>
            : <div className="Palette" onClick={() => this.toggleActive(1)}>
              <div style={{width: "4em", height: "4em", background: '#FFFFFF'}}></div>
            </div>
          }
          {this.state.active === 2
            ? <div className="Palette Active" onClick={() => this.toggleActive(2)}>
              <div style={{width: "4em", height: "4em", background: '#E0CDA9'}}></div>
            </div>
            : <div className="Palette" onClick={() => this.toggleActive(2)}>
              <div style={{width: "4em", height: "4em", background:  '#E0CDA9'}}></div>
            </div>
          }
          {this.state.active === 3
            ? <div className="Palette Active" onClick={() => this.toggleActive(3)}>
            <div style={{width: "4em", height: "4em", background: '#D2CAEC'}}></div>
            </div>
            : <div className="Palette" onClick={() => this.toggleActive(3)}>
              <div style={{width: "4em", height: "4em", background: '#D2CAEC'}}></div>
            </div>
          }
        </div>
      </div>

    );
  }
}

export default PaletteList;
