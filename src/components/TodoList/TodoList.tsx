import { TodoItem } from "../TodoItem/TodoItem"

export interface ITask {
    id: string;
    title: string;
    isDone: boolean;
}

interface ITodoList {
    filteredTasks: ITask[] | null;
    tasks: ITask[];
    onDeleteTaskButtonClick: (id: string) => void;
    onTaskCompleteChange: (id: string) => void;
}

export const TodoList = (props: ITodoList) => {

    const { 
        filteredTasks,
        tasks,
        onDeleteTaskButtonClick,
        onTaskCompleteChange
    } = props
    
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