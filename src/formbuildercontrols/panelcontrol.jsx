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
import Header from './headercontrol.jsx';
import HtmlControlHelper from '../common/htmlcontrolhelper.jsx';
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
//create the header class
let Panel = React.createClass({

    render() {

        let classNames = 'designer_draggable panel collapse in';
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
                className={classNames + " " + this.props.data.borderClass + " " + this.props.data.panelclass+" "+this.props.data.div_class}
                onClick={this
                .props
                .setSelectedControl
                .bind(this, this.props.data)}>
                <PanelHeader data={this.props.data}/>
                <PanelBody clonecontrol = {this.props.clonecontrol}
                    data={this.props.data} removecontrol={this.props.removecontrol}
                    dragStart={this.props.dragStart}
                    moveUpcontrol = {this.props.moveUpcontrol}
                    moveDowncontrol = {this.props.moveDowncontrol}
                    setSelectedControl={this.props.setSelectedControl}/>
                <PanelFooter data={this.props.data}/>
                <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
        moveDowncontrol={this.props.moveDowncontrol}
        removecontrol={this.props.removecontrol}
        clonecontrol={this.props.clonecontrol}
        data={this.props.data}/>
            </div>
        )
    }
})
let PanelHeader = React.createClass({
    render() {
        var showHeaderval = this.props.data.showpanelheader;
        var inlineStyle = {
            display: "block"
        }
        if (showHeaderval == false || showHeaderval == "false") {
            inlineStyle.display = "none";
        }
        return (
            <div className="panel-heading" style={inlineStyle}>
                <span>{this.props.data.panelheadertext}</span>
            </div>
        );
    }
})
let PanelBody = React.createClass({
    render() {    
        return (
 
            <div className="panel-body">
                {this.props.data.childdata
                    .map(item => {
                       
                        return( <HtmlControlHelper.HtmlControlRenderHelper
                            mutable={false} clonecontrol = {this.props.clonecontrol}
                            data={item} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
                            dragStart={this.props.dragStart}
                            setSelectedControl={this.props.setSelectedControl}
                            isDraggable={true}
                            key={item.id}/>)
                    })
                }
            </div>
        );
    }
})
let PanelFooter = React.createClass({
    render() {
        var showFooterval = this.props.data.showpanelfooter;
        var inlineStyle = {
            display: "block"
        }
        if (showFooterval == false || showFooterval == "false") {
            inlineStyle.display = "none";
        }
        return (
            <div className="panel-footer" style={inlineStyle}>
                <span>{this.props.data.panelfootertext}</span>
            </div>
        );
    }
})

Panel.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['disabled'] = false;
    cntrlDefaultProperties['showpanelheader'] = true;
    cntrlDefaultProperties['showpanelfooter'] = true;
    cntrlDefaultProperties['panelheadertext'] = 'Header';
    cntrlDefaultProperties['panelfootertext'] = 'Footer';
    cntrlDefaultProperties['panelclass'] = 'panel panel-default';
    cntrlDefaultProperties['panelheaderclass'] = 'panel-heading';
    cntrlDefaultProperties['panelfooterclass'] = 'panel-footer';

    cntrlDefaultProperties['childdata'] = [];
    cntrlDefaultProperties['borderClass'] = '';    
    cntrlDefaultProperties['style_display'] = 'block';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
   ['onclick','oncontextmenu','ondblclick','onmousedown','onmouseover','onmouseup']);
    return cntrlDefaultProperties;
}
Panel.HtmlControl_Panel=function(htmlControlobj,childhtmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";
    var inlineJsfunctions='';
    
    var htmlPropertiesForBind=['name','hidden','tabindex','title','class','disabled'];
    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControldiv[key]=htmlControlobj[key];
            }
        }
    })
    htmlControldiv["id"]=htmlControlobj["controlid"];

    var htmlControlListPanel=[];
    //header div
    var headerdiv={};
    headerdiv.type="div";
    headerdiv.class=htmlControlobj["panelheaderclass"];
    headerdiv.html=htmlControlobj["panelheadertext"];
    if(htmlControlobj.showpanelheader&&htmlControlobj.showpanelheader==true)
    {
        htmlControlListPanel.push(headerdiv);
    }    

    //body div
    var bodydiv={};
    bodydiv.type="div";
    bodydiv.class='panel-body';
    
    htmlControlListPanel.push(bodydiv);
    //collect all child html
    var childHtmlObj=[];
    var childInlineFunction="";
    for(var counter=0;counter<childhtmlControlobj.length;counter++)
    {
        childHtmlObj.push(childhtmlControlobj[counter].htmlControl);
        childInlineFunction=childInlineFunction+"\n"+childhtmlControlobj[counter].inlineJsfunctions;
    }
    bodydiv.html=childHtmlObj;

    //footer div
    var footerdiv={};
    footerdiv.type="div";
    footerdiv.class=htmlControlobj["panelfooterclass"];
    footerdiv.html=htmlControlobj["panelfootertext"];
    if(htmlControlobj.showpanelfooter&&htmlControlobj.showpanelfooter==true)
    {
        htmlControlListPanel.push(footerdiv);
    }

    var panelControlDiv={};
    panelControlDiv.type="div";
    panelControlDiv.html=htmlControlListPanel;
    panelControlDiv.class=htmlControlobj["panelclass"];
    htmlControldiv.html=panelControlDiv;
    inlineJsfunctions=inlineJsfunctions+childInlineFunction;
    var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
     htmlControldiv.style=inlineStyle;
	 if(htmlControlobj["div_class"]!="")
     htmlControldiv.class=htmlControlobj["div_class"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = Panel;