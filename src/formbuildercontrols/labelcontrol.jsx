/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Hiren.Nariya, Zymr
*******************************************************/

//import the modules
import React from 'react';
import Select from 'react-select';
import xss from 'xss';
import moment from 'moment';
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
import InlineStyleHelper from '../common/inlinestylehelper.jsx';
//create the header class
let Label = React.createClass({

    //render the html
    render() {
        
        let classNames = 'designer_draggable'; //class to activate drag on designer
        let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
        let inlinestyle = styleDictionary.inlinestyle;
        let divStyle=styleDictionary.divinlinestyle;
        let lblText = this.props.data.content;
        if(this.props.data.jsonkey)
        {
            if(this.props.data.jsonkey.length>0) {
                lblText="{{" + this.props.data.jsonkey + "}}";
            }
        }
        return (
            <div style={divStyle}
                draggable='true'
                onDragStart={this
                .props
                .dragStart
                .bind(this, this.props.data)}
                className={classNames + " " + this.props.data.borderClass+" "+this.props.data.div_class}
                onClick={this
                .props
                .setSelectedControl
                .bind(this, this.props.data)}>
                <label
                htmlFor={this.props.data.for}
                    accessKey={this.props.data.accesskey}
                    contentEditable={this.props.data.contenteditable}
                    draggable={this.props.data.draggable}
                    className={this.props.data.class}
                    spellCheck={this.props.data.spellcheck}
                    id={this.props.data.controlid}
                    tabIndex={this.props.data.tabindex}
                    title={this.props.data.title}
                    style={inlinestyle}>
                    {lblText}
                </label> 
                <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
        moveDowncontrol={this.props.moveDowncontrol}
        removecontrol={this.props.removecontrol}
        clonecontrol={this.props.clonecontrol}
        data={this.props.data}/>
            </div>
        )
    }
});
//set the control default properties
Label.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['source'] = 'http://localhost:3000/USER';
    cntrlDefaultProperties['content'] = 'Label';
    cntrlDefaultProperties['for']='';
    cntrlDefaultProperties['style_display'] = 'block';
    cntrlDefaultProperties['data_toggle'] = '';
    cntrlDefaultProperties['data_target'] = '';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
    ['onclick','ondblclick','onmousedown','onmouseover','onmouseup']);
    return cntrlDefaultProperties;
}
Label.HtmlControl_Label=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";
    var inlineJsfunctions='';
    var htmlControlLabel={};
    htmlControlLabel.type="label";

    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','disabled'];

    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControlLabel[key]=htmlControlobj[key];
            }
        }
    })
    htmlControlLabel["id"]=htmlControlobj["controlid"];
    let val = htmlControlobj["content"];
    if (htmlControlobj["jsonkey"]) {
        if (htmlControlobj["jsonkey"].length > 0) {
            val = "{{" + htmlControlobj["jsonkey"] + "}}";
        }
    }
    htmlControlLabel["html"] = val;
    

    var result=InlineStyleHelper.AllocateEvents(htmlControlobj,htmlControlLabel,inlineJsfunctions);
    htmlControlLabel=result.htmlControl;
    inlineJsfunctions=result.inlineJsfunctions;
    htmlControlLabel.style=InlineStyleHelper.getInlineStyle(htmlControlobj);

    htmlControldiv.html=htmlControlLabel;
    var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);;
    if(inlineStyle!="")
     htmlControldiv.style=inlineStyle;
	  if(htmlControlobj["div_class"]!="")
     htmlControldiv.class=htmlControlobj["div_class"];
     if(htmlControlobj["data_toggle"]!="")
     htmlControldiv['data-toggle']=htmlControlobj["data_toggle"];
     if(htmlControlobj["data_target"]!="")
     htmlControldiv['data-target']=htmlControlobj["data_target"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = Label;