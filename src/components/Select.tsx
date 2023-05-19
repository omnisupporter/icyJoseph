import { type ComponentProps, type ReactNode, useId } from "react";

import style from "design-system/select.module.css";

export const Select = ({
  label,
  className = "",
  ...rest
}: ComponentProps<"select"> & { label: ReactNode }) => {
  const selectId = useId();
  return (
    <fieldset className={style.field}>
      <label htmlFor={selectId} className={style.selectLabel}>
        {label}
      </label>
      <div className={style.selectWrapper}>
        <select
          {...rest}
          className={`${style.select} ${className}`.trim()}
          id={selectId}
        />
        <span className={style.focus} />
      </div>
    </fieldset>
  );
};
