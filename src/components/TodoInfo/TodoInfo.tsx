import { memo, useContext, useMemo } from "react"
import { TasksContext } from "../../context/TasksContext";

const TodoInfo = () => {
    const {
        tasks,
        deleteAllTasks,
    } = useContext(TasksContext);

    const total = tasks.length;

    const hasTask = total > 0;

    const done = useMemo(() => {
        return tasks.filter(el=>el.isDone).length
    }, [tasks ]);

    return (
        <div className="todo__info">
            <div className="todo__total-tasks">
                Done {done} from {total}
            </div>
            {hasTask && (
                <button  
                    className="todo__delete-all-button" 
                    type="button"
                    onClick={deleteAllTasks}
                >
                        Delete all
                </button>)
            }
        </div>
    )
}

export default memo(TodoInfo)