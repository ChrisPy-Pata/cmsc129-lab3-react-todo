import { useContext } from "react";
import Sorted from "./Sorted";
import { Filter, CaretUp } from "react-bootstrap-icons";
import { TodoContext } from "../context";

function SortTodo() {
    const { priorities } = useContext(TodoContext);

    return (
        <div className="SortTodo">
            <div className="header">
                <div className="title">
                   <Filter size="26" />
                   <p>Sort Todo</p> 
                </div>
                <div className="btns">
                    <span>
                        <CaretUp size="20" />
                    </span>
                </div>
            </div>

            <div className="items">
                {priorities.map(item => (
                    <Sorted
                        item={item}
                        key={item.id}
                        isPriority={true}
                    />
                ))}
            </div>
        </div>
    );
}

export default SortTodo;