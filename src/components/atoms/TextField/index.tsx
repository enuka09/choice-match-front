import React from "react";
import { TextField } from "@mui/material";

interface TextFieldProps {
  name: string;
  value: string | number;
  type: "text" | "number";
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const ThemedTextField: React.FC<TextFieldProps> = ({ name, value, type, onChange, label }) => {
  const inputProps = type === "number" ? { min: 0 } : {};

  return (
    <TextField
      name={name}
      value={value}
      type={type}
      onChange={onChange}
      label={label}
      inputProps={inputProps}
      variant="outlined"
      sx={{
        width: "100%",
        backgroundColor: "#19374b",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "#00BBDB",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#0099A6",
          },
        },
        "& .MuiInputLabel-root": {
          color: "white",
        },
        "& .MuiInputBase-input": {
          color: "white",
        },
      }}
    />
  );
};

export default ThemedTextField;
