import React from "react";
import { MenuItem, TextField, Select, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";

interface ThemedSelectFieldProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

export const ThemedSelectField: React.FC<ThemedSelectFieldProps> = ({ name, value, onChange, label, options }) => {
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

// Custom DropDown Select

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: Option[];
  name: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, onChange, options, name }) => {
  return (
    <FormControl
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#00BBDB !important",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#00375C !important",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#00375C",
        },
        "& .MuiInputBase-input": {
          color: "#00375C",
        },
      }}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={`${name}-select`}
        value={value}
        onChange={onChange}
        label={label}
        name={name}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
