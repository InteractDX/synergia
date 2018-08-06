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
import moment from 'moment';
import InlineStyleHelper from '../common/inlinestylehelper.jsx';
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
import ID from '../common/UUID.js';

//create the Section class
let Section = React.createClass({

    render() {
       
        return (
            <div>
            </div>
        )
    }
});
Section.getRowInlineStyle=function(properties)
{
   let styleDictionary = InlineStyleHelper.generateInlineStyle(properties);
   let inlinestyle = styleDictionary.inlinestyle;   
   return inlinestyle;
}
Section.getRowInlineStyleForOutput=function(htmlControlobj)
{
   var inlineStyle=InlineStyleHelper.getInlineStyle(htmlControlobj);
    return inlineStyle;
}
//set the control default properties
Section.properties = function (cntrlDefaultProperties) {

    cntrlDefaultProperties['rownumber'] = '1';
    cntrlDefaultProperties['columncount'] = '1';
    cntrlDefaultProperties['borderClass'] = 'row';
    cntrlDefaultProperties['class'] = ' row';
    cntrlDefaultProperties['display'] = 'block';
    cntrlDefaultProperties['global_json']='';
    cntrlDefaultProperties['style_borderTop'] = '';
    cntrlDefaultProperties['style_borderBottom']='';
    cntrlDefaultProperties['style_borderRight'] = '';
    cntrlDefaultProperties['style_borderLeft']='';
    cntrlDefaultProperties['column1class'] = 'col-xs-12';
    cntrlDefaultProperties['column2class'] = '';
    cntrlDefaultProperties['column3class'] = '';
    cntrlDefaultProperties['column4class'] = '';
    cntrlDefaultProperties['column5class'] = '';
    cntrlDefaultProperties['column6class'] = '';
    cntrlDefaultProperties['column7class'] = '';
    cntrlDefaultProperties['column8class'] = '';
    cntrlDefaultProperties['column9class'] = '';
    cntrlDefaultProperties['column10class'] = '';
    cntrlDefaultProperties['column11class'] = '';
    cntrlDefaultProperties['column12class'] = '';

    cntrlDefaultProperties['style'] = {}
    cntrlDefaultProperties['style_fontSize'] = '';
    cntrlDefaultProperties['style_fontFamily'] = '';
    cntrlDefaultProperties['style_fontWeight'] = '';
    cntrlDefaultProperties['style_fontStyle'] = '';
    cntrlDefaultProperties['style_fontVariant'] = '';
    cntrlDefaultProperties['style_textTransform'] = '';
    cntrlDefaultProperties['style_color'] = '';
    cntrlDefaultProperties['style_backgroundColor'] = '';
    cntrlDefaultProperties['style_backgroundImage'] = '';
    cntrlDefaultProperties['style_backgroundRepeat'] = '';
    cntrlDefaultProperties['style_backgroundattachment'] = '';
    cntrlDefaultProperties['style_backgroundxposition'] = '';
    cntrlDefaultProperties['style_backgroundyposition'] = '';
    cntrlDefaultProperties['style_position'] = '';
    cntrlDefaultProperties['style_zIndex'] = '';
    cntrlDefaultProperties['style_width'] = '';
    cntrlDefaultProperties['style_height'] = '';
    cntrlDefaultProperties['style_top'] = '0px';
    cntrlDefaultProperties['style_right'] = '';
    cntrlDefaultProperties['style_bottom'] = '';
    cntrlDefaultProperties['style_left'] = '0px';
    cntrlDefaultProperties['style_underline'] = '';
    cntrlDefaultProperties['style_overline'] = '';
    cntrlDefaultProperties['style_linethrough'] = '';    
    cntrlDefaultProperties['style_margin'] = '';
    cntrlDefaultProperties['style_padding'] = '';
    cntrlDefaultProperties['style_textAlign'] = '';
    cntrlDefaultProperties['style_lineHeight'] = '';

    return cntrlDefaultProperties;
}

//Section Div
var SectionColumnDiv = React.createClass({
    render: function () {
        return (
            <div>
                D
            </div>
        );
    }
});
//section div properties
SectionColumnDiv.properties = function (cntrlDefaultProperties) {

   cntrlDefaultProperties['class'] = 'col-md-12';
   return cntrlDefaultProperties;
}

//export the modules
module.exports = Section;