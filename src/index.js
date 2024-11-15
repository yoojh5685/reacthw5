import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import StudentList from "./Components/StudentList";

const myComponent = <StudentList />;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(myComponent);