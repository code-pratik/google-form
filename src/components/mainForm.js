
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { addForm, addFormId, addFormtitle, deleteInput, deleteOptions, editLabel, editOptionLabel, storeFormsData, updateForm } from "../slices/formSlice";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { setDragInputs } from "../slices/formSlice";
import NavBar from "./NavBar";
import { useForm } from "react-hook-form";
import SelectInputType from "./selectInputType";
import { memo } from "react";
function MAINFORM() {
  const forms = useSelector((state) => state.formData.formElements);
  const title = useSelector((state) => state.formData.formTitle);
  const state = useSelector((state) => state.formData.formsData)
  const [formstate, setFormState] = useState({ checkBoxData: [] });
  const [userdata, setUserData] = useState([]);
  const [editIndex, setEditIndex] = useState()
  const [editOptionIndex, setEditOptionIndex] = useState()
  const [editlabel, setEditLabel] = useState("")
  const uid = useSelector((state) => state.formData.formId)
  const formsData = useSelector((state) => state.formData.forms)
  const [btn, setBtn] = useState(false)
  const [form, setForm] = useState(forms);
  const dispatch = useDispatch()
  useEffect(() => {
    setForm(forms)
  }, [forms])

  const CreateUser = (e) => {
    e.preventDefault();
    setUserData([...userdata, formstate]);
    dispatch(storeFormsData({ id: uid, data: { id: Math.round(new Date().getDate() + Math.random() * 100000), ...userdata, formstate } }))
    setUserData([])
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
        checkBoxData: [...formstate?.checkBoxData, e.target.value],
      });
    } else if (formstate.checkBoxData.includes(e.target.value)) {
      const data = formstate.checkBoxData.indexOf(e.target.value);
      const arr = [...formstate.checkBoxData];
      arr.splice(data, 1);
      setFormState({ ...formstate, checkBoxData: arr });
      console.log(arr);
    }
  };
  const saveForm = () => {
    const formTitle = title === "" ? "Untitled Form" : title
    const id = uid === "" ? Math.round(new Date().getDate() + Math.random() * 100000) : uid
    // console.log({ uid: Math.round(new Date().getDate() + Math.random() * 100000), formTitle, form })
    const date = new Date().getDate()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    const data = formsData.filter((item) => {
      return item.id === uid
    })
    console.log("data", data)
    if (data.length > 0) {
      dispatch(updateForm({ id, formTitle: title, createdDate: data[0].createdDate, updatedDate: date + "/" + month + "/" + year, form: forms }), addFormtitle(" "), addFormId(" "))
      console.log("adasjdhasdasjhdhasjdsahjdj")
    } else {
      dispatch(addForm({ id, formTitle, form, createdDate: date + "/" + month + "/" + year, }))
      dispatch(addFormtitle(" "))
      dispatch(addFormId(" "))
    }
  }
  const deleteInputField = (index) => {
    console.log(index)
    dispatch(deleteInput(index))
    dispatch(SelectInputType({ type: "" }))
  }

  useEffect(() => {
    const data = formsData.some((item) => {
      return item.id === uid
    })
    setBtn(data)
  })

  const editInput = (index) => {
    setEditIndex(index)
  }
  const editIndexNo = (indexno) => {
    setEditOptionIndex(indexno)
  }
  const editInputLabel = (index) => {
    dispatch(editLabel({ index, editlabel }))
  }
  const editOptionsLabel = (index, indexno) => {
    dispatch(editOptionLabel({ index, indexno, editlabel }))
  }
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(form);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(setDragInputs(items))
  }
  return (
    <div>
      {/* {console.log(userdata, "userData")}
      {console.log(uid, formsData)} */}
      {console.log(state, "stateeeeeeeeeeeeee")}
      {window.location.pathname === "/createForm" ? "" : <NavBar />}
      <div className="FormContainer">
        {/* <div> x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}</div> */}
        <form className="Form" onSubmit={CreateUser}>
          <h1 style={{ fontSize: "40px", }}>{title === "" ? <h1>Untitled Form</h1> : title}</h1>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="contain" >
              {(provided) => (
                <div className="contain" {...provided.droppableProps} ref={provided.innerRef}>
                  {form.map(({ label, type, values, id }, index) =>
                    type === "radio" ||
                      type === "checkbox" ||
                      type === "textarea" ||
                      type === "select" ? (
                      type === "textarea" ? (
                        <>
                          <br />
                          {/* <Draggable onDrag={(e, data) => trackPos(data)} axis="y" > */}
                          <Draggable key={id.toString()} draggableId={id.toString()} index={index}>
                            {(provided) => (
                              <div className="inputContainer" key={id.toString()} ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                {editIndex === index ? <TextField
                                  id="standard-basic"
                                  style={{ width: "100%" }}
                                  sx={{
                                    "& .MuiInputBase-root": {
                                      color: "white",
                                      borderBottom: "1px solid white",
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
                                  type="text"
                                  value={editlabel}
                                  onBlur={() => {
                                    setEditIndex()
                                    editInputLabel(index)
                                  }}
                                  onChange={(e) => {
                                    e.stopPropagation()
                                    setEditLabel(e.target.value)
                                  }}
                                /> : <label onClick={(e) => {
                                  e.stopPropagation();
                                  setEditLabel(label); editInput(index)
                                }}>{label}</label>}
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
                                <IconButton aria-label="delete" style={{ backgroundColor: "white", float: "right" }} onClick={(e) => {
                                  e.stopPropagation()
                                  deleteInputField(index)
                                }} >
                                  <DeleteForeverIcon />
                                </IconButton>
                                {provided.placeholder}
                              </div>
                            )}
                          </Draggable>
                          {/* </Draggable> */}
                          <br />
                        </>
                      ) : type === "select" ? (
                        <>
                          <br />
                          {/* <Draggable onDrag={(e, data) => trackPos(data)} axis="y"> */}
                          <Draggable key={id.toString()} draggableId={id.toString()} index={index}>
                            {(provided) => (
                              <div className="inputContainer" key={id.toString()} ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                {editIndex === index ? <TextField
                                  id="standard-basic"
                                  style={{ width: "100%" }}
                                  sx={{
                                    "& .MuiInputBase-root": {
                                      color: "white",
                                      borderBottom: "1px solid white",
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
                                  type="text"
                                  value={editlabel}
                                  onBlur={() => {
                                    setEditIndex()
                                    editInputLabel(index)
                                  }}
                                  onChange={(e) => {
                                    e.stopPropagation()
                                    setEditLabel(e.target.value)
                                  }}
                                /> : <label onClick={(e) => {
                                  e.stopPropagation();
                                  setEditLabel(label); editInput(index)
                                }}>{label}</label>}
                                <select
                                  name={label}
                                  value={formstate.label}
                                  onChange={getformData}
                                >
                                  {values.map((value) => (
                                    <>
                                      <option value={value}>{value}</option>
                                    </>
                                  ))}
                                </select>

                                {values.map((value, indexno) => (
                                  <div style={{
                                    minWidth: "600px",
                                    minHeight: "50px",
                                    padding: "5px 0px",
                                    overflow: "hidden",
                                    borderRadius: "10px"
                                  }}>
                                    {editOptionIndex === indexno ? <TextField
                                      id="standard-basic"
                                      style={{ width: "90%", marginBottom: "10px" }}
                                      sx={{
                                        "& .MuiInputBase-root": {
                                          color: "white",
                                          borderBottom: "1px solid white",
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
                                      type="text"
                                      value={editlabel}
                                      onBlur={() => {
                                        setEditOptionIndex()
                                        editOptionsLabel(index, indexno)
                                      }}
                                      onChange={(e) => {
                                        e.stopPropagation()
                                        setEditLabel(e.target.value)
                                      }}
                                    /> :
                                      <p style={{ display: "inline-block", padding: "10px 5px" }} onClick={(e) => {
                                        e.stopPropagation();
                                        setEditLabel(value);
                                        editIndexNo(indexno)
                                      }}>{value}</p>}
                                    {values.length !== 1 ?
                                      <IconButton aria-label="delete" style={{ backgroundColor: "white", float: "right" }}
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          dispatch(deleteOptions({ indexno, index }))
                                        }} >
                                        <DeleteIcon />
                                      </IconButton> : ""}
                                  </div>
                                ))}
                                <IconButton aria-label="delete" style={{ backgroundColor: "white" }} onClick={(e) => {
                                  e.stopPropagation()
                                  deleteInputField(index)
                                }} >
                                  <DeleteForeverIcon />
                                </IconButton>
                              </div>
                            )}
                          </Draggable>
                          {/* </Draggable> */}
                        </>
                      ) : (
                        <>
                          <br />
                          {/* <Draggable onDrag={(e, data) => trackPos(data)} axis="y"> */}
                          <Draggable key={id.toString()} draggableId={id.toString()} index={index}>
                            {(provided) => (
                              <div className="inputContainer" key={id.toString()} ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                {editIndex === index ? <TextField
                                  id="standard-basic"
                                  style={{ width: "100%", marginBottom: "10px" }}
                                  sx={{
                                    "& .MuiInputBase-root": {
                                      color: "white",
                                      borderBottom: "1px solid white",
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
                                  type="text"
                                  value={editlabel}
                                  onBlur={() => {
                                    setEditIndex()
                                    editInputLabel(index)
                                  }}
                                  onChange={(e) => {
                                    e.stopPropagation()
                                    setEditLabel(e.target.value)
                                  }}
                                /> : <label onClick={(e) => {
                                  e.stopPropagation();
                                  setEditLabel(label); editInput(index)
                                }}>{label}</label>}
                                {values.map((value, indexno) => (
                                  <>
                                    <input
                                      type={type}
                                      name={label}
                                      onChange={getCheckBoxData}
                                      value={value}
                                      style={{ marginBottom: "30px" }}
                                    />
                                    {editOptionIndex === indexno ? <TextField
                                      id="standard-basic"
                                      style={{ width: "90%", marginBottom: "10px" }}
                                      sx={{
                                        "& .MuiInputBase-root": {
                                          color: "white",
                                          borderBottom: "1px solid white",
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
                                      type="text"
                                      value={editlabel}
                                      onBlur={() => {
                                        setEditOptionIndex()
                                        editOptionsLabel(index, indexno)
                                      }}
                                      onChange={(e) => {
                                        e.stopPropagation()
                                        setEditLabel(e.target.value)
                                      }}
                                    /> : <span onClick={(e) => {
                                      e.stopPropagation();
                                      setEditLabel(value);
                                      editIndexNo(indexno)
                                    }}>{value}</span>}

                                    {
                                      values.length !== 1 ? <IconButton aria-label="delete" style={{ backgroundColor: "white", float: "right" }}
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          dispatch(deleteOptions({ indexno, index }))
                                        }} >
                                        <DeleteIcon />
                                      </IconButton> : ""
                                    }

                                    <br />

                                  </>
                                ))}
                                <IconButton aria-label="delete" style={{ backgroundColor: "white" }} onClick={(e) => {
                                  e.stopPropagation()
                                  deleteInputField(index)
                                }
                                } >
                                  <DeleteForeverIcon />
                                </IconButton>
                              </div>
                            )}
                          </Draggable>
                          {/* </Draggable > */}
                        </>
                      )
                    ) : (
                      <>
                        <br />
                        {/* <Draggable onDrag={(e, data) => trackPos(data)} axis="y"> */}
                        <Draggable key={id.toString()} draggableId={id.toString()} index={index}>
                          {(provided) => (
                            <div className="inputContainer" key={id.toString()} ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                              {editIndex === index ? <TextField
                                id="standard-basic"
                                style={{ width: "100%", marginBottom: "10px" }}
                                sx={{
                                  "& .MuiInputBase-root": {
                                    color: "white",
                                    borderBottom: "1px solid white",
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
                                type="text"
                                value={editlabel}
                                onBlur={() => {
                                  setEditIndex()
                                  editInputLabel(index)
                                }}
                                onChange={(e) => {
                                  e.stopPropagation()
                                  setEditLabel(e.target.value)
                                }}
                              /> : <label onClick={(e) => {
                                e.stopPropagation();
                                setEditLabel(label);
                                editInput(index)
                              }}>{label}</label>}
                              <br />
                              <TextField
                                id="standard-basic"
                                sx={{
                                  "& .MuiInputBase-root": {
                                    color: "white",
                                    borderBottom: "1px solid white",
                                    width: "400px"
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
                              <IconButton aria-label="delete" style={{ backgroundColor: "white", float: "right" }} onClick={(e) => {
                                e.stopPropagation()
                                deleteInputField(index)
                              }} >
                                <DeleteForeverIcon />
                              </IconButton>
                            </div >
                          )}
                        </Draggable>

                        {/* </Draggable > */}
                      </>
                    )
                  )}
                  <br />
                  {window.location.pathname === "/createForm" ? "" :
                    form.length > 0 ? (
                      <Button
                        variant="contained"
                        type="submit"
                        endIcon={<TurnedInNotIcon />}
                        sx={{ marginTop: "20px" }}
                      >
                        submit
                      </Button>
                    ) : (
                      ""
                    )
                  }
                </div >
              )}
            </Droppable>
          </DragDropContext>
        </form >


        {/* <div><First /></div> */}
      </div>
      {window.location.pathname === "/createForm" ? <Button className="btn" style={{ background: "black", float: "right", color: "white", marginRight: "40px", marginTop: "10px" }} onClick={saveForm}>
        <Link to="/createdForm" className="Link" style={{ color: "white" }}>
          {btn ? "update" : "submit"}
        </Link></Button> : ""}
    </div >
  );
}

export default memo(MAINFORM);

