import React, { forwardRef } from "react";

const Input = forwardRef(({ type, placeholder, cls, name, id, boxcls }, ref) => {
  return (
    <div className={`w-full ${boxcls}`}>
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`${cls} w-full placeholder:text-sm border px-4 py-2 rounded-md`}
      />
    </div>
  );
});

export default Input;