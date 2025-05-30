import { useEffect, useState } from "react";
import { CheckCircleFill, Circle, Trash } from "react-bootstrap-icons";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';


function CurrentTodo({ todos, setTodoToEdit }) {
    const [sortedTodos, setSortedTodos] = useState([]);
    const [hoveredTodo, setHoveredTodo] = useState(null);

    useEffect(() => {
        if (!todos || !Array.isArray(todos)) {
            setSortedTodos([]);
            return;
        }

        const sorted = [...todos].sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
            return dateB - dateA;
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
            <h2>Recently Added Todos</h2>
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
                                Added: {new Date(todo.createdAt?.toDate?.() || todo.createdAt).toLocaleString()} | 
                                Priority: {todo.priorityName}
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

export default CurrentTodo;