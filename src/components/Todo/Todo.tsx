import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { AddTaskForm } from "../AddTaskForm/AddTaskForm"
import { SearchTaskForm } from "../SearchTaskForm/SearchTaskForm"
import TodoInfo from "../TodoInfo/TodoInfo"
import TodoList from "../TodoList/TodoList"
import type { ITask } from "../TodoList/TodoList"
import { Button } from "../Button/Button"

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

    const newTaskInputRef = useRef<HTMLInputElement>(null)
    const firstIncompleteTaskRef = useRef<HTMLLIElement>(null)
    
    const firstIncompleteTaskID = tasks.find(task => task.isDone)?.id

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm('Are you sure?')

        if(isConfirmed){
            setTasks([])
        }
    }, [])

    const deleteTask = useCallback((id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    }, [tasks]);

    const toggleIsComplete = useCallback((id: string) => {
        setTasks(tasks.map(task => {
            if(task.id == id){
                return {...task, isDone: !task.isDone}
            }

            return task
        }))
    }, [tasks]);

    const addTask = useCallback(() => {
        if(newTaskTitle && newTaskTitle.trim().length > 0){
            const newTask: ITask = {
                id: crypto?.randomUUID() ?? Date.now().toString,
                title: newTaskTitle,
                isDone: false
            }

            setTasks(prevState => [
                ...prevState,
                newTask
            ])

            setNewTaskTitle("");
            setSearchQuery("");
            newTaskInputRef.current?.focus();
        }
    }, [newTaskTitle])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    useEffect(() => {
        newTaskInputRef.current?.focus()
    }, [])

    

    const filteredTasks = useMemo<ITask[] | null>(() => {
        const clearSearchQuery = searchQuery.trim().toLocaleLowerCase();

        return clearSearchQuery.length > 0 ? (
            tasks.filter(({title}) => title.toLocaleLowerCase().includes(clearSearchQuery))
        ) : null;
    }, [searchQuery, tasks]);

    const doneTasks = useMemo(() => {
        return tasks.filter(el=>el.isDone).length
    }, [tasks ]);
    

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm 
                addTask= {addTask}
                newTaskInputRef= {newTaskInputRef}
                newTaskTitle= {newTaskTitle}
                setNewTaskTitle= {setNewTaskTitle}
            />
            <SearchTaskForm 
                searchQuery= {searchQuery}
                setSearchQuery= {setSearchQuery}
            />
            <TodoInfo 
                total= {tasks.length}
                done={doneTasks}
                onDeleteAllButtonClick = {deleteAllTasks}
            />
            <Button 
                type="button"
                onClick= {() => firstIncompleteTaskRef.current?.scrollIntoView({behavior:'smooth'})}
            >
                First incomplete task
            </Button>
            <TodoList 
                filteredTasks= {filteredTasks}
                tasks= {tasks}
                onDeleteTaskButtonClick= {deleteTask} 
                onTaskCompleteChange= {toggleIsComplete}
                firstIncompleteTaskRef= {firstIncompleteTaskRef}
                firstIncompleteTaskID = {firstIncompleteTaskID}
            />
        </div>
    )
}