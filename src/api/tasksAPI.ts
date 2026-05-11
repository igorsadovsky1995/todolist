import type { ITask, ITaskCreate } from "../components/TodoList/TodoList";

const URL = "http://localhost:3001/tasks";
const headers = {
    'Content-Type': 'application/json'
};

export const tasksAPI = {
    getAll: () => {
        return fetch(URL)
        .then(res => res.json())
    },
    getByID: (id: string) => {
        return fetch(`${URL}/${id}`)
        .then(res => {
            if(!res.ok){
                throw new Error (`Error: ${res.status} `) 
            }
            return res.json()
        })
    },
    add: (newTask: ITaskCreate) => {
        return fetch(URL, {
            method: "POST",
            headers,
            body: JSON.stringify(newTask)
        })
        .then(res => res.json())
    },
    delete: (id: string) => {
        return fetch(`${URL}/${id}`,{
            method: 'DELETE'
        })
    },
    deleteAll: (tasks: ITask[]) => {
        return Promise.all(
            tasks.map(({id}) => tasksAPI.delete(id))
        )
    },
    toggle: (id: string, isDone: boolean) => {
        return fetch(`${URL}/${id}`,{
            method: "PATCH",
            headers,
            body: JSON.stringify({isDone: !isDone})
        })
    }
}