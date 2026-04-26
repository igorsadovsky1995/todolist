import { useState } from "react"
import { AddTaskForm } from "../AddTaskForm/AddTaskForm"
import { SearchTaskForm } from "../SearchTaskForm/SearchTaskForm"
import { TodoInfo } from "../TodoInfo/TodoInfo"
import { TodoList } from "../TodoList/TodoList"
import type { ITask } from "../TodoList/TodoList"

export const Todo = () => {

    const [tasks, setTasks] = useState<ITask[]>([
        {
            id: "task-1",
            title: "task 1",
            isDone: false
        },
        {
            id: "task-2",
            title: "task 2",
            isDone: true
        }
    ])

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const deleteAllTasks = () => {
        const isConfirmed = confirm('Are you sure?')

        if(isConfirmed){
            setTasks([])
        }
    }

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const toggleIsComplete = (id: string) => {
        setTasks(tasks.map(task => {
            if(task.id == id){
                return {...task, isDone: !task.isDone}
            }

            return task
        }))
    }

    const filterTask = (query: string) => {
        console.log(`Search: ${query}`)
    }

    const addTask = () => {
        if(newTaskTitle.trim().length > 0){
            const newTask: ITask = {
                id: crypto?.randomUUID() ?? Date.now().toString,
                title: newTaskTitle,
                isDone: false
            }

            setTasks([
                ...tasks,
                newTask
            ])

            setNewTaskTitle("")
        }
    }

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm 
                addTask= {addTask}
                newTaskTitle= {newTaskTitle}
                setNewTaskTitle= {setNewTaskTitle}
            />
            <SearchTaskForm 
                onSearchInput= {filterTask}
            />
            <TodoInfo 
                total= {tasks.length}
                done={tasks.filter(el=>el.isDone).length}
                onDeleteAllButtonClick = {deleteAllTasks}
            />
            <TodoList 
                tasks= {tasks}
                onDeleteTaskButtonClick= {deleteTask} 
                onTaskCompleteChange= {toggleIsComplete}
            />
        </div>
    )
}