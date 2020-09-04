import React, {Component} from "react";
import './todoListItem.css'

export class TodoListItem extends Component {

    render() {
        const {
            label, onDeleted,
            onDone, onImportant,
            important, done
        } = this.props;

        let classNames = 'todo-list-item';

        if (done) {
            classNames += ' done'
        }

        if (important) {
            classNames += ' important'
        }
        return (
            <span className={classNames}>
      <span
          className="todo-list-item-label"
          onClick={onDone}>
        {label}
      </span>

        <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={onImportant}>
        <i className="fa fa-exclamation"/>
      </button>

      <button type="button"
              className="btn btn-outline-danger btn-sm float-right"
              onClick={onDeleted}>
        <i className="fa fa-trash-o"/>
      </button>
    </span>
        )
    }
}