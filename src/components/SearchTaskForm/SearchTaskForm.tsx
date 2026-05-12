import { useContext } from "react";
import { Field } from "../Field/Field"
import { TasksContext } from "../../context/TasksContext";
import type { ICSSModule } from "../Todo/Todo";

export const SearchTaskForm = (props: ICSSModule) => {

    const {
        styles
    } = props;

    const {
        setSearchQuery,
        searchQuery
    } = useContext(TasksContext);

    const onInput = (e: React.InputEvent<HTMLInputElement>) => {
        setSearchQuery(e.currentTarget.value)
    } 

    return (
        <form className={styles.form} onSubmit={e => e.preventDefault()}>
            <Field 
                className={styles.field}
                label="Search task"
                id="search-task"
                type="search"
                value= {searchQuery}
                onInput= {onInput}
            />
        </form>
    )
}