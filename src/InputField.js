import React, { Component } from 'react';

class InputField extends Component {
    render() {
        return (
            <input type='text' className="inpField" placeholder="Enter your note here" onKeyPress={this.props.testProp} />
        )
    }
}

export default InputField;