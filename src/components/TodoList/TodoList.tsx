import { TodoItem } from "../TodoItem/TodoItem"

export interface ITask {
    id: string;
    title: string;
    isDone: boolean;
}

interface ITodoList {
    tasks: ITask[];
    onDeleteTaskButtonClick: (id: string) => void;
    onTaskCompleteChange: (id: string) => void;
}

export const TodoList = (props: ITodoList) => {

    const { 
        tasks,
        onDeleteTaskButtonClick,
        onTaskCompleteChange
    } = props
    
    const hasTask = true;

    if(!hasTask){
        return <div className="todo__empty-message"></div>
    }
    
    return (
        <ul className="todo__list">
            {
                tasks.map((task: ITask) => {
                    return (
                        <TodoItem 
                            key={task.id}
                            className="todo__item"
                            onDeleteTaskButtonClick= {onDeleteTaskButtonClick}
                            onTaskCompleteChange= {onTaskCompleteChange}
                            {...task}
                        />
                    )
                })
            }
            
        </ul>
    )
    
}