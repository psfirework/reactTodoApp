import React from "react";
import TodoListItem from "../todoListItem";
import './todoList.css'

export const TodoList = ({todos, onDeleted, onDone, onImportant}) => {

    const elements = todos.map((item) => {
        const {id, ...restProps} = item;

        return (<li key={id} className='list-group-item'>
                <TodoListItem
                    {...restProps}
                    onDeleted={() => onDeleted(id)}
                    onDone={() => onDone(id)}
                    onImportant={() => onImportant(id)}/>
            </li>
        )
    });
    return (
        <ul className='list-group todo-list'>
            {elements}
        </ul>
    )
};