import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import type { ITask, ITaskCreate } from '../components/TodoList/TodoList'
import { tasksAPI } from '../api/tasksAPI';

export const useTasks = () => {

    const [tasks, setTasks] = useState<ITask[]>([]);
    
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const newTaskInputRef = useRef<HTMLInputElement>(null)

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm('Are you sure?')

        if(isConfirmed){
            tasksAPI.deleteAll(tasks)
            .then(() => setTasks([]))
        }
    }, [tasks])

    const deleteTask = useCallback((id: string) => {

        tasksAPI.delete(id)
        .then(() => {
            setTasks(tasks.filter(task => task.id !== id))
        })
        
    }, [tasks]);

    const toggleIsComplete = useCallback((id: string) => {
        const taskComplete = tasks.find(task => task.id === id)

        taskComplete && tasksAPI.toggle(id, taskComplete.isDone)
        .then(() => {
            setTasks(tasks.map(task => {
                if(task.id == id){
                    return {...task, isDone: !task.isDone}
                }

                return task
            }))
        })

        
    }, [tasks]);

    const addTask = useCallback((clearTaskTitle: string) => {
        const newTask: ITaskCreate = {
            title: clearTaskTitle,
            isDone: false
        }

        tasksAPI.add(newTask)
        .then(addedTask => {
            setTasks(prevTasks => [
                ...prevTasks,
                addedTask
            ])
        })

        setNewTaskTitle("");
        setSearchQuery("");
        newTaskInputRef.current?.focus();
        
    }, [])

    useEffect(() => {
        tasksAPI.getAll()
        .then(data => setTasks(data))

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