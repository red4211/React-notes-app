import React, { Component } from 'react';
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

export default NotesList;