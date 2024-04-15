import React from "react";
import { FormControlLabel, Switch } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

interface ToggleSwitchProps {
  checked: boolean | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

export const ThemedToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, name, label }) => {
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

// Toggle Button
interface ThemedToggleButtonProps {
  gender: string | null;
  onChange: (newGender: string) => void;
}

export const ThemedToggleButton: React.FC<ThemedToggleButtonProps> = ({ gender, onChange }) => {
  return (
    <ToggleButtonGroup
      value={gender}
      exclusive
      onChange={(event, newGender) => onChange(newGender)}
      aria-label="gender"
      sx={{
        display: "flex",
        marginTop: "16px",
        "& .MuiToggleButtonGroup-grouped": {
          "&:hover": {
            backgroundColor: "none",
          },
          "&:first-of-type": {
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
          },
          "&:last-of-type": {
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2,
          },
        },
      }}
    >
      <ToggleButton
        value="male"
        aria-label="male"
        sx={{
          "&.Mui-selected, &.Mui-selected:hover": {
            color: "#fff",
            backgroundColor: "#00BBDB",
            borderColor: "#00BBDB",
          },
          width: "50%",
          borderColor: "#E5E7EB",
        }}
      >
        <MaleIcon />
        Male
      </ToggleButton>
      <ToggleButton
        value="female"
        aria-label="female"
        sx={{
          "&.Mui-selected, &.Mui-selected:hover": {
            color: "#fff",
            backgroundColor: "#de66ac",
            borderColor: "#de66ac",
          },
          width: "50%",
          borderColor: "#E5E7EB",
        }}
      >
        <FemaleIcon />
        Female
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
