import "./App.css";
import MAINFORM from "./components/mainForm";
import Main from "./components/Main";
import FormDataListing from "./components/FormDataListing";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/Home";

import Login from "./components/Login";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/CreateForm" element={<Main />} />
        <Route path="/CreatedForm" element={<MAINFORM />} />
        <Route path="/FormDataListing" element={<FormDataListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/google-form" element={<Home />} />
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
