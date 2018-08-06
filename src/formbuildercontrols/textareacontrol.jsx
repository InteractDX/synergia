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
let TextArea = React.createClass({

    stopPropagation(e)
    {
       if(!e) e=window.event;
        e.cancelBubble = true;
        if(e.stopPropagation) e.stopPropagation();
    },
    //render the html
    render() {

        let classNames = 'designer_draggable'; //class to activate drag on designer
       let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
let inlinestyle = styleDictionary.inlinestyle;
let divStyle=styleDictionary.divinlinestyle;
let lblText = this.props.data.value;
        if(this.props.data.jsonkey)
        {
            if(this.props.data.jsonkey.length>0) {
                lblText="{{" + this.props.data.jsonkey + "}}";
            }
        }
        return (

            <div  style={divStyle}
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

                <label style={{"verticalAlign":"top"}}>
                    {this.props.data.content}
                </label>
                <textarea name={this.props.data.name} onClick={this.stopPropagation}
                    rows={this.props.data.rows} placeholder={this.props.data.placeholder}
                    cols={this.props.data.cols}
                    className={this.props.data.class}
                    accessKey={this.props.data.accesskey}
                    contentEditable={this.props.data.contenteditable}
                    draggable={this.props.data.draggable}
                    spellCheck={this.props.data.spellcheck}
                    id={this.props.data.controlid}
                    tabIndex={this.props.data.tabindex}
                    title={this.props.data.title}
                    value ={lblText}
                    style={inlinestyle}></textarea>
                     <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
        moveDowncontrol={this.props.moveDowncontrol}
        removecontrol={this.props.removecontrol}
        clonecontrol={this.props.clonecontrol}
        data={this.props.data}/>
                </div>
        )
    }
});

TextArea.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['rows'] = '4';
    cntrlDefaultProperties['cols'] = '50';
    cntrlDefaultProperties['autofocus'] = false;
    cntrlDefaultProperties['value'] = '';
    cntrlDefaultProperties['content'] = 'Label';
    cntrlDefaultProperties['class'] = 'form-control';
    cntrlDefaultProperties['placeholder'] = '';
    cntrlDefaultProperties['style_borderTop'] = '';
    cntrlDefaultProperties['style_borderBottom']='';
    cntrlDefaultProperties['style_borderRight'] = '';
    cntrlDefaultProperties['style_borderLeft']='';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
    ['onblur','onchange','onclick','oncontextmenu','ondblclick','onfocus','onkeydown','onkeypress',
    'onkeyup','onmousedown','onmouseover','onmouseup','onselect']);
    return cntrlDefaultProperties;
}

TextArea.HtmlControl_TextArea=function(htmlControlobj)
{
   var htmlControldiv={};
    htmlControldiv.type="div";
    var inlineJsfunctions='';
    var htmlControls=[];
    var htmlControlLable={};
    htmlControlLable.type="lable";
    htmlControlLable.html=htmlControlobj["content"];
    htmlControlLable.style="vertical-align:top"; 

    var htmlControlTextArea={};
    htmlControlTextArea.type="textarea";
    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','autofocus','disabled','rows','cols','placeholder'];
    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControlTextArea[key]=htmlControlobj[key];
            }
        }
    })
    htmlControlTextArea["id"]=htmlControlobj["controlid"]; 
    let val = htmlControlobj["value"];
    if (htmlControlobj["jsonkey"]) {
        if (htmlControlobj["jsonkey"].length > 0) {
            val = "{{" + htmlControlobj["jsonkey"] + "}}";
        }
    }
    htmlControlTextArea["html"] = val;
    var result=InlineStyleHelper.AllocateEvents(htmlControlobj,htmlControlTextArea,inlineJsfunctions);
    htmlControlTextArea=result.htmlControl;
    inlineJsfunctions=result.inlineJsfunctions;
    htmlControlTextArea.style=InlineStyleHelper.getInlineStyle(htmlControlobj);

    htmlControls.push(htmlControlLable);   
    htmlControls.push(htmlControlTextArea);   
    htmlControldiv.html=htmlControls;
    var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
     htmlControldiv.style=inlineStyle;
	  if(htmlControlobj["div_class"]!="")
     htmlControldiv.class=htmlControlobj["div_class"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = TextArea;