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
import ReactDOM from 'react-dom';

//create the header class
let QRcode = React.createClass({
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
                    if (typeof finalData === 'string' || finalData instanceof String)
                    {
                        control.props.data.qrCodeValue=finalData;
                        control.setQRcodeDisplayValue(control.props.data.qrCodeValue);
                    }
                } 
                }
            }
    else if (this.props.globaldata) {
        if (Object.keys(this.props.globaldata).length > 0) {
            let apiResponseData = this.props.globaldata;
            var finalData=this.props.globaldata;
            var levels = this.props.data.jsonkey.split('.');
            levels.forEach(function(level) {
                if (finalData) {finalData = finalData[level];}
            });
            if (typeof finalData === 'string' || finalData instanceof String)
            {
                this.props.data.qrCodeValue=finalData;
                this.setQRcodeDisplayValue(this.props.data.qrCodeValue);
             }
    }
            }
        }
    else {
        this.setQRcodeDisplayValue(this.props.data.qrCodeValue);
    }
    },
setQRcodeDisplayValue(value) {
    
       var el = ReactDOM.findDOMNode(this.refs[this.props.data.controlid]);
   jQuery('#' + el.id).qrcode({text:value,width:this.props.data.qrCodeWidth,height:this.props.data.qrCodeHeight});
 },
    //render the html
    render() {
        let classNames = 'designer_draggable'; //class to activate drag on designer
        let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
        let inlinestyle = styleDictionary.inlinestyle;
        let divStyle=styleDictionary.divinlinestyle;
        let lblDisplay = 'none'; ///add style here and set this style to div...so div will display as bolck/none
       
        if(this.props.data.barcodeDisplay=='true')
        {
            lblDisplay= 'block';
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
         <div id={this.props.data.controlid} ref={this.props.data.controlid} style={{"clear":"both"}} ></div>
         <div style={{"display":lblDisplay}}>{this.props.data.qrCodeValue}</div>
               <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
        moveDowncontrol={this.props.moveDowncontrol}
        removecontrol={this.props.removecontrol}
        clonecontrol={this.props.clonecontrol}
        data={this.props.data}/>
             </div>           
        )
    }
})

QRcode.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['controlid']='QRcontrol1';
    cntrlDefaultProperties['qrCodeValue'] = 'Hello World';
    cntrlDefaultProperties['qrCodeWidth'] = 256;
    cntrlDefaultProperties['qrCodeHeight'] = 256;
    cntrlDefaultProperties['barcodeDisplay'] = false;
    return cntrlDefaultProperties;
}

QRcode.HtmlControl_QRcode=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";
    var inlineJsfunctions='';
       var htmlControlMainDiv=[];
    var htmlControlHeader={};
    htmlControlHeader.type="div";

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
     inlineJsfunctions=inlineJsfunctions  ;
     //var loadQRChart="jQuery('#" + htmlControlHeader["id"]+"').qrcode('"+htmlControlobj["qrCodeValue"]+"');";
     var loadQRChart="jQuery('#" + htmlControlHeader["id"]+"').qrcode({text:'"+htmlControlobj['qrCodeValue']+"',width:'"+htmlControlobj["qrCodeWidth"]+"',height:'"+htmlControlobj["qrCodeHeight"]+"'});";
    
    
    var url = $("#globaljsonurlfield").val() && ($("#globaljsonurlfield").val()).trim() ? ($("#globaljsonurlfield").val().trim()) : (window.globaljsonurl);
    if(url&&url!='') {
        loadQRChart="$.get('"+url+"', function(e, t) {if (t == 'success'){"+loadQRChart+"}})";
    }
    inlineJsfunctions=inlineJsfunctions+'$(document).ready(function() {'+loadQRChart+' });';
   
    htmlControlHeader.style=InlineStyleHelper.getInlineStyle(htmlControlobj);
htmlControlMainDiv.push(htmlControlHeader);
   var htmlControlDisplayValue={};
    htmlControlDisplayValue.type="div";
    if(htmlControlobj["barcodeDisplay"]=='true')
    {
        htmlControlDisplayValue.html=htmlControlobj['qrCodeValue']
    }
    htmlControlMainDiv.push(htmlControlDisplayValue);
    //htmlControldiv.html=htmlControlHeader;
    htmlControldiv.html=htmlControlMainDiv;
    var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);;
    if(inlineStyle!="")
        htmlControldiv.style=inlineStyle;
	if(htmlControlobj["div_class"]!="")
        htmlControldiv.class=htmlControlobj["div_class"];
   return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = QRcode;