import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFormId, addFormInput, addFormtitle } from "../slices/formSlice";
import SelectInputType from "./selectInputType";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import HomeIcon from "@mui/icons-material/Home";
import { useForm } from "react-hook-form";
import MAINFORM from "./mainForm";
import NavBar from "./NavBar";
function CreateForm() {
    const [label, setLabel] = useState("");
    const [titleValue, setTitleValue] = useState("");
    const [radioBtnValue, setRadioBtnValue] = useState({});
    const [addMore, SetAddMore] = useState(0);
    const inputType = useSelector((state) => state.formData.formType);
    const title = useSelector((state) => state.formData.formTitle);
    const id = useSelector((state) => state.formData.formId)
    const dispatch = useDispatch();
    const { type } = inputType[0];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    let arr = [];
    for (let i = 0; i <= addMore; i++) {
        arr = [...arr, `radioText` + i];
    }

    const clear = () => {
        setLabel("");
        SetAddMore(0);
        setRadioBtnValue({});
    };

    const createFormTitle = (e) => {
        e.stopPropagation();
        const uid = id === "" ? Math.round(new Date().getDate() + Math.random() * 100000) : id
        dispatch(addFormId(uid))
        dispatch(addFormtitle(titleValue));
    };

    const createInputs = (e) => {
        // e.stopPropagation();
        // e.preventDefault();
        const values = Object.values(radioBtnValue).map(val => val)
        const id = Math.round(new Date().getDate() + Math.random() * 100000)
        dispatch(
            addFormInput(
                type === "radio" || type === "checkbox" || type === "select"
                    ? { id, label, type: type, values }
                    : { id, label, type: type }
            )
        );
        clear();
    };
    const onClickEmpty = () => {
        dispatch(addFormId(""))
        dispatch(addFormtitle(""))
        dispatch(addFormInput({ flag: 1, data: [] }))
    }

    return (
        <div>
            {console.log(id)}
            {console.log(radioBtnValue, "")}
            <NavBar onEmpty={onClickEmpty} />
            {/* <div style={{ marginRight: "10px" }}>
          <DynamicFormIcon
            style={{
              verticalAlign: "middle",
              display: "inline-block",
              marginRight: "5px"
            }}
          />
          <Link to="/CreatedForm" className="Link">
            Generated Form
          </Link>
        </div> */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // height: "100px",
                    marginTop: "40px"
                }}
            >
                <h1>Generate Your Own Form</h1>
            </div>
            <div className="FormContainer">
                <form className="forms" onSubmit={handleSubmit(createInputs)}>
                    <h1>Create Your Form</h1>
                    <label style={{ marginBottom: "20px" }}>Add Form Title :- </label>
                    {console.log(titleValue)}
                    <input
                        type="text"
                        className="inputsform"
                        value={titleValue === "" ? title : titleValue}
                        placeholder="Add Form Title"
                        onBlur={createFormTitle}
                        // {...register("title", {
                        //   required: { value: true, message: "Required" },
                        // })}
                        onChange={(e) => {
                            e.stopPropagation();
                            setTitleValue(e.target.value);
                        }}
                    />

                    <SelectInputType clear={clear} />
                    <br />
                    <input
                        type="text"
                        className="inputsform"
                        placeholder="Add Label"
                        value={label}
                        name="label"
                        {...register("label", {
                            required: { value: true, message: "Required" },
                        })}
                        onChange={(e) => {
                            e.stopPropagation();
                            setLabel(e.target.value);
                        }}
                    />
                    {label === "" ? (
                        <p style={{ color: "red" }}>{errors.label?.message}</p>
                    ) : (
                        ""
                    )}

                    <br />
                    <input
                        type={type}
                        className="inputsform"
                        disabled
                        style={{
                            display: `${type === "radio" || type === "checkbox" || type === "select"
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
                                    {type === "checkbox" ||
                                        type === "select" ||
                                        type === "radio"
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
                                            display: `${type === "radio" || "checkbox"
                                                ? "inline-block"
                                                : "none"
                                                }`,
                                        }}
                                    />
                                )}
                                <input
                                    type="text"
                                    name={item}
                                    className="inputsform"
                                    required
                                    style={{
                                        display: `${type === "radio" || "checkbox" || "select"
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
                            <Button
                                variant="contained"
                                className="inputsform"
                                type="button"
                                endIcon={<AddIcon />}
                                onClick={() => {
                                    SetAddMore(addMore + 1);
                                }}
                                style={{
                                    backgroundColor: "lightblue",
                                    color: "black",
                                    fontWeight: "600",
                                }}
                                sx={{ width: "41.5%" }}
                            >
                                {type === "radio"
                                    ? "addMoreradio"
                                    : type === "select"
                                        ? "addMoreOptions"
                                        : "addMoreCheckbox"}
                            </Button>
                            <br />
                            {/* <input
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
            /> */}
                            <Button
                                variant="contained"
                                type="button"
                                endIcon={<RemoveIcon />}
                                onClick={() => {
                                    SetAddMore(addMore - 1);
                                }}
                                style={{
                                    backgroundColor: "lightblue",
                                    color: "black",
                                    marginTop: "10px",
                                    fontWeight: "600",
                                }}
                                sx={{ width: "41.5%" }}
                            >
                                {type === "radio"
                                    ? "Removeradio"
                                    : type === "select"
                                        ? "RemoveOptions"
                                        : "RemoveCheckbox"}
                            </Button>
                            {/* <input
              type="button"
              value={
                type === "radio"
                  ? "Removeradio➖"
                  : type === "select"
                  ? "RemoveOptions➖"
                  : "RemoveCheckbox➖"
              }
            
            /> */}
                        </>
                    ) : (
                        ""
                    )}
                    <br />
                    <Button
                        variant="contained"
                        type="submit"
                        endIcon={<AddIcon />}
                        style={{
                            backgroundColor: "lightblue",
                            color: "black",
                            marginTop: "10px",
                            fontWeight: "600",
                        }}
                        sx={{ width: "41.5%" }}
                    >
                        Add to Form
                    </Button>

                </form>
            </div>
            <MAINFORM />
        </div>
    );
}


export default CreateForm