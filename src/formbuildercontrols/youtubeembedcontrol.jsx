/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Kuldeep.Bhatt, Zymr
*******************************************************/

//import the modules
import React from 'react';
import Select from 'react-select';
import xss from 'xss';
import moment from 'moment';
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
import InlineStyleHelper from '../common/inlinestylehelper.jsx'

//create the header class
let YoutubeEmbed = React.createClass({

    //render the html
    render() {
        var mainstr = this.props.data.youtubeurl;
        var substr1 = "youtu.be";
        var substr2 = "watch?v=";
        if (mainstr.indexOf(substr1) !== -1) {
            mainstr = mainstr.replace("youtu.be", "youtube.com/embed");
        } else if (mainstr.indexOf(substr2) !== -1) {
            mainstr = mainstr.replace("watch?v=", "embed/");
        }

        // youtu.be
        let classNames = 'designer_draggable'; //class to activate drag on designer
        let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
        let inlinestyle = styleDictionary.inlinestyle;
        let divStyle=styleDictionary.divinlinestyle;

        return (
            <div style={divStyle} draggable='true' onDragStart={this
        .props
        .dragStart
        .bind(this, this.props.data)} 
               
                className={classNames+ " " + this.props.data.borderClass+" "+this.props.data.div_class}
                onClick={this
                .props
                .setSelectedControl
                .bind(this, this.props.data)}>
                 <div className="embed-responsive embed-responsive-16by9" style={inlinestyle}>
    				<iframe className="embed-responsive-item" width="75%" height="75%" src={mainstr}  name={this.props.data.name}></iframe>
				</div>
                <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
        moveDowncontrol={this.props.moveDowncontrol}
        removecontrol={this.props.removecontrol}
        clonecontrol={this.props.clonecontrol}
        data={this.props.data}/>
            </div>
        )
    }

})

YoutubeEmbed.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['youtubeurl'] = 'https://www.youtube.com/embed/_BxGHx-w1Gw';
    cntrlDefaultProperties['div_stylefloat'] = 'none';
    cntrlDefaultProperties['div_stylewidth'] = '';
    cntrlDefaultProperties['div_class'] = '';
    cntrlDefaultProperties['style_display'] = 'block';
    cntrlDefaultProperties['div_styletextAlign'] = '';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
    ['onblur','onchange','onclick','oncontextmenu','ondblclick','onfocus','onkeydown','onkeypress',
    'onkeyup','onload','onmousedown','onmouseover','onmouseup','onselect','onsubmit','onunload']);
    return cntrlDefaultProperties;
}
YoutubeEmbed.HtmlControl_YoutubeEmbed=function(htmlControlobj)
{
   var htmlControldiv={};
   htmlControldiv.type="div";
   var inlineJsfunctions='';
   var htmlControldivCarousal=[];

   var htmlControldivyoutubeOpt={};
   htmlControldivyoutubeOpt.type="div";
   htmlControldivyoutubeOpt.class="embed-responsive embed-responsive-16by9";

   htmlControldivyoutubeOpt.html=[];
    if(htmlControlobj["youtubeurl"]!=""&&htmlControlobj["youtubeurl"]!=undefined)
    {
        var mainstr = htmlControlobj["youtubeurl"];
        var substr1 = 'youtu.be';
        var substr2 = 'watch?v=';
        if (mainstr.indexOf(substr1) !== -1) {
            mainstr = mainstr.replace('youtu.be','youtube.com/embed');
        } 
        else if (mainstr.indexOf(substr2) !== -1){
            mainstr = mainstr.replace('watch?v=','embed/');
        }

        htmlControlobj["youtubeurl"] = mainstr;
        var iframe={};
        iframe.type="iframe";
        iframe.class="embed-responsive-item";
        iframe.src=htmlControlobj["youtubeurl"];
        htmlControldivyoutubeOpt.html.push(iframe);
    }
    htmlControldivCarousal.push(htmlControldivyoutubeOpt);
    var htmlControlYoutubeEmbed={};
    htmlControlYoutubeEmbed.type="div";

    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','form','formaction','formenctype','formmethod','formnovalidate','formtarget',
    'buttontype','autofocus','disabled'];

    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControlYoutubeEmbed[key]=htmlControlobj[key];
            }
        }
    })
    htmlControlYoutubeEmbed["id"]=htmlControlobj["controlid"];
    htmlControlYoutubeEmbed["value"]=htmlControlobj["content"];
    var mainstr = htmlControlobj["youtubeurl"];
    var substr1 = 'youtu.be';
    var substr2 = 'watch?v=';
    if (mainstr.indexOf(substr1) !== -1) {
        mainstr = mainstr.replace('youtu.be','youtube.com/embed');
    } 
    else if (mainstr.indexOf(substr2) !== -1){
        mainstr = mainstr.replace('watch?v=','embed/');
    }

    htmlControlobj["youtubeurl"] = mainstr;
    
    htmlControldiv.html=htmlControldivCarousal;
    var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
     htmlControldiv.style=inlineStyle;
	  if(htmlControlobj["div_class"]!="")
     htmlControldiv.class=htmlControlobj["div_class"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = YoutubeEmbed;