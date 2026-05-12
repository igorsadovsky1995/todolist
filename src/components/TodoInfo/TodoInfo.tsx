import { memo, useContext, useMemo } from "react"
import { TasksContext } from "../../context/TasksContext";
import type { ICSSModule } from "../Todo/Todo";

const TodoInfo = (props: ICSSModule) => {

    const {
        styles
    } = props;

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
        <div className={styles.info}>
            <div>
                Done {done} from {total}
            </div>
            {hasTask && (
                <button  
                    className={styles.deleteAllButton}
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