import React, { Component } from 'react';


class Arrows extends Component {
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
            <div className="Arrows">
		</div>
	    );
  }
}

export default Arrows;
