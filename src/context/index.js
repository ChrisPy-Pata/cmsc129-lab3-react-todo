import { createContext, useState } from "react";
import { useTodos, usePriorities, usePrioritiesWithStats } from "../hooks";

// state management using context api

// a state being shared by all components
const TodoContext = createContext();

// manages shared state and provides values to any child components
function TodoContextProvider({children}){
    
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState(null);

    const todos = useTodos()
    const priorities = usePriorities(todos)
    const prioritiesWithStats = usePrioritiesWithStats(priorities, todos)

    return (
        <TodoContext.Provider
        value={
            {
                selectedTodo,
                setSelectedTodo,
                todos: todos || [],
                priorities: prioritiesWithStats || [],
                selectedPriority,
                setSelectedPriority,
            }
        }
        >
            {children}
        </TodoContext.Provider>
    )
}

export {TodoContextProvider, TodoContext}