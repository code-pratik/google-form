import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux'

function FormDataListing() {
    const data = useSelector((state) => state.formData.formsData)
    const uid = useSelector((state) => state.formData.formId)
    const [FormDataList, setFormList] = useState([])

    const ListData = () => {
        const list = data.filter((item) => {
            return item.id === uid
        })
        setFormList(list)
    }
    useEffect(() => {
        ListData()
    }, [])
    return (
        < div >
            {console.log(FormDataList[0]?.MultipleData, "list")}
            <NavBar />
            {FormDataList[0]?.MultipleData.map((item) => (
                <TableContainer component={Paper} style={{ marginTop: "10px" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {
                                    Object.keys(item.formstate).map((item) => (
                                        item === "checkBoxData" ?
                                            <TableCell >checkBoxData</TableCell> :
                                            <TableCell >{item}</TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(item).map((items) => (
                                Object.values(items).map((val) => (
                                    <TableCell component="th" scope="row">
                                        {val}
                                    </TableCell>
                                ))
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ))

            }

        </div >
    )
}

export default FormDataListing

