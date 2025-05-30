import React, { useState } from "react";
import { CheckCircleFill, Circle, Trash } from "react-bootstrap-icons";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Todo({ todo, setTodoToEdit }) {
    const [hover, setHover] = useState(false);

    const handleDelete = async (e) => {
        e.stopPropagation(); // Prevent triggering the edit when deleting
        if (window.confirm('Are you sure you want to delete this todo?')) {
            try {
                await deleteDoc(doc(db, 'todos', todo.id));
            } catch (error) {
                console.error('Error deleting todo:', error);
            }
        }
    };

    return (
        <div 
            className="Todo"
            onClick={() => setTodoToEdit(todo)}
        >
            <div 
                className="todo-container"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div className="check-todo">
                    {todo.checked ? (
                        <span className="checked">
                            <CheckCircleFill color="#bebebe" />
                        </span>
                    ) : (
                        <span className="unchecked">
                            <Circle color={todo.color} />
                        </span>
                    )}
                </div>

                <div className="text-container">
                    <div className="text">
                        <p style={{ color: todo.checked ? '#bebebe' : '#000000' }}>
                            {todo.text}
                        </p>
                        <span>
                            {todo.date} {todo.time} - {todo.priorityName}
                        </span>
                        <div className={`line ${todo.checked ? 'line-through' : ''}`} />
                    </div>

                    <div 
                        className="delete-todo"
                        onClick={handleDelete}
                    >
                        {(hover || todo.checked) && <Trash />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todo;

