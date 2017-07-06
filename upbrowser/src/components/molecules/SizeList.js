import React, { Component } from 'react';

class SizeList extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      list: ['Basique', 'Bichromate sans bleu','Bichromate sans rouge',
      'Bichromate sans vert','Monochromate avec bleu','Monochromate avec vert',
      'Monochromate avec rouge','Non voyant','Dyslexique'],
    }
    this.changeSize = this.changeSize.bind(this)
  }

  componentDidMount(){
      this.setState({ loading: false})
  }

  changeSize(e){
      let paragraphs = document.getElementsByTagName("li");　　　
      for (let i = 0; i < paragraphs.length; i++) {　　　　
      paragraphs[i].style.fontSize = e.target.value + "px";
   }

    paragraphs = document.getElementsByTagName("p");　　　　
       for (let i = 0; i < paragraphs.length; i++) {　　　　
       paragraphs[i].style.fontSize =  e.target.value + "px";
						   }

          paragraphs = document.getElementsByTagName("ol");　　　　
       for (let i = 0; i < paragraphs.length; i++) {　　　　
       paragraphs[i].style.fontSize =  e.target.value + "px";
    }

    paragraphs = document.getElementsByTagName("td");　　　　
       for (let i = 0; i < paragraphs.length; i++) {　　　　
       paragraphs[i].style.fontSize =  e.target.value + "px";
    }

    paragraphs = document.getElementsByTagName("a");　　　　
       for (let i = 0; i < paragraphs.length; i++) {　　　　
       paragraphs[i].style.fontSize =  e.target.value + "px";
    }
 
    paragraphs = document.getElementsByTagName("h1");　　　　
       for (let i = 0; i < paragraphs.length; i++) {　　　　
       paragraphs[i].style.fontSize = (parseInt(e.target.value, 10)+25) + "px";　　　　
    }

    paragraphs = document.getElementsByTagName("h2");　　　　
      for (let i = 0; i < paragraphs.length; i++) {　　　　
      paragraphs[i].style.fontSize = (parseInt(e.target.value, 10)+22) + "px";　　　　
   }

  paragraphs = document.getElementsByTagName("h3");　　　　
     for (let i = 0; i < paragraphs.length; i++) {　　　　
     paragraphs[i].style.fontSize = (parseInt(e.target.value, 10)+9) + "px";　　　　
  }

  paragraphs = document.getElementsByTagName("h4");　　　　
    for (let i = 0; i < paragraphs.length; i++) {　　　　
    paragraphs[i].style.fontSize = (parseInt(e.target.value, 10)+7) + "px";　　　　
   }
  paragraphs = document.getElementsByTagName("h5");　　　　
    for (let i = 0; i < paragraphs.length; i++) {　　　　
    paragraphs[i].style.fontSize = (parseInt(e.target.value, 10)+5) + "px";　　　　
   }

  paragraphs = document.getElementsByTagName("h6");　　　　
     for (let i = 0; i < paragraphs.length; i++) {　　　　
     paragraphs[i].style.fontSize = (parseInt(e.target.value, 10)+3) + "px";　　　　
  }

  }

  render() {
    let array = []
    for (let i = 12; i<=50; i++) {
      array.push(i)
    }
    return (
      <div className="SizeList">
            Taille
	<div></div>
        <select name="sizes" onChange={(e) => this.changeSize(e)}>
        {array.map((i, key) => {
          return <option key={key} value={i}>{i}</option>
        })}
        </select>
      </div>
    );
  }
}

export default SizeList;
