import React, { Component } from 'react'
import jsonPage from '../../res/formatted.json'
import Mousetrap from 'mousetrap'
import {htmlTemplate} from '../../res/html.js'
import htmlparser from 'htmlparser2'
import ReactHtmlParser from 'react-html-parser';

class Document extends Component {
  constructor(props){
    super(props);
    this.typeSelected = ""
    this.initElements()
    this.voice = true
    this.maxElements = 0
    this.selectedText = ""
    this.synth = ""
    this.state = {
      loading: true,
      json: jsonPage,
      selected: 0,
      typeSelected: "",
      htmlRender: ""
    }
  }

  getSelectedText(){
    return this.selectedText
  }

  getSelectedVoice(){
    console.log("InGEtSelectedVoice", this.props.selectedVoice)
    let voices = []
    voices = this.synth.getVoices();
    let result = ""
    var selectedOption = this.props.selectedVoice;
    for(let i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        result = voices[i]
      }
    }
    return result;
  }


  speak(){
    var utterThis = new SpeechSynthesisUtterance(this.selectedText);

    utterThis.voice = this.getSelectedVoice()
    utterThis.pitch = 1
    utterThis.rate = 0.80
    this.synth.speak(utterThis)

    utterThis.onpause = function(event) {
     var char = event.utterance.text.charAt(event.charIndex);
     console.log('Speech paused at character ' + event.charIndex + ' of "' +
     event.utterance.text + '", which is "' + char + '".');
    }
  }

  componentDidMount(){
    //Set all the key listenners
    let context = this
    this.synth = window.speechSynthesis

    Mousetrap.bind('left', () => {
      let priorityOrder = ["h1", "h2", "h3", "h4", "h5", "p", "li"]
        let found = false
            for(let j=0;(j<5)&&(found===false);j++){
                for(let k=0;(k<context.elements[priorityOrder[j]].length)&&(found===false);k++){
                                    if(context.elements[priorityOrder[j]][k] === context.state.selected){
                        found = true
                    }
                }
            }
        if(found===false){
            this.setState({selected: context.state.selected - 1})
	    	      context.speak()
        }
    })

    Mousetrap.bind('right', () => {
      let priorityOrder = ["h1", "h2", "h3", "h4", "h5", "p", "li"]
        let found = false
            for(let j=0;(j<5)&&(found===false);j++){
                for(let k=0;(k<context.elements[priorityOrder[j]].length)&&(found===false);k++){
                    if(context.elements[priorityOrder[j]][k] === context.state.selected + 1 || context.state.selected >= context.maxElements - 1){
                        found = true
                    }
                }
            }
        if(found===false){
            this.setState({selected: context.state.selected + 1})
	    	      context.speak()
        }
    })

      Mousetrap.bind('space', () => {
	  if (this.voice === true)
	  {
	      context.speak()
	      this.voice = false
	  }
	  else
	  {
	      this.voice = true
	  }
    })

    Mousetrap.bind('down', () => {
      let priorityOrder = ["h1", "h2", "h3", "h4", "h5", "p", "li"]
      let currentElement = -1
        let found = false
        for(let i=1; (context.state.selected + i < context.maxElements-1)&&(found===false);i++){
            for(let j=0;(j<5)&&(found===false);j++){
                for(let k=0;(k<context.elements[priorityOrder[j]].length)&&(found===false);k++){
                    if(context.elements[priorityOrder[j]][k] === context.state.selected + i){
                        currentElement = context.state.selected + i;
                        found = true
                    }
                }
            }
        }
        if(found===true){
            this.setState({selected: currentElement})
	    	      context.speak()
        }
    })

      Mousetrap.bind('up', () => {
      let priorityOrder = ["h1", "h2", "h3", "h4", "h5", "p", "li"]
      let currentElement = -1
        let found = false
        for(let i=1; (context.state.selected - i >= 0)&&(found===false);i++){
            for(let j=0;(j<5)&&(found===false);j++){
                for(let k=0;(k<context.elements[priorityOrder[j]].length)&&(found===false);k++){
                    if(context.elements[priorityOrder[j]][k] === context.state.selected - i){
			currentElement = context.state.selected - i;
                        found = true
                    }
	        }
            }
        }
        if(found===true){
            this.setState({selected: currentElement})
	    	      context.speak()
        }
    })
  }

  initElements(){
    this.elements = {
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      p: [],
      li: [],
      ol: [],
      ul: [],
    }
  }

  render() {
    let finalHtml
    let i = 0
    this.initElements()
    let title = ["h1", "h2", "h3", "h4", "h5"]
    let nb_link = 0
    let cursorTag
    let context = this
    //Generate the page HTML, and store the cursor as well as the current selected text
    var parser = new htmlparser.Parser({
      onopentag: function(name, attribs){
          cursorTag = name
        if(name in context.elements && name !== "ul" && name !== "ol"){
          context.elements[name].push(i)
          finalHtml += "<"+name
          if(context.state.selected === i && name !== "ul" && name !== "ol" ){
            finalHtml += " id='selected'"
            context.typeSelected = name
          }
            finalHtml += ">"
	    let found = false
	    nb_link += 1
	    for(let j=0;(j<5)&&(found===false);j++){
		for(let k=0;(k<context.elements[title[j]].length)&&(found===false);k++){
		    if(context.elements[title[j]][k] === context.state.selected){
			finalHtml += "<div id='section_"+nb_link+"'>"
			found = true
		    }
		}
	    }
	    if(found===false){
		finalHtml += "<div id='temp'>"
	    }
          i++
        }
      },
      ontext: function(text){
          if(["h1", "h2", "h3", "h4", "h5"].indexOf(cursorTag) > -1){
              context.props.pushToTOC({type: cursorTag, text: text})
        }
        if(i > 0){
          finalHtml += text
          if(context.state.selected === i-1 && text.match(/^\s+$/) === null){
            context.selectedText = text
          }
        }
      },
      onclosetag: function(name){
          finalHtml += "</div></"+name+">"
      }
  }, {decodeEntities: true});
  parser.write(htmlTemplate);
  parser.end();

  finalHtml = finalHtml.replace("undefined", "");

  this.maxElements = i

    return <div className="Document">{ ReactHtmlParser(finalHtml) }</div>;
  }
}

export default Document;
