/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Kuldeep.Bhatt, Zymr
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
let FBIcon = React.createClass({

    //render the html
    render() {

        let classNames = 'designer_draggable'; //class to activate drag on designer
        let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
        let inlinestyle = styleDictionary.inlinestyle;
        let divStyle=styleDictionary.divinlinestyle;
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
                <a href={"{{" + this.props.data.jsonkey + "}}"}>
                    <img
                        src={this.props.data.iconurl}
                        draggable={this.props.data.draggable}
                        alt={this.props.data.alt}
                        className={this.props.data.class}
                        id={this.props.data.controlid}
                        tabIndex={this.props.data.tabindex}
                        title={this.props.data.title}
                        height={this.props.data.height}
                        width={this.props.data.width}
                        style={inlinestyle}/></a>
                         <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
        moveDowncontrol={this.props.moveDowncontrol}
        removecontrol={this.props.removecontrol}
        clonecontrol={this.props.clonecontrol}
        data={this.props.data}/>
            </div>
        )
    }
})

FBIcon.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }

    cntrlDefaultProperties['socialurl'] = 'https://www.facebook.com';
    cntrlDefaultProperties['iconurl'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAABA9pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHhtcE1NOkRlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgPHN0UmVmOmluc3RhbmNlSUQ+eG1wLmlpZDo1QTJFRDU5Rjk4MEUxMUU1OUM1OEQ0QjA5NzJGRTFFODwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDo1QTJFRDVBMDk4MEUxMUU1OUM1OEQ0QjA5NzJGRTFFODwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDo1QTJFRDVBMjk4MEUxMUU1OUM1OEQ0QjA5NzJGRTFFODwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDo1QTJFRDVBMTk4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';
    cntrlDefaultProperties['height'] = '50px';
    cntrlDefaultProperties['width'] = '50px';
    cntrlDefaultProperties['style_display'] = 'block';
    cntrlDefaultProperties['alt'] = '';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
    ['onclick','onmouseover','onmouseout']);
    return cntrlDefaultProperties;
}
FBIcon.HtmlControl_FBIcon = function (htmlControlobj) {
    var htmlControldiv = {};
    htmlControldiv.type = "div";
    var inlineJsfunctions='';
    var htmlControlFBIcon = [];
    if (htmlControlobj.iconurl != '') {
        var a = {};
        a.type = "a";
        a.html = [];
        let val = htmlControlobj["socialurl"];
        if (htmlControlobj["jsonkey"]) {
            if (htmlControlobj["jsonkey"].length > 0) {
                val = "{{" + htmlControlobj["jsonkey"] + "}}";
            }
        }
        a.href = val;
        var image = {};
        image.type = "img";
        image.src = htmlControlobj['iconurl'];
        a.html.push(image);
        a["id"]=htmlControlobj["controlid"];

        var result=InlineStyleHelper.AllocateEvents(htmlControlobj,a,inlineJsfunctions);
        a=result.htmlControl;
        a.style=InlineStyleHelper.getInlineStyle(htmlControlobj);
        inlineJsfunctions=result.inlineJsfunctions;

        htmlControlFBIcon.push(a);
    }
    htmlControldiv.html = htmlControlFBIcon;
    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','target','autofocus','disabled','target'];

    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if (htmlPropertiesForBind.indexOf(key) >= 0) {
            if (htmlControlobj[key] && htmlControlobj[key] != "") {
                htmlControlFBIcon[key] = htmlControlobj[key];
            }
        }
    })
    htmlControldiv.html = htmlControlFBIcon;
    var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
     htmlControldiv.style=inlineStyle;
	  if(htmlControlobj["div_class"]!="")
     htmlControldiv.class=htmlControlobj["div_class"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = FBIcon;