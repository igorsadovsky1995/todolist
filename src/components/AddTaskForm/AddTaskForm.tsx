import { useContext, type RefObject } from "react";
import { Button } from "../Button/Button"
import { Field } from "../Field/Field"
import { TasksContext } from "../../context/TasksContext";

export const AddTaskForm = () => {

    const {
        addTask,
        newTaskTitle,
        setNewTaskTitle,
        newTaskInputRef
    } = useContext(TasksContext);

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTask()
    }

    return (
        <form className="todo__form" onSubmit={onSubmit}>
            <Field 
                className="todo__field" 
                id="new-task"
                label="New task title"
                value= {newTaskTitle}
                onInput= {setNewTaskTitle}
                ref= {newTaskInputRef}
            />
            <Button
                type="submit"
                className=""
            >
                Add
            </Button>
        </form>
    )
}