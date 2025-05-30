import React, { useState, useEffect, useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";
import TodoForm from "./TodoForm";
import { TodoContext } from "../context";

function EditTodo({ todoToEdit, setTodoToEdit }) {
    const { priorities, selectedPriority } = useContext(TodoContext);
    const [text, setText] = useState(todoToEdit?.text || "");
    const [day, setDay] = useState(todoToEdit?.date ? new Date(todoToEdit.date) : new Date());
    const [time, setTime] = useState(todoToEdit?.time ? moment(todoToEdit.time, "hh:mm A").toDate() : new Date());
    const [todoPriority, setTodoPriority] = useState(todoToEdit?.priorityName || "");
    const [errors, setErrors] = useState({
        text: '',
        priority: ''
    });

    useEffect(() => {
        if (todoToEdit) {
            setText(todoToEdit.text);
            setDay(todoToEdit.date ? new Date(todoToEdit.date) : new Date());
            setTime(todoToEdit.time ? moment(todoToEdit.time, "hh:mm A").toDate() : new Date());
            setTodoPriority(todoToEdit.priorityName);
        }
    }, [todoToEdit]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            text: '',
            priority: ''
        };

        if (!text.trim()) {
            newErrors.text = 'Please enter a task description';
            isValid = false;
        }

        if (!todoPriority) {
            newErrors.priority = 'Please select a priority';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await updateDoc(doc(db, 'todos', todoToEdit.id), {
                text: text.trim(),
                date: moment(day).format('MM/DD/YYYY'),
                time: moment(time).format('hh:mm A'),
                priorityName: todoPriority  // Ensure this matches your Firestore field name
            });
            setTodoToEdit(null);
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    }

    if (!todoToEdit) return null;

    return (
        <div className="EditTodo">
            <TodoForm 
                handleSubmit={handleSubmit}
                heading="Edit Todo"
                text={text}
                setText={setText}
                day={day}
                setDay={setDay}
                time={time}
                setTime={setTime}
                todoPriority={todoPriority}
                setTodoPriority={setTodoPriority}
                priorities={priorities}
                selectedPriority={selectedPriority}
                showButtons={true}
                setShowModal={() => setTodoToEdit(null)}
                errors={errors}
            />
        </div>
    );
}

export default EditTodo;