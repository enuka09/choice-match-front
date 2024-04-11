import React from "react";
import { TextField } from "@mui/material";

interface TextFieldProps {
  name: string;
  value: string | number | string[] | boolean | undefined;
  label: string;
  disabled: boolean;
}

const ThemedTextFieldDisabled: React.FC<TextFieldProps> = ({ name, value, label, disabled }) => {
  return (
    <TextField
      name={name}
      value={value}
      label={label}
      disabled={disabled}
      InputLabelProps={{
        style: { color: "black", fontWeight: 500 },
      }}
      sx={{
        width: "100%",
        backgroundColor: "#F9FAFB",
      }}
    />
  );
};

export default ThemedTextFieldDisabled;
