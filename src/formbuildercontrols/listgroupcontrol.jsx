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
import ReactDOM from 'react-dom';
var apiResponseData=[];
//create the header class
let ListGroup = React.createClass({
    componentDidMount() {
        var el = ReactDOM.findDOMNode(this.refs[this.props.data.jsonkey]);
        var control = this;
       if(this.props.globaldata && this.props.data.jsonarr.length>0) {
         if( Object.keys(this.props.globaldata).length > 0 && this.props.globaldata!= null)
         {
           apiResponseData=this.props.globaldata;
           var finalData='';
           var levels = this.props.data.jsonarr.split('.');
           for(var i=0;i<levels.length;i++){
               if(finalData=='') {
                   finalData = apiResponseData[levels[i]];
               }
               else
               {
                   finalData=finalData[levels[i]]
               }
         }
           this.BindListGroupValue(finalData);
         }
       }
       var url = $("#globaljsonurlfield").val() && ($("#globaljsonurlfield").val()).trim() ? ($("#globaljsonurlfield").val().trim()) : (window.globaljsonurl);
       if(url && url!='' && control.props.data.jsonarr.length>0)
       {
           var xhttp = new XMLHttpRequest();
           var url = $("#globaljsonurlfield").val() && ($("#globaljsonurlfield").val()).trim() ? ($("#globaljsonurlfield").val().trim()) : (window.globaljsonurl);
           xhttp.open("GET", url, true);
           xhttp.send();
   
           xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
               apiResponseData = JSON.parse(this.response);
                 var finalData='';
           var levels = control.props.data.jsonarr.split('.');
           for(var i=0;i<levels.length;i++){
               if(finalData=='') {
                   finalData = apiResponseData[levels[i]];
               }
               else
               {
                   finalData=finalData[levels[i]]
               }
         }
               control.BindListGroupValue(apiResponseData);
             } else {
               //do nothing for now
             }
           }
       }
   
      },
      BindListGroupValue(apiResponseData)
   {
       var Optionarray=[];
       var valuefield=this.props.data.jsonkey;
       if(valuefield!="")
       {
            for(var i=0;i< apiResponseData.length;i++)
            {
                if(valuefield!="")
                {
                    Optionarray.push(apiResponseData[i][valuefield]);
            }
            }
            this.props.data.listdata=Optionarray;
       }
   },
    //render the html
    render() {

        let classNames = 'designer_draggable '; //class to activate drag on designer
        let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
        let inlinestyle = styleDictionary.inlinestyle;
        let divStyle=styleDictionary.divinlinestyle;
        const CustomTag = `${this.props.data.listtag}`;
        
        return (
            <div style={divStyle} draggable='true' onDragStart={this
        .props
        .dragStart
        .bind(this, this.props.data)}
                className={classNames + " " + this.props.data.borderClass+" "+this.props.data.div_class}
                onClick={this
                .props
                .setSelectedControl
                .bind(this, this.props.data)}>
                <div>          
                  <CustomTag accessKey={this.props.data.accesskey}
                    contentEditable={this.props.data.contenteditable}
                    draggable={this.props.data.draggable}
                    className={this.props.data.class}
                    id={this.props.data.controlid}
                    tabIndex={this.props.data.tabindex}
                    title={this.props.data.title}
                    style={inlinestyle}>
                    {this.props.data.listdata.map((currElement, index) =>
                    {
                        return <li key={index}>{currElement}</li>
                    })}
                  </CustomTag>

                </div>
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
ListGroup.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['jsonarr'] = '';
    cntrlDefaultProperties['content'] = 'Label';
    cntrlDefaultProperties['disabled'] = false;
    cntrlDefaultProperties['listtag'] = 'ul';
    cntrlDefaultProperties['listdata'] = ['First item','Second item','Third item'];
    cntrlDefaultProperties['style_borderTop'] = '';
    cntrlDefaultProperties['style_borderBottom']='';
    cntrlDefaultProperties['style_borderRight'] = '';
    cntrlDefaultProperties['style_borderLeft']='';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
    ['onclick','ondblclick','onmousedown','onmouseover','onmouseup']);
    return cntrlDefaultProperties;
}
ListGroup.HtmlControl_ListGroup=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";

    var inlineJsfunctions='';
    var htmlControlListGroup={};
    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','disabled'];
    htmlControlListGroup.type=htmlControlobj["listtag"];
    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControlListGroup[key]=htmlControlobj[key];
            }
        }
    })
    htmlControlListGroup["id"]=htmlControlobj["controlid"];
    
    var result=InlineStyleHelper.AllocateEvents(htmlControlobj,htmlControlListGroup,inlineJsfunctions);
    htmlControlListGroup=result.htmlControl;
    inlineJsfunctions=result.inlineJsfunctions;
    htmlControlListGroup.style=InlineStyleHelper.getInlineStyle(htmlControlobj);
   
    if(htmlControlobj["div_class"].indexOf("list-group")==0)
    {
        htmlControlListGroup["html"] = '{{#' + htmlControlobj["jsonkey"] +'}}' + '<li class="list-group-item">{{' + htmlControlobj["jsonarr"] +'}}</li>' + '{{/' + htmlControlobj["jsonkey"] +'}}';
    }
    else if(htmlControlobj.listdata.length>0)
    {
        var liHTML='';
        for(var i=0;i<htmlControlobj.listdata.length;i++)
        {
            liHTML = liHTML + "<li>"+htmlControlobj.listdata[i]+"</li>";
        }
        htmlControlListGroup["html"] = liHTML;
    }
    else
    {
        htmlControlListGroup["html"] = '{{#' + htmlControlobj["jsonkey"] +'}}' + '<li >{{' + htmlControlobj["jsonarr"] +'}}</li>' + '{{/' + htmlControlobj["jsonkey"] +'}}';
    }
    var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
        htmlControldiv.style=inlineStyle;
	if(htmlControlobj["div_class"]!="")
        htmlControldiv.class=htmlControlobj["div_class"];
    htmlControldiv.html = htmlControlListGroup;
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = ListGroup;