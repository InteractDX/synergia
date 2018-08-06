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
import ID from '../common/UUID.js';
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
import ReactDOM from 'react-dom';
var apiResponseData=[];
//create the header class
let CheckboxGroup = React.createClass({

    stopPropagation: function (e) {
        if(!e) e=window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) 
            e.stopPropagation();
        },
        componentDidMount() { 
     var el = ReactDOM.findDOMNode(this.refs[this.props.data.jsonkey]); 
     var control = this;   
    if(this.props.globaldata && this.props.data.jsonkey.length>0) {
      if( Object.keys(this.props.globaldata).length > 0 && this.props.globaldata!= null)
      {
        apiResponseData=this.props.globaldata;
        var finalData='';
        var levels = this.props.data.jsonkey.split('.');
        for(var i=0;i<levels.length;i++){
            if(finalData=='') {
                finalData = apiResponseData[levels[i]];
            }
            else
            {
                finalData=finalData[levels[i]]
            }
      }
        this.BindcheckboxValue(finalData);
      }
    }
    var url = $("#globaljsonurlfield").val() && ($("#globaljsonurlfield").val()).trim() ? ($("#globaljsonurlfield").val().trim()) : (window.globaljsonurl);
    if(url && url!='' && control.props.data.jsonkey.length>0)
    { 
        var xhttp = new XMLHttpRequest();
        var url = $("#globaljsonurlfield").val() && ($("#globaljsonurlfield").val()).trim() ? ($("#globaljsonurlfield").val().trim()) : (window.globaljsonurl);
        xhttp.open("GET", url, true);
        xhttp.send();

        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            apiResponseData = JSON.parse(this.response);
              var finalData='';
        var levels = control.props.data.jsonkey.split('.');
        for(var i=0;i<levels.length;i++){
            if(finalData=='') {
                finalData = apiResponseData[levels[i]];
            }
            else
            {
                finalData=finalData[levels[i]]
            }
      }
            control.BindcheckboxValue(apiResponseData);
          } else {
            //do nothing for now
          }
        }
    }
    
   },
   BindcheckboxValue(apiResponseData)
   {
       var Optionarray=[];
       var valuefield=this.props.data.jsonkeyValue;
       var textfield=this.props.data.jsonkeyText;
       if(valuefield!="" || textfield !="")
       {
            for(var i=0;i<apiResponseData.length;i++)
            {
                var pairvalue={};
                if(valuefield!="" && textfield!="")
                {
                pairvalue.value=apiResponseData[i][valuefield];
                pairvalue.text=apiResponseData[i][textfield];
                pairvalue.key=ID.uuid();
            }
            else  if(valuefield!="" && textfield=="")
             {
                pairvalue.value=apiResponseData[i][valuefield];
                pairvalue.text=apiResponseData[i][valuefield];
                pairvalue.key=ID.uuid();
            }
            else  if(valuefield=="" && textfield!="")
             {
                pairvalue.value=apiResponseData[i][textfield];
                pairvalue.text=apiResponseData[i][textfield];
                pairvalue.key=ID.uuid();
            }
                Optionarray.push(pairvalue);
            }
            this.props.data.checkboxoptions=Optionarray;
       }
       
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
                className={classNames + " " + this.props.data.borderClass+" "+this.props.data.div_class
}
                onClick={this
                .props
                .setSelectedControl
                .bind(this, this.props.data)}>
                <span style={inlinestyle}>
                  {this
                        .props
                        .data
                        .checkboxoptions
                        .map(function (option) {
                            return <span key={option.key} > <input type="checkbox"/><label>{option.text}</label></span>
                    
                        })}
                        </span>
                        <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
        moveDowncontrol={this.props.moveDowncontrol}
        removecontrol={this.props.removecontrol}
        clonecontrol={this.props.clonecontrol}
        data={this.props.data}/>
            </div>
        )
    }
})

CheckboxGroup.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['autofocus'] = false;
    cntrlDefaultProperties['jsonkeyText'] = '';
    cntrlDefaultProperties['jsonkeyValue'] = '';
    cntrlDefaultProperties['dropzone'] = false;
    cntrlDefaultProperties['content'] = 'Label';
    cntrlDefaultProperties['style_display'] = 'block';
    cntrlDefaultProperties['checkboxoptions'] = [
        {
            value: 'option1',
            text: 'checkbox1',
            key: 'option1'
        }, {
            value: 'option2',
            text: 'checkbox2',
            key: 'option2'
        }
    ];
    cntrlDefaultProperties['style_borderTop'] = '';
    cntrlDefaultProperties['style_borderBottom']='';
    cntrlDefaultProperties['style_borderRight'] = '';
    cntrlDefaultProperties['style_borderLeft']='';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
    ['onblur','onchange','onclick','oncontextmenu','ondblclick','onfocus','onkeydown','onkeypress',
    'onkeyup','onload','onmousedown','onmouseover','onmouseup','onselect','onsubmit','onunload']);
    return cntrlDefaultProperties;
}

CheckboxGroup.HtmlControl_CheckboxGroup=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";
    var inlineJsfunctions='';
    var htmlControls=[];
    var htmlControlSpan={};
   
   var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','autofocus','disabled'];
    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControlSpan[key]=htmlControlobj[key];
            }
        }
    })
    htmlControlSpan["id"]=htmlControlobj["controlid"];
    htmlControlSpan.type="span";
    //append the dropdown options
    var Checkboxlist=[];
    for(var optCounter=0;optCounter<htmlControlobj["checkboxoptions"].length;optCounter++)
    {
       
       var inputtype={};
      inputtype.type="checkbox";
      inputtype.id=htmlControlobj["checkboxoptions"][optCounter].key;
       inputtype["value"]=htmlControlobj["checkboxoptions"][optCounter].value;
        inputtype.name=htmlControlobj["name"];
      Checkboxlist.push(inputtype)
      var lable={};
      lable.type="label";
      lable["html"] = htmlControlobj["checkboxoptions"][optCounter].text; ;
        Checkboxlist.push(lable);
    }
    htmlControlSpan["html"]=Checkboxlist;
  
    var result=InlineStyleHelper.AllocateEvents(htmlControlobj,htmlControlSpan,inlineJsfunctions);
    htmlControlSpan=result.htmlControl;
    inlineJsfunctions=result.inlineJsfunctions;
    htmlControlSpan.style=InlineStyleHelper.getInlineStyle(htmlControlobj);

    htmlControls.push(htmlControlSpan);    
   
    htmlControldiv.html=htmlControls;
    var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
     htmlControldiv.style=inlineStyle;
	 if(htmlControlobj["div_class"]!="")
     htmlControldiv.class=htmlControlobj["div_class"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = CheckboxGroup;