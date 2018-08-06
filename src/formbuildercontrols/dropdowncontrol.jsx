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
import InlineStyleHelper from '../common/inlinestylehelper.jsx';
import ID from '../common/UUID.js';
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
import ReactDOM from 'react-dom';
var apiResponseData = [];
//create the header class
let Dropdown = React.createClass({

    stopPropagation: function (e) {
        if (!e) e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation)
            e.stopPropagation();
    },
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
                        var finalData = '';
                        var levels = control.props.data.jsonkey.split('.');
                        for (var i = 0; i < levels.length; i++) {
                            if (finalData == '') {
                                finalData = apiResponseData[levels[i]];
                            }
                            else {
                                finalData = finalData[levels[i]]
                            }
                        }
                        control.BindddlValue(finalData);
                    } else {
                        //do nothing for now
                    }
                }
            }
            else if (this.props.globaldata) {
                if (Object.keys(this.props.globaldata).length > 0) {
                    let apiResponseData = this.props.globaldata;
                    var finalData = '';
                    var levels = this.props.data.jsonkey.split('.');
                    for (var i = 0; i < levels.length; i++) {
                        if (finalData == '') {
                            finalData = apiResponseData[levels[i]];
                        }
                        else {
                            finalData = finalData[levels[i]]
                        }
                    }
                    this.BindddlValue(finalData);
                }
            }
        }

    },
    BindddlValue(apiResponseData) {
        var Optionarray = [];
        var valuefield = this.props.data.jsonkeyValue;
        var textfield = this.props.data.jsonkeyText;
        if ((valuefield != "" || textfield != "")&& apiResponseData) {
            for (var i = 0; i < apiResponseData.length; i++) {
                var pairvalue = {};
                if (valuefield != "" && textfield != "") {
                    pairvalue.value = apiResponseData[i][valuefield];
                    pairvalue.text = apiResponseData[i][textfield];
                    pairvalue.key = ID.uuid();
                }
                else if (valuefield != "" && textfield == "") {
                    pairvalue.value = apiResponseData[i][valuefield];
                    pairvalue.text = apiResponseData[i][valuefield];
                    pairvalue.key = ID.uuid();
                }
                else if (valuefield == "" && textfield != "") {
                    pairvalue.value = apiResponseData[i][textfield];
                    pairvalue.text = apiResponseData[i][textfield];
                    pairvalue.key = ID.uuid();
                }
                Optionarray.push(pairvalue);
            }
            this.props.data.options = Optionarray;
        }

    },
    //render the html
    render() {

        let classNames = 'designer_draggable'; //class to activate drag on designer
        let styleDictionary = InlineStyleHelper.generateInlineStyle(this.props.data);
        let inlinestyle = styleDictionary.inlinestyle;
        let divStyle = styleDictionary.divinlinestyle;
        return (
            <div style={divStyle}
                draggable='true'
                onDragStart={this
                    .props
                    .dragStart
                    .bind(this, this.props.data)}
                className={classNames + " " + this.props.data.borderClass + " " + this.props.data.div_class
                }
                onClick={this
                    .props
                    .setSelectedControl
                    .bind(this, this.props.data)}>
                <label>
                    {this.props.data.content}
                </label>
                <select
                    accessKey={this.props.data.accesskey}
                    contentEditable={this.props.data.contenteditable}
                    draggable={this.props.data.draggable}
                    className={this.props.data.class}
                    spellCheck={this.props.data.spellcheck}
                    id={this.props.data.controlid}
                    tabIndex={this.props.data.tabindex}
                    title={this.props.data.title}
                    style={inlinestyle}
                    onClick={this.stopPropagation}>
                    {this
                        .props
                        .data
                        .options
                        .map(function (option) {
                            return <option value={option.value} key={option.key}>{option.text}</option>;
                        })}
                </select>
                <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
        moveDowncontrol={this.props.moveDowncontrol}
        removecontrol={this.props.removecontrol}
        clonecontrol={this.props.clonecontrol}
        data={this.props.data}/>
            </div>
        )
    }
})

Dropdown.properties = function (cntrlDefaultProperties) {
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
    cntrlDefaultProperties['options'] = [
        {
            value: 'option1',
            text: 'option1',
            key: 'option1'
        }, {
            value: 'option2',
            text: 'option2',
            key: 'option2'
        }
    ];
    cntrlDefaultProperties['style_borderTop'] = '';
    cntrlDefaultProperties['style_borderBottom'] = '';
    cntrlDefaultProperties['style_borderRight'] = '';
    cntrlDefaultProperties['style_borderLeft'] = '';
    cntrlDefaultProperties = InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
        ['onblur', 'onchange', 'onclick', 'oncontextmenu', 'ondblclick', 'onfocus', 'onkeydown', 'onkeypress',
            'onkeyup', 'onload', 'onmousedown', 'onmouseover', 'onmouseup', 'onselect', 'onsubmit', 'onunload']);
    return cntrlDefaultProperties;
}

Dropdown.HtmlControl_Dropdown = function (htmlControlobj) {
    var htmlControldiv = {};
    htmlControldiv.type = "div";
    var inlineJsfunctions = '';
    var htmlControls = [];
    var htmlControlLable = {};
    htmlControlLable.type = "lable";
    htmlControlLable.html = htmlControlobj["content"];
    htmlControlLable.style = "vertical-align:top";
    var htmlControlDropdown = {};

    var htmlPropertiesForBind = ['name', 'accesskey', 'hidden', 'tabindex', 'title',
        'class', 'autofocus', 'disabled'];
    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if (htmlPropertiesForBind.indexOf(key) >= 0) {
            if (htmlControlobj[key] && htmlControlobj[key] != "") {
                htmlControlDropdown[key] = htmlControlobj[key];
            }
        }
    })
    htmlControlDropdown["id"] = htmlControlobj["controlid"];
    htmlControlDropdown.type = "select";
    //append the dropdown options
    var dropdownOpions = {};
    for (var optCounter = 0; optCounter < htmlControlobj["options"].length; optCounter++) {

        var val = htmlControlobj["options"][optCounter].value;
        var txt = htmlControlobj["options"][optCounter].text;
        dropdownOpions[val] = txt;
    }

    htmlControlDropdown.options = dropdownOpions;
    var result = InlineStyleHelper.AllocateEvents(htmlControlobj, htmlControlDropdown, inlineJsfunctions);
    htmlControlDropdown = result.htmlControl;
    inlineJsfunctions = result.inlineJsfunctions;
    htmlControlDropdown.style = InlineStyleHelper.getInlineStyle(htmlControlobj);

    htmlControls.push(htmlControlLable);
    htmlControls.push(htmlControlDropdown);

    htmlControldiv.html = htmlControls;
    var inlineStyle = InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if (inlineStyle != "")
        htmlControldiv.style = inlineStyle;
    if (htmlControlobj["div_class"] != "")
        htmlControldiv.class = htmlControlobj["div_class"];
    return { 'htmlControl': htmlControldiv, 'inlineJsfunctions': inlineJsfunctions };
}
//export the modules
module.exports = Dropdown;