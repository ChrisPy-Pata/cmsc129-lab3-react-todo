import React, { useContext } from "react";
import { TodoContext } from "../context";
//constant
import {todoItems} from '../constants';

// icons
import {ListTask, CaretUp} from "react-bootstrap-icons";

function ShowTodo() {

    // CONTEXT
    const { setSelectedTodo } = useContext(TodoContext)

    return (
        <div className="ShowTodo">

            <div className="header">
                <div className="title">
                    <ListTask size="20" />
                    <p> Todo List</p>
                </div>

                <div className="btns">
                    <span>
                        <CaretUp size="20" />
                    </span>
                </div>
            </div>

            <div className="items">
                {
                    todoItems.map( item => 
                        <div 
                        className="item" 
                        key={item}
                        onClick={ () => setSelectedTodo(item)}
>
                            {item}
                        </div>
                    )
                }
            </div>
        </div>

    )
}

export default ShowTodo