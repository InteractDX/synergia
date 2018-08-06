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
 Main component which contain 'container' logic for form builder
*/
import React from 'react';
import Preview from './preview.jsx' //import from preview - designer
import Toolbox from './toolbox.jsx' //import toolbox

//component render the designer and toolbox
class DesignerTool extends React.Component
{
    //render the html
    render()
    {
        return (
            <div>
                <Preview/>
                <Toolbox/>
            </div>
        )
    }
}
module.exports = DesignerTool