import type { ITask } from "../components/TodoList/TodoList";

export const useTaskLocalStorage = () => {
    const savedTasks = localStorage.getItem('tasks');
    
    const saveTasks = (tasks: ITask[]) => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    } 

    return {
        savedTasks: savedTasks ? JSON.parse(savedTasks):null,
        saveTasks
    }
}