import { useRef } from "react";
import type { ITask } from "../components/TodoList/TodoList";

export const useIncompleteTaskScroll = (tasks: ITask[]) => {

    const firstIncompleteTaskRef = useRef<HTMLLIElement>(null)
    const firstIncompleteTaskID = tasks.find(task => task.isDone)?.id;

    return {
        firstIncompleteTaskRef,
        firstIncompleteTaskID
    }
}