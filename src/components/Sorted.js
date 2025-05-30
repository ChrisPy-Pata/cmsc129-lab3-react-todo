import React, { useContext } from "react";
import { TodoContext } from "../context";

// display single selected-priority list
function Sorted({ item}) {
    const { setSelectedPriority } = useContext(TodoContext);

    const handleClick = () => {
        setSelectedPriority(item.name);
    };

    return (
        <div className="Sorted" onClick={handleClick}>
            <div className="name">
                {item.name}
            </div>
            <div className="btns">
                <div className="total-todos">
                    {item.numOfTodos || 0}
                </div>
            </div>
        </div>
    );
}

export default Sorted;