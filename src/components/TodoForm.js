import React from "react";
import { X } from "react-bootstrap-icons";
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function TodoForm({
    handleSubmit,
    heading = false,
    text, setText,
    day, setDay,
    time, setTime,
    todoPriority, setTodoPriority,
    priorities = [],  // Changed from sortedPriority to priorities
    showButtons = false,
    setShowModal = false,
    errors = {}      // Added errors prop
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={handleSubmit} className="TodoForm">
                <div className="text">
                    {heading && <h3>{heading}</h3>}
                    <input 
                        type="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Todo..."
                        autoFocus
                    />
                    {errors.text && <div className="error">{errors.text}</div>}
                </div>

                <div className="dueDate">
                    <p>Due Date</p>
                </div>
                
                <div className="pick-day">
                    <div className="title">
                        <p>Choose a day</p>
                    </div>
                    <DatePicker 
                        value={day}
                        onChange={day => setDay(day)}
                    />
                </div>

                <div className="pick-time">
                    <div className="title">
                        <p>Choose time</p>
                    </div>
                    <TimePicker 
                        value={time}
                        onChange={time => setTime(time)}
                    />
                </div>

                <div className="pick-priority">
                    <div className="title">
                        <p>Todo Priority</p>
                        {errors.priority && <div className="error">{errors.priority}</div>}
                    </div>
                    <div className="priorities">
                        {priorities.map(priority => (
                            <div 
                                className={`priority ${todoPriority === priority.name ? "active" : ""}`}
                                onClick={() => setTodoPriority(priority.name)}
                                key={priority.id}
                            >
                                {priority.name}
                            </div>
                        ))}
                    </div>
                </div>

                {showButtons && (
                    <div>
                        <div className="cancel-add" onClick={() => setShowModal(false)}>
                            <X size='40' />
                        </div>
                        <div className="confirm-add">
                            <button type="submit">Add Todo</button>
                        </div>
                    </div>
                )}
            </form>
        </LocalizationProvider>
    )
}

export default TodoForm;