import type { RefObject } from "react";

interface IField {
  id: string,
  label: string,
  className?: string,
  type?: "text" | "search";
  onInput?: (query: string) => void;
  value?: string;
  ref?: RefObject<HTMLInputElement | null> 
}

export const Field = (props: IField) => {
  const {
    className = "",
    id,
    label,
    type = "text",
    onInput,
    value,
    ref
  } = props;

  return(
      <div className={`${className} field`}>
        <label
          className="field__label"
          htmlFor={id}
        >
          {label}
        </label>
        <input
          className="field__input"
          id={id}
          placeholder=" "
          autoComplete="off"
          type={type}
          value={value}
          onInput={(e) => onInput?.(e.currentTarget.value)}
          ref= {ref}
        />
      </div>
  )
}