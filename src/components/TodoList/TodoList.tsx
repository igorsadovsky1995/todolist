import type { RefObject } from "react";
import { memo } from "react";
import TodoItem from "../TodoItem/TodoItem"
import { useContext } from "react";
import { TasksContext } from "../../context/TasksContext";

export interface ITaskCreate {
    title: string;
    isDone: boolean;
}

export interface ITask extends ITaskCreate {
    id: string;
}

const TodoList = () => {

    const { 
        filteredTasks,
        tasks,
        deleteTask,
        toggleIsComplete,
        firstIncompleteTaskID,
        firstIncompleteTaskRef
    } = useContext(TasksContext)
    
    const hasTask = tasks.length > 0;
    const isEmptyFilteredTasks = filteredTasks?.length === 0;

    if(!hasTask){
        return <div className="todo__empty-message">There are no tasks yet</div>
    }

    if(hasTask && isEmptyFilteredTasks){
        return <div className="todo__empty-message">Not found</div>
    }
    
    return (
        <ul className="todo__list">
            {
                (filteredTasks ?? tasks).map((task: ITask) => {
                    return (
                        <TodoItem 
                            key={task.id}
                            className="todo__item"
                            {...task}
                        />
                    )
                })
            }
            
        </ul>
    )
    
}

export default memo(TodoList);