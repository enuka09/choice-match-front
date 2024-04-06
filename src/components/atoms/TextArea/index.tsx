import React from "react";
import { TextField } from "@mui/material";

interface TextAreaProps {
  name: string;
  value: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const ThemedTextArea: React.FC<TextAreaProps> = ({ name, value, onChange, label }) => {
  return (
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      multiline
      rows={4}
      sx={{
        width: "100%",
        fontSize: "53px",
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

export default ThemedTextArea;
