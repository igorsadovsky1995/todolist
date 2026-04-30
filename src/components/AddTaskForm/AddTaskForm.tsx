import type { RefObject } from "react";
import { Button } from "../Button/Button"
import { Field } from "../Field/Field"

interface IAddTaskForm {
    addTask: () => void;
    newTaskTitle: string;
    setNewTaskTitle: (value: string) => void
    newTaskInputRef: RefObject<HTMLInputElement | null>
}

export const AddTaskForm = (props: IAddTaskForm) => {

    const {
        addTask,
        newTaskTitle,
        setNewTaskTitle,
        newTaskInputRef
    } = props;

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