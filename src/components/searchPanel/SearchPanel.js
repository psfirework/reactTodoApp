import React, {Component} from "react";
import './searchPanel.css'

export class SearchPanel extends Component {
    state = {
        findItems: ''
    }
    onSearch = (e) => {
        const findItems = e.target.value;
        this.setState({findItems});
        this.props.onSearch(findItems)
    }

    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   value={this.state.findItems}
                   onChange={this.onSearch}/>
        );
    }


};
