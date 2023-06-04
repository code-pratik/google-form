import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFormInput, addFormtitle } from "../slices/formSlice";
import SelectInputType from "./selectInputType";
import { TextField } from "@mui/material";

function CreateForm() {
  const [label, setLabel] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [radioBtnValue, setRadioBtnValue] = useState({});
  const [addMore, SetAddMore] = useState(0);
  const inputType = useSelector((state) => state.formData.formType);
  const form = useSelector((state) => state.formData.formElements);
  const title = useSelector((state) => state.formData.formTitle);
  const [formstate, setFormState] = useState({ checkBoxData: [] });
  const [userdata, setUserData] = useState([]);
  const dispatch = useDispatch();
  const { type } = inputType[0];
  let arr = [];
  for (let i = 0; i <= addMore; i++) {
    arr = [...arr, `radioText` + i];
  }
  const clear = () => {
    setLabel("");
    SetAddMore(0);
    setRadioBtnValue({});
  };

  const getformData = (e) => {
    setFormState({ ...formstate, [e.target.name]: e.target.value });
  };
  const getCheckBoxData = (e) => {
    e.stopPropagation();

    if (e.target.type === "radio") {
      return setFormState({ ...formstate, [e.target.name]: e.target.value });
    }
    if (!formstate.checkBoxData.includes(e.target.value)) {
      return setFormState({
        ...formstate,
        checkBoxData: [...formstate.checkBoxData, e.target.value],
      });
    } else if (formstate.checkBoxData.includes(e.target.value)) {
      const data = formstate.checkBoxData.indexOf(e.target.value);
      const arr = [...formstate.checkBoxData];
      arr.splice(data, 1);
      setFormState({ ...formstate, checkBoxData: arr });
      console.log(arr);
    }
  };

  const CreateUser = (e) => {
    e.preventDefault();
    setUserData([...userdata, formstate]);
  };

  const createFormTitle = (e) => {
    e.stopPropagation();
    dispatch(addFormtitle(titleValue));
  };

  const createInputs = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(
      addFormInput(
        type === "radio" || type === "checkbox" || type === "select"
          ? { label, type: type, Values: radioBtnValue }
          : { label, type: type }
      )
    );
    clear();
  };

  const randerInputs = () => {};

  return (
    <div>
      {console.log(formstate)}
      {console.log("userdata", userdata)}
      <form onSubmit={createInputs}>
        <h1>Create Your Form</h1>
        <label>Add Form Title :- </label>
        <input
          type="text"
          value={titleValue}
          placeholder="Add Form Title"
          onBlur={createFormTitle}
          onChange={(e) => {
            e.stopPropagation();
            setTitleValue(e.target.value);
          }}
        />
        <SelectInputType clear={clear} />
        <br />
        <input
          type="text"
          placeholder="Add Label"
          value={label}
          onChange={(e) => {
            e.stopPropagation();
            setLabel(e.target.value);
          }}
        />
        <br />
        <input
          type={type}
          disabled
          style={{
            display: `${
              type === "radio" || type === "checkbox" || type === "select"
                ? "none"
                : "block"
            }`,
          }}
        />
        {type === "select" ? (
          <>
            <select disabled name="select">
              <option>Select</option>
            </select>
            <br />
          </>
        ) : (
          ""
        )}
        <br />
        {type === "radio" || type === "checkbox" || type === "select"
          ? arr.map((item, index) => (
              <>
                <label>
                  {type === "checkbox" || type === "select" || type === "radio"
                    ? "add  value"
                    : ""}
                </label>
                {type === "select" ? (
                  ""
                ) : (
                  <input
                    type={type}
                    disabled
                    style={{
                      display: `${
                        type === "radio" || "checkbox" ? "inline-block" : "none"
                      }`,
                    }}
                  />
                )}

                <input
                  type="text"
                  name={item}
                  value={radioBtnValue.radioText}
                  style={{
                    display: `${
                      type === "radio" || "checkbox" || "select"
                        ? "inline-block"
                        : "none"
                    }`,
                  }}
                  onChange={(e) => {
                    e.stopPropagation();
                    setRadioBtnValue({
                      ...radioBtnValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
                <br />
              </>
            ))
          : ""}
        {type === "radio" || type === "checkbox" || type === "select" ? (
          <>
            <input
              type="button"
              value={
                type === "radio"
                  ? "addMoreradio➕"
                  : type === "select"
                  ? "addMoreOptions➕"
                  : "addMoreCheckbox➕"
              }
              onClick={() => {
                SetAddMore(addMore + 1);
              }}
            />
            <input
              type="button"
              value={
                type === "radio"
                  ? "Removeradio➖"
                  : type === "select"
                  ? "RemoveOptions➖"
                  : "RemoveCheckbox➖"
              }
              onClick={() => {
                SetAddMore(addMore - 1);
              }}
            />
          </>
        ) : (
          ""
        )}
        <br />
        <input type="submit" value="Add to Form➕" />
      </form>
      <form onSubmit={CreateUser}>
        <h1>{title}</h1>
        {form.map(({ label, type, Values }) =>
          type === "radio" ||
          type === "checkbox" ||
          type === "textarea" ||
          type === "select" ? (
            type === "textarea" ? (
              <>
                <br />
                <label>{label}</label>
                <textarea
                  style={{
                    padding: " 20px",
                    width: " 100%",
                    resize: "vertical",
                  }}
                  value={formstate.label}
                  name={label}
                  onChange={getformData}
                />
                <br />
              </>
            ) : type === "select" ? (
              <>
                <br />
                <label>{label}</label>
                <select
                  name={label}
                  value={formstate.label}
                  onChange={getformData}
                >
                  {Object.values(Values).map((value) => (
                    <>
                      <option value={value}>{value}</option>
                    </>
                  ))}
                </select>
              </>
            ) : (
              <>
                <br />
                <label>{label}</label>
                {Object.values(Values).map((value) => (
                  <>
                    <input
                      type={type}
                      name={label}
                      onChange={getCheckBoxData}
                      value={value}
                    />
                    <span>{value}</span>
                  </>
                ))}
              </>
            )
          ) : (
            <>
              <br />
              <label>{label}</label>
              <br />
              <TextField
                id="standard-basic"
                sx={{
                  "& .MuiInputBase-root": {
                    color: "white",
                    borderBottom: "1px solid white",
                    width: "400px",
                  },
                  "& .MuiFormLabel-root": {
                    color: "white",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "white",
                  },
                }}
                variant="standard"
                name={label}
                type={type}
                value={formstate.label}
                onChange={getformData}
              />
            </>
          )
        )}
        <br />
        {form.length > 0 ? <input type="Submit" value="submit" /> : ""}
      </form>
    </div>
  );
}

export default CreateForm;
