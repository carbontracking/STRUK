import React, { Component } from 'react';
import Arrows from "../molecules/Arrows"
import Toolbar from "../molecules/Toolbar";

class MenuRight extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      voice: false,
    }
  }

  componentDidMount(){
      this.setState({ loading: false })
  }

  render() {
    return (
      <div id="MenuRight">
        <Arrows />
        <Toolbar />
      </div>
    );
  }
}

export default MenuRight;
