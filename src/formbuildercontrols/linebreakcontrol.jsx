/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Deepak.Somase, Zymr
*******************************************************/

//import the modules
import React from 'react';
import Select from 'react-select';
import xss from 'xss';
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
import moment from 'moment';

//create the header class
let LineBreak = React.createClass({

    //render the html
    render() {
       
        return (
            <span draggable='true' onDragStart={this.props.dragStart.bind(this, this.props.data)}
            onClick={this.props.setSelectedControl.bind(this, this.props.data)} >
             <br/> LineBreak   
             <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
        moveDowncontrol={this.props.moveDowncontrol}
        removecontrol={this.props.removecontrol}
        clonecontrol={this.props.clonecontrol}
        data={this.props.data}/>
          <br/> </span>           
        )
    }
})

LineBreak.properties = function (cntrlDefaultProperties) {
    return cntrlDefaultProperties;
}

LineBreak.HtmlControl_LineBreak=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="br";
    var inlineJsfunctions='';	  
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = LineBreak;