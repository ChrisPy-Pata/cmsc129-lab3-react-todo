import { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import the db from your firebase config
import { collection, onSnapshot } from 'firebase/firestore';


export function useTodos() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setTodos(data)
        })

        return () => unsubscribe() 
    }, [])

    return todos
}

export function useFilterTodos(todos, selectedPriority) {
    const [filteredTodos, setFilteredTodos] = useState([]);

    useEffect(() => {
        if (!selectedPriority) {
            setFilteredTodos(todos);
            return;
        }

        const filtered = todos.filter(todo => 
            todo.priorityName?.toLowerCase() === selectedPriority.toLowerCase()
        );
        setFilteredTodos(filtered);
    }, [todos, selectedPriority]);

    return filteredTodos;
}

export function usePriorities(todos = []) {
    const [priorities, setPriorities] = useState([])

    function CalculateNumOfTodos(priorityName, todos = []) {
        return todos.filter(todo => todo.priorityName === priorityName).length
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'priorities'), (snapshot) => {
            const data = snapshot.docs.map(doc => {
                const priorityName = doc.data().name
                return {
                    id: doc.id,
                    name: priorityName,
                    numOfTodos: CalculateNumOfTodos(priorityName, todos)
                }
            })
            setPriorities(data)
        })

        return () => unsubscribe()
    }, [todos])

    return priorities
}

export function usePrioritiesWithStats(priorities = [], todos = []) {
    const [prioritiesWithStats, setPrioritiesWithStats] = useState([])

    useEffect(() => {
        const data = priorities.map((priority) => {
            return {
                numOfTodos: todos.filter(todo => 
                    todo.priorityName === priority.name && !todo.checked
                ).length,
                ...priority
            }
        })
        setPrioritiesWithStats(data)
    }, [priorities, todos])

    return prioritiesWithStats
}