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
let HyperLink = React.createClass({

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

            <div
                draggable='true'
                onDragStart={this
                .props
                .dragStart
                .bind(this, this.props.data)}
               style={divStyle}
                className={classNames + " " + this.props.data.borderClass+" "+this.props.data.div_class}
                onClick={this
                .props
                .setSelectedControl
                .bind(this, this.props.data)}>
                <a href={"{{" + this.props.data.jsonkey + "}}"}
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
                </a>
                <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
        moveDowncontrol={this.props.moveDowncontrol}
        removecontrol={this.props.removecontrol}
        clonecontrol={this.props.clonecontrol}
        data={this.props.data}/>
            </div>
        )
    }
})

HyperLink.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['socialurl'] = 'https://www.google.com';
    cntrlDefaultProperties['content'] = 'Hyper link';
    cntrlDefaultProperties['style_display'] = 'block';
    cntrlDefaultProperties['target'] = '_blank';
    cntrlDefaultProperties['data_target']='';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
    ['onclick','onmouseover','onmouseout']);

    return cntrlDefaultProperties;
}
HyperLink.HtmlControl_HyperLink=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";
    var inlineJsfunctions='';
    var htmlControlHyperLink={};
    htmlControlHyperLink.type="a";

    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','target','autofocus','disabled'];
    
    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControlHyperLink[key]=htmlControlobj[key];
            }
        }
    })
    htmlControlHyperLink["id"]=htmlControlobj["controlid"];
    let val = htmlControlobj["socialurl"];
    let val1 = htmlControlobj["content"];
    if (htmlControlobj["jsonkey"]) {
        if (htmlControlobj["jsonkey"].length > 0) {
            val = "{{" + htmlControlobj["jsonkey"] + "}}";
            val1 = "{{" + htmlControlobj["jsonkey"] + "}}";
        }
    }
    htmlControlHyperLink["href"] = val;
    htmlControlHyperLink["html"] = val1;
    if(htmlControlobj["data_target"]!="" && htmlControlobj["data_target"]!=null )
    {
        htmlControlHyperLink["data-target"]='#'+htmlControlobj["data_target"];
        htmlControlHyperLink["data-toggle"]="modal";
    }
    
    var result=InlineStyleHelper.AllocateEvents(htmlControlobj,htmlControlHyperLink,inlineJsfunctions);
    htmlControlHyperLink=result.htmlControl;
    inlineJsfunctions=result.inlineJsfunctions;
    htmlControlHyperLink.style=InlineStyleHelper.getInlineStyle(htmlControlobj);
    htmlControldiv.html=htmlControlHyperLink;
    var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
        htmlControldiv.style=inlineStyle;
	if(htmlControlobj["div_class"]!="")
        htmlControldiv.class=htmlControlobj["div_class"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = HyperLink;