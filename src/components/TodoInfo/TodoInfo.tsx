interface ITodoInfo {
    total: number,
    done: number,
    onDeleteAllButtonClick: () => void
}

export const TodoInfo = (props: ITodoInfo) => {
    const {
        total,
        done,
        onDeleteAllButtonClick
    } = props;

    const hasTask = total > 0;

    return (
        <div className="todo__info">
            <div className="todo__total-tasks">
                Done {done} from {total}
            </div>
            {hasTask && (
                <button  
                    className="todo__delete-all-button" 
                    type="button"
                    onClick={onDeleteAllButtonClick}>
                        Delete all
                </button>)
            }
        </div>
    )
}