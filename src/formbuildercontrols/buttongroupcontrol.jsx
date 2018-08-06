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

//create the header class
let ButtonGroup = React.createClass({
   
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
                <div className="btn-group" style={inlinestyle}>
                    {this
                        .props
                        .data
                        .buttongroupoptions
                        .map(function (option) {
                            if (option.nestedbuttons.length <= 0) {
                                return (
                                    <div className="btn-group" key={ID.uuid()}>
                                        <button type="button" className="btn btn-primary" key={option.key}>{option.value}</button>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="btn-group" key={ID.uuid()}>
                                        <button
                                            type="button"
                                            className="btn btn-primary dropdown-toggle"
                                            data-toggle="dropdown">
                                            {option.value}<span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu" role="menu">
                                            {option
                                                .nestedbuttons
                                                .map(function (option_inner) {
                                                    return (
                                                        <li key={option_inner.key}>
                                                            <a href={option_inner.href}>{option_inner.text}</a>
                                                        </li>
                                                    )
                                                })}
                                        </ul>
                                    </div>
                                )
                            }
                        })}
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
ButtonGroup.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['style_display'] = 'block';
    cntrlDefaultProperties['buttongroupoptions'] = [
        {
            value: 'Button1',
            key: ID.uuid(),
            nestedbuttons: []

        }, {
            value: 'Button2',
            key: ID.uuid(),
            nestedbuttons: []
        }
    ];
    cntrlDefaultProperties['selectednestedbuttons'] = [];
    return cntrlDefaultProperties;
}
ButtonGroup.HtmlControl_ButtonGroup=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";
    htmlControldiv.class="btn-group";
    var inlineStyle="";
    var htmlControldivButton=[];
    var inlineJsfunctions='';
    for(var btnOptionCounter=0;btnOptionCounter<htmlControlobj["buttongroupoptions"].length;btnOptionCounter++)
    {        
        if(htmlControlobj["buttongroupoptions"][btnOptionCounter].nestedbuttons.length<=0)
        {
            var htmlControldivButtonOpt={};
            htmlControldivButtonOpt.type="div";
            htmlControldivButtonOpt.class="btn-group";
            var btn={};
            btn.type="submit";
            btn.class="btn btn-primary";
            btn.value=htmlControlobj["buttongroupoptions"][btnOptionCounter].value;
            
            htmlControldivButtonOpt.html=btn;
            htmlControldivButton.push(htmlControldivButtonOpt);
        }
        else
        {
            var htmlControldivButtonOpt={};
            htmlControldivButtonOpt.type="div";
            htmlControldivButtonOpt.class="btn-group";
           
            var innerControls=[];
            var btn={};
            var arrow={};
            var btntext={};
            btntext.type="span";
            btntext.html=htmlControlobj["buttongroupoptions"][btnOptionCounter].value;
            arrow.type="span";
            arrow.class="caret";
            btn.type="buttoncontrol";
            btn.class="btn btn-primary dropdown-toggle";
             btn["data-toggle"]="dropdown";
            btn.value=htmlControlobj["buttongroupoptions"][btnOptionCounter].value;                        
            innerControls.push(btn);
           // innerControls.push(arrow);
           btn.html=[];
           btn.html.push(btntext);
           btn.html.push(arrow);
            var ul={};
            ul.type="ul";
            ul.class="dropdown-menu";
            ul.role="menu";
            ul.html=[];
            var nestedbtn=htmlControlobj["buttongroupoptions"][btnOptionCounter].nestedbuttons;
            for(var innerCntr=0;innerCntr<nestedbtn.length;innerCntr++)
            {
                var li={};
                li.type="li";
                li.html=[];
                var hyperlink={};
                hyperlink.type="a";
                hyperlink.href=nestedbtn[innerCntr].href;
                hyperlink.html=nestedbtn[innerCntr].text;
                li.html.push(hyperlink);
                ul.html.push(li);
            }
            innerControls.push(ul);
            htmlControldivButtonOpt.html=innerControls;
            htmlControldivButton.push(htmlControldivButtonOpt);
        }
    }   

    htmlControldiv.html=htmlControldivButton;
    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','disabled'];
    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControlTextInput[key]=htmlControlobj[key];
            }
        }
    })
    inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
     htmlControldiv.style=inlineStyle;
	  if(htmlControlobj["div_class"]!="")
     htmlControldiv.class=htmlControlobj["div_class"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = ButtonGroup;