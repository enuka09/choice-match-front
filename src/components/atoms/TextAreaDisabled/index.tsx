import React from "react";
import { TextField } from "@mui/material";

interface TextAreaProps {
  name: string;
  value: string | undefined;
  label: string;
  disabled: boolean;
}

const ThemedTextAreaDisabled: React.FC<TextAreaProps> = ({ name, value, label, disabled }) => {
  return (
    <TextField
      name={name}
      value={value}
      label={label}
      disabled={disabled}
      variant="outlined"
      InputLabelProps={{
        style: { color: "black", fontWeight: 500 },
      }}
      multiline
      rows={4}
      sx={{ width: "100%", backgroundColor: "#F9FAFB" }}
    />
  );
};

export default ThemedTextAreaDisabled;
