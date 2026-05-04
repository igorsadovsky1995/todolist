import { createContext, useEffect, useRef, useState, useCallback, useMemo, type ReactNode, type RefObject } from "react";
import type { ITask } from "../components/TodoList/TodoList";

interface ITasksContext {
    tasks: ITask[];
    addTask: () => void;
    deleteAllTasks: () => void;
    deleteTask: (id: string) => void
    filteredTasks: ITask[] | null;
    toggleIsComplete: (id: string) => void ;
    firstIncompleteTaskRef: RefObject<HTMLLIElement | null>,
    firstIncompleteTaskID?: string;
    newTaskInputRef: RefObject<HTMLInputElement | null>;
    newTaskTitle: string;
    setNewTaskTitle: (value: string) => void;
    setSearchQuery: (query: string) => void;
    searchQuery: string;
}

interface ITasksProvider {
    children: ReactNode
}

export const TasksContext = createContext<ITasksContext>({} as ITasksContext)

export const TasksProvider = (props: ITasksProvider) => {
    const {
        children
    } = props;

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

    return (
        <TasksContext.Provider value={{
            tasks,
            addTask,
            deleteAllTasks,
            deleteTask,
            filteredTasks,
            toggleIsComplete,
            firstIncompleteTaskRef,
            firstIncompleteTaskID,
            setSearchQuery,
            searchQuery,
            newTaskInputRef, 
            newTaskTitle, 
            setNewTaskTitle
        }}>
            {children}
        </TasksContext.Provider>
    )
}