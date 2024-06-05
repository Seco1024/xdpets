import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function ComboBox({ label, options, value, onChange }) {
  return (
    <Autocomplete
      value={value}
      onChange={onChange}
      options={options}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
      sx={{ width: "500px" }}
    />
  );
}
