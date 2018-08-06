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
var DateTimeField = require("react-bootstrap-date-picker");
 
//create the header class
let DatePicker = React.createClass({
   stopPropagation(e)
    {
       if(!e) e=window.event;
        e.cancelBubble = true;
        if(e.stopPropagation) e.stopPropagation();
    },
getInitialState: function () {
        return {value: this.props.data.date_value}
    },
    handleChange: function (value, formattedValue) {
        this.setState({
            value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
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
               <DateTimeField
                 onClick={this.stopPropagation}
                    className={this.props.data.class}
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={inlinestyle}
                    autoFocus={this.props.data.autofocus == "true"
                    ? true
                    : false}
                    disabled={this.props.data.disabled == "true"
                    ? true
                    : false}
                    dateFormat={this.props.data.datepicker_format}
                    showClearButton
                    ={this.props.data.datepicker_showclearbutton == "true"
                    ? true
                    : false}
                    previousButtonElement
                    ={this.props.data.datepicker_previousbuttonelement}
                    nextButtonElement
                    ={this.props.data.datepicker_nextbuttonelement}
                    dayLabels
                    ={this
                    .props
                    .data
                    .datepicker_daylabels
                    .split(",")}
                    monthLabels
                    ={this
                    .props
                    .data
                    .datepicker_monthlabels
                    .split(",")}
                    weekStartsOnMonday
                    ={this.props.data.datepicker_weekstartsonmonday == "true"
                    ? true
                    : false}
                    showTodayButton
                    ={this.props.data.datepicker_showtodaybutton == "true"
                    ? true
                    : false}
                    todayButtonLabel
                    ={this.props.data.todaybuttonlabel}
                    clearButtonElement={this.props.data.datepicker_clearbuttonelement}
                    inputFormat='YYYY/MM/DD hh:mm A'
                    onFocus={this
                    .props
                    .setSelectedControl
                    .bind(this, this.props.data)}></DateTimeField>
                <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
        moveDowncontrol={this.props.moveDowncontrol}
        removecontrol={this.props.removecontrol}
        clonecontrol={this.props.clonecontrol}
        data={this.props.data}/>

            </div>
        )
    }
});
DatePicker.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['date_value'] = new Date().toISOString();
    cntrlDefaultProperties['style'] = '';
    cntrlDefaultProperties['class'] = 'form-control';
    cntrlDefaultProperties['autofocus'] = "false";
    cntrlDefaultProperties['disabled'] = "false";
    cntrlDefaultProperties['datepicker_format'] = "YYYY/MM/DD";
    cntrlDefaultProperties['datepicker_clearbuttonelement'] = "X";
    cntrlDefaultProperties['datepicker_showclearbutton'] = "true";
    cntrlDefaultProperties['datepicker_previousbuttonelement '] = "<";
    cntrlDefaultProperties['datepicker_nextbuttonelement  '] = "<";
    cntrlDefaultProperties['datepicker_daylabels'] = "Sun,Mon,Tue,Wed,Thu,Fri,Sat";
    cntrlDefaultProperties['datepicker_monthlabels'] = "January,February,March,April,May,June,July,August,September,October,November,Dec" +
            "ember";
    cntrlDefaultProperties['datepicker_weekstartsonmonday'] = "false";
    cntrlDefaultProperties['datepicker_showtodaybutton'] = "false";
    cntrlDefaultProperties['datepicker_todaybuttonlabel'] = "Today";
    cntrlDefaultProperties["rownumber"]="0";
    cntrlDefaultProperties["columnnumber"]="0";
    cntrlDefaultProperties["parentcontrolid"]="0";
    cntrlDefaultProperties['borderClass'] = '';
    cntrlDefaultProperties['div_style_float'] = 'none';
    cntrlDefaultProperties['style_borderLeft']='';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
    ['onclick','ondblclick','onmousedown','onmouseover','onmouseup']);
    return cntrlDefaultProperties;
}

//export the modules
module.exports = DatePicker;