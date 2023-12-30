import React from "react";
import { Link } from "react-router-dom";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import HomeIcon from "@mui/icons-material/Home";
function NavBar(props) {

  return (
    <div className="Nav">
      <div className="flex logo-font">
        <Link to="/" className=" Link" style={{ color: "black" }} onClick={props.onEmpty}>
          <img src="	https://www.gstatic.com/images/branding/product/2x/forms_2020q4_48dp.png" width={40} height={40} alt="no found" />
        </Link>
        <p>Forms</p>
      </div>
    </div>
  );
}

export default NavBar;
