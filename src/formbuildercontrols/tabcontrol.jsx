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
import InlineStyleHelper from '../common/inlinestylehelper.jsx'
import ID from '../common/UUID.js';
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
import ReactDOM from 'react-dom';
var selectedTabLink = '';
var selectedTabLinkRowNumbers='';
let Tab = React.createClass({
    stopPropagation(e)
    {
        if(!e) e=window.event;
        e.cancelBubble = true;
        if(e.stopPropagation) e.stopPropagation();
    },
    componentDidMount() {
        var el = ReactDOM.findDOMNode(this.refs.tabOptions);
        el.value = selectedTabLink;
        var rowInput=ReactDOM.findDOMNode(this.refs.rownumbers);
        rowInput.value=selectedTabLinkRowNumbers;
    },
    saveTabContent(e)
    {
      if(!e) e=window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) 
       e.stopPropagation();
      var el = ReactDOM.findDOMNode(this.refs.tabOptions);
      var rowInput=ReactDOM.findDOMNode(this.refs.rownumbers);
     this.props.saveNavigationTabData(el.value,rowInput.value,this.props.data, this.props.parent);        
    },
    tabLinkChange(e)
    {     
     if(!e) e=window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) 
        e.stopPropagation();
     var el = ReactDOM.findDOMNode(this.refs.tabOptions);
     selectedTabLink = el.value;
     this.props.loadDataAsPerNavigationTab(el.value,this.props.data, this.props.parent)
     selectedTabLinkRowNumbers=this.props.getNavigationTabRowNumbers(el.value);
    },
    loadTabOptions()
    {
     var obj = (
       <select  ref="tabOptions" onClick={this.stopPropagation}  onChange={this.tabLinkChange}>
        {this.props.data.taboptions.map(function (option) {
         return <option  
         value={option.href} key={ID.uuid()}>{option.TabName}</option>;
        })}
       </select>
        )
        return obj;
    },
    editRowNumber(targetProperty, e)
    {   
     selectedTabLinkRowNumbers=  e.target[targetProperty];
    },
    //render the html
    render() {
    let classNames = 'designer_draggable'; //class to activate drag on designer
    let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
    let inlinestyle = styleDictionary.inlinestyle;
    let divStyle=styleDictionary.divinlinestyle;
    
    return (
    <div draggable='true' onDragStart={this.props.dragStart.bind(this, this.props.data)}
     style={divStyle}
     className={classNames + " " + this.props.data.borderClass+" "+this.props.data.div_class}
     onClick={this.props.setSelectedControl.bind(this, this.props.data)}>
     <ul className="nav nav-tabs">
        {this.props.data.taboptions.map(function (option) {
        return <li className={option.liclass}  key={option.key} >
         <a style={inlinestyle} href={option.href} className={option.hrefclass}>{option.TabName}</a></li>;
        },this)}
    </ul>
     <div style={{"float":"right"}}>
        {this.loadTabOptions()}
        <input type="text"
         ref="rownumbers"
         onClick={this.stopPropagation} onChange={this.editRowNumber.bind(this,'value')}/>
        <input type="button" onClick={this.saveTabContent.bind(this)} value="Add as Tab Content"/>
         <span className="glyphicon glyphicon-remove delete-icon" onClick={this
                .props
                .removecontrol
                .bind(this, this.props.data)}></span>
     </div>
   
    </div>
    )
    }
});

