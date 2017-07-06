import React, { Component } from 'react';


class Toolbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount(){
      this.setState({ loading: false })
  }

  render() {
    return (
      <div className="Toolbar">
      </div>
    );
  }
}

export default Toolbar;
