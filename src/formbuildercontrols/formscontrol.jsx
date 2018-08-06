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
import InlineStyleHelper from '../common/inlinestylehelper.jsx'
  import Header from './headercontrol.jsx';
  import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
  import HtmlControlHelper from '../common/htmlcontrolhelper.jsx';
//create the header class
let Forms = React.createClass({
   
    //render the html
    render() {

        let classNames = 'designer_draggable panel collapse in'; //class to activate drag on designer
        let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
        let inlinestyle = styleDictionary.inlinestyle;
        let divStyle=styleDictionary.divinlinestyle;
        let classNameform = 'form-group'; //class to activate drag on designer
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
               
                <FormBody clonecontrol = {this.props.clonecontrol}
                    data={this.props.data} removecontrol={this.props.removecontrol}
                    dragStart={this.props.dragStart}
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
});

let FormBody = React.createClass({
    render() {      
        return (
            
<form>
                {this.props.data.childdata
                    .map(item => {
                        return <div className='from-group'><HtmlControlHelper.HtmlControlRenderHelper
                            mutable={false} clonecontrol = {this.props.clonecontrol}
                            data={item} removecontrol={this.props.removecontrol}
                             moveUpcontrol = {this.props.moveUpcontrol}
                             moveDowncontrol = {this.props.moveDowncontrol}
                            dragStart={this.props.dragStart}
                            setSelectedControl={this.props.setSelectedControl}
                            isDraggable={true}
                            key={item.id}/></div>
                    })
                }
</form>
        );
    }
})

//set the control default properties
Forms.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
   cntrlDefaultProperties['childdata'] = [];
   cntrlDefaultProperties['borderClass'] = '';    
   cntrlDefaultProperties['form_class']='';
   cntrlDefaultProperties['style_borderTop'] = '';
   cntrlDefaultProperties['style_borderBottom']='';
   cntrlDefaultProperties['style_borderRight'] = '';
   cntrlDefaultProperties['style_borderLeft']='';
    cntrlDefaultProperties['form_method']='get';
   cntrlDefaultProperties['submit_api']='';
   cntrlDefaultProperties['style_display'] = 'block';
   cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
   ['onclick','oncontextmenu','ondblclick','onmousedown','onmouseover','onmouseup']);
    return cntrlDefaultProperties;
}
Forms.HtmlControl_Forms=function(htmlControlobj,childhtmlControlobj)
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
    //body div
    var bodydiv={};
    bodydiv.type="form";
    bodydiv.class=htmlControlobj["form_class"];
    bodydiv.action=htmlControlobj["submit_api"];
    bodydiv.method=htmlControlobj["form_method"];
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
    htmlControldiv.html=htmlControlListPanel;
    inlineJsfunctions=inlineJsfunctions+childInlineFunction;
     var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
     htmlControldiv.style=inlineStyle;
	  if(htmlControlobj["div_class"]!="")
     htmlControldiv.class=htmlControlobj["div_class"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = Forms;