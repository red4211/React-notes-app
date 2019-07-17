import React, { Component } from 'react';
import InputField from './InputField';
import NotesList from './NotesList';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.editNotes = this.editNotes.bind(this);

        this.editOnEnter = this.editOnEnter.bind(this);
        this.editOnBlur = this.editOnBlur.bind(this);

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

        addNote(e) {
            if (e.key === 'Enter') {
                let copyArr = [...this.state.notesText] ;
                copyArr.push({ text: e.target.value, editable: false });
                e.target.value = '';
                this.setState({ notesText: copyArr });
                /*localStorage*/
                localStorage.setItem("notes", JSON.stringify(copyArr));
            }
        }

        deleteNote(e) {
            let copy = [...this.state.notesText];
            let index = e.target.getAttribute("parentkey");

            copy.splice(index, 1);
            this.setState({ notesText: copy });
            localStorage.setItem("notes", JSON.stringify(copy)); //dont forget to change localstorage
        }

        editNotes(num) {
            let copy = [...this.state.notesText];
            copy[num].editable = true;
            //change editable flag, renders input on click

            this.setState({ notesText: copy });
        }

        editOnEnter(index, e) { //added extra argument w event
            if (e.key === 'Enter') {

                let copy = [...this.state.notesText];
                copy[index].text = e.target.value;
                copy[index].editable = false;

                this.setState({ notesText: copy });
                localStorage.setItem("notes", JSON.stringify(copy));
            }

        }

        editOnBlur(index, e) {
            let copy = [...this.state.notesText] ;
            copy[index].text = e.target.value;
            copy[index].editable = false;

            this.setState({ notesText: copy });
            localStorage.setItem("notes", JSON.stringify(copy));
        }

        render() {
            return (
                <div className="App">
                <p className="title" >Notes</p>
                <InputField testProp={this.addNote} />
                <NotesList list = {this.state.notesText} evHandler={this.deleteNote} editNote={this.editNotes} noteChange={this.editOnEnter} testEvt={this.editOnBlur} />
              </div>
            )
        }
    }
export default App;