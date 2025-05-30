import React, { useState, useContext, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment/moment";
import randomColor from "randomcolor";  


import Modal from "./Modal";
import TodoForm from "./TodoForm";
import { TodoContext } from "../context";

// Add New Todo
function AddNewTodo() {
    const { priorities, selectedPriority } = useContext(TodoContext);
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState('');
    const [day, setDay] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [todoPriority, setTodoPriority] = useState(selectedPriority);
    const [errors, setErrors] = useState({
        text: '',
        priority: ''
    });

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

        if (!validateForm()) {
            return;
        }

        try {
            await addDoc(collection(db, 'todos'), {
                text: text.trim(),
                date: moment(day).format('MM/DD/YYYY'),
                day: moment(day).format('d'),
                time: moment(time).format('hh:mm A'),
                checked: false,
                color: randomColor(),
                priorityName: todoPriority,
                createdAt: new Date()
            });

            // Reset form
            setShowModal(false);
            setText('');
            setDay(new Date());
            setTime(new Date());
            setErrors({
                text: '',
                priority: ''
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    useEffect(() => {
        setTodoPriority(selectedPriority);
    }, [selectedPriority]);

    return (
        <div className="AddNewTodo">
            <div className="btn">
                <button onClick={() => setShowModal(true)}>
                    New Todo
                </button>
            </div>

            <Modal showModal={showModal} setShowModal={setShowModal}>
                <TodoForm 
                    handleSubmit={handleSubmit}
                    heading="Add New Todo"
                    text={text}
                    setText={setText}
                    day={day}
                    setDay={setDay}
                    time={time}
                    setTime={setTime}
                    todoPriority={todoPriority}
                    setTodoPriority={setTodoPriority}
                    priorities={priorities}  
                    showButtons={true}
                    setShowModal={setShowModal}
                    errors={errors}
                />
            </Modal>
        </div>
    );
}

export default AddNewTodo;