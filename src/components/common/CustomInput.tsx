import React from "react";
import { SxProps, TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type CustomInputProps = {
  name: string;
  sx?: SxProps;
};

const CustomInput = ({
  sx,
  name,
  ...props
}: CustomInputProps & TextFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...rest }, fieldState: { error } }) => (
        <TextField
          {...rest}
          {...props}
          inputRef={ref}
          variant="outlined"
          name={name}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default CustomInput;
