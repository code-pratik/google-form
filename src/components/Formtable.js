import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { addFormId } from '../slices/formSlice';
import { addFormInput } from '../slices/formSlice';
import { addFormtitle } from '../slices/formSlice';
import { Link } from 'react-router-dom';
import { IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteForm } from '../slices/formSlice';
import EditIcon from '@mui/icons-material/Edit';
export default function FormTable() {
    const forms = useSelector((state) => state.formData.forms)
    const f = useSelector((state) => state.formData)
    const data = useSelector((state) => state.formData.formsData)
    const formHeadData = ["FormName", "FormDataCount", "CreatedDate", "Updated", "Action"]
    const dispatch = useDispatch()
    const onClickLoadForm = (id) => {
        dispatch(addFormId(id))
        const data = forms.filter((item) => item.id === id)
        dispatch(addFormInput({ flag: 1, data: data[0].form }))
        dispatch(addFormtitle(data[0].formTitle))
    }
    const getId = (id) => {
        dispatch(addFormId(id))
    }
    const onClickDeleteForms = (id) => {
        dispatch(deleteForm(id))
    }
    let arr = []
    const lengthFormsData = () => {
        data.map(({ MultipleData }) => (
            arr = [...arr, MultipleData.length]
        ))
    }
    lengthFormsData()
    return (
        < TableContainer component={Paper} >
            {console.log(f, "F")}
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            formHeadData.map((headData) => (
                                <TableCell >{headData}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {forms.map(({ id, formTitle, createdDate, updatedDate }, index) => (
                        < TableRow
                            key={id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {formTitle}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Link to={"/FormDataListing"} onClick={(e) => {
                                    e.stopPropagation()
                                    getId(id)
                                }}>{arr[index]}</Link>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {createdDate}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {updatedDate}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Link to="/createForm" className="Link" style={{ color: "white" }}>
                                    <IconButton aria-label="delete" style={{ backgroundColor: "white" }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onClickLoadForm(id)
                                        }} >
                                        <EditIcon />
                                    </IconButton>  </Link>
                                <IconButton aria-label="delete" style={{ backgroundColor: "white" }} onClick={(e) => {
                                    e.stopPropagation()
                                    onClickDeleteForms(id)
                                }} >
                                    <DeleteForeverIcon />
                                </IconButton>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
