import { useState, useEffect } from "react";
import { tasksAPI } from "../api/tasksAPI";
import type { ITask } from "../components/TodoList/TodoList";

interface ITaskPage {
    params: {id:string}
}

export const TaskPage = (props: ITaskPage) => {
    const {params} = props;

    const [task, setTask] = useState<ITask | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        tasksAPI.getByID(params.id)
        .then(task => {
            setTask(task ?? null)
            setHasError(false)
        })
        .catch(() => {
            setHasError(true)
            console.log('error')
        } )
        .finally(() => {
            setIsLoading(false)
        })
    }, [])

    if(isLoading) {
        return (
            <div>
                ...loading
            </div>
        )
    }

    if(hasError) {
        return (
            <div>
                task not found
            </div>
        )
    }
      
    return ( 
        
        <div>
            <h1>
                Задачи: {task?.title}
            </h1>
            <div>
                {task?.isDone ? "задача выполнена": "Задача не выполнена"}
            </div>
        </div>
    )
}