import React, { useContext, useState } from "react";

// import all todo types
//import AllTodo from "./todo-types/AllTodo";

//import CompletedTodo from "./todo-types/CompleteTodo";

import Todo from "./Todo";
import { TodoContext } from "../context";
import CurrentTodo from "./todo-types/Current";
import DueDateTodo from "./todo-types/DueDate";
import { useFilterTodos } from "../hooks";
import EditTodo from "./EditTodo"; // Don't forget to import EditTodo


function Todos() {

    const { todos, selectedTodo, selectedPriority } = useContext(TodoContext);
    const filteredTodos = useFilterTodos(todos, selectedPriority);
    const [todoToEdit, setTodoToEdit] = useState(null);

    if (todoToEdit) {
        return (
            <EditTodo 
                todoToEdit={todoToEdit} 
                setTodoToEdit={setTodoToEdit} 
            />
        );
    }

    return (
        <div className="Todos">
            {/* <AllTodo />
            <CurrentTodo />
            <CompletedTodo /> */}

            <div className="selected-todo">
                {selectedTodo}
            </div>

            <div className="todos">
                {selectedTodo === "Current" ? (
                    <CurrentTodo todos={todos}
                    setTodoToEdit={setTodoToEdit} 
                    
                    />
                ) : selectedTodo === "DueDate" ? (  // Add this condition
                    <DueDateTodo todos={todos}
                    setTodoToEdit={setTodoToEdit} 
                    />
                ) : (
                    todos.map(todo => (
                        <Todo todo={todo} key={todo.id} 
                        setTodoToEdit={setTodoToEdit}
                        />
                    ))
                )}
            </div>

            <div className="todos">
                <div className="todos-priority">
                    {selectedPriority && (
                        <h3>Showing: {selectedPriority} Priority</h3>
                    )}
                    
                    {filteredTodos.length > 0 ? (
                        filteredTodos.map(todo => (
                            <Todo todo={todo} key={todo.id} 
                            setTodoToEdit={setTodoToEdit} 
                            />
                        ))
                    ) : (
                        <p>No todos found{selectedPriority ? ` for ${selectedPriority} priority` : ''}</p>
                    )}
                </div>
            
        </div>



        </div>

    )
}

export default Todos

