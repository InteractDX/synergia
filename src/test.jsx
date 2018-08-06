/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Deepak.Somase, Zymr
*******************************************************/
/*
This is test jsx file
*/
import React from 'react';

//Create test component
class TestComponent extends React.Component
{
    render()
    {
        return(
          <div className="toolbar-header">
        <span className="label label-default">Header tesxt</span>
        <div className="toolbar-header-buttons">
           
          <div className="btn is-isolated btn-school"  ><i className="is-isolated fa fa-trash-o"></i></div>
        </div>
      </div>
        )
    }
}

//Export the module
module.exports = TestComponent;