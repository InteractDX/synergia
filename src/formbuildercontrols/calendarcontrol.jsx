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
let Calendar = React.createClass({
    componentDidMount() {  
        var el = ReactDOM.findDOMNode(this.refs[this.props.data.controlid]);    
        $("#"+el.id).data("DateTimePicker")
    },
    //render the html
    render() {
        
        let classNames = 'designer_draggable';
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
                <div className='input-group date' ref={this.props.data.controlid} id={this.props.data.controlid} data-date-format={this.props.data.datepicker_format}>
                    <input type='text' className="form-control" />
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar"></span>
                    </span>
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

Calendar.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['content'] = 'Calendar';
    cntrlDefaultProperties['controlid'] = 'Calendar1';
    cntrlDefaultProperties['for']='';
    cntrlDefaultProperties['style_display'] = 'block';
    cntrlDefaultProperties['datepicker_format'] = "dd mm yyyy - HH:ii p";
    cntrlDefaultProperties['datepicker_time'] = '0';
     
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
    ['onclick','ondblclick','onmousedown','onmouseover','onmouseup']);
    return cntrlDefaultProperties;
}

Calendar.HtmlControl_Calendar=function(htmlControlobj)
{
   var htmlControldiv={};
    htmlControldiv.type="div";
     
    htmlControldiv.class="input-group date";
    htmlControldiv["id"]=htmlControlobj["controlid"];
    htmlControldiv['data-date-format']=htmlControlobj['datepicker_format'];
    var inlineJsfunctions='';
    var HtmlControlCalendar=[];
    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','disabled'];

    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                HtmlControlCalendar[key]=htmlControlobj[key];
            }
        }
    })
    var HtmlControlInput={};
    HtmlControlInput.type="text";
    HtmlControlInput.class="form-control";
   
HtmlControlCalendar.push(HtmlControlInput);

 var HtmlControlFirstSpan={};
    HtmlControlFirstSpan.type="span";
    HtmlControlFirstSpan.html=[];
    var HtmlControlSecondSpan={};
    HtmlControlSecondSpan.type="span";
    HtmlControlSecondSpan.class="glyphicon glyphicon-calendar";
    HtmlControlFirstSpan.html.push(HtmlControlSecondSpan);

    HtmlControlFirstSpan.class="input-group-addon";
    HtmlControlCalendar.push(HtmlControlFirstSpan);

    var result=InlineStyleHelper.AllocateEvents(htmlControlobj,HtmlControlCalendar,inlineJsfunctions);
    HtmlControlCalendar=result.htmlControl;
    inlineJsfunctions=result.inlineJsfunctions ;
   
        var loadCalendar=" $('#" + htmlControldiv["id"]+"').datetimepicker({"+
        "autoclose: 1,"+
         "  minView: "+parseInt(htmlControlobj["datepicker_time"])+""+
      "});";
    inlineJsfunctions=inlineJsfunctions +'$(document).ready(function() {'+loadCalendar+' });';
    HtmlControlCalendar.style=InlineStyleHelper.getInlineStyle(htmlControlobj);

    htmlControldiv.html=HtmlControlCalendar;
    var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);;
    if(inlineStyle!="")
     htmlControldiv.style=inlineStyle;
	  if(htmlControlobj["div_class"]!="")
     htmlControldiv.class=htmlControlobj["div_class"];
   return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = Calendar;