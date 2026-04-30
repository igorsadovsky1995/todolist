import type { RefObject } from "react";
import type { ITask } from "../TodoList/TodoList";

interface ITodoItem extends ITask{
  className: string;
  onDeleteTaskButtonClick: (id: string) => void;
  onTaskCompleteChange: (id: string) => void;
  ref: RefObject<HTMLLIElement | null> | null
}

export const TodoItem = (props: ITodoItem) => {
  const {
    className,
    id,
    title,
    isDone,
    onDeleteTaskButtonClick,
    onTaskCompleteChange,
    ref
  } = props;

  return (
      <li className={`${className} todo-item`} ref={ref}>
        <input
          className="todo-item__checkbox"
          id={id}
          type="checkbox"
          checked={isDone}
          onChange={() => onTaskCompleteChange(id)}
        />
        <label
          className="todo-item__label"
          htmlFor={id}
        >
          {title}
        </label>
        <button
          className="todo-item__delete-button"
          aria-label="Delete"
          title="Delete"
          onClick={() => onDeleteTaskButtonClick(id)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="#757575"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </li>
  )
}