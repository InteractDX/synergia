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
import InlineStyleHelper from '../common/inlinestylehelper.jsx'

//create the header class
let Checkboxes = React.createClass({

    stopPropagation: function (e) {
        if(!e) e=window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) 
            e.stopPropagation();
        }
    ,
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
                <input
                    type="checkbox"
                    onClick={this.stopPropagation}
                    accessKey={this.props.data.accesskey}
                    draggable={this.props.data.draggable}
                    className={this.props.data.class}
                    id={this.props.data.controlid}
                    tabIndex={this.props.data.tabindex}
                    title={this.props.data.title}
                    style={inlinestyle}/>
                <label>
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
})

Checkboxes.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['autofocus'] = false;
    cntrlDefaultProperties['content'] = 'Label';
    cntrlDefaultProperties['style_display'] = 'block';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
    ['onclick','ondblclick','onfocus','onkeydown','onkeypress',
    'onkeyup','onmousedown','onmouseover','onmouseup','onselect']);
    return cntrlDefaultProperties;
}

Checkboxes.HtmlControl_Checkboxes=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";
    var inlineJsfunctions='';
    var htmlControls=[];
    var htmlControlLable={};
    htmlControlLable.type="lable";
    let val = htmlControlobj["content"];
    if (htmlControlobj["jsonkey"]) {
        let val = htmlControlobj["content"];
        if (htmlControlobj["jsonkey"].length > 0) {
            val = "{{" + htmlControlobj["jsonkey"] + "}}";
        }
    }
    htmlControlLable.html = val;
    htmlControlLable.style="vertical-align:top"; 
    var htmlControlCheckBox={};
    htmlControlCheckBox.type="checkbox";
    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','autofocus','disabled'];
    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControlCheckBox[key]=htmlControlobj[key];
            }
        }
    })
    htmlControlCheckBox["id"]=htmlControlobj["controlid"];
    var result=InlineStyleHelper.AllocateEvents(htmlControlobj,htmlControlCheckBox,inlineJsfunctions);
    htmlControlCheckBox=result.htmlControl;
    inlineJsfunctions=result.inlineJsfunctions;
    htmlControlCheckBox.style=InlineStyleHelper.getInlineStyle(htmlControlobj);

    htmlControls.push(htmlControlCheckBox);
    htmlControls.push(htmlControlLable);
    htmlControldiv.html=htmlControls;
    var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
     htmlControldiv.style=inlineStyle;
	 if(htmlControlobj["div_class"]!="")
     htmlControldiv.class=htmlControlobj["div_class"];
   return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}

//export the modules
module.exports = Checkboxes;