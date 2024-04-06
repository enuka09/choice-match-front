import React from "react";
import { MenuItem, TextField } from "@mui/material";

interface ThemedSelectFieldProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  options: { value: string; label: string }[];
}

const ThemedSelectField: React.FC<ThemedSelectFieldProps> = ({ name, value, onChange, label, options }) => {
  return (
    <TextField
      select
      name={name}
      value={value}
      onChange={onChange}
      label={label}
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
    >
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default ThemedSelectField;
