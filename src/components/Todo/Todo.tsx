import { useContext } from "react"
import { AddTaskForm } from "../AddTaskForm/AddTaskForm"
import { SearchTaskForm } from "../SearchTaskForm/SearchTaskForm"
import TodoInfo from "../TodoInfo/TodoInfo"
import TodoList from "../TodoList/TodoList"
import { Button } from "../Button/Button"
import { TasksContext } from "../../context/TasksContext"

export const Todo = () => {
    const {
        firstIncompleteTaskRef
    } = useContext(TasksContext)
        

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm />
            <SearchTaskForm />
            <TodoInfo />
            <Button 
                type="button"
                onClick= {() => firstIncompleteTaskRef.current?.scrollIntoView({behavior:'smooth'})}
            >
                First incomplete task
            </Button>
            <TodoList/>
        </div>
    )
}