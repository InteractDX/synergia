/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Hiren.Nariya, Zymr
*******************************************************/
/*
Component for header
*/
import React from 'react';

//Header component for form builder tool
class Header extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return (
            <div
                className="clearfix"
                style={{
                margin: '10px',
                width: '100%'
            }}></div>
        )
    }
}

//Export the module
module.exports = Header;