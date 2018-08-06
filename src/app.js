/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Deepak.Somase, Zymr
*******************************************************/
//import plugin modules Component
import React from "react";
import ReactDOM from "react-dom";

// import custom Components
// import TestComponent from "./test.jsx";
import FormBuilder from "./main.jsx";
import Header from './header.jsx';

/*Render dom */

//Render test component
// ReactDOM.render(
//   <TestComponent />,
//   document.getElementById('formbuilder')
// )

//Render main component for the form formbuilder
const headerdiv = document.createElement('div');
document.body.appendChild(headerdiv);

const formbuilderdiv = document.createElement('div');
document.body.appendChild(formbuilderdiv);

ReactDOM.render(    
    <Header/>, headerdiv
)

//Render main component for the form formbuilder
ReactDOM.render(
    <FormBuilder/>,formbuilderdiv
)