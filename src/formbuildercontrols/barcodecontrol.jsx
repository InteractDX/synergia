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
import ReactDOM from 'react-dom';
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
import ID from '../common/UUID.js';
//create the header class
let Barcode = React.createClass({
componentDidMount() {
   var control = this;
        if (this.props.data.jsonkey) {
            if (control.props.data.jsonkey.length < 0) return;
            var url = $("#globaljsonurlfield").val() && ($("#globaljsonurlfield").val()).trim() ? ($("#globaljsonurlfield").val().trim()) : (window.globaljsonurl);
            if (url && url != '') {
                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", url, true);
                xhttp.send();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        let apiResponseData = JSON.parse(this.response);
                        var finalData=JSON.parse(JSON.stringify(apiResponseData));
                        var levels = control.props.data.jsonkey.split('.');
                        levels.forEach(function(level) {
                        if (finalData) {finalData = finalData[level];}
                        });
                        control.props.data.barCodeValue=finalData;
                        control.setBarcodeDisplayValue(control.props.data.barCodeValue);
                    } else {
                        //do nothing for now
                    }
                }
            }
            else if (this.props.globaldata) {
                if (Object.keys(this.props.globaldata).length > 0) {
                    let apiResponseData = this.props.globaldata;
                    var finalData=JSON.parse(JSON.stringify(apiResponseData));
                    var levels = this.props.data.jsonkey.split('.');
                    levels.forEach(function(level) {
                        if (finalData) {finalData = finalData[level];}
                    });
                    this.props.data.barCodeValue=finalData;
                    this.setBarcodeDisplayValue(this.props.data.barCodeValue);
                }
            }
        }
         else {
         this.setBarcodeDisplayValue(this.props.data.barCodeValue);
     }

    },
 setBarcodeDisplayValue(value) {
       var el = ReactDOM.findDOMNode(this.refs[this.props.data.controlid]);
 JsBarcode("#" + el.id, this.props.data.barCodeValue,  {
          lineColor: "#000",
          width: this.props.data.barCodeWidth,
          height: this.props.data.barCodeHeight,
          displayValue: this.props.data.barcodeDisplay
});  
 },
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
                    <svg id={this.props.data.controlid} ref={this.props.data.controlid}></svg>
                    <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
                    moveDowncontrol={this.props.moveDowncontrol}
                    removecontrol={this.props.removecontrol}
                    clonecontrol={this.props.clonecontrol}
                    data={this.props.data}/>
            </div>
        )
    }
})

Barcode.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
        cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['controlid']='barcontrol1';
    cntrlDefaultProperties['barCodeValue'] = 'Hello World';
    cntrlDefaultProperties['barCodeWidth'] = 1;
    cntrlDefaultProperties['barCodeHeight'] = 80;
    cntrlDefaultProperties['barcodeDisplay'] = false;
    return cntrlDefaultProperties;
}

Barcode.HtmlControl_Barcode=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";
    var inlineJsfunctions='';
    var htmlControlHeader={};
    htmlControlHeader.type="svg";

    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','disabled'];

    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControlHeader[key]=htmlControlobj[key];
            }
        }
    })
    htmlControlHeader["id"]=htmlControlobj["controlid"];

    var result=InlineStyleHelper.AllocateEvents(htmlControlobj,htmlControlHeader,inlineJsfunctions);
    htmlControlHeader=result.htmlControl;
    inlineJsfunctions=result.inlineJsfunctions ;
    var loadBarChart=" JsBarcode('#" + htmlControlHeader["id"]+"','"+htmlControlobj["barCodeValue"]+"' ,  {"+
         " lineColor: '#000',"+
         "  width: "+htmlControlobj["barCodeWidth"]+","+
         "  height: "+htmlControlobj["barCodeHeight"]+","+
         "   displayValue:"+htmlControlobj["barcodeDisplay"]+
    "});";
    inlineJsfunctions=inlineJsfunctions +'$(document).ready(function() {'+loadBarChart+' });';
    htmlControlHeader.style=InlineStyleHelper.getInlineStyle(htmlControlobj);

    htmlControldiv.html=htmlControlHeader;
    var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);;
    if(inlineStyle!="")
     htmlControldiv.style=inlineStyle;
	  if(htmlControlobj["div_class"]!="")
     htmlControldiv.class=htmlControlobj["div_class"];
   return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = Barcode;