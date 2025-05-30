import React, { useEffect, useState } from "react";
import { CheckCircleFill, Circle, Trash } from "react-bootstrap-icons";
import moment from "moment";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function DueDateTodo({ todos, setTodoToEdit }) {
    const [sortedTodos, setSortedTodos] = useState([]);
    const [hoveredTodo, setHoveredTodo] = useState(null);

    useEffect(() => {
        if (!todos || !Array.isArray(todos)) {
            setSortedTodos([]);
            return;
        }

        const sorted = [...todos].sort((a, b) => {
            const dateA = moment(`${a.date} ${a.time}`, "MM/DD/YYYY hh:mm A");
            const dateB = moment(`${b.date} ${b.time}`, "MM/DD/YYYY hh:mm A");
            return dateA - dateB;
        });

        setSortedTodos(sorted);
    }, [todos]);

    const handleDelete = async (todoId, e) => {
        e.stopPropagation(); 
        if (window.confirm('Are you sure you want to delete this todo?')) {
            try {
                await deleteDoc(doc(db, 'todos', todoId));
            } catch (error) {
                console.error('Error deleting todo:', error);
            }
        }
    };

    return (
        <div className="todos">
            <h2>Todos by Due Date</h2>
            {sortedTodos.map(todo => (
                <div 
                    key={todo.id}
                    className="Todo"
                    onClick={() => setTodoToEdit(todo)}
                    onMouseEnter={() => setHoveredTodo(todo.id)}
                    onMouseLeave={() => setHoveredTodo(null)}
                >
                    <div className="todo-container">
                        <div className="check-todo">
                            {todo.checked ? (
                                <CheckCircleFill color="#bebebe" />
                            ) : (
                                <Circle color={todo.color} />
                            )}
                        </div>

                        <div className="text">
                            <p style={{ color: todo.checked ? '#bebebe' : '#000000' }}>
                                {todo.text}
                            </p>
                            <span>
                                Due: {todo.date} {todo.time} | Priority: {todo.priorityName}
                            </span>
                            <div className={`line ${todo.checked ? 'line-through' : ''}`} />
                        </div>

                        <div 
                            className="delete-todo"
                            onClick={(e) => handleDelete(todo.id, e)}
                        >
                            {(hoveredTodo === todo.id || todo.checked) && <Trash />}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DueDateTodo;