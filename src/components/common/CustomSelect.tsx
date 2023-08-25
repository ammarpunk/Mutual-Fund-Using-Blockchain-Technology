import { Select, SelectProps } from "@mui/material";
import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";

const CustomSelect: React.FC<SelectProps & { name: string }> = ({
  name,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...rest }, fieldState: { error } }) => (
        <Select
          inputRef={ref}
          {...rest}
          error={!!error}
          {...props}
        />
      )}
    />
  );
};

export default CustomSelect;
