import { Field } from "../Field/Field"

interface ISearchTaskForm {
    onSearchInput: (query: string) => void;
}

export const SearchTaskForm = (props: ISearchTaskForm) => {
    const {
        onSearchInput
    } = props;
    return (
        <form className="todo__form" onSubmit={e => e.preventDefault()}>
            <Field 
                className="todo__field"
                label="Search task"
                id="search-task"
                type="search"
                onInput= {onSearchInput}
            />
        </form>
    )
}