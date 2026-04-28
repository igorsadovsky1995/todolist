import { Field } from "../Field/Field"

interface ISearchTaskForm {
    setSearchQuery: (query: string) => void;
    searchQuery: string
}

export const SearchTaskForm = (props: ISearchTaskForm) => {
    const {
        setSearchQuery,
        searchQuery
    } = props;
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