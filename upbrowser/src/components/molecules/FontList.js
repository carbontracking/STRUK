import React, { Component } from 'react';

class FontList extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      selected: "Times New Roman",
    }
    this.changeFont = this.changeFont.bind(this)
  }

  componentDidMount(){
      this.setState({ loading: false})
      if(this.props.disease === 'Dyslexique') {
        this.setState({selected: 'sans-serif'})
      }
  }

  changeFont(e) {
    this.setState({selected: e.target.value})
    let elts = document.getElementsByTagName("body");
      for (let i = 0; i < elts.length; i++) {　　　　
      elts[i].style.fontFamily = e.target.value;　　　　
   }
  }

  render() {
    let array = ["Times New Roman", "Roboto","Arial","monospace" ,"sans-serif" ,"serif"]
    return (
      <div className="FontList">
	    Police
	<div></div>
        <select style={{fontFamily: this.state.selected}} name="fonts" onChange={(e) => this.changeFont(e)}>
        {array.map((font, key) => {
          return this.state.selected === font
            ? <option style={{fontFamily: font}} defaultValue key={key} value={font}>{font}</option>
            : <option style={{fontFamily: font}} key={key} value={font}>{font}</option>
        })}
        </select>
      </div>
    );
  }
}

export default FontList;
