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
import InlineStyleHelper from '../common/inlinestylehelper.jsx';
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
//create the header class
let Button = React.createClass({
    //render the html
    render() {
        let classNames = 'designer_draggable'; //class to activate drag on designer
        let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
        let inlinestyle = styleDictionary.inlinestyle;
        let divStyle=styleDictionary.divinlinestyle;
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
            <div style={divStyle} className={classNames + " " + this.props.data.borderClass+" "+this.props.data.div_class} 
            draggable='true' onDragStart={this
            .props
            .dragStart
            .bind(this, this.props.data)}
                 onClick={this
                 .props
                 .setSelectedControl
                 .bind(this, this.props.data)}>
                <button accessKey={this.props.data.accesskey} name={this.props.data.name}
                        contentEditable={this.props.data.contenteditable}
                        draggable={this.props.data.draggable}
                        className={this.props.data.class}
                        spellCheck={this.props.data.spellcheck}
                        id={this.props.data.controlid}
                        tabIndex={this.props.data.tabindex}
                        title={this.props.data.title}                        
                        style={inlinestyle}>
                    {this.props.data.content}
                </button>
                {buttons}
            </div>
        )
    }
});

//set the control default properties
Button.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
        cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['form'] = '';
    cntrlDefaultProperties['formaction'] = '';
    cntrlDefaultProperties['formenctype'] = '';
    cntrlDefaultProperties['formmethod'] = '';
    cntrlDefaultProperties['formnovalidate'] = false;
    cntrlDefaultProperties['formtarget'] = '';
    cntrlDefaultProperties['buttontype'] = 'submit';
    cntrlDefaultProperties['content'] = 'Button';
    cntrlDefaultProperties['class'] = 'btn btn-default';
    cntrlDefaultProperties['onClick'] = 'https://www.npmjs.com';
    cntrlDefaultProperties['style_border'] = '';
    cntrlDefaultProperties['style_borderRadius']='';
    cntrlDefaultProperties['style_display'] = 'block';
    cntrlDefaultProperties['style_margin'] = '';
    cntrlDefaultProperties['data_target']='';
    cntrlDefaultProperties['target'] = '_blank';
    cntrlDefaultProperties['href'] = '';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
    ['onclick','oncontextmenu','ondblclick','onmousedown','onmouseout','onmouseover','onmouseup','onsubmit']);
    return cntrlDefaultProperties;
}
Button.HtmlControl_Button=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";
    var inlineJsfunctions='';
    var htmlControlButton={};   
    var htmlControlHyperLink={}
    htmlControlHyperLink.html=[];
    htmlControlHyperLink.type="a";
    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','form','formaction','formenctype','formmethod','formnovalidate','formtarget',
    ,'autofocus','disabled'];

    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControlButton[key]=htmlControlobj[key];
            }
        }
    })
    if(htmlControlobj.href !="" && htmlControlobj.href != undefined )
    {
        htmlControlHyperLink["href"]=htmlControlobj["href"];
        htmlControlHyperLink["target"]=htmlControlobj["target"];
        htmlControlButton["id"]=htmlControlobj["controlid"];
        htmlControlButton["value"]=htmlControlobj["content"];
        htmlControlButton.type=htmlControlobj["buttontype"];
        htmlControlHyperLink.html.push(htmlControlButton);
        htmlControlButton=htmlControlHyperLink;
    }
    else{
        htmlControlButton["id"]=htmlControlobj["controlid"];
        htmlControlButton["value"]=htmlControlobj["content"];   
        htmlControlButton.type=htmlControlobj["buttontype"];
    }
    if(htmlControlobj["data_target"]!="" && htmlControlobj["data_target"]!=null )
    {
        htmlControlButton["data-target"]='#'+ htmlControlobj["data_target"];
        htmlControlButton["data-toggle"]="modal";
    }
    var result=InlineStyleHelper.AllocateEvents(htmlControlobj,htmlControlButton,inlineJsfunctions);
    htmlControlButton=result.htmlControl;
    inlineJsfunctions=result.inlineJsfunctions;
    var inlineStyle=InlineStyleHelper.getInlineStyle(htmlControlobj);
    if(inlineStyle!="")
        htmlControlButton.style=InlineStyleHelper.getInlineStyle(htmlControlobj);
    //htmlControlButton.type=htmlControlobj["buttontype"];
    htmlControldiv.html=htmlControlButton;
    inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
        htmlControldiv.style=inlineStyle;
    if(htmlControlobj["div_class"]!="")
        htmlControldiv.class=htmlControlobj["div_class"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = Button;