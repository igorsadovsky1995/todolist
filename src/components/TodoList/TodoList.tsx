import { memo } from "react";
import TodoItem from "../TodoItem/TodoItem"
import { useContext } from "react";
import { TasksContext } from "../../context/TasksContext";
import type { ICSSModule } from "../Todo/Todo";

export interface ITaskCreate {
    title: string;
    isDone: boolean;
}

export interface ITask extends ITaskCreate {
    id: string;
}

const TodoList = (props: ICSSModule) => {

    const {
        styles
    } = props;

    const { 
        filteredTasks,
        tasks
    } = useContext(TasksContext)
    
    const hasTask = tasks.length > 0;
    const isEmptyFilteredTasks = filteredTasks?.length === 0;

    if(!hasTask){
        return <div className={styles.emptyMessage}>There are no tasks yet</div>
    }

    if(hasTask && isEmptyFilteredTasks){
        return <div className={styles.emptyMessage}>Not found</div>
    }
    
    return (
        <ul className={styles.list}>
            {
                (filteredTasks ?? tasks).map((task: ITask) => {
                    return (
                        <TodoItem 
                            key={task.id}
                            className={styles.item}
                            {...task}
                        />
                    )
                })
            }
            
        </ul>
    )
    
}

export default memo(TodoList);