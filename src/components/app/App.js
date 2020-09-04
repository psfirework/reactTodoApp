import React, {Component} from "react";
import AppHeader from "../appHeader";
import SearchPanel from "../searchPanel";
import ItemStatusFilter from "../itemStatusFilter";
import TodoList from "../todoList";
import ItemAddForm from "../itemAddForm"
import './app.css'

export class App extends Component {
    maxId = 0;

    state = {
        todoData: [
            this.createTodoItem('Learn english'),
            this.createTodoItem('Learn react'),
            this.createTodoItem('Drink coffee'),
        ],
        findItems: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    };

    deleteItem = (id) => {
        this.setState(({todoData}) => {
                const idx = todoData.findIndex((el) => el.id === id);
                const before = todoData.slice(0, idx);
                const after = todoData.slice(idx + 1);
                const newTodoData = [...before, ...after];

                return {
                    todoData: newTodoData
                }
            }
        )
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text)

        this.setState(({todoData}) => {
            const addArr = [
                ...todoData,
                newItem
            ];
            return {
                todoData: addArr
            }
        })
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };
        const doneArr = [...arr];
        doneArr[idx] = newItem;

        return doneArr
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    };

    searchItems = (arrItems, text) => {
        if (text === '') {
            return arrItems
        }
        return arrItems.filter((item) => item.label
            .toLowerCase()
            .includes(text))
    }
    onSearch = (findItems) => {
        this.setState({findItems})
    }
    filters = (items, filter) => {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default :
                return items
        }
    }

    onFilterChange = (filter) => {
        this.setState({filter})
    }




    render() {
        const {todoData, findItems, filter} = this.state;
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.filter((el) => !el.done).length;
        const visibleItems = this.filters(this.searchItems(todoData, findItems), filter);


        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearch={this.onSearch}/>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList todos={visibleItems}
                          onDeleted={this.deleteItem}
                          onDone={this.onToggleDone}
                          onImportant={this.onToggleImportant}/>
                <ItemAddForm
                    onAdded={this.addItem}/>
            </div>
        )
    }

};