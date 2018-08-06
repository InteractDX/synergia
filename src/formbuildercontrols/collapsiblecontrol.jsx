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
import Header from './headercontrol.jsx';
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
import HtmlControlHelper from '../common/htmlcontrolhelper.jsx';
//create the header class
let Collapsible = React.createClass({

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
                <CollapsibleHeader data={this.props.data}/>
                <CollapsibleBody clonecontrol = {this.props.clonecontrol}
                    data={this.props.data} removecontrol={this.props.removecontrol}
                    dragStart={this.props.dragStart}
                    style={inlinestyle}
                     moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
                    setSelectedControl={this.props.setSelectedControl}/>
                <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
        moveDowncontrol={this.props.moveDowncontrol}
        removecontrol={this.props.removecontrol}
        clonecontrol={this.props.clonecontrol}
        data={this.props.data}/>
            </div>
        )
    }
})
let CollapsibleHeader = React.createClass({
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
let CollapsibleBody = React.createClass({
    render() {
          
        return (
 
            <div >
                
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

Collapsible.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
  cntrlDefaultProperties['controlid'] = 'collapse1';    
  cntrlDefaultProperties['disabled'] = false;
  cntrlDefaultProperties['panelheadertext'] = 'Header';
  cntrlDefaultProperties['showpanelheader'] = true;
  cntrlDefaultProperties['panelclass'] ='panel panel-default';
  cntrlDefaultProperties['panelheaderclass'] = 'panel-heading';
  
  cntrlDefaultProperties['childdata'] = [];
  cntrlDefaultProperties['borderClass'] = '';    
  cntrlDefaultProperties['style_borderTop'] = '';
  cntrlDefaultProperties['style_borderBottom']='';
  cntrlDefaultProperties['style_borderRight'] = '';
  cntrlDefaultProperties['style_borderLeft']='';
  cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
   ['onclick','oncontextmenu','ondblclick','onmousedown','onmouseover','onmouseup']);
  return cntrlDefaultProperties;
}
Collapsible.HtmlControl_Collapsible=function(htmlControlobj,childhtmlControlobj)
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
    var htmlControlListPanel=[];
    var headerdiv={};
    headerdiv.type="div";
    headerdiv.class=htmlControlobj["panelheaderclass"];
    headerdiv.html=[];
    var CollapsibleHeaderspan={};
    CollapsibleHeaderspan.type="span";
    CollapsibleHeaderspan.class="glyphicon glyphicon-minus";
    CollapsibleHeaderspan.id="col"+htmlControlobj["controlid"];
    CollapsibleHeaderspan.html=htmlControlobj["panelheadertext"];
    
    var htmlControlHyperLink={};
    htmlControlHyperLink.type="a";
    htmlControlHyperLink['data-toggle']='collapse';
    htmlControlHyperLink['href']='#'+htmlControlobj["controlid"];
    htmlControlHyperLink.html=CollapsibleHeaderspan;

    headerdiv.html.push(htmlControlHyperLink)
     
    if(htmlControlobj.showpanelheader&&htmlControlobj.showpanelheader==true)
    {
        htmlControlListPanel.push(headerdiv);
    }    

   //body div
    var bodydiv={};
    bodydiv.type="div";
    bodydiv.class='panel-body collapse in';
    var bodyInlineStyle=InlineStyleHelper.getInlineStyle(htmlControlobj);
    if(bodyInlineStyle!="")
    bodydiv.style=bodyInlineStyle;

    bodydiv["id"]=htmlControlobj["controlid"];
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

    var panelControlDiv={};
    panelControlDiv.type="div";
    panelControlDiv.html=htmlControlListPanel;
    panelControlDiv.class=htmlControlobj["panelclass"];  
    htmlControldiv.html=panelControlDiv;
    inlineJsfunctions=inlineJsfunctions+childInlineFunction;
   var toggleClassApply=" $('#col" + htmlControlobj["controlid"]+"').click(function() { "+
    " $ ('#col" + htmlControlobj["controlid"]+"').toggleClass('glyphicon glyphicon-minus glyphicon glyphicon-plus')"+
 "});";
    inlineJsfunctions=inlineJsfunctions +'$(document).ready(function() {'+toggleClassApply+' });';
    var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
        htmlControldiv.style=inlineStyle;
    if(htmlControlobj["div_class"]!="")
        htmlControldiv.class=htmlControlobj["div_class"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = Collapsible;