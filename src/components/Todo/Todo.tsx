import { useState, useEffect } from "react"
import { AddTaskForm } from "../AddTaskForm/AddTaskForm"
import { SearchTaskForm } from "../SearchTaskForm/SearchTaskForm"
import { TodoInfo } from "../TodoInfo/TodoInfo"
import { TodoList } from "../TodoList/TodoList"
import type { ITask } from "../TodoList/TodoList"

export const Todo = () => {

    const [tasks, setTasks] = useState<ITask[]>(() => {
        const savedTasks = localStorage.getItem('tasks')

        if(savedTasks){
            return JSON.parse(savedTasks)
        }

        return [
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
        ]
    })
    
    const [searchQuery, setSearchQuery] = useState<string>('')

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

            setNewTaskTitle("");
            setSearchQuery("");
        }
    }

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const clearSearchQuery = searchQuery.trim().toLocaleLowerCase();

    const filteredTasks = clearSearchQuery.length > 0 ? (
        tasks.filter(({title}) => title.toLocaleLowerCase().includes(clearSearchQuery))
    ) : null;

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm 
                addTask= {addTask}
                newTaskTitle= {newTaskTitle}
                setNewTaskTitle= {setNewTaskTitle}
            />
            <SearchTaskForm 
                searchQuery= {searchQuery}
                setSearchQuery= {setSearchQuery}
            />
            <TodoInfo 
                total= {tasks.length}
                done={tasks.filter(el=>el.isDone).length}
                onDeleteAllButtonClick = {deleteAllTasks}
            />
            <TodoList 
                filteredTasks= {filteredTasks}
                tasks= {tasks}
                onDeleteTaskButtonClick= {deleteTask} 
                onTaskCompleteChange= {toggleIsComplete}
            />
        </div>
    )
}