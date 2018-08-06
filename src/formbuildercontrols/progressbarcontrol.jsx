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
import InlineStyleHelper from '../common/inlinestylehelper.jsx';
import moment from 'moment';
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
import HtmlControlHelper from '../common/htmlcontrolhelper.jsx';
//create the header class
let Progressbar = React.createClass({

    //render the html
    render() {
      let classNames = 'designer_draggable'; //class to activate drag on designer
    let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
    let inlinestyle = styleDictionary.inlinestyle;
    let divStyle=styleDictionary.divinlinestyle;
    var percentage = this.props.data.progressbar_complete + '%';
    var progressbarclass=this.props.data.progressbar_class;
    if(this.props.data.progressbar_active=='active' )
    {
        progressbarclass=this.props.data.progressbar_class+' active';
    }
    else
    {
        progressbarclass=this.props.data.progressbar_class;
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
            <div className="progress">
    <div className={progressbarclass} role="progressbar"  aria-valuemin="0" aria-valuemax="100" style={{width : percentage}}>
        {this.props.data.progressbar_text}
    </div>
  </div> 
  <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
        moveDowncontrol={this.props.moveDowncontrol}
        removecontrol={this.props.removecontrol}
        clonecontrol={this.props.clonecontrol}
        data={this.props.data}/>
          <br/> </div>           
        )
    }
})

Progressbar.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['disabled'] = false;
    cntrlDefaultProperties['progressbar_class'] = 'progress-bar';
    cntrlDefaultProperties['progressbar_text'] = '25%';
    cntrlDefaultProperties['progressbar_complete']='25';
    cntrlDefaultProperties['progressbar_active']='false';
    cntrlDefaultProperties['controlid'] = 'Progressbar1';
    cntrlDefaultProperties['childdata'] = [];
    cntrlDefaultProperties['style_display'] = 'block';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
    ['onclick','oncontextmenu','ondblclick','onmousedown','onmouseover','onmouseup']);
    return cntrlDefaultProperties;
}

Progressbar.HtmlControl_Progressbar=function(htmlControlobj)
{
    var htmlControldiv={};   
    htmlControldiv.type="div";
    htmlControldiv.class="progress";
    var inlineJsfunctions='';
    var htmlControlProgressbar={};
    htmlControlProgressbar.type="div";
    htmlControlProgressbar.class=htmlControlobj["progressbar_class"]+ ' ' +htmlControlobj["progressbar_active"];
    htmlControlProgressbar.html =htmlControlobj["progressbar_text"];
    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','disabled'];

    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControlProgressbar[key]=htmlControlobj[key];
            }
        }
    })
    htmlControlProgressbar["id"]=htmlControlobj["controlid"];

    var result=InlineStyleHelper.AllocateEvents(htmlControlobj,htmlControlProgressbar,inlineJsfunctions);
    htmlControlProgressbar=result.htmlControl;
    inlineJsfunctions=result.inlineJsfunctions;
    htmlControlProgressbar.style="width:"+htmlControlobj["progressbar_complete"]+"%";

    htmlControldiv.html=htmlControlProgressbar;
    var inlineStyle=InlineStyleHelper.getInlineStyle(htmlControlobj);

    if(inlineStyle!="")
     htmlControldiv.style=inlineStyle;
	  if(htmlControlobj["div_class"]!="")
     htmlControldiv.class=htmlControlobj["div_class"];
   return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = Progressbar;