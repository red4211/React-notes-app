import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';

class InputField extends Component{
  render(){
    return(
        <input type='text' className="inpField" onKeyPress={this.props.testProp} />
      )
  }
}

class NotesList extends Component{
  render(){
    var list = this.props.list;
    var buildList = list.map((current, index)=>{
      if(current.editable==true){
        return <li key={index} onClick={()=>{this.props.editNote(index)}}> 
        <input type='text' className='editInp' defaultValue={current.text} autoFocus onChange={(e)=>this.props.noteChange(index,e)} >
        </input><div className="delete" onClick={this.props.evHandler} parentkey={index}>x</div></li>
      }else{
        return <li key={index} onClick={()=>{this.props.editNote(index)}}>{current.text} <div className="delete" onClick={this.props.evHandler} parentkey={index}>x</div></li>
      }

      
    });

    return(
        <ul className="notes-list">
          {buildList}
        </ul>
      )
  }
}

class App extends Component{
  constructor(props){
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.editNotes = this.editNotes.bind(this);

    this.notesChange = this.notesChange.bind(this);

    this.state = {
      notesText: []
    }
  }
  handleKeyPress(e){
    if(e.key==='Enter'){
      let copyArr = this.state.notesText.slice();
      copyArr.push({text:e.target.value, editable:false});
      e.target.value = '';
      this.setState({notesText: copyArr});
    }
  }

  handleClick(e){
    let copy = this.state.notesText.slice();
    let index = e.target.getAttribute("parentkey");

    copy.splice(index, 1);
    this.setState({notesText: copy})
    }

  editNotes(num){
    let copy = this.state.notesText.slice();
    copy[num].editable = true;
    //rerenders list element as input

    this.setState({notesText: copy});
  }

  notesChange(index, e){//added extra argument w event
    console.log(e.target.value);
    console.log(e.key);
    /*if(e.key==='Enter'){

    let copy = this.state.notesText.slice();
    copy[index].text = e.target.value;
    copy[index].editable = false;

    this.setState({notesText: copy});
    }*/

  }

  render(){
    return (
    <div className="App">
      <InputField testProp={this.handleKeyPress} />
      <NotesList list = {this.state.notesText} evHandler={this.handleClick} editNote={this.editNotes} noteChange={this.notesChange} />
    </div>
  )
  }
}

export default App;