//set the control default properties
Tab.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['content'] = 'Tabs';
    cntrlDefaultProperties['style_position'] = '';
    cntrlDefaultProperties['style_zindex'] = '';
    cntrlDefaultProperties['style_width'] = '';
    cntrlDefaultProperties['style_height'] = '';
    cntrlDefaultProperties['style_top'] = '0px';
    cntrlDefaultProperties['style_right'] = '';
    cntrlDefaultProperties['style_bottom'] = '';
    cntrlDefaultProperties['style_left'] = '0px';
    cntrlDefaultProperties["rownumber"]="0";
    cntrlDefaultProperties["columnnumber"]="0";
    cntrlDefaultProperties["parentcontrolid"]="0";
    cntrlDefaultProperties['style_margin'] = '';
    cntrlDefaultProperties['style_padding'] = '';
    cntrlDefaultProperties['style_textAlign'] = '';
    cntrlDefaultProperties['style_lineHeight'] = '';
    cntrlDefaultProperties['borderClass'] = '';
    cntrlDefaultProperties['style_borderTop'] = '';
    cntrlDefaultProperties['style_borderBottom']='';
    cntrlDefaultProperties['style_borderRight'] = '';
    cntrlDefaultProperties['style_borderLeft']='';
    cntrlDefaultProperties['currenttabrownumbers']='';
    cntrlDefaultProperties['taboptions'] = [
       {
           liclass:'active',
           href:'#Home',
           TabName:'Home',
           hrefclass:'',
           key: ID.uuid(),
           rownumbers:'',
           tabcontent:[]
       }
    ];
    cntrlDefaultProperties['div_stylefloat'] = 'none';
    cntrlDefaultProperties['div_stylewidth'] = '';
    cntrlDefaultProperties['div_class'] = '';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
   ['onblur','onchange','onclick','oncontextmenu','ondblclick','onfocus','onkeydown','onkeypress',
   'onkeyup','onload','onmousedown','onmouseover','onmouseup','onselect','onsubmit','onunload']);
    return cntrlDefaultProperties;
};
Tab.HtmlControl_Tab=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";
    var inlineJsfunctions='';
    var htmlControldivTab=[];

    var htmlControldivTabOpt={};
    htmlControldivTabOpt.type="div";
    var innerControls=[];
    var ul={};
    ul.type="ul";
    ul.class="nav nav-tabs";
    ul.html=[];
    var inlineStyle=InlineStyleHelper.getInlineStyle(htmlControlobj);
    for(var tabOptionCounter=0;tabOptionCounter< htmlControlobj["taboptions"].length ;tabOptionCounter++)
    {
        var li={};
        li.type="li";
        li.class=htmlControlobj["taboptions"][tabOptionCounter].liclass;
        li.html=[];
        var hyperlink={};
        hyperlink.type="a";
        hyperlink.href=htmlControlobj["taboptions"][tabOptionCounter].href;
        hyperlink.html=htmlControlobj["taboptions"][tabOptionCounter].TabName;
        hyperlink["data-toggle"]="tab";
        hyperlink.class=htmlControlobj["taboptions"][tabOptionCounter].hrefclass;
        if(inlineStyle!="")
         hyperlink.style=inlineStyle;
        li.html.push(hyperlink);
        ul.html.push(li);
    }
    innerControls.push(ul);
    htmlControldivTabOpt.html=innerControls;
    htmlControldivTab.push(htmlControldivTabOpt);

    htmlControldiv.html=htmlControldivTab;
    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title','disabled'];

    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControldivTab[key]=htmlControlobj[key];
            }
        }
    })

    htmlControldiv.html = htmlControldivTab;
    var inlineStyleForDiv=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyleForDiv!="")
     htmlControldiv.style=inlineStyleForDiv;
	  if(htmlControlobj["div_class"]!="")
     htmlControldiv.class=htmlControlobj["div_class"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}

Tab.HtmlControl_TabContent=function(htmlControlobj,tabDataWithHtmlControls,childtabContent)
{  
    var htmlControldiv={};
    htmlControldiv.type="div";
    var inlineJsfunctions='';
    var htmlControldivHtml=[];
    var keys = Object.keys(tabDataWithHtmlControls);
    var firstDiv=0;
    keys.forEach(function (key) {
       var tabpaneDiv={};
       var tabpaneData=[];
       tabpaneDiv.type="div";
       tabpaneDiv.class=firstDiv==0?'tab-pane fade in active':'tab-pane fade';       
       tabpaneDiv.id=key.replace("#", "");       
       tabpaneDiv.html=tabDataWithHtmlControls[key];

       if(childtabContent[key])
       {
        var childData=childtabContent[key];
        if(childData.html)
        {          
           var childControlHtml=childData.html;
           var contentDivForChild={};
           contentDivForChild.type='div';
           contentDivForChild.class='tab-content';
           contentDivForChild.html=[];
           for(var childcount=0;childcount<childControlHtml.length;childcount++)
           {
             contentDivForChild.html.push(childControlHtml[childcount]);
           // tabpaneDiv.html.push(childControlHtml[childcount]);
            }
           tabpaneDiv.html.push(contentDivForChild);
        }   
       }
       firstDiv++;
       htmlControldivHtml.push(tabpaneDiv);
    })
   htmlControldiv.html=htmlControldivHtml;
   htmlControldiv.class='tab-content';   
   return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = Tab;