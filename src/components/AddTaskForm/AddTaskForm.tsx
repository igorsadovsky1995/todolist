import { Button } from "../Button/Button"
import { Field } from "../Field/Field"

interface IAddTaskForm {
    addTask: () => void;
    newTaskTitle: string;
    setNewTaskTitle: (value: string) => void
}

export const AddTaskForm = (props: IAddTaskForm) => {

    const {
        addTask,
        newTaskTitle,
        setNewTaskTitle
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