import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

var cpt = 1
var cpt2 = 0

class MenuTop extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
	voice: false,
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

  generateTOC(){
      let finalHtml = ""
      let nb_link = 1
      if (cpt === 1)
      {
      for(let key in this.props.TOC){
	if (key % 2 === 0){
        let element = this.props.TOC[key]
        finalHtml += "<"+element.type+"><a href=\"#section_"+nb_link+"\">"+element.text+"</a></"+element.type+">"
            nb_link += 1
	    cpt = 2
	    cpt2 =nb_link
        }
      }
      }
      else
      {
	  for(let key in this.props.TOC){
	      if (nb_link < cpt2)
	      {
	if (key % 2 === 0){
        let element = this.props.TOC[key]
        finalHtml += "<"+element.type+"><a href=\"#section_"+nb_link
	finalHtml += "\">"+element.text+"</a></"+element.type+">"
            nb_link += 1
        }
	      }
      }
      }
    return finalHtml
  }

  render() {
    return (
	    <div id="MenuTop">
            { ReactHtmlParser(this.generateTOC()) }
      </div>
    );
  }
}

export default MenuTop;
