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
let TextInput = React.createClass({

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
        let val ='';
        if(this.props.data.jsonkey) {
            if(this.props.data.jsonkey.length > 0) {
                val ="{{" + this.props.data.jsonkey + "}}";
            }
        } else {
            if(this.props.data.value) {
                val=this.props.data.value;
            }
        }
        let buttons = "";
        if (!this.props.data.notRemovable) {
            buttons = <div>
                 <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
        moveDowncontrol={this.props.moveDowncontrol}
        removecontrol={this.props.removecontrol}
        clonecontrol={this.props.clonecontrol}
        data={this.props.data}/>
            </div>
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
                <label >
                    {this.props.data.content}
                </label>
                <input type={this.props.data.input_type}  name={this.props.data.name} onClick={this.stopPropagation}
                placeholder={this.props.data.placeholder} className={this.props.data.class}
                    accessKey={this.props.data.accesskey}
                    contentEditable={this.props.data.contenteditable}
                     spellCheck={this.props.data.spellcheck}
                    id={this.props.data.controlid}
                    tabIndex={this.props.data.tabindex}
                    title={this.props.data.title}
                   style={inlinestyle}
                    value ={val}
                />
                {buttons}
            </div>
        )
    }
});

TextInput.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['class'] = 'form-control';
    cntrlDefaultProperties['autofocus'] = false;
  cntrlDefaultProperties['value'] = '';
    cntrlDefaultProperties['placeholder'] = '';
    cntrlDefaultProperties['content'] = 'Label';
    
    cntrlDefaultProperties['input_type']='text';
    cntrlDefaultProperties['form_type'] = '';
    cntrlDefaultProperties['style_display'] = 'block';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
    ['onblur','onchange','onclick','oncontextmenu','ondblclick','onfocus','onkeydown','onkeypress',
    'onkeyup','onmousedown','onmouseover','onmouseup','onselect']);
    return cntrlDefaultProperties;
}
TextInput.HtmlControl_TextInput=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";

    var htmlControls=[];
    var htmlControlLable={};
    htmlControlLable.type="label";
    htmlControlLable.html=htmlControlobj["content"];    
    htmlControlLable.style="vertical-align:top"; 
    var htmlControlTextInput={};
    var inlineJsfunctions='';
    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','autofocus','disabled','rows','cols','placeholder'];
    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControlTextInput[key]=htmlControlobj[key];
            }
        }
    })
    htmlControlTextInput["id"]=htmlControlobj["controlid"];
    htmlControlTextInput.type=htmlControlobj["input_type"];
    htmlControlTextInput["value"]='';
    let val='';
    if(htmlControlobj['jsonkey']) {
        if(htmlControlobj['jsonkey'].length > 0) {
            val ="{{" + htmlControlobj['jsonkey'] + "}}";
        }
    } else {
        if(htmlControlobj['value']) {
            val=htmlControlobj['value'];
        }
    }
    htmlControlTextInput["Value"]=val;
    var result=InlineStyleHelper.AllocateEvents(htmlControlobj,htmlControlTextInput,inlineJsfunctions);
    htmlControlTextInput=result.htmlControl;
    inlineJsfunctions=result.inlineJsfunctions;
    htmlControlTextInput.style=InlineStyleHelper.getInlineStyle(htmlControlobj);

    htmlControls.push(htmlControlLable);
    htmlControls.push(htmlControlTextInput);    
    htmlControldiv.html=htmlControls;
    var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
        htmlControldiv.style=inlineStyle;
    if(htmlControlobj["div_class"]!="")
        htmlControldiv.class=htmlControlobj["div_class"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = TextInput;