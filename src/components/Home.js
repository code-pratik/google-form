import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { useDispatch } from "react-redux";
import { addFormId, addFormInput, addFormtitle } from "../slices/formSlice";
import FormTable from "./Formtable";
function Home() {
    const dispatch = useDispatch()

    const onClickEmpty = () => {
        dispatch(addFormId(""))
        dispatch(addFormtitle(""))
        dispatch(addFormInput({ flag: 1, data: [] }))
    }


    return (
        <div>
            <NavBar onEmpty={onClickEmpty} />
            <div className="firstDiv">
                <h6 className="head">Start New Form</h6>
                <div className="FormsContainer">
                    <div onClick={onClickEmpty}>
                        <Link to="/createForm" className="Link">
                            <img
                                src="https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png"
                                width={125}
                                height={100}
                                alt="no found"
                            />
                        </Link>
                        <p>Blank</p>
                    </div>
                </div>
                <FormTable />
            </div>
        </div >
    );
}

export default Home;
