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
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
import InlineStyleHelper from '../common/inlinestylehelper.jsx'

//create the header class
let Image = React.createClass({

    //render the html
    render() {

        let classNames = 'designer_draggable'; //class to activate drag on designer
        let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
        let inlinestyle = styleDictionary.inlinestyle;
        let divStyle=styleDictionary.divinlinestyle;

        let buttons = "";
        if (!this.props.data.notRemovable) {
            buttons = <div>
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
                <span className="glyphicon glyphicon-remove delete-icon" onClick={this
                    .props
                    .removecontrol
                    .bind(this, this.props.data)}></span>
                    <span className="glyphicon glyphicon-copy" onClick={this
                    .props
                    .clonecontrol
                    .bind(this, this.props.data)}></span>
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
                <img
                    alt={this.props.data.alt}
                    src={this.props.data.src}
                    draggable={this.props.data.draggable}
                    className={this.props.data.class}
                    id={this.props.data.controlid}
                    tabIndex={this.props.data.tabindex}
                    title={this.props.data.title}
                    height={this.props.data.height}
                    width={this.props.data.width}
                    style={inlinestyle}/>
                {buttons}
            </div>
        )
    }

})

Image.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['autofocus'] = false;
    cntrlDefaultProperties['src'] = './images/default-placeholder.png';
    cntrlDefaultProperties['height'] = '';
    cntrlDefaultProperties['width'] = '';
    cntrlDefaultProperties['target'] = '_blank';
    cntrlDefaultProperties['href'] = '';
    cntrlDefaultProperties['alt'] = '';
    cntrlDefaultProperties['style_display'] = 'block';
    cntrlDefaultProperties = InlineStyleHelper.SetControlEvents(cntrlDefaultProperties, [
        'onblur',
        'onchange',
        'onclick',
        'oncontextmenu',
        'ondblclick',
        'onfocus',        
        'onload',
        'onmousedown',
        'onmouseover',
        'onmouseup'
    ]);
    return cntrlDefaultProperties;
}
Image.HtmlControl_Image = function (htmlControlobj) {
    var htmlControldiv = {};
    htmlControldiv.type = "div";
    var inlineJsfunctions='';
    var htmlControlImage = {};
    htmlControlImage.type = "img";
    var htmlControlHyperLink={}
    htmlControlHyperLink.html=[];
    htmlControlHyperLink.type="a";
    var htmlPropertiesForBind = [
        'name',
        'accesskey',
        'hidden',
        'tabindex',
        'title',
        'class',
        'autofocus',
        'disabled'
    ];

    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if (htmlPropertiesForBind.indexOf(key) >= 0) {
            if (htmlControlobj[key] && htmlControlobj[key] != "") {
                htmlControlImage[key] = htmlControlobj[key];
            }
        }
    })
    if(htmlControlobj.href !="" && htmlControlobj.href != undefined )
    {
        htmlControlHyperLink["href"]=htmlControlobj["href"];
        htmlControlHyperLink["target"]=htmlControlobj["target"];
        htmlControlImage["id"] = htmlControlobj["controlid"];
        htmlControlImage["src"] = htmlControlobj["src"];
        htmlControlImage["alt"] = htmlControlobj["alt"];
        htmlControlHyperLink.html.push(htmlControlImage);
htmlControlImage=htmlControlHyperLink;
    }
    else
    {
        htmlControlImage["id"] = htmlControlobj["controlid"];
        htmlControlImage["src"] = htmlControlobj["src"];
        htmlControlImage["alt"] = htmlControlobj["alt"];
    }

    var result=InlineStyleHelper.AllocateEvents(htmlControlobj,htmlControlImage,inlineJsfunctions);
    htmlControlImage=result.htmlControl;
    inlineJsfunctions=result.inlineJsfunctions;
    htmlControlImage.style=InlineStyleHelper.getInlineStyle(htmlControlobj);

    htmlControldiv.html = htmlControlImage;
     var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);;
    if(inlineStyle!="")
        htmlControldiv.style=inlineStyle;
	if(htmlControlobj["div_class"]!="")
        htmlControldiv.class=htmlControlobj["div_class"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = Image;