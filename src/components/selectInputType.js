import React from "react";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { selectFormType } from "../slices/formSlice";

function SelectInputType({ clear }) {
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setType(event.target.value);
    dispatch(selectFormType({ type: event.target.value }));
  };
  return (
    <FormControl
      sx={{
        background: "white",
        width: "100%",
        marginBottom: "30px",
      }}
    >
      <Select
        value={type}
        onChange={handleChange}
        onClick={clear}
        displayEmpty
        style={{ borderRadius: "0px", border: "none" }}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="text">Text</MenuItem>
        <MenuItem value="number">Number</MenuItem>
        <MenuItem value="radio">radio</MenuItem>
        <MenuItem value="checkbox">checkbox</MenuItem>
        <MenuItem value="select">select</MenuItem>
        <MenuItem value="file">File Upload</MenuItem>
        <MenuItem value="email">Email</MenuItem>
        <MenuItem value="date">Date</MenuItem>
        <MenuItem value="range">range</MenuItem>
        <MenuItem value="week">Week</MenuItem>
        <MenuItem value="url">url</MenuItem>
        <MenuItem value="textarea">paragraph</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectInputType;
