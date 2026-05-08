import type { RefObject } from "react";

interface IField {
  id: string,
  label: string,
  className?: string,
  type?: "text" | "search";
  onInput?: (e: React.InputEvent<HTMLInputElement>) => void;
  value?: string;
  ref?: RefObject<HTMLInputElement | null>;
  error?: string;
}

export const Field = (props: IField) => {
  const {
    className = "",
    id,
    label,
    type = "text",
    onInput,
    value,
    ref,
    error
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
          className={`field__input ${error ? "is-invalid":""}`}
          id={id}
          placeholder=" "
          autoComplete="off"
          type={type}
          value={value}
          onInput={onInput}
          ref= {ref}
        />
        {
          error && (
            <span 
              className="field__error"
              title= {error}
            >
              {error}
            </span>
          )
        }
      </div>
  )
}