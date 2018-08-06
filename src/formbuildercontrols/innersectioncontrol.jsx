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
let InnerSection = React.createClass({
    preventDefault(e) {    
        if(!e)
            e=window.event;
        e.preventDefault();      
        },
    stopPropagation: function (e) {
        if(!e) e=window.event;
            e.cancelBubble = true;
        if (e.stopPropagation) 
            e.stopPropagation();
        },
    renderColumnDiv(colDetails, colnumber)
    {  
        return (
        <div onDragOver={this.preventDefault.bind()}
        onDrop={this.props.droponInnerColumnDiv.bind(this, colDetails,this.props.parent)}
        className={colDetails.class} id={ID.uuid()}
        key={ID.uuid()} style={{
                    border: '1px dashed #727272',
                    minHeight: "50px"
                }}>
        {colDetails
        .htmlControls
        .map(item => 
        {                      
        return this.props.mapHtmlControl(item,this.props.parent)
        })
	}

    </div>)
    },
    render() {
        var columnData = [];
        var itemData=this.props.data;
        var colCount = itemData.columncount;
        for (let i = 0; i < colCount; i++) {
            var colToCheck="column"+(i+1)+"class";
            var columnClass = itemData[colToCheck];
            itemData.columnDiv[i].class=columnClass;
            columnData.push(this.renderColumnDiv(itemData.columnDiv[i], i));
        }
    
        let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
        let inlinestyle = styleDictionary.inlinestyle;
        let divStyle=styleDictionary.divinlinestyle;
        divStyle=InnerSection.getRowInlineStyle(itemData);
        divStyle.minwidth= "7500px";
        divStyle.overflow= "hidden";
        return (
        <div  draggable='true'  onDragStart={this
            .props
            .dragStart
            .bind(this, this.props.data)}  onClick={this
            .props
            .setSelectedControl
            .bind(this, this.props.data)} 
            className={" row m5px p5px designer_draggable " + this.props.data.borderClass}
            style={divStyle}>
            {columnData}
            <span
            className="glyphicon glyphicon-upload delete-icon"
            onClick={this
            .props
            .moveUpcontrol
            .bind(this, this.props.data)}></span>
            <span
            className="glyphicon glyphicon-download delete-icon"
            onClick={this
            .props
            .moveDowncontrol
            .bind(this, this.props.data)}></span>
            <span
            className="glyphicon glyphicon-remove delete-icon"
            onClick={this
            .props
            .removecontrol
            .bind(this, this.props.data)}></span>
            <span className="glyphicon glyphicon-copy" onClick={this
            .props
            .clonecontrol
            .bind(this, this.props.data)}></span>
     </div>
    )
    }
});
InnerSection.getRowInlineStyle=function(properties)
{
   let styleDictionary = InlineStyleHelper.generateInlineStyle(properties);
   let inlinestyle = styleDictionary.inlinestyle;   
   return inlinestyle;
}
InnerSection.getRowInlineStyleForOutput=function(htmlControlobj)
{
   var inlineStyle=InlineStyleHelper.getInlineStyle(htmlControlobj);
    return inlineStyle;
}
//set the control default properties
InnerSection.properties = function (cntrlDefaultProperties) {
    cntrlDefaultProperties['borderClass'] = 'row';
    cntrlDefaultProperties['controlid'] = '';
    cntrlDefaultProperties["rownumber"] = "0";
    cntrlDefaultProperties["columnnumber"] = "0";
    cntrlDefaultProperties['columncount'] = '1';
    cntrlDefaultProperties["parentcontrolid"] = "0";
    cntrlDefaultProperties['class'] = 'row';
    cntrlDefaultProperties['display'] = 'block';
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
//export the modules
module.exports = InnerSection;