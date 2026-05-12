import type { RefObject } from "react";
import styles from './Field.module.scss'

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
      <div className={`${styles.field} ${className}`}>
        <label
          className={styles.label}
          htmlFor={id}
        >
          {label}
        </label>
        <input
          className={`${styles.input} ${error ? styles.isInvalid : ""}`}
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
              className={styles.error}
              title= {error}
            >
              {error}
            </span>
          )
        }
      </div>
  )
}