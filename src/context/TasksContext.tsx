import { createContext, type ReactNode, type RefObject } from "react";
import type { ITask } from "../components/TodoList/TodoList";
import { useTasks } from "../hooks/useTasks";
import { useIncompleteTaskScroll } from "../hooks/useIncompleteTaskScroll";

interface ITasksContext {
    tasks: ITask[];
    addTask: (clearTaskTitle: string) => void;
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

    const {
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
    } = useTasks();

    const {
        firstIncompleteTaskRef,
        firstIncompleteTaskID
    } = useIncompleteTaskScroll(tasks)

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