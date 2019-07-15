import React, { Component } from 'react';
import './App.css';

class InputField extends Component {
    render() {
        return (
            <input type='text' className="inpField" placeholder="Enter your note here" onKeyPress={this.props.testProp} />
        )
    }
}

class NotesList extends Component {
    render() {
        var list = this.props.list;
        var buildList = list.map((current, index) => {
            if (current.editable == true) { //list item contents depend on true/false flag in state
                return <li key={index}> 
              <textarea className='editInp' defaultValue={current.text} autoFocus onKeyPress={(e)=>this.props.noteChange(index,e)} onBlur={(e)=>{ this.props.testEvt(index, e)}} ></textarea>
               <div className="delete" parentkey={index} onClick={this.props.evHandler}>x</div> </li>
            } else {
                return <li key={index}><div onClick={()=>{this.props.editNote(index)}}>{current.text}</div> <div className="delete" parentkey={index} onClick={this.props.evHandler}>x</div></li>
            }
        });

        return (
            <ul className="notes-list">
              {buildList}
            </ul>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.editNotes = this.editNotes.bind(this);

        this.notesChange = this.notesChange.bind(this);
        this.blurEvt = this.blurEvt.bind(this);

        this.state = {
            notesText: []
        }
    }

    componentDidMount() {
        try {
            const notesJSON = localStorage.getItem("notes");
            if (notesJSON) {
                const notesText = JSON.parse(notesJSON);
                this.setState({notesText: notesText });
            }
        } catch (e) {
           console.warn('JSON parse exception' + e);
        }
      }

        handleKeyPress(e) {
            if (e.key === 'Enter') {
                let copyArr = this.state.notesText.slice();
                copyArr.push({ text: e.target.value, editable: false });
                e.target.value = '';
                this.setState({ notesText: copyArr });
                /*localStorage*/
                localStorage.setItem("notes", JSON.stringify(copyArr));
            }
        }

        deleteNote(e) {
            let copy = this.state.notesText.slice();
            let index = e.target.getAttribute("parentkey");

            copy.splice(index, 1);
            this.setState({ notesText: copy });
            localStorage.setItem("notes", JSON.stringify(copy)); //dont forget to change localstorage
        }

        editNotes(num) {
            let copy = this.state.notesText.slice();
            copy[num].editable = true;
            //change editable flag, renders input on click

            this.setState({ notesText: copy });
        }

        notesChange(index, e) { //added extra argument w event
            if (e.key === 'Enter') {

                let copy = this.state.notesText.slice();
                copy[index].text = e.target.value;
                copy[index].editable = false;

                this.setState({ notesText: copy });
                localStorage.setItem("notes", JSON.stringify(copy));
            }

        }

        blurEvt(index, e) {
            let copy = this.state.notesText.slice();
            copy[index].text = e.target.value;
            copy[index].editable = false;

            this.setState({ notesText: copy });
            localStorage.setItem("notes", JSON.stringify(copy));
        }

        render() {
            return (
                <div className="App">
                <p className="title" >Notes</p>
                <InputField testProp={this.handleKeyPress} />
                <NotesList list = {this.state.notesText} evHandler={this.deleteNote} editNote={this.editNotes} noteChange={this.notesChange} testEvt={this.blurEvt} />
              </div>
            )
        }
    }
    export default App;