import { useContext, useState } from "react";
import { Button } from "../Button/Button"
import { Field } from "../Field/Field"
import { TasksContext } from "../../context/TasksContext";
import type { ICSSModule } from "../Todo/Todo";


export const AddTaskForm = (props: ICSSModule) => {

    const {
        styles
    } = props;

    const {
        addTask,
        newTaskTitle,
        setNewTaskTitle,
        newTaskInputRef
    } = useContext(TasksContext);

    const [error, setError] = useState('')

    const clearTaskTitle = newTaskTitle.trim();
    const isNewTaskTitleEmpty = clearTaskTitle.length === 0;

    const onInput = (e: React.InputEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;
        const clearTitle = value.trim();
        const hasOnlySpaces = value.length > 0 && clearTitle.length === 0;

        setNewTaskTitle(value)
        setError(hasOnlySpaces ? "The tasks can't be empty":"")
    }

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!isNewTaskTitleEmpty){
            addTask(clearTaskTitle)
        }
        
    }

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <Field 
                className={styles.field}
                id="new-task"
                label="New task title"
                value= {newTaskTitle}
                onInput= {onInput}
                ref= {newTaskInputRef}
                error= {error}
            />
            <Button
                type="submit"
                className=""
                isDisabled= {isNewTaskTitleEmpty}
            >
                Add
            </Button>
        </form>
    )
}