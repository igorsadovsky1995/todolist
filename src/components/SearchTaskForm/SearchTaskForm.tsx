import { useContext } from "react";
import { Field } from "../Field/Field"
import { TasksContext } from "../../context/TasksContext";

export const SearchTaskForm = () => {
    const {
        setSearchQuery,
        searchQuery
    } = useContext(TasksContext);
    return (
        <form className="todo__form" onSubmit={e => e.preventDefault()}>
            <Field 
                className="todo__field"
                label="Search task"
                id="search-task"
                type="search"
                value= {searchQuery}
                onInput= {setSearchQuery}
            />
        </form>
    )
}