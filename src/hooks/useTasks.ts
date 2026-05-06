import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import type { ITask } from '../components/TodoList/TodoList'
import { useTaskLocalStorage } from './useTaskLocalStorage'

export const useTasks = () => {

    const {
        savedTasks,
        saveTasks
    } = useTaskLocalStorage()

    const [tasks, setTasks] = useState<ITask[]>(() => savedTasks ?? [
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
    )
    
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const newTaskInputRef = useRef<HTMLInputElement>(null)

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
        saveTasks(tasks)
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

    return {
        tasks,
        addTask,
        deleteAllTasks,
        deleteTask,
        filteredTasks,
        toggleIsComplete,
        setSearchQuery,
        searchQuery,
        newTaskInputRef, 
        newTaskTitle, 
        setNewTaskTitle
    }
}