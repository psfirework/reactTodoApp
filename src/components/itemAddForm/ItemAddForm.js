import React, {Component} from "react";
import './itemAddForm.css'

export class ItemAddForm extends Component {
    state = {
        label: ''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value,
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        this.props.onAdded(this.state.label);
        this.setState({
            label: ''
        })
    }

    render() {
        return (
            <form className='item-add-form d-flex'
                  onSubmit={this.onSubmit}>
                <input type='text'
                       className='form-control'
                       onChange={this.onLabelChange}
                       placeholder='What need to doing?'
                       value={this.state.label}/>
                <button
                    className='btn btn-outline-secondary'>
                    Add
                </button>
            </form>

        )
    }
}