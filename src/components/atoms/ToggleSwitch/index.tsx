import React from "react";
import { FormControlLabel, Switch } from "@mui/material";

interface ToggleSwitchProps {
  checked: boolean | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

const ThemedToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, name, label }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={onChange}
          name={name}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#00BBDB",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.08)",
              },
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#00BBDB",
            },
          }}
        />
      }
      label={label}
      className="text-white"
    />
  );
};

export default ThemedToggleSwitch;
